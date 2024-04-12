<?php
session_start();
$_SESSION['email'] = $_POST["email"];
$_SESSION['mdp'] = $_POST["mot_de_passe"];
$_SESSION['type'] = $_POST["type"];

$_SESSION['data']=json_decode(file_get_contents("Donnee.json"),true);

function cherche($data_json,$email) {
    if (empty($data_json)) {
        return false;
    } else {
        foreach ($data_json as $cherche) {
            if ($cherche["email"] === $email) {
                return true;
            }
        }
    }
    return false;
}

$message =[];

if(cherche($_SESSION['data']["L3_MIAGE"],$_SESSION['email'])||cherche($_SESSION['data']["L3_INFO"],$_SESSION['email'])||cherche($_SESSION['data']["PROF_PROG_WEB"],$_SESSION['email'])){
    foreach($_SESSION['data']["L3_MIAGE"]as $elmt){
        if($elmt["email"] == $_SESSION['email'] && $elmt["mot_de_passe"]== $_SESSION['mdp']){
             $message = ["reponse"=>"succes","nom"=> $elmt["nom"]];
             break;
        }
    }
    foreach($_SESSION['data']["L3_INFO"] as $elmt){
        if($elmt["email"] == $_SESSION['email'] && $elmt["mot_de_passe"]== $_SESSION['mdp']){
             $message=["reponse"=>"succes","nom"=> $elmt["nom"]];
        }
    }
    foreach($_SESSION['data']["PROF_PROG_WEB"]as $elmt){
        if($elmt["email"] == $_SESSION['email'] && $elmt["mot_de_passe"]== $_SESSION['mdp']){
             $message=["reponse"=>"succes","nom"=> $elmt["nom"]];
        }
    }

}
else{
    $message=["reponse"=>"email ou mot de passe incorect"];
}


echo(json_encode($message));









?>