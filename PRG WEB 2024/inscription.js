function traitement_inscription(){
    var inputNom = document.querySelector('#t1');
    var inputPrenom = document.querySelector('#t2');
    var inputEmail = document.querySelector("#t3");
    var inputPassword = document.querySelector('#t4');
    var inputRePassword = document.querySelector('#t5');
    var selectType = document.querySelector('#s1');
    var feedback = document.querySelector('#message');
    if(inputNom.value.length < 1 ||inputPrenom.value.length < 1 || inputEmail.value.length < 1 || inputPassword.value.length < 1 || inputRePassword.value.length < 1 ){
        feedback.innerText = "Remplissez tous les champs s'il vous plaît";
        feedback.style.display="block";
        setTimeout(() =>(
            feedback.style.display = "none"
        ),3000);
        return
    }
    if(inputPassword.value != inputRePassword.value){
        feedback.innerText = "Les mots de passe ne sont pas conforme";
        feedback.style.display="block";
        setTimeout(() =>(
            feedback.style.display = "none"
        ),3000);
        return
    }
    var user = {"nom": inputNom.value,"prenom":inputPrenom.value , "email": inputEmail.value,"mot_de_passe":inputRePassword.value,"type":selectType.value};
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "inscription_controlleur.php",
        data: {
            "nom":user.nom,
            "prenom":user.prenom,
            "email":user.email,
            "mot_de_passe":user.mot_de_passe,
            "type":user.type
        }
    }).done(function(reponse){
        console.log(reponse.message)
        if(reponse.message=="succes"){
            window.location.href="connection_vue.php";
        }else{
        feedback.innerText = "Votre compte existe déjà veuillez vous connecter";
        feedback.style.display="block";
        setTimeout(() =>(
            feedback.style.display = "none"
        ),3000);
        return
        }
    })

}

var inscrire = document.getElementById("first_button");
inscrire.addEventListener('click',traitement_inscription);
