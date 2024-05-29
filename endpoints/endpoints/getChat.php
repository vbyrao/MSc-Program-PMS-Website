<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Check for required data
if (!isset($_POST['email'])) {
    echo json_encode(["success" => false, "message" => "Missing required email data."]);
    exit;
}

$email = $_POST['email'];

// Retrieve all chat data for the given user
$stmt = $pdo->prepare("SELECT ID, SenderEmail, ReceiverEmail, Message FROM chat WHERE SenderEmail = ? OR ReceiverEmail = ? ORDER BY ID ASC");
$stmt->execute([$email, $email]);
$chats = $stmt->fetchAll();

if (!$chats) {
    echo json_encode(["success" => false, "message" => "No chats found for the provided email."]);
    exit;
}

// Send all the chat data as a response
echo json_encode(["success" => true, "data" => $chats]);

?>
