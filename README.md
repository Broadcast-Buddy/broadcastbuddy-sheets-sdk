# Broadcast Buddy App Script

This Google App Script allows you to send SMS, WhatsApp messages, and emails automatically when the order status in a Google Sheet is updated to "Processing." It uses the Broadcast Buddy API to send messages across multiple platforms.

## Features
- Automatically sends SMS to customers.
- Sends WhatsApp messages to customers.
- Sends email notifications to customers.

## Requirements
- A Google Sheet with the following columns:
  - **Column C:** Customer's phone number.
  - **Column D:** Customer's email address.
  - **Column E:** Order status (e.g., "Processing").
- API keys and tokens for the Broadcast Buddy platform.

## Setup Instructions

1. **Get API Keys:**
   - Obtain the SMS API key and Sender ID.
   - Obtain the WhatsApp token from Broadcast Buddy.
   - Obtain the email token from Broadcast Buddy.

2. **Configure the Script:**
   - Open the Google Sheet where you want to use this script.
   - Go to **Extensions > Apps Script**.
   - Paste the script provided above.
   - Replace the placeholders in the script:
     - `smsApiKey` with your actual SMS API key.
     - `smsSenderId` with your SMS sender ID.
     - `whatsappToken` with your actual WhatsApp token.
     - `emailToken` with your actual email token.

3. **Save the Script:**
   - Save the script with a meaningful name.

4. **Enable Triggers:**
   - Go to **Triggers** in the Apps Script editor.
   - Create a new trigger to execute the `sendOrderProcessingMessage` function on the "On Edit" event.

5. **Update Your Google Sheet:**
   - Ensure the sheet has data in the required format.
   - Update the order status in Column E to "Processing" to test the script.

## Script Workflow
1. The script monitors the Google Sheet for changes.
2. If the status in the specified column (default: Column E) is updated to "Processing":
   - Fetches the customer's phone number and email from the sheet.
   - Sends an SMS using the Broadcast Buddy SMS API.
   - Sends a WhatsApp message using the Broadcast Buddy WhatsApp API.
   - Sends an email using the Broadcast Buddy email API.

## API Details
### SMS API
- URL: `https://api.broadcastbuddy.app/v1/whatsapp/sms/send`
- Parameters:
  - `api_key`: Your SMS API key.
  - `contact`: Customer's phone number.
  - `message`: The message to send.
  - `sender_id`: Your SMS sender ID.

### WhatsApp API
- URL: `https://api.broadcastbuddy.app/v1/whatsapp/compose/text`
- Headers:
  - `X-Authorization`: Your WhatsApp token.
- Payload:
  ```json
  {
    "receiver_type": "user",
    "recipient": "<phone_number>",
    "message": "<message_content>"
  }
  ```

### Email API
- URL: `https://api.broadcastbuddy.app/v1/email/send`
- Headers:
  - `X-Authorization`: Your email token.
- Payload:
  ```json
  {
    "receiver": "<email_address>",
    "subject": "<email_subject>",
    "message": "<email_content>"
  }
  ```

## Logging
- Logs are created for each sent message (SMS, WhatsApp, and email) using the Apps Script `Logger`.
- Errors encountered during API calls are logged for debugging purposes.

## Notes
- Ensure that the API keys and tokens are stored securely and not hardcoded in production environments.
- The message content is currently a placeholder and can be customized as per requirements.

## Troubleshooting
- Check the logs in the Apps Script editor if messages fail to send.
- Ensure the API keys, tokens, and URLs are correctly configured.
- Verify that the required columns in the Google Sheet have valid data.

## License
This script is provided "as is" without warranty of any kind. Use it at your own risk.
