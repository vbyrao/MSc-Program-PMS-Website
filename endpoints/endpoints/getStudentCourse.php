<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");  // We're expecting a POST request
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Check if email is set
if (!isset($_POST['email'])) {
    echo json_encode(["success" => false, "message" => "Email not provided."]);
    exit;
}

$email = $_POST['email'];

// Fetch courses where the student is enrolled
$stmt = $pdo->prepare("SELECT c.id, c.name FROM courses c INNER JOIN student_courses sc ON c.id = sc.course_id WHERE sc.email = :email AND sc.enrolled = 1");
$stmt->bindParam(':email', $email, PDO::PARAM_STR);

try {
    $stmt->execute();
    $enrolledCourses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "courses" => $enrolledCourses]);
} catch (PDOException $e) {
    // Handle potential errors
    echo json_encode(["success" => false, "message" => "Error fetching enrolled courses: " . $e->getMessage()]);
}

?>
