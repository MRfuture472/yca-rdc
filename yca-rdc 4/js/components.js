/* =====================================================================
   YCA RDC - Composants reutilisables (cartes + rendus de pages)
   ===================================================================== */
(function(){
  'use strict';
  var S=window.YCA,E=window.esc;
  var STATUS={membre:['MEMBRE','badge-membre'],partenaire:['CRÉATEUR PARTENAIRE','badge-partenaire'],verifie:['CRÉATEUR VÉRIFIÉ','badge-verifie']};

  // ---- Carte createur ----
  function creatorCard(c){
    var st=STATUS[c.status]||STATUS.membre;
    var links='';
    if(c.public){
      if(c.youtube)links+='<a class="chip chip-red" href="'+E(c.youtube)+'" target="_blank" rel="noopener">YouTube</a>';
      if(c.tiktok)links+='<a class="chip" href="'+E(c.tiktok)+'" target="_blank" rel="noopener">TikTok</a>';
      if(c.instagram)links+='<a class="chip" href="'+E(c.instagram)+'" target="_blank" rel="noopener">Instagram</a>';
      if(c.facebook)links+='<a class="chip" href="'+E(c.facebook)+'" target="_blank" rel="noopener">Facebook</a>';
    }
    return '<div class="card creator-card reveal"><div class="card-body">'
      +'<a href="creator.html?id='+E(c.id)+'"><img class="avatar" src="'+E(c.photo)+'" alt="'+E(c.name)+'" loading="lazy"></a>'
      +'<span class="badge '+st[1]+'" style="margin:0 auto">'+st[0]+'</span>'+(c.featured?'<span class="chip chip-red" style="margin-top:6px">⭐ À la une</span>':'')+(c.trend&&c.trend!=='aucune'?'<span class="chip" style="margin-top:6px">📈 '+E(c.trend)+'</span>':'')
      +'<h3 style="margin-top:6px"><a href="creator.html?id='+E(c.id)+'">'+E(c.name)+'</a></h3>'
      +'<div style="font-weight:600;color:var(--red)">'+E(c.channel)+'</div>'
      +'<div class="creator-meta"><span>📍 '+E(c.city)+'</span><span>🏷️ '+E(c.niche)+'</span><span>👥 '+E(c.subs)+'</span></div>'
      +'<p style="font-size:.9rem">'+E(c.desc)+'</p>'
      +'<div class="flex wrap gap" style="gap:6px;justify-content:center">'+links+'</div>'
      +'<a class="btn btn-light btn-sm" href="creator.html?id='+E(c.id)+'">Voir le profil</a>'
      +'</div></div>';
  }

  // ---- Carte formation ----
  function courseCard(f){
    var price=f.price===0?'<span class="price"><span class="free">Gratuit</span></span>':'<span class="price">'+f.price+' $</span>';
    var typeLbl={gratuite:'GRATUITE',payante:'PAYANTE',premium:'PREMIUM'}[f.type]||'';
    return '<div class="card reveal"><img class="card-img" src="'+E(f.thumb)+'" alt="'+E(f.title)+'" loading="lazy">'
      +'<div class="card-body"><div class="flex wrap gap" style="gap:6px"><span class="tag">'+E(f.cat)+'</span><span class="chip chip-red" style="font-size:.68rem;padding:3px 9px">'+typeLbl+'</span></div>'
      +'<h3>'+E(f.title)+'</h3><p style="font-size:.9rem">'+E(f.desc)+'</p>'
      +'<div class="creator-meta" style="justify-content:flex-start"><span>👨‍🏫 '+E(f.trainer)+'</span><span>📊 '+E(f.level)+'</span><span>⏱️ '+E(f.duration)+'</span><span>📚 '+f.modules+' modules</span></div></div>'
      +'<div class="card-foot">'+price+'<a class="btn btn-primary btn-sm" href="course.html?id='+E(f.id)+'">'+(f.price===0?'Commencer':'S’inscrire')+'</a></div></div>';
  }

  // ---- Carte opportunite ----
  function oppCard(o){
    return '<div class="card reveal"><div class="card-body">'
      +'<div class="flex between wrap gap"><span class="chip chip-red">'+E(o.type)+'</span><span class="muted" style="font-size:.82rem">⏳ '+E(o.deadline)+'</span></div>'
      +'<h3>'+E(o.title)+'</h3><div style="font-weight:600">🏢 '+E(o.company)+'</div>'
      +'<p style="font-size:.9rem">'+E(o.desc)+'</p>'
      +'<div class="creator-meta" style="justify-content:flex-start"><span>💰 '+E(o.pay)+'</span><span>✅ '+E(o.criteria)+'</span>'+(o.need?'<span>👥 '+o.need+' recherchés</span>':'')+'</div></div>'
      +'<div class="card-foot"><span></span><a class="btn btn-dark btn-sm" href="opportunities.html">Postuler</a></div></div>';
  }

  // ---- Carte evenement ----
  function eventCard(ev){
    return '<div class="card reveal"><img class="card-img" src="'+E(ev.img)+'" alt="'+E(ev.title)+'" loading="lazy">'
      +'<div class="card-body"><span class="chip">'+E(ev.type)+'</span><h3>'+E(ev.title)+'</h3>'
      +'<div class="creator-meta" style="justify-content:flex-start"><span>📅 '+E(ev.date)+'</span><span>🕒 '+E(ev.time)+'</span><span>📍 '+E(ev.place)+'</span></div>'
      +'<p style="font-size:.9rem">'+E(ev.desc)+'</p></div>'
      +'<div class="card-foot"><span class="muted" style="font-size:.82rem">'+ev.seats+' places</span><a class="btn btn-primary btn-sm" href="events.html">S’inscrire</a></div></div>';
  }

  // ---- Carte article ----
  function articleCard(a){
    return '<a class="card reveal" href="article.html?id='+E(a.id)+'"><img class="card-img" src="'+E(a.img)+'" alt="'+E(a.title)+'" loading="lazy">'
      +'<div class="card-body"><span class="chip chip-red">'+E(a.cat)+'</span><h3>'+E(a.title)+'</h3>'
      +'<p style="font-size:.9rem">'+E(a.excerpt)+'</p>'
      +'<div class="creator-meta" style="justify-content:flex-start"><span>✍️ '+E(a.author)+'</span><span>📅 '+E(a.date)+'</span></div></div></a>';
  }

  window.YCAC={creatorCard:creatorCard,courseCard:courseCard,oppCard:oppCard,eventCard:eventCard,articleCard:articleCard,STATUS:STATUS};
})();