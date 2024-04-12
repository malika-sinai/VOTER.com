<?php
session_start();
$_SESSION["choix"] = $_POST["choix"];
$_SESSION["titre"] = $_POST["titre"];
$_SESSION["data"] = json_decode(file_get_contents("Donnee.json"),true);


    foreach ($_SESSION["data"]["scrutin"] as &$scrutin) {
        if($scrutin["titre"] === $_SESSION["titre"]) {
            $scrutin["bulletin"][] = $_SESSION["choix"];
            
        }
    }
    $data_final = json_encode($_SESSION['data'],JSON_PRETTY_PRINT);
    file_put_contents("Donnee.json", $data_final); 



echo json_encode(array("message"=>"ok"));

?>