import React from 'react';
import { Button, Header, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/AdminManageBoard.jsx. */
const ListEventsAdmin = ({ event, index }) => (
  <Table.Row>
    <Table.Cell>
      <Header as='h4'>
        <Header.Content>
          {event.eventName}
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>{event.eventStartTime} - {event.eventEndTime}</Table.Cell>
    <Table.Cell>{event.orgName}</Table.Cell>
    <Table.Cell>{event.owner}</Table.Cell>
    <Table.Cell>
      <Button as={NavLink} exact to={`/volunteer-list-for-event/${event._id}`} id={`view-event-hour-button-${index}`}>View</Button>
      <Button>Delete</Button>
    </Table.Cell>
  </Table.Row>
);

// Require a document to be passed to this component.
ListEventsAdmin.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    date: PropTypes.string,
    eventStartTime: PropTypes.string,
    eventEndTime: PropTypes.string,
    orgName: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }),
  index: PropTypes.number,
};

export default ListEventsAdmin;
