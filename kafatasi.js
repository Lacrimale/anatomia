/* KAFATASI GENEL YAPI – "Cranium: Yandan Görünüş" ve "Cranium: Önden Görünüş" (+ sağ orbita, fossa infratemporalis)
   atlas sayfalarındaki tüm yapılar. kaslar.js'ten SONRA yüklenir ve window.EK'e eklenir.
   Başında "!" olan bilgi kırmızı görünür: ders notunda işaretlenmiş / elle yazılmış bilgiler.
   yer: sözlükteki "Nerede?" resmi
     f: gösterilecek kemikler (FMA no), on: okun arandığı kemik, r: konum kuralı (yerler.js ile aynı E/Q kuralları),
     ref:'grup:Terim' → yerler.js'teki hazır kuralı kullan, ad: “… üzerinde” yazısı */
(function(){
'use strict';
const EK=window.EK;if(!EK)return;
const E=(y0,y1,e,s0,s1)=>({y:[y0,y1],e,s:s0===undefined?null:[s0,s1]});
const Q=(y0,y1,q)=>({y:[y0,y1],q});
const ISARET='!Ders notunda işaretlenmiş (önemli)', CIFT='!Ders notu: çift (sağ ve sol) noktadır';
/* kemikler (sağ taraf, BodyParts3D) */
const FR=52734,PAR=52788,PARL=52789,OCC=52735,TMP=52738,SPH=52736,ETH=52740,MAX=53649,MAXL=53650,MAN=52748,ZYG=52892,NAS=53647,NASL=53648,LAC=53645,PAL=53655,VOM=9710,CON=54737;
const KAFA=[FR,PAR,PARL,OCC,TMP,SPH,MAX,MAXL,MAN,ZYG,NAS,NASL];
const T=(la,tr,ok,g,k,yer,alt)=>[la,tr,ok,g,alt||[],"",{d:{k:[].concat(k||[])},yer}];

EK.lessons[18]="Kafatası genel yapı";
EK.order.push(18);
EK.cat=EK.cat||{};
Object.assign(EK.topics,{
 kgkem:["Kafatasını yapan kemikler",18], kgnok:["Suturalar ve kraniometrik noktalar",18],
 kgyan:["Yandan görünüş: şakak bölgesi",18], kgyuz:["Önden görünüş: yüz kemikleri",18],
 kgman:["Mandibula",18], kgorb:["Orbita ve fossa infratemporalis",18]});
['kgkem','kgnok','kgyan','kgyuz','kgman','kgorb'].forEach(k=>EK.cat[k]='kemik');
Object.assign(EK.groups,{
 kg1:["Kafatasını yapan kemikler","kgkem"], kg2:["Suturalar ve kraniometrik noktalar","kgnok"],
 kg3:["Yandan görünüş: os temporale ve şakak bölgesi","kgyan"], kg4:["Maxilla'nın yapıları","kgyuz"],
 kg5:["Os zygomaticum, burun ve orbita çevresi","kgyuz"], kg6:["Mandibula'nın yapıları","kgman"],
 kg7:["Orbita (göz çukuru)","kgorb"], kg8:["Fossa infratemporalis","kgorb"]});

EK.raw.push(
/* ---------- kemikler ---------- */
T("Os frontale","Alın kemiği (tek)","os frontale","kg1",["Alnı, orbitanın çatısını ve ön kafa çukurunu yapar","Önden ve yandan görünüşte kafatasının ön-üst kısmıdır"],{f:KAFA,hi:[FR]}),
T("Os parietale","Yan kafa (çeper) kemiği (çift)","os pariyetale","kg1",["Kafa kubbesinin yan ve üst kısmını yapar","Önde sutura coronalis, arkada sutura lambdoidea ile sınırlanır"],{f:KAFA,hi:[PAR,PARL],v:"ondis"}),
T("Os temporale","Şakak kemiği (çift)","os temporale","kg1",["Kafatasının yan-alt kısmında; içinde işitme ve denge organları bulunur","Yandan görünüşte pars squamosa, proc. zygomaticus, proc. mastoideus ve dış kulak yolu görülür"],{f:KAFA,hi:[TMP],v:"dis"}),
T("Os occipitale","Artkafa kemiği (tek)","os oksipitale","kg1",["Kafatasının arka-alt kısmını yapar; ortasında foramen magnum bulunur"],{f:KAFA,hi:[OCC],v:"arka"}),
T("Os sphenoidale","Kama kemiği (tek)","os sfenoidale","kg1",[ISARET,"Kafa tabanının ortasındadır; yandan bakışta yalnızca ala major görünür","Önden bakışta orbitanın arka duvarında ala minor ve ala major görülür"],{f:KAFA,hi:[SPH],v:"dis"}),
T("Os ethmoidale","Kalbur kemiği (tek)","os etmoidale","kg1",[ISARET,"Orbitanın iç duvarına (lamina orbitalis) ve burun boşluğuna katılır","Önden bakışta lamina perpendicularis ve concha nasalis media görülür"],{f:[FR,MAX,MAXL,NAS,NASL],hi:[ETH]}),
T("Os lacrimale","Gözyaşı kemiği (çift)","os lakrimale","kg1",["Orbitanın iç duvarının ön kısmındaki küçük, ince kemik","Fossa sacci lacrimalis'in arka yarısını yapar"],{f:[FR,MAX,NAS,ZYG],hi:[LAC],v:"ondis"}),
T("Os nasale","Burun kemiği (çift)","os nazale","kg1",["Burun sırtını yapan iki küçük kemik","Yukarıda os frontale ile birleşir (nasion)"],{f:KAFA,hi:[NAS,NASL]}),
T("Os zygomaticum","Elmacık kemiği (çift)","os zigomatikum","kg1",["Yanağın çıkıntısını ve orbitanın dış-alt kenarını yapar","Proc. temporalis'i ile arcus zygomaticus'a katılır"],{f:KAFA,hi:[ZYG],v:"ondis"}),
T("Maxilla","Üst çene kemiği (çift)","maksilla","kg1",["Yüzün ortasını, orbitanın tabanını, burnun yan duvarını ve damağın ön kısmını yapar","Üst dişler processus alveolaris'e oturur"],{f:KAFA,hi:[MAX,MAXL]},["Os maxilla"]),
T("Mandibula","Alt çene kemiği (tek)","mandibula","kg1",[ISARET,"Kafatasının hareketli tek kemiğidir","Caput mandibulae ile os temporale arasında çene eklemi bulunur"],{f:KAFA,hi:[MAN],v:"ondis"}),
T("Vomer","Sapan kemiği (tek)","vomer","kg1",[ISARET,"Burun bölmesinin (septum nasi) arka-alt kısmını yapar","Önden bakışta burun boşluğunun ortasında görülür"],{f:[MAX,MAXL,ETH],hi:[VOM]}),
T("Concha nasalis inferior","Alt burun kavkısı (çift)","konka nazalis inferiyor","kg1",["Burun boşluğunun yan duvarındaki ayrı (bağımsız) kemik","Concha nasalis media'dan farklı olarak ethmoidin parçası değildir"],{f:[MAX,MAXL,NAS,NASL],hi:[CON]}),
T("Os suturale","Sutura içindeki küçük ek kemik (wormian kemik)","os suturale","kg1",["Özellikle sutura lambdoidea boyunca görülebilen, sayısı kişiden kişiye değişen küçük kemikler","Atlasta “Sutural (wormian) kemik” olarak gösterilir","3D modelde bu küçük kemikler yok; ok bulundukları yer olan sutura lambdoidea'yı gösteriyor"],{f:[PAR,PARL,OCC],ref:"npa:Sutura lambdoidea",ad:"Sutura lambdoidea",v:"arka"},["Sutural kemik","Wormian kemik","Ossa suturalia"]),

/* ---------- suturalar ve noktalar ---------- */
T("Sutura coronalis","Os frontale ile iki os parietale arasındaki dikiş","sutura koronalis","kg2",["Kafatasını önden kat eden enine dikiş","Sagittal dikişle birleştiği nokta bregma'dır"],{f:[FR,PAR],ref:'npa:Sutura coronalis'}),
T("Sutura lambdoidea","Os occipitale ile iki os parietale arasındaki dikiş","sutura lambdoidea","kg2",["Lambda (λ) harfine benzer","Sagittal dikişle birleştiği nokta lambda'dır"],{f:[PAR,OCC],ref:'npa:Sutura lambdoidea',v:'arka'}),
T("Pterion","Şakakta dört kemiğin birleştiği H şeklindeki bölge","pteriyon","kg2",[ISARET,CIFT,"Os frontale, os parietale, os sphenoidale'nin ala major'u ve os temporale burada birleşir","Kemiği ince olduğundan kırılması altındaki a. meningea media'yı yaralayabilir (epidural kanama)"],{f:[FR,PAR,SPH,TMP],ref:'npa:Angulus sphenoidalis',v:'ondis'}),
T("Asterion","Os parietale, os occipitale ve os temporale'nin birleştiği nokta","asteriyon","kg2",[ISARET,CIFT,"Sutura lambdoidea'nın alt ucundadır; os parietale'nin angulus mastoideus'una denk gelir"],{f:[PAR,OCC,TMP],ref:'npa:Asterion',v:'arkadis'}),
T("Nasion","Os frontale ile iki os nasale'nin birleştiği orta nokta","naziyon","kg2",[ISARET,"Burun kökünde, orta hattaki tek noktadır"],{f:[FR,NAS,NASL],ref:'nfr:Nasion'}),
T("Glabella","İki kaş kemeri (arcus superciliaris) arasındaki düz saha","glabella","kg2",[ISARET,"Nasion'un hemen üstünde, os frontale üzerindedir"],{f:[FR],ref:'nfr:Glabella'}),
T("Inion","Protuberantia occipitalis externa'nın en çıkıntılı noktası","iniyon","kg2",[ISARET,"!Atlasta “Protuberantia occipitalis externa (Inion)” olarak çerçevelenmiş","Ensede elle hissedilebilen çıkıntıdır"],{f:[OCC],ref:'noc:Protuberantia occipitalis externa',v:'arka'},["Protuberantia occipitalis externa"]),
T("Gonion","Alt çene açısının (angulus mandibulae) en dış-alt noktası","goniyon","kg2",["!Ders notunda elle eklenmiş",CIFT,"Ramus ile corpus mandibulae'nin birleştiği köşedir"],{f:[MAN],r:E(0,.45,[1,-.6,-1]),ad:'Mandibula',v:'ondis'}),
T("Gnathion","Mandibulanın orta hattaki en alt noktası","gnatiyon","kg2",["!Ders notunda elle eklenmiş","Çene ucunun (protuberantia mentalis) altında, orta hattadır"],{f:[MAN],r:E(0,.15,[0,-1,.6],.42,.58),ad:'Mandibula'}),
T("Dacryon","Os frontale, os lacrimale ve maxilla'nın birleştiği nokta","dakriyon","kg2",["!Ders notunda elle eklenmiş",CIFT,"Orbitanın iç duvarında, gözyaşı kesesi çukurunun üst ucundadır"],{f:[FR,LAC,MAX,NAS],on:[LAC],r:E(.8,1,[0,1,.4]),ad:'Os lacrimale'}),

/* ---------- yandan görünüş ---------- */
T("Fossa temporalis","Kafatasının yanındaki şakak çukuru","fossa temporalis","kg3",["Linea temporalis ile arcus zygomaticus arasında kalan sığ çukur","İçini m. temporalis doldurur"],{f:[PAR,FR,TMP,SPH,ZYG],on:[TMP],r:Q(.65,1,[1.2,.5,.65]),ad:'Os temporale (pars squamosa)',v:'dis'}),
T("Linea temporalis superior","Şakak çizgilerinin üstteki","linea temporalis superiyor","kg3",[ISARET,"Os frontale'den os parietale üzerine kavis yaparak uzanır","Fascia temporalis tutunur"],{f:[PAR,FR],on:[PAR],r:Q(.45,.7,[1.2,.5,.55]),ad:'Os parietale',v:'dis'}),
T("Linea temporalis inferior","Şakak çizgilerinin alttaki","linea temporalis inferiyor","kg3",[ISARET,"Linea temporalis superior'un altında ve ona paralel uzanır","M. temporalis bu çizgiden başlar"],{f:[PAR,FR],on:[PAR],r:Q(.32,.5,[1.2,.5,.55]),ad:'Os parietale',v:'dis'}),
T("Pars squamosa","Os temporale'nin yassı, pul şeklindeki parçası","pars skuamoza","kg3",["!Os temporale'nin parçası","Fossa temporalis'in alt kısmını yapar"],{f:[TMP],ref:'nte:Pars squamosa',v:'dis'}),
T("Processus zygomaticus (os temporale)","Os temporale'nin öne uzanan elmacık çıkıntısı","prosessus zigomatikus","kg3",["!Os temporale'nin parçası","Os zygomaticum'un proc. temporalis'i ile arcus zygomaticus'u yapar"],{f:[TMP,ZYG],on:[TMP],ref:'nte:Processus zygomaticus (os temporale)',v:'dis'}),
T("Tuberculum articulare","Fossa mandibularis'in önündeki eklem tümseği","tuberkulum artikulare","kg3",["!Os temporale'nin parçası","Ağız açılırken caput mandibulae bu tümseğin üzerine kayar"],{f:[TMP],ref:'nte:Tuberculum articulare'}),
T("Sulcus arteriae temporalis mediae","Pars squamosa dış yüzündeki dikey oluk","sulkus arteriye temporalis mediye","kg3",["!Os temporale'nin parçası","A. temporalis media'nın izidir"],{f:[TMP],ref:'nte:Sulcus arteriae temporalis mediae',v:'dis'}),
T("Crista supramastoidea","Dış kulak yolunun üstünden arkaya uzanan kemik kabarıklık","krista supramastoidea","kg3",["!Os temporale'nin parçası","Proc. zygomaticus'un arka kökünün devamıdır; fossa temporalis'in alt-arka sınırını yapar"],{f:[TMP],r:Q(.5,.62,[1.2,.5,.3]),ad:'Os temporale',v:'dis'}),
T("Meatus acusticus externus","Dış kulak yolu","meatus akustikus eksternus","kg3",["!Os temporale'nin parçası","Kemik girişine porus acusticus externus denir; ön, alt ve arka duvarını pars tympanica yapar"],{f:[TMP],ref:'nte:Porus acusticus externus',v:'dis'},["Porus acusticus externus"]),
T("Processus mastoideus","Kulağın arkasındaki meme şeklindeki çıkıntı","prosessus mastoideus","kg3",["!Os temporale'nin parçası","İçinde hava hücreleri (cellulae mastoideae) bulunur; m. sternocleidomastoideus tutunur"],{f:[TMP],ref:'nte:Processus mastoideus'}),
T("Arcus zygomaticus","Elmacık kemeri","arkus zigomatikus","kg3",[ISARET,"Os temporale'nin proc. zygomaticus'u ile os zygomaticum'un proc. temporalis'inin birleşmesiyle oluşur","Altından m. temporalis'in tendonu geçer; m. masseter alt kenarından başlar"],{f:[ZYG,TMP],on:[ZYG],r:E(0,1,[0,0,-1]),ad:'Os zygomaticum ve os temporale',v:'dis'}),

/* ---------- maxilla ---------- */
T("Processus frontalis (maxilla)","Maxilla'nın yukarı, alına doğru uzanan çıkıntısı","prosessus frontalis","kg4",["!Maxilla'nın parçası","Os frontale, os nasale ve os lacrimale ile eklem yapar"],{f:[MAX,NAS,LAC],on:[MAX],r:E(.82,1,[-.3,1,.4]),ad:'Maxilla'}),
T("Processus zygomaticus (maxilla)","Maxilla'nın dışa, elmacık kemiğine uzanan çıkıntısı","prosessus zigomatikus","kg4",["!Maxilla'nın parçası","Os zygomaticum ile eklem yapar"],{f:[MAX,ZYG],on:[MAX],r:E(.4,.75,[1,0,0]),ad:'Maxilla',v:'ondis'}),
T("Processus alveolaris","Maxilla'nın üst dişleri taşıyan alt kenarı","prosessus alveolaris","kg4",["!Maxilla'nın parçası","Dişlerin köklerinin oturduğu yuvalar (alveoli dentales) buradadır"],{f:[MAX],r:Q(0,.18,[.6,.5,1.2]),ad:'Maxilla'}),
T("Foramen infraorbitale","Orbitanın altındaki delik","foramen infraorbitale","kg4",["!Maxilla'nın parçası","N. ve a. infraorbitalis yüze buradan çıkar","Orbita tabanındaki sulcus infraorbitalis'in devamıdır"],{f:[MAX],r:Q(.55,.72,[.5,.5,1.2]),ad:'Maxilla'}),
T("Spina nasalis anterior","Burun boşluğu girişinin alt ortasındaki diken","spina nazalis anteriyor","kg4",["!Maxilla'nın parçası","İki maxilla'nın orta hatta öne uzanan sivri ucudur"],{f:[MAX,MAXL],on:[MAX],r:E(.25,.38,[-1,0,1]),ad:'Maxilla'}),
T("Tuber maxillae","Maxilla gövdesinin arka yüzündeki kabarıklık","tuber maksille","kg4",["!Ders notunda elle eklenmiş","Son azı dişinin arkasındadır; fissura pterygomaxillaris'in ön sınırını yapar"],{f:[MAX],r:E(.3,.6,[.3,0,-1]),ad:'Maxilla',v:'arkadis'},["Tuber maxilla"]),

/* ---------- os zygomaticum, burun, orbita çevresi ---------- */
T("Processus frontalis (os zygomaticum)","Os zygomaticum'un yukarı, alına doğru uzanan çıkıntısı","prosessus frontalis","kg5",["!Os zygomaticum'un parçası","Os frontale'nin proc. zygomaticus'u ile eklem yapar; orbitanın dış kenarını yapar"],{f:[ZYG],r:E(.8,1,[0,1,0]),ad:'Os zygomaticum',v:'ondis'}),
T("Processus temporalis (os zygomaticum)","Os zygomaticum'un arkaya uzanan çıkıntısı","prosessus temporalis","kg5",["!Os zygomaticum'un parçası","Os temporale'nin proc. zygomaticus'u ile arcus zygomaticus'u yapar"],{f:[ZYG],r:E(0,1,[0,0,-1]),ad:'Os zygomaticum',v:'dis'}),
T("Foramen zygomaticofaciale","Os zygomaticum'un yüz tarafındaki küçük delik","foramen zigomatikofasiyale","kg5",["!Os zygomaticum'un parçası","Aynı adlı sinir ve damarlar geçer"],{f:[ZYG],r:Q(.42,.65,[.75,.5,1.2]),ad:'Os zygomaticum',v:'ondis'}),
T("Fossa sacci lacrimalis","Gözyaşı kesesinin oturduğu çukur","fossa saki lakrimalis","kg5",["Orbitanın iç duvarının önündedir","Os lacrimale ve maxilla'nın proc. frontalis'i birlikte yapar"],{f:[LAC,MAX],on:[LAC],r:Q(.15,.7,[1.2,.5,.8]),ad:'Os lacrimale',v:'ondis'}),
T("Lamina perpendicularis","Os ethmoidale'nin aşağı inen dik yaprağı","lamina perpendikularis","kg5",["!Os ethmoidale'nin parçası","Burun bölmesinin (septum nasi) üst kısmını yapar; vomer ile birleşir"],{f:[ETH,VOM],on:[ETH],ref:'net:Lamina perpendicularis'}),
T("Concha nasalis media","Orta burun kavkısı","konka nazalis mediya","kg5",["!Os ethmoidale'nin parçası","Concha nasalis inferior'dan farklı olarak ethmoidin bir parçasıdır"],{f:[ETH],ref:'net:Concha nasalis media'}),
T("Ala major (os sphenoidale)","Sphenoidin büyük kanadı","ala mayor","kg5",["!Os sphenoidale'nin parçası","Yandan bakışta fossa temporalis'te görülen tek sphenoid parçasıdır; orbitanın dış-arka duvarına da katılır"],{f:[SPH],ref:'nsp:Ala major'},["Ala major"]),
T("Ala minor (os sphenoidale)","Sphenoidin küçük kanadı","ala minor","kg5",["!Os sphenoidale'nin parçası","Orbitanın çatısının arka kısmını yapar; canalis opticus buradadır"],{f:[SPH],ref:'nsp:Ala minor'},["Ala minor"]),

/* ---------- mandibula ---------- */
T("Caput mandibulae","Alt çene başı","kaput mandibule","kg6",[ISARET,"Proc. condylaris'in ucundaki eklem başı","Os temporale'nin fossa mandibularis'i ile çene eklemini (art. temporomandibularis) yapar"],{f:[MAN],r:Q(.86,1,[1.2,.5,.12]),ad:"Mandibula",v:"dis"}),
T("Incisura mandibulae","Proc. coronoideus ile caput mandibulae arasındaki çentik","insizura mandibule","kg6",["!Mandibula'nın parçası","Buradan n. ve a. massetericus geçer"],{f:[MAN],r:Q(.72,1,[.88,1.2,.5]),ad:'Mandibula',v:'dis'}),
T("Processus coronoideus","Ramus'un öndeki sivri çıkıntısı","prosessus koronoideus","kg6",["!Mandibula'nın parçası","M. temporalis tutunur"],{f:[MAN],r:E(.75,1,[0,1,1],.6,1),ad:'Mandibula',v:'dis'}),
T("Ramus mandibulae","Mandibulanın dik kolu","ramus mandibule","kg6",["!Mandibula'nın parçası","Üstte proc. coronoideus ve proc. condylaris'i taşır; dış yüzüne m. masseter tutunur"],{f:[MAN],r:Q(.4,.75,[1.2,.5,.3]),ad:'Mandibula',v:'dis'},["Ramus"]),
T("Corpus mandibulae","Mandibulanın yatay gövdesi","korpus mandibule","kg6",["!Mandibula'nın parçası","Üst kenarı alt dişleri taşır (pars alveolaris)"],{f:[MAN],r:Q(.12,.4,[1.2,.5,.7]),ad:'Mandibula',v:'ondis'},["Corpus"]),
T("Linea obliqua","Corpus mandibulae dış yüzündeki eğik çizgi","linea oblikua","kg6",["!Mandibula'nın parçası","Ramus'un ön kenarından aşağı-öne doğru devam eder"],{f:[MAN],r:Q(.25,.5,[1.2,.5,.5]),ad:'Mandibula',v:'dis'}),
T("Foramen mentale","Çene deliği","foramen mentale","kg6",["!Mandibula'nın parçası","N. ve a. mentalis çıkar; genellikle 2. küçük azı dişinin altındadır"],{f:[MAN],r:Q(.1,.35,[.8,.5,1.2]),ad:'Mandibula',v:'ondis'}),
T("Tuberculum mentale","Protuberantia mentalis'in iki yanındaki küçük tümsek","tuberkulum mentale","kg6",["!Mandibula'nın parçası"],{f:[MAN],r:Q(0,.18,[.62,.5,1.2]),ad:'Mandibula'}),
T("Protuberantia mentalis","Çene ucundaki üçgen çıkıntı","protuberantiya mentalis","kg6",["!Mandibula'nın parçası","Çenenin ön çıkıntısını yapar"],{f:[MAN],r:E(0,.25,[0,0,1],.42,.58),ad:'Mandibula'}),
T("Trigonum mentale","Çene ucundaki üçgen saha","trigonum mentale","kg6",["!Ders notunda elle eklenmiş","Protuberantia mentalis ile iki tuberculum mentale'nin sınırladığı üçgen alan"],{f:[MAN],r:Q(0,.2,[.5,.5,1.2]),ad:'Mandibula'}),

/* ---------- orbita ---------- */
T("Incisura supraorbitalis","Orbitanın üst kenarındaki çentik (bazen delik)","insizura supraorbitalis","kg7",["!Os frontale'nin parçası","Delik şeklindeyse foramen supraorbitale adını alır","N. ve a. supraorbitalis geçer"],{f:[FR],ref:'nfr:Incisura supraorbitalis'},["Foramen supraorbitale"]),
T("Facies orbitalis ossis frontalis","Os frontale'nin orbitaya bakan yüzü","fasiyes orbitalis ossis frontalis","kg7",["Orbitanın çatısının büyük kısmını yapar"],{f:[FR],ref:'nfr:Pars orbitalis'}),
T("Facies orbitalis alae minoris","Ala minor'un orbitaya bakan yüzü","fasiyes orbitalis ale minoris","kg7",["!Os sphenoidale'nin parçası","Orbitanın çatısının arka kısmını yapar","Atlasta “alaris minoris” diye yazılmıştır"],{f:[SPH],ref:'nsp:Ala minor'},["Facies orbitalis alaris minoris"]),
T("Facies orbitalis alae majoris","Ala major'un orbitaya bakan yüzü","fasiyes orbitalis ale mayoris","kg7",["!Os sphenoidale'nin parçası","Orbitanın dış duvarının arka kısmını yapar","Atlasta “alaris majoris” diye yazılmıştır"],{f:[SPH],ref:'nsp:Facies orbitalis (ala major)'},["Facies orbitalis alaris majoris"]),
T("Facies orbitalis ossis zygomatici","Os zygomaticum'un orbitaya bakan yüzü","fasiyes orbitalis ossis zigomatisi","kg7",["Orbitanın dış duvarının ön kısmını yapar"],{f:[ZYG],r:Q(.5,.9,[-.1,.5,.7]),ad:'Os zygomaticum',v:'onic'}),
T("Facies orbitalis corporis maxillae","Maxilla gövdesinin orbitaya bakan üst yüzü","fasiyes orbitalis korporis maksille","kg7",["Orbitanın tabanının büyük kısmını yapar","Üzerinde sulcus infraorbitalis bulunur"],{f:[MAX],r:Q(.45,.65,[.55,1.2,.55]),ad:"Maxilla",v:"ust"}),
T("Lamina orbitalis ossis ethmoidalis","Os ethmoidale'nin orbitaya bakan ince yaprağı","lamina orbitalis ossis etmoidalis","kg7",["!Os ethmoidale'nin parçası","Orbitanın iç duvarının büyük kısmını yapar; çok incedir (lamina papyracea)"],{f:[ETH],ref:'net:Labyrinthus ethmoidalis'},["Lamina orbitalis","Lamina papyracea"]),
T("Processus orbitalis ossis palatini","Os palatinum'un orbitaya uzanan küçük çıkıntısı","prosessus orbitalis ossis palatini","kg7",["Orbitanın tabanının en arka küçük kısmını yapar"],{f:[PAL],r:E(.8,1,[0,1,0]),ad:'Os palatinum'}),
T("Fissura orbitalis superior","Orbitanın arkasındaki üst yarık","fissura orbitalis superiyor","kg7",["!Os sphenoidale'nin parçası","Ala minor ile ala major arasındadır","N. oculomotorius, n. trochlearis, n. ophthalmicus, n. abducens ve v. ophthalmica superior geçer"],{f:[SPH],ref:'nsp:Fissura orbitalis superior'}),
T("Fissura orbitalis inferior","Orbitanın arkasındaki alt yarık","fissura orbitalis inferiyor","kg7",[ISARET,"Ala major ile maxilla'nın orbita yüzü arasındadır","N. infraorbitalis ve n. zygomaticus buradan orbitaya girer"],{f:[MAX,SPH,ZYG],on:[MAX],r:E(.5,.66,[.3,.6,-1]),ad:'Maxilla (orbita yüzünün arka kenarı)'}),
T("Canalis opticus","Görme siniri kanalı","kanalis optikus","kg7",["!Os sphenoidale'nin parçası (ala minor)","N. opticus ve a. ophthalmica geçer","Atlasta “Canalis (foramen) opticus” olarak gösterilir"],{f:[SPH],ref:'nsp:Canalis opticus'},["Foramen opticum"]),
T("Sulcus infraorbitalis","Orbita tabanındaki oluk","sulkus infraorbitalis","kg7",["!Maxilla'nın parçası","Öne doğru canalis infraorbitalis olur ve foramen infraorbitale ile yüze açılır"],{f:[MAX],r:Q(.45,.65,[.62,1.2,.45]),ad:"Maxilla",v:"ust"}),
T("Foramen ethmoidale anterius","Orbitanın iç duvarındaki ön ethmoid deliği","foramen etmoidale anteriyus","kg7",["Os frontale ile os ethmoidale arasındaki dikişte bulunur","Aynı adlı sinir ve damarlar geçer"],{f:[ETH],r:Q(.75,1,[1.2,.5,.7]),ad:'Os ethmoidale (üst-dış kenar)',v:'dis'}),
T("Foramen ethmoidale posterius","Orbitanın iç duvarındaki arka ethmoid deliği","foramen etmoidale posteriyus","kg7",["Foramen ethmoidale anterius'un arkasındadır","Aynı adlı sinir ve damarlar geçer"],{f:[ETH],r:Q(.75,1,[1.2,.5,.3]),ad:'Os ethmoidale (üst-dış kenar)',v:'dis'}),

/* ---------- fossa infratemporalis ---------- */
T("Fissura pterygomaxillaris","Maxilla ile proc. pterygoideus arasındaki dikey yarık","fissura pterigomaksillaris","kg8",["!Atlasta arcus zygomaticus ve mandibula kaldırılınca görülür","Önde tuber maxillae, arkada lamina lateralis processus pterygoidei sınırlar","Fossa pterygopalatina'ya açılır"],{f:[MAX,SPH],on:[MAX],r:E(.3,.6,[.3,0,-1]),ad:'Maxilla (tuber maxillae)',v:'arkadis'}),
T("Crista infratemporalis","Ala major'un dış yüzündeki yatay kenar","krista infratemporalis","kg8",["!Os sphenoidale'nin parçası","Fossa temporalis'i fossa infratemporalis'ten ayırır"],{f:[SPH],ref:'nsp:Crista infratemporalis'}),
T("Lamina lateralis processus pterygoidei","Proc. pterygoideus'un geniş dış yaprağı","lamina lateralis prosessus pterigoideyi","kg8",["!Os sphenoidale'nin parçası","Dış yüzünden m. pterygoideus lateralis, iç yüzünden m. pterygoideus medialis başlar"],{f:[SPH],ref:'nsp:Lamina lateralis processus pterygoidei'}),
T("Hamulus pterygoideus","Lamina medialis'in alt ucundaki kanca","hamulus pterigoideus","kg8",["!Os sphenoidale'nin parçası (lamina medialis)","M. tensor veli palatini'nin tendonu etrafından döner"],{f:[SPH],ref:'nsp:Hamulus pterygoideus'})
);

/* bilgi soruları: [soru, doğru, [yanlışlar], konu] */
EK.facts.push(
 ["Pterion'da hangi kemikler birleşir?","Os frontale, os parietale, os sphenoidale (ala major) ve os temporale",["Os parietale, os occipitale ve os temporale","Os frontale ve iki os parietale","Os frontale, os nasale ve maxilla"],"kgnok"],
 ["Asterion'da hangi kemikler birleşir?","Os parietale, os occipitale ve os temporale",["Os frontale, os parietale, os sphenoidale ve os temporale","İki os parietale ve os occipitale","Os frontale ve iki os parietale"],"kgnok"],
 ["Protuberantia occipitalis externa'nın en çıkıntılı noktasına ne denir?","Inion",["Asterion","Opisthion","Lambda"],"kgnok"],
 ["Alt çene açısının en dış-alt noktasına ne denir?","Gonion",["Gnathion","Asterion","Dacryon"],"kgnok"],
 ["Mandibulanın orta hattaki en alt noktasına ne denir?","Gnathion",["Gonion","Nasion","Inion"],"kgnok"],
 ["Os frontale, os lacrimale ve maxilla'nın birleştiği noktaya ne denir?","Dacryon",["Nasion","Pterion","Glabella"],"kgnok"],
 ["Os frontale ile os nasale'nin birleştiği orta noktaya ne denir?","Nasion",["Glabella","Dacryon","Bregma"],"kgnok"],
 ["Hangisi çift (sağda ve solda bulunan) bir noktadır?","Pterion",["Nasion","Glabella","Inion"],"kgnok"],
 ["Hangisi tek (orta hatta bulunan) bir noktadır?","Gnathion",["Gonion","Asterion","Dacryon"],"kgnok"],
 ["Arcus zygomaticus hangi çıkıntılardan oluşur?","Os temporale'nin proc. zygomaticus'u ve os zygomaticum'un proc. temporalis'i",["Maxilla'nın proc. zygomaticus'u ve os zygomaticum'un proc. frontalis'i","Os frontale'nin proc. zygomaticus'u ve os zygomaticum","Os sphenoidale'nin ala major'u ve os temporale"],"kgyan"],
 ["Linea temporalis superior ve inferior hangi kemikler üzerindedir?","Os frontale ve os parietale",["Os temporale ve os sphenoidale","Os occipitale ve os parietale","Os zygomaticum ve os temporale"],"kgyan"],
 ["Meatus acusticus externus hangi kemiktedir?","Os temporale",["Os occipitale","Os sphenoidale","Os parietale"],"kgyan"],
 ["Fossa temporalis'i hangi kas doldurur?","M. temporalis",["M. masseter","M. pterygoideus lateralis","M. buccinator"],"kgyan"],
 ["Yandan bakışta fossa temporalis'te görülen sphenoid parçası hangisidir?","Ala major",["Ala minor","Processus pterygoideus","Corpus"],"kgyan"],
 ["Foramen infraorbitale hangi kemiktedir?","Maxilla",["Os zygomaticum","Os frontale","Os sphenoidale"],"kgyuz"],
 ["Foramen zygomaticofaciale hangi kemiktedir?","Os zygomaticum",["Maxilla","Os temporale","Os frontale"],"kgyuz"],
 ["Fossa sacci lacrimalis'i hangi kemikler yapar?","Os lacrimale ve maxilla'nın proc. frontalis'i",["Os ethmoidale ve os frontale","Os nasale ve maxilla","Os zygomaticum ve maxilla"],"kgyuz"],
 ["Spina nasalis anterior hangi kemiğe aittir?","Maxilla",["Os nasale","Os frontale","Vomer"],"kgyuz"],
 ["Burun bölmesinin kemik kısmını hangileri yapar?","Lamina perpendicularis (os ethmoidale) ve vomer",["Concha nasalis media ve inferior","Os nasale ve maxilla","Os palatinum ve os lacrimale"],"kgyuz"],
 ["Hangi burun kavkısı ayrı (bağımsız) bir kemiktir?","Concha nasalis inferior",["Concha nasalis media","Concha nasalis superior","Hepsi ethmoidin parçasıdır"],"kgyuz"],
 ["Tuber maxillae maxilla'nın hangi yüzündedir?","Arka yüzünde",["Ön yüzünde","Orbita yüzünde","Burun yüzünde"],"kgyuz"],
 ["Foramen mentale hangi kemiktedir?","Mandibula",["Maxilla","Os zygomaticum","Os temporale"],"kgman"],
 ["Incisura mandibulae hangi iki çıkıntı arasındadır?","Processus coronoideus ve caput mandibulae (proc. condylaris)",["Ramus ve corpus mandibulae","Protuberantia mentalis ve tuberculum mentale","Linea obliqua ve processus alveolaris"],"kgman"],
 ["Caput mandibulae hangi yapı ile eklem yapar?","Os temporale'nin fossa mandibularis'i",["Os zygomaticum'un proc. temporalis'i","Os sphenoidale'nin ala major'u","Os temporale'nin proc. mastoideus'u"],"kgman"],
 ["Processus coronoideus'a hangi kas tutunur?","M. temporalis",["M. masseter","M. pterygoideus lateralis","M. digastricus"],"kgman"],
 ["Canalis opticus hangi kemiktedir?","Os sphenoidale (ala minor)",["Os ethmoidale","Os frontale","Os sphenoidale (ala major)"],"kgorb"],
 ["Fissura orbitalis superior hangi yapılar arasındadır?","Ala minor ve ala major",["Ala major ve maxilla","Os frontale ve os ethmoidale","Os zygomaticum ve maxilla"],"kgorb"],
 ["Fissura orbitalis inferior hangi yapılar arasındadır?","Ala major ve maxilla",["Ala minor ve ala major","Os frontale ve os sphenoidale","Os lacrimale ve os ethmoidale"],"kgorb"],
 ["Orbitanın iç (medial) duvarını en çok hangisi yapar?","Lamina orbitalis ossis ethmoidalis",["Facies orbitalis ossis zygomatici","Facies orbitalis alae majoris","Facies orbitalis corporis maxillae"],"kgorb"],
 ["Orbitanın dış (lateral) duvarını hangileri yapar?","Os zygomaticum ve ala major",["Os ethmoidale ve os lacrimale","Os frontale ve ala minor","Maxilla ve os palatinum"],"kgorb"],
 ["Orbitanın çatısını hangileri yapar?","Os frontale ve ala minor",["Maxilla ve os zygomaticum","Os ethmoidale ve os lacrimale","Ala major ve os zygomaticum"],"kgorb"],
 ["Hangisi orbitanın tabanına katılmaz?","Ala minor",["Maxilla","Os zygomaticum","Os palatinum (processus orbitalis)"],"kgorb"],
 ["Fissura pterygomaxillaris hangi yapılar arasındadır?","Tuber maxillae ve lamina lateralis processus pterygoidei",["Ala major ve ala minor","Maxilla ve os zygomaticum","Os palatinum ve vomer"],"kgorb"],
 ["Hamulus pterygoideus hangi laminanın ucundadır?","Lamina medialis processus pterygoidei",["Lamina lateralis processus pterygoidei","Lamina perpendicularis","Lamina orbitalis"],"kgorb"],
 ["Fossa temporalis ile fossa infratemporalis'i ayıran yapı hangisidir?","Crista infratemporalis",["Arcus zygomaticus","Linea temporalis inferior","Crista supramastoidea"],"kgorb"]
);
})();
