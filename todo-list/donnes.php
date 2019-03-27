<?php
require('connexion.php');
$afaire=$_GET['todo'];
$quand=$_GET['jour'];
$suppr=$_GET['supprimer'];

if(isset($afaire)&&isset($quand)){
    $query="INSERT INTO task(date,name) VALUES(:date,:name)";
    $prep=$pdo->prepare($query);
    $prep->bindValue(':date', $quand);
    $prep->bindValue(':name', $afaire);
    $prep->execute();
    echo json_encode('success');
}else {
    echo "il manque des infos";
}

if(isset($suppr)){

    $query="DELETE  FROM task where id=:id";
    $prep=$pdo->prepare($query);
    $prep->bindValue(':id',$suppr);
    $prep->execute();
    echo json_encode('success');

}

?>