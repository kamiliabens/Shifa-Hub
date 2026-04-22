<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<body>
    <h2>Create New Account</h2>
    <form method="POST">
        Full Name: <input type="text" name="name" required><br><br>
        Email: <input type="email" name="email" required><br><br>
        Password: <input type="password" name="pass" required><br><br>
        <input type="submit" name="register" value="Sign Up">
    </form>

    <?php
    if(isset($_POST['register'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['pass']; 

        $sql = "INSERT INTO users (full_name, email, password) VALUES ('$name', '$email', '$password')";
        
        if(mysqli_query($conn, $sql)) {
            echo "<p style='color:green;'>Registration Successful!</p>";
        } else {
            echo "Error: Email might be already used.";
        }
    }
    ?>
</body>
</html>