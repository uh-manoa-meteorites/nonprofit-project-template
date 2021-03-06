import { signOutPage } from './simple.page';
import { signInPage } from './signin.page';
import { navBar } from './navbar.component';
import { volunteerSignupPage } from './volunteersignup.page';
import { landingPage } from './landing.page';
import { volunteerProfilePage } from './volunteerporfile.page';
import { editVolunteerProfilePage } from './editvolunteerporfile.page';
import { browseOpportunityPage } from './browseopport.page';
import { eventProfilePage } from './eventprofile.page';
import { organizationLibraryPage } from './organizationlibrary.page';
import { adminManageBoardPage } from './adminmanageboard.page';
import { t } from 'testcafe';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const newCredentials = { username: 'janefonda@foo.com', password: 'changeme' };
const volunteer = { username: 'jerry@foo.com', password: 'changeme' };

fixture('matrp localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that sign in and sign out work', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that volunteer sign up and sign out work', async () => {
  await navBar.gotoVolunteerSignupPage();
  await volunteerSignupPage.signupVolunteer(newCredentials.username, newCredentials.password);
});

test('Test that user pages show up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that admin pages show up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
});

test('Test that volunteer profile pages show up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(volunteer.username, volunteer.password);
  await navBar.isLoggedIn(volunteer.username);
  await navBar.gotoVolunteerProfilePage();
  await volunteerProfilePage.isDisplayed();
});

test('Test that edit volunteer profile pages work', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(volunteer.username, volunteer.password);
  await navBar.isLoggedIn(volunteer.username);
  await navBar.gotoVolunteerProfilePage();
  await volunteerProfilePage.clickEditVolunteerButton();
  await editVolunteerProfilePage.isDisplayed();
  await editVolunteerProfilePage.changeData();
  await editVolunteerProfilePage.clickSubmitButton();
});

test('Test that browse opportunity works', async () => {
  await navBar.gotoBrowseOpportunityPage();
  await browseOpportunityPage.isDisplayed();
});

test('Test that event profile works', async () => {
  await navBar.gotoEventProfilePage();
  await eventProfilePage.isDisplayed();
});

test('Test the organization library', async () => {
  await navBar.gotoOrganizationLibraryPage();
  await organizationLibraryPage.isDisplayed();
  await organizationLibraryPage.isOrgCardDisplayed();
});

test('Test the admin tracker hours page', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.gotoAdminVolunteerAndEventPage();
  await adminManageBoardPage.isDisplayed();
  await adminManageBoardPage.changeToEventTap();
  await adminManageBoardPage.clickEventHourButton();
  await adminManageBoardPage.clickVolunteerListForEventConfirmButton();
  const waitTime = 15;
  await t.wait(waitTime * 100);
});
