/* YCA RDC - notifications email
   Configuration: set site.email in data.js to the real inbox.
   Uses FormSubmit's AJAX endpoint for static hosting. The first submission
   to a new destination may require one-time confirmation by email. */
(function(){
  'use strict';
  window.YCAEmail = {
    send: async function(subject, fields){
      var site = window.YCA.get('site') || {};
      var to = site.email;
      if(!to) throw new Error('Adresse email de notification non configurée.');
      var endpoint = 'https://formsubmit.co/ajax/' + encodeURIComponent(to);
      var body = {};
      Object.keys(fields || {}).forEach(function(k){ body[k]=fields[k]==null?'':String(fields[k]); });
      body._subject = subject;
      body._template = 'table';
      body._captcha = 'false';
      body._url = window.location.href;
      var r = await fetch(endpoint,{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(body)
      });
      var data = {};
      try { data = await r.json(); } catch(e){}
      if(!r.ok || data.success === false) throw new Error('Échec de l’envoi de l’email.');
      return data;
    }
  };
})();