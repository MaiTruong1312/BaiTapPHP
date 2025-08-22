<?php
session_start();
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Truy vấn kiểm tra user/pass
    $stmt = $conn->prepare("SELECT * FROM login WHERE User = ? AND Pass = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $_SESSION['username'] = $username;
        header("Location: ../index.html");
        exit();
    } else {
        echo "Sai tên đăng nhập hoặc mật khẩu!";
    }

    $stmt->close();
    $conn->close();
}
?>
