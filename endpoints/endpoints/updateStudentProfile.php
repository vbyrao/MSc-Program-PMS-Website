<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Check for required data
if (!isset($_POST['email'])) {
    echo json_encode(["success" => false, "message" => "Missing required data."]);
    exit;
}

$email = $_POST['email'];
$name = $_POST['name'] ?? null;
$phone = $_POST['phone'] ?? null;

// Check if email exists in the database
$stmt = $pdo->prepare("SELECT email FROM users WHERE email = ?");
$stmt->execute([$email]);
if (!$stmt->fetch()) {
    echo json_encode(["success" => false, "message" => "Email not found."]);
    exit;
}

// Update profile in the database based on email
$stmt = $pdo->prepare("UPDATE users SET name = ?, phone = ? WHERE email = ?");
if ($stmt->execute([$name, $phone, $email])) {
    echo json_encode(["success" => true, "message" => "Profile updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating profile."]);
}

?>
