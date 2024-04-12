<?php
session_start();
$_SESSION['nom'] = $_POST["Nom_organisateur"];
$_SESSION['titre'] = $_POST["titre"];
$_SESSION['question'] = $_POST["question"];
$_SESSION['choix1'] = $_POST["choix1"];
$_SESSION['choix2'] = $_POST["choix2"];
$_SESSION['choix3'] = $_POST["choix3"];

$_SESSION['data'] = json_decode(file_get_contents("Donnee.json"),true);
$_SESSION['new_scrutin'] = array(
    "nom_organisateur" => $_SESSION['nom'],
    "titre"=>$_SESSION['titre'],
    "question"=>$_SESSION['question'],
    "choix_1"=>$_SESSION['choix1'],
    "choix_2"=>$_SESSION['choix2'],
    "choix_3"=>$_SESSION['choix3'],
    "statut" =>"En cours",
    "bulletin"=> array()
   );
$_SESSION['data']['scrutin'][] = $_SESSION['new_scrutin'];
file_put_contents("Donnee.json",json_encode($_SESSION['data']));
echo json_encode(array("message"=>"ok","titre"=>$_SESSION['titre']));

?>