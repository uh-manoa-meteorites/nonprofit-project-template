import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Image, Loader, Button, Segment, Divider, Header, Icon, Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Carousel } from 'react-carousel-minimal';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';
import { ROLE } from '../../api/role/Role';
import EventCard from '../components/EventCard';
import { OrganizationEvent } from '../../api/event/OrganizationEventCollection';
import { Events } from '../../api/event/EventCollection';

/** Renders the Page for adding a document. */
const OrganizationProfile = ({ currentUser, orgProfile, events, ready }) => {
  const data = [
    {
      image: "images/young_people_image.jpg",
      caption: 'Helping those in need',
    },
    {
      image: "images/food-drive.jpeg",
      caption: 'Local food drive',
    },
    {
      image: "images/food-donations.jpeg",
      caption: 'Donating foods to local shelters',
    },
    {
      image: "images/beach-clean.jpeg",
      caption: 'Beach clean up at North Shore',
    },
    {
      image: "images/helping-line.webp",
      caption: 'Community Potato Harvest',
    },
    {
      image: "images/planting-trees.jpeg",
      caption: 'Forest Preservation Efforts',
    },
    {
      image: "images/surfboards.jpeg",
      caption: 'Supporting Local Hawaii Businesses',
    },
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  };
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  return ((ready) ? (
    <Grid id={PAGE_IDS.ORGANIZATION_PROFILE} container centered>
      <Grid.Row>
        <Image src="images/event_card_default_image.png" size='big' />
      </Grid.Row>
      <Grid.Row >
        <Grid.Row>
          {(currentUser === orgProfile.primaryContactEmail && Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION])) ? (
            <Button as={NavLink} exact to={`/edit-organization-profile/${orgProfile._id}`}>Edit Profile</Button>
          ) : ''}
          {(Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
            <Button as={NavLink} exact to={`/volunteer-send-email/${orgProfile._id}`}>Send an email</Button>
          ) : ''}
        </Grid.Row>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Label size='massive' ribbon>
            {`${(orgProfile.organizationName)}`}
          </Label>
          <Image src={orgProfile.logoImage} size='medium' circular centered />
          <Divider/>
          <Segment>
            <Header as="h3">
              <Icon name="book"/>
              <Header.Content>Contact Info</Header.Content>
            </Header>
            <p>
            Primary Contact Name: {orgProfile.firstName} {orgProfile.lastName}
              <br/>
            Primary Contact Email: {orgProfile.primaryContactEmail} <br/>
            Phone Number: {orgProfile.phoneNumber} <br/>
            </p>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="star"/>
              <Header.Content>Address</Header.Content>
            </Header>
            <p>
              {orgProfile.primaryAddress} <br/>
              {orgProfile.city}, {orgProfile.state} {orgProfile.zipcode}<br/>
            </p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header as="h3">
              <Icon name="bolt"/>
              <Header.Content>
              Our Mission!
              </Header.Content>
              <p>
                {orgProfile.missionStatement}
              </p>
            </Header>
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="globe"/> Gallery
            </Header>
            <Carousel
              data={data}
              time={2000}
              width="850px"
              height="400px"
              captionStyle={captionStyle}
              radius="10px"
              slideNumber={true}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              automatic={true}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              thumbnails={true}
              thumbnailWidth="100px"
              style={{
                textAlign: 'center',
                maxWidth: '850px',
                maxHeight: '500px',
                margin: '40px auto',
              }}
            />
          </Segment>
          <Segment>
            <Header as="h3">
              <Icon name="calendar outline"/> Upcoming Events
            </Header>
            <Card.Group centered>
              {
                events.map((event) => <EventCard key={event._id} event={event}/>)
              }
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Divider/>
    </Grid>
  ) : <Loader active>Getting data</Loader>);
};

OrganizationProfile.propTypes = {
  currentUser: PropTypes.string,
  orgProfile: PropTypes.object,
  events: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get access to organization documents.
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const { _id } = match.params;
  const orgProfileId = _id;
  const subscription = OrganizationProfiles.subscribe();
  const subscription2 = OrganizationEvent.subscribe();
  const subscription3 = Events.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready();
  const orgProfile = (orgProfileId !== 'user') ? OrganizationProfiles.findOne({ _id: orgProfileId }, {}) : OrganizationProfiles.findOne({ userID: Meteor.userId() }, {});
  const eventOrganizations = (typeof orgProfile !== 'undefined') ? OrganizationEvent.find({ organizationID: orgProfile._id }, {}).fetch() : [];
  const eventIDList = _.uniq(eventOrganizations.map(eventOrganization => eventOrganization.eventID));
  const events = eventIDList.map((eventID) => Events.findOne({ _id: eventID }, {}));
  return {
    orgProfile,
    events,
    ready,
    currentUser,
  };
})(OrganizationProfile);
