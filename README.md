# Shifa Hub 🏥 - Medicine Donation Platform

## Project Description
​**Shifa Hub** is a creative web application developed for the Web Development course (2025/2026). The platform is designed to connect people who have surplus, unexpired medicines or medical equipment with those in need. It aims to reduce medical waste and support community health through a secure and organized donation process.
​The system allows users to register, log in, and post donations. Every donation goes through an admin review process before appearing in the public search to ensure safety and quality.

## Technologies Used

### Front-end:
- **HTML5 & Tailwind CSS:** For a modern, clean, and responsive user interface.
- **JavaScript (ES6+):** To handle page logic and dynamic elements.
- **Fetch API:** Used to communicate with the backend without refreshing the page.

### Back-end:
- **PHP:** To handle server-side logic, session management.
- **MySQL:** A relational database used to store user accounts and medicine listings.
- **XAMPP:** The local server environment used for development and testing.

## Key Features (CRUD & More)
- **User Authentication:** Secure registration and login ***(via api_auth.php)***.
- **Create:** Users can ***post new donations*** with images and details ***(via api_medicines.php)***.
- **Read:** A real-time ***search*** system filters and displays ***approved*** medicines and medical equipment only ***(via search.js)***.
- **Update** ***(Admin Power)***: An admin panel ***(admin.php)*** to ***approve or reject pending items***.
- **Delete:** Users can securely ***remove*** their own listings from their profile page.
- **Claiming System:** Users can "Take" items, which updates the database status automatically.

## 📋 Setup and Execution Instructions

### 1. Prerequisites
- ​Download and install **XAMPP** (**Apache** and **MySQL** services must be running).  

### 2. Database Setup
 To ensure the backend functions correctly, follow these steps in **phpMyAdmin**:  
1. Open phpMyAdmin at http://localhost/phpmyadmin.
2. Create a new database **named shifa_db**.
3. Click on the Import tab, select the provided ***shifa_db.sql*** file from the project folder, and click Go.
   ​This will automatically create the users and medicines tables with sample data.

### 3. Project Deployment
1. Move the entire project folder into the **htdocs** directory of your XAMPP installation (e.g., C:/xampp/htdocs/shifa-hub/).
2. Open the ***db.php file*** and ensure the database connection settings match your local setup:
   ```php
   $conn = mysqli_connect("localhost", "root", "", "shifa_db");
### 4. Accessing the Admin Panel
To demonstrate the Update (UPDATE) and Delete logic for the administrator: 
- ​Navigate to: "http://localhost/shifa_hub/admin.php." As an admin, you can view all Pending donations.
- ​Click**Approve** to make the medicine visible in the public search, or **Reject** to remove it.
# Thank you for reviewing our work We look forward to your feedback! ❤️✨


   
