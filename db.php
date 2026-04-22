<?php
$conn = mysqli_connect("localhost", "root", "", "shifa_db");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Hide warnings for cleaner UI
error_reporting(E_ERROR | E_PARSE); 
?>