import React from 'react';
import { Card, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

/** Renders a single organization card. */
const OrganizationCard = ({ organization, id }) => (
  <Card id={id} as={NavLink} exact to={`/organization-profile/${organization._id}`}>
    <Image src={organization.eventBackgroundImage} wrapped ui={false}/>
    <Card.Content>
      <Header as='h3'>{organization.organizationName}</Header>
      <Image src={organization.logoImage} size='mini' circular/>
      <Card.Meta>
        {organization.missionStatement}
      </Card.Meta>
      <Card.Content extra>
        <Header as='h4'> Contact Us</Header>
        {organization.primaryContactPhone}
      </Card.Content>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
OrganizationCard.propTypes = {
  organization: PropTypes.shape({
    _id: PropTypes.string,
    logoImage: PropTypes.string,
    eventBackgroundImage: PropTypes.string,
    organizationName: PropTypes.string,
    primaryContactPhone: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    missionStatement: PropTypes.string,
  }).isRequired,
  id: PropTypes.string,
};
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OrganizationCard);
