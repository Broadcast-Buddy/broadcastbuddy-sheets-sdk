// Function to send SMS and WhatsApp message when order status is updated to "Processing"
function sendOrderProcessingMessage(e) {
    var sheet = e.source.getActiveSheet();
    var range = e.range;
    var row = range.getRow();
    var column = range.getColumn();

    // Define the column for order status (e.g., column D, which is the 4th column)
    var statusColumn = 5; // Change this if your status column is different

    // Check if the edit is in the status column
    if (column === statusColumn) {
        var orderStatus = sheet.getRange(row, statusColumn).getValue();

        // Only send messages when the status is updated to "Processing"
        if (orderStatus.toLowerCase() === "processing") {
            var phoneNumber = sheet.getRange(row, 3).getValue(); // Phone number is in column C (3rd column)
            var email = sheet.getRange(row, 4).getValue(); // Email is in column D (4th column)

            // Construct the message content
            var message = ``;

            // SMS API details (replace with your actual API details)
            var smsApiKey = "SMSApi"; // Replace with your actual SMS API key
            var smsSenderId = "SenderID"; // Replace with your sender ID
            var smsApiUrl = `https://api.broadcastbuddy.app/v1/whatsapp/sms/send?api_key=${encodeURIComponent(smsApiKey)}&contact=${encodeURIComponent(phoneNumber)}&message=${encodeURIComponent(message)}&sender_id=${encodeURIComponent(smsSenderId)}`;

            // Send SMS
            try {
                var smsResponse = UrlFetchApp.fetch(smsApiUrl);
                Logger.log("SMS Sent: " + smsResponse.getContentText());
            } catch (smsError) {
                Logger.log("Error sending SMS: " + smsError.message);
            }

            // WhatsApp API details
            var whatsappToken = "c390f3fa7b9f5328fb5c7ecef"; // Replace with your actual WhatsApp token
            var whatsappApiUrl = 'https://api.broadcastbuddy.app/v1/whatsapp/compose/text'; 

            // Send WhatsApp message
            try {
                var whatsappPayload = {
                    'receiver_type': 'user',
                    'recipient': phoneNumber,
                    'message': message
                };

                var whatsappOptions = {
                    'method': 'POST',
                    'headers': { 'X-Authorization': whatsappToken },
                    'contentType': 'application/json',
                    'payload': JSON.stringify(whatsappPayload)
                };

                var whatsappResponse = UrlFetchApp.fetch(whatsappApiUrl, whatsappOptions);
                Logger.log("WhatsApp Message Sent: " + whatsappResponse.getContentText());
            } catch (whatsappError) {
                Logger.log("Error sending WhatsApp message: " + whatsappError.message);
            }

            
            // Email API details
            var emailToken = "c390f3fa7b9f5328fb5c7ecef"; // Replace with your actual WhatsApp token
            var emailApiUrl = 'https://api.broadcastbuddy.app/v1/email/send'; 

            // Send Email
            try {
                var emailPayload = {
                    'receiver': email,
                    'subject': 'This is a subject',
                    'message': message
                };

                var emailOptions = {
                    'method': 'POST',
                    'headers': { 'X-Authorization': emailToken },
                    'contentType': 'application/json',
                    'payload': JSON.stringify(emailPayload)
                };

                var emailResponse = UrlFetchApp.fetch(emailApiUrl, emailOptions);
                Logger.log("WhatsApp Message Sent: " + emailResponse.getContentText());
            } catch (emailError) {
                Logger.log("Error sending WhatsApp message: " + emailError.message);
            }
        }
    }
}