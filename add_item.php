<?php 
session_start();
include 'db.php'; 

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo "<script>alert('You must login first to add a medicine!'); window.location.href='index.html';</script>";
    exit();
}

if (isset($_POST['submit_item'])) {
    $item_name = mysqli_real_escape_string($conn, $_POST['item_name']);
    $category  = mysqli_real_escape_string($conn, $_POST['category']); 
    $details   = mysqli_real_escape_string($conn, $_POST['details']); 
    $user_id   = $_SESSION['user_id'];

    // Image handling
    $image_name = $_FILES['item_image']['name'];
    $target = "img/" . basename($image_name);
    move_uploaded_file($_FILES['item_image']['tmp_name'], $target);

    $sql = "INSERT INTO medicines (user_id, item_name, category, expiry_date, image_path, status) 
            VALUES ('$user_id', '$item_name', '$category', '$details', '$image_name', 'approved')";
    
    if (mysqli_query($conn, $sql)) {
        echo "<p style='color:green;'>Item submitted successfully! Waiting for admin approval.</p>";
    }
}
?>

<form method="POST" enctype="multipart/form-data">
    <label>Item Name:</label><br>
    <input type="text" name="item_name" required><br><br>

    <label>Category:</label><br>
    <select name="category">
        <option value="antibiotics">Antibiotics</option>
        <option value="vitamins">Vitamins</option>
        <option value="devices">Medical Devices</option>
        <option value="chronic">Chronic Care</option>
        <option value="painkillers">Painkillers</option>
    </select><br><br>

    <label>Expiry Date or Condition:</label><br>
    <input type="text" name="details" placeholder="e.g., 12/2026 or New" required><br><br>

    <label>Photo:</label><br>
    <input type="file" name="item_image"><br><br>

    <button type="submit" name="submit_item">Add Item</button>
</form>
