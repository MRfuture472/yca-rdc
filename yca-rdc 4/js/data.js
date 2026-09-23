/* =====================================================================
   YCA RDC - Couche de donnees (CMS)
   Tout le contenu du site vit ici et est editable depuis l'admin.
   Stockage : localStorage (prototype). En production => API/BDD.
   Aucune donnee n'est "codee en dur" dans les pages : les pages lisent
   toujours via YCA.get(...). Cela rend le site entierement administrable.
   ===================================================================== */
(function(){
  'use strict';
  var KEY='yca_rdc_cms_v2';

  // -------- Contenu par defaut (seed) --------
  var DEFAULT={
    site:{
      name:'YouTube Creator Academy RDC',
      short:'YCA RDC',
      slogan:'Apprendre. Créer. Grandir.',
      positioning:'La communauté des créateurs YouTube de la RDC.',
      email:'henockfutur@gmail.com',
      phone:'+243 000 000 000',
      city:'Kinshasa, RDC',
      founderName:'Henock Muteta',
      founderFullName:'Henock Muteta Mandona',
      founderTitle:'Fondateur de YouTube Creator Academy RDC',
      founderCity:'Lubumbashi, Haut-Katanga, RDC',
      founderPhoto:'assets/img/founder.jpg',
      founderBio:'Henock Muteta Mandona est le fondateur de YouTube Creator Academy RDC. Créateur de contenu, photographe et entrepreneur basé en RDC, il développe des projets autour de la création numérique, de la photographie et de YouTube. À travers YCA RDC, il souhaite contribuer à la structuration d’un écosystème où les créateurs congolais peuvent apprendre, se rencontrer, collaborer, développer leurs chaînes et accéder progressivement à de nouvelles opportunités. Son rôle est de porter la vision de l’organisation tout en construisant une structure capable de fonctionner durablement avec une équipe de créateurs et de professionnels.',
      founderYoutube:'https://youtube.com/@henockmuteta',
      founderFacebook:'https://facebook.com/henock.muteta',
      founderInstagram:'https://instagram.com/_henock_muteta_mandona',
      founderTiktok:'https://tiktok.com/@henockmuteta',
      independence:'YouTube Creator Academy RDC est une organisation indépendante dédiée aux créateurs. YCA RDC n’est pas YouTube, n’en est pas une filiale et ne représente pas officiellement YouTube.'
    },
    seo:{
      title:'YouTube Creator Academy RDC | Communauté des créateurs YouTube congolais',
      description:'YCA RDC forme, accompagne, connecte et valorise les créateurs YouTube de la République démocratique du Congo. Formations, opportunités, campagnes et communauté.',
      keywords:'YouTube RDC, YouTubeurs RDC, créateurs RDC, formation YouTube RDC, monétisation YouTube RDC, YouTube Kinshasa, YouTube Lubumbashi, créateurs congolais'
    },
    menu:[
      {label:'Accueil',href:'index.html'},
      {label:'Créateurs',href:'creators.html'},
      {label:'Academy',href:'academy.html'},
      {label:'Opportunités',href:'opportunities.html'},
      {label:'Campagnes',href:'campaigns.html'},
      {label:'Événements',href:'events.html'},
      {label:'Média',href:'media.html'},
      {label:'Communauté',href:'community.html'},
      {label:'À propos',href:'about.html'},
      {label:'Contact',href:'contact.html'}
    ],
    social:{
      youtube:'https://youtube.com/@henockmuteta',
      tiktok:'https://tiktok.com/@henockmuteta',
      facebook:'https://facebook.com/henock.muteta',
      instagram:'https://instagram.com/_henock_muteta_mandona',
      whatsapp:'https://chat.whatsapp.com/ycardc',
      telegram:'https://t.me/ycardc'
    },
    hero:{
      title:'Construisons ensemble l’écosystème YouTube de la RDC. 🇨🇩',
      subtitle:'YouTube Creator Academy RDC rassemble, forme, accompagne et valorise les créateurs YouTube congolais.',
      cta1:'Rejoindre la communauté',
      cta2:'Découvrir les créateurs',
      image:'assets/img/hero.jpg'
    },
    stats:[
      {num:'1 200+',lbl:'Créateurs membres'},
      {num:'26',lbl:'Provinces couvertes'},
      {num:'48',lbl:'Formations disponibles'},
      {num:'90+',lbl:'Campagnes réalisées'}
    ],
    pillars:[
      {ic:'🎓',title:'ACADEMY',desc:'Formation et développement des compétences.'},
      {ic:'👥',title:'COMMUNITY',desc:'Communauté et collaboration entre créateurs.'},
      {ic:'🤝',title:'AGENCY',desc:'Connexion entre créateurs et marques.'},
      {ic:'📺',title:'MEDIA',desc:'Actualités, interviews et mise en avant des créateurs.'}
    ],
    support:{
      ic:'🛠️',title:'CREATOR SUPPORT',
      desc:'Accompagnement et orientation des créateurs face aux problèmes liés à leurs plateformes.',
      note:'YCA RDC n’est pas YouTube et ne peut pas garantir une décision de YouTube.'
    }
  };

  DEFAULT.creators=[
    {id:'c1',name:'Grace Mbuyi',channel:'Grace Cuisine',photo:'assets/img/c1.jpg',city:'Kinshasa',province:'Kinshasa',country:'RDC',niche:'Cuisine',subs:'128 000',videos:210,desc:'Recettes congolaises modernes et faciles à réaliser au quotidien.',youtube:'https://youtube.com/@gracecuisine',tiktok:'https://tiktok.com/@gracecuisine',instagram:'',facebook:'',pro:'grace@mail.cd',status:'verifie',size:'moyenne',type:'Lifestyle',public:true},
    {id:'c2',name:'Josué Kalala',channel:'Tech Congo',photo:'assets/img/c2.jpg',city:'Lubumbashi',province:'Haut-Katanga',country:'RDC',niche:'Technologie',subs:'54 300',videos:98,desc:'Tests, tutoriels et actualités tech pour le public congolais.',youtube:'https://youtube.com/@techcongo',tiktok:'',instagram:'https://instagram.com/techcongo',facebook:'',pro:'josue@mail.cd',status:'partenaire',size:'moyenne',type:'Éducatif',public:true},
    {id:'c3',name:'Sarah Ilunga',channel:'Beauty by Sarah',photo:'assets/img/c3.jpg',city:'Goma',province:'Nord-Kivu',country:'RDC',niche:'Beauté',subs:'21 900',videos:140,desc:'Tutoriels beauté, soins de la peau et confiance en soi.',youtube:'https://youtube.com/@beautybysarah',tiktok:'https://tiktok.com/@beautysarah',instagram:'',facebook:'',pro:'',status:'membre',size:'petite',type:'Lifestyle',public:true},
    {id:'c4',name:'David Mwamba',channel:'David Comedy',photo:'assets/img/c4.jpg',city:'Kinshasa',province:'Kinshasa',country:'RDC',niche:'Divertissement',subs:'312 000',videos:320,desc:'Sketchs et comédie qui reflètent le quotidien congolais.',youtube:'https://youtube.com/@davidcomedy',tiktok:'https://tiktok.com/@davidcomedy',instagram:'',facebook:'https://facebook.com/davidcomedy',pro:'booking@david.cd',status:'verifie',size:'grande',type:'Divertissement',public:true},
    {id:'c5',name:'Esther Nlandu',channel:'Business Mama',photo:'assets/img/c5.jpg',city:'Matadi',province:'Kongo-Central',country:'RDC',niche:'Business',subs:'9 800',videos:60,desc:'Conseils entrepreneuriat et finances pour jeunes créateurs.',youtube:'https://youtube.com/@businessmama',tiktok:'',instagram:'',facebook:'',pro:'',status:'membre',size:'petite',type:'Éducatif',public:true},
    {id:'c6',name:'Patrick Kabeya',channel:'Foot RDC',photo:'assets/img/c6.jpg',city:'Kananga',province:'Kasaï-Central',country:'RDC',niche:'Sport',subs:'76 400',videos:180,desc:'Analyses et actualités du football congolais et africain.',youtube:'https://youtube.com/@footrdc',tiktok:'',instagram:'https://instagram.com/footrdc',facebook:'',pro:'',status:'partenaire',size:'moyenne',type:'Sport',public:true}
  ];
  DEFAULT.creatorOfWeek='c4';

  DEFAULT.courseCategories=['YouTube','Création vidéo','Montage','Miniatures','YouTube Studio','SEO','Audience','Monétisation','Shorts','IA pour créateurs','TikTok','Facebook','Instagram','Business créateur'];
  DEFAULT.courses=[
    {id:'f1',title:'Démarrer sa chaîne YouTube en RDC',cat:'YouTube',thumb:'https://images.unsplash.com/photo-1610552050890-fe99536c2615?auto=format&fit=crop&w=800&q=80',trainer:'Henock Muteta',level:'Débutant',duration:'3h 20min',price:0,type:'gratuite',modules:5,desc:'Les bases pour créer, paramétrer et lancer une chaîne professionnelle.'},
    {id:'f2',title:'Montage vidéo mobile de A à Z',cat:'Montage',thumb:'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',trainer:'Josué Kalala',level:'Intermédiaire',duration:'5h 10min',price:25,type:'payante',modules:8,desc:'Maîtrisez le montage depuis votre smartphone avec des outils gratuits.'},
    {id:'f3',title:'SEO YouTube & croissance d’audience',cat:'SEO',thumb:'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80',trainer:'Sarah Ilunga',level:'Intermédiaire',duration:'4h 00min',price:40,type:'premium',modules:7,desc:'Titres, miniatures, mots-clés et stratégie pour être trouvé.'},
    {id:'f4',title:'Monétisation : comprendre les vraies règles',cat:'Monétisation',thumb:'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=800&q=80',trainer:'Henock Muteta',level:'Avancé',duration:'2h 45min',price:30,type:'payante',modules:6,desc:'Sources de revenus, conditions d’éligibilité et bonnes pratiques.'},
    {id:'f5',title:'Créer des Shorts qui performent',cat:'Shorts',thumb:'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',trainer:'David Mwamba',level:'Débutant',duration:'1h 50min',price:0,type:'gratuite',modules:4,desc:'Format vertical, accroches et rythme pour capter l’attention.'},
    {id:'f6',title:'IA pour créateurs : gagner du temps',cat:'IA pour créateurs',thumb:'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',trainer:'Josué Kalala',level:'Intermédiaire',duration:'3h 30min',price:45,type:'premium',modules:9,desc:'Scripts, miniatures, voix et organisation assistés par l’IA.'}
  ];

  DEFAULT.opportunities=[
    {id:'o1',title:'Ambassadeurs d’une marque télécom',type:'Campagne',company:'Telecom RDC',desc:'Recherche de créateurs lifestyle pour une campagne de lancement produit.',deadline:'2026-10-30',pay:'Publiable : 300 $/vidéo',criteria:'10k+ abonnés, audience RDC',need:8},
    {id:'o2',title:'Casting présentateur émission web',type:'Casting',company:'Studio Kin',desc:'Casting de présentateurs pour une nouvelle émission YouTube hebdomadaire.',deadline:'2026-10-15',pay:'À discuter',criteria:'Aisance caméra, français/lingala',need:3},
    {id:'o3',title:'Collaboration inter-créateurs « Kin City »',type:'Collaboration',company:'YCA RDC',desc:'Projet collaboratif entre créateurs de Kinshasa autour de la ville.',deadline:'2026-11-05',pay:'Visibilité croisée',criteria:'Basé à Kinshasa',need:12},
    {id:'o4',title:'Concours « Meilleur Short éducatif »',type:'Concours',company:'YCA RDC',desc:'Concours national du meilleur Short éducatif congolais.',deadline:'2026-12-01',pay:'Prix : matériel + formation',criteria:'Contenu éducatif original',need:0}
  ];

  DEFAULT.campaigns=[
    {id:'k1',name:'Lancement Smartphone X',brand:'Telecom RDC',budget:'12 000 $',objectives:'Notoriété + démos produit',creators:6,deliverables:'2 vidéos + 3 Shorts',start:'2026-10-01',end:'2026-11-15',status:'En cours',platforms:'YouTube, TikTok'},
    {id:'k2',name:'Sensibilisation Santé',brand:'ONG Santé+',budget:'5 000 $',objectives:'Éducation & portée',creators:10,deliverables:'1 vidéo longue',start:'2026-09-10',end:'2026-10-10',status:'Terminée',platforms:'YouTube, Facebook'},
    {id:'k3',name:'Mode Automne',brand:'Kin Fashion',budget:'8 000 $',objectives:'Ventes en ligne',creators:4,deliverables:'Lookbook vidéo',start:'2026-11-01',end:'2026-12-01',status:'Ouverte',platforms:'YouTube, Instagram'}
  ];

  DEFAULT.events=[
    {id:'e1',title:'Creator Meetup Kinshasa',type:'Rencontre',img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',date:'2026-10-25',time:'14:00',place:'Pullman Kinshasa',desc:'Rencontre nationale des créateurs YouTube congolais : networking et panels.',seats:200},
    {id:'e2',title:'Atelier Montage & Miniatures',type:'Atelier',img:'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',date:'2026-11-08',time:'10:00',place:'En ligne (Zoom)',desc:'Atelier pratique pour améliorer vos montages et miniatures.',seats:100},
    {id:'e3',title:'Conférence « Monétiser en RDC »',type:'Conférence',img:'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',date:'2026-12-06',time:'09:00',place:'Lubumbashi',desc:'Comprendre les vraies opportunités de revenus pour les créateurs.',seats:150}
  ];

  DEFAULT.articleCategories=['YouTube','Monétisation','Création de contenu','Technologie','IA','Photographie','TikTok','Facebook','Instagram','Actualités','Créateurs RDC'];
  DEFAULT.articles=[
    {id:'a1',title:'5 erreurs qui bloquent la croissance de votre chaîne',cat:'YouTube',author:'Henock Muteta',date:'2026-09-18',img:'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=80',tags:['croissance','conseils'],excerpt:'Les pièges les plus courants des nouveaux créateurs et comment les éviter.',body:'La croissance d’une chaîne YouTube ne dépend pas de la chance. Voici les 5 erreurs les plus fréquentes observées chez les créateurs congolais débutants, et des solutions concrètes pour y remédier.'},
    {id:'a2',title:'Portrait : comment David Comedy a atteint 300k abonnés',cat:'Créateurs RDC',author:'Rédaction YCA',date:'2026-09-12',img:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',tags:['portrait','interview'],excerpt:'Retour sur le parcours d’un des créateurs les plus suivis de Kinshasa.',body:'De ses débuts avec un simple téléphone à une communauté de plus de 300 000 abonnés, David partage sa méthode, ses échecs et ses conseils.'},
    {id:'a3',title:'L’IA au service des créateurs : par où commencer ?',cat:'IA',author:'Josué Kalala',date:'2026-09-05',img:'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',tags:['IA','productivité'],excerpt:'Des outils simples pour écrire, monter et publier plus vite.',body:'L’intelligence artificielle peut faire gagner un temps précieux aux créateurs. Tour d’horizon des usages accessibles dès aujourd’hui.'}
  ];

  DEFAULT.roles=[
    {role:'SUPER ADMIN',perms:'Accès total, gestion des rôles et paramètres critiques.'},
    {role:'ADMIN',perms:'Gestion du contenu, utilisateurs, campagnes, paiements.'},
    {role:'MODÉRATEUR',perms:'Modération des créateurs, articles et communauté.'},
    {role:'FORMATEUR',perms:'Création et gestion de ses formations.'},
    {role:'CRÉATEUR',perms:'Profil, candidatures, opportunités.'},
    {role:'CRÉATEUR PARTENAIRE',perms:'Profil avancé, campagnes, contrats, revenus.'},
    {role:'MARQUE',perms:'Dépôt de campagnes et suivi.'},
    {role:'ÉTUDIANT',perms:'Accès aux formations achetées et progression.'}
  ];

  DEFAULT.legal=[
    {id:'confidentialite',title:'Politique de confidentialité',body:'YCA RDC accorde une grande importance à la protection de vos données personnelles. Cette politique décrit les informations collectées, leur usage et vos droits. Vous restez maître des informations rendues publiques dans l’annuaire des créateurs.'},
    {id:'cookies',title:'Politique des cookies',body:'Ce site utilise des cookies pour améliorer votre expérience et mesurer l’audience. Vous pouvez gérer vos préférences à tout moment.'},
    {id:'conditions',title:'Conditions d’utilisation',body:'En utilisant la plateforme YCA RDC, vous acceptez de respecter les présentes conditions ainsi que les règles de la communauté.'},
    {id:'cgv',title:'Conditions générales de vente',body:'Les formations payantes et événements sont soumis aux présentes CGV. Les modalités de paiement seront précisées lors de l’intégration d’un prestataire de paiement disponible en RDC.'},
    {id:'remboursement',title:'Politique de remboursement',body:'Les conditions de remboursement des formations et événements sont détaillées ici et s’appliquent selon le type de produit acheté.'},
    {id:'mentions',title:'Mentions légales',body:'YouTube Creator Academy RDC est une organisation indépendante. YCA RDC n’est pas YouTube, n’en est pas une filiale et ne le représente pas officiellement.'},
    {id:'communaute',title:'Règles de la communauté',body:'Respect, bienveillance et entraide sont au cœur de la communauté YCA RDC. Tout comportement haineux, frauduleux ou trompeur est interdit.'},
    {id:'conduite',title:'Code de conduite des créateurs',body:'Les créateurs s’engagent à produire un contenu respectueux des lois, des tiers et des règles des plateformes.'}
  ];

  // Boites de reception (remplies par les formulaires publics)
  DEFAULT.applications=[];   // candidatures "Rejoindre"
  DEFAULT.brandRequests=[];  // demandes de marques
  DEFAULT.messages=[];       // contact
  DEFAULT.newsletter=[];     // emails newsletter
  DEFAULT.payments=[         // transactions (statut prepare, aucun prestataire fictif)
    {id:'p1',item:'Montage vidéo mobile de A à Z',user:'e.nlandu@mail.cd',amount:'25 $',status:'Payé',date:'2026-09-14',method:'À configurer'},
    {id:'p2',item:'SEO YouTube & croissance',user:'p.kabeya@mail.cd',amount:'40 $',status:'Non payé',date:'2026-09-20',method:'À configurer'}
  ];

  // ---------------- API de stockage ----------------
  function clone(o){return JSON.parse(JSON.stringify(o));}
  function load(){
    try{var raw=localStorage.getItem(KEY);if(raw)return JSON.parse(raw);}catch(e){}
    var seed=clone(DEFAULT);save(seed);return seed;
  }
  function save(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch(e){}}

  var store=load();

  window.YCA={
    // Lecture d'une cle de premier niveau (site, hero, creators...)
    get:function(k){return k?store[k]:store;},
    // Ecriture d'une cle de premier niveau
    set:function(k,v){store[k]=v;save(store);return store[k];},
    // Ajout dans une collection (renvoie l'element cree)
    add:function(coll,item){if(!store[coll])store[coll]=[];if(!item.id)item.id=coll[0]+Date.now();store[coll].push(item);save(store);return item;},
    // Suppression par id
    remove:function(coll,id){if(store[coll])store[coll]=store[coll].filter(function(x){return x.id!==id;});save(store);},
    // Mise a jour par id
    update:function(coll,id,patch){if(store[coll]){store[coll].forEach(function(x){if(x.id===id)Object.assign(x,patch);});save(store);}},
    // Recherche d'un element par id
    find:function(coll,id){return (store[coll]||[]).filter(function(x){return x.id===id;})[0];},
    // Reinitialiser tout le contenu au seed d'usine
    reset:function(){store=clone(DEFAULT);save(store);},
    // Sauvegarde complete (import/export JSON)
    exportJSON:function(){return JSON.stringify(store,null,2);},
    importJSON:function(txt){store=JSON.parse(txt);save(store);}
  };
})();
