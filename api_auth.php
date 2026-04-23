<?php
session_start();
include 'db.php';
header('Content-Type: application/json');

$action = isset($_GET['action']) ? $_GET['action'] : '';

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    echo json_encode(["status" => "success"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

// Register new user
if ($action == 'register') {
    $name  = mysqli_real_escape_string($conn, $data['name']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $pass  = password_hash($data['password'], PASSWORD_DEFAULT);

    // Check if email already exists
    $check = mysqli_query($conn, "SELECT id FROM users WHERE email = '$email'");
    if (mysqli_num_rows($check) > 0) {
        echo json_encode(["status" => "error", "message" => "Email already registered."]);
        exit();
    }

    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$pass')";
    if (mysqli_query($conn, $sql)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    }
}

// Login
if ($action == 'login') {
    $email = mysqli_real_escape_string($conn, $data['email']);
    $sql   = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);
    $user  = mysqli_fetch_assoc($result);

    if ($user && password_verify($data['password'], $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        echo json_encode(["status" => "success", "user" => $user]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email or password."]);
    }
}
?>
