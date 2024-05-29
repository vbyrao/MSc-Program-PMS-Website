<?php

header("Access-Control-Allow-Origin: *");

require 'dbconfig.php';

if (isset($_POST['data'])) {
    $value = $_POST['data'];
    
    $stmt = $pdo->prepare('INSERT INTO test (allstrings) VALUES (?)');
    $stmt->execute([$value]);
    
    echo json_encode(["status" => "success", "message" => "Data inserted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Value not received"]);
}


?>
