/* KAYNAKLAR – konu slaytları (PDF), çıkmış sorular ve kullanıcının eklediği kaynaklar.
   PDF'ler uygulamanın yanındaki "pdf" klasöründe durur ve oradan açılır; Google Drive'a gidilmez.

   Yeni kaynak eklemek için:
   1) PDF'i pdf/<kimlik>.pdf adıyla pdf klasörüne koy (kimlik: boşluksuz kısa bir ad, ör. final-2025)
   2) Aşağıdaki listeye satır ekle:
      {id:'<kimlik>', ad:'Görünecek ad', tur:'slayt' | 'cikmis' | 'diger', ders:[ders numaraları], used:true (bu uygulamadaki bilgiler buradan alındıysa)}
   3) pdf/liste.js içindeki listeye '<kimlik>' ekle */
window.KAY=(function(){
'use strict';
/* Herkesin kaynak yükleyebileceği ortak klasörün bağlantısı (ör. paylaşıma açık bir Drive klasörü). Boşsa düğme görünmez. */
const ORTAK_KLASOR='';

const LISTE=[
 /* --- ders slaytları --- */
 {id:'11MYxoB1y8u8ohVQEuHlXjnx0Uj_Rf3C7',ad:'Anatomiye Giriş',tur:'slayt',ders:[1]},
 {id:'119o2CCPmzjIspmIrxOFcgzACGbivx-83',ad:'Terminoloji',tur:'slayt',ders:[2,4,3]},
 {id:'11WZpOdzd2HcnDtN1EgSdmtEvE6JwuVEF',ad:'Kemikler',tur:'slayt',ders:[5]},
 {id:'11Ka3w1HEqfax5o61nAX9xhACcsa8Iizu',ad:'Eklemler',tur:'slayt',ders:[5]},
 {id:'1XN2CClB0EKoj5m1DXTMgrmLph8t-DdNr',ad:'Alt ekstremite kemikleri 1',tur:'slayt',ders:[6]},
 {id:'1XaNKhiO3soufVSjGIj5vqw8dN_Q0Ed0n',ad:'Alt ekstremite',tur:'slayt',ders:[6,8]},
 {id:'11WPCohYMXE8MCqIGEAvasFdASSbgPjvO',ad:'Scapula ve clavicula',tur:'slayt',ders:[7]},
 {id:'11I80Msc89BU5NlENB-ugX5sszn2Lmh8I',ad:'Humerus, antebrachium, manus',tur:'slayt',ders:[7]},
 {id:'1Xa3_xE-RJq6BYO97tA-n2Riw_6M9Yetu',ad:'Üst ekstremite eklemleri',tur:'slayt',ders:[8]},
 {id:'1VtHrfXGup-klSjkMsDuHQxI_26MG76Pu',ad:'Yüz, vertebra ve costae kemikleri',tur:'slayt',ders:[9]},
 {id:'11B4aIV--Jx1Leb2OALQkrVlP4NtLgkNI',ad:'Neurocranium',tur:'slayt',ders:[10]},
 {id:'11KVXtQrIDz4d1KMf4hePRupoKz0hB7kN',ad:'Kafa iskeletinin bütünü (cranium)',tur:'slayt',ders:[10]},
 {id:'1KK7Cs4-82PknqEfkLlb5y1Qbg3bqs2Ta',ad:'Kalça kasları',tur:'slayt',ders:[11],used:true},
 {id:'1q41WZYJp54_s48uMDpUxqWIAivoJm1WQ',ad:'Uyluk kasları',tur:'slayt',ders:[11],used:true},
 {id:'1mvuGQBpYD-v36Ia8MFEG1t1dJDsuHnV0',ad:'Kalça bölgesi kasları (2023–2024)',tur:'slayt',ders:[11]},
 {id:'1ZJcpkpMHWVaBpLUfNG_BtgG1QM9k8dDD',ad:'Dış rotator ve uyluk bölgesi kasları',tur:'slayt',ders:[11]},
 {id:'1uky2hB9kDWBmcTLOtN-olj1EAwiuUrml',ad:'Kalça–uyluk kasları (özet)',tur:'slayt',ders:[11]},
 {id:'1TW9wGrpULDHTEDv7qyaR6s3YyIaOhxmc',ad:'Bacak ve ayak kasları',tur:'slayt',ders:[12],used:true},
 {id:'1Imc-xMt0EJZQXyPNSzqf2r94QzmnSYkW',ad:'Bacak–ayak kasları (2)',tur:'slayt',ders:[12]},
 {id:'1XdKq1CJ-uoeEoKHUOAT2OdA2KLIY2kTr',ad:'Omuz ve kol kasları',tur:'slayt',ders:[13],used:true},
 {id:'1XaXKKaP7-m9-Rsut9zwq-YqORy6nn0R4',ad:'Önkol ve el kasları – tablo',tur:'slayt',ders:[14],used:true},
 {id:'1YZtNqwVEc8isMFNPcZ0h3cf1SmEwzF2x',ad:'Önkol ve el',tur:'slayt',ders:[14]},
 {id:'1XQWI6hxFpwJPwGPtDI-NvhXBvX5xHYyA',ad:'Önkol ve el kasları',tur:'slayt',ders:[14]},
 {id:'10xQ7G7Q-wS0uDNXBI1Pj3Dpd3MIS2w3g',ad:'Sırt kasları',tur:'slayt',ders:[15],used:true},
 {id:'1aAv9YWursLoruELptkhRnQnIAhv3wYZ-',ad:'Sırt kasları (2)',tur:'slayt',ders:[15]},
 {id:'1aALRwSRgI9Q6VyT6iqyeLgIulSJeBJ-H',ad:'Sırt kasları (3)',tur:'slayt',ders:[15]},
 {id:'164HASBxm-PFchyHr_LcZEb1Vfq6QGCjx',ad:'Pelvis ve perine kasları',tur:'slayt',ders:[16],used:true},
 {id:'1aA7o9GccDllbc55rw2rb_zyUyOogWE04',ad:'Pelvis–perine kasları (2)',tur:'slayt',ders:[16]},
 {id:'1prOvOjLgl-AHp2To4roeuL3fMHIhqIMS',ad:'Boyun kökü',tur:'slayt',ders:[17],used:true},
 {id:'1FScH0INAAU1E9rGVC9136xoP8FkEL1yI',ad:'Boyun kökü kasları',tur:'slayt',ders:[17]},
 /* --- uygulamada henüz terimleri olmayan konuların slaytları --- */
 {id:'19nxmW0MrnaO1JqrH32vrQS2kYRSydhhu',ad:'Yüz ve boyun kasları',tur:'slayt',ders:[]},
 {id:'1XbkL8MrkRs14aYnB2JlCFjh7-OYizzQN',ad:'Yüz anatomisi',tur:'slayt',ders:[]},
 {id:'11EM_u5LMiiG9CUX10jZaHswusvVdlmFx',ad:'Viscerocranium',tur:'slayt',ders:[]},
 {id:'11LM6NPLA56s6RGhXVP8rRJjlBMSywfin',ad:'Viscerocranium 2',tur:'slayt',ders:[]},
 {id:'117vD5aF2MupOEKw0jr8Tc53lp29yjZvg',ad:'Art. temporomandibularis',tur:'slayt',ders:[]},
 {id:'1XZRiFsHiuXD_h2kj1XkJq8YIyPR_dR1L',ad:'Plexus cervicalis ve brachialis',tur:'slayt',ders:[]},
 {id:'14elm3XiKZEQOOByL6NLWgDGeDxI-RJ5g',ad:'Sinirler',tur:'slayt',ders:[]},
 {id:'1ix37mRU94grQVuB9onatL83DrH4naKGT',ad:'Pharynx, larynx, trachea',tur:'slayt',ders:[]},
 {id:'1RfqLblAwjYe3XnwH9qFfa-N8hSybAPH8',ad:'Pharynx',tur:'slayt',ders:[]},
 {id:'1S0_UneTnOBHv3Ao_oSIwPIiBz9Cb4Vtd',ad:'Larynx',tur:'slayt',ders:[]},
 {id:'1_J1v9hjr_BNyyQHnFI-kF1SdcB8n262I',ad:'Burun ve sinüsler',tur:'slayt',ders:[]},
 {id:'1NTfUmzjL1c5ZfUe2GQOuK_dr1Dbig-j6',ad:'Burun anatomisi ve paranazal sinüsler',tur:'slayt',ders:[]},
 /* --- çıkmışlar --- */
 {id:'14WVDQQx9aBC4o38X5J5x6ky-ZLMXfcNX',ad:'Anatomi – Vize çıkmışları',tur:'cikmis',ders:[]},
 {id:'1erlWQSs_c3lzI-tWc5heUPgOkQAaN51N',ad:'Çıkmışlar ve sorular – hepsi',tur:'cikmis',ders:[]},
 {id:'1LPzmhAvPMjNDWPevxXaLUBycvkkoEErr',ad:'Sorular',tur:'cikmis',ders:[]},
 /* --- diğer --- */
 {url:'https://github.com/Kevin-Mattheus-Moerman/BodyParts3D',ad:'BodyParts3D – 3D modellerin kaynağı',tur:'diger',ders:[],used:true,not:'© The Database Center for Life Science, CC Attribution-Share Alike 2.1 Japan'}
];
const TUR={slayt:'Ders slaytı',cikmis:'Çıkmış soru',diger:'Diğer'};
const $=s=>document.querySelector(s);
const key=k=>k.id||k.url||('u'+k.uid);
/* PDF'ler uygulamanın yanındaki "pdf" klasöründen açılır (Drive'a gidilmez).
   Dosya adı: pdf/<kimlik>.pdf  –  klasörde hangi dosyaların bulunduğu pdf/liste.js içindeki window.PDF_VAR listesinde yazar. */
const VAR=new Set(window.PDF_VAR||[]);
const has=k=>!!(k.id&&VAR.has(k.id));
const viewUrl=k=>k.id?(has(k)?`pdf/${k.id}.pdf`:null):k.url;
const embedUrl=k=>has(k)?`pdf/${k.id}.pdf`:null;

/* ---------- kullanıcının eklediği kaynaklar (yalnızca bu cihazda, IndexedDB) ---------- */
let MINE=[];
const db=()=>new Promise((res,rej)=>{const r=indexedDB.open('anat-kaynak',1);r.onupgradeneeded=()=>r.result.createObjectStore('items',{keyPath:'uid'});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const tx=async(mode,fn)=>{const d=await db();return new Promise((res,rej)=>{const t=d.transaction('items',mode);const rq=fn(t.objectStore('items'));t.oncomplete=()=>res(rq&&rq.result);t.onerror=()=>rej(t.error)})};
async function loadMine(){try{MINE=(await tx('readonly',s=>s.getAll()))||[]}catch(e){MINE=[]}MINE.forEach(m=>m.mine=true);render()}
async function addMine(item){item.uid=Date.now()+'-'+Math.random().toString(36).slice(2,7);item.mine=true;await tx('readwrite',s=>s.put(item));MINE.push(item);render()}
async function delMine(uid){await tx('readwrite',s=>s.delete(uid));MINE=MINE.filter(m=>m.uid!==uid);render()}

const all=()=>[...LISTE,...MINE];
const find=k=>all().find(x=>key(x)===k);
const forLesson=l=>all().filter(k=>k.ders&&k.ders.includes(+l));

/* ---------- görüntüleyici ---------- */
let lastBlobUrl=null;
function open(k){const it=typeof k==='string'?find(k):k;if(!it)return;
  const v=$('#kview'),fr=$('#kframe');
  if(lastBlobUrl){URL.revokeObjectURL(lastBlobUrl);lastBlobUrl=null}
  let src=embedUrl(it),ext=viewUrl(it);
  if(it.blob){lastBlobUrl=URL.createObjectURL(it.blob);src=lastBlobUrl;ext=lastBlobUrl}
  if(it.id&&!it.blob&&!has(it)){toast('Bu kaynağın PDF dosyası henüz uygulamaya eklenmedi.');return}
  $('#ktitle').textContent=it.ad;$('#kext').href=ext||'#';$('#kext').hidden=!ext;
  if(!src){window.open(ext,'_blank','noopener');return} // gömülemeyen bağlantı: yeni sekmede
  $('#knote').textContent='Telefonda PDF burada görünmüyorsa “Yeni sekmede aç”a dokun.';
  fr.src=src;v.hidden=false;document.body.classList.add('kv-open');try{history.pushState({kv:1},'')}catch(e){}}
function close(){const v=$('#kview');if(v.hidden)return;v.hidden=true;$('#kframe').src='about:blank';document.body.classList.remove('kv-open');try{if(history.state&&history.state.kv)history.back()}catch(e){}}
window.addEventListener('popstate',()=>{const v=$('#kview');if(v&&!v.hidden){v.hidden=true;$('#kframe').src='about:blank';document.body.classList.remove('kv-open')}});

/* ---------- liste ---------- */
const F={tur:'all'};
const item=k=>`<div class="krow"><div class="kmain"><div class="kad">${esc(k.ad)}</div><div class="kmeta">${TUR[k.tur]||''}${k.ders&&k.ders.length?' · '+k.ders.map(l=>esc((LESSONS[l]||'').replace(/^Ders \d+\w? · /,''))).filter((x,i,a)=>a.indexOf(x)===i).join(', '):''}${k.used?' · <b>bu uygulamadaki bilgiler buradan</b>':''}${k.mine?' · <b>sen ekledin</b>':''}${k.not?'<br>'+esc(k.not):''}</div></div>
  <div class="kact">${k.id&&!k.blob&&!has(k)?'<span class="kyok">PDF henüz eklenmedi</span>':`<button class="btn" data-kaynak="${esc(key(k))}">${k.id||k.blob?'PDF’i aç':'Bağlantıya git'}</button>`}${k.mine?`<button class="btn ghost" data-kdel="${esc(k.uid)}">Sil</button>`:''}</div></div>`;
function render(){const el=$('#kwrap');if(!el)return;
  const list=all().filter(k=>F.tur==='all'||(F.tur==='mine'?k.mine:k.tur===F.tur));
  const cnt=t=>all().filter(k=>t==='all'||(t==='mine'?k.mine:k.tur===t)).length;
  $('#kfilter').innerHTML=[['all','Tümü'],['slayt','Ders slaytları'],['cikmis','Çıkmışlar'],['diger','Diğer'],['mine','Benim eklediklerim']].map(([k,v])=>`<button class="chip" data-kf="${k}" aria-pressed="${F.tur===k}">${v}<span class="cnt">${cnt(k)}</span></button>`).join('');
  const groups=[];
  const order=[...LORD].sort((a,b)=>{const ia=[1,2,4,3,5,6,7,8,9,10].indexOf(a),ib=[1,2,4,3,5,6,7,8,9,10].indexOf(b);return (ia<0?100+a:ia)-(ib<0?100+b:ib)});
  const seen=new Set();
  order.forEach(l=>{const xs=list.filter(k=>k.tur==='slayt'&&k.ders&&k.ders[0]===l);if(xs.length){xs.forEach(x=>seen.add(x));groups.push([LESSONS[l],xs])}});
  const rest=list.filter(k=>k.tur==='slayt'&&!seen.has(k));if(rest.length)groups.push(['Diğer ders slaytları (uygulamada henüz terimleri yok)',rest]);
  const ck=list.filter(k=>k.tur==='cikmis');if(ck.length)groups.unshift(['Çıkmış sorular',ck]);
  const dg=list.filter(k=>k.tur==='diger');if(dg.length)groups.push(['Diğer kaynaklar',dg]);
  el.innerHTML=groups.map(([h,xs])=>`<div class="card kgrp"><div class="label">${esc(h)}</div>${xs.map(item).join('')}</div>`).join('')||'<p class="qhint">Bu bölümde kaynak yok.</p>';
  const ds=$('#kders');if(ds&&!ds.options.length)ds.innerHTML='<option value="">Belirli bir ders değil</option>'+order.map(l=>`<option value="${l}">${esc(LESSONS[l])}</option>`).join('');
  const ob=$('#kortak');if(ob){ob.hidden=!ORTAK_KLASOR;ob.href=ORTAK_KLASOR||'#'}
  // sözlük açıksa oradaki kaynak satırlarını da tazele
  if(typeof renderDict==='function'&&!$('#p-dict').hidden){renderDict();renderDetail()}}

/* sözlükte: bir dersin kaynak düğmeleri */
function chips(l,max){const xs=forLesson(l).filter(k=>k.blob||has(k)||(!k.id&&k.url)).slice(0,max||6); // yalnız açılabilenler
  return xs.map(k=>`<button class="chip mini" data-kaynak="${esc(key(k))}">PDF · ${esc(k.ad)}</button>`).join('')}
function sec(l){const c=chips(l,5);return c?`<div class="dd-sec"><h3>Bu konunun slaytları</h3><div class="chips">${c}<button class="chip mini" data-go="src">Tüm kaynaklar →</button></div></div>`:''}
function row(l){const c=chips(l,4);return c?`<div class="chips hscroll" style="align-items:center"><span class="label" style="flex:none">Slayt</span>${c}</div>`:''}

/* ---------- olaylar ---------- */
document.addEventListener('click',e=>{
  const o=e.target.closest('[data-kaynak]');if(o){open(o.dataset.kaynak);return}
  const d=e.target.closest('[data-kdel]');if(d){if(confirm('Bu kaynak silinsin mi?'))delMine(d.dataset.kdel);return}
  const f=e.target.closest('[data-kf]');if(f){F.tur=f.dataset.kf;render();return}});
function bind(){
  $('#kclose').onclick=close;
  $('#kadd').onsubmit=async e=>{e.preventDefault();
    const ad=$('#kad').value.trim(),file=$('#kfile').files[0],url=$('#kurl').value.trim(),ders=$('#kders').value;
    if(!ad){toast('Kaynağa bir ad ver.');return}
    if(!file&&!url){toast('Bir PDF dosyası seç ya da bağlantı yapıştır.');return}
    if(file&&file.type!=='application/pdf'){toast('Yalnızca PDF dosyası yükleyebilirsin.');return}
    if(file&&file.size>60e6){toast('Dosya çok büyük (en fazla 60 MB).');return}
    if(!file&&!/^https?:\/\//i.test(url)){toast('Bağlantı https:// ile başlamalı.');return}
    const it={ad,tur:$('#ktur').value,ders:ders?[+ders]:[]};
    if(file)it.blob=file;else it.url=url;
    try{await addMine(it);e.target.reset();toast('Kaynak eklendi (yalnızca bu cihazda görünür).');F.tur='mine';render()}catch(err){toast('Kaynak saklanamadı. Tarayıcının depolama alanı dolu olabilir.')}};
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
bind();loadMine();
return {open,close,render,sec,row,forLesson,LISTE};
})();
