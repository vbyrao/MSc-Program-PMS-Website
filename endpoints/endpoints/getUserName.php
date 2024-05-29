<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require 'dbconfig.php';

// Retrieve all user data from the database
$stmt = $pdo->prepare("SELECT  name, email FROM users");  // Assuming you have an 'id' field for users, adjust accordingly if different
$stmt->execute();
$users = $stmt->fetchAll();

if (!$users) {
    echo json_encode(["success" => false, "message" => "No users found."]);
    exit;
}

// Send all the users data as a response
echo json_encode(["success" => true, "data" => $users]);

?>
