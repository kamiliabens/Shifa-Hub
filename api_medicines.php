<?php
include 'db.php';
if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM medicines WHERE status='approved' ORDER BY id DESC";
    $result = mysqli_query($conn, $sql);
    echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
}
?><?php
include 'db.php';
if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM medicines WHERE status='approved' ORDER BY id DESC";
    $result = mysqli_query($conn, $sql);
    echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
}
?>