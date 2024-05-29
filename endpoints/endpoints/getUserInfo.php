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

// Retrieve user data from the database based on email
$stmt = $pdo->prepare("SELECT name, email, phone, role FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode(["success" => false, "message" => "Email not found."]);
    exit;
}

// Send the user data as a response
echo json_encode(["success" => true, "data" => $user]);

?>
