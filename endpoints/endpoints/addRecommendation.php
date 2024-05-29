<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

require 'dbconfig.php';

$title = $_POST['title'];

$stmt = $pdo->prepare("INSERT INTO qarecommendations (title) VALUES (?)");
$success = $stmt->execute([$title]);

if ($success) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to add recommendation."]);
}
?>
