var vote_en_cours = document.getElementById("vote_en_cours");
var vote_termine = document.getElementById("vote_termine");
var email = document.getElementById("email").getAttribute("data_email");
//console.log(email);

function vote(){
    vote_en_cours.style.display = "none";
    vote_termine.style.display = "none";
    console.log(email);
    $.ajax ({
       method:"POST",
       dataType:"json",
       url : "traitement4.php",
       data:{"email":email}
    }).done(function(retour){
        if(retour.reponse == '<h2 id= "no_table">Vous n avez pas de vote en cours actuellement.</h2><div align = "center"><input type = button value = "OK" id = "ok"></div>'){
            console.log(retour.reponse);
        var liste = document.createElement("div");
        liste.innerHTML=retour.reponse;
        document.body.appendChild(liste);
        var style = document.createElement("style");
        style.innerHTML ='h2 {text-align: center;margin-bottom: 20px;} table{ text-align : center; margin-bottom : 20px; align : center;}  #ok {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; }';
        document.body.appendChild(style);
        var tab = document.getElementById("liste_scrutin");
        document.getElementById("ok").addEventListener('click',function(){
            window.location.href = "votant_acceuil_vue.php?email="+email;
        })
            
    }else{
        console.log(retour.reponse);
        var liste = document.createElement("div");
        liste.innerHTML=retour.reponse;
        document.body.appendChild(liste);
        var style = document.createElement("style");
        style.innerHTML ='h2 {text-align: center;margin-bottom: 20px;} table{ text-align : center; margin-bottom : 20px; align : center;}  #ok {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; }';
        document.body.appendChild(style);
        var tab = document.getElementById("liste_scrutin");
        document.getElementById("ok").addEventListener('click',function(){
            window.location.href = "votant_acceuil_vue.php?email="+email;
        })
            tab.addEventListener('click', function(event) {
            var target = event.target;
            if(target.tagName === 'INPUT' && target.type === 'button') {
                var ligne = target.closest('tr');
                var titreCellule = ligne.querySelector('#titre');
                var titre = titreCellule ? titreCellule.textContent.trim() : '';
                //console.log(titre);
                //console.log(email);
                $.ajax({
                    method: "GET",
                    dataType: "json",
                    url: "traitement5.php",
                    data: {"titre": titre, "email": email }
                }).done(function(retour5){
                    var nb_proc = retour5.nb_proc;
                    console.log(email);
                    console.log(retour5.reponse);
                    console.log(retour5.nb_proc);
                    document.getElementById("table_vote").style.display = "none";
                    document.getElementById("titre").style.display = "none";
                    document.getElementById("ok").style.display = "none";
                        var select = document.createElement("div");
                        select.innerHTML = retour5.reponse;
                        var style_select = document.createElement("style");
                        style_select.innerHTML ='h2 {text-align: center;margin-bottom: 20px;} select { text-align : center; margin-bottom : 20px; align : center;}  #transmis {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; }';
                        document.body.appendChild(select);
                        document.body.appendChild(style_select);
                        document.querySelector("#transmis").addEventListener("click", function(){
                            if(nb_proc == 0){
                                $.ajax ({
                                    method:"POST",
                                    dataType:"json",
                                    url : "traitement6.php",
                                    data:{"choix": document.getElementById("selectVote").value, "titre":titre}
                                }).done(function(){
                                document.getElementById("vote_select").style.display ="none";
                                document.getElementById("titre_select").style.display ="none";
                                var finish = document.createElement("div");
                                finish.innerHTML = '<div align=center><h2>Merci pour votre vote :) </h2></div>';
                                document.body.appendChild(finish);
                                })
                                $.ajax ({
                                    method:"POST",
                                    dataType:"json",
                                    url : "traitement7.php",
                                    data:{"titre":titre,"email":email}
                                 }).done(function(retour7){
                                    console.log(retour7.message);
                                 })
        
                            }else{
                            $.ajax ({
                                method:"POST",
                                dataType:"json",
                                url : "traitement6.php",
                                data:{"choix": document.getElementById("selectVote").value, "titre":titre}
                            }).done(function(reponse6){
                                console.log(reponse6.message);
                                var mess = document.createElement("div");
                                mess.innerHTML = '<div align=center><h2>Vous avez encore '+nb_proc+' procuration </h2></div>';
                                document.body.appendChild(mess);
                                setTimeout(() =>(
                                    mess.style.display = "none"
                                    ),3000);
                                nb_proc = nb_proc-1;

                            });

                           }
                           
                      });
                    
                     
                });
            }
        })
    }  

    })


}



function votant_archive(){
    vote_en_cours.style.display = "none";
    vote_termine.style.display = "none";
    $.ajax ({
        method:"POST",
        dataType:"json",
        url : "traitement8.php",
        data:{"email":email}
     }).done(function(retour8){
        console.log(retour8.reponse);
        var liste_archive = document.createElement("div");
        liste_archive.innerHTML=retour8.reponse;
        document.body.appendChild(liste_archive);
        var style_archiv = document.createElement("style");
        style_archiv.innerHTML ='h2 {text-align: center;margin-bottom: 20px;} table{ text-align : center; margin-bottom : 20px; align : center;}  #ok_archive {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; }';
        document.body.appendChild(style_archiv);
        document.getElementById("ok_archive").addEventListener('click',function(){
            window.location.href = "votant_acceuil_vue.php?email="+email;
        })
        var tab_archive = document.getElementById("liste_vote_termine");
        tab_archive.addEventListener('click', function(event){
            var target = event.target;
            if(target.tagName === 'INPUT' && target.type === 'button') {
                var ligne = target.closest('tr');
                var titreCellule = ligne.querySelector('#titre_archive');
                var titre_archive = titreCellule ? titreCellule.textContent.trim() : '';
                console.log(titre_archive);
                $.ajax({
                    method: "POST",
                    dataType: "json",
                    url: "traitement9.php",
                    data: {"titre": titre_archive}
                }).done(function(retour9){
                    console.log(retour9.reponse);
                    document.getElementById("table_vote_archive").style.display="none";
                    document.getElementById("titre_archive").style.display="none";
                    document.getElementById("ok_archive").style.display="none";
                    var liste_res = document.createElement("div");
                    liste_res.innerHTML=retour9.reponse;
                    document.body.appendChild(liste_res);
                    var style_res = document.createElement("style");
                    style_res.innerHTML ='h2 {text-align: center;margin-bottom: 20px;} table{ text-align : center; margin-bottom : 20px; align : center;}  #ok_res {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; }';
                    document.body.appendChild(style_res);    
                    document.getElementById("ok_res").addEventListener('click',function(){
                        window.location.href = "votant_acceuil_vue.php?email="+email;
                    })     
                 })

            }

        })


     })

}

vote_en_cours.addEventListener('click',vote);
vote_termine.addEventListener('click',votant_archive);