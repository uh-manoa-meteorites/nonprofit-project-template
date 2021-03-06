import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, Container, Loader, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import LandingTopSection from '../components/landing/LandingTopSection';
import LandingBottomSection from '../components/landing/LandingBottomSection';
import { Events } from '../../api/event/EventCollection';
import EventCard from '../components/EventCard';
import { PAGE_IDS } from '../utilities/PageIDs';

/** A simple static component to render some text for the landing page. */
const Landing = ({ currentUser, ready, events }) => ((ready) ? (
  <div id={PAGE_IDS.LANDING}>
    <LandingTopSection/>
    <Container className="landing-events" textAlign='center'>
      <Header as='h1'>Upcoming Events!!!</Header>
      <Card.Group centered>
        {events.map((event) => <EventCard key={event._id} event={event}/>)}
      </Card.Group>
    </Container>
    { currentUser ? '' : <LandingBottomSection/>}
  </div>
) : <Loader active>Getting data</Loader>);

// Require an Event object in the props.
Landing.propTypes = {
  currentUser: PropTypes.bool.isRequired,
  events: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const currentUser = !!Meteor.user();
  const subscription = Events.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents and sort them by name.
  const events = Events.find({}, { sort: { name: 1 }, limit: 4 }).fetch();
  return {
    currentUser,
    events,
    ready,
  };
})(Landing);
