
<!DOCTYPE html>
<html xml:lang="fr" lang="fr" xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <link type = "text/css" rel ="stylesheet" media="all" href="style_connection.css"/>
    <title>connexion</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </head>
    </head>
    <body>
    
        <form action="connection_controlleur.php" method="get">
        <h1>Se connecter<br/></h1>
           <p class="choose_utilisateur">connectez vous avec votre email et votre mot de passe</p>
            <div class="inputs">
                <input type="text" name="email"  placeholder="email" id = "email_co">
                <input type="password" name ="motDePasse"  placeholder="Mot de passe" id = "mdp_co"> 
            </div>
            <div align ="center" class="select">
                 <p> <label for="action"> vous souhaitez organiser un vote ou accéder à un vote ?</label>
                    <select name="typs_per" id="s2">
                    <option value="organiser">Organiser un vote</option>
                    <option value="voter">voter</option>
                </select></p>
            </div>
            <p class ="inscription">Je n'ai pas de <span>compte</span>.Je m'en <span><a href="inscription_vue.php">crée</a></span> un.</p>
            <div align="center" class = "bouton"><input type="button" name="se_connecter" value = "se connecter" id = "button_co"></div>
            <div align = "center" class = "feedback_co" id = "message_co"><p></p></div>
        </form>
    <script src="doc_connection.js"> </script>  
</body>
    
</html>