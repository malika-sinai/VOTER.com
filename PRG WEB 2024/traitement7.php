<?php
session_start();
$_SESSION["email"] = $_POST["email"];
$_SESSION["titre"] = $_POST["titre"];
$_SESSION["data"] = json_decode(file_get_contents("Donnee.json"),true);

foreach($_SESSION["data"]["votant"]as &$votant){
    if($votant["email"] === $_SESSION["email"] && $votant["titre du vote"] === $_SESSION["titre"]){
        $votant["voter"] = "oui"; 
    }
}
$data_final = json_encode($_SESSION['data'],JSON_PRETTY_PRINT);
file_put_contents("Donnee.json", $data_final); 

echo json_encode(array("message" => "modifié avec succès"));

?>