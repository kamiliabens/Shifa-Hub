<?php 
include 'db.php'; 

if (isset($_POST['update_status'])) {
    $id = $_POST['item_id'];
    $new_status = $_POST['status'];
    
    
    $reason = mysqli_real_escape_string($conn, $_POST['reject_reason']);

   
    $query = "UPDATE medicines SET status='$new_status', rejection_reason='$reason' WHERE id=$id";
    
    if (mysqli_query($conn, $query)) {
        header("Location: admin.php?success=1");
        exit();
    } else {
        echo "Error updating: " . mysqli_error($conn);
    }
}


$result = mysqli_query($conn, "SELECT * FROM medicines WHERE status='pending'");
$users_result = mysqli_query($conn, "SELECT * FROM users ORDER BY id DESC");
?>

<h2>Admin Approval Panel</h2>
<?php if(isset($_GET['success'])) echo "<p style='color:green;'>Status updated successfully!</p>"; ?>

<table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
    <tr style="background-color: #f2f2f2;">
        <th>Item Name</th>
        <th>Category</th>
        <th>Details</th>
        <th>Action</th>
    </tr>
    <?php while ($row = mysqli_fetch_assoc($result)): ?>
    <tr>
        <td><?php echo $row['item_name']; ?></td>
        <td><?php echo $row['category']; ?></td>
        <td><?php echo $row['expiry_date']; ?></td>
        <td>
            <form method="POST" style="display: flex; gap: 10px;">
                <input type="hidden" name="item_id" value="<?php echo $row['id']; ?>">
                
                <select name="status" required>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                </select>

                <input type="text" name="reject_reason" placeholder="Reason (Optional for approval)">
                
                <button type="submit" name="update_status">Confirm</button>
            </form>
        </td>
    </tr>
    <?php endwhile; ?>
</table>

<h2 style="margin-top: 50px;">Registered Users</h2>
<table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
    <tr style="background-color: #f2f2f2;">
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
    </tr>
    <?php while ($user_row = mysqli_fetch_assoc($users_result)): ?>
    <tr>
        <td><?php echo $user_row['id']; ?></td>
        <td><?php echo htmlspecialchars($user_row['name']); ?></td>
        <td><?php echo htmlspecialchars($user_row['email']); ?></td>
    </tr>
    <?php endwhile; ?>
</table>