function Chercher(element_a_chercher, data_json){
    var trouver = false;
    for(var i = 0;i<data_json.length;i++){
        if(data_json[i].email === element_a_chercher){
            trouver = true;
            break;
        }
    }
    
    return trouver;
}

function traitement_connection(){
    var inputEmailCo = document.querySelector("#email_co");
    var inputMotDePasseCo = document.querySelector("#mdp_co");
    var inputSelect = document.querySelector('#s2');
    var feedback_co = document.querySelector("#message_co");

    if (inputEmailCo.value.length < 1 || inputMotDePasseCo.value.length < 1) {
        feedback_co.innerText = "Remplissez tous les champs s'il vous plaît";
        feedback_co.style.display = "block";
        setTimeout(() => (
            feedback_co.style.display = "none"
        ), 3000);
        return;
    }

    var user = {
        "email": inputEmailCo.value,
        "mot_de_passe": inputMotDePasseCo.value,
        "type": inputSelect.value,
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "controlleur_connection.php",
        data: {
            "mot_de_passe":user.mot_de_passe,
            "type":user.type,
            "email":user.email
        }
    }).done(function(reponse){
        console.log(reponse.reponse);
        if(reponse.reponse == "succes" && user.type == "voter"){
            window.location.href = "votant_acceuil_vue.php?email="+user.email;
        }else if(user.type == "organiser"){
            window.location.href = "organisateur_acceuil_vue.php?email="+user.email+"&nom="+reponse.nom;
        }else{
            feedback_co.innerText = "Email ou Mot de passe incorrect";
        feedback_co.style.display = "block";
        setTimeout(() => (
            feedback_co.style.display = "none"
        ), 3000);
        return;
        }
    })

}



button_connection = document.querySelector("#button_co");
button_connection.addEventListener('click',traitement_connection); 
