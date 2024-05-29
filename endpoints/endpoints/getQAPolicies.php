<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'dbconfig.php';

// Retrieve all policies from the QAPolicies table
$stmt = $pdo->prepare("SELECT id, title FROM QAPolicies");
$stmt->execute();

// Fetch all records as an associative array
$policies = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($policies) {
    echo json_encode(["success" => true, "policies" => $policies]);
} else {
    echo json_encode(["success" => false, "message" => "Error fetching policies."]);
}

?>
