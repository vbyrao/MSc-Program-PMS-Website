<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

require 'dbconfig.php';

$id = $_POST['id'];

$stmt = $pdo->prepare("DELETE FROM qarecommendations WHERE id = ?");
$success = $stmt->execute([$id]);

if ($success) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete recommendation."]);
}
?>
