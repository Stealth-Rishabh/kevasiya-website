// src/app/privacy-policy/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Kevasiya",
  description:
    "This Privacy Policy describes how Kevasiya collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from kevasiya.com.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-stone-50 font-sans">
      <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-20 lg:px-8">
        <div className="bg-white p-8 shadow-md rounded-lg md:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Privacy Policy
            </h1>
          </div>

          <div className="prose prose-lg max-w-none prose-stone prose-a:text-pink-600 hover:prose-a:text-pink-500">
            <p>
              This Privacy Policy describes how Kevasiya (the &quot;Site&quot;,
              &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects,
              uses, and discloses your personal information when you visit, use
              our services, or make a purchase from{" "}
              <Link href="/">kevasiya.com</Link> (the &quot;Site&quot;) or
              otherwise communicate with us regarding the Site (collectively,
              the &quot;Services&quot;). For purposes of this Privacy Policy,
              &quot;you&quot; and &quot;your&quot; means you as the user of the
              Services, whether you are a customer, website visitor, or another
              individual whose information we have collected pursuant to this
              Privacy Policy.
            </p>
            <p>
              Please read this Privacy Policy carefully. By using and accessing
              any of the Services, you agree to the collection, use, and
              disclosure of your information as described in this Privacy
              Policy. If you do not agree to this Privacy Policy, please do not
              use or access any of the Services.
            </p>

            <h2 className="text-3xl bold font-serif pt-8 pb-4">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time, including to
              reflect changes to our practices or for other operational, legal,
              or regulatory reasons. We will post the revised Privacy Policy on
              the Site, update the &quot;Last updated&quot; date and take any
              other steps required by applicable law.
            </p>

            <h2 className="text-3xl bold font-serif pt-8 pb-4">
              How We Collect and Use Your Personal Information
            </h2>
            <p>
              To provide the Services, we collect personal information about you
              from a variety of sources, as set out below. The information that
              we collect and use varies depending on how you interact with us.
              In addition to the specific uses set out below, we may use
              information we collect about you to communicate with you, provide
              or improve the Services, comply with any applicable legal
              obligations, enforce any applicable terms of service, and to
              protect or defend the Services, our rights, and the rights of our
              users or others.
            </p>

            <h3>What Personal Information We Collect</h3>
            <p>
              The types of personal information we obtain about you depends on
              how you interact with our Site and use our Services. When we use
              the term &quot;personal information&quot;, we are referring to
              information that identifies, relates to, describes or can be
              associated with you. The following sections describe the
              categories and specific types of personal information we collect.
            </p>

            <h4>Information We Collect Directly from You</h4>
            <p>
              Information that you directly submit to us through our Services
              may include:
            </p>
            <ul>
              <li>
                Contact details including your name, address, phone number, and
                email.
              </li>
              <li>
                Order information including your name, billing address, shipping
                address, payment confirmation, email address, and phone number.
              </li>
              <li>
                Account information including your username, password, security
                questions and other information used for account security
                purposes.
              </li>
              <li>
                Customer support information including the information you
                choose to include in communications with us, for example, when
                sending a message through the Services.
              </li>
            </ul>
            <p>
              Some features of the Services may require you to directly provide
              us with certain information about yourself. You may elect not to
              provide this information, but doing so may prevent you from using
              or accessing these features.
            </p>

            <h4>Information We Collect about Your Usage</h4>
            <p>
              We may also automatically collect certain information about your
              interaction with the Services (&quot;Usage Data&quot;). To do
              this, we may use cookies, pixels and similar technologies
              (&quot;Cookies&quot;). Usage Data may include information about
              how you access and use our Site and your account, including device
              information, browser information, information about your network
              connection, your IP address and other information regarding your
              interaction with the Services.
            </p>

            <h4>Information We Obtain from Third Parties</h4>
            <p>
              Finally, we may obtain information about you from third parties,
              including from vendors and service providers who may collect
              information on our behalf, such as:
            </p>
            <ul>
              <li>
                Companies who support our Site and Services, such as our
                e-commerce platform provider.
              </li>
              <li>
                Our payment processors, who collect payment information (e.g.,
                bank account, credit or debit card information, billing address)
                to process your payment in order to fulfill your orders and
                provide you with products or services you have requested, in
                order to perform our contract with you.
              </li>
              <li>
                When you visit our Site, open or click on emails we send you, or
                interact with our Services or advertisements, we, or third
                parties we work with, may automatically collect certain
                information using online tracking technologies such as pixels,
                web beacons, software developer kits, third-party libraries, and
                cookies.
              </li>
            </ul>
            <p>
              Any information we obtain from third parties will be treated in
              accordance with this Privacy Policy. Also see the section below,
              Third Party Websites and Links.
            </p>

            <h2 className="text-3xl bold font-serif pt-8 pb-4">
              How We Use Your Personal Information
            </h2>
            <ul>
              <li>
                <strong>Providing Products and Services.</strong> We use your
                personal information to provide you with the Services in order
                to perform our contract with you, including to process your
                payments, fulfill your orders, to send notifications to you
                related to your account, purchases, returns, exchanges or other
                transactions, to create, maintain and otherwise manage your
                account, to arrange for shipping, facilitate any returns and
                exchanges and other features and functionalities related to your
                account.
              </li>
              <li>
                <strong>Marketing and Advertising.</strong> We may use your
                personal information for marketing and promotional purposes,
                such as to send marketing, advertising and promotional
                communications by email, text message or postal mail, and to
                show you advertisements for products or services. This may
                include using your personal information to better tailor the
                Services and advertising on our Site and other websites.
              </li>
              <li>
                <strong>Security and Fraud Prevention.</strong> We use your
                personal information to detect, investigate or take action
                regarding possible fraudulent, illegal or malicious activity. If
                you choose to use the Services and register an account, you are
                responsible for keeping your account credentials safe. We highly
                recommend that you do not share your username, password, or
                other access details with anyone else. If you believe your
                account has been compromised, please contact us immediately.
              </li>
              <li>
                <strong>Communicating with You and Service Improvement.</strong>{" "}
                We use your personal information to provide you with customer
                support and improve our Services. This is in our legitimate
                interests in order to be responsive to you, to provide effective
                services to you, and to maintain our business relationship with
                you.
              </li>
            </ul>

            <h2 className="text-3xl bold font-serif pt-8 pb-4">Cookies</h2>
            <p>
              Like many websites, we use Cookies on our Site. We use Cookies to
              power and improve our Site and our Services (including to remember
              your actions and preferences), to run analytics and better
              understand user interaction with the Services (in our legitimate
              interests to administer, improve and optimize the Services). We
              may also permit third parties and services providers to use
              Cookies on our Site to better tailor the services, products and
              advertising on our Site and other websites.
            </p>
            <p>
              Most browsers automatically accept Cookies by default, but you can
              choose to set your browser to remove or reject Cookies through
              your browser controls. Please keep in mind that removing or
              blocking Cookies can negatively impact your user experience and
              may cause some of the Services, including certain features and
              general functionality, to work incorrectly or no longer be
              available. Additionally, blocking Cookies may not completely
              prevent how we share information with third parties such as our
              advertising partners.
            </p>

            <h2 className="text-3xl bold font-serif pt-8 pb-4">
              How We Disclose Personal Information
            </h2>
            <p>
              In certain circumstances, we may disclose your personal
              information to third parties for contract fulfillment purposes,
              legitimate purposes and other reasons subject to this Privacy
              Policy. Such circumstances may include:
            </p>
            <ul>
              <li>
                With vendors or other third parties who perform services on our
                behalf (e.g., IT management, payment processing, data analytics,
                customer support, cloud storage, fulfillment and shipping).
              </li>
              <li>
                With business and marketing partners to provide services and
                advertise to you. Our business and marketing partners will use
                your information in accordance with their own privacy notices.
              </li>
              <li>
                When you direct, request us or otherwise consent to our
                disclosure of certain information to third parties, such as to
                ship you products or through your use of social media widgets or
                login integrations, with your consent.
              </li>
              <li>
                With our affiliates and within our corporate group, in our
                legitimate interest to run a successful business.
              </li>
              <li>
                In connection with a business transaction such as a merger or
                bankruptcy, to comply with any applicable legal obligations
                (including to respond to subpoenas, search warrants and similar
                requests), to enforce any applicable terms of service, and to
                protect or defend the Services, our rights, and the rights of
                our users or others.
              </li>
            </ul>

            <h2 className="text-3xl bold font-serif pt-8 pb-4">
              Your Rights and Choices
            </h2>
            <p>
              Depending on where you live, you may have some or all of the
              rights listed below in relation to your personal information.
              However, these rights are not absolute, may apply only in certain
              circumstances and, in certain cases, we may decline your request
              as permitted by law.
            </p>
            <ul>
              <li>
                <strong>Right to Access / Know.</strong> You may have a right to
                request access to personal information that we hold about you,
                including details relating to the ways in which we use and share
                your information.
              </li>
              <li>
                <strong>Right to Delete.</strong> You may have a right to
                request that we delete personal information we maintain about
                you.
              </li>
              <li>
                <strong>Right to Correct.</strong> You may have a right to
                request that we correct inaccurate personal information we
                maintain about you.
              </li>
              <li>
                <strong>Right of Portability.</strong> You may have a right to
                receive a copy of the personal information we hold about you and
                to request that we transfer it to a third party, in certain
                circumstances and with certain exceptions.
              </li>
            </ul>
            <p>
              You may exercise any of these rights where indicated on our Site
              or by contacting us using the contact details provided below. We
              will not discriminate against you for exercising any of these
              rights. We may need to collect information from you to verify your
              identity, such as your email address or account information,
              before providing a substantive response to the request.
            </p>

            <h2 className="text-3xl bold font-serif pt-8 pb-4">Complaints</h2>
            <p>
              If you have complaints about how we process your personal
              information, please contact us using the contact details provided
              below. If you are not satisfied with our response to your
              complaint, depending on where you live you may have the right to
              appeal our decision by contacting us using the contact details set
              out below, or lodge your complaint with your local data protection
              authority.
            </p>

            <h2 className="text-3xl bold font-serif pt-8 pb-4">
              Third Party Websites and Links
            </h2>
            <p>
              Our Site may provide links to websites or other online platforms
              operated by third parties. If you follow links to sites not
              affiliated or controlled by us, you should review their privacy
              and security policies and other terms and conditions. We do not
              guarantee and are not responsible for the privacy or security of
              such sites, including the accuracy, completeness, or reliability
              of information found on these sites. Information you provide on
              public or semi-public venues, including information you share on
              third-party social networking platforms may also be viewable by
              other users of the Services and/or users of those third-party
              platforms without limitation as to its use by us or by a third
              party. Our inclusion of such links does not, by itself, imply any
              endorsement of the content on such platforms or of their owners or
              operators, except as disclosed on the Services.
            </p>

            <h2 className="text-3xl bold font-serif pt-8 pb-4">
              Children&apos;s Data
            </h2>
            <p>
              The Services are not intended to be used by children, and we do
              not knowingly collect any personal information about children. If
              you are the parent or guardian of a child who has provided us with
              their personal information, you may contact us using the contact
              details set out below to request that it be deleted. As of the
              Effective Date of this Privacy Policy, we do not have actual
              knowledge that we &quot;share&quot; or &quot;sell&quot; (as those
              terms are defined in applicable law) personal information of
              individuals under 16 years of age.
            </p>

            <h2 className="text-3xl bold font-serif pt-8 pb-4">
              Contact Information
            </h2>
            <p>
              Should you have any questions about our privacy practices or this
              Privacy Policy, or if you would like to exercise any of the rights
              available to you, please email us at{" "}
              <a
                href="mailto:info@kevasiya.com"
                className="text-pink-600 hover:text-pink-500"
              >
                info@kevasiya.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
