/* KAFATASI GENEL YAPI – 3. sayfa: "Cranium: Midsagittal Kesit" ve burun boşluğunun lateral duvarı.
   kafatasi.js'ten SONRA yüklenir; aynı derse (18) eklenir. Biçim kafatasi.js ile aynıdır. */
(function(){
'use strict';
const EK=window.EK;if(!EK||!EK.lessons[18])return;
const E=(y0,y1,e,s0,s1)=>({y:[y0,y1],e,s:s0===undefined?null:[s0,s1]});
const Q=(y0,y1,q)=>({y:[y0,y1],q});
const FR=52734,PAR=52788,OCC=52735,TMP=52738,SPH=52736,ETH=52740,MAX=53649,MAXL=53650,CON=54737,PAL=53655,PALL=53656;
const T=(la,tr,ok,g,k,yer,alt)=>[la,tr,ok,g,alt||[],"",{d:{k:[].concat(k||[])},yer}];
const NOT_DUVAR='!Ders notunda elle eklenmiş (burun boşluğunun lateral duvarı)';

EK.topics.kgsag=["Midsagittal kesit ve burun boşluğu",18];
EK.cat=EK.cat||{};EK.cat.kgsag='kemik';
Object.assign(EK.groups,{kg9:["Midsagittal kesit: kafatasının iç yüzü ve tabanı","kgsag"],kg10:["Burun boşluğunun lateral duvarı","kgsag"]});

EK.raw.push(
T("Os palatinum","Damak kemiği (çift)","os palatinum","kg1",["Sert damağın arka kısmını, burun boşluğunun lateral duvarının arka kısmını ve orbita tabanının küçük bir parçasını yapar","L harfine benzer: lamina horizontalis ve lamina perpendicularis"],{f:[MAX,MAXL,SPH],hi:[PAL,PALL],v:'alt'}),
/* iç yüz ve kafa tabanı */
T("Sinus frontalis","Os frontale içindeki hava boşluğu","sinus frontalis","kg9",["!Os frontale'nin parçası","Kaş kemerlerinin arkasındadır; meatus nasi medius'a açılır"],{f:[FR],ref:'nfr:Sinus frontalis'}),
T("Crista galli","Horoz ibiği şeklindeki çıkıntı","krista galli","kg9",["!Os ethmoidale'nin parçası","Falx cerebri tutunur"],{f:[ETH,FR],on:[ETH],ref:'net:Crista galli'}),
T("Lamina cribrosa","Os ethmoidale'nin delikli yatay yaprağı","lamina kribroza","kg9",["!Os ethmoidale'nin parçası","Deliklerinden koku sinirinin lifleri (fila olfactoria) geçer","Burun boşluğunun çatısını yapar"],{f:[ETH],ref:'net:Lamina cribrosa'}),
T("Corpus ossis sphenoidalis","Sphenoidin küp şeklindeki gövdesi","korpus ossis sfenoidalis","kg9",["!Os sphenoidale'nin parçası","İçinde sinus sphenoidalis bulunur"],{f:[SPH],ref:'nsp:Corpus (os sphenoidale)'},["Corpus (os sphenoidale)"]),
T("Sella turcica","Türk eğeri","sella turkika","kg9",["!Os sphenoidale'nin parçası","Ortasındaki fossa hypophysialis'te hipofiz bezi oturur"],{f:[SPH],ref:'nsp:Sella turcica'}),
T("Processus clinoideus anterior","Ala minor'un arka-iç ucundaki çıkıntı","prosessus klinoideus anteriyor","kg9",["!Os sphenoidale'nin parçası","Sella turcica'nın ön-yan köşesindedir"],{f:[SPH],ref:'nsp:Processus clinoideus anterior'}),
T("Sinus sphenoidalis","Sphenoid gövdesindeki hava boşluğu","sinus sfenoidalis","kg9",["!Os sphenoidale'nin parçası","Apertura sinus sphenoidalis ile recessus sphenoethmoidalis'e açılır"],{f:[SPH],ref:'nsp:Sinus sphenoidalis'}),
T("Lamina medialis processus pterygoidei","Proc. pterygoideus'un dar iç yaprağı","lamina mediyalis prosessus pterigoideyi","kg9",["!Os sphenoidale'nin parçası","Alt ucunda hamulus pterygoideus bulunur; burun boşluğunun arka-yan sınırına katılır"],{f:[SPH],ref:'nsp:Lamina medialis processus pterygoidei'}),
T("Sulci arteriae meningeae mediae","Os parietale iç yüzündeki dallanan oluklar","sulsi arteriye meningeye mediye","kg9",["!Atlasta os parietale'nin iç yüzünde “Sulci aa., vv. meningeae mediae” olarak gösterilir","A. ve v. meningea media'nın izleridir; pterion kırıklarında yaralanabilir"],{f:[PAR],r:Q(.2,.6,[-.2,.5,.6]),ad:'Os parietale (iç yüz)',v:'ic'},["Sulcus arteriae meningeae mediae"]),
T("Pars petrosa","Os temporale'nin piramit şeklindeki sert parçası","pars petroza","kg9",["!Os temporale'nin parçası","İçinde iç kulak ve orta kulak bulunur; kafa tabanında orta ve arka kafa çukurlarını ayırır"],{f:[TMP],ref:'nte:Pars petrosa',v:'ic'}),
T("Meatus acusticus internus","İç kulak yolu","meatus akustikus internus","kg9",["!Os temporale'nin parçası (pars petrosa)","N. facialis, n. vestibulocochlearis ve a. labyrinthi geçer"],{f:[TMP],ref:'nte:Meatus acusticus internus',v:'ic'},["Porus acusticus internus"]),
T("Sulcus sinus petrosi superioris","Pars petrosa'nın üst kenarındaki oluk","sulkus sinus petrozi superiyoris","kg9",["!Os temporale'nin parçası","Sinus petrosus superior'un izidir"],{f:[TMP],r:E(.35,.75,[-.6,1,0]),ad:'Os temporale (pars petrosa üst kenarı)',v:'ic'}),
T("Apertura externa aqueductus vestibuli","Pars petrosa'nın arka yüzündeki küçük açıklık","apertura eksterna akveduktus vestibuli","kg9",["!Os temporale'nin parçası","Meatus acusticus internus'un arka-alt tarafındadır; ductus endolymphaticus geçer"],{f:[TMP],r:Q(.3,.55,[-.2,.5,.2]),ad:'Os temporale (pars petrosa arka yüzü)',v:'ic'}),
T("Sulcus sinus sigmoidei","S şeklindeki venöz sinüs oluğu","sulkus sinus sigmoideyi","kg9",["!Atlasta os temporale ve os occipitale iç yüzünde gösterilir","Sinus transversus'un devamıdır; foramen jugulare'de v. jugularis interna olur"],{f:[TMP,OCC],on:[TMP],r:Q(.15,.5,[-.2,.5,.15]),ad:'Os temporale (pars mastoidea iç yüzü)',v:'ic'}),
T("Sulcus sinus transversi","Os occipitale iç yüzündeki yatay venöz sinüs oluğu","sulkus sinus transversi","kg9",["!Os occipitale'nin parçası","Protuberantia occipitalis interna'dan iki yana uzanır; sulcus sinus sigmoidei ile devam eder"],{f:[OCC],r:Q(.45,.65,[.82,.5,1.2]),ad:'Os occipitale (iç yüz)'}),
T("Foramen jugulare","Kafa tabanındaki şah damarı deliği","foramen jugulare","kg9",["!Atlasta midsagittal kesitte gösterilir","Os occipitale ile os temporale'nin pars petrosa'sı arasındadır","V. jugularis interna, n. glossopharyngeus, n. vagus ve n. accessorius geçer"],{f:[OCC,TMP],on:[OCC],ref:'noc:Processus jugularis',ad:'Os occipitale (foramen jugulare’nin arka sınırı)'}),
T("Sulcus sinus petrosi inferioris","Pars petrosa ile pars basilaris arasındaki oluk","sulkus sinus petrozi inferiyoris","kg9",["!Atlasta os occipitale tarafında gösterilir","Sinus petrosus inferior'un izidir; foramen jugulare'ye uzanır"],{f:[OCC],r:Q(0,.3,[.72,1.2,.82]),ad:'Os occipitale (pars basilaris yan kenarı)'}),
T("Canalis nervi hypoglossi","Hipoglossal sinir kanalı","kanalis nervi hipoglossi","kg9",["!Os occipitale'nin parçası","Condylus occipitalis'in tabanını deler; n. hypoglossus (XII) geçer"],{f:[OCC],ref:'noc:Condylus occipitalis',ad:'Os occipitale (condylus occipitalis tabanı)'},["Canalis hypoglossi"]),
T("Foramen magnum","Büyük delik","foramen magnum","kg9",["!Os occipitale'nin parçası","Medulla oblongata, aa. vertebrales ve n. accessorius'un spinal kökü geçer"],{f:[OCC],ref:'noc:Foramen magnum'}),
T("Condylus occipitalis","Os occipitale'nin eklem çıkıntısı","kondilus oksipitalis","kg9",["!Os occipitale'nin parçası","Atlas ile art. atlantooccipitalis'i yapar"],{f:[OCC],ref:'noc:Condylus occipitalis'}),
T("Pars basilaris","Os occipitale'nin foramen magnum önündeki parçası","pars bazilaris","kg9",["!Os occipitale'nin parçası","Sphenoid gövdesiyle birlikte clivus'u yapar"],{f:[OCC],ref:'noc:Pars basilaris'}),
T("Canalis incisivus","Kesici dişlerin arkasındaki damak kanalı","kanalis insizivus","kg9",["!Maxilla'nın parçası","N. nasopalatinus geçer; burun boşluğunu ağız boşluğuna bağlar"],{f:[MAX,MAXL],on:[MAX],r:Q(.18,.32,[-.2,.5,.8]),ad:'Maxilla (orta hat)',v:'alt'}),
T("Processus palatinus","Maxilla'nın içe uzanan damak çıkıntısı","prosessus palatinus","kg9",["!Maxilla'nın parçası","Sert damağın ön 2/3'ünü yapar; arkada os palatinum'un lamina horizontalis'i ile birleşir"],{f:[MAX,MAXL],on:[MAX],r:Q(.15,.32,[.25,-.2,.5]),ad:'Maxilla',v:'alt'},["Processus palatinus (maxilla)"]),
T("Facies nasalis (maxilla)","Maxilla gövdesinin burun boşluğuna bakan yüzü","fasiyes nazalis","kg9",["!Maxilla'nın parçası","Burun boşluğunun lateral duvarının büyük kısmını yapar; ortasında sinus maxillaris'in açıklığı bulunur"],{f:[MAX],r:Q(.35,.6,[-.2,.5,.45]),ad:'Maxilla (iç yüz)',v:'ic'},["Facies nasalis"]),
/* burun boşluğunun lateral duvarı */
T("Concha nasalis superior","Üst burun kavkısı","konka nazalis superiyor","kg10",["!Os ethmoidale'nin parçası","Kavkıların en küçüğüdür"],{f:[ETH],ref:'net:Concha nasalis superior'}),
T("Meatus nasi superior","Üst burun yolu","meatus nazi superiyor","kg10",[NOT_DUVAR,"Concha nasalis superior'un altındadır","Arka ethmoid hücreleri buraya açılır"],{f:[ETH],ref:'net:Concha nasalis superior',ad:'Os ethmoidale (concha nasalis superior altı)'}),
T("Meatus nasi medius","Orta burun yolu","meatus nazi mediyus","kg10",[NOT_DUVAR,"Concha nasalis media'nın altındadır","Sinus frontalis, sinus maxillaris ve ön-orta ethmoid hücreleri buraya açılır"],{f:[MAX,ETH],on:[MAX],r:Q(.45,.6,[-.2,.5,.5]),ad:'Maxilla iç yüzü (concha nasalis media altı)',v:'ic'}),
T("Meatus nasi inferior","Alt burun yolu","meatus nazi inferiyor","kg10",[NOT_DUVAR,"!Ders notu: ductus nasolacrimalis buraya açılır","Concha nasalis inferior'un altındadır"],{f:[MAX,CON],on:[MAX],r:Q(.25,.38,[-.2,.5,.5]),ad:'Maxilla iç yüzü (concha nasalis inferior altı)',v:'ic'}),
T("Apertura sinus sphenoidalis","Sinus sphenoidalis'in burun boşluğuna açılan deliği","apertura sinus sfenoidalis","kg10",["!Os sphenoidale'nin parçası","Corpus'un ön yüzündedir; recessus sphenoethmoidalis'e açılır"],{f:[SPH],r:Q(.45,.7,[.56,.5,1.2]),ad:'Os sphenoidale (corpus ön yüzü)'}),
T("Foramen sphenopalatinum","Burun boşluğunun arka-üst duvarındaki delik","foramen sfenopalatinum","kg10",["!Atlasta os palatinum ile os sphenoidale arasında gösterilir","Burun boşluğunu fossa pterygopalatina'ya bağlar; a. sphenopalatina ve aynı adlı sinirler geçer"],{f:[PAL,SPH],on:[PAL],r:E(.8,1,[-.5,1,-.3]),ad:'Os palatinum (üst kenar)',v:'ic'}),
T("Lamina perpendicularis ossis palatini","Os palatinum'un dik yaprağı","lamina perpendikularis ossis palatini","kg10",["!Os palatinum'un parçası","Burun boşluğunun lateral duvarının arka kısmını yapar"],{f:[PAL],r:Q(.4,.8,[-.2,.5,.5]),ad:'Os palatinum',v:'ic'}),
T("Lamina horizontalis ossis palatini","Os palatinum'un yatay yaprağı","lamina horizontalis ossis palatini","kg10",["!Os palatinum'un parçası","Sert damağın arka 1/3'ünü yapar"],{f:[PAL],r:E(0,.2,[-.6,-1,0]),ad:'Os palatinum',v:'alt'})
);

EK.facts.push(
 ["Ductus nasolacrimalis hangi burun yoluna açılır?","Meatus nasi inferior",["Meatus nasi medius","Meatus nasi superior","Recessus sphenoethmoidalis"],"kgsag"],
 ["Sinus frontalis ve sinus maxillaris hangi burun yoluna açılır?","Meatus nasi medius",["Meatus nasi inferior","Meatus nasi superior","Recessus sphenoethmoidalis"],"kgsag"],
 ["Sinus sphenoidalis nereye açılır?","Recessus sphenoethmoidalis",["Meatus nasi medius","Meatus nasi inferior","Meatus nasi superior"],"kgsag"],
 ["Arka ethmoid hücreleri hangi burun yoluna açılır?","Meatus nasi superior",["Meatus nasi medius","Meatus nasi inferior","Recessus sphenoethmoidalis"],"kgsag"],
 ["Concha nasalis superior ve media hangi kemiğin parçasıdır?","Os ethmoidale",["Maxilla","Os palatinum","Os sphenoidale"],"kgsag"],
 ["Sella turcica'nın fossa hypophysialis'inde ne oturur?","Hipofiz bezi",["Bulbus olfactorius","Ganglion trigeminale","Chiasma opticum"],"kgsag"],
 ["Lamina cribrosa'nın deliklerinden ne geçer?","Fila olfactoria (koku siniri lifleri)",["N. opticus","N. trigeminus","N. facialis"],"kgsag"],
 ["Crista galli'ye ne tutunur?","Falx cerebri",["Tentorium cerebelli","Falx cerebelli","Diaphragma sellae"],"kgsag"],
 ["Sert damağı hangileri yapar?","Maxilla'nın processus palatinus'u ve os palatinum'un lamina horizontalis'i",["Vomer ve os palatinum","Maxilla'nın processus alveolaris'i ve vomer","Os palatinum'un lamina perpendicularis'i ve maxilla"],"kgsag"],
 ["Foramen jugulare'yi hangi kemikler oluşturur?","Os occipitale ve os temporale (pars petrosa)",["Os occipitale ve os sphenoidale","Os temporale ve os sphenoidale","Yalnızca os occipitale"],"kgsag"],
 ["Canalis nervi hypoglossi'den hangi sinir geçer?","N. hypoglossus (XII)",["N. vagus (X)","N. accessorius (XI)","N. glossopharyngeus (IX)"],"kgsag"],
 ["Meatus acusticus internus'tan hangi sinirler geçer?","N. facialis ve n. vestibulocochlearis",["N. glossopharyngeus ve n. vagus","N. trigeminus ve n. abducens","N. hypoglossus ve n. accessorius"],"kgsag"],
 ["Foramen jugulare'den hangisi geçmez?","N. hypoglossus",["V. jugularis interna","N. vagus","N. accessorius"],"kgsag"],
 ["Foramen sphenopalatinum burun boşluğunu hangi çukura bağlar?","Fossa pterygopalatina",["Fossa infratemporalis","Orbita","Fossa cranii media"],"kgsag"],
 ["Os palatinum'un hangi parçası burun boşluğunun lateral duvarına katılır?","Lamina perpendicularis",["Lamina horizontalis","Processus orbitalis","Hamulus pterygoideus"],"kgsag"],
 ["Canalis incisivus'tan hangi sinir geçer?","N. nasopalatinus",["N. palatinus major","N. infraorbitalis","N. alveolaris inferior"],"kgsag"],
 ["Clivus'u hangi yapılar oluşturur?","Os occipitale'nin pars basilaris'i ve sphenoid gövdesi",["Pars petrosa ve pars basilaris","Ala major ve pars squamosa","Sella turcica ve lamina cribrosa"],"kgsag"],
 ["Sulcus sinus sigmoidei'deki sinüs nerede v. jugularis interna'ya dönüşür?","Foramen jugulare",["Foramen magnum","Meatus acusticus internus","Canalis nervi hypoglossi"],"kgsag"]
);
})();
