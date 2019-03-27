<?php
require('connexion.php');

$query = "SELECT * FROM task";
$prep=$pdo->prepare($query);
$prep->execute();
$return = $prep->fetchAll();

echo json_encode($return);