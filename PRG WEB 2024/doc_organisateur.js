var nouveau_scrutin = document.getElementById("b1");
var scrutin_archives = document.getElementById("b2");
var vote = document.getElementById("b3");
var nouv_scrutin = document.getElementById("d1");
var ex_scrutin = document.getElementById("d2");
var mes_votes = document.getElementById("d3");
var nom = document.getElementById("nom").getAttribute("data_nom");
var email = document.getElementById("nom").getAttribute("data_email");
//console.log(email);

//la fonction pour récuperer l'email et le nombre de procuration de la personne dans un tableau
function recup_proc(tab_id){
     var tab = document.getElementById(tab_id);
     var resultat = [];
     for (var i = 1; i < tab.rows.length; i++) {
     var ligne = tab.rows[i];
     var emailCellule = ligne.querySelector('#email');
     var email = emailCellule ? emailCellule.textContent.trim() : '';
     var inputProcuration = ligne.querySelector('input[type="number"]');
     var nombre_Procuration = inputProcuration ? parseInt(inputProcuration.value) : 0;
     resultat.push({
          email: email,
          nombre_procuration: nombre_Procuration
      });

     }
     return resultat;

}



function scrutin(){
    nouv_scrutin.style.display = "none";
    ex_scrutin.style.display = "none";
    mes_votes.style.display = "none";
    //requette ajax qui va permettre à php de renvoyer le code html pour la creation de scrutin
    $.ajax ({
       method:"POST",
       dataType:"json",
       url : "organisateur_controlleur.php",
       data:{"action":nouveau_scrutin.value}
    }).done(function(retour){
        console.log(retour.reponse);
        //ajout du formulaire retourné par php
        var formulaire_scrutin = document.createElement("div");
        formulaire_scrutin.innerHTML = retour.reponse;
        formulaire_scrutin.style.alignItems = "center";
        document.body.appendChild(formulaire_scrutin);
        
        var style_form = document.createElement("style");
        style_form.innerHTML=retour.style;
        document.body.appendChild(style_form);

        var terminer = document.getElementById("fini");
        //requette ajax qui va permettre à php de renvoyer le code html pour le choix du groupe auxquels le vote est destiné
        terminer.addEventListener('click',function(){
        $.ajax ({
            method:"POST",
            dataType:"json",
            url : "traitement1.php",
            data:{
                 "Nom_organisateur": nom,
                 "titre":document.getElementById("title").value,
                 "question": document.getElementById("Q1").value,
                 "choix1":document.getElementById("R1").value,
                 "choix2": document.getElementById("R2").value,
                 "choix3":document.getElementById("R3").value,
                }
        }).done(function(retour2){
          console.log(retour2.message);
          var formulaire_scrutin = document.getElementById("scrutin_form");
          var titre_scrutin = document.getElementById("scrutin_title");
          //j'efface les éléments déjà présent sur la page vu qu'il n'y a pas de rédirection
          formulaire_scrutin.style.display = "none";
          titre_scrutin.style.display = "none";
          terminer.style.display = "none";
          // ajout de la reponse qui est un select avec tout les groupe existant dans mon tableau json
          var choix_listeVotant = document.createElement('div');
          choix_listeVotant.innerHTML= '<h2 id= "consigne">veillez choisir la liste des votants </h2><form id = "select_listeVotant"> <select id = "liste"><option value = "L3_MIAGE">L3 MIAGE</option><option value = "L3_INFO">L3 INFO</option><option value = "PROF_PROG_WEB">Professeur de prog web</option></select> </form> <input type = button value = "choisir" id ="choisir">';
          var style_listeVotant = document.createElement("style");
          style_listeVotant.innerHTML ='h2 {text-align: center;margin-bottom: 20px;} form { text-align : center; margin-bottom : 20px;}  input[type="button"] {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; }'
          console.log(choix_listeVotant);
          console.log(style_listeVotant);
          document.body.appendChild(choix_listeVotant);
          document.body.appendChild(style_listeVotant);
          document.getElementById("choisir").addEventListener('click',function(){
          //envoi de la requette ajax qui va permettre à l'organisateur d'ajouter une procuration 
          // a chaque personne dans la liste qu'il a choisi
           $.ajax({
            method:"POST",
            dataType:"json",
            url : "traitement2.php",
            data : {
                 "choix" : document.getElementById("liste").value
            }
          }).done(function(retour3){
               console.log(retour3.reponse3);
               var choix_liste = document.getElementById("select_listeVotant");
               var titre_liste  = document.getElementById("consigne");
               choix_liste.style.display ="none";
               titre_liste.style.display ="none";
               document.getElementById("choisir").style.display = "none";
               var liste_choisir = document.createElement("div");
               liste_choisir.innerHTML = retour3.reponse3;
               document.body.appendChild(liste_choisir);
               var style_listeChoisir = document.createElement("style")
               style_listeChoisir.innerHTML ='h2 {text-align: center;margin-bottom: 20px;} table{ text-align : center; margin-bottom : 20px;}  input[type="button"] {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; }';
               document.body.appendChild(style_listeChoisir);
               document.getElementById("ok").addEventListener('click',function(){
                    console.log(recup_proc("liste_choisi"));
                    $.ajax({ //requtte qui va envoyer la liste contenant l'email et le nombre de procuration de chaque email
                         method:"POST",
                         dataType:"json",
                         url : "traitement3.php",
                         data :{ 
                              "email_proc" : recup_proc("liste_choisi"),
                              "choix": document.getElementById("liste").value,
                              "titre": document.getElementById("title").value
                               }
                       }).done(function(retour4){
                         console.log(retour4);
                         document.getElementById("ok").style.display="none";
                         document.getElementById("liste_choisi").style.display="none";
                         document.getElementById("ajout_title").style.display = "none";
                         
                         var msg_fin = document.createElement("div");
                         msg_fin.innerHTML= "<h1> le vote a bien été créer,merci !</h1>"; //fin de création du vote
                         document.body.appendChild(msg_fin);
               
                    })
          
                    
               
               })
          })

     });
        });

   });


});

}

//fonction pour voir les scrutins archivés
function scrutin_archive(){
    nouv_scrutin.style.display = "none";
    ex_scrutin.style.display = "none";
    mes_votes.style.display = "none";
    $.ajax ({ // requette ajax qui va retourner la liste des crutins qui ont pour statut terminé dans mon tableau JSON
       method:"POST",
       dataType:"json",
       url : "traitement10.php",
       data:{"nom":nom,"email":email}
    }).done(function(reponse10){
        console.log(reponse10.liste_vote); //la liste des votes archiés auxquels il peut voter
        console.log(reponse10.liste_vote_org);//la liste des vots archivés qu'il a organisé
        var liste_vote = document.createElement("div");
        var liste_vote_org = document.createElement("div");
        if(reponse10.liste_vote == '<h2 id= "no_table_archive_org">Vous n avez pas de vote terminé.</h2>'){ //on vérifie si il n'y a pas de vote archivé
          liste_vote.innerHTML=reponse10.liste_vote;
          document.body.appendChild(liste_vote);
          liste_vote_org.innerHTML = reponse10.liste_vote_org;
          document.body.appendChild(liste_vote_org);
        }else{
          liste_vote.innerHTML=reponse10.liste_vote;
          liste_vote_org.innerHTML = reponse10.liste_vote_org;
          document.body.appendChild(liste_vote);
          document.body.appendChild(liste_vote_org);
          var style_liste_vote = document.createElement("style")
          style_liste_vote.innerHTML ='h2 {text-align: center;margin-bottom: 20px;margin-bottom:20px} table{ text-align : center; margin-bottom : 20px;}  #ok_archive_org_termine {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; #ok_archive_org_{padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px;}';
          document.body.appendChild(style_liste_vote);
          document.getElementById("ok_archive_org").addEventListener('click',function(){
          window.location.href = "organisateur_acceuil_vue.php?nom="+nom+"&email="+email;
       })
       var tab_archive = document.getElementById("liste_vote_org");
        tab_archive.addEventListener('click', function(event){
            var target = event.target;
            if(target.tagName === 'INPUT' && target.type === 'button') {
                var ligne = target.closest('tr');
                var titreCellule = ligne.querySelector('#titre_archive_org');
                var titre_archive = titreCellule ? titreCellule.textContent.trim() : '';
                console.log(titre_archive);
                $.ajax({
                    method: "POST",
                    dataType: "json",
                    url: "traitement9.php",
                    data: {"titre": titre_archive}
                }).done(function(retour){
                    console.log(retour.reponse);
                    document.getElementById("table_vote_archive_org").style.display="none";
                    document.getElementById("no_table_archive_org").style.display="none";
                    document.body.appendChild(style_res);
                    document.getElementById("ok_archive_org").style.display="none";
                    //document.getElementById("no_table_archive_org_termine").style.display="none";
                    var style_res = document.createElement("style");
                    style_res.innerHTML ='h2 {text-align: center;margin-bottom: 20px;} table{ text-align : center; margin-bottom : 20px; align : center;}  #ok_res {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; }';
                    console.log(retour.reponse);   
                    var liste_res = document.createElement("div");
                    liste_res.innerHTML=retour.reponse;
                    document.body.appendChild(liste_res); 
                    document.getElementById("ok_res").addEventListener('click',function(){
                        window.location.href = "organisateur_acceuil_vue.php?nom="+nom+"&email="+email;
                    }) 
                })

          }
       })


     }
     if(reponse10.liste_vote_org ==='<h2 id= "no_table_archive_org_termine">Vous n avez pas de scrutin Terminé.</h2>'){
          liste_vote.innerHTML=reponse10.liste_vote;
          document.body.appendChild(liste_vote); 
          liste_vote_org.innerHTML = reponse10.liste_vote_org;
          document.body.appendChild(liste_vote_org);
     }else{
          liste_vote.innerHTML=reponse10.liste_vote;
          liste_vote_org.innerHTML = reponse10.liste_vote_org;
          document.body.appendChild(liste_vote);
          document.body.appendChild(liste_vote_org);
          var style_liste_vote = document.createElement("style")
          style_liste_vote.innerHTML ='h2 {text-align: center;margin-bottom: 20px;margin-bottom:20px} table{ text-align : center; margin-bottom : 20px;}  #ok_archive_org_termine {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; #ok_archive_org_{padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px;}';
          document.body.appendChild(style_liste_vote);
          document.getElementById("ok_archive_org_termine").addEventListener('click',function(){
          window.location.href = "organisateur_acceuil_vue.php?nom="+nom+"&email="+email;
       });
       var tab_archive = document.getElementById("liste_vote_org_termine");
        tab_archive.addEventListener('click', function(event){
            var target = event.target;
            if(target.tagName === 'INPUT' && target.type === 'button') {
                var ligne = target.closest('tr');
                var titreCellule = ligne.querySelector('#titre_archive_org_termine');
                var titre_archive_termine = titreCellule ? titreCellule.textContent.trim() : '';
                console.log(titre_archive_termine);
                $.ajax({
                    method: "POST",
                    dataType: "json",
                    url: "traitement9.php",
                    data: {"titre": titre_archive_termine}
                }).done(function(retour){
                    document.getElementById("table_vote_archive_org_termine").style.display="none";
                    document.getElementById("titre_archive_org_termine").style.display="none";
                    document.getElementById("ok_archive_org_termine").style.display="none";
                   // document.getElementById("no_table_archive_org").style.display="none";
                    var style_res = document.createElement("style");
                    style_res.innerHTML ='h2 {text-align: center;margin-bottom: 20px;} table{ text-align : center; margin-bottom : 20px; align : center;}  #ok_res {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; }';
                    document.body.appendChild(style_res);
                    console.log(retour.reponse);   
                    var liste_res = document.createElement("div");
                    liste_res.innerHTML=retour.reponse;
                    document.body.appendChild(liste_res); 
                    document.getElementById("ok_res").addEventListener('click',function(){
                        window.location.href = "organisateur_acceuil_vue.php?nom="+nom+"&email="+email;
                    }) 
                })
               }
           })

          }
     })

    
}

//fonction qui permet de voir les votes en cours
function voteEnCours(){
     nouv_scrutin.style.display = "none";
     ex_scrutin.style.display = "none";
     mes_votes.style.display = "none";
     $.ajax ({
          method:"POST",
          dataType:"json",
          url : "traitement11.php",
          data:{"email":email,"nom":nom}
       }).done(function(retour){
          console.log(retour.liste_encours);
          console.log(retour.liste_org_encours);
          var liste_encours = document.createElement("div");
          liste_encours.innerHTML=retour.liste_encours;
          var liste_org_encours = document.createElement("div");
          liste_org_encours.innerHTML=retour.liste_org_encours;
          if(retour.liste_encours === '<h2 id= "no_table_encours">Vous n avez pas de vote en cours actuellement.</h2>'){
          document.body.appendChild(liste_encours);
          }else{
               document.body.appendChild(liste_encours);
               document.body.appendChild(liste_org_encours);
               var style_liste_vote = document.createElement("style")
               style_liste_vote.innerHTML ='h2 {text-align: center;margin-bottom: 20px;margin-bottom:20px} table{ text-align : center; margin-bottom : 20px;}  #ok_archive_org_termine {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; #ok_archive_org_{padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px;}';
               document.body.appendChild(style_liste_vote);
               document.getElementById("ok_encours").addEventListener('click',function(){
               window.location.href = "organisateur_acceuil_vue.php?nom="+nom+"&email="+email;
            }) ;
              
              var tab = document.getElementById("liste_scrutin_encours");
              tab.addEventListener('click', function(event) {
               var target = event.target;
               if(target.tagName === 'INPUT' && target.type === 'button') {
                   var ligne = target.closest('tr');
                   var titreCellule = ligne.querySelector('#titre_encours');
                   var titre_encours = titreCellule ? titreCellule.textContent.trim() : '';
                   $.ajax({
                    method: "GET",
                    dataType: "json",
                    url: "traitement5.php",
                    data: {"titre": titre_encours, "email": email }
                }).done(function(retour){
                    console.log(retour.reponse);
                    var nb_proc = retour.nb_proc;
                    document.getElementById("table_vote_encours").style.display = "none";
                    document.getElementById("titre_encours").style.display = "none";
                    document.getElementById("ok_encours").style.display = "none";
                    var select = document.createElement("div");
                        select.innerHTML = retour.reponse;
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
                                  data:{"choix": document.getElementById("selectVote").value, "titre":titre_encours}
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
                                   data:{"titre":titre_encours,"email":email}
                                }).done(function(retour7){
                                   console.log(retour7.message);
                                })
                         }else{
                              $.ajax ({
                                   method:"POST",
                                   dataType:"json",
                                   url : "traitement6.php",
                                   data:{"choix": document.getElementById("selectVote").value, "titre":titre_encours}
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

                        })
                })
                   

               }
           }) 
          }
          
          if(retour.liste_org_encours === '<h2 id= "no_table">Vous n avez pas de vote organisés en cours actuellement.</h2>'){
               document.body.appendChild(liste_org_encours);
               }else{
                    document.body.appendChild(liste_encours);
                    document.body.appendChild(liste_org_encours);
                    var style_liste_vote = document.createElement("style")
                    style_liste_vote.innerHTML ='h2 {text-align: center;margin-bottom: 20px;margin-bottom:20px} table{ text-align : center; margin-bottom : 20px;}  #ok_archive_org_termine {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; #ok_archive_org_{padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px;}';
                    document.body.appendChild(style_liste_vote);
                    document.getElementById("ok_org_encours").addEventListener('click',function(){
                    window.location.href = "organisateur_acceuil_vue.php?nom="+nom+"&email="+email;
                 }) ;
                   
                   var tab = document.getElementById("liste_scrutin_org_encours");
                   tab.addEventListener('click', function(event) {
                    var target = event.target;
                    if(target.tagName === 'INPUT' && target.type === 'button') {
                         var id = event.target.id;
                         switch(id){
                              case 'vote_org_encours':
                                   var ligne = target.closest('tr');
                                   var titreCellule = ligne.querySelector('#titre_org_encours');
                                   var titre_org_encours = titreCellule ? titreCellule.textContent.trim() : '';
                                   $.ajax({
                                    method: "GET",
                                    dataType: "json",
                                    url: "traitement5.php",
                                    data: {"titre": titre_org_encours, "email": email }
                                }).done(function(retour5){
                                   console.log(retour5.reponse);
                                   var nb_proc_org = retour5.nb_proc;
                                   document.getElementById("table_vote_org_encours").style.display = "none";
                                   document.getElementById("titre_org_encours").style.display = "none";
                                   document.getElementById("ok_org_encours").style.display = "none";
                                   var select = document.createElement("div");
                                   var select = document.createElement("div");
                                   select.innerHTML = retour5.reponse;
                                   var style_select = document.createElement("style");
                                   style_select.innerHTML ='h2 {text-align: center;margin-bottom: 20px;} select { text-align : center; margin-bottom : 20px; align : center;}  #transmis {padding: 15px ;border:none;border-radius: 5px;font-size: 15px;background-color:#eb7371;outline: none;cursor: pointer;margin-bottom : 20px margin-top:50px; }';
                                   document.body.appendChild(select);
                                   document.body.appendChild(style_select);
                                   document.querySelector("#transmis").addEventListener("click", function(){
                                        if(nb_proc_org == 0){
                                             $.ajax ({
                                                 method:"POST",
                                                 dataType:"json",
                                                 url : "traitement6.php",
                                                 data:{"choix": document.getElementById("selectVote").value, "titre":titre_org_encours}
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
                                                  data:{"titre":titre_org_encours,"email":email}
                                               }).done(function(retour7){
                                                  console.log(retour7.message);
                                               })

                                        }else{
                                             $.ajax ({
                                                  method:"POST",
                                                  dataType:"json",
                                                  url : "traitement6.php",
                                                  data:{"choix": document.getElementById("selectVote").value, "titre":titre_org_encours}
                                             }).done(function(reponse6){
                                                  console.log(reponse6.message);
                                                  var mess = document.createElement("div");
                                                  mess.innerHTML = '<div align=center><h2>Vous avez encore '+nb_proc_org+' procuration </h2></div>';
                                                  document.body.appendChild(mess);
                                                  setTimeout(() =>(
                                                   mess.style.display = "none"
                                                   ),3000);
                                               nb_proc_org = nb_proc_org-1;
                                             });
               
                                        }


                                   })

                                })
                                break;
                              
                              case 'arret_vote':
                                   var ligne = target.closest('tr');
                                   var titreCellule = ligne.querySelector('#titre_org_encours');
                                   var titre_org_encours = titreCellule ? titreCellule.textContent.trim() : '';
                                   document.getElementById("table_vote_org_encours").style.display = "none";
                                   document.getElementById("titre_org_encours").style.display = "none";
                                   document.getElementById("ok_org_encours").style.display = "none";
                                   $.ajax ({
                                        method:"POST",
                                        dataType:"json",
                                        url : "traitement12.php",
                                        data:{"titre":titre_org_encours}
                                   }).done(function(retour10){
                                        console.log(retour10.message);
                                        var finish_termine = document.createElement("div");
                                        finish_termine.innerHTML = '<div align=center><h2>Le vote a été arrêté avec succès vous pouvez consulter les résultat dans la rubrique scrutin archivés  </h2></div>';
                                        document.body.appendChild(finish_termine);
                                             
                                   })
                              break;

                         }
                        
                                        
                        
     
                    }
                }) 
               
               
               
               }


           



     })
}






nouveau_scrutin.addEventListener('click',scrutin);
ex_scrutin.addEventListener('click',scrutin_archive);
mes_votes.addEventListener('click',voteEnCours);