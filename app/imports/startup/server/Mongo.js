import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/EventCollection';
import { OrganizationProfiles } from '../../api/organization/OrganizationProfileCollection';
import { Interests } from '../../api/interest/InterestCollection';
import { SpecialSkills } from '../../api/special_skills/SpecialSkillCollection';
import { Environmental } from '../../api/environmental_preference/EnvironmentalPreferenceCollection';
import { Availabilities } from '../../api/availability/AvailabilityCollection';
import { VolunteerProfiles } from '../../api/volunteer/VolunteerProfileCollection';
import { VolunteerInterest } from '../../api/interest/VolunteerInterestCollection';
import { VolunteerSkill } from '../../api/special_skills/VolunteerSkillCollection';
import { VolunteerEnvironmental } from '../../api/environmental_preference/VolunteerEnvironmentalCollection';
import { VolunteerAvailability } from '../../api/availability/VolunteerAvailabilityCollection';
import { VolunteerEvent } from '../../api/event/VolunteerEventCollection';
import { OrganizationEvent } from '../../api/event/OrganizationEventCollection';
import { Hours } from '../../api/hours/HoursCollection';
import { VolunteerEventHours } from '../../api/hours/VolunteerEventHours';
import { Industries } from '../../api/industry/IndustryCollection';
import { EventInterest } from '../../api/interest/EventInterestCollection';
import { EventSkill } from '../../api/special_skills/EventSkillCollection';
import { EventEnvironmental } from '../../api/environmental_preference/EventEnvironmentalCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addEvent(data) {
  console.log(`  Adding: ${data.eventName} (${data.orgName})`);
  Events.define(data);
}

if (Events.count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.map(data => addEvent(data));
  }
}

function addOrganization(data) {
  // this code need to be change
  // console.log(data);
  // eslint-disable-next-line no-param-reassign
  data.primaryContactPhone = data.phoneNumber;
  // eslint-disable-next-line no-param-reassign
  data.primaryAddress = '1234 Example Address';
  // eslint-disable-next-line no-param-reassign
  data.primaryContactFirstName = data.firstName;
  // eslint-disable-next-line no-param-reassign
  data.primaryContactLastName = data.lastName;
  // eslint-disable-next-line no-param-reassign
  data.primaryContactEmail = data.email;
  // eslint-disable-next-line no-param-reassign
  data.ein = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
  // eslint-disable-next-line no-param-reassign
  data.city = 'Honolulu';
  // eslint-disable-next-line no-param-reassign
  data.state = 'Hawaii';
  // eslint-disable-next-line no-param-reassign
  data.zipcode = '96xxx';
  // console.log(data);
  // above code need to be change
  console.log(`  Adding: ${data.email} (${data.organizationName})`);
  OrganizationProfiles.define(data);
}

if (OrganizationProfiles.count() === 0) {
  if (Meteor.settings.defaultOrganizations) {
    console.log('Creating default organizations.');
    Meteor.settings.defaultOrganizations.map(data => addOrganization(data));
  }
}

function addInterest(data) {
  console.log(`  Adding interest: ${data.name}`);
  Interests.define(data);
}

if (Interests.count() === 0) {
  if (Meteor.settings.defaultInterests) {
    console.log('Creating default Interests.');
    Meteor.settings.defaultInterests.map(data => addInterest(data));
  }
}

function addSpecialSkills(data) {
  console.log(`  Adding special skills: ${data.name}`);
  SpecialSkills.define(data);
}

if (SpecialSkills.count() === 0) {
  if (Meteor.settings.defaultSpecialSkills) {
    console.log('Creating default Special Skills.');
    Meteor.settings.defaultSpecialSkills.map(data => addSpecialSkills(data));
  }
}

function addEnvironmentalPreferences(data) {
  console.log(`  Adding environmental preferences: ${data.name}`);
  Environmental.define(data);
}

if (Environmental.count() === 0) {
  if (Meteor.settings.defaultEnvironmentalPreferences) {
    console.log('Creating default Environmental Preferences.');
    Meteor.settings.defaultEnvironmentalPreferences.map(data => addEnvironmentalPreferences(data));
  }
}

function addAvailabilities(data) {
  console.log(`  Adding availabilities: ${data.name}`);
  Availabilities.define(data);
}

if (Availabilities.count() === 0) {
  if (Meteor.settings.defaultAvailabilities) {
    console.log('Creating default Availabilities.');
    Meteor.settings.defaultAvailabilities.map(data => addAvailabilities(data));
  }
}

if (VolunteerInterest.count() === 0) {
  console.log('Creating default VolunteerInterest collection.');
  const volunteerArray = VolunteerProfiles.find({}, {}).fetch();
  const interestsArray = Interests.find({}, {}).fetch();
  let length = volunteerArray.length;
  if (length > interestsArray.length) {
    length = interestsArray.length;
  }
  interestsArray.map((interest, index) => (VolunteerInterest.define({
    volunteerID: volunteerArray[(index % length)].userID, interestID: interest._id })));
}

if (VolunteerSkill.count() === 0) {
  console.log('Creating default VolunteerSkill collection.');
  const volunteerArray = VolunteerProfiles.find({}, {}).fetch();
  const skillsArray = SpecialSkills.find({}, {}).fetch();
  let length = volunteerArray.length;
  if (length > skillsArray.length) {
    length = skillsArray.length;
  }
  skillsArray.map((skill, index) => (VolunteerSkill.define({
    volunteerID: volunteerArray[(index % length)].userID, skillID: skill._id })));
}

if (VolunteerEnvironmental.count() === 0) {
  console.log('Creating default VolunteerEnvironmental collection.');
  const volunteerArray = VolunteerProfiles.find({}, {}).fetch();
  const environmentalArray = Environmental.find({}, {}).fetch();
  let length = volunteerArray.length;
  if (length > environmentalArray.length) {
    length = environmentalArray.length;
  }
  volunteerArray.map((volunteer, index) => (VolunteerEnvironmental.define({
    volunteerID: volunteer.userID, environmentalID: environmentalArray[(index % length)]._id })));
}

if (VolunteerAvailability.count() === 0) {
  console.log('Creating default VolunteerAvailability collection.');
  const volunteerArray = VolunteerProfiles.find({}, {}).fetch();
  const availabilitiesArray = Availabilities.find({}, {}).fetch();
  let length = volunteerArray.length;
  if (length > availabilitiesArray.length) {
    length = availabilitiesArray.length;
  }
  availabilitiesArray.map((availability, index) => (VolunteerAvailability.define({
    volunteerID: volunteerArray[(index % length)].userID, availabilityID: availability._id })));
}

if (VolunteerEvent.count() === 0) {
  console.log('Creating default VolunteerEvent collection.');
  const volunteerArray = VolunteerProfiles.find({}, {}).fetch();
  const eventsArray = Events.find({}, {}).fetch();
  let length = volunteerArray.length;
  if (length > eventsArray.length) {
    length = eventsArray.length;
  }
  eventsArray.map((event, index) => (VolunteerEvent.define({
    volunteerID: volunteerArray[(index % length)].userID, eventID: event._id })));
}

if (VolunteerEventHours.count() === 0) {
  console.log('Creating default VolunteerEventHours and Hours collection.');
  const volunteerArray = VolunteerProfiles.find({}, {}).fetch();
  volunteerArray.map((volunteer) => (VolunteerEventHours.define({
    volunteerID: volunteer.userID, hoursID: Hours.define({ total: 0 }) })));
}

if (OrganizationEvent.count() === 0) {
  console.log('Creating default OrgEvent collection.');
  const organizationArray = OrganizationProfiles.find({}, {}).fetch();
  const eventsArray = Events.find({}, {}).fetch();
  let length = organizationArray.length;
  if (length > eventsArray.length) {
    length = eventsArray.length;
  }
  const orgIndex = [];
  eventsArray.map((event) => orgIndex.push(organizationArray.findIndex((organization) => organization.email === event.owner)));
  eventsArray.map((event, index) => (OrganizationEvent.define({
    organizationID: organizationArray[orgIndex[index]]._id, eventID: event._id })));
}

function addIndustries(data) {
  console.log(`  Adding industries: ${data.name}`);
  Industries.define(data);
}

if (Industries.count() === 0) {
  if (Meteor.settings.defaultIndustries) {
    console.log('Creating default industries.');
    Meteor.settings.defaultIndustries.map(data => addIndustries(data));
  }
}

if (EventEnvironmental.count() === 0) {
  console.log('Creating default VolunteerEnvironmental collection.');
  const eventArray = Events.find({}, {}).fetch();
  const environmentalArray = Environmental.find({}, {}).fetch();
  let length = eventArray.length;
  if (length > environmentalArray.length) {
    length = environmentalArray.length;
  }
  eventArray.map((event, index) => (EventEnvironmental.define({
    eventID: event._id, environmentalID: environmentalArray[(index % length)]._id })));
}

if (EventSkill.count() === 0) {
  console.log('Creating default EventSkill collection.');
  const eventArray = Events.find({}, {}).fetch();
  const skillsArray = SpecialSkills.find({}, {}).fetch();
  let length = eventArray.length;
  if (length > skillsArray.length) {
    length = skillsArray.length;
  }
  skillsArray.map((skill, index) => (EventSkill.define({
    eventID: eventArray[(index % length)]._id, skillID: skill._id })));
}

if (EventInterest.count() === 0) {
  console.log('Creating default EventInterest collection.');
  const eventArray = Events.find({}, {}).fetch();
  const interestsArray = Interests.find({}, {}).fetch();
  let length = eventArray.length;
  if (length > interestsArray.length) {
    length = interestsArray.length;
  }
  interestsArray.map((interest, index) => (EventInterest.define({
    eventID: eventArray[(index % length)]._id, interestID: interest._id })));
}
