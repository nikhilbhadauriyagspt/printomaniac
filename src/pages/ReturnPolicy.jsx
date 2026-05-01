import React from 'react';
import PolicyLayout from '../layouts/PolicyLayout';

export default function ReturnPolicy() {
  return (
    <PolicyLayout
      title="Return Policy"
      subtitle="Read our return and refund policy for your purchases."
      lastUpdated="April 21, 2026"
    >
      <h2>RETURNS</h2>
      <p>
        All returns must be postmarked within <strong>seven (7) days</strong> of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.
      </p>

      <h2>RETURN PROCESS</h2>
      <p>
                 To return an item, please email customer service at <a href="mailto:info@printomaniac.com">info@printomaniac.com</a>.      </p>
      <div className="bg-slate-50 p-8 rounded-none border border-slate-100 mt-6 not-prose">
        <p className="font-medium text-slate-700 mb-4 italic">Place the item securely in its original packaging and include your proof of purchase, then contact us for return instructions:</p>
        <address className="not-italic text-slate-900 font-bold leading-relaxed uppercase er">
                    Printomaniac
        </address>
        <p className="mt-6 text-black font-bold uppercase text-xs tracking-widest">
          Return shipping charges will be paid or reimbursed by us.
        </p>
      </div>

      <h2>REFUNDS</h2>
      <p>
        After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least <strong>seven (7) days</strong> from the receipt of your item to process your return. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. We will notify you by email when your return has been processed.
      </p>

      <h2>EXCEPTIONS</h2>
      <p>
        For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
      </p>

      <hr />
      <h2>QUESTIONS</h2>
      <p>If you have any questions concerning our return policy, please contact us at:</p>
      <div className="bg-slate-50 p-8 rounded-none border border-slate-100 my-8 not-prose">
        <address className="not-italic text-slate-700 font-bold leading-relaxed space-y-3">
                     <p className="flex items-center gap-3 text-black font-bold ">info@printomaniac.com</p>          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Contact support for immediate assistance</p>
        </address>
      </div>    </PolicyLayout>
  );
}


