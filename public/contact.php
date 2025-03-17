
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Configuration - Easily Editable
    $toEmail = "marina@hivemechanics.io"; // Recipient email
    $fromEmail = "webmaster@yourdomain.com"; // Your domain's email
    $emailSubject = "Contact Form Submission";

    // Data Sanitization and Validation
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $company = htmlspecialchars($_POST['company']);
    $message = htmlspecialchars($_POST['message']);

    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Please fill in all required fields correctly.";
        exit;
    }

    // Email Body
    $emailBody = "Name: $name\nEmail: $email\nCompany: $company\nMessage: $message";

    // Email Headers
    $headers = "From: " . $fromEmail . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    // Sending Email
    if (mail($toEmail, $emailSubject, $emailBody, $headers)) {
        echo "Thank you for your message!";
    } else {
        echo "Sorry, there was an error sending your message.";
    }
}
?>
