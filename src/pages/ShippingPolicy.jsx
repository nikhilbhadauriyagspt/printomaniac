import React from 'react';
import PolicyLayout from '../layouts/PolicyLayout';
import { Link } from 'react-router-dom';

export default function ShippingPolicy() {
  return (
    <PolicyLayout
      title="Shipping policy"
      subtitle="Read our shipping and delivery options, timeframes, and policies."
      lastUpdated="April 21, 2026"
    >
      <p className="lead">
        This shipping & delivery policy is part of our terms and conditions ("terms") and should be therefore read alongside our main terms: <Link to="/terms-and-conditions">https://printomaniac.com/terms-and-conditions</Link>.
      </p>
      <p>
        Please carefully review our shipping & delivery policy when purchasing our products. This policy will apply to any order you place with us.
      </p>

      <h2>What are my shipping delivery options?</h2>
      <p>
        We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.
      </p>
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 mt-6 not-prose">
        <h4 className="text-lg font-bold text-slate-900 mb-2">Free shipping</h4>
        <p className="text-slate-600 font-medium m-0 italic">We offer free standard shipping on all orders.</p>
      </div>

      <h2>Do you deliver internationally?</h2>
      <p>
        We do not offer international shipping at this time. We deliver to all addresses within the country.
      </p>

      <h2>What happens if my order is delayed?</h2>
      <p>
        If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery.
      </p>

      <h2>Questions about returns?</h2>
      <p>
        If you have questions about returns, please review our return policy: <Link to="/return-policy">https://printomaniac.com/return-policy</Link>.
      </p>

      <hr />
      <h2>How can you contact us about this policy?</h2>
      <p>If you have any further questions or comments, you may contact us by:</p>
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 my-8 not-prose">
        <address className="not-italic text-slate-700 font-bold leading-relaxed space-y-3">
          <p className="flex items-center gap-3 text-black font-bold ">Email: <a href="mailto:info@printomaniac.com" className="hover:underline">info@printomaniac.com</a></p>
          <p className="flex items-center gap-3">
            <span className="text-slate-500 font-bold text-[10px] tracking-widest uppercase">Online form:</span>
            <Link to="/contact" className="text-black font-bold ml-2 underline">Contact us</Link>
          </p>        </address>
      </div>
    </PolicyLayout>
  );
}
