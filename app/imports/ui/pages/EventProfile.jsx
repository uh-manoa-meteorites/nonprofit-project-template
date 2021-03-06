import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Container,
  Button,
  Header,
  Form,
  Divider,
  Loader,
  Grid,
  Icon,
  Segment,
  Image,
  Label,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Carousel } from 'react-carousel-minimal';
import { Events } from '../../api/event/EventCollection';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';
import { EventInterest } from '../../api/interest/EventInterestCollection';
import { EventSkill } from '../../api/special_skills/EventSkillCollection';
import { EventEnvironmental } from '../../api/environmental_preference/EventEnvironmentalCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { Interests } from '../../api/interest/InterestCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { OrganizationEvent } from '../../api/event/OrganizationEventCollection';
import { createNewMessageMethod } from '../../api/message/MessageCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
// import { ROLE } from '../../api/role/Role';

// Renders a Event Info page that connects with the current Event collection.
const EventProfile = ({ currentUser, event, orgProfile, skills, environments, interests, ready }) => {
  const [openSendMail, setOpenSendMail] = useState(false);
  const [cSubject, setSubject] = useState('');
  const [cContent, setContent] = useState('');

  const getDirections = () => {
    const link = `https://www.google.com/maps/place/${event.eventAddress}`;
    // eslint-disable-next-line no-undef
    window.open(link);
  };

  const handleOpen = () => {
    setOpenSendMail(true);
  };

  const handleClose = () => {
    setOpenSendMail(false);
  };

  const handleContentChange = (e, { value }) => {
    setContent(value);
  };

  const handleSubjectChange = (e, { value }) => {
    setSubject(value);
  };

  const convertDate = (date) => {
    let returnValue;
    let setter = false;
    const splitArray = date.split('-');
    if (splitArray[0] > 0) {
      setter = true;
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      const temp = splitArray[2];
      splitArray[2] = splitArray[0];
      splitArray[0] = months[splitArray[1] - 1];
      splitArray[1] = temp;
    }
    // eslint-disable-next-line no-unused-expressions
    (setter) ? returnValue = `${splitArray[0]} ${splitArray[1]}, ${splitArray[2]}` : returnValue = date;
    return returnValue;
  };

  const convertTime = (time) => {
    const splitArray = time.split(':');
    if (splitArray[0] > 12) {
      splitArray[0] -= 12;
      splitArray[3] = ' PM';
    } else {
      splitArray[3] = ' AM';
    }
    splitArray[2] = splitArray[1];
    splitArray[1] = ':';
    return splitArray[0] + splitArray[1] + splitArray[2] + splitArray[3];
  };

  const handleSendSubmit = () => {
    const recipient = orgProfile.email;
    const name = currentUser;
    const beRead = false;
    const createdAt = new Date();
    const email = Meteor.user().username;
    const subject = cSubject;
    const content = cContent;
    createNewMessageMethod.callPromise({ name, subject, content, email, createdAt, beRead, recipient })
      .catch(error => {
        swal('Error', error.message, 'error');
      })
      .then(() => {
        // Not sure why it catches the error but still executes
        setContent('');
        setSubject('');
        swal({
          title: 'Message Sent',
          text: 'Your message has been sent',
          icon: 'success',
          timer: 1500,
        });
      });

  };
  const popupStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  };

  const innerStyle = {
    position: 'absolute',
    width: '50%',
    left: '25%',
    top: '25%',
    margin: 'auto',
  };

  const data = [
    {
      image: 'images/cleaning-beaches.jpeg',
      caption: 'Beach clean up at Sandys',
    },
    {
      image: 'images/cleaning-pond.webp',
      caption: 'Restoration of Hawaiian Fishponds',
    },
    {
      image: 'images/field-trip.jpeg',
      caption: 'Teaching our Keiki about Sustainability',
    },
    {
      image: 'images/helping-line.webp',
      caption: 'Giving Back to the Community',
    },
    {
      image: 'images/school-volunteer.png',
      caption: 'High school volunteers',
    },
    {
      image: 'images/planting-trees.jpeg',
      caption: 'Forest Restoration',
    },
    {
      image: 'images/surfboards.jpeg',
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

  return (
    ((ready) ? (
      <div id={PAGE_IDS.EVENT_PROFILE} >
        <Grid stackable container verticalAlign="bottom" textAlign='center' columns={3}>
          <Grid.Row>
            <Image src={event.eventProfileImage} fluid/>
          </Grid.Row>

          <Divider/>

          <Grid.Row>
            <Grid.Column>
              <Header as='h2' inverted block>
                {event.eventName}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' inverted block>
                    Opportunity Date: {convertDate(event.eventDate)} from {convertTime(event.eventStartTime)} through {convertTime(event.eventEndTime)}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' inverted block>
                {orgProfile.email}
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Container>
          <Divider/>
          <Header as='h1' textAlign='center'>General Information</Header>

          <Grid stackable columns={2}>
            <Grid.Row centered>
              <Button onClick={getDirections}>Get directions</Button>
              <Button as={NavLink} exact to={`/volunteer-send-email/${orgProfile._id}`}>Send an email</Button>
              <Button onClick={handleOpen}>Direct Message</Button>
            </Grid.Row>

            <Grid.Column>
              <Segment>
                <Header as="h3">
                  <Icon name="location arrow"/> Location
                </Header>
                <Image src={'/images/red-cross-map.jpeg'}/>
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="write"/> Description
                </Header>
                <p>
                  {event.eventDescription}
                </p>
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="grid layout"/> Other Details
                </Header>
                <Icon name='user circle'/> Family-Friendly, Adults <br/>
                <Icon name='user plus'/> Mixed
              </Segment>
              <Segment>
                <Header as="">
                  <Icon name="calendar"/> Upcoming Dates
                </Header>
                {convertDate(event.eventDate)}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as="h3">
                  <Icon name="building"/> Organization
                </Header>
                {event.orgName}
              </Segment>
              <Segment>
                <Header as="h3">
                  <Icon name="address card"/> Contact Details
                </Header>
                {orgProfile.firstName} {orgProfile.lastName}<br/>
                {orgProfile.email} <br/>

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
                <Header as={'h3'}> Skills </Header>
                <Divider/>
                {/* eslint-disable-next-line react/prop-types */}
                {skills.map((skill, index) => (
                  <Label color='purple' key={`event-skill-${index}`}>
                    {skill.name}
                  </Label>))}
                <Header as={'h3'}> Environment </Header>
                <Divider/>
                {/* eslint-disable-next-line react/prop-types */}
                {environments.map((environment, index) => (
                  <Label color='blue' key={`event-environment-${index}`}>
                    {environment.name}
                  </Label>))}
                <Header as={'h3'}> Interests </Header>
                <Divider/>
                {/* eslint-disable-next-line react/prop-types */}
                {interests.map((interest, index) => (
                  <Label color='green' key={`event-interest-${index}`}>
                    {interest.name}
                  </Label>))}
              </Segment>
            </Grid.Column>
          </Grid>

          {openSendMail ?
            <div>
              <div style={popupStyle}/>
              <Segment style={innerStyle}>
                <Button icon={'close'} floated={'right'} circular onClick={handleClose}/>
                <Header as={'h1'} textAlign={'center'} content={'SEND MESSAGE'}/>
                <Divider/>
                <Form onSubmit={handleSendSubmit}>
                  <Header content={`To: ${orgProfile.email}`}/>
                  <Form.Input required
                    label='Subject'
                    type='subject'
                    name='subject'
                    onChange={handleSubjectChange}
                    placeholder='Subject'/>
                  <Form.TextArea style={{ maxHeight: 261, height: 261 }}
                    required
                    label='Content'
                    name='content'
                    onChange={handleContentChange}
                    type='content'/>
                  <Form.Button content='Send' color={'blue'}/>
                </Form>
              </Segment>
            </div> : ''}

        </Container>
      </div>
    ) : <Loader active>Getting data</Loader>)
  );
};

// Require an Event object in the props.
EventProfile.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    eventDate: PropTypes.string,
    eventDescription: PropTypes.string,
    eventProfileImage: PropTypes.string,
    eventStartTime: PropTypes.string,
    eventEndTime: PropTypes.string,
    eventAddress: PropTypes.string,
    eventZip: PropTypes.string,
    eventCity: PropTypes.string,
    eventState: PropTypes.string,
    categories: PropTypes.string,
    orgName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  volunteer: PropTypes.shape({
    _id: PropTypes.string,
  }),
  orgProfile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }),
  skills: PropTypes.array,
  interests: PropTypes.array,
  environments: PropTypes.array,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  // Get the eventID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = match.params;
  const eventID = _id;
  const subscription1 = Events.subscribe();
  const subscription2 = EventInterest.subscribe();
  const subscription3 = EventSkill.subscribe();
  const subscription4 = EventEnvironmental.subscribe();
  const subscription5 = SpecialSkills.subscribe();
  const subscription6 = Interests.subscribe();
  const subscription7 = Environmental.subscribe();
  const subscription8 = OrganizationProfiles.subscribe();
  const subscription9 = OrganizationEvent.subscribe();

  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready() &&
    subscription5.ready() && subscription6.ready() && subscription7.ready() && subscription8.ready() && subscription9.ready();
  if (!ready) {
    return null;
  }
  
  const event = Events.find({ _id: eventID }).fetch()[0];
  const orgProfile = OrganizationProfiles.findOne({ email: event.owner }, {});
  const skillPairs = EventSkill.find({ eventID: eventID }, {}).fetch();
  const skills = skillPairs.map((pair) => SpecialSkills.findOne({ _id: pair.skillID }, {}));
  const interestPairs = EventInterest.find({ eventID: eventID }, {}).fetch();
  const interests = interestPairs.map((pair) => Interests.findOne({ _id: pair.interestID }, {}));
  const environmentPairs = EventEnvironmental.find({ eventID: eventID }, {}).fetch();
  const environments = environmentPairs.map((pair) => Environmental.findOne({ _id: pair.environmentalID }, {}));
  return {
    event,
    skills,
    interests,
    environments,
    orgProfile,
    currentUser,
    ready,
  };
})(EventProfile);
