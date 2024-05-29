<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'dbconfig.php';

// Check for required data
if (!isset($_POST['SenderEmail']) || !isset($_POST['ReceiverEmail']) || !isset($_POST['Message'])) {
    echo json_encode(["success" => false, "message" => "Missing required data."]);
    exit;
}

$SenderEmail = $_POST['SenderEmail'];
$ReceiverEmail = $_POST['ReceiverEmail'];
$Message = $_POST['Message'];

// Insert message into the chat table
$stmt = $pdo->prepare("INSERT INTO chat (SenderEmail, ReceiverEmail, Message) VALUES (?, ?, ?)");
if ($stmt->execute([$SenderEmail, $ReceiverEmail, $Message])) {
    echo json_encode(["success" => true, "message" => "Message sent successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error sending message."]);
}

?>
