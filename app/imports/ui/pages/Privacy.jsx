import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Renders the Page for adding a document. */
const Privacy = () => (
  <Grid id={PAGE_IDS.PRIVACY} container centered>
    <Grid.Column>
      <div className="privacy-policy-header">
        <Header as="h1" textAlign="center" inverted>Privacy Policy</Header>
      </div>
      <div className="row, about-us-section">
        <Header as="h2" textAlign="left">Welcome to our Privacy Policy</Header>
        <Header as="h4" textAlign="left">Your privacy is critically important to us. </Header>
        <p>
            Volunteer Ally is located at: <br/>

            Volunteer Ally <br/>
        </p>
        <p>
          {/* eslint-disable-next-line max-len */}
            It is Volunteer Ally’s policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to volunteerally.org (hereinafter, “us”, “we”, or “volunteerally.org”). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this privacy policy (“Privacy Policy”) to explain what information may be collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the Website and does not apply to our collection of information from other sources.
        </p>
        <p>
          {/* eslint-disable-next-line max-len */}
            This Privacy Policy, together with the Terms of service posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms of service.
        </p>

        <Header as="h4" textAlign="left align"> Website Visitors </Header>
        <p>
          {/* eslint-disable-next-line max-len */}
            Like most website operators, Volunteer Ally collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request.Volunteer Ally’s purpose in collecting non-personally identifying information is to better understand how Volunteer Ally’s visitors use its website. From time to time, Volunteer Ally may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.
        </p>
        <p>
          {/* eslint-disable-next-line max-len */}
            Volunteer Ally also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on https://volunteerally.org blog posts. Volunteer Ally only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below.
        </p>

        <Header as="h4" textAlign="left align"> Gathering of Personally-Identifying Information </Header>
        <p>
          {/* eslint-disable-next-line max-len */}
            Certain visitors to Volunteer Ally’s websites choose to interact with Volunteer Ally in ways that require Volunteer Ally to gather personally-identifying information. The amount and type of information that Volunteer Ally gathers depends on the nature of the interaction. For example, we ask visitors who sign up for a blog at https://volunteerally.org to provide a username and email address.
        </p>

        <Header as="h4" textAlign="left align"> Security </Header>
        <p>
          {/* eslint-disable-next-line max-len */}
            The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
        </p>

        <Header as="h4" textAlign="left align"> Advertisements </Header>
        <p>
          {/* eslint-disable-next-line max-len */}
            Ads appearing on our website may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This Privacy Policy covers the use of cookies by Volunteer Ally and does not cover the use of cookies by any advertisers.
        </p>

        <Header as="h4" textAlign="left align"> Links to External Sites </Header>
        <p>
          {/* eslint-disable-next-line max-len */}
            Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy and terms of service of every site you visit. <br/>

            We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services.
        </p>

        <Header as="h4" textAlign="left align"> Protection of Certain Personally - Identifying Information </Header>
        <p>
          {/* eslint-disable-next-line max-len */}
            Volunteer Ally discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on Volunteer Ally’s behalf or to provide services available at Volunteer Ally’s website, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using Volunteer Ally’s website, you consent to the transfer of such information to them. Volunteer Ally will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, Volunteer Ally discloses potentially personally-identifying and personally-identifying information only in response to a subpoena, court order or other governmental request, or when Volunteer Ally believes in good faith that disclosure is reasonably necessary to protect the property or rights of Volunteer Ally, third parties or the public at large.
        </p>
        <p>
          {/* eslint-disable-next-line max-len */}
            If you are a registered user of https://volunteerally.org and have supplied your email address, Volunteer Ally may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what’s going on with Volunteer Ally and our products. We primarily use our blog to communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. Volunteer Ally takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.
        </p>

        <Header as="h4" textAlign="left align"> Aggregated Statistics </Header>
        <p>
          {/* eslint-disable-next-line max-len */}
            Volunteer Ally may collect statistics about the behavior of visitors to its website. Volunteer Ally may display this information publicly or provide it to others. However, Volunteer Ally does not disclose your personally-identifying information.
        </p>

        <Header as="h4" textAlign="left align"> Cookies </Header>
        <p>
            To enrich and perfect your online experience, Volunteer Ally uses “Cookies”, similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer. <br/>

          {/* eslint-disable-next-line max-len */}
            A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s browser provides to the website each time the visitor returns. Volunteer Ally uses cookies to help Volunteer Ally identify and track visitors, their usage of https://volunteerally.org, and their website access preferences. Volunteer Ally visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Volunteer Ally’s websites, with the drawback that certain features of Volunteer Ally’s websites may not function properly without the aid of cookies. <br/>

            By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to Volunteer Ally’s use of cookies. <br/>
        </p>

        <Header as="h4" textAlign="left align"> Privacy Policy Changes </Header>
        <p>
          {/* eslint-disable-next-line max-len */}
            Although most changes are likely to be minor, Volunteer Ally may change its Privacy Policy from time to time, and in Volunteer Ally’s sole discretion. Volunteer Ally encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.
        </p>

        <Header as="h4" textAlign="left align"> Credit And Contact Information </Header>
        <p>
            If you have any questions about our Privacy Policy, please contact us via email or phone.
        </p>
      </div>
    </Grid.Column>
  </Grid>
);

export default Privacy;
