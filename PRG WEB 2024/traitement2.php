<?php
session_start();
$_SESSION["choix"] = $_POST["choix"];
function recuperer_liste($data){
    $res ='<h2 id = ajout_title>veuillez ajouter les procurations si il y en a </h2>
        <table id = "liste_choisi" border = 1 align = center>
          <tr>
          <th> Nom </th>
          <th>Prenom</th>
          <th>email</th>
          <th>nombre de procuration</th>
          </tr>';
    foreach($data as $personne){
        $res = $res.'<tr>
               <td id = "nom">'. $personne["nom"].'</td>
               <td id = "prenom">'. $personne["prenom"].'</td>
               <td id = "email">'. $personne["email"].'</td>
               <td> <input type="number" id="nombre_proc" name="nombre de procuration" size = 5>
               </tr>';
    }
    $res = $res."</table>";
    $res = $res.'<input type = button value = "OK" id = "ok">';

    return $res;
}



$_SESSION['reponse3']="";

$_SESSION['donnee'] = json_decode(file_get_contents("Donnee.json"),true);
if($_SESSION['choix'] == "L3_MIAGE"){
    $_SESSION['reponse3'] = recuperer_liste($_SESSION['donnee']["L3_MIAGE"]);
}
else if($_SESSION['choix'] == "L3_INFO"){
    $_SESSION['reponse3']= recuperer_liste($_SESSION['donnee']["L3_INFO"]);
}
else if($_SESSION['choix'] == "PROF_PROG_WEB"){
    $_SESSION['reponse3']= recuperer_liste($_SESSION['donnee']["PROF_PROG_WEB"]);
}
else {
    $_SESSION['reponse3'] = "la liste n'existe pas";
}

echo json_encode(array("reponse3" => $_SESSION['reponse3']));
?>