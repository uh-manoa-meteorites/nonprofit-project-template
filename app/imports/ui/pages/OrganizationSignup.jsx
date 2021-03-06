import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Grid, Form, Segment, Loader, Message } from 'semantic-ui-react';
import { AutoForm, TextField, SubmitField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import Axios from 'axios';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { signUpNewOrganizationMethod } from '../../api/organization/OrganizationProfileCollection.methods';
import { Industries } from '../../api/industry/IndustryCollection';
import OrganizationSignupBackground from '../components/OrganizationSignupBackground';
import { checkboxHelper } from '../components/VolunteerUsefulFunction';

const formSchema = new SimpleSchema({
  email: String,
  ein: String, // check if valid EIN code, code is for official organizations??
  primaryAddress: String,
  city: String,
  state: String,
  zipcode: String,
  primaryContactFirstName: String,
  primaryContactLastName: String,
  secondContactFirstName: { type: String, optional: true },
  secondContactLastName: { type: String, optional: true },
  primaryContactEmail: String,
  primaryContactPhone: String,
  // username: String,
  password: String,
  // confirmPassword: String,
  logoImage: { type: String, optional: true },
  organizationName: String,
  missionStatement: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const OrganizationSignup = ({ location, ready, industriesArray }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [industries, setIndustries] = useState([]);
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [termsConditions, setTermsConditions] = useState('');
  const [isValueEmpty, setIsValueEmpty] = useState(Array(2).fill(false));
  const [disableSecondContact, setDisableSecondContact] = useState(true);
  const [image, setImage] = useState('');

  // const [image, setImage] = useState('');

  // verify if passwords match
  const verifyPassword = (inputOne, inputTwo) => {
    if (inputOne === inputTwo) {
      return true;
    }
    swal('Error!', 'Your passwords do not match', 'error');
    return false;
  };

  // referenced VolunteerSignUp matcher
  const validateEmail =
    (email) => String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const verifyEmail = (email) => {
    if (validateEmail(email)) {
      return true;
    }
    swal('Error!', 'Please enter a valid email', 'error');
    return false;
  };

  const agreePolicyAndTerms = (value) => {
    if (!value || value === '') {
      swal('Error!', 'Please confirm that you agree to our Privacy Policy and Terms & Conditions', 'error');
      return false;
    }
    return true;
  };

  const setIsValueEmptyHelper = (index, value) => {
    isValueEmpty[index] = value;
    setIsValueEmpty(isValueEmpty);
  };

  const uploadImage = (files) => {
    // eslint-disable-next-line no-undef
    const data = new FormData();
    data.append('file', files[0]);
    data.append('cloud_name', 'irene-ma');
    data.append('upload_preset', 'nkv8kepo');
    Axios.post('https://api.cloudinary.com/v1_1/irene-ma/image/upload', data).then((r) => {
      console.log(r.data.url);
      setImage(r.data.url);
    });
  };

  // Update the form controls each time the user interacts with them
  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'confirmPassword':
      setConfirmPassword(value);
      break;
    case 'industries':
      setIndustries(checkboxHelper(industries, value));
      break;
    case 'addSecondContact':
      // eslint-disable-next-line no-unused-expressions
      (disableSecondContact) ? setDisableSecondContact(false) : setDisableSecondContact(true);
      break;
    case 'image':
      setImage(value);
      break;
    case 'privacyPolicy':
      if (privacyPolicy === '') {
        setPrivacyPolicy(value);
        setIsValueEmptyHelper(1, false);
      } else {
        setPrivacyPolicy('');
        setIsValueEmptyHelper(1, true);
      }
      break;
    case 'terms&Conditions':
      if (termsConditions === '') {
        setTermsConditions(value);
        setIsValueEmptyHelper(1, false);
      } else {
        setTermsConditions('');
        setIsValueEmptyHelper(1, true);
      }
      break;
    default:
      // do nothing
    }
  };

  const submit = (data, formRef) => {
    if (verifyPassword(data.password, confirmPassword)
      && agreePolicyAndTerms(privacyPolicy)
      && verifyEmail(data.email)) {
      // eslint-disable-next-line no-param-reassign
      data.username = data.email;
      // eslint-disable-next-line no-param-reassign
      data.industries = industries;
      // eslint-disable-next-line no-param-reassign
      data.logoImage = image;
      console.log(data);
      // insert Organization Profile Collection method here
      signUpNewOrganizationMethod.callPromise(data).catch(error => {
        swal('Error', error.message, 'error');
      })
        .then(() => {
          formRef.reset();
          setIndustries('');
          setImage('');
          swal({
            title: 'Success',
            text: 'Organization has been added',
            icon: 'success',
            timer: 1500,
          });
          setRedirectToReferer(true);
        });
    }
  };

  // Display the Organization Sign Up form. Redirect to add page after successful registeration and login
  const { from } = location.state || { from: { pathname: '/add' } };

  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }

  if (!ready) {
    return <Loader active>Getting data</Loader>;
  }

  let fRef = null;

  return (
    <div>
      <OrganizationSignupBackground/>
      <br/>
      <Container id={PAGE_IDS.ORGANIZATION_SIGNUP}>
        <br/>
        <Grid>
          <Grid.Column>
            <AutoForm ref={ref => {
              fRef = ref;
            }}
            schema={bridge}
            onSubmit={data => submit(data, fRef)}>
              <Segment stacked>
                <TextField
                  name='organizationName' type='name'
                  label='Organization Name'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_ORGANIZATION_NAME}/>
                <TextField
                  name='email'
                  type='email'
                  label='E-mail Address'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_EMAIL}/>
                <TextField
                  name='ein'
                  label='EIN'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_EIN}/>
                <TextField
                  name='primaryAddress'
                  label='Primary Address'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_PRIMARY_ADDRESS}/>
                <TextField
                  name='city'
                  label='City'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_CITY}/>
                <TextField
                  name='state'
                  label='State'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_STATE}/>
                <TextField
                  name='zipcode'
                  label='Zip/Postal Code'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_ZIPCODE_POSTALCODE}/>
                <label>Industry</label>
                <Form.Group>
                  <Grid columns={2} container>
                    <Grid.Row style={{ paddingLeft: '8px' }}>
                      {industriesArray.map((industry, index) => (
                        <Grid.Column key={`organization-signup-grid-industries-${index}`}>
                          <Form.Radio
                            key={`organization-signup-industries-${industry._id}`}
                            id={`organization-signup-industries-${index}`}
                            label={industry.name}
                            name='industries'
                            value={industry._id}
                            onChange={handleChange}
                          />
                        </Grid.Column>
                      ))}
                    </Grid.Row>
                  </Grid>
                </Form.Group>
                <TextField
                  name='primaryContactFirstName'
                  label='Primary Contact First Name'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_PRIMARY_CONTACT_FIRST_NAME}/>
                <TextField
                  name='primaryContactLastName'
                  label='Primary Contact Last Name'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_PRIMARY_CONTACT_LAST_NAME}/>
                <TextField
                  name='primaryContactEmail'
                  label='Primary Contact Email'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_PRIMARY_CONTACT_EMAIL}/>
                <TextField
                  name='primaryContactPhone'
                  label='Primary Phone Number'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_PRIMARY_CONTACT_PHONE_NUMBER}/>
                <TextField
                  name='missionStatement'
                  label='Mission Statement'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_MISSION_STATEMENT}/>
                <TextField
                  name='password'
                  label='Password'
                  type='password'
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_PASSWORD}/>
                <Form.Input
                  label="Confirm Password"
                  id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_CONFIRM_PASSWORD}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Your Password"
                  required
                  onChange={handleChange}
                />
                <Form.Input
                  name='image'
                  label="Upload a Profile Picture"
                  type="file"
                  onChange={(event) => {
                    uploadImage(event.target.files);
                  }}
                />
                <Form.Field>
                  <Message>Please confirm that you agree to our <Link to="/privacy" target="_blank">Privacy Policy</Link> and <Link to="/terms" target="_blank">Terms & Conditions</Link></Message>
                  <Form.Checkbox
                    label='I agree to the Privacy Policy'
                    name='privacyPolicy'
                    value='agree'
                    onChange={handleChange}
                    error={ isValueEmpty[1] }
                    required
                  />
                  <Form.Checkbox
                    label='I agree to the Terms & Conditions'
                    name='terms&Conditions'
                    value='agree'
                    onChange={handleChange}
                    error={ isValueEmpty[1] }
                    required
                  />
                </Form.Field>
                <Grid centered>
                  <SubmitField value='Sign up' id={COMPONENT_IDS.ORGANIZATION_SIGNUP_FORM_SUBMIT}/>
                </Grid>
                <br/>
              </Segment>
            </AutoForm>
            <Message>Already have an account? Login <Link to='/signin'>here</Link></Message>
          </Grid.Column>
        </Grid>
        <br/>
      </Container>
    </div>
  );
};

OrganizationSignup.propTypes = {
  location: PropTypes.object,
  industriesArray: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription1 = Industries.subscribe();
  const ready = subscription1.ready();
  const industriesArray = Industries.find({}, {}).fetch();
  // console.log(industriesArray);
  return {
    industriesArray,
    ready,
  };
})(OrganizationSignup);
