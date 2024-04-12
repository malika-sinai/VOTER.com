<?php
function recup_info($email, $data_json) {
    $res = array();
    if (empty($data_json)) {
        return $res;
    } else {
        foreach ($data_json as $cherche) {
            if ($cherche["email"] === $email) {
                array_push($res,$cherche["nom"],$cherche["prenom"],$email);
            }
        }
    }
    return $res;
}



session_start();
$_SESSION["choix"]= $_POST["choix"];
$_SESSION["email_proc"]= $_POST["email_proc"];
$_SESSION["titre"]= $_POST["titre"];
$_SESSION['donnee'] = json_decode(file_get_contents("Donnee.json"),true);
foreach($_SESSION['email_proc'] as $element){
    $_SESSION['data']=array(
        "titre du vote"=> $_SESSION["titre"],
        "nom"=>recup_info($element["email"],$_SESSION['donnee'][$_SESSION["choix"]])[0],
        "prenom"=>recup_info($element["email"],$_SESSION['donnee'][$_SESSION["choix"]])[1],
        "email"=>$element["email"],
        "nb_proc"=>$element["nombre_procuration"],
        "voter" =>"non"
    );

    $_SESSION['donnee']["votant"][]=$_SESSION['data'];
    

}

file_put_contents("Donnee.json",json_encode($_SESSION['donnee']));
echo json_encode(array("reponse4"=>"ok"));


?>