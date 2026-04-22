<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
$conn = mysqli_connect("localhost", "root", "", "shifa_db");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Hide warnings for cleaner UI
error_reporting(E_ERROR | E_PARSE); 
?>
