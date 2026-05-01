import React from 'react';
import PolicyLayout from '../layouts/PolicyLayout';
import { Link } from 'react-router-dom';

export default function CookiePolicy() {
  return (
    <PolicyLayout
      title="Cookie policy"
      subtitle="This cookie policy explains how we use cookies and similar technologies to provide you with a better shopping experience."
      lastUpdated="April 21, 2026"
    >
      <p className="lead">
        This cookie policy explains howPrinto Maniac
        ("company," "we," "us," or "our") uses cookies and similar technologies when you visit our website: <a href="https://printomaniac.com/">https://printomaniac.com/</a>
      </p>
      <p>
        This policy should be read together with our <Link to="/privacy-policy">Privacy policy</Link> and <Link to="/terms-and-conditions">Terms and conditions</Link>.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files placed on your device (computer, smartphone, tablet) when you visit a website. Cookies help websites function properly, improve performance, remember preferences, and provide analytical information.
      </p>
      <p>Cookies may be:</p>
      <ul>
        <li><strong>Session cookies</strong> – Deleted when you close your browser</li>
        <li><strong>Persistent cookies</strong> – Remain stored until they expire or are deleted</li>
        <li><strong>First-party cookies</strong> – Set by our website</li>
        <li><strong>Third-party cookies</strong> – Set by external service providers</li>
      </ul>

      <h2>2. How we use cookies</h2>
      <p>We use cookies and similar tracking technologies to:</p>
      <ul>
        <li>Enable core website functionality</li>
        <li>Maintain secure user sessions</li>
        <li>Process orders and payments</li>
        <li>Remember shopping cart contents</li>
        <li>Improve website performance</li>
        <li>Analyze website traffic</li>
        <li>Prevent fraud and security threats</li>
        <li>Support marketing and advertising efforts</li>
      </ul>
      <p>
        Cookies help us provide a smooth and secure shopping experience when purchasing printers and supplies.
      </p>

      <h2>3. Types of cookies we use</h2>
      <h3>Essential cookies (strictly necessary)</h3>
      <p>These cookies are required for the website to function properly. Without them, certain services may not be available.</p>
      <p>They help with:</p>
      <ul>
        <li>Secure login and account authentication</li>
        <li>Shopping cart functionality</li>
        <li>Checkout and payment processing</li>
        <li>Fraud prevention</li>
        <li>Website security</li>
      </ul>
      <p>These cookies cannot be disabled.</p>

      <h3>Performance and analytics cookies</h3>
      <p>These cookies help us understand how visitors interact with our website. We may use Google Analytics to identify technical issues and improve our structure and product listings.</p>
      <p>
        You may opt out of Google Analytics tracking by visiting: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>
      </p>

      <h3>Functional cookies</h3>
      <p>These cookies remember your language preferences, region settings, and previously viewed products to improve your personalization and usability.</p>

      <h3>Advertising and marketing cookies</h3>
      <p>We may allow third-party service providers to place cookies for display advertising, retargeting campaigns, and interest-based advertisements.</p>

      <h2>4. How to control cookies</h2>
      <p>
        You can control cookies through your browser settings. However, disabling cookies may prevent checkout functionality, affect account login, or disable cart features.
      </p>

      <h2>5. Sale or sharing of personal information</h2>
      <p>
        We do not sell personal information. If you have any concerns regarding how your data is shared for advertising, you may exercise your rights by:
      </p>
      <ul>
        <li>Emailing: <a href="mailto:info@printomaniac.com">info@printomaniac.com</a></li>
        <li>Visiting: <Link to="/contact">Contact us</Link></li>
      </ul>

      <hr />
      <h2>6. Contact information</h2>
      <p>If you have any questions regarding this cookie policy, please contact us:</p>
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 my-8 not-prose">
        <address className="not-italic text-slate-700 font-bold leading-relaxed space-y-1">
          <p className="text-slate-900">Printo Maniac</p>
          <p>4352 13th Ave S, Fargo, ND 58103, USA</p>
          <p className="pt-4 text-black font-bold">info@printomaniac.com</p>
        </address>
      </div>
    </PolicyLayout>
  );
}
