<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'dbconfig.php';

// Retrieve all recommendations from the QARecommendations table
$stmt = $pdo->prepare("SELECT id, title FROM qarecommendations");
$stmt->execute();

// Fetch all records as an associative array
$recommendations = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($recommendations) {
    echo json_encode(["success" => true, "recommendations" => $recommendations]);
} else {
    echo json_encode(["success" => false, "message" => "Error fetching recommendations."]);
}

?>
