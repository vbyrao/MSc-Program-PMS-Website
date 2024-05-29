<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'dbconfig.php';

// Check for required data
if (!isset($_POST['policyName'])) {
    echo json_encode(["success" => false, "message" => "Missing policy name."]);
    exit;
}

$policyName = $_POST['policyName'];

// Insert policy into your Policies table
$stmt = $pdo->prepare("INSERT INTO qapolicies (title) VALUES (?)");
if ($stmt->execute([$policyName])) {
    echo json_encode(["success" => true, "message" => "Policy added successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error adding policy."]);
}
?>
