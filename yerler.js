/* YERLER – bir terimin kemik üzerindeki yeri (sözlükteki oklu “Nerede?” resmi için).
   Konumlar elle çizilmez; 3D kemik modelinden kurala göre bulunur:
     E(y0,y1,[dış,yukarı,ön],s0,s1): kemiğin y0–y1 yükseklik diliminde, verilen yönde en uçtaki nokta
                                     (s0–s1 verilirse dilimin iç(0)→dış(1) genişliğinin yalnız o kısmında aranır)
     Q(y0,y1,[u,v,w]):               aynı dilimin içinde u (iç 0 → dış 1), v (alt 0 → üst 1), w (arka 0 → ön 1)
                                     ile verilen noktaya en yakın yüzey noktası (0–1 dışı değerler “kemiğin dışından yaklaş” demektir)
   Yükseklik: 0 = kemiğin en alt ucu, 1 = en üst ucu. Modeller sağ taraf kemikleridir. */
window.YER=(function(){
'use strict';
const E=(y0,y1,e,s0,s1)=>({y:[y0,y1],e,s:s0===undefined?null:[s0,s1]});
const Q=(y0,y1,q)=>({y:[y0,y1],q});
const A=(f,ad,sp)=>Object.assign(sp,{f:[].concat(f),ad}); // gruptaki varsayılandan farklı bir kemik üzerinde göster
const KEMIK={
 hum:{f:23130,ad:'Humerus',t:{
  "Caput humeri":E(.88,1,[-1,.5,-.2]),"Collum anatomicum":Q(.9,1,[.5,1.15,.5]),"Collum chirurgicum":Q(.8,.86,[.5,.5,1.4]),
  "Tuberculum majus":E(.88,1,[1,.3,0]),"Tuberculum minus":E(.88,.97,[-.2,0,1]),"Sulcus intertubercularis":Q(.84,.92,[.72,.5,1.3]),
  "Crista tuberculi majoris":Q(.76,.84,[.85,.5,1.2]),"Crista tuberculi minoris":Q(.76,.84,[.35,.5,1.2]),
  "Tuberositas deltoidea":E(.5,.62,[1,0,.2]),"Sulcus nervi radialis":Q(.5,.62,[.6,.5,-.4]),
  "Crista supracondylaris medialis":E(.12,.2,[-1,0,0]),"Crista supracondylaris lateralis":E(.12,.2,[1,0,0]),
  "Epicondylus lateralis":E(.04,.1,[1,0,0]),"Epicondylus medialis":E(.03,.1,[-1,0,0]),
  "Capitulum humeri":Q(0,.06,[.78,.3,1.2]),"Trochlea humeri":Q(0,.06,[.32,-.3,.6]),
  "Fossa coronoidea":Q(.05,.1,[.38,.5,1.4]),"Fossa radialis":Q(.05,.1,[.72,.5,1.4]),
  "Fossa olecrani":Q(.04,.1,[.48,.5,-.5]),"Sulcus nervi ulnaris":Q(.02,.07,[.04,.5,-.3])}},
 fem:{f:24474,ad:'Femur',t:{
  "Caput femoris":E(.86,1,[-1,.4,0]),"Fovea capitis femoris":E(.9,.96,[-1,-.1,-.1]),"Collum femoris":Q(.86,.94,[.4,.5,1.3]),
  "Trochanter major":E(.86,1,[1,.7,0]),"Trochanter minor":E(.77,.86,[-.6,0,-1]),
  "Linea intertrochanterica":Q(.84,.92,[.62,.5,1.3]),"Crista intertrochanterica":Q(.84,.92,[.62,.5,-.3]),
  "Fossa trochanterica":Q(.9,.95,[.8,.6,.05]),"Tuberculum quadratum":Q(.86,.92,[.62,.5,-.35]),
  "Corpus femoris":Q(.45,.55,[.5,.5,1.4]),"Linea pectinea":Q(.74,.82,[.3,.5,-.3]),"Tuberositas glutea":Q(.72,.8,[.9,.5,-.3]),
  "Linea aspera":Q(.45,.55,[.5,.5,-.5]),"Labium mediale lineae asperae":Q(.45,.55,[.3,.5,-.5]),"Labium laterale lineae asperae":Q(.45,.55,[.7,.5,-.5]),
  "Facies poplitea":Q(.1,.18,[.5,.5,-.5]),"Linea supracondylaris medialis":Q(.16,.24,[.15,.5,-.3]),"Linea supracondylaris lateralis":Q(.16,.24,[.85,.5,-.3]),
  "Tuberculum adductorium":E(.1,.15,[-1,.3,0]),"Epicondylus medialis":E(.05,.11,[-1,0,0]),"Epicondylus lateralis":E(.05,.11,[1,0,0]),
  "Condylus medialis":E(0,.08,[0,-1,-.4],0,.4),"Condylus lateralis":E(0,.08,[0,-1,-.4],.6,1),
  "Fossa intercondylaris":Q(0,.09,[.5,.45,-.1]),"Facies patellaris":Q(0,.1,[.5,.6,1.3])}},
 tib:{f:24477,ad:'Tibia',t:{
  "Condylus medialis":E(.9,1,[-1,0,0]),"Condylus lateralis":E(.9,1,[1,0,0]),"Facies articularis superior":Q(.93,1,[.28,1.3,.5]),
  "Eminentia intercondylaris":E(.95,1,[0,1,0],.35,.65),"Tuberculum intercondylare mediale":E(.95,1,[0,1,0],.3,.5),"Tuberculum intercondylare laterale":E(.95,1,[0,1,0],.5,.7),
  "Area intercondylaris anterior":Q(.95,1,[.5,1.2,.85]),"Area intercondylaris posterior":Q(.95,1,[.5,1.2,.15]),
  "Tuberositas tibiae":E(.82,.9,[0,0,1]),"Tuberculum tractus iliotibialis":Q(.9,.96,[.85,.5,.9]),
  "Linea musculi solei":Q(.7,.82,[.5,.5,-.3]),"Sulcus tendinis musculi semimembranosi":Q(.92,.97,[.08,.5,.2]),
  "Facies medialis":Q(.4,.6,[-.2,.5,.7]),"Facies lateralis":Q(.4,.6,[1.2,.5,.6]),"Facies posterior":Q(.4,.6,[.5,.5,-.3]),
  "Margo anterior":E(.4,.6,[0,0,1]),"Margo medialis":E(.4,.6,[-1,0,-.3]),"Margo interosseus":E(.4,.6,[1,0,-.2]),
  "Malleolus medialis":E(0,.05,[-.4,-1,0]),"Facies articularis malleoli medialis":Q(0,.06,[.32,.4,.5]),
  "Facies articularis inferior":Q(0,.08,[.6,-.3,.5]),"Sulcus malleolaris":Q(0,.08,[.1,.6,-.3]),"Incisura fibularis":E(.02,.1,[1,0,0])}},
 fib:{f:24480,ad:'Fibula',t:{
  "Apex capitis fibulae":E(.95,1,[0,1,0]),"Caput fibulae":Q(.93,.99,[1.2,.5,.5]),"Collum fibulae":Q(.88,.93,[1.2,.5,.5]),
  "Facies lateralis":Q(.4,.6,[1.3,.5,.5]),"Facies medialis":Q(.4,.6,[-.3,.5,.6]),"Facies posterior":Q(.4,.6,[.5,.5,-.3]),
  "Margo anterior":E(.4,.6,[0,0,1]),"Margo interosseus":E(.4,.6,[-1,0,.3]),"Margo posterior":E(.4,.6,[.3,0,-1]),"Crista medialis":E(.4,.6,[-1,0,-.6]),
  "Malleolus lateralis":E(0,.06,[.3,-1,0]),"Facies articularis malleoli lateralis":Q(.02,.08,[-.2,.5,.6]),"Fossa malleoli lateralis":Q(0,.06,[.1,.5,-.2])}},
 uln:{f:23467,ad:'Ulna',t:{
  "Olecranon":E(.95,1,[0,1,-.3]),"Incisura trochlearis":Q(.94,.99,[.5,.5,1.2]),"Processus coronoideus":E(.85,.92,[0,0,1]),
  "Incisura radialis":Q(.86,.92,[1.2,.5,.6]),"Tuberositas ulnae":Q(.82,.87,[.5,.5,1.2]),
  "Facies anterior":Q(.4,.6,[.5,.5,1.3]),"Margo anterior":E(.4,.6,[-.3,0,1]),"Margo interosseus":E(.4,.6,[1,0,0]),
  "Caput ulnae":E(0,.06,[.5,-1,.3]),"Processus styloideus ulnae":E(0,.04,[-.5,-1,-.5])}},
 rad:{f:23464,ad:'Radius',t:{
  "Caput radii":Q(.95,1,[.5,1.3,.5]),"Collum radii":Q(.9,.94,[1.2,.5,.5]),"Tuberositas radii":E(.82,.9,[-1,0,.3]),
  "Facies anterior":Q(.4,.6,[.5,.5,1.3]),"Facies posterior":Q(.4,.6,[.5,.5,-.3]),"Facies lateralis":Q(.4,.6,[1.3,.5,.5]),
  "Margo anterior":E(.4,.6,[.3,0,1]),"Margo posterior":E(.4,.6,[.3,0,-1]),"Margo interosseus":E(.4,.6,[-1,0,0]),
  "Tuberculum dorsale":E(.02,.08,[0,0,-1]),"Processus styloideus radii":E(0,.04,[.6,-1,0]),
  "Incisura ulnaris":E(.01,.07,[-1,0,0]),"Facies articularis carpalis":Q(0,.04,[.5,-.4,.5])}},
 oxc:{f:16586,ad:'Os coxae',t:{
  "Crista iliaca":E(.9,1,[0,1,0]),"Labium externum":Q(.9,1,[1.2,.7,.5]),"Labium internum":Q(.9,1,[-.1,.6,.5]),"Linea intermedia":E(.9,1,[0,1,.1]),
  "Tuberculum iliacum":E(.85,1,[1,.3,.3]),"Ala ossis ilii":Q(.6,.95,[1.2,.5,.5]),"Fossa iliaca":Q(.65,.95,[.3,.5,1.2]),"Corpus ossis ilii":Q(.45,.6,[1.2,.5,.5]),
  "Linea glutea posterior":Q(.6,.95,[1.2,.5,.15]),"Linea glutea anterior":Q(.6,.95,[1.2,.5,.55]),"Linea glutea inferior":Q(.5,.65,[1.2,.5,.5]),
  "Spina iliaca anterior superior":E(.62,.8,[.2,0,1]),"Spina iliaca anterior inferior":E(.5,.6,[0,0,1]),
  "Spina iliaca posterior superior":E(.7,.85,[0,0,-1]),"Spina iliaca posterior inferior":E(.58,.68,[0,0,-1]),
  "Tuberositas iliaca":Q(.74,.9,[-.2,.5,.18]),"Facies auricularis":Q(.6,.78,[-.3,.5,.2]),"Linea arcuata":Q(.5,.62,[-.2,.5,.6]),
  "Incisura ischiadica major":Q(.42,.6,[.5,.5,-.3]),"Spina ischiadica":E(.3,.45,[-.3,0,-1]),"Incisura ischiadica minor":Q(.18,.3,[.4,.5,-.3]),
  "Corpus ossis ischii":Q(.25,.4,[1.2,.5,.3]),"Tuber ischiadicum":E(0,.12,[0,-1,-.4]),"Ramus ossis ischii":Q(.02,.15,[.1,.5,.75]),
  "Acetabulum":Q(.3,.5,[1.4,.5,.55]),"Facies lunata":Q(.4,.52,[1.4,.8,.55]),"Margo acetabuli":E(.3,.52,[1,0,0]),"Incisura acetabuli":Q(.3,.38,[1.3,.3,.5]),
  "Ramus superior ossis pubis":Q(.3,.42,[.15,.6,1.2]),"Ramus inferior ossis pubis":Q(.08,.22,[-.1,.5,.9]),
  "Tuberculum pubicum":E(.3,.38,[-.6,.4,1],0,.3),"Pecten ossis pubis":Q(.34,.44,[.25,1.2,.8]),"Eminentia iliopubica":Q(.4,.5,[.45,.8,1.2]),
  "Facies symphysialis":E(.15,.4,[-1,0,.3]),"Crista obturatoria":Q(.3,.38,[.3,.2,1]),"Sulcus obturatorius":Q(.3,.38,[.3,.1,.9]),"Foramen obturatum":Q(.15,.3,[.35,.5,.8])}},
 skp:{f:13395,ad:'Scapula',t:{
  "Acromion":E(.85,1,[1,.5,0]),"Processus coracoideus":E(.8,1,[.3,0,1]),"Angulus superior":E(.85,1,[-1,1,0]),"Angulus inferior":E(0,.1,[0,-1,0]),
  "Margo superior":Q(.85,.97,[.35,1.2,.5]),"Margo medialis":E(.3,.6,[-1,0,0]),"Margo lateralis":E(.3,.55,[1,0,0]),
  "Incisura scapulae":Q(.85,.95,[.6,1.1,.6]),"Collum scapulae":Q(.68,.8,[.8,.5,-.2]),"Fossa subscapularis":Q(.3,.7,[.4,.5,1.3]),
  "Cavitas glenoidalis":Q(.68,.8,[1.3,.5,.55]),"Tuberculum infraglenoidale":E(.6,.67,[1,0,0]),"Tuberculum supraglenoidale":Q(.8,.85,[1.1,1,.6]),
  "Spina scapulae":Q(.7,.85,[.4,.5,-.4]),"Angulus acromii":E(.85,1,[1,0,-1])}},

 /* ---- OMURGA: orta hat kemikleri. u = 0.5 orta hat, 1’e doğru sağ yan. Örnek omur: L3 (genel yapı), C5, T6 ---- */
 cvg:{f:13074,ad:'3. bel omuru (örnek omur)',t:{
  "Corpus vertebrae":Q(0,1,[.5,.5,1.2]),"Processus spinosus":E(0,1,[0,0,-1]),"Processus transversus":E(0,1,[1,0,0]),
  "Processus articularis superior":E(.75,1,[.25,1,-.4],.55,1),"Processus articularis inferior":E(0,.3,[.2,-1,-.5],.58,.8),
  "Foramen vertebrale":Q(0,1,[.5,.5,.47]),"Arcus vertebrae":Q(0,1,[.62,.5,.3]),"Lamina arcus vertebrae":Q(0,1,[.6,.5,.28]),
  "Pediculus arcus vertebrae":Q(0,1,[.7,.6,.52]),"Incisura vertebralis superior":Q(0,1,[.7,.85,.52]),"Incisura vertebralis inferior":Q(0,1,[.7,.2,.5])}},
 cvc:{f:12523,ad:'5. boyun omuru',t:{
  "Foramen transversarium":Q(0,1,[.86,.5,.62]),"Sulcus nervi spinalis":Q(0,1,[.9,1.2,.6]),"Processus uncinatus":Q(0,1,[.72,1.2,.8]),
  "Massa lateralis atlantis":A(12519,'Atlas',Q(0,1,[.8,1.2,.55])),"Arcus anterior atlantis":A(12519,'Atlas',Q(0,1,[.62,.5,1.2])),
  "Arcus posterior atlantis":A(12519,'Atlas',Q(0,1,[.68,.5,-.2])),"Tuberculum anterius atlantis":A(12519,'Atlas',E(0,1,[0,0,1],.4,.6)),
  "Tuberculum posterius atlantis":A(12519,'Atlas',E(0,1,[0,0,-1],.4,.6)),"Sulcus arteriae vertebralis":A(12519,'Atlas',Q(0,1,[.74,1.2,.25])),
  "Dens axis":A(12520,'Axis',E(.6,1,[0,1,.3],.35,.65)),"Apex dentis":A(12520,'Axis',E(.8,1,[0,1,0],.35,.65)),"Collum dentis":A(12520,'Axis',Q(.55,.7,[.5,.5,1.2])),
  "Vertebra prominens":A(12525,'7. boyun omuru (C7)',E(0,1,[0,0,-1]))}},
 cvt:{f:9945,ad:'6. göğüs omuru',t:{"Fovea costalis processus transversi":E(0,1,[1,0,.3])}},
 csa:{f:16202,ad:'Os sacrum',t:{
  "Basis ossis sacri":Q(.9,1,[.5,1.2,.7]),"Ala ossis sacri":Q(.85,1,[.85,1.2,.5]),"Promontorium":E(.85,1,[0,.3,1],.45,.55),"Apex ossis sacri":E(0,.1,[0,-1,0]),
  "Canalis sacralis":Q(.9,1,[.5,1.2,.25]),"Lineae transversae":Q(.45,.7,[.5,.5,1.2]),"Crista sacralis mediana":Q(.45,.8,[.5,.5,-.2]),
  "Crista sacralis lateralis":Q(.45,.8,[.85,.5,-.2]),"Hiatus sacralis":Q(0,.2,[.5,.5,-.2])}},
 cst:{f:7486,ad:'Manubrium sterni',t:{
  "Sternum":A([7486,7487,7488],'Sternum',Q(0,1,[.5,.5,1.2])),
  "Incisura jugularis":Q(.8,1,[.5,1.2,.5]),"Incisura clavicularis":E(.6,1,[1,1,0]),"Angulus sterni":E(0,.12,[0,-1,1],.3,.7),
  "Incisurae costales":A(7487,'Corpus sterni',E(.3,.7,[1,0,0]))}},
 ccs:{f:8229,ad:'7. kaburga (sağ)',t:{
  "Caput costae":E(.75,1,[-1,0,0]),"Extremitas vertebralis":E(.75,1,[-1,0,0]),"Angulus costae":E(.45,1,[.3,0,-1]),
  "Corpus costae":E(0,1,[1,0,0]),"Extremitas sternalis":E(0,.3,[-.5,0,1]),
  "Costa prima":A(7857,'1. kaburga (sağ)',E(0,1,[1,0,0]))}},

 /* ---- KAFATASI: yalnızca kuralla güvenle bulunabilen dış ve belirgin iç yapılar ---- */
 nfr:{f:52734,ad:'Os frontale',t:{
  "Squama frontalis":Q(.5,1,[.5,.5,1.2]),"Tuber frontale":Q(.5,.75,[.72,.5,1.2]),"Arcus superciliaris":Q(.25,.42,[.66,.5,1.2]),
  "Glabella":Q(.2,.36,[.5,.5,1.2]),"Processus zygomaticus (os frontale)":E(0,.4,[1,-.3,.2]),"Pars orbitalis":Q(0,.35,[.72,-.2,.5]),
  "Margo parietalis (os frontale)":E(.5,1,[0,.6,-1],.35,.65),"Pars nasalis":E(0,.25,[0,-1,.5],.4,.6),"Nasion":E(0,.25,[0,-1,.5],.4,.6),
  "Facies temporalis (os frontale)":Q(.25,.6,[1.2,.5,.55]),"Sulcus sinus sagittalis superioris":Q(.6,.9,[.5,.5,-.2]),"Crista frontalis":Q(.25,.5,[.5,.5,-.2]),
  "Margo supraorbitalis":Q(.12,.26,[.72,.5,1.2]),"Incisura supraorbitalis":Q(.14,.24,[.63,.5,1.2]),"Incisura frontalis":Q(.14,.24,[.57,.5,1.2]),
  "Sutura frontalis metopica":Q(.45,.8,[.5,.5,1.2]),"Sinus frontalis":Q(.2,.36,[.55,.5,1.2]),"Margo sphenoidalis (os frontale)":E(0,.3,[.3,0,-1],.6,.9),
  "Linea temporalis":Q(.3,.5,[1.2,.5,.75]),"Incisura ethmoidalis":Q(0,.3,[.5,-.2,.4]),"Foveolae ethmoidales":Q(0,.25,[.58,-.2,.4]),
  "Fossa glandulae lacrimalis":Q(0,.3,[.85,-.2,.75]),"Fovea trochlearis":Q(0,.3,[.6,-.2,.8]),"Juga cerebralia":Q(0,.3,[.72,1.2,.45]),
  "Impressiones gyrorum":Q(0,.3,[.76,1.2,.55]),"Incisura nasalis":Q(0,.15,[.56,-.2,.9]),"Spina nasalis (os frontale)":Q(0,.1,[.5,-.2,.92])}},
 /* sphenoid, ethmoid, temporal: girintili kemikler; işaretler yaklaşık yeri gösterir */
 nsp:{f:52736,ad:'Os sphenoidale',t:{
  "Hamulus pterygoideus":E(0,.1,[0,-1,0],.5,1),"Lamina lateralis processus pterygoidei":E(.05,.3,[1,0,0],.5,1),"Lamina medialis processus pterygoidei":Q(.05,.3,[.56,.5,-.2]),
  "Processus pterygoideus":Q(.1,.35,[.64,.5,-.2]),"Ala major":E(.4,1,[1,.3,0]),"Facies temporalis (ala major)":Q(.5,.9,[1.2,.5,.5]),
  "Facies cerebralis (ala major)":Q(.4,.8,[.8,1.2,.4]),"Facies orbitalis (ala major)":Q(.5,.9,[.75,.5,1.2]),"Facies maxillaris (ala major)":Q(.3,.5,[.68,.5,1.2]),
  "Crista infratemporalis":Q(.35,.5,[1.2,.5,.5]),"Ala minor":Q(.7,1,[.7,1.2,.85]),"Processus clinoideus anterior":Q(.7,1,[.6,1.2,.6]),
  "Canalis opticus":Q(.65,.9,[.58,.5,1.2]),"Fissura orbitalis superior":Q(.55,.8,[.68,.5,1.2]),"Corpus (os sphenoidale)":Q(.4,.7,[.5,.5,1.2]),
  "Sinus sphenoidalis":Q(.4,.7,[.5,.5,1.2]),"Crista sphenoidalis":Q(.45,.75,[.5,.5,1.2]),"Sella turcica":Q(.5,1,[.5,1.2,.5]),"Fossa hypophysialis":Q(.5,1,[.5,1.2,.5]),
  "Tuberculum sellae":Q(.5,1,[.5,1.2,.65]),"Dorsum sellae":E(.6,1,[0,1,-.8],.45,.55),"Processus clinoideus posterior":E(.6,1,[.2,1,-.8],.55,.65),
  "Processus clinoideus medius":Q(.5,1,[.56,1.2,.62]),"Foramen rotundum":Q(.3,.7,[.66,1.2,.6]),"Foramen ovale":Q(.3,.7,[.72,1.2,.3]),"Foramen spinosum":Q(.3,.7,[.78,1.2,.15])}},
 net:{f:52740,ad:'Os ethmoidale',t:{
  "Crista galli":E(0,1,[0,1,0],.4,.6),"Lamina cribrosa":Q(.6,1,[.7,1.2,.5]),"Foramina cribrosa":Q(.6,1,[.7,1.2,.62]),"Lamina perpendicularis":E(0,1,[0,-1,0],.4,.6),
  "Labyrinthus ethmoidalis":E(0,1,[1,0,0]),"Cellulae ethmoidales":Q(.3,.8,[1.2,.5,.5]),"Concha nasalis media":E(0,.3,[.3,-1,0],.6,.9),"Concha nasalis superior":Q(.3,.6,[.68,.5,-.2])}},
 nte:{f:52738,ad:'Os temporale (sağ)',t:{
  "Pars squamosa":Q(.6,1,[1.2,.5,.6]),"Processus zygomaticus (os temporale)":E(0,1,[0,0,1]),"Processus mastoideus":Q(0,.4,[.78,-.2,.22]),"Pars mastoidea":Q(.1,.45,[1.2,.5,.2]),
  "Processus styloideus":E(0,.3,[0,-1,.3],.15,.6),"Pars petrosa":E(0,1,[-1,0,.2]),"Porus acusticus externus":Q(.3,.5,[1.2,.5,.45]),"Pars tympanica":Q(.25,.4,[1.2,.5,.48]),
  "Spina suprameatica":Q(.42,.55,[1.2,.5,.42]),"Trigonum suprameatum":Q(.42,.55,[1.2,.5,.4]),"Fossa mandibularis":Q(.2,.5,[.8,-.2,.6]),"Tuberculum articulare":Q(.2,.5,[.8,-.2,.72]),
  "Fissura petrotympanica":Q(.2,.5,[.75,-.2,.55]),"Sulcus arteriae temporalis mediae":Q(.55,.8,[1.2,.5,.5]),"Eminentia arcuata":Q(.3,.7,[.3,1.2,.45]),"Tegmen tympani":Q(.3,.7,[.5,1.2,.5]),
  "Impressio trigeminalis":Q(.3,.6,[.12,.75,.6]),"Porus acusticus internus":Q(.3,.6,[-.2,.5,.4]),"Meatus acusticus internus":Q(.3,.6,[-.2,.5,.4]),"Fossa subarcuata":Q(.4,.65,[-.2,.5,.3]),
  "Canalis caroticus":Q(0,.4,[.3,-.2,.55]),"Fossa jugularis":Q(0,.4,[.35,-.2,.35]),"Foramen stylomastoideum":Q(0,.4,[.62,-.2,.32]),"Incisura mastoidea":Q(0,.4,[.7,-.2,.15]),
  "Sulcus arteriae occipitalis":Q(0,.4,[.6,-.2,.12])}},
 noc:{f:52735,ad:'Os occipitale',t:{
  "Squama occipitalis":Q(.55,1,[.5,.5,-.2]),"Protuberantia occipitalis externa":E(0,1,[0,0,-1],.4,.6),"Planum occipitale":Q(.7,.95,[.5,.5,-.2]),
  "Crista occipitalis externa":Q(0,.45,[.5,-.2,.22]),"Margo lambdoideus":E(.6,1,[1,.3,0]),"Margo mastoideus":E(.15,.5,[1,0,0]),
  "Pars basilaris":E(0,.4,[0,0,1],.35,.65),"Clivus":Q(0,.3,[.5,1.2,.88]),"Tuberculum pharyngeum":Q(0,.3,[.5,-.2,.88]),
  "Condylus occipitalis":E(0,.2,[.3,-1,.2],.55,.85),"Foramen magnum":Q(0,.3,[.5,-.2,.6]),"Processus jugularis":E(0,.15,[1,0,.2]),
  "Eminentia cruciformis":Q(.4,.7,[.5,.5,1.2]),"Protuberantia occipitalis interna":Q(.4,.7,[.5,.5,1.2]),"Fossa cerebralis":Q(.68,.9,[.72,.5,1.2])}},
 npa:{f:52788,ad:'Os parietale (sağ)',t:{
  "Tuber parietale":E(.3,.8,[1,0,0]),"Margo frontalis (os parietale)":E(.3,.7,[0,0,1]),"Sutura coronalis":E(.3,.7,[0,0,1]),
  "Margo occipitalis":E(.3,.7,[0,0,-1]),"Sutura lambdoidea":E(.3,.7,[0,0,-1]),"Margo sagittalis":E(.6,1,[-.5,1,0]),"Sutura sagittalis":E(.6,1,[-.5,1,0]),
  "Margo squamosus (os parietale)":E(0,.3,[.3,-1,0]),"Angulus frontalis":E(.6,1,[0,.7,1]),"Bregma":E(.6,1,[0,.7,1]),"Fonticulus anterior":E(.6,1,[0,.7,1]),
  "Angulus sphenoidalis":E(0,.4,[0,-.7,1]),"Angulus occipitalis":E(.5,1,[0,.5,-1]),"Lambda":E(.5,1,[0,.5,-1]),"Fonticulus posterior":E(.5,1,[0,.5,-1]),
  "Angulus mastoideus":E(0,.4,[0,-.7,-1]),"Asterion":E(0,.4,[0,-.7,-1]),"Sulcus arteriae meningeae mediae":Q(.1,.5,[-.2,.5,.75])}}
};
/* kuralı 3D modele uygula: sağ taraf kemiği → dış (lateral) = −x, ön = +z, yukarı = +y */
function resolve(sp,meshes){
  const ms=meshes.filter(m=>!m.hi);if(!ms.length)return null;
  let y0=1e9,y1=-1e9;ms.forEach(m=>{y0=Math.min(y0,m.mn[1]);y1=Math.max(y1,m.mx[1])});
  const H=y1-y0,a=y0+sp.y[0]*H,b=y0+sp.y[1]*H;
  let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9,n=0;
  ms.forEach(m=>{const p=m.pos;for(let i=0;i<p.length;i+=3){const y=p[i+1];if(y<a||y>b)continue;n++;
    if(p[i]<x0)x0=p[i];if(p[i]>x1)x1=p[i];if(p[i+2]<z0)z0=p[i+2];if(p[i+2]>z1)z1=p[i+2]}});
  if(!n)return null;const W=(x1-x0)||1,D=(z1-z0)||1;
  let best=null,bs=-1e18;
  if(sp.e){const e=sp.e;
    ms.forEach(m=>{const p=m.pos;for(let i=0;i<p.length;i+=3){const y=p[i+1];if(y<a||y>b)continue;
      if(sp.s){const u=(x1-p[i])/W;if(u<sp.s[0]||u>sp.s[1])continue}
      const sc=e[0]*(-p[i])/W+e[1]*y/Math.max(b-a,1)+e[2]*p[i+2]/D; // her eksen kendi dilim boyutuna göre ölçeklenir
      if(sc>bs){bs=sc;best=[p[i],y,p[i+2]]}}})}
  else{const q=sp.q,cl=v=>Math.max(0,Math.min(1,v)),tx=x1-cl(q[0])*W,ty=a+cl(q[1])*(b-a),tz=z0+cl(q[2])*D,pad=(b-a)*0.6;
    // Hangi yüzeye bakılıyor? w uçtaysa önden/arkadan, u uçtaysa dıştan/içten, v uçtaysa üstten/alttan yaklaşılır;
    // o eksen boyunca “ilk görünen” yüzey noktası seçilir (çukurlarda kenara kaymasın diye).
    const ax=(q[2]>=0.9||q[2]<=0.1)?2:(q[0]>=0.9||q[0]<=0.1)?0:(q[1]>=0.9||q[1]<=0.1)?1:-1;
    if(ax<0){ms.forEach(m=>{const p=m.pos;for(let i=0;i<p.length;i+=3){const y=p[i+1];if(y<a-pad||y>b+pad)continue;
        const d=(p[i]-tx)**2+(y-ty)**2+(p[i+2]-tz)**2;if(-d>bs){bs=-d;best=[p[i],y,p[i+2]]}}})}
    else{const sign=ax===2?(q[2]>=0.9?1:-1):ax===0?(q[0]>=0.9?-1:1):(q[1]>=0.9?1:-1); // o eksende hangi uç “öndeki” yüzey
      // modellerin köşe aralığı birkaç mm; çember hem ön hem arka yüzden köşe yakalayacak kadar geniş olmalı
      let r=Math.max(6,Math.min(9,0.16*Math.min(W,D))); // büyük kemiklerde komşu çıkıntıyı yakalamasın diye 9 mm ile sınırlı
      for(let k=0;k<5&&!best;k++,r*=1.8){const r2=r*r;
        ms.forEach(m=>{const p=m.pos;for(let i=0;i<p.length;i+=3){const x=p[i],y=p[i+1],z=p[i+2];if(y<a-pad||y>b+pad)continue;
          const d2=ax===2?(x-tx)**2+(y-ty)**2:ax===0?(y-ty)**2+(z-tz)**2:(x-tx)**2+(z-tz)**2;if(d2>r2)continue;
          const sc=sign*(ax===2?z:ax===0?x:y)-0.6*Math.sqrt(d2); // bakılan yüzeyde ve hedefe yakın olan
          if(sc>bs){bs=sc;best=[x,y,z]}}})}}}
  return best}
function viewOf(sp){
  if(sp.e){const [l,u,an]=sp.e;if(Math.abs(u)>1.5*Math.max(Math.abs(l),Math.abs(an)))return u>0?'on':'alt';
    if(Math.abs(an)>=Math.abs(l))return an>0?'on':'arka';
    return an<-0.25?(l>0?'arkadis':'arkaic'):(l>0?'ondis':'onic')}
  const [u,v,w]=sp.q;if(v>1.1)return 'ust';if(v<-0.1)return 'alt';
  if(w>=0.75)return 'on';if(w<=0.25)return 'arka';return u>=0.75?'ondis':u<=0.25?'onic':'on'}
const ARKA=['subocc','sirt','sirtderin','uylukarka','bacakarka','kalca'];
/* Yedek: terimin grubuna göre gösterilecek kemik(ler). [açıklama, dosyalar, bakış] */
const KAFA=[52734,52788,52789,52735,52738,52739,52736,53649,53650,52748,52892,52893,53647,53648],
  UST=[13322,13395,23130,23464,23467],ALT=[16586,24474,24486,24477,24480],
  EL=[24435,24437,24439,24441,24443,23725,24446,24448,24464,24466,24468,24470,24472,24450,24451,24452,24453,24454],
  AYAK=[24482,24497,24500,24528,24521,24523,24525,24507,24509,24511,24513,24515,43253,32634,32636,32638,32640],
  OMUR=[12519,12520,12523,9945,13074,16202];
const GRUP={
 bas:['Baş kemikleri',KAFA],kaf:['Kafa kemikleri',KAFA],ncg:['Kafatası',KAFA],bd:['Kafatası',KAFA],
 nfr:['Os frontale',[52734]],noc:['Os occipitale',[52735],'arka'],nsp:['Os sphenoidale',[52736]],net:['Os ethmoidale',[52740]],
 npa:['Os parietale (sağ)',[52788],'ondis'],nte:['Os temporale (sağ)',[52738],'ondis'],
 govde:['Gövde iskeleti',[7486,7487,7488,13074,16202,16586,16587]],bv:['Gövde iskeleti',[7486,7487,7488,13074,16202,16586,16587]],
 omg:['Omurga ve sternum',[...OMUR,7486,7487,7488]],cvg:['3. bel omuru',[13074]],cvc:['5. boyun omuru',[12523]],cvt:['6. göğüs omuru',[9945]],cvl:['3. bel omuru',[13074]],
 csa:['Os sacrum',[16202]],cst:['Sternum',[7486,7487,7488]],ccs:['7. kaburga (sağ)',[8229]],
 ust:['Üst ekstremite kemikleri',UST],uek:['Üst ekstremite kemikleri',UST],skp:['Scapula',[13395]],hum:['Humerus',[23130]],
 uln:['Ulna',[23467]],rad:['Radius',[23464]],rul:['Radius ve ulna',[23464,23467]],elb:['El kemikleri',[23464,23467,...EL]],
 alt:['Alt ekstremite kemikleri',ALT],aek:['Alt ekstremite kemikleri',ALT],oxc:['Os coxae',[16586]],fem:['Femur',[24474]],tib:['Tibia',[24477]],fib:['Fibula',[24480]],
 ayb:['Ayak kemikleri',[24477,24480,...AYAK]],jar:['Ayak kemikleri',AYAK,'onic'],
 jus:['Üst ekstremite eklemlerini yapan kemikler',[...UST,...EL]],jal:['Alt ekstremite eklemlerini yapan kemikler',[...ALT,...AYAK]],jlg:['Alt ekstremite kemikleri',[...ALT,...AYAK]],
 kk4:['Kalça kemiği ve femur',[16586,24474,16202],'arka'],ku4:['Kalça kemiği ve femur',[16586,24474,24477]],kb5:['Diz çevresi kemikleri',[24474,24477,24480],'arka'],
 kk2:['Kalça kemiği ve femur',[16586,24474,24477],'ondis'],ko1:['Omuz kemikleri',[13322,13395,23130]],ko3:['Omuz kemikleri',[13322,13395,23130],'arka'],
 ks2:['Omurga',OMUR,'arka'],ks4:['Omurga ve scapula',[...OMUR,13395,52735],'arka'],
 kp1:['Pelvis kemikleri',[16586,16587,16202]],kp2:['Pelvis kemikleri',[16586,16587,16202],'alt'],kp3:['Pelvis kemikleri',[16586,16587,16202],'alt'],
 kn2:['Boyun omurları',[52735,12519,12520,12523,12525]],ks1:['Omurga ve scapula',[...OMUR,13395],'arka'],kh2:['El kemikleri',EL]
};
function find(t){
  const k=KEMIK[t.g],sp=k&&k.t[t.la];
  if(sp)return {ctx:sp.f||[k.f],hi:[],label:t.la,sub:(sp.ad||k.ad)+' üzerinde',view:viewOf(sp),mark:ms=>resolve(sp,ms)};
  const f=window.M3D&&M3D.find(t);
  if(!f){ // tam yeri kuralla bulunamayan terim: ilgili kemik(ler) bütün olarak gösterilir, ok konmaz
    const g=GRUP[t.g];if(!g)return null;
    return {ctx:g[1],hi:[],label:t.la,sub:g[0]+' · tam yeri işaretli değil',view:g[2]||'on',mark:null,genel:true}}
  const items=M3D.SCENES[f.scene][2],it=items[f.i],ctx=[];
  if(it.t==='m'){for(const b of items){if(b.t!=='k'||b.ids.length>2)continue;for(const id of b.ids)if(ctx.length<3)ctx.push(id)}}
  else{[items[f.i-1],items[f.i+1]].forEach(b=>{if(b&&b.t==='k'&&b.ids.length===1&&it.ids.length<=2)ctx.push(b.ids[0])})}
  return {ctx,hi:it.ids,label:t.la,sub:'',view:ARKA.includes(f.scene)?'arka':'on',
    mark:ms=>{const hs=ms.filter(m=>m.hi);let s=[0,0,0],n=0;hs.forEach(m=>{for(let c=0;c<3;c++)s[c]+=m.sum[c];n+=m.pos.length/3});if(!n)return null;
      const c=[s[0]/n,s[1]/n,s[2]/n];let best=null,bd=1e18;hs.forEach(m=>{const p=m.pos;for(let i=0;i<p.length;i+=9){const d=(p[i]-c[0])**2+(p[i+1]-c[1])**2+(p[i+2]-c[2])**2;if(d<bd){bd=d;best=[p[i],p[i+1],p[i+2]]}}});return best}}}
return {find,KEMIK,resolve,viewOf};
})();
