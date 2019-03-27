<?php 

$serv="localhost";
$user="root";
$pass="";
$db="todolist";

$pdo = new PDO("mysql:host=$serv;dbname=$db", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>