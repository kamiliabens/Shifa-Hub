<?php
session_start();
include 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "not_logged_in"]);
    exit();
}

$id = mysqli_real_escape_string($conn, $_GET['id']);
$u_id = $_SESSION['user_id'];

// Check that the user does not take their own medicine
$check = mysqli_query($conn, "SELECT user_id FROM medicines WHERE id=$id");
$row = mysqli_fetch_assoc($check);
if($row['user_id'] == $u_id) {
    echo json_encode(["status" => "own_item"]);
    exit();
}

$sql = "UPDATE medicines SET taken_by = '$u_id', status = 'taken' WHERE id = '$id' AND taken_by IS NULL";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>