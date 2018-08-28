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

if($_GET['getCategories']) {
    $result = $dblink->query("SELECT * FROM categories");
}
$dbdata = array();
while ($row = $result->fetch_assoc())  {
    $dbdata[]=$row;
}
echo json_encode($dbdata);
exit();
?>