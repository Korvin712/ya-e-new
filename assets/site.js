(function(){
const LS='yaie-lang';const params=new URLSearchParams(location.search);const q=params.get('lang');
if(q==='uk'||q==='en'){try{localStorage.setItem('lang',q);localStorage.setItem(LS,q);}catch(e){}}
const lang=()=>{try{return localStorage.getItem(LS)||localStorage.getItem('lang')||'uk'}catch(e){return 'uk'}};
const paths={home:'index.html',aboutarchetypes:'archetypes.html',test:'archetype-test.html',situation:'unravel-situation.html',other:'tools.html',world:'blog.html',about:'about.html',contact:'contact.html',humor:'humor.html'};
const labels={uk:['Головна','Про автора','Архетипи','Тест','Розплутувач','Інші інструменти','Мій погляд'],en:['Home','About','Archetypes','Test','Unraveler','More tools','My perspective']};
const keys=['home','about','aboutarchetypes','test','situation','other','world'];
function init(){let l=lang();document.documentElement.lang=l;let h=document.createElement('header');h.className='site-head';let basename=location.pathname.split('/').pop()||'index.html';let nav=keys.map((k,i)=>'<a '+(paths[k]===basename?'aria-current="page" ':'')+'href="'+paths[k]+'?lang='+l+'">'+labels[l][i]+'</a>').join('');h.innerHTML='<div class="site-head-inner"><a class="site-brand" href="index.html?lang='+l+'" aria-label="'+(l==='uk'?'На головну':'Home')+'"><img src="images/logo-web.png" alt="Я Є — логотип"><span>Я є. <span style="color:#aebace">I Am.</span></span></a><button class="site-menu" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">☰</button><nav class="site-nav" id="site-nav">'+nav+'</nav><div class="site-language"><button type="button" data-lang="uk" class="'+(l==='uk'?'active':'')+'">УКР</button><button type="button" data-lang="en" class="'+(l==='en'?'active':'')+'">ENG</button></div></div>';document.body.prepend(h);
let menu=h.querySelector('.site-menu');menu.addEventListener('click',()=>{let expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));h.querySelector('.site-nav').classList.toggle('open',!expanded)});
h.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{let next=b.dataset.lang;if(next===lang())return;try{localStorage.setItem(LS,next);localStorage.setItem('lang',next)}catch(e){};let url=new URL(location.href);url.searchParams.set('lang',next);location.href=url.pathname+url.search+url.hash;});
if(typeof window.yaieRenderHome==='function')window.yaieRenderHome(l);
// Legacy pages initialize from the stored language on their own. Never simulate a click:
// doing so toggled the already-English Humor page back to Ukrainian.
// The Humor module exposes an explicit setter, so we can synchronize it idempotently.
if(basename==='humor.html' && typeof window.setLanguage==='function'){
  window.setLanguage(l);
}
let footer=document.createElement('div');footer.className='site-footer';footer.innerHTML='<div class="site-footlinks"><a href="contact.html?lang='+l+'">'+(l==='uk'?'Контакти':'Contact')+'</a><a href="humor.html?lang='+l+'">'+(l==='uk'?'Гумор':'Humor')+'</a><a href="about.html?lang='+l+'">'+(l==='uk'?'Про автора':'About the author')+'</a></div>© 2026 Я є. I Am.';document.body.append(footer);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();