<?php
session_start();
$_SESSION["titre"] = $_GET["titre"];
$_SESSION["email"] = $_GET["email"];
$_SESSION['data']=json_decode(file_get_contents("Donnee.json"),true);
function recupScrutin(){
    $liste_scrutin = [];
        foreach($_SESSION['data']["scrutin"] as $iterateur){
            if($iterateur["titre"] == $_SESSION["titre"]){
                $liste_scrutin[] = [
                    "titre" => $_SESSION["titre"],
                    "question" => $iterateur["question"],
                    "choix_1" =>$iterateur["choix_1"],
                    "choix_2" =>$iterateur["choix_2"],
                    "choix_3" =>$iterateur["choix_3"],
                ];
            }

            
        }
    
    return $liste_scrutin;
}

function recupProc(){
    $res = 0;
        if(empty($_SESSION['data']["votant"])){
            return $res;
        } else {
            foreach($_SESSION['data']["votant"] as $votant){
                if($votant["email"] == $_SESSION['email'] && $votant["titre du vote"] == $_SESSION['titre'] ){
                    $res = intval($votant["nb_proc"]);
                    break;
                }
            }
        }
    return $res;
}



function select(){
    $res = "";
    $scrutin = recupScrutin();
    if(empty($scrutin)){
       return $res;
    }else{
      $res = $res.'<h2 id = titre_select> veillez voter s il vous plaît </h2>
         <div id = "vote_select" align = "center">';
        foreach($scrutin as $scrutin){
            $res = $res.'
            <label>'.$scrutin["question"].'</label>
            <select id ="selectVote">
            <option id = "choix_res 1" value = "choix_1">'.$scrutin["choix_1"].'</option>
            <option id = "choix_res 2" value = "choix_2">'.$scrutin["choix_2"].'</option>
            <option id = "choix_res 3" value = "choix_3">'.$scrutin["choix_3"].'</option>';
        }
        $res = $res.'
        </select>
        <div id ="transmettre"><input id ="transmis" type = "button" value ="Envoyer"></div>
        </div>';

    }
    return $res;

}

echo json_encode(array("reponse" => select(),"nb_proc"=>recupProc()));

?>