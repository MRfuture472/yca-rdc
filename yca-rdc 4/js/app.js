/* =====================================================================
   YCA RDC - Logique partagee (header, footer, SEO, composants)
   Le header et le footer sont injectes dynamiquement depuis le CMS
   (YCA.get) pour que menus, liens et textes soient administrables.
   ===================================================================== */
(function(){
  'use strict';
  var S=window.YCA;
  try{ if(!/gestion-yca-9f3c\.html$/i.test(location.pathname)){ var n=parseInt(localStorage.getItem('yca_local_visits')||'0',10)+1; localStorage.setItem('yca_local_visits',String(n)); } }catch(e){}
  function esc(s){s=(s==null?'':''+s);return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  window.esc=esc;

  // ---------- SEO / <head> ----------
  function injectSEO(){
    var seo=S.get('seo'),site=S.get('site');
    if(!document.title||document.title==='')document.title=seo.title;
    function meta(name,val,prop){
      if(!val)return;var sel=prop?'meta[property="'+name+'"]':'meta[name="'+name+'"]';
      var m=document.querySelector(sel);if(!m){m=document.createElement('meta');m.setAttribute(prop?'property':'name',name);document.head.appendChild(m);}
      m.setAttribute('content',val);
    }
    meta('description',seo.description);meta('keywords',seo.keywords);
    meta('og:title',document.title,true);meta('og:description',seo.description,true);
    meta('og:type','website',true);meta('og:site_name',site.name,true);
    meta('twitter:card','summary_large_image');
  }

  // ---------- Header ----------
  function buildHeader(active){
    var site=S.get('site'),menu=S.get('menu');
    var links=menu.map(function(m){
      var a=(active&&active===m.href)?' active':'';
      return '<a class="'+a.trim()+'" href="'+m.href+'">'+esc(m.label)+'</a>';
    }).join('');
    var mlinks=menu.map(function(m){return '<a href="'+m.href+'">'+esc(m.label)+'</a>';}).join('');
    var logo='<a class="logo" href="index.html"><span class="logo-mark"></span><span>'+esc(site.short)+'<small>Creator Academy</small></span></a>';
    return '<header class="header"><div class="container"><nav class="nav">'
      +logo
      +'<div class="nav-links">'+links+'</div>'
      +'<div class="nav-cta"><a class="btn btn-ghost btn-sm" href="creator-space.html">Espace créateur</a>'
      +'<a class="btn btn-light btn-sm" href="brand.html">Espace marque</a>'
      +'<a class="btn btn-primary btn-sm" href="join.html">Rejoindre la communauté</a></div>'
      +'<button class="burger" aria-label="Menu" onclick="toggleMenu()"><span></span><span></span><span></span></button>'
      +'</nav></div></header>'
      +'<div class="mobile-menu" id="mobileMenu">'+mlinks
      +'<a class="btn btn-ghost" href="creator-space.html">Espace créateur</a>'
      +'<a class="btn btn-light" href="brand.html">Espace marque</a>'
      +'<a class="btn btn-primary" href="join.html">Rejoindre la communauté</a></div>';
  }
  window.toggleMenu=function(){var m=document.getElementById('mobileMenu');if(m)m.classList.toggle('open');};

  // ---------- Footer ----------
  function buildFooter(){
    var site=S.get('site'),menu=S.get('menu'),soc=S.get('social'),legal=S.get('legal');
    var year=new Date().getFullYear();
    var navCol=menu.map(function(m){return '<a href="'+m.href+'">'+esc(m.label)+'</a>';}).join('');
    var legalCol=legal.map(function(l){return '<a href="legal.html#'+l.id+'">'+esc(l.title)+'</a>';}).join('');
    var socItems=[['youtube','YouTube','▶'],['tiktok','TikTok','♪'],['facebook','Facebook','f'],['instagram','Instagram','◉'],['whatsapp','WhatsApp','☎'],['telegram','Telegram','✈']];
    var socHTML=socItems.map(function(s){var u=soc[s[0]];return u?'<a href="'+esc(u)+'" target="_blank" rel="noopener" title="'+s[1]+'">'+s[2]+'</a>':'';}).join('');
    return '<footer class="footer"><div class="container"><div class="footer-grid">'
      +'<div><div class="logo"><span class="logo-mark"></span><span>'+esc(site.short)+' 🇨🇩<small>'+esc(site.slogan)+'</small></span></div>'
      +'<p style="color:#9aa0ab;font-size:.9rem;max-width:320px">'+esc(site.positioning)+'</p>'
      +'<div class="footer-social">'+socHTML+'</div></div>'
      +'<div><h4>Navigation</h4>'+navCol+'</div>'
      +'<div><h4>Légal</h4>'+legalCol+'</div>'
      +'<div><h4>Contact</h4><a href="mailto:'+esc(site.email)+'">'+esc(site.email)+'</a>'
      +'<a href="tel:'+esc(site.phone)+'">'+esc(site.phone)+'</a><a>'+esc(site.city)+'</a>'
      +'<a href="gestion-yca-9f3c.html">Administration</a></div>'
      +'</div><div class="footer-bottom"><span>© '+year+' '+esc(site.name)+'. Tous droits réservés.</span>'
      +'<span><a href="legal.html#confidentialite">Confidentialité</a>·<a href="legal.html#cookies">Cookies</a>·<a href="legal.html#conditions">Conditions</a>·<a href="legal.html#mentions">Mentions légales</a></span></div>'
      +'</div></footer>'
      +'<div class="disclaimer"><div class="container">'+esc(site.independence)+'</div></div>';
  }

  // ---------- Reveal on scroll ----------
  function initReveal(){
    if(!('IntersectionObserver' in window)){
      document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in');});return;
    }
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.08});
    function observeAll(){document.querySelectorAll('.reveal:not(.in)').forEach(function(e){io.observe(e);});}
    observeAll();
    // Content injected by page scripts runs after mountLayout; catch those too.
    setTimeout(observeAll,60);
    setTimeout(observeAll,300);
    // Watch for any further dynamically added .reveal elements.
    if('MutationObserver' in window){
      new MutationObserver(function(){observeAll();}).observe(document.body,{childList:true,subtree:true});
    }
    // Absolute safety net: never leave content permanently hidden.
    setTimeout(function(){document.querySelectorAll('.reveal:not(.in)').forEach(function(e){var r=e.getBoundingClientRect();if(r.top<window.innerHeight*1.2)e.classList.add('in');});},600);
  }

  // ---------- Mount ----------
  window.mountLayout=function(active){
    injectSEO();
    var h=document.getElementById('site-header');if(h)h.innerHTML=buildHeader(active);
    var f=document.getElementById('site-footer');if(f)f.innerHTML=buildFooter();
    initReveal();
  };
})();