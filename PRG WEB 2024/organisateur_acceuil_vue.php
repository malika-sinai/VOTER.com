<?php
$nom = $_GET["nom"];
$email = $_GET["email"];
//echo $_SESSION['nom'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voter.com</title>
    <link rel="stylesheet" href="organisateur.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
<header>
<nav class="navbar">
<a href="" class="logo">Voter.com</a>
<div class="nav_links">
                <ul>
                    <li class="active"><a href="Acceuil.php">Acceuil</a></li>
                    <li class="active"><a href="traitement_deconnection.php">Se déconnecter</a></li>
                </ul>
</div>
</nav>
</header>
<div align = center><h1>BIENVENUE SUR VOTER.com</h1></div>
<div align = center id = "d1" class = "nouv_scrutin"><input type = "button" id = "b1" value = "Nouveau scrutin"></div>
<div align = center id = "d2" class = "ex_scrutin"><input type = "button" id = "b2" value = "Scrutin Archivés"></div>
<div align = center id = "d3" class = "mes_votes"><input type = "button" id = "b3" value = "Mes votes en cours"></div>
<div id = "nom" data_nom ='<?php echo $nom ?>' data_email ='<?php echo $email ; ?>'></div>
<script src="doc_organisateur.js"> </script> 
</body>
</html>