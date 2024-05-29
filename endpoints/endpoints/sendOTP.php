<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';  

header("Access-Control-Allow-Origin: *");

// Ensure request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Fetch the email from POST data
$email = $_POST['email'] ?? null;

if (!$email) {
    echo json_encode(['message' => 'No email received.']);
    exit;
}

$otp = rand(100000, 999999);
$mail = new PHPMailer(true);
try {
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'wdmutacourse@gmail.com';  
    $mail->Password   = 'ooquknpbatzafisw';  // 
    $mail->Port       = 587;

    $mail->setFrom('wdmutacourse@gmail.com', 'wdmutacourse@gmail.com');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'Your OTP Code';
    $mail->Body    = "Your OTP is: <b>$otp</b>";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'OTP sent successfully', 'otp' => $otp]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
    exit;
}
?>
