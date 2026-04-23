<?php
session_start();
include 'db.php';
header('Content-Type: application/json');

// GET - fetch medicines
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // Items the logged-in user has taken/requested
    if (isset($_GET['taken_items']) && isset($_SESSION['user_id'])) {
        $u_id = $_SESSION['user_id'];
        $sql = "SELECT * FROM medicines WHERE taken_by = '$u_id' ORDER BY id DESC";
        $result = mysqli_query($conn, $sql);
        echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
        exit();
    }

    // Items the logged-in user has donated
    if (isset($_GET['my_items']) && isset($_SESSION['user_id'])) {
        $u_id = $_SESSION['user_id'];
        $sql = "SELECT * FROM medicines WHERE user_id = '$u_id' ORDER BY id DESC";
        $result = mysqli_query($conn, $sql);
        echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
        exit();
    }

    // All approved items for search page
    $sql = "SELECT m.*, u.name as donor_name 
            FROM medicines m 
            LEFT JOIN users u ON m.user_id = u.id 
            WHERE m.status = 'approved' 
            ORDER BY m.id DESC";
    $result = mysqli_query($conn, $sql);
    echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
}

// POST - add new item
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Check login
    if (!isset($_SESSION['user_id']) && (!isset($_POST['user_id']) || empty($_POST['user_id']))) {
        echo json_encode(["status" => "error", "message" => "not_logged_in"]);
        exit();
    }

    $user_id    = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : $_POST['user_id'];
    $item_name  = mysqli_real_escape_string($conn, $_POST['item_name']);
    $category   = mysqli_real_escape_string($conn, $_POST['category']);
    $expiry_date = mysqli_real_escape_string($conn, $_POST['expiry_date']);
    $wilaya     = mysqli_real_escape_string($conn, $_POST['wilaya'] ?? '');

    // Handle image upload
    $image_name = "default_med.jpg";
    if (isset($_FILES['item_image']) && $_FILES['item_image']['name']) {
        $image_name = time() . '_' . basename($_FILES['item_image']['name']);
        move_uploaded_file($_FILES['item_image']['tmp_name'], 'img/' . $image_name);
    }

    $sql = "INSERT INTO medicines (user_id, item_name, category, expiry_date, wilaya, image_path, status) 
            VALUES ('$user_id', '$item_name', '$category', '$expiry_date', '$wilaya', '$image_name', 'pending')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    }
}

// DELETE - remove an item
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {

    $data = json_decode(file_get_contents("php://input"), true);
    $id   = mysqli_real_escape_string($conn, $data['id']);

    // Accept user_id from session or from request body (same as POST)
    if (isset($_SESSION['user_id'])) {
        $u_id = $_SESSION['user_id'];
    } elseif (isset($data['user_id']) && !empty($data['user_id'])) {
        $u_id = mysqli_real_escape_string($conn, $data['user_id']);
    } else {
        echo json_encode(["status" => "error", "message" => "not_logged_in"]);
        exit();
    }

    // Make sure the item belongs to this user
    $check = mysqli_query($conn, "SELECT user_id FROM medicines WHERE id = '$id'");
    $row   = mysqli_fetch_assoc($check);

    if ($row && $row['user_id'] == $u_id) {
        mysqli_query($conn, "DELETE FROM medicines WHERE id = '$id'");
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "unauthorized"]);
    }
}
?>
