<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");  // We're expecting a POST request
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Check if both course ID and name are set
if (!isset($_POST['id']) || !isset($_POST['name'])) {
    echo json_encode(["success" => false, "message" => "Course ID or name not provided."]);
    exit;
}

$courseId = $_POST['id'];
$courseName = $_POST['name'];

// Insert the new course into the database
$stmt = $pdo->prepare("INSERT INTO courses (id, name) VALUES (:id, :name)");
$stmt->bindParam(':id', $courseId, PDO::PARAM_STR);
$stmt->bindParam(':name', $courseName, PDO::PARAM_STR);

try {
    $stmt->execute();
    echo json_encode(["success" => true, "message" => "Course added successfully."]);
} catch (PDOException $e) {
    // Handle potential errors, such as a duplicate course ID
    echo json_encode(["success" => false, "message" => "Error adding course: " . $e->getMessage()]);
}

?>
