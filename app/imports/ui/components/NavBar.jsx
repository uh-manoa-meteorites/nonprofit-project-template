import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Search, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
// eslint-disable-next-line import/named
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROLE } from '../../api/role/Role';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar = ({ currentUser }) => {
  const menuStyle = { marginBottom: '10px', backgroundColor: '#024731', flexShrink: 0 };
  return (
    <Menu style={menuStyle} attached="top" borderless inverted>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} activeClassName="" exact to="/">
        <Image size='small' circular src="/images/volunteer-ally-temp-logo.png" centered/>
      </Menu.Item>
      <Menu.Item>
        <Search
          placeholder='Search for an Opportunity'
        />
      </Menu.Item>
      {currentUser ? (
        [<Menu.Item id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} activeClassName="active" exact to="/list" key='list'> </Menu.Item>]
      ) : ''}
      {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
        [<Menu.Item id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>,
          <Dropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} item text="Manage" key="manage-dropdown">
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} exact to="/manage-database" content="Database" />
            </Dropdown.Menu>
          </Dropdown>]
      ) : ''}
      <Menu.Item position="right">
        <Menu.Item id={COMPONENT_IDS.NAVBAR_ADD_EVENT} as={NavLink} activeClassName="active" exact to="/add" key='add_event'>Add Event</Menu.Item>
        <Menu.Item id={COMPONENT_IDS.NAVBAR_BROWSE_OPPORTUNITY} as={NavLink} activeClassName="active" exact to="/browse_opportunities" key='browse_opportunity'>Browse Opportunity</Menu.Item>
        <Menu.Item id={COMPONENT_IDS.NAVBAR_ORGANIZATION_LIBRARY} as={NavLink} activeClassName="active" exact to="/find_volunteers" key='organization_library'>Organization Library</Menu.Item>
        <Menu.Item id={COMPONENT_IDS.NAVBAR_ABOUT_US} as={NavLink} activeClassName="active" exact to="/about_us" key='about_us'>About Us</Menu.Item>
        {currentUser === '' ? ([
          <Dropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} text="Login/SignUp" pointing="top right" icon={'user'} key='SignIn_SignOut'>
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} icon="user" text="Sign In" as={NavLink} exact to="/signin" />
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_VOLUNTEER_SIGNUP} icon="add user" text="Volunteer Sign Up" as={NavLink} exact to="/volunteer_signup" key='volunteer_signup' />
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_ORGANIZATION_SIGNUP} icon="building" text="Organization Sign up" as={NavLink} exact to="/organization_signup" key="organization_signup"/>
            </Dropdown.Menu>
          </Dropdown>,
        ]) : (
          <Dropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} text={currentUser} pointing="top right" icon={'user'}>
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.VOLUNTEER_PROFILE} icon="user" text="My Profile" as={NavLink} exact to="/volunteer-profile" />
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Sign Out" as={NavLink} exact to="/signout" />
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu.Item>
    </Menu>
  );
};

// Declare the types of all properties.
NavBar.propTypes =
{
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    currentUser,
  };
})(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
