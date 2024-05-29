<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'dbconfig.php';

// Check for required data
if (!isset($_POST['policyId'])) {
    echo json_encode(["success" => false, "message" => "Missing policy ID."]);
    exit;
}

$policyId = $_POST['policyId'];

// Delete policy from the QAPolicies table
$stmt = $pdo->prepare("DELETE FROM QAPolicies WHERE id = ?");
if ($stmt->execute([$policyId])) {
    echo json_encode(["success" => true, "message" => "Policy deleted successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error deleting policy."]);
}
?>
