<?php 
include 'db.php'; 

// 1. DELETE LOGIC: This part handles deleting an item when the button is clicked
if (isset($_GET['del_id'])) {
    $id = $_GET['del_id'];
    $delete_query = "DELETE FROM medicines WHERE id = $id";
    if (mysqli_query($conn, $delete_query)) {
        header("Location: profile.php");
        exit();
    }
}

// 2. SEARCH LOGIC: This part handles the search bar functionality
$search_query = "";
if (isset($_GET['search'])) {
    $search_query = $_GET['search'];
    // Search for approved items that match the name
    $sql = "SELECT * FROM medicines WHERE item_name LIKE '%$search_query%'";
} else {
    // If no search, show everything
    $sql = "SELECT * FROM medicines";
}
$result = mysqli_query($conn, $sql);
?>

<form method="GET" style="margin-bottom: 20px;">
    <input type="text" name="search" placeholder="Search for medicines or equipment..." value="<?php echo $search_query; ?>">
    <button type="submit">Search</button>
</form>

<hr>

<?php while ($row = mysqli_fetch_assoc($result)): ?>
    <div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
        <h3><?php echo $row['item_name']; ?> <span style="color: #666; font-size: 0.8em;">(<?php echo $row['category']; ?>)</span></h3>
        
        <p><strong>Details/Expiry:</strong> <?php echo $row['expiry_date']; ?></p>
        <p><strong>Status:</strong> <?php echo $row['status']; ?></p>

        <?php if (!empty($row['image_path'])): ?>
            <img src="img/<?php echo $row['image_path']; ?>" width="120" style="display:block; margin: 10px 0; border-radius: 5px;">
        <?php else: ?>
            <p style="color: #999;"><i>(No image available)</i></p>
        <?php endif; ?>

        <?php if ($row['status'] == 'rejected'): ?>
            <p style="color: red; background: #fff1f1; padding: 5px;">
                <strong>Rejection Reason:</strong> <?php echo $row['rejection_reason']; ?>
            </p>
        <?php endif; ?>

        <a href="profile.php?del_id=<?php echo $row['id']; ?>" 
           onclick="return confirm('Are you sure you want to delete this item?')" 
           style="color: white; background: red; padding: 5px 10px; text-decoration: none; border-radius: 3px; font-size: 0.9em;">
           Delete Item
        </a>
    </div>
<?php endwhile; ?>