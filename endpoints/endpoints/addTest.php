<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");  // We're expecting a POST request
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Check if course ID, test name, and test date are set
if (!isset($_POST['courseId']) || !isset($_POST['testName']) || !isset($_POST['testDate'])) {
    echo json_encode(["success" => false, "message" => "Course ID, test name, or test date not provided."]);
    exit;
}

$courseId = $_POST['courseId'];
$testName = $_POST['testName'];
$testDate = $_POST['testDate'];

// Insert the new test into the database
$stmt = $pdo->prepare("INSERT INTO tests (course_id, test_name, test_date) VALUES (:courseId, :testName, :testDate)");
$stmt->bindParam(':courseId', $courseId, PDO::PARAM_STR);
$stmt->bindParam(':testName', $testName, PDO::PARAM_STR);
$stmt->bindParam(':testDate', $testDate, PDO::PARAM_STR);

try {
    $stmt->execute();
    echo json_encode(["success" => true, "message" => "Test added successfully."]);
} catch (PDOException $e) {
    // Handle potential errors
    echo json_encode(["success" => false, "message" => "Error adding test: " . $e->getMessage()]);
}

?>
