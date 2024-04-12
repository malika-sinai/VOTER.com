<?php
session_start();
$_SESSION["titre"] = $_POST["titre"];
$_SESSION["data"] = json_decode(file_get_contents("Donnee.json"),true);

function recupLesChoix()
{
    $res = [];
    foreach ($_SESSION["data"]["scrutin"] as $scrutin) {
        if ($scrutin["titre"] === $_SESSION["titre"]) {
            $res[] = [
                "choix_1" => $scrutin["choix_1"],
                "choix_2" => $scrutin["choix_2"],
                "choix_3" => $scrutin["choix_3"]
            ];
        }
    }
    return $res;
}

function nbOcc($table,$cherche){
    $res = 0;
    if(empty($table)){
        return $res;
    }else{
        foreach($table as $element){
            if($element == $cherche){
                $res += 1;
            }
        }
    }
    return $res;

}


function calculResultat(){
$res=array();
    foreach ($_SESSION["data"]["scrutin"] as $scrutin){
        if($scrutin["titre"] === $_SESSION["titre"]){
             $res[]=[
                "choix_1" => intval((nbOcc($scrutin["bulletin"],"choix_1")/count($scrutin["bulletin"]))*100),
                "choix_2" => intval((nbOcc($scrutin["bulletin"],"choix_2")/count($scrutin["bulletin"]))*100),
                "choix_3" => intval((nbOcc($scrutin["bulletin"],"choix_3")/count($scrutin["bulletin"]))*100)
             ];
        }
    }
    return $res;


}

function tableau_resultat(){
$choixliste = recupLesChoix();
$choix_1="";
$choix_2="";
$choix_3="";

foreach($choixliste as $choix){
    $choix_1 .= $choix["choix_1"];
    $choix_2 .= $choix["choix_2"];
    $choix_3 .= $choix["choix_3"];
}

$resultat = calculResultat();
$res_choix_1 = 0;
$res_choix_2 = 0;
$res_choix_3 = 0;
foreach($resultat as $res){
    $res_choix_1 = $res["choix_1"];
    $res_choix_2 = $res["choix_2"];
    $res_choix_3 = $res["choix_3"];
}

    $res = '<h2 id = titre_res> Rsultat </h2>
        <div id = "table_res" align = "center">
        <table id = "liste_res" border = 1 align = center>
        <tr>
        <th> choix </th>
        <th> Pourcentage </th>
        </tr>';
        $res = $res.'<tr><td id = "choix">'. $choix_1.'</td>
            <td id = "res">'. $res_choix_1.' %</td></tr>';
         $res = $res.'<tr><td id = "choix">'. $choix_2.'</td>
            <td id = "res">'. $res_choix_2.'%</td></tr>';
        $res = $res.'<tr><td id = "choix">'. $choix_3.'</td>
            <td id = "res">'. $res_choix_3.'%</td></tr>';
     
    $res = $res."</table></div>";
    $res = $res.'<div align = "center"><input type = button value = "OK" id = "ok_res"></div>';
      
      
    return $res;
}

echo json_encode(array("reponse"=>tableau_resultat()));



?>