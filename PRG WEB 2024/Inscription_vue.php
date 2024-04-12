<!DOCTYPE html>
<html xml:lang="fr" lang="fr" xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <link type = "text/css" rel ="stylesheet" media="all" href="style.css"/>
    <title>Inscription</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </head>
    <body>
        <form method="get">
        <p><a href="acceuil.php"><span class="glyphicon glyphicon-circle-arrow-left"></span></a></p>
           <h1>Inscription<br/></h1>
            <div class="inputs">
                <input type="text" name ="Nom" id="t1" placeholder="Nom">
                <input type="text" name ="Prenom" id="t2" placeholder="Prénom">
                <input type="text" name ="email" id="t3" placeholder="Adresse mail">
                <input type="password" name ="motDePasse" id="t4" placeholder="Mot de passe">
                <input type="password" name ="reMotDePasse" id="t5" placeholder="confirmer le mot de passe">
            </div>
            <div align ="center" class="select">
                
                <p> <label for="TYpe_pers"> vous êtes ??</label>
                    <select name="typs_per" id="s1">
                    <option value="L3_MIAGE">Etudiant(e) en L3 MIAGE</option>
                    <option value="L3_INFO">Etudiant(e) en L3 INFO</option>
                    <option value="PROF_PROG_WEB">professeur de PROG WEB</option>
                </select></p>
            </div>
            <div align="center" class = "bouton" ><input type="button" name="inscrire"  value = "S'inscrire"  id ="first_button"></div>
            <div align = "center" class = "connection" id = "Pour_connection"><p>J'ai un compte , je me connecte <a href = "connection_vue.php">ici</a></p></div>
            <div align = "center" class = "feedback" id = "message"><p></p></div>
        </form>
    <script src="inscription.js"></script>
    </body>
</html>
