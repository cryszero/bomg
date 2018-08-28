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

if($_POST['username'] && $_POST['password']) {
    $myusername = mysqli_real_escape_string($dblink,$_POST['username']);
    $mypassword = mysqli_real_escape_string($dblink,$_POST['password']);
    $result = $dblink->query("SELECT * FROM users WHERE username = '$myusername' and password = '$mypassword'");
    if (!$result) {
        echo 'Bad login or password';
        http_response_code(402);
        die();
    }
} else {
    http_response_code(500);
    echo $myusername;
    exit();
}

//Initialize array variable
$dbdata = array();

//Fetch into associative array
while ( $row = $result->fetch_assoc())  {
$dbdata[]=$row;
}

if(!count($dbdata)) {
    http_response_code(500);
    echo 'Login error';
    exit();
}

//Print array in JSON format
echo json_encode($dbdata);
?>