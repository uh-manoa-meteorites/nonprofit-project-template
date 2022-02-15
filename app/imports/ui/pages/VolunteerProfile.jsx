import React from 'react';
import { Grid, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import volunteerProfile from '../components/volunteerProfile/volunteerProfile';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';

/** Renders the Page for adding a document. */
const VolunteerProfile = ({ ready, volunteers }) => ((ready) ? (
  <Grid id={PAGE_IDS.VOLUNTEER_PROFILE} container centered>
    <Grid.Column>
      <div className="about-us-header">
        <Header as="h1" textAlign="center">{volunteers.map((volunteer) => <volunteerProfile key={volunteer._id} volunteer={volunteer} />)}
        </Header>
        <Header as="h2" textAlign="center"> Welcome {volunteers.map((volunteer) => <volunteerProfile key={volunteer._id} volunteer={volunteer}/>)} </Header>
      </div>
    </Grid.Column>
  </Grid>
) : <Loader active>Getting data</Loader>);

VolunteerProfile.propTypes = {
  volunteers: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to volunteer documents.
  const subscription = VolunteerProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the volunteer documents and sort them by name.
  const volunteers = VolunteerProfiles.find({}, { sort: { name: 1 } }).fetch();
  return {
    volunteers,
    ready,
  };
})(VolunteerProfile);