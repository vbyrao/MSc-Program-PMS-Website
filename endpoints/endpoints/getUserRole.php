<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';  // This should include the PDO database connection.

if (!isset($_POST['email'])) {
    echo json_encode(["success" => false, "message" => "Missing required data."]);
    exit;
}

$email = $_POST['email'];

// Use prepared statements to prevent SQL injection
$stmt = $pdo->prepare("SELECT role FROM users WHERE email = ?");
$stmt->execute([$email]);

$row = $stmt->fetch(PDO::FETCH_ASSOC);
if ($row) {
    echo json_encode(["success" => true, "role" => $row['role']]);
} else {
    echo json_encode(["success" => false, "message" => "User not found."]);
}


?>
