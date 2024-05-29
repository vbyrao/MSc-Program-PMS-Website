<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");  // We're expecting a POST request
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Check if course ID is set
if (!isset($_POST['id'])) {
    echo json_encode(["success" => false, "message" => "Course ID not provided."]);
    exit;
}

$courseId = $_POST['id'];

// Delete the course from the database
$stmt = $pdo->prepare("DELETE FROM courses WHERE id = :id");
$stmt->bindParam(':id', $courseId, PDO::PARAM_STR);

try {
    $stmt->execute();

    // Check if a row was deleted
    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Course deleted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Course not found."]);
    }
} catch (PDOException $e) {
    // Handle potential errors
    echo json_encode(["success" => false, "message" => "Error deleting course: " . $e->getMessage()]);
}

?>
