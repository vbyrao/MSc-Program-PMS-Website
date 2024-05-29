<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Retrieve all course data from the database
$stmt = $pdo->prepare("SELECT id, name FROM courses");  // Adjust the fields accordingly if different in your DB
$stmt->execute();
$courses = $stmt->fetchAll();

if (!$courses) {
    echo json_encode(["success" => false, "message" => "No courses found."]);
    exit;
}

// Send all the courses data as a response
echo json_encode(["success" => true, "courses" => $courses]);

?>
