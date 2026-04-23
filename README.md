# Shifa Hub 🏥 - Medicine Donation Platform

## 📝 Project Description
Shifa Hub is a creative web application developed for the Web Development course (2025/2026). The platform is designed to connect people who have surplus, unexpired medicines or medical equipment with those in need. It aims to reduce medical waste and support community health through a secure and organized donation process.

The system allows users to register, log in, and post donations. Every donation goes through an admin review process before appearing in the public search to ensure safety and quality.

## 🛠 Technologies Used

### Front-end:
- HTML5 & Tailwind CSS: For a modern, clean, and responsive user interface.
- JavaScript (ES6+): To handle page logic and dynamic elements.
- Fetch API: Used to communicate with the backend without refreshing the page.

### Back-end:
- PHP: To handle server-side logic, session management, and API endpoints.
- MySQL: A relational database used to store user accounts and medicine listings.
- XAMPP: The local server environment used for development and testing.

## 🚀 Key Features (CRUD & More)
- User Authentication: Secure registration and login (via api_auth.php).
- Create: Users can post new donations with images and details (via api_medicines.php).
- Read: A real-time search system filters and displays approved medicines (via search.js).
- Update: An admin panel (admin.php) to approve or reject pending items.
- Delete: Users can securely remove their own listings from their profile page.
- Claiming System: Users can "Take" items, which updates the database status automatically.

## 📋 Setup and Execution Instructions

### 1. Prerequisites
- Download and install XAMPP (Apache and MySQL).

### 2. Database Setup
1. Open phpMyAdmin at http://localhost/phpmyadmin.
2. Create a new database named shifa_db.
3. Import the provided shifa_db.sql file into your new database.

