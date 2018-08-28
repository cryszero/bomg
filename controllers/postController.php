<?php

// Initialize variable for database credentials
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'MyBloge';

//Create database connection
$dblink = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

//Check connection was successful
if ($dblink->connect_errno) {
printf("Failed to connect to database");
exit();
}

if($_GET['getPosts']) {
    $result = $dblink->query("SELECT * FROM posts");
} else if ($_POST['title'] && $_POST['text']) {
    $date = date("Y-m-d");
    $title = mysqli_real_escape_string($dblink,$_POST['title']);
    $text = mysqli_real_escape_string($dblink,$_POST['text']);
    $query = "INSERT INTO posts (title, text, date) VALUES ('$title', '$text', '$date')";
    $result = $dblink->query($query);
    if($result === TRUE) {
        echo "Success";
        exit();
    } else {
        http_response_code(402);
        echo "Error";
        exit();
    }
} else if ($_POST['id'] && $_GET['removePost']) {
    $id = mysqli_real_escape_string($dblink,$_POST['id']);
    $query = "DELETE FROM posts WHERE id = '$id'";
    $result = $dblink->query($query);
    if($result === TRUE) {
        echo "Success";
        exit();
    } else {
        http_response_code(402);
        echo "Error";
        exit();
    }
} else {
    echo 'Invalid request';
    exit();
}

//Initialize array variable
$dbdata = array();

//Fetch into associative array
while ( $row = $result->fetch_assoc())  {
$dbdata[]=$row;
}

//Print array in JSON format
echo json_encode($dbdata);
?>