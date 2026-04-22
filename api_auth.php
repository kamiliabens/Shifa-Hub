<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);
$action = isset($_GET['action']) ? $_GET['action'] : '';
if ($action == 'register') {
    $name = $data['name']; $email = $data['email'];
    $pass = password_hash($data['password'], PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$pass')";
    if(mysqli_query($conn, $sql)) echo json_encode(["status" => "success"]);
} 
if ($action == 'login') {
    $email = $data['email'];
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);
    $user = mysqli_fetch_assoc($result);
    if ($user && password_verify($data['password'], $user['password'])) {
        echo json_encode(["status" => "success", "user" => $user]);
    } else { echo json_encode(["status" => "error"]); }
}
?><?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);
$action = isset($_GET['action']) ? $_GET['action'] : '';
if ($action == 'register') {
    $name = $data['name']; $email = $data['email'];
    $pass = password_hash($data['password'], PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$pass')";
    if(mysqli_query($conn, $sql)) echo json_encode(["status" => "success"]);
} 
if ($action == 'login') {
    $email = $data['email'];
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);
    $user = mysqli_fetch_assoc($result);
    if ($user && password_verify($data['password'], $user['password'])) {
        echo json_encode(["status" => "success", "user" => $user]);
    } else { echo json_encode(["status" => "error"]); }
}
?>