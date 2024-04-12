<?php
function chercherEmail($email, $data_json) {
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

$Nom = $_POST['nom'];
$Prenom = $_POST['prenom'];
$email = $_POST['email'];
$Motdepasse = $_POST['mot_de_passe'];
$type = $_POST['type'];

$data = json_decode(file_get_contents("Donnee.json"), true);
$user = array(
    "nom" => $Nom,
    "prenom" => $Prenom,
    "email" => $email,
    "mot_de_passe" => $Motdepasse,
);

if($type === "L3_MIAGE" && chercherEmail($email,$data["L3_MIAGE"])===false){
    $data['L3_MIAGE'][]=$user;
    $data_final=json_encode($data,JSON_PRETTY_PRINT);
    file_put_contents("Donnee.json",$data_final);
    $message = array('message'=>'succes');
    echo(json_encode($message));
}else if($type === "L3_INFO" && chercherEmail($email,$data["L3_INFO"]) === false){
    $data['L3_INFO'][]=$user;
    $data_final=json_encode($data,JSON_PRETTY_PRINT);
    file_put_contents("Donnee.json",$data_final);
    $message = array('message'=>'succes');
    echo(json_encode($message));
}else if($type === "PROF_PROG_WEB" && chercherEmail($email,$data["PROF_PROG_WEB"]) === false){
    $data['PROF_PROG_WEB'][]=$user;
    $data_final=json_encode($data,JSON_PRETTY_PRINT);
    file_put_contents("Donnee.json",$data_final);
    $message = array('message'=>'succes');
    echo(json_encode($message));
    
}else{
    $message = array('message'=>'echec,le compte existe');
    echo(json_encode($message));
}

?>