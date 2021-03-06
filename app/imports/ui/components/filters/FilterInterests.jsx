import React, { useState } from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { AutoForm, SubmitField, SelectField } from 'uniforms-semantic';
import { _ } from 'meteor/underscore';
import { Events } from '../../../api/event/EventCollection';
import { Interests } from '../../../api/interest/InterestCollection';
import { EventInterest } from '../../../api/interest/EventInterestCollection';
import EventCard from '../EventCard';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeInterestsSchema = (allInterests) => new SimpleSchema({
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

/** Renders the Profile Collection as a set of Cards. */
const FilterInterests = ({ ready }) => {
  const [interests, setInterests] = useState([]);
  const allInterests = _.pluck(Interests.find({}, {}).fetch(), 'name');
  const interestFormSchema = makeInterestsSchema(allInterests);
  const interestBridge = new SimpleSchema2Bridge(interestFormSchema);
  const interestIDs = interests.map(name => Interests.findDoc(name)._id);
  const eventInterests = EventInterest.find({ interestID: { $in: interestIDs } }, {}).fetch();
  const eventIDList = _.uniq(eventInterests.map(eventInterest => eventInterest.eventID));
  const eventsByInterest = eventIDList.map(id => Events.findDoc(id));
  const submitInterests = (data) => {
    setInterests(data.interests);
  };

  if (!ready) {
    return <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  return (
    <Container>
      <AutoForm schema={interestBridge} onSubmit={data => submitInterests(data)} >
        <Segment>
          <SelectField id='interests' name='interests' showInlineError={true} placeholder={'Interests'} multiple checkboxes/>
          <SubmitField id='submit' value='Submit'/>
        </Segment>
      </AutoForm>
      <Card.Group style={{ paddingTop: '10px' }}>
        {_.map(eventsByInterest, (event, index) => <EventCard key={index} event={event}/>)}
      </Card.Group>
    </Container>
  );
};

/** Require an array of Stuff documents in the props. */
FilterInterests.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription1 = Events.subscribe();
  const subscription2 = Interests.subscribe();
  const subscription3 = EventInterest.subscribe();
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready();
  return {
    ready,
  };
})(FilterInterests);
