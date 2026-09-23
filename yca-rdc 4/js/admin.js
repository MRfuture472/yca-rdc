/* =====================================================================
   YCA RDC - Administration (SaaS dashboard, prototype cote client)
   NOTE SECURITE : l'authentification ci-dessous est une DEMO cote client.
   En production, remplacer par une authentification serveur (hash de mot
   de passe, sessions/JWT, HTTPS, gestion des roles et permissions).
   ===================================================================== */
(function(){
  'use strict';
  var S=window.YCA,E=window.esc;
  var SESS='yca_admin_session';

  // ---------------- Auth (DEMO) ----------------
  window.doLogin=function(e){e.preventDefault();
    var u=document.getElementById('u').value.trim(),p=document.getElementById('p').value;
    if(u==='henock'&&p==='100722'){sessionStorage.setItem(SESS,'1');boot();}
    else document.getElementById('loginErr').classList.remove('hide');
    return false;};
  window.logout=function(){sessionStorage.removeItem(SESS);location.reload();};

  // ---------------- Menu (cf. cahier des charges) ----------------
  var MENU=[
    ['dashboard','📊','Dashboard'],['content','🎨','Contenu du site'],['users','👥','Utilisateurs'],
    ['creators','🎥','Créateurs'],['courses','🎓','Formations'],['students','📚','Étudiants'],
    ['articles','📰','Articles / Média'],['opps','💼','Opportunités'],['camps','🤝','Campagnes'],
    ['brands','🏷️','Marques'],['events','📅','Événements'],['community','💬','Communauté'],
    ['payments','💳','Paiements'],['contracts','📄','Contrats'],['notifs','🔔','Notifications'],
    ['messages','✉️','Messages'],['stats','📈','Statistiques'],['seo','🔍','SEO'],
    ['pages','📃','Pages légales'],['roles','🔐','Rôles & permissions'],['log','📝','Journal d’activité'],
    ['settings','⚙️','Paramètres']
  ];
  var cur='dashboard';

  function boot(){
    document.getElementById('login').classList.add('hide');
    document.getElementById('app').classList.remove('hide');
    document.getElementById('menu').innerHTML=MENU.map(function(m){return '<a data-k="'+m[0]+'" onclick="nav(\''+m[0]+'\')"><span>'+m[1]+'</span> '+m[2]+'</a>';}).join('');
    tick();setInterval(tick,1000);
    nav('dashboard');
  }
  function tick(){var c=document.getElementById('clock');if(c)c.textContent=new Date().toLocaleString('fr-FR');}

  window.nav=function(k){cur=k;
    document.querySelectorAll('#menu a').forEach(function(a){a.classList.toggle('active',a.getAttribute('data-k')===k);});
    var t=(MENU.filter(function(m){return m[0]===k;})[0]||['','','']);
    document.getElementById('pageTitle').textContent=t[2];
    log('Consultation : '+t[2]);
    render(k);
  };

  // ---------------- Journal d'activite ----------------
  function log(action){var l=S.get('activityLog')||[];l.unshift({action:action,at:new Date().toLocaleString('fr-FR')});if(l.length>100)l=l.slice(0,100);S.set('activityLog',l);}

  window.__log=log;window.__render=function(){render(cur);};

  // Auto-login si session active
  if(sessionStorage.getItem(SESS))boot();

  // expose render (defini dans admin-render.js charge ensuite via meme fichier)
  window.__cur=function(){return cur;};

  // ================= RENDER =================
  var V=function(){return document.getElementById('view');};

  // Definitions de champs pour l'editeur generique
  var FIELDS={
    creators:[['name','Nom'],['channel','Chaîne'],['photo','Photo (URL)'],['city','Ville'],['province','Province'],['niche','Niche'],['subs','Abonnés'],['videos','Vidéos','number'],['status','Statut','select:membre,partenaire,verifie'],['size','Taille','select:petite,moyenne,grande'],['type','Type contenu'],['trend','Tendance de la semaine','select:aucune,hausse,stable,nouveau'],['featured','Mettre en avant','check'],['order','Ordre','number'],['youtube','YouTube'],['tiktok','TikTok'],['instagram','Instagram'],['facebook','Facebook'],['pro','Contact pro'],['desc','Description','area'],['public','Public','check']],
    courses:[['title','Titre'],['cat','Catégorie'],['thumb','Miniature (URL)'],['trainer','Formateur'],['level','Niveau'],['duration','Durée'],['price','Prix ($)','number'],['type','Type','select:gratuite,payante,premium'],['period','Période','select:jour,semaine,challenge,permanent'],['videoUrl','Lien vidéo'],['paymentUrl','Lien de paiement'],['accessUrl','Lien d’accès'],['modules','Modules','number'],['desc','Description','area']],
    opportunities:[['title','Titre'],['type','Type'],['company','Entreprise'],['deadline','Date limite','date'],['pay','Rémunération'],['criteria','Critères'],['need','Nb recherchés','number'],['desc','Description','area']],
    campaigns:[['name','Nom'],['brand','Marque'],['budget','Budget'],['objectives','Objectifs'],['creators','Nb créateurs','number'],['deliverables','Livrables'],['start','Début','date'],['end','Fin','date'],['platforms','Plateformes'],['status','Statut','select:Brouillon,Ouverte,En cours,Terminée,Annulée']],
    events:[['title','Titre'],['type','Type'],['img','Image (URL)'],['date','Date','date'],['time','Heure'],['place','Lieu / lien'],['seats','Places','number'],['desc','Description','area']],
    articles:[['title','Titre'],['cat','Catégorie'],['author','Auteur'],['date','Date','date'],['img','Image (URL)'],['excerpt','Extrait','area'],['body','Contenu','area']]
  };
  var COLS={
    creators:[['name','Nom'],['channel','Chaîne'],['city','Ville'],['status','Statut']],
    courses:[['title','Titre'],['cat','Catégorie'],['type','Type'],['price','Prix']],
    opportunities:[['title','Titre'],['type','Type'],['company','Entreprise'],['deadline','Échéance']],
    campaigns:[['name','Nom'],['brand','Marque'],['budget','Budget'],['status','Statut']],
    events:[['title','Titre'],['type','Type'],['date','Date'],['place','Lieu']],
    articles:[['title','Titre'],['cat','Catégorie'],['author','Auteur'],['date','Date']]
  };
  var editing=null; // {coll,id}

  function crud(coll,titleAdd){
    var items=S.get(coll)||[],cols=COLS[coll];
    var head=cols.map(function(c){return '<th>'+c[1]+'</th>';}).join('')+'<th></th>';
    var rows=items.map(function(it){
      var tds=cols.map(function(c){return '<td>'+E(it[c[0]])+'</td>';}).join('');
      return '<tr>'+tds+'<td><button class="btn btn-light btn-sm" onclick="aEdit(\''+coll+'\',\''+it.id+'\')">✎</button> <button class="btn btn-ghost btn-sm" onclick="aDel(\''+coll+'\',\''+it.id+'\')">✕</button></td></tr>';
    }).join('');
    return '<div class="flex between wrap gap mb"><p class="muted">'+items.length+' élément(s)</p><button class="btn btn-primary btn-sm" onclick="aEdit(\''+coll+'\')">+ '+titleAdd+'</button></div>'
      +'<div style="overflow-x:auto"><table class="data-table"><tr>'+head+'</tr>'+rows+'</table></div>'
      +'<div id="editor"></div>';
  }

  window.aEdit=function(coll,id){
    editing={coll:coll,id:id||null};
    var it=id?S.find(coll,id):{};
    var fs=FIELDS[coll].map(function(f){
      var key=f[0],lbl=f[1],type=f[2]||'text',val=it[key]==null?'':it[key];
      if(type==='area')return '<div class="field"><label>'+lbl+'</label><textarea class="textarea" data-f="'+key+'">'+E(val)+'</textarea></div>';
      if(type==='check')return '<div class="field"><label class="check"><input type="checkbox" data-f="'+key+'" '+(val?'checked':'')+'> '+lbl+'</label></div>';
      if(type.indexOf('select:')===0){var opts=type.slice(7).split(',').map(function(o){return '<option '+(val===o?'selected':'')+'>'+o+'</option>';}).join('');return '<div class="field"><label>'+lbl+'</label><select class="select" data-f="'+key+'">'+opts+'</select></div>';}
      return '<div class="field"><label>'+lbl+'</label><input class="input" type="'+type+'" data-f="'+key+'" value="'+E(val)+'"></div>';
    }).join('');
    document.getElementById('editor').innerHTML='<div class="panel" style="margin-top:20px"><h3 class="mb">'+(id?'Modifier':'Ajouter')+'</h3>'+fs+'<div class="flex gap"><button class="btn btn-primary" onclick="aSave()">Enregistrer</button><button class="btn btn-ghost" onclick="document.getElementById(\'editor\').innerHTML=\'\'">Annuler</button></div></div>';
    document.getElementById('editor').scrollIntoView({behavior:'smooth'});
  };
  window.aSave=function(){
    var obj={};document.querySelectorAll('#editor [data-f]').forEach(function(el){var k=el.getAttribute('data-f');obj[k]=el.type==='checkbox'?el.checked:el.value;});
    if(editing.id){S.update(editing.coll,editing.id,obj);log('Modification '+editing.coll);}
    else{S.add(editing.coll,obj);log('Ajout '+editing.coll);}
    render(cur);
  };
  window.aDel=function(coll,id){if(confirm('Supprimer cet élément ?')){S.remove(coll,id);log('Suppression '+coll);render(cur);}};

  // ---- Boites de reception (lecture seule) ----
  function inbox(coll,cols){
    var items=S.get(coll)||[];
    if(!items.length)return '<div class="panel"><p class="muted">Aucune entrée pour le moment.</p></div>';
    var head=cols.map(function(c){return '<th>'+c[1]+'</th>';}).join('');
    var rows=items.map(function(it){
      var cells=cols.map(function(c){return '<td>'+E(it[c[0]])+'</td>';}).join('');
      var action='';
      if(it.email) action='<td><a class="btn btn-light btn-sm" href="mailto:'+E(it.email)+'?subject='+encodeURIComponent('Réponse — YCA RDC')+'">Répondre</a></td>';
      return '<tr>'+cells+action+'</tr>';
    }).join('');
    var extra=items.some(function(it){return !!it.email;})?'<th>Action</th>':'';
    return '<div style="overflow-x:auto"><table class="data-table"><tr>'+head+extra+'</tr>'+rows+'</table></div>';
  }

  // ---- Editeur de champs texte (contenu du site) ----
  function textField(group,key,label,area){
    var obj=S.get(group)||{},val=obj[key]||'';
    var input=area?'<textarea class="textarea" data-g="'+group+'" data-k="'+key+'">'+E(val)+'</textarea>':'<input class="input" data-g="'+group+'" data-k="'+key+'" value="'+E(val)+'">';
    return '<div class="field"><label>'+label+'</label>'+input+'</div>';
  }
  window.saveText=function(){
    document.querySelectorAll('#view [data-g]').forEach(function(el){var g=el.getAttribute('data-g'),k=el.getAttribute('data-k');var o=S.get(g)||{};o[k]=el.value;S.set(g,o);});
    log('Mise à jour du contenu');alert('Contenu enregistré.');
  };

  function render(k){
    var v=V();
    if(k==='dashboard'){
      var localVisits=0;try{localVisits=parseInt(localStorage.getItem('yca_local_visits')||'0',10);}catch(e){}
      var kpi=[['Membres',S.get('creators').length,'👥'],['Créateurs partenaires',S.get('creators').filter(function(c){return c.status==='partenaire';}).length,'🤝'],['Vérifiés',S.get('creators').filter(function(c){return c.status==='verifie';}).length,'✔️'],['Formations',S.get('courses').length,'🎓'],['Candidatures',S.get('applications').length,'📥'],['Campagnes',S.get('campaigns').length,'🤝'],['Opportunités',S.get('opportunities').length,'💼'],['Événements',S.get('events').length,'📅'],['Articles',S.get('articles').length,'📰'],['Messages',S.get('messages').length,'✉️'],['Demandes marques',S.get('brandRequests').length,'🏷️'],['Newsletter',S.get('newsletter').length,'📧'],['Visites de ce navigateur',localVisits,'👁️']];
      v.innerHTML='<div class="kpi-grid">'+kpi.map(function(x){return '<div class="kpi"><span class="k-ic">'+x[2]+'</span><div class="k-num">'+x[1]+'</div><div class="k-lbl">'+x[0]+'</div></div>';}).join('')+'</div>'
        +'<div class="panel"><h3 class="mb">Dernières candidatures</h3>'+inbox('applications',[['name','Nom'],['channel','Chaîne'],['type','Type'],['date','Date']])+'</div>'
        +'<div class="panel"><h3 class="mb">Dernières demandes de marques</h3>'+inbox('brandRequests',[['company','Entreprise'],['contact','Responsable'],['budget','Budget'],['received','Reçu']])+'</div>';
    }
    else if(k==='content'){
      v.innerHTML='<div class="panel"><h3 class="mb">Identité & Hero</h3>'
        +textField('site','name','Nom du site')+textField('site','short','Nom court')+textField('site','slogan','Slogan')+textField('site','positioning','Positionnement')
        +textField('hero','title','Titre Hero')+textField('hero','subtitle','Sous-titre Hero',true)+textField('hero','cta1','Bouton 1')+textField('hero','cta2','Bouton 2')+textField('hero','image','Image Hero (URL)')
        +'</div><div class="panel"><h3 class="mb">Contact & Indépendance</h3>'
        +textField('site','email','Email')+textField('site','phone','Téléphone')+textField('site','city','Ville')+textField('site','founderName','Fondateur')+textField('site','founderTitle','Titre du fondateur')+textField('site','independence','Mention d’indépendance',true)
        +'</div><div class="panel"><h3 class="mb">Réseaux sociaux</h3>'
        +['youtube','tiktok','facebook','instagram','whatsapp','telegram'].map(function(s){return textField('social',s,s.charAt(0).toUpperCase()+s.slice(1));}).join('')
        +'</div><button class="btn btn-primary" onclick="saveText()">Enregistrer les modifications</button>';
    }
    else if(k==='creators'){var cs=S.get('creators')||[];var current=S.get('creatorOfWeek');v.innerHTML='<div class="panel"><h3 class="mb">Créateur à la une</h3><div class="field"><label>Créateur de la semaine</label><select id="creatorWeek" class="select">'+cs.map(function(c){return '<option value="'+E(c.id)+'" '+(c.id===current?'selected':'')+'>'+E(c.name)+' — '+E(c.channel)+'</option>';}).join('')+'</select></div><button class="btn btn-primary btn-sm" onclick="saveCreatorWeek()">Mettre en avant</button></div>'+crud('creators','Nouveau créateur');}
    else if(k==='courses')v.innerHTML=crud('courses','Nouvelle formation');
    else if(k==='opps')v.innerHTML=crud('opportunities','Nouvelle opportunité');
    else if(k==='camps')v.innerHTML=crud('campaigns','Nouvelle campagne');
    else if(k==='events')v.innerHTML=crud('events','Nouvel événement');
    else if(k==='articles')v.innerHTML=crud('articles','Nouvel article');
    else if(k==='brands')v.innerHTML='<div class="panel"><h3 class="mb">Demandes de campagnes</h3>'+inbox('brandRequests',[['company','Entreprise'],['contact','Responsable'],['email','Email'],['budget','Budget'],['type','Type'],['creators','Créateurs'],['received','Reçu']])+'</div>';
    else if(k==='messages')v.innerHTML='<div class="panel"><h3 class="mb">Messages de contact</h3>'+inbox('messages',[['name','Nom'],['email','Email'],['subject','Sujet'],['message','Message'],['date','Date']])+'</div>';
    else if(k==='students')v.innerHTML='<div class="panel"><h3 class="mb">Étudiants & inscriptions</h3>'+inbox('applications',[['name','Nom'],['type','Type'],['opp','Formation/Év.'],['email','Email'],['date','Date']])+'<p class="form-note">Les inscriptions aux formations et événements apparaissent ici.</p></div>';
    else if(k==='payments')v.innerHTML='<div class="panel"><h3 class="mb">Paiements & transactions</h3>'+inbox('payments',[['item','Produit'],['user','Client'],['amount','Montant'],['status','Statut'],['method','Moyen'],['date','Date']])+'<div class="alert alert-info mt">Architecture prête pour connecter un prestataire de paiement réellement disponible en RDC/international (aucun paiement fictif n’est intégré).</div></div>';
    else if(k==='community')v.innerHTML='<div class="panel"><h3 class="mb">Liens de la communauté</h3>'+['youtube','tiktok','facebook','instagram','whatsapp','telegram'].map(function(s){return textField('social',s,s.charAt(0).toUpperCase()+s.slice(1));}).join('')+'<button class="btn btn-primary" onclick="saveText()">Enregistrer</button></div>';
    else if(k==='seo')v.innerHTML='<div class="panel"><h3 class="mb">SEO global</h3>'+textField('seo','title','Meta title')+textField('seo','description','Meta description',true)+textField('seo','keywords','Mots-clés',true)+'<button class="btn btn-primary" onclick="saveText()">Enregistrer</button><div class="alert alert-info mt">Chaque page génère automatiquement les balises Open Graph, Twitter Card et meta description. Un sitemap.xml et un robots.txt sont fournis.</div></div>';
    else if(k==='pages'){var legal=S.get('legal');v.innerHTML='<div class="panel"><h3 class="mb">Pages légales</h3>'+legal.map(function(l,i){return '<div class="field"><label>'+E(l.title)+'</label><textarea class="textarea" data-legal="'+i+'">'+E(l.body)+'</textarea></div>';}).join('')+'<button class="btn btn-primary" onclick="saveLegal()">Enregistrer</button></div>';}
    else if(k==='roles')v.innerHTML='<div class="panel"><h3 class="mb">Rôles & permissions</h3><table class="data-table"><tr><th>Rôle</th><th>Permissions</th></tr>'+S.get('roles').map(function(r){return '<tr><td><strong>'+E(r.role)+'</strong></td><td>'+E(r.perms)+'</td></tr>';}).join('')+'</table></div>';
    else if(k==='users')v.innerHTML='<div class="panel"><h3 class="mb">Utilisateurs par rôle</h3><table class="data-table"><tr><th>Rôle</th><th>Description</th></tr>'+S.get('roles').map(function(r){return '<tr><td><span class="chip chip-red">'+E(r.role)+'</span></td><td>'+E(r.perms)+'</td></tr>';}).join('')+'</table><p class="form-note">La création de comptes utilisateurs se fera via l’authentification serveur en production.</p></div>';
    else if(k==='notifs')v.innerHTML='<div class="panel"><h3 class="mb">Notifications</h3><p>Le système prévoit des notifications dans le dashboard et par email pour : nouvelles opportunités, campagnes, formations et annonces administratives.</p><div class="divider"></div><p>🔔 '+S.get('applications').length+' candidature(s) à traiter.</p><p>🔔 '+S.get('brandRequests').length+' demande(s) de marque.</p></div>';
    else if(k==='contracts')v.innerHTML='<div class="panel"><h3 class="mb">Contrats</h3><p class="muted">Module de gestion des contrats créateurs / marques (évolutif). Prêt à accueillir signature, statut et commissions.</p></div>';
    else if(k==='stats'){var c=S.get('creators');v.innerHTML='<div class="kpi-grid"><div class="kpi"><div class="k-num">'+c.length+'</div><div class="k-lbl">Créateurs</div></div><div class="kpi"><div class="k-num">'+S.get('newsletter').length+'</div><div class="k-lbl">Abonnés newsletter</div></div><div class="kpi"><div class="k-num">'+S.get('courses').length+'</div><div class="k-lbl">Formations</div></div><div class="kpi"><div class="k-num">'+S.get('events').length+'</div><div class="k-lbl">Événements</div></div></div><div class="panel"><h3 class="mb">Répartition par statut</h3>'+['membre','partenaire','verifie'].map(function(st){var n=c.filter(function(x){return x.status===st;}).length,pct=Math.round(n/c.length*100);return '<div class="mb"><div class="flex between"><span>'+st+'</span><span class="muted">'+n+'</span></div><div class="progress"><i style="width:'+pct+'%"></i></div></div>';}).join('')+'</div>';}
    else if(k==='log')v.innerHTML='<div class="panel"><h3 class="mb">Journal d’activité</h3>'+inbox('activityLog',[['at','Date/heure'],['action','Action']])+'</div>';
    else if(k==='settings')v.innerHTML='<div class="panel"><h3 class="mb">Accès privé</h3><p class="muted">Identifiant : <strong>henock</strong> · Mot de passe configuré pour cette version : <strong>100722</strong>.</p><p class="form-note">Important : ce site reste statique. Pour une vraie sécurité serveur et des données partagées entre visiteurs, il faudra connecter une base de données + authentification backend.</p></div><div class="panel"><h3 class="mb">Sauvegarde & données</h3><p class="muted mb">Exportez ou importez tout le contenu du site (format JSON).</p><div class="flex gap wrap"><button class="btn btn-dark" onclick="expJSON()">⬇ Exporter (JSON)</button><label class="btn btn-light">⬆ Importer<input type="file" accept="application/json" onchange="impJSON(event)" hidden></label><button class="btn btn-ghost" onclick="resetAll()">↺ Réinitialiser</button></div></div><div class="panel"><h3 class="mb">Menu principal</h3>'+S.get('menu').map(function(m,i){return '<div class="form-row c2" style="margin-bottom:8px"><input class="input" data-menu="'+i+'" data-mk="label" value="'+E(m.label)+'"><input class="input" data-menu="'+i+'" data-mk="href" value="'+E(m.href)+'"></div>';}).join('')+'<button class="btn btn-primary" onclick="saveMenu()">Enregistrer le menu</button></div>';
    document.querySelectorAll('#view .reveal').forEach(function(e){e.classList.add('in');});
  }


  window.saveCreatorWeek=function(){var id=document.getElementById('creatorWeek').value;S.set('creatorOfWeek',id);log('Créateur de la semaine modifié');alert('Créateur mis en avant.');render(cur);};
  window.saveLegal=function(){var legal=S.get('legal');document.querySelectorAll('[data-legal]').forEach(function(el){legal[+el.getAttribute('data-legal')].body=el.value;});S.set('legal',legal);log('MAJ pages légales');alert('Pages enregistrées.');};
  window.saveMenu=function(){var menu=S.get('menu');document.querySelectorAll('[data-menu]').forEach(function(el){menu[+el.getAttribute('data-menu')][el.getAttribute('data-mk')]=el.value;});S.set('menu',menu);log('MAJ menu');alert('Menu enregistré.');};
  window.expJSON=function(){var blob=new Blob([S.exportJSON()],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='yca-rdc-content.json';a.click();};
  window.impJSON=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{S.importJSON(r.result);log('Import JSON');alert('Import réussi.');render(cur);}catch(x){alert('Fichier invalide.');}};r.readAsText(f);};
  window.resetAll=function(){if(confirm('Réinitialiser tout le contenu aux valeurs d’usine ?')){S.reset();log('Réinitialisation');render(cur);}};
})();

