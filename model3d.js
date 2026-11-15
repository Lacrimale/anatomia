/* 3D MODEL – çevrilebilir anatomi görüntüleyici.
   Modeller: BodyParts3D, (c) The Database Center for Life Science, CC Attribution-Share Alike 2.1 Japan.
   Dosyalar internetten, seçilen bölgeye göre yüklenir (uygulamanın içinde saklanmaz). */
window.M3D=(function(){
'use strict';
const BASE='https://raw.githubusercontent.com/Kevin-Mattheus-Moerman/BodyParts3D/main/assets/BodyParts3D_data/stl/';
const urlOf=id=>BASE+(typeof id==='number'?'FMA'+id:id)+'.stl';
const k=(ids,la)=>({ids:[].concat(ids),la,t:'k'});
const m=(ids,la)=>({ids:[].concat(ids),la,t:'m'});

/* ortak kemik setleri (sağ taraf) */
const COX=k(16586,'Os coxae'),FEM=k(24474,'Femur'),PAT=k(24486,'Patella'),TIB=k(24477,'Tibia'),FIB=k(24480,'Fibula');
const FOOT=[k(24482,'Talus'),k(24497,'Calcaneus'),k(24500,'Os naviculare'),k(24528,'Os cuboideum'),k(24521,'Os cuneiforme mediale'),k(24523,'Os cuneiforme intermedium'),k(24525,'Os cuneiforme laterale'),
  k([24507,24509,24511,24513,24515],'Ossa metatarsi'),k([43253,32634,32636,32638,32640,32642,32644,32646,230986,32650,32652,32654,32656,32658],'Phalanges pedis')];
const CLA=k(13322,'Clavicula'),SCA=k(13395,'Scapula'),HUM=k(23130,'Humerus'),RAD=k(23464,'Radius'),ULN=k(23467,'Ulna');
const HAND=[k(24435,'Os scaphoideum'),k(24437,'Os lunatum'),k(24439,'Os triquetrum'),k(24441,'Os pisiforme'),k(24443,'Os trapezium'),k(23725,'Os trapezoideum'),k(24446,'Os capitatum'),k(24448,'Os hamatum'),
  k([24464,24466,24468,24470,24472],'Ossa metacarpi'),k([24450,24451,24452,24453,24454,24455,24456,24457,24458,24459,24460,24461,24462,24463],'Phalanges manus')];
const ATL=k(12519,'Atlas'),AXI=k(12520,'Axis'),CERV=k([12521,12522,12523,12524,12525],'Vertebrae cervicales'),
  THOR=k([9165,9187,9209,9248,9922,9945,9968,9991,10014,10037,10059,10081],'Vertebrae thoracicae'),LUMB=k([13072,13073,13074,13075,13076],'Vertebrae lumbales'),SAC=k(16202,'Os sacrum'),OCC=k(52735,'Os occipitale');

/* [ad, yaklaşık MB, yapılar] */
const SCENES={
 altk:['Alt ekstremite kemikleri',4,[COX,FEM,PAT,TIB,FIB,...FOOT]],
 ustk:['Üst ekstremite kemikleri',8,[CLA,SCA,HUM,RAD,ULN,...HAND]],
 kafa:['Kafatası',10,[k(52734,'Os frontale'),k([52788,52789],'Os parietale'),OCC,k([52738,52739],'Os temporale'),k(52736,'Os sphenoidale'),k(52740,'Os ethmoidale'),k([53649,53650],'Maxilla'),k(52748,'Mandibula'),
   k([52892,52893],'Os zygomaticum'),k([53647,53648],'Os nasale'),k([53645,53646],'Os lacrimale'),k([53655,53656],'Os palatinum'),k(9710,'Vomer'),k([54737,54738],'Concha nasalis inferior'),k(52749,'Os hyoideum')]],
 omurga:['Omurga',13,[ATL,AXI,CERV,THOR,LUMB,SAC]],
 gogus:['Göğüs kafesi (sağ kaburgalar)',26,[k(7486,'Manubrium sterni'),k(7487,'Corpus sterni'),k(7488,'Processus xiphoideus'),k([7857,7882,7909,7957,8066,8175,8229],'Costae verae'),k([8283,8364,8445],'Costae spuriae'),k([8531,8533],'Costae fluctuantes'),k('BP28','Cartilago costalis'),THOR]],
 kalca:['Kalça kasları',26,[m(22328,'M. gluteus maximus'),m(22330,'M. gluteus medius'),m(22332,'M. gluteus minimus'),m(22425,'M. tensor fasciae latae'),m(22340,'M. piriformis'),m(22334,'M. gemellus superior'),m(22324,'M. obturatorius internus'),m(22336,'M. gemellus inferior'),m(22338,'M. quadratus femoris'),m(22326,'M. obturatorius externus'),m(22322,'M. iliacus'),m(22342,'M. psoas major'),COX,FEM,SAC,LUMB]],
 uylukon:['Uyluk · ön ve iç kaslar',30,[m(22354,'M. sartorius'),m(38928,'M. rectus femoris'),m(38930,'M. vastus lateralis'),m(38932,'M. vastus medialis'),m(38934,'M. vastus intermedius'),m(43883,'M. gracilis'),m(22450,'M. pectineus'),m(22456,'M. adductor longus'),m(22452,'M. adductor brevis'),m(22459,'M. adductor magnus'),COX,FEM,PAT,TIB,FIB]],
 uylukarka:['Uyluk · arka kaslar (hamstring)',13,[m([45888,45891],'M. biceps femoris'),m(22358,'M. semitendinosus'),m(22448,'M. semimembranosus'),COX,FEM,TIB,FIB]],
 bacakon:['Bacak · ön ve dış kaslar',13,[m(22544,'M. tibialis anterior'),m(22546,'M. extensor hallucis longus'),m(22548,'M. extensor digitorum longus'),m(22550,'M. peroneus tertius'),m(22552,'M. peroneus longus'),m(22554,'M. peroneus brevis'),TIB,FIB,...FOOT]],
 bacakarka:['Bacak · arka kaslar',24,[m([45957,45960],'M. gastrocnemius'),m(22558,'M. soleus'),m(22560,'M. plantaris'),m(22591,'M. popliteus'),m(65014,'M. flexor hallucis longus'),m(65016,'M. flexor digitorum longus'),m(65018,'M. tibialis posterior'),FEM,TIB,FIB,...FOOT]],
 ayak:['Ayak kasları',10,[m(51142,'M. extensor digitorum brevis'),m(51144,'M. extensor hallucis brevis'),m(37459,'M. abductor hallucis'),m(37461,'M. flexor digitorum brevis'),m(37463,'M. abductor digiti minimi (pedis)'),m([37717,37719,37485,37483],'Mm. lumbricales (pedis)'),m(37465,'M. quadratus plantae'),m([45973,45971],'M. flexor hallucis brevis'),m([46018,46020],'M. adductor hallucis'),m(37471,'M. flexor digiti minimi brevis (pedis)'),m(74140,'Mm. interossei dorsales (pedis)'),m([37745,37743,37741],'Mm. interossei plantares'),...FOOT]],
 omuz:['Omuz kasları',22,[m([34680,34682,34684],'M. deltoideus'),m(32544,'M. supraspinatus'),m(32547,'M. infraspinatus'),m(32553,'M. teres minor'),m(13414,'M. subscapularis'),m(32551,'M. teres major'),m([34690,79979,45874],'M. pectoralis major'),m(13375,'M. pectoralis minor'),m(13412,'M. subclavius'),CLA,SCA,HUM]],
 kol:['Kol kasları',18,[m([37686,37684],'M. biceps brachii'),m(37668,'M. brachialis'),m(37665,'M. coracobrachialis'),m([37699,37697,37695],'M. triceps brachii'),m(37705,'M. anconeus'),SCA,HUM,RAD,ULN]],
 onkolf:['Önkol · fleksör kaslar',21,[m([38560,38562],'M. pronator teres'),m(38460,'M. flexor carpi radialis'),m(38463,'M. palmaris longus'),m([38617,38619],'M. flexor carpi ulnaris'),m([38638,38640],'M. flexor digitorum superficialis'),m(38479,'M. flexor digitorum profundus'),m(38482,'M. flexor pollicis longus'),m(38454,'M. pronator quadratus'),HUM,RAD,ULN,...HAND]],
 onkole:['Önkol · ekstensör kaslar',20,[m(38486,'M. brachioradialis'),m(38495,'M. extensor carpi radialis longus'),m(38498,'M. extensor carpi radialis brevis'),m(38501,'M. extensor digitorum'),m(38504,'M. extensor digiti minimi'),m(['BP45','BP47'],'M. extensor carpi ulnaris'),m(38513,'M. supinator'),m(38516,'M. abductor pollicis longus'),m(38522,'M. extensor pollicis longus'),m(38519,'M. extensor pollicis brevis'),m(38525,'M. extensor indicis'),HUM,RAD,ULN,...HAND]],
 el:['El kasları',6,[m(37386,'M. abductor pollicis brevis'),m(37390,'M. opponens pollicis'),m([65198,46110],'M. flexor pollicis brevis'),m([46121,46123],'M. adductor pollicis'),m(37396,'M. abductor digiti minimi (manus)'),m(37398,'M. flexor digiti minimi brevis (manus)'),m(37400,'M. opponens digiti minimi'),m(42398,'Mm. lumbricales (manus)'),m(42404,'Mm. interossei dorsales (manus)'),m(42402,'Mm. interossei palmares'),RAD,ULN,...HAND]],
 sirt:['Sırt · yüzeyel kaslar',48,[m([33586,33584,33581],'M. trapezius'),m(13358,'M. latissimus dorsi'),m(32540,'M. levator scapulae'),m(13381,'M. rhomboideus major'),m(13383,'M. rhomboideus minor'),m(13403,'M. serratus posterior superior'),m(13405,'M. serratus posterior inferior'),SCA,HUM,OCC,ATL,AXI,CERV,THOR,LUMB,SAC]],
 sirtderin:['Sırt · derin kaslar',52,[m(22728,'M. splenius capitis'),m(22726,'M. splenius cervicis'),m([22740,22742,22744],'M. iliocostalis'),m([22751,22757,22754],'M. longissimus'),m([22779,22781],'M. spinalis'),m([22872,22874,22876],'M. semispinalis'),m(22878,'Mm. multifidi'),m([23083,23089,81752],'Mm. rotatores'),OCC,ATL,AXI,CERV,THOR,LUMB,SAC]],
 subocc:['Suboksipital kaslar',4,[m(32530,'M. rectus capitis posterior major'),m(32532,'M. rectus capitis posterior minor'),m(32536,'M. obliquus capitis inferior'),m(32534,'M. obliquus capitis superior'),OCC,ATL,AXI,CERV]],
 boyun:['Boyun kökü kasları',12,[m([46283,46285,46287],'M. longus colli'),m(46309,'M. longus capitis'),m(46313,'M. rectus capitis anterior'),m(46317,'M. rectus capitis lateralis'),m(13392,'M. scalenus anterior'),m(13390,'M. scalenus medius'),m(13388,'M. scalenus posterior'),OCC,ATL,AXI,CERV,k([9165,9187,9209],'Vertebrae thoracicae'),k([7857,7882],'Costae verae')]],
 pelvis:['Pelvis döşemesi kasları',9,[m(45854,'M. pubococcygeus'),m(45856,'M. puborectalis'),m(45858,'M. iliococcygeus'),m(46443,'M. coccygeus'),m(22324,'M. obturatorius internus'),m(22340,'M. piriformis'),k([16586,16587],'Os coxae'),SAC]]
};

/* ---------- küçük matris yardımcıları ---------- */
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const nrm=a=>{const l=Math.hypot(a[0],a[1],a[2])||1;return [a[0]/l,a[1]/l,a[2]/l]};
function lookAt(e,c,u){const f=nrm(sub(c,e)),s=nrm(cross(f,u)),t=cross(s,f);
  return [s[0],t[0],-f[0],0, s[1],t[1],-f[1],0, s[2],t[2],-f[2],0, -dot(s,e),-dot(t,e),dot(f,e),1]}
function persp(fov,asp,n,f){const t=1/Math.tan(fov/2);return [t/asp,0,0,0, 0,t,0,0, 0,0,(f+n)/(n-f),-1, 0,0,2*f*n/(n-f),0]}
function mul(a,b){const o=new Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o}

/* ---------- durum ---------- */
const FOV=35*Math.PI/180;
const S={scene:null,objs:[],sel:-1,fade:true,noMus:false,hide:false,revealed:new Set(),cam:{yaw:0,pitch:0.1,dist:800,target:[0,0,0]},touched:false,loadId:0,loaded:0,total:0,bytes:0,failed:0,mode:'3d'};
let gl=null,prog=null,loc={},canvas=null,wrap=null,dirty=false,ready=false,glFail=false;
const $=s=>document.querySelector(s);
const cssVar=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
function hex(c){c=c.replace('#','');if(c.length===3)c=c.split('').map(x=>x+x).join('');const n=parseInt(c,16);return [(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}
function hsl(h,s,l){const a=s*Math.min(l,1-l),f=n=>{const q=(n+h/30)%12;return l-a*Math.max(-1,Math.min(q-3,9-q,1))};return [f(0),f(8),f(4)]}

function mkProg(g){ // gölgelendirici: hem büyük sahne hem sözlükteki küçük görünüm kullanır
  const sh=(type,src)=>{const s=g.createShader(type);g.shaderSource(s,src);g.compileShader(s);return s};
  const pr=g.createProgram();
  g.attachShader(pr,sh(g.VERTEX_SHADER,'attribute vec3 p;attribute vec3 n;uniform mat4 mvp;uniform mat4 mv;varying vec3 vn;void main(){vn=mat3(mv)*n;gl_Position=mvp*vec4(p,1.0);}'));
  g.attachShader(pr,sh(g.FRAGMENT_SHADER,'precision mediump float;varying vec3 vn;uniform vec3 col;uniform float alpha;void main(){vec3 N=normalize(vn);float d=abs(N.z);float l=0.30+0.70*d;float sp=pow(d,24.0)*0.12;gl_FragColor=vec4(col*l+sp,alpha);}'));
  g.linkProgram(pr);g.useProgram(pr);
  g.enable(g.DEPTH_TEST);g.blendFunc(g.SRC_ALPHA,g.ONE_MINUS_SRC_ALPHA);
  return {p:g.getAttribLocation(pr,'p'),n:g.getAttribLocation(pr,'n'),mvp:g.getUniformLocation(pr,'mvp'),mv:g.getUniformLocation(pr,'mv'),col:g.getUniformLocation(pr,'col'),alpha:g.getUniformLocation(pr,'alpha')}}
function initGL(){
  if(ready||glFail)return ready;
  canvas=$('#m3canvas');wrap=$('#m3stage');
  gl=canvas.getContext('webgl',{antialias:true,alpha:false})||canvas.getContext('experimental-webgl');
  if(!gl){glFail=true;$('#m3msg').textContent='Bu cihaz ya da tarayıcı 3D çizimi (WebGL) desteklemiyor. Şema görünümünü kullanabilirsin.';$('#m3msg').hidden=false;return false}
  loc=mkProg(gl);
  bindInput();
  if('ResizeObserver' in window)new ResizeObserver(()=>draw()).observe(wrap);else window.addEventListener('resize',draw);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault()});
  canvas.addEventListener('webglcontextrestored',()=>{ready=false;gl=null;const sc=S.scene;S.scene=null;initGL();if(sc)load(sc)});
  ready=true;return true}

/* ---------- STL ---------- */
function parseSTL(buf){
  const dv=new DataView(buf);if(buf.byteLength<84)throw new Error('stl');
  const n=dv.getUint32(80,true);if(84+n*50>buf.byteLength)throw new Error('stl');
  const pos=new Float32Array(n*9),nor=new Float32Array(n*9);
  const mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];let sx=0,sy=0,sz=0;
  for(let i=0;i<n;i++){const o=84+i*50,q=i*9;
    for(let v=0;v<3;v++){const b=o+12+v*12;
      // BodyParts3D: X sol(+)/sağ(−), Y arka(+)/ön(−), Z yukarı  →  ekran: x, y=Z, z=−Y
      const x=dv.getFloat32(b,true),y=dv.getFloat32(b+8,true),z=-dv.getFloat32(b+4,true);
      pos[q+v*3]=x;pos[q+v*3+1]=y;pos[q+v*3+2]=z;
      if(x<mn[0])mn[0]=x;if(y<mn[1])mn[1]=y;if(z<mn[2])mn[2]=z;if(x>mx[0])mx[0]=x;if(y>mx[1])mx[1]=y;if(z>mx[2])mx[2]=z;
      sx+=x;sy+=y;sz+=z}
    const ax=pos[q+3]-pos[q],ay=pos[q+4]-pos[q+1],az=pos[q+5]-pos[q+2],bx=pos[q+6]-pos[q],by=pos[q+7]-pos[q+1],bz=pos[q+8]-pos[q+2];
    let nx=ay*bz-az*by,ny=az*bx-ax*bz,nz=ax*by-ay*bx;const l=Math.hypot(nx,ny,nz)||1;nx/=l;ny/=l;nz/=l;
    for(let v=0;v<3;v++){nor[q+v*3]=nx;nor[q+v*3+1]=ny;nor[q+v*3+2]=nz}}
  return {pos,nor,n,mn,mx,sum:[sx,sy,sz]}}

async function fetchSTL(id,signal,onBytes){
  const url=urlOf(id);let cache=null;
  // önbellek hiçbir zaman indirmeyi kilitlememeli: okuma 2 sn içinde gelmezse doğrudan ağa gidilir
  const soon=(p,ms)=>Promise.race([p,new Promise(res=>setTimeout(()=>res(null),ms))]);
  try{if('caches' in window)cache=await soon(caches.open('bp3d-v2'),2000)}catch(e){}
  if(cache){try{const hit=await soon(cache.match(url),2000);if(hit){const b=await soon(hit.arrayBuffer(),4000);if(b&&b.byteLength>84){onBytes(b.byteLength);return b}}}catch(e){}}
  const r=await fetch(url,{signal});if(!r.ok)throw new Error('http '+r.status);
  let buf;
  if(!r.body||!r.body.getReader){buf=await r.arrayBuffer();onBytes(buf.byteLength)}
  else{const rd=r.body.getReader(),chunks=[];let n=0;
    for(;;){const {done,value}=await rd.read();if(done)break;chunks.push(value);n+=value.length;onBytes(value.length)}
    const out=new Uint8Array(n);let o=0;chunks.forEach(c=>{out.set(c,o);o+=c.length});buf=out.buffer}
  // yalnızca TAMAMEN inen dosya önbelleğe yazılır (yarım kalan indirme bozuk kayıt bırakmasın)
  if(cache){try{cache.put(url,new Response(buf.slice(0),{headers:{'content-type':'application/octet-stream'}})).catch(()=>{})}catch(e){}}
  return buf}
try{if('caches' in window)caches.delete('bp3d-v1').catch(()=>{})}catch(e){}

/* ---------- sahne yükleme ---------- */
function termOf(it){const c=TERMS.filter(t=>t.la===it.la);if(!c.length)return null;
  return c.find(t=>(catOf(t)==='kas')===(it.t==='m')&&catOf(t)!=='genel')||c[0]}
function freeScene(){S.objs.forEach(o=>o.meshes.forEach(ms=>{try{gl.deleteBuffer(ms.vp);gl.deleteBuffer(ms.vn)}catch(e){}}));S.objs=[]}
function load(key,first){
  if(!SCENES[key]||!initGL())return;
  if(S.ctrl)S.ctrl.abort();freeScene();
  const [name,mb,items]=SCENES[key];const id=++S.loadId;
  S.scene=key;S.sel=-1;S.touched=false;S.revealed.clear();S.loaded=0;S.failed=0;S.bytes=0;S.noMus=false;
  S.cam.yaw=['subocc','sirt','sirtderin','uylukarka','bacakarka','kalca'].includes(key)?Math.PI:0;S.cam.pitch=0.1; // arka grup sahneleri arkadan açılır
  const bone=hex('#F3E7BE');let mi=0;
  S.objs=items.map((it,i)=>({it,i,term:termOf(it),meshes:[],visible:true,done:0,
    color:it.t==='k'?bone:hsl(358+((mi++*37)%26)-8,0.52,0.44+((mi*53)%13)/100),mn:[1e9,1e9,1e9],mx:[-1e9,-1e9,-1e9],sum:[0,0,0],cnt:0,anchor:null}));
  const jobs=[];S.objs.forEach(o=>o.it.ids.forEach(fid=>jobs.push([o,fid])));
  jobs.sort((a,b)=>(a[0].it.t==='k'?0:1)-(b[0].it.t==='k'?0:1)); // önce kemikler
  S.total=jobs.length;S.jobs=jobs;S.ctrl=new AbortController();
  try{localStorage.setItem('anat-3d',key)}catch(e){}
  renderUI();status();draw();
  let lastS=0;const onBytes=n=>{if(id!==S.loadId)return;S.bytes+=n;const now=performance.now();if(now-lastS>300){lastS=now;status()}};
  if(first!=null){const mine=jobs.filter(j=>j[0].i===first),rest=jobs.filter(j=>j[0].i!==first);jobs.length=0;jobs.push(...mine,...rest)}
  const worker=async(pred)=>{while(jobs.length&&id===S.loadId&&(!pred||pred(jobs[0]))){const [o,fid]=jobs.shift();
    try{const buf=await fetchSTL(fid,S.ctrl.signal,onBytes);if(id!==S.loadId)return;
      const g=parseSTL(buf);
      const vp=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vp);gl.bufferData(gl.ARRAY_BUFFER,g.pos,gl.STATIC_DRAW);
      const vn=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vn);gl.bufferData(gl.ARRAY_BUFFER,g.nor,gl.STATIC_DRAW);
      o.meshes.push({vp,vn,count:g.n*3,pos:g.pos,mn:g.mn,mx:g.mx});
      for(let c=0;c<3;c++){o.mn[c]=Math.min(o.mn[c],g.mn[c]);o.mx[c]=Math.max(o.mx[c],g.mx[c]);o.sum[c]+=g.sum[c]}o.cnt+=g.n*3;
      o.done++;if(o.done===o.it.ids.length)setAnchor(o);
    }catch(e){if(id!==S.loadId||(e&&e.name==='AbortError'))return;S.failed++;o.done++}
    S.loaded++;if(!S.touched)fit();status();legend();if(o.i===S.sel)info();draw()}};
  const rest=()=>{if(id===S.loadId)for(let w=0;w<4;w++)worker()};
  // sözlükten gelindiyse önce istenen yapı tek başına iner (yavaş bağlantıda hemen görünsün), sonra diğerleri
  if(first!=null){const mine=j=>j[0].i===first;Promise.all([worker(mine),worker(mine),worker(mine)]).then(rest,rest)}else rest();
}
function setAnchor(o){ // ağırlık merkezine en yakın köşe: okun ucu yapının üzerinde kalsın
  if(!o.cnt)return;const c=[o.sum[0]/o.cnt,o.sum[1]/o.cnt,o.sum[2]/o.cnt];let best=1e18,a=c;
  o.meshes.forEach(ms=>{const p=ms.pos;for(let i=0;i<p.length;i+=9){const d=(p[i]-c[0])**2+(p[i+1]-c[1])**2+(p[i+2]-c[2])**2;if(d<best){best=d;a=[p[i],p[i+1],p[i+2]]}}});
  o.anchor=a}
function bounds(){const mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];let any=false;
  S.objs.forEach(o=>{if(!o.meshes.length)return;any=true;for(let c=0;c<3;c++){mn[c]=Math.min(mn[c],o.mn[c]);mx[c]=Math.max(mx[c],o.mx[c])}});
  return any?{mn,mx}:null}
function fit(){const b=bounds();if(!b)return;
  S.cam.target=[(b.mn[0]+b.mx[0])/2,(b.mn[1]+b.mx[1])/2,(b.mn[2]+b.mx[2])/2];
  const r=Math.hypot(b.mx[0]-b.mn[0],b.mx[1]-b.mn[1],b.mx[2]-b.mn[2])/2;
  const asp=(canvas.clientWidth||1)/(canvas.clientHeight||1);
  S.cam.dist=r/Math.sin(FOV/2)*(asp<1?1.05/Math.max(asp,0.55):1.02);S.radius=r}

/* ---------- çizim ---------- */
function camera(){const c=S.cam,cp=Math.cos(c.pitch);
  const eye=[c.target[0]+c.dist*Math.sin(c.yaw)*cp,c.target[1]+c.dist*Math.sin(c.pitch),c.target[2]+c.dist*Math.cos(c.yaw)*cp];
  const w=canvas.width,h=canvas.height,asp=w/h,r=S.radius||300;
  const view=lookAt(eye,c.target,[0,1,0]),proj=persp(FOV,asp,Math.max(c.dist-r*1.6,c.dist/200,1),c.dist+r*2.5);
  return {eye,view,proj,mvp:mul(proj,view),asp}}
function alphaOf(o){if(S.sel<0||!S.fade)return 1;if(o.i===S.sel)return 1;const s=S.objs[S.sel];
  return o.it.t==='m'?0.13:(s.it.t==='k'?0.28:1)}
function shown(o){return o.visible&&o.meshes.length&&!(S.noMus&&o.it.t==='m')}
function draw(){if(!ready||dirty)return;dirty=true;requestAnimationFrame(()=>{dirty=false;render()})}
function render(){
  if(!ready||$('#atlas3d').hidden||$('#p-atlas').hidden)return;
  const dpr=Math.min(window.devicePixelRatio||1,2),w=Math.max(1,Math.round(canvas.clientWidth*dpr)),h=Math.max(1,Math.round(canvas.clientHeight*dpr));
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;if(!S.touched)fit()}
  gl.viewport(0,0,w,h);const bg=hex(cssVar('--stage3d')||'#11224E');gl.clearColor(bg[0],bg[1],bg[2],1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  const cam=camera();S.last=cam;
  gl.uniformMatrix4fv(loc.mvp,false,new Float32Array(cam.mvp));gl.uniformMatrix4fv(loc.mv,false,new Float32Array(cam.view));
  const hl=hex(cssVar('--hl3d')||'#63DB85');
  const pass=(transparent)=>{S.objs.forEach(o=>{if(!shown(o))return;const a=alphaOf(o);if((a<1)!==transparent)return;
    const col=o.i===S.sel?hl:o.color;gl.uniform3f(loc.col,col[0],col[1],col[2]);gl.uniform1f(loc.alpha,a);
    o.meshes.forEach(ms=>{gl.bindBuffer(gl.ARRAY_BUFFER,ms.vp);gl.enableVertexAttribArray(loc.p);gl.vertexAttribPointer(loc.p,3,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ARRAY_BUFFER,ms.vn);gl.enableVertexAttribArray(loc.n);gl.vertexAttribPointer(loc.n,3,gl.FLOAT,false,0,0);
      gl.drawArrays(gl.TRIANGLES,0,ms.count)})})};
  gl.disable(gl.BLEND);gl.depthMask(true);pass(false);
  gl.enable(gl.BLEND);gl.depthMask(false);pass(true);gl.depthMask(true);
  label(cam)}
function project(p,cam){const m=cam.mvp,x=m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12],y=m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13],w=m[3]*p[0]+m[7]*p[1]+m[11]*p[2]+m[15];
  return [(x/w*0.5+0.5)*canvas.clientWidth,(1-(y/w*0.5+0.5))*canvas.clientHeight,w]}
function nameOf(o){return (S.hide&&!S.revealed.has(o.i))?'?':o.it.la}
function label(cam){
  const lb=$('#m3label'),ars=document.querySelectorAll('.m3ar'),ar={setAttribute:(k,v)=>ars.forEach(a=>a.setAttribute(k,v))};const o=S.objs[S.sel];
  if(!o||!o.anchor||!shown(o)){lb.hidden=true;ar.setAttribute('visibility','hidden');return}
  const [ax,ay,aw]=project(o.pick||o.anchor,cam),W=canvas.clientWidth,H=canvas.clientHeight;
  lb.hidden=false;lb.querySelector('b').textContent=nameOf(o);
  lb.querySelector('small').textContent=(S.hide&&!S.revealed.has(o.i))?'adını görmek için dokun':(o.term?o.term.tr.replace(/\s*\(.*\)/,''):'');
  const lw=lb.offsetWidth,lh=lb.offsetHeight,left=ax>W/2;
  const lx=left?8:W-lw-8,ly=Math.min(Math.max(ay-lh-36,8),H-lh-8);
  lb.style.transform=`translate(${lx}px,${ly}px)`;
  if(aw<=0||ax<0||ay<0||ax>W||ay>H){ar.setAttribute('visibility','hidden');return}
  const sx=left?lx+lw:lx,sy=ly+lh/2;
  ar.setAttribute('visibility','visible');ar.setAttribute('x1',sx);ar.setAttribute('y1',sy);ar.setAttribute('x2',ax);ar.setAttribute('y2',ay)}

/* ---------- seçme (ışın – üçgen) ---------- */
function pick(px,py){const cam=S.last;if(!cam)return null;
  const W=canvas.clientWidth,H=canvas.clientHeight,nx=px/W*2-1,ny=1-py/H*2,t=Math.tan(FOV/2);
  const f=nrm(sub(S.cam.target,cam.eye)),r=nrm(cross(f,[0,1,0])),u=cross(r,f);
  const d=nrm([f[0]+r[0]*nx*t*cam.asp+u[0]*ny*t,f[1]+r[1]*nx*t*cam.asp+u[1]*ny*t,f[2]+r[2]*nx*t*cam.asp+u[2]*ny*t]),e=cam.eye;
  let best=Infinity,hit=null;
  const box=(mn,mx)=>{let t0=-Infinity,t1=Infinity;for(let c=0;c<3;c++){const inv=1/d[c];let a=(mn[c]-e[c])*inv,b=(mx[c]-e[c])*inv;if(a>b){const q=a;a=b;b=q}if(a>t0)t0=a;if(b<t1)t1=b;if(t0>t1)return false}return t1>0&&t0<best};
  S.objs.forEach(o=>{if(!shown(o))return;
    o.meshes.forEach(ms=>{if(!box(ms.mn,ms.mx))return;const p=ms.pos;
      for(let i=0;i<p.length;i+=9){const e1x=p[i+3]-p[i],e1y=p[i+4]-p[i+1],e1z=p[i+5]-p[i+2],e2x=p[i+6]-p[i],e2y=p[i+7]-p[i+1],e2z=p[i+8]-p[i+2];
        const hx=d[1]*e2z-d[2]*e2y,hy=d[2]*e2x-d[0]*e2z,hz=d[0]*e2y-d[1]*e2x,a=e1x*hx+e1y*hy+e1z*hz;if(a>-1e-9&&a<1e-9)continue;
        const fi=1/a,sx=e[0]-p[i],sy=e[1]-p[i+1],sz=e[2]-p[i+2],uu=fi*(sx*hx+sy*hy+sz*hz);if(uu<0||uu>1)continue;
        const qx=sy*e1z-sz*e1y,qy=sz*e1x-sx*e1z,qz=sx*e1y-sy*e1x,vv=fi*(d[0]*qx+d[1]*qy+d[2]*qz);if(vv<0||uu+vv>1)continue;
        const tt=fi*(e2x*qx+e2y*qy+e2z*qz);if(tt>0.01&&tt<best){best=tt;hit={o,pt:[e[0]+d[0]*tt,e[1]+d[1]*tt,e[2]+d[2]*tt]}}}})});
  return hit}

/* ---------- dokunma / fare ---------- */
function bindInput(){
  const pts=new Map();let moved=0,t0=0,lastD=0,lastC=null;
  const rel=e=>{const r=canvas.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]};
  canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);
    if(pts.size===1){moved=0;t0=performance.now()}
    if(pts.size===2){const a=[...pts.values()];lastD=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);lastC=[(a[0][0]+a[1][0])/2,(a[0][1]+a[1][1])/2];moved=99}});
  canvas.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const p=pts.get(e.pointerId),dx=e.clientX-p[0],dy=e.clientY-p[1];pts.set(e.pointerId,[e.clientX,e.clientY]);
    if(pts.size===1){moved+=Math.abs(dx)+Math.abs(dy);if(moved<6)return;S.touched=true;
      if(e.shiftKey||e.buttons===2)pan(dx,dy);else{S.cam.yaw-=dx*0.008;S.cam.pitch=Math.max(-1.45,Math.min(1.45,S.cam.pitch+dy*0.008))}draw()}
    else if(pts.size===2){const a=[...pts.values()],dd=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]),c=[(a[0][0]+a[1][0])/2,(a[0][1]+a[1][1])/2];
      S.touched=true;if(lastD>0)zoom(lastD/dd);pan(c[0]-lastC[0],c[1]-lastC[1]);lastD=dd;lastC=c;draw()}});
  const up=e=>{if(!pts.has(e.pointerId))return;const was=pts.size;pts.delete(e.pointerId);
    if(was===1&&moved<6&&performance.now()-t0<500){const [x,y]=rel(e),h=pick(x,y);
      if(h){h.o.pick=h.pt;select(h.o.i,true)}else select(-1)}};
  canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',e=>pts.delete(e.pointerId));
  canvas.addEventListener('wheel',e=>{e.preventDefault();S.touched=true;zoom(Math.exp(e.deltaY*0.0012));draw()},{passive:false});
  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  canvas.addEventListener('dblclick',()=>{S.touched=false;fit();draw()})}
function zoom(f){const r=S.radius||300;S.cam.dist=Math.max(r*0.25,Math.min(r*12,S.cam.dist*f))}
function pan(dx,dy){const cam=S.last;if(!cam)return;const f=nrm(sub(S.cam.target,cam.eye)),r=nrm(cross(f,[0,1,0])),u=cross(r,f);
  const s=S.cam.dist*2*Math.tan(FOV/2)/canvas.clientHeight;
  for(let c=0;c<3;c++)S.cam.target[c]+=(-r[c]*dx+u[c]*dy)*s}

/* ---------- arayüz ---------- */
function select(i,fromTap){
  if(i>=0&&S.hide&&S.sel===i)S.revealed.add(i);
  if(i>=0&&!fromTap)S.objs[i].pick=null;
  if(i>=0&&S.jobs&&S.jobs.length){ // seçilen yapı henüz inmediyse sıranın başına al
    const mine=S.jobs.filter(j=>j[0].i===i),rest=S.jobs.filter(j=>j[0].i!==i);S.jobs.length=0;S.jobs.push(...mine,...rest)}
  S.sel=i;legend();info();draw();
  if(i>=0&&!fromTap){const row=document.querySelector(`#m3legend [data-i="${i}"]`);if(row)row.scrollIntoView({block:'nearest'})}}
function status(){const el=$('#m3status');if(!S.scene){el.textContent='';return}
  const mb=(S.bytes/1e6).toFixed(1);
  el.textContent=S.loaded<S.total?`Yükleniyor… ${S.loaded}/${S.total} parça · ${mb} MB`:(S.failed?`${S.failed} parça yüklenemedi (internet bağlantını kontrol et). `:'')+`${S.total-S.failed} parça yüklendi · ${mb} MB`;
  $('#m3bar').style.width=(S.total?S.loaded/S.total*100:0)+'%';$('#m3bar').parentNode.hidden=S.loaded>=S.total;
  $('#m3msg').hidden=!!S.scene}
function renderUI(){
  const chip=([key,[name,mb]])=>`<button class="chip mini" data-s="${key}" aria-pressed="${key===S.scene}">${name}<span class="cnt">≈${mb} MB</span></button>`;
  const all=Object.entries(SCENES),isBone=e=>e[1][2].every(it=>it.t==='k');
  $('#m3scenes').innerHTML=`<div class="m3grp"><span class="lname">Kemikler</span><div class="chips">${all.filter(isBone).map(chip).join('')}</div></div><div class="m3grp"><span class="lname">Kaslar</span><div class="chips">${all.filter(e=>!isBone(e)).map(chip).join('')}</div></div>`;
  const hasM=S.objs.some(o=>o.it.t==='m');
  $('#m3tools').innerHTML=S.scene?`<button class="chip mini" data-v="0">Önden</button><button class="chip mini" data-v="3.1416">Arkadan</button><button class="chip mini" data-v="-1.5708">Sağdan</button><button class="chip mini" data-v="1.5708">Soldan</button>
    <button class="chip mini" data-a="fade" aria-pressed="${S.fade}">Diğerlerini soluklaştır</button>${hasM?`<button class="chip mini" data-a="nomus" aria-pressed="${S.noMus}">Kasları gizle</button>`:''}
    <button class="chip mini" data-a="hide" aria-pressed="${S.hide}">İsimleri gizle (test)</button><button class="chip mini" data-a="all">Hepsini göster</button>`:'';
  legend();info()}
const EYE='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
function legend(){const el=$('#m3legend');if(!S.scene){el.innerHTML='';return}
  const rgb=c=>`rgb(${c.map(x=>Math.round(x*255)).join(',')})`;
  const row=o=>`<div class="m3row${o.i===S.sel?' act':''}${o.visible?'':' off'}"><button class="m3name" data-i="${o.i}"><span class="dot" style="background:${rgb(o.color)}"></span><span class="la">${esc(nameOf(o))}</span>${o.done<o.it.ids.length?'<small>yükleniyor…</small>':''}</button><button class="m3eye" data-eye="${o.i}" aria-label="${o.visible?'Gizle':'Göster'}" title="${o.visible?'Gizle':'Göster'}">${EYE}</button></div>`;
  const ms=S.objs.filter(o=>o.it.t==='m'),ks=S.objs.filter(o=>o.it.t==='k');
  el.innerHTML=(ms.length?`<div class="label">Kaslar</div>${ms.map(row).join('')}<div class="label" style="margin-top:8px">Kemikler</div>`:'')+ks.map(row).join('')}
function info(){const el=$('#m3info'),o=S.objs[S.sel];
  if(!o){el.innerHTML=S.scene?'<span class="qhint">Bir yapıya dokun ya da listeden seç; ok o yapıyı gösterir.</span>':'';return}
  if(S.hide&&!S.revealed.has(o.i)){el.innerHTML=`<div class="row"><span class="la" style="font-size:22px">?</span><button class="btn" id="m3reveal">Adını göster</button></div>`;$('#m3reveal').onclick=()=>{S.revealed.add(o.i);legend();info();draw();if(o.term)speak(o.term)};return}
  const t=o.term,d=t&&t.d,line=(lb,v)=>{const a=[].concat(v||[]).filter(Boolean);return a.length?`<div><span class="label">${lb}</span> ${a.map(rb).join(' ')}</div>`:''};
  el.innerHTML=`<div class="row" style="gap:10px;align-items:flex-start">${t?sayBtn(esc(t.id)):''}<div style="flex:1;min-width:0"><div class="la" style="font-size:24px;line-height:1.1">${esc(o.it.la)}</div>${t?`<div class="${d?'mn':'sl'}">${esc(t.tr)}</div>`:''}</div></div>
    ${o.done<o.it.ids.length?'<div class="qhint">Bu yapının modeli yükleniyor; inince parlak yeşil renkte ve okla gösterilecek.</div>':''}
    ${d?`<div class="m3facts">${line('Sinir',d.s)}${line('Fonksiyon',d.f)}</div>`:''}
    <div class="row">${t?`<button class="chip mini" data-dict="${esc(t.id)}">Sözlükte aç →</button>`:''}<button class="chip mini" id="m3hideSel">Bu yapıyı gizle</button></div>`;
  $('#m3hideSel').onclick=()=>{o.visible=false;S.sel=-1;legend();info();draw()}}

function bindUI(){
  $('#m3scenes').onclick=e=>{const b=e.target.closest('[data-s]');if(b&&b.dataset.s!==S.scene)load(b.dataset.s)};
  $('#m3tools').onclick=e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.v!==undefined){S.cam.yaw=+b.dataset.v;S.cam.pitch=0.08;S.touched=false;fit();draw();return}
    const a=b.dataset.a;if(a==='fade')S.fade=!S.fade;if(a==='nomus')S.noMus=!S.noMus;if(a==='hide'){S.hide=!S.hide;S.revealed.clear()}
    if(a==='all'){S.objs.forEach(o=>o.visible=true);S.noMus=false}
    renderUI();draw()};
  $('#m3legend').onclick=e=>{const eye=e.target.closest('[data-eye]');
    if(eye){const o=S.objs[+eye.dataset.eye];o.visible=!o.visible;if(!o.visible&&S.sel===o.i)S.sel=-1;legend();info();draw();return}
    const b=e.target.closest('[data-i]');if(b){const i=+b.dataset.i;S.objs[i].visible=true;select(i===S.sel&&!(S.hide&&!S.revealed.has(i))?-1:i)}};
  $('#atlasMode').onclick=e=>{const b=e.target.closest('[data-m]');if(b)setMode(b.dataset.m)};
  setMode((()=>{try{return localStorage.getItem('anat-gmode')||'3d'}catch(e){return '3d'}})())}
function setMode(md){S.mode=md==='2d'?'2d':'3d';
  document.querySelectorAll('#atlasMode [data-m]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===S.mode));
  $('#atlas3d').hidden=S.mode!=='3d';$('#atlas2d').hidden=S.mode!=='2d';
  try{localStorage.setItem('anat-gmode',S.mode)}catch(e){}
  if(S.mode==='3d'){renderUI();status();draw()}}

/* sözlükten çağrılır: bu terim hangi sahnede? */
function find(t){const isKas=catOf(t)==='kas';
  for(const [key,[, ,items]] of Object.entries(SCENES)){const i=items.findIndex(it=>it.la===t.la&&(it.t==='m')===isKas);if(i>=0)return {scene:key,i}}
  return null}
function show(t){const f=find(t);if(!f)return false;setMode('3d');
  if(S.scene!==f.scene)load(f.scene,f.i);
  S.hide=false;S.objs[f.i].visible=true;select(f.i);renderUI();
  const cv=$('#m3stage');if(cv)cv.scrollIntoView({block:'nearest'});return true}
function onShow(){if(S.mode==='3d'){renderUI();status();draw()}}

/* ---------- SÖZLÜKTEKİ KÜÇÜK KONUM GÖRÜNÜMÜ ----------
   locShow(kutu, {ctx:[dosyalar], hi:[vurgulanacak dosyalar], mark:fn(meshes)->[x,y,z]|null, view:'on'|'arka'|'dis'|'ic'|'ust'|'alt', label}) */
const L={gl:null,cv:null,loc:null,box:null,meshes:[],cam:{yaw:0,pitch:0.1,dist:500,target:[0,0,0]},mark:null,id:0,radius:200,last:null,fail:false,pend:false};
const VIEWS={on:[0,0.08],arka:[Math.PI,0.08],dis:[-Math.PI/2,0.08],ic:[Math.PI/2,0.08],ust:[0,1.25],alt:[0,-1.25],ondis:[-0.7,0.1],onic:[0.7,0.1],arkadis:[-2.4,0.1],arkaic:[2.4,0.1]};
function locInit(){
  if(L.cv)return !!L.gl;
  L.cv=document.createElement('canvas');
  const g=L.cv.getContext('webgl',{antialias:true,alpha:false})||L.cv.getContext('experimental-webgl');
  if(!g){L.fail=true;return false}
  L.gl=g;L.loc=mkProg(g);
  let pid=null,px=0,py=0;
  L.cv.addEventListener('pointerdown',e=>{pid=e.pointerId;px=e.clientX;py=e.clientY;try{L.cv.setPointerCapture(pid)}catch(_){}});
  L.cv.addEventListener('pointermove',e=>{if(e.pointerId!==pid)return;const dx=e.clientX-px,dy=e.clientY-py;px=e.clientX;py=e.clientY;
    L.cam.yaw-=dx*0.01;L.cam.pitch=Math.max(-1.45,Math.min(1.45,L.cam.pitch+dy*0.01));locDraw()});
  const end=e=>{if(e.pointerId===pid){pid=null;locDraw(true)}};
  L.cv.addEventListener('pointerup',end);L.cv.addEventListener('pointercancel',end);
  L.cv.addEventListener('webglcontextlost',e=>e.preventDefault());
  return true}
function locEye(){const c=L.cam,cp=Math.cos(c.pitch);return [c.target[0]+c.dist*Math.sin(c.yaw)*cp,c.target[1]+c.dist*Math.sin(c.pitch),c.target[2]+c.dist*Math.cos(c.yaw)*cp]}
/* işaretli nokta, bu göz konumundan bakınca kemiğin arkasında mı kalıyor? (ışın – üçgen) */
function locOcc(eye){const p=L.mark;if(!p)return false;
  const d=nrm(sub(p,eye)),dist=Math.hypot(p[0]-eye[0],p[1]-eye[1],p[2]-eye[2]);
  for(const m of L.meshes){const q=m.pos;for(let i=0;i<q.length;i+=9){const e1x=q[i+3]-q[i],e1y=q[i+4]-q[i+1],e1z=q[i+5]-q[i+2],e2x=q[i+6]-q[i],e2y=q[i+7]-q[i+1],e2z=q[i+8]-q[i+2];
      const hx=d[1]*e2z-d[2]*e2y,hy=d[2]*e2x-d[0]*e2z,hz=d[0]*e2y-d[1]*e2x,a=e1x*hx+e1y*hy+e1z*hz;if(a>-1e-9&&a<1e-9)continue;
      const fi=1/a,tx=eye[0]-q[i],ty=eye[1]-q[i+1],tz=eye[2]-q[i+2],uu=fi*(tx*hx+ty*hy+tz*hz);if(uu<0||uu>1)continue;
      const qx=ty*e1z-tz*e1y,qy=tz*e1x-tx*e1z,qz=tx*e1y-ty*e1x,vv=fi*(d[0]*qx+d[1]*qy+d[2]*qz);if(vv<0||uu+vv>1)continue;
      const tt=fi*(e2x*qx+e2y*qy+e2z*qz);if(tt>0.01&&tt<dist-2.5)return true}}
  return false}
function locFree(){const g=L.gl;if(g)L.meshes.forEach(m=>{try{g.deleteBuffer(m.vp);g.deleteBuffer(m.vn)}catch(e){}});L.meshes=[];L.mark=null}
function locMsg(t){const el=L.box&&L.box.querySelector('.locmsg');if(el)el.textContent=t||''}
function locView(v){const a=VIEWS[v]||VIEWS.on;L.cam.yaw=a[0];L.cam.pitch=a[1];locDraw(true)}
async function locShow(box,spec){
  if(!locInit()){const m=box.querySelector('.locmsg');if(m)m.textContent='Bu cihaz 3D çizimi desteklemiyor.';return}
  const id=++L.id;L.box=box;box.insertBefore(L.cv,box.firstChild);locFree();
  const lb=box.querySelector('.loclabel');if(lb)lb.textContent=spec.label||'';
  box.querySelectorAll('.locview button').forEach(b=>b.onclick=()=>locView(b.dataset.lv));
  locMsg('Model yükleniyor…');locDraw();
  const jobs=[...(spec.ctx||[]).map(f=>[f,false]),...(spec.hi||[]).map(f=>[f,true])];
  try{
    const res=await Promise.all(jobs.map(async([fid,hi])=>[parseSTL(await fetchSTL(fid,undefined,()=>{})),hi]));
    if(id!==L.id)return;const g=L.gl;
    res.forEach(([m,hi])=>{const vp=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,vp);g.bufferData(g.ARRAY_BUFFER,m.pos,g.STATIC_DRAW);
      const vn=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,vn);g.bufferData(g.ARRAY_BUFFER,m.nor,g.STATIC_DRAW);
      L.meshes.push({vp,vn,count:m.n*3,pos:m.pos,mn:m.mn,mx:m.mx,sum:m.sum,hi})});
    const mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];L.meshes.forEach(m=>{for(let c=0;c<3;c++){mn[c]=Math.min(mn[c],m.mn[c]);mx[c]=Math.max(mx[c],m.mx[c])}});
    L.cam.target=[(mn[0]+mx[0])/2,(mn[1]+mx[1])/2,(mn[2]+mx[2])/2];L.radius=Math.hypot(mx[0]-mn[0],mx[1]-mn[1],mx[2]-mn[2])/2;L.fit=true;
    try{L.mark=spec.mark?spec.mark(L.meshes):null}catch(e){L.mark=null}
    // kemik parçası gösteriliyorsa işaretli yere doğru biraz yaklaş (kemiğin büyük kısmı yine görünür)
    L.zoom=1;if(L.mark&&!(spec.hi&&spec.hi.length)){L.zoom=0.6;for(let c=0;c<3;c++)L.cam.target[c]+=(L.mark[c]-L.cam.target[c])*0.5}
    // önce önerilen açı; işaret arkada kalıyorsa görünen ilk açıya geç
    L.cam.dist=L.radius/Math.sin(FOV/2);let pick=VIEWS[spec.view]?spec.view:'on';
    if(L.mark){for(const v of [pick,'on','arka','ondis','onic','arkadis','arkaic','dis','ic','ust','alt']){const a=VIEWS[v];L.cam.yaw=a[0];L.cam.pitch=a[1];if(!locOcc(locEye())){pick=v;break}}}
    const a=VIEWS[pick];L.cam.yaw=a[0];L.cam.pitch=a[1];L.view=pick;
    locMsg('');locDraw(true);
  }catch(e){if(id===L.id)locMsg('Resim yüklenemedi. Bunun için internet bağlantısı gerekir.')}}
function locDraw(check){if(!L.gl||L.pend&&!check)return;L.pend=true;requestAnimationFrame(()=>{L.pend=false;locRender(check)})}
function locRender(check){
  const g=L.gl,cv=L.cv;if(!g||!cv.isConnected)return;
  const dpr=Math.min(window.devicePixelRatio||1,2),w=Math.max(1,Math.round(cv.clientWidth*dpr)),h=Math.max(1,Math.round(cv.clientHeight*dpr));
  if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}
  const asp=w/h;if(L.fit){L.cam.dist=L.radius/Math.sin(FOV/2)*1.38*(L.zoom||1)*(asp<0.8?1.0/Math.max(asp,0.45):1.0)} // ok ve etiket için kenarda boşluk kalsın
  g.viewport(0,0,w,h);const bg=hex(cssVar('--stage3d')||'#11224E');g.clearColor(bg[0],bg[1],bg[2],1);g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);
  const c=L.cam,cp=Math.cos(c.pitch),eye=[c.target[0]+c.dist*Math.sin(c.yaw)*cp,c.target[1]+c.dist*Math.sin(c.pitch),c.target[2]+c.dist*Math.cos(c.yaw)*cp];
  const view=lookAt(eye,c.target,[0,1,0]),proj=persp(FOV,asp,Math.max(c.dist-L.radius*1.6,c.dist/200,1),c.dist+L.radius*2.5),mvp=mul(proj,view);
  g.uniformMatrix4fv(L.loc.mvp,false,new Float32Array(mvp));g.uniformMatrix4fv(L.loc.mv,false,new Float32Array(view));
  const bone=hex('#F3E7BE'),hl=hex(cssVar('--hl3d')||'#B9F04C');g.disable(g.BLEND);g.depthMask(true);
  L.meshes.forEach(m=>{const col=m.hi?hl:bone;g.uniform3f(L.loc.col,col[0],col[1],col[2]);g.uniform1f(L.loc.alpha,1);
    g.bindBuffer(g.ARRAY_BUFFER,m.vp);g.enableVertexAttribArray(L.loc.p);g.vertexAttribPointer(L.loc.p,3,g.FLOAT,false,0,0);
    g.bindBuffer(g.ARRAY_BUFFER,m.vn);g.enableVertexAttribArray(L.loc.n);g.vertexAttribPointer(L.loc.n,3,g.FLOAT,false,0,0);
    g.drawArrays(g.TRIANGLES,0,m.count)});
  // ok ve halka
  const box=L.box,ln=box&&box.querySelectorAll('.locar'),ring=box&&box.querySelector('.locring');if(!box||!ring)return;
  const hide=()=>{ln.forEach(a=>a.setAttribute('visibility','hidden'));ring.setAttribute('visibility','hidden')};
  if(!L.mark){hide();return}
  const p=L.mark,W=cv.clientWidth,H=cv.clientHeight,x=mvp[0]*p[0]+mvp[4]*p[1]+mvp[8]*p[2]+mvp[12],y=mvp[1]*p[0]+mvp[5]*p[1]+mvp[9]*p[2]+mvp[13],ww=mvp[3]*p[0]+mvp[7]*p[1]+mvp[11]*p[2]+mvp[15];
  if(ww<=0){hide();return}
  const sx=(x/ww*0.5+0.5)*W,sy=(1-(y/ww*0.5+0.5))*H;
  // okun başlangıcı: işaretin ekran merkezine göre dış tarafında, 70 px uzakta
  let dx=sx-W/2,dy=sy-H/2;const dl=Math.hypot(dx,dy)||1;if(dl<12){dx=-0.7;dy=-0.7}else{dx/=dl;dy/=dl}
  let ax=sx+dx*78,ay=sy+dy*78;ax=Math.min(Math.max(ax,10),W-10);ay=Math.min(Math.max(ay,44),H-26);
  if(Math.hypot(ax-sx,ay-sy)<40){ax=sx-dx*78;ay=sy-dy*78;ax=Math.min(Math.max(ax,10),W-10);ay=Math.min(Math.max(ay,44),H-26)}
  const k=9/(Math.hypot(sx-ax,sy-ay)||1); // ok ucu halkanın kenarında bitsin
  ln.forEach(a=>{a.setAttribute('visibility','visible');a.setAttribute('x1',ax);a.setAttribute('y1',ay);a.setAttribute('x2',sx-(sx-ax)*k);a.setAttribute('y2',sy-(sy-ay)*k)});
  ring.setAttribute('visibility','visible');ring.setAttribute('cx',sx);ring.setAttribute('cy',sy);
  if(check){ // işaretli yer kemiğin arkasında mı kalıyor?
    const occ=locOcc(eye);
    L.occ=occ;locMsg(occ?'İşaretli yer bu açıdan arkada kalıyor; sürükleyerek çevir ya da başka bir yönden bak.':'Sürükleyerek çevirebilirsin.')}
  ln.forEach(a=>a.setAttribute('stroke-dasharray',L.occ?'5 5':'none'));ring.setAttribute('stroke-dasharray',L.occ?'4 4':'none')}

bindUI();
return {find,show,onShow,load,setMode,SCENES,S,loc:locShow,locView,L};
})();
