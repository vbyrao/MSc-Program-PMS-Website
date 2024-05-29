<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

require 'dbconfig.php';

// Check for the required data
if (!isset($_POST['id'])) {
    echo json_encode(["success" => false, "message" => "Missing required user ID."]);
    exit;
}

$id = $_POST['id'];

// Delete user from the database based on the ID
$stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
$result = $stmt->execute([$id]);

if ($result) {
    echo json_encode(["success" => true, "message" => "User deleted successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error deleting user."]);
}

?>
