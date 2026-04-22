<?php 
include 'db.php'; 

if (isset($_POST['update_status'])) {
    $id = $_POST['item_id'];
    $new_status = $_POST['status'];
    $reason = $_POST['reject_reason'];

    mysqli_query($conn, "UPDATE medicines SET status='$new_status', rejection_reason='$reason' WHERE id=$id");
    header("Location: admin.php");
}

$result = mysqli_query($conn, "SELECT * FROM medicines WHERE status='pending'");
?>

<h2>Admin Approval Panel</h2>
<table border="1">
    <tr>
        <th>Item Name</th>
        <th>Category</th>
        <th>Action</th>
    </tr>
    <?php while ($row = mysqli_fetch_assoc($result)): ?>
    <tr>
        <td><?php echo $row['item_name']; ?></td>
        <td><?php echo $row['category']; ?></td>
        <td>
            <form method="POST">
                <input type="hidden" name="item_id" value="<?php echo $row['id']; ?>">
                <select name="status">
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                </select>
                <input type="text" name="reject_reason" placeholder="Reason if rejected">
                <button type="submit" name="update_status">Update</button>
            </form>
        </td>
    </tr>
    <?php endwhile; ?>
</table>