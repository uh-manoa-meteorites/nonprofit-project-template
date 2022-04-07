import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { VolunteerEvent } from '../../api/event/VolunteerEventCollection';

/* Renders a single event card. */
const EventCard = ({ event }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const vID = Meteor.userId();
    const definitionData = { volunteerID: vID, eventID: event._id };
    if (vID) {
      defineMethod.callPromise({ collectionName: VolunteerEvent.getCollectionName(), definitionData })
        .catch(error => {
          swal('Error', error.message, 'error');
        })
        .then(() => {
          swal({
            title: 'Add Opportunity',
            text: 'Opportunity added successfully',
            icon: 'success',
            timer: 1500,
          });
        });

    }
  };
  return (
    <Card as={NavLink} exact to={`/details/${event._id}`}>
      <Image src= {event.eventCardImage} wrapped ui={false}/>
      <Card.Content>
        <Card.Header> {event.eventName}</Card.Header>
        <Card.Meta>
          <span>Date: {event.eventDate}</span>
          <br/>
          <span>Time: {event.eventTime}</span>
          <br/>
          <span>Location: {event.eventAddress} {event.eventCity}, {event.eventState} {event.eventZip}</span>
          <br/>
        </Card.Meta>
        <Card.Description>
          <p>Placeholder for special skill.</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>
          {event.categories}
        </p>
      </Card.Content>
      <Card.Content>
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Button onClick={handleClick} color='green'>
            Add Event!
          </Button>) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Icon circular inverted color='blue' name='twitter' />) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Icon circular inverted color='blue' name='facebook' />) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Icon circular inverted color='blue' name='mail' />) : ''}
        {(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [ROLE.VOLUNTEER])) ? (
          <Icon circular inverted color='blue' name='pinterest' />) : ''}

      </Card.Content>
    </Card>
  );
};

// Require a document to be passed to this component.
EventCard.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    eventDate: PropTypes.string,
    eventTime: PropTypes.string,
    eventAddress: PropTypes.string,
    eventZip: PropTypes.string,
    eventCity: PropTypes.string,
    eventCardImage: PropTypes.string,
    eventState: PropTypes.string,
    categories: PropTypes.string,
    orgName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  volunteer: PropTypes.shape({
    _id: PropTypes.string,
  }),
  skill: PropTypes.shape({
    _id: PropTypes.array,
  }),
  interest: PropTypes.shape({
    _id: PropTypes.array,
  }),
  environment: PropTypes.shape({
    _id: PropTypes.array,
  }),
};

export default withRouter(EventCard);
