<?php
session_start();
$_SESSION["email"] = $_POST["email"];
$_SESSION["nom"]= $_POST["nom"];
$_SESSION["data"] = json_decode(file_get_contents("Donnee.json"),true);

function retournTitreEtVoter(){
    $res = array();
    if(empty($_SESSION['data']["votant"])){
        return $res;
    } else {
        foreach($_SESSION['data']["votant"] as $votant){
            if($votant["email"] == $_SESSION['email']){
                $res[] = array(
                    "titre" => $votant["titre du vote"],
                    "voter" => $votant["voter"],
                    "nb_proc" => $votant["nb_proc"]
                );
            }
        }
    }
    return $res;
}

function recupScrutin(){
    $liste_scrutin = [];
    $liste_titre = retournTitreEtVoter();
    foreach($liste_titre as $element){
        foreach($_SESSION['data']["scrutin"] as $iterateur){
            if($element["titre"] == $iterateur["titre"]){
               if($iterateur["statut"] == "Terminer" && $iterateur["nom_organisateur"] != $_SESSION["nom"]){
                   $liste_scrutin[] = [
                    "organisateur" => $iterateur["nom_organisateur"],
                    "titre" => $element["titre"],
                    "question" => $iterateur["question"],
                    "choix_1" =>$iterateur["choix_1"],
                    "choix_2" =>$iterateur["choix_2"],
                    "choix_3" =>$iterateur["choix_3"],
                    "voter" =>$element["voter"],
                    "nb_proc" => $element["nb_proc"]
                   ];
               }

            }
        }
    }
    return $liste_scrutin;
}

function tableau(){
    $res = '<h2 id= "no_table_archive_org">Vous n avez pas de vote terminé.</h2>';
    $scrutin = recupScrutin();
    if(empty($scrutin)){
       return $res;
    }else{
      $res = '<h2 id = "titre_archive_org"> la liste des votes terminé auxquels vous avez voté </h2>
         <div id = "table_vote_archive_org" align = "center">
         <table id = "liste_vote_org" border = 1 align = center>
         <tr>
         <th> Titre </th>
         <th> Organlisateur </th>
         <th>Resultat</th>
         </tr>';
 
       foreach($scrutin as $iter){
         $res = $res.'<tr>
                       <td id = "titre_archive_org">'. $iter["titre"].'</td>
                       <td id = "organisateur_archive">'. $iter["organisateur"].'</td>';
         $res=$res.'<td><input type = "button" id = "resultat_org" value = "Voir le résultat "></td></tr>';
      }
       $res = $res."</table></div>";
       $res = $res.'<div align = "center"><input type = button value = "OK" id = "ok_archive_org"></div>';
       return $res;
    }
 
 
 }


 function recupScrutin_org_termine(){
    $liste_scrutin = [];
    $liste_titre = retournTitreEtVoter();
    foreach($liste_titre as $element){
        foreach($_SESSION['data']["scrutin"] as $iterateur){
            if($element["titre"] == $iterateur["titre"]){
               if($iterateur["statut"] == "Terminer" && $iterateur["nom_organisateur"] == $_SESSION["nom"]){
                   $liste_scrutin[] = [
                    "organisateur" => $iterateur["nom_organisateur"],
                    "titre" => $element["titre"],
                    "question" => $iterateur["question"],
                    "choix_1" =>$iterateur["choix_1"],
                    "choix_2" =>$iterateur["choix_2"],
                    "choix_3" =>$iterateur["choix_3"],
                    "voter" =>$element["voter"],
                    "nb_proc" => $element["nb_proc"]
                   ];
               }

            }
        }
    }
    return $liste_scrutin;
}

 function tableau_vote_org_termine(){
    $res = '<h2 id= "no_table_archive_org_termine">Vous n avez pas de scrutin Terminé.</h2>';
    $scrutin = recupScrutin_org_termine();
    if(empty($scrutin)){
       return $res;
    }else{
      $res = '<h2 id = "titre_archive_org_termine"> la liste des votes terminé que vous avez organisé </h2>
         <div id = "table_vote_archive_org_termine" align = "center">
         <table id = "liste_vote_org_termine" border = 1 align = center>
         <tr>
         <th> Titre </th>
         <th> Organlisateur </th>
         <th>Resultat</th>
         </tr>';
 
       foreach($scrutin as $iter){
         $res = $res.'<tr>
                       <td id = "titre_archive_org_termine">'. $iter["titre"].'</td>
                       <td id = "organisateur_archive">Vous</td>';
         $res=$res.'<td id="reultat"><input type = "button" id = "resultat_org_termine" value = "Voir le résultat "></td></tr>';
      }
       $res = $res."</table></div>";
       $res = $res.'<div align = "center"><input type = button value = "OK" id = "ok_archive_org_termine"></div>';
       return $res;
    }
 
 
 }



echo json_encode(array("liste_vote"=>tableau(),"liste_vote_org" => tableau_vote_org_termine()));


?>