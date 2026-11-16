// Where each contact form is delivered.
// The forms post to FormSubmit (https://formsubmit.co) — a free service that emails form
// submissions without needing our own backend.
//
// IMPORTANT (one-time setup): the first time a form is submitted, FormSubmit sends an
// activation email to the receiving inbox. Open that email in info@binghub.net and in
// support@binghub.net and click "Activate Form". After that, every submission is delivered.
//
// To use your own backend later, just replace the endpoint URLs below.

export const FORM_EMAIL = {
  hub: 'info@binghub.net',
  business: 'support@binghub.net',
};

export const FORM_ENDPOINT = {
  hub: `https://formsubmit.co/ajax/${FORM_EMAIL.hub}`,
  business: `https://formsubmit.co/ajax/${FORM_EMAIL.business}`,
};
