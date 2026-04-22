<?php 
include 'db.php'; 

if (isset($_POST['submit_item'])) {
    $item_name = $_POST['item_name'];
    $category  = $_POST['category']; 
    $details   = $_POST['details']; // Can be expiry date or equipment condition

    // Image handling
    $image_name = $_FILES['item_image']['name'];
    $target = "img/" . basename($image_name);
    move_uploaded_file($_FILES['item_image']['tmp_name'], $target);

    $sql = "INSERT INTO medicines (item_name, category, expiry_date, image_path, status) 
            VALUES ('$item_name', '$category', '$details', '$image_name', 'pending')";
    
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
        <option value="Medicine">Medicine</option>
        <option value="Equipment">Medical Equipment</option>
    </select><br><br>

    <label>Expiry Date or Condition:</label><br>
    <input type="text" name="details" placeholder="e.g., 12/2026 or New" required><br><br>

    <label>Photo:</label><br>
    <input type="file" name="item_image"><br><br>

    <button type="submit" name="submit_item">Add Item</button>
</form>