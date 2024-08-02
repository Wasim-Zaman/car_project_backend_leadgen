const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

/**
 * Send an SMS using Twilio
 * @param {string} to - The phone number to send the SMS to.
 * @param {string} body - The message body to send.
 * @returns {Promise} - The result of the message send operation.
 */
const sendSMS = (to, body) => {
  return client.messages.create({
    body,
    to,
    from: twilioPhoneNumber,
  });
};

module.exports = { sendSMS };
