<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Check if email and course ID are set
if (!isset($_POST['email']) || !isset($_POST['courseId'])) {
    echo json_encode(["success" => false, "message" => "Email or Course ID not provided."]);
    exit;
}

$email = $_POST['email'];
$courseId = $_POST['courseId'];

// Check if the entry exists
$stmt = $pdo->prepare("SELECT * FROM student_courses WHERE email = :email AND course_id = :courseId");
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->bindParam(':courseId', $courseId, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    // Entry exists, update enrolled to 0
    $updateStmt = $pdo->prepare("UPDATE student_courses SET enrolled = 0 WHERE email = :email AND course_id = :courseId");
    $updateStmt->bindParam(':email', $email, PDO::PARAM_STR);
    $updateStmt->bindParam(':courseId', $courseId, PDO::PARAM_STR);
    try {
        $updateStmt->execute();
        echo json_encode(["success" => true, "message" => "Successfully unenrolled."]);
    } catch (PDOException $e) {
        // Handle potential errors
        echo json_encode(["success" => false, "message" => "Error updating unenrollment: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Enrollment entry doesn't exist."]);
}

?>
