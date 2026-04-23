<?php
include 'db.php';

// Show all items in database
$result = mysqli_query($conn, "SELECT id, item_name, status FROM medicines ORDER BY id DESC");
echo "<pre>";
while ($row = mysqli_fetch_assoc($result)) {
    echo "ID: " . $row['id'] . " | Name: [" . $row['item_name'] . "] | Status: " . $row['status'] . "\n";
}
echo "</pre>";
?>
