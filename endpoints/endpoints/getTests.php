<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");  // We're expecting a POST request
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Fetch all tests from the database
$stmt = $pdo->prepare("SELECT test_id, test_name, test_date, course_id FROM tests");

try {
    $stmt->execute();

    // Fetch all rows as an associative array
    $tests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Check if there are any tests
    if (count($tests) > 0) {
        echo json_encode(["success" => true, "data" => $tests]);
    } else {
        echo json_encode(["success" => false, "message" => "No tests found."]);
    }
} catch (PDOException $e) {
    // Handle potential errors
    echo json_encode(["success" => false, "message" => "Error fetching tests: " . $e->getMessage()]);
}

?>
