<?php
session_start();
$_SESSION['action'] = $_POST["action"];

if($_SESSION['action'] == "Nouveau scrutin"){
  echo json_encode(array("reponse" => '
    <h2 id="scrutin_title">Veuillez mettre les informations relative au scrutin</h2>
    <form method="get" id="scrutin_form">
    <label>Titre du vote</label>
    <input type="text" name="titre_vote"  id = "title">
    <label >Question </label>
    <input type="text" name="question_1"  id = "Q1">
    <label>Choix de reponse 1</label>
    <input type="text" name="response_1"  id = "R1">
    <label>Choix de reponse 2</label>
    <input type="text" name="response_2"  id = "R2">
    <label>Choix de reponse 3</label>
    <input type="text" name="response_3"  id = "R3">
    </form>
    <input type="button" name="terminer"  id = "fini" value = "Terminer" >',
    "style" =>' 
    h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    
    form { 
      text-align : center;
    }

    label {
        display: block;
        margin-bottom: 20px;
    }

    input {
    padding: 15px ;
    border-radius: 5px;
    background-color: #f2f2f2;
    margin-bottom:15px ;
    border: none;
    outline: none;
    display:block;
    margin-bottom : 20px;
    margin-left:550px;

    }

    input[type="button"] {
        padding: 15px ;
        border:none;
        border-radius: 5px;
        font-size: 15px;
        background-color:#eb7371;
        outline: none;
        cursor: pointer;
        margin-bottom : 20px;
    }'
  ));
}


?>