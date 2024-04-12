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
               if($iterateur["statut"] == "En cours" && $iterateur["nom_organisateur"] != $_SESSION["nom"]){
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
    $res = '<h2 id= "no_table_encours">Vous n avez pas de vote en cours actuellement.</h2>';
    $scrutin = recupScrutin();
    if(empty($scrutin)){
       return $res;
    }else{
      $res = '<h2 id = "titre_encours"> la liste de vos votes en cours </h2>
         <div id = "table_vote_encours" align = "center">
         <table id = "liste_scrutin_encours" border = 1 align = center>
         <tr>
         <th> Titre </th>
         <th> Organlisateur </th>
         <th>statut</th>
         </tr>';
 
       foreach($scrutin as $iter){
         $res = $res.'<tr>
                       <td id = "titre_encours">'. $iter["titre"].'</td>
                       <td id = "organisateur_encours">'. $iter["organisateur"].'</td>';
         if($iter["voter"] == "oui"){
             $res = $res.'<td id = "voter"> Vous avez déjà voté</td>';
         }else{
            $res=$res.'<td><input type = "button" id = "vote" value = "je vote"></td></tr>';
         }
      }
       $res = $res."</table></div>";
       $res = $res.'<div align = "center"><input type = button value = "OK" id = "ok_encours"></div>';
       return $res;
    }
 
 
 }


 function recupScrutinOrg(){
    $liste_scrutin = [];
    $liste_titre = retournTitreEtVoter();
    foreach($liste_titre as $element){
        foreach($_SESSION['data']["scrutin"] as $iterateur){
            if($element["titre"] == $iterateur["titre"]){
               if($iterateur["statut"] == "En cours" && $iterateur["nom_organisateur"] == $_SESSION["nom"]){
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

 function tableau_org_encours(){
    $res = '<h2 id= "no_table">Vous n avez pas de vote organisés en cours actuellement.</h2>';
    $scrutin = recupScrutinOrg();
    if(empty($scrutin)){
       return $res;
    }else{
      $res = '<h2 id = titre_org_encours> la liste de vos votes organisés  en cours </h2>
         <div id = "table_vote_org_encours" align = "center">
         <table id = "liste_scrutin_org_encours" border = 1 align = center>
         <tr>
         <th> Titre </th>
         <th> Organlisateur </th>
         <th>statut</th>
         <th> action </th>
         </tr>';
 
       foreach($scrutin as $iter){
         $res = $res.'<tr>
                       <td id = "titre_org_encours">'. $iter["titre"].'</td>
                       <td id = "organisateur_org_encours">Vous</td>';
         if($iter["voter"] == "oui"){
             $res = $res.'<td id = "voter"> Vous avez déjà voté</td>';
         }else{
            $res=$res.'<td><input type = "button" id = "vote_org_encours" value = "je vote"></td>';
         }
         $res=$res.'<td><input type = "button" id = "arret_vote" value = "Terminer"></td></tr>';
      }
       $res = $res."</table></div>";
       $res = $res.'<div align = "center"><input type = button value = "OK" id = "ok_org_encours"></div>';
       return $res;
    }
 
 
 }



echo json_encode(array("liste_encours"=>tableau(),"liste_org_encours"=>tableau_org_encours()));


?>
