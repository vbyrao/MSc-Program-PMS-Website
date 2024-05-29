<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Check for required data
if (!isset($_POST['email']) || !isset($_POST['password'])) {
    echo json_encode(["success" => false, "message" => "Missing required data."]);
    exit;
}

$email = $_POST['email'];
$newPassword = $_POST['password'];

// Check if email exists in the database
$stmt = $pdo->prepare("SELECT email FROM users WHERE email = ?");
$stmt->execute([$email]);
if (!$stmt->fetch()) {
    echo json_encode(["success" => false, "message" => "Email not found."]);
    exit;
}

// Update password in the database based on email
$stmt = $pdo->prepare("UPDATE users SET password = ? WHERE email = ?");
if ($stmt->execute([$newPassword, $email])) {
    echo json_encode(["success" => true, "message" => "Password updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating password."]);
}
?>
