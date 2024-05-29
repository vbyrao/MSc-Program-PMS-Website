<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

require 'dbconfig.php';

$email = $_POST['email'] ?? '';
$response = ['exists' => false];

if (!empty($email)) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
    $stmt->execute([':email' => $email]);
    if ($stmt->fetchColumn() > 0) {
        $response['exists'] = true;
    }
}

echo json_encode($response);
?>
