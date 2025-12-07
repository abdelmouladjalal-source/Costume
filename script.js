// ===== مقاسات جديدة =====
const pantSizes=[42,44,46,48,50,52,54,56];
const giletSizes=[42,44,46,48,50,52,54,56];
const vestSizes=[42,44,46,48,50,52,54,56];
const shirtSizes=["XS","S","M","L","XL","XXL","XXXL"];
const shoeSizes=[39,40,41,42,43,44];

// ===== المخازن =====
let Couleurs=[], pants=[], gilets=[], vests=[], shirts=[], shoes=[], ties=[], bows=[], belts=[], renters=[];

// ===== استرجاع البيانات =====
Couleurs= JSON.parse(localStorage.getItem("Couleurs")) || [];
pants = JSON.parse(localStorage.getItem("pants")) || [];
gilets = JSON.parse(localStorage.getItem("gilets")) || [];
vests = JSON.parse(localStorage.getItem("vests")) || [];
shirts = JSON.parse(localStorage.getItem("shirts")) || [];
shoes = JSON.parse(localStorage.getItem("shoes")) || [];
ties = JSON.parse(localStorage.getItem("ties")) || [];
bows = JSON.parse(localStorage.getItem("bows")) || [];
belts = JSON.parse(localStorage.getItem("belts")) || [];
renters = JSON.parse(localStorage.getItem("renters")) || [];

// ===== ملأ المخزون إذا فارغ =====
if(Couleurs.length==0){for(let i=1;i<=15;i++) couleurSizes.forEach(s=>Couleurs.push({name:"لون "+i,size:s,status:"متوفر"}));}
if(pants.length==0){for(let i=1;i<=15;i++) pantSizes.forEach(s=>pants.push({name:"سروال "+i,size:s,status:"متوفر"}));}
if(gilets.length==0){for(let i=1;i<=15;i++) giletSizes.forEach(s=>gilets.push({name:"جيلي "+i,size:s,status:"متوفر"}));}
if(vests.length==0){for(let i=1;i<=15;i++) vestSizes.forEach(s=>vests.push({name:"فاست "+i,size:s,status:"متوفر"}));}
if(shirts.length==0){for(let i=1;i<=3;i++) shirtSizes.forEach(s=>shirts.push({name:"قميص "+i,size:s,status:"متوفر"}));}
if(shoes.length==0){for(let i=1;i<=15;i++) shoeSizes.forEach(s=>shoes.push({name:"حذاء "+i,size:s,status:"متوفر"}));}
if(ties.length==0){for(let i=1;i<=20;i++) ties.push({name:"ربطة "+i,status:"متوفر"});}
if(bows.length==0){for(let i=1;i<=10;i++) bows.push({name:"فراشة "+i,status:"متوفر"});}
if(belts.length==0){for(let i=1;i<=3;i++) belts.push({name:"حزام "+i,status:"متوفر"});}

// ===== حفظ البيانات =====
function saveData(){
 localStorage.setItem("Couleurs",JSON.stringify(Couleurs));
 localStorage.setItem("pants",JSON.stringify(pants));
 localStorage.setItem("gilets",JSON.stringify(gilets));
 localStorage.setItem("vests",JSON.stringify(vests));
 localStorage.setItem("shirts",JSON.stringify(shirts));
 localStorage.setItem("shoes",JSON.stringify(shoes));
 localStorage.setItem("ties",JSON.stringify(ties));
 localStorage.setItem("bows",JSON.stringify(bows));
 localStorage.setItem("belts",JSON.stringify(belts));
 localStorage.setItem("renters",JSON.stringify(renters));
}

// ===== عرض جدول =====
function table(data,id,keys){
 let t=document.getElementById(id); if(!t) return; t.innerHTML="";
 data.forEach(x=>{
  let r=`<tr class="${x.status=="متوفر"?"available":"unavailable"}">`;
  keys.forEach(k=>r+=`<td>${x[k]}</td>`); r+=`<td>${x.status || ''}</td>`;
  t.innerHTML+=r;
 });
}

// ===== تحميل كل المخازن =====
function loadPants(){table(couleurs,"couleursTable",["name",]);}
function loadPants(){table(pants,"pantsTable",["name","size"]);}
function loadGilets(){table(gilets,"giletsTable",["name","size"]);}
function loadVests(){table(vests,"vestsTable",["name","size"]);}
function loadShirts(){table(shirts,"shirtsTable",["name","size"]);}
function loadShoes(){table(shoes,"shoesTable",["name","size"]);}
function loadTies(){table(ties,"tiesTable",["name"]);}
function loadBows(){table(bows,"bowsTable",["name"]);}
function loadBelts(){table(belts,"beltsTable",["name"]);}

// ===== ملأ القوائم في التأجير =====
function fill(){
 if(!selPant) return;
 selPant.innerHTML='<option value="">لون</option>'; couleurs.filter(x=>x.status=="متوفر").forEach((x,i)=>selcouleur.innerHTML+=`<option value="${i}">${x.name}$</option>`);
 selPant.innerHTML='<option value="">سروال</option>'; pants.filter(x=>x.status=="متوفر").forEach((x,i)=>selPant.innerHTML+=`<option value="${i}">${x.name}-${x.size}</option>`);
 selGilet.innerHTML='<option value="">جيلي</option>'; gilets.filter(x=>x.status=="متوفر").forEach((x,i)=>selGilet.innerHTML+=`<option value="${i}">${x.name}-${x.size}</option>`);
 selVest.innerHTML='<option value="">فاست</option>'; vests.filter(x=>x.status=="متوفر").forEach((x,i)=>selVest.innerHTML+=`<option value="${i}">${x.name}-${x.size}</option>`);
 selShirt.innerHTML='<option value="">قميص</option>'; shirts.filter(x=>x.status=="متوفر").forEach((x,i)=>selShirt.innerHTML+=`<option value="${i}">${x.name}-${x.size}</option>`);
 selNeck.innerHTML='<option value="">ربطة/فراشة</option>'; [...ties,...bows].filter(x=>x.status=="متوفر").forEach(x=>selNeck.innerHTML+=`<option value="${x.name}">${x.name}</option>`);
 selShoe.innerHTML='<option value="">حذاء</option>'; shoes.filter(x=>x.status=="متوفر").forEach((x,i)=>selShoe.innerHTML+=`<option value="${i}">${x.name}-${x.size}</option>`);
 selBelt.innerHTML='<option value="">حزام</option>'; belts.filter(x=>x.status=="متوفر").forEach((x,i)=>selBelt.innerHTML+=`<option value="${i}">${x.name}</option>`);
}

// ===== تسجيل التأجير وحساب السعر =====
function rentNow(){
 let err=false;
 [selcouleur,selPant,selGilet,selVest,selShirt,selNeck,selShoe,selBelt].forEach(x=>{
  if(!x.value){x.style.background="#ffc7ce"; err=true}else x.style.background="";
 });
 if(err) return alert("اختر جميع العناصر");

 let price = 500+400+300+300+100+200+150; // سعر تقريبي لكل صنف

 // تحديث المخزون
 couleurs[selPant.value].status="مؤجر";
 pants[selPant.value].status="مؤجر";
 gilets[selGilet.value].status="مؤجر";
 vests[selVest.value].status="مؤجر";
 shirts[selShirt.value].status="مؤجر";
 shoes[selShoe.value].status="مؤجر";
 belts[selBelt.value].status="مؤجر";

 let t=ties.find(x=>x.name==selNeck.value) || bows.find(x=>x.name==selNeck.value);
 if(t) t.status="مؤجر";

 renters.push({
  fname: fname.value,
  lname: lname.value,
  phone: phone.value,
  rentDate: rentDate.value,
  returnDate: returnDate.value,
  pant: Couleurs[selCouleur.value].name,
  pant: pants[selPant.value].name,
  gilet: gilets[selGilet.value].name,
  vest: vests[selVest.value].name,
  shirt: shirts[selShirt.value].name,
  neck: selNeck.value,
  shoe: shoes[selShoe.value].name,
  belt: belts[selBelt.value].name,
  price: price
 });

 alert("تم التأجير بنجاح! السعر: "+price+" DA");
 fill(); saveData(); loadcouleurs(); loadPants(); loadGilets(); loadVests(); loadShirts(); loadShoes(); loadTies(); loadBows(); loadBelts(); loadRenters();
}

// ===== قائمة المؤجرين =====
function loadRenters(data=renters){
 let t=document.getElementById("rentersTable"); if(!t) return; t.innerHTML="";
 data.forEach((r,i)=>{
  t.innerHTML+=`<tr>
   <td>${r.fname}</td><td>${r.lname}</td><td>${r.phone}</td>
   <td>${r.couleur}<td>${r.pant}</td><td>${r.gilet}</td><td>${r.vest}</td><td>${r.shirt}</td>
   <td>${r.neck}</td><td>${r.shoe}</td><td>${r.belt}</td>
   <td>${r.rentDate}</td><td>${r.returnDate}</td>
   <td>${r.price}</td>
   <td><button onclick="printReceipt(${i})">طباعة</button></td>
  </tr>`;
 });
}

function filterRenters(){
 let val=document.getElementById("searchRenter").value.toLowerCase();
 let filtered=renters.filter(r=> 
  r.fname.toLowerCase().includes(val) ||
  r.lname.toLowerCase().includes(val) ||
  r.phone.includes(val) ||
  r.pant.toLowerCase().includes(val)
 );
 loadRenters(filtered);
}

function printReceipt(i){
 let r=renters[i];
 let w=window.open("","_blank");
 w.document.write(`<h2>وصل تأجير</h2>
<p>الاسم: ${r.fname} ${r.lname}</p>
<p>الهاتف: ${r.phone}</p>
<p>لون: ${r.couleur}</p>
<p>سروال: ${r.pant}</p>
<p>جيلي: ${r.gilet}</p>
<p>فاست: ${r.vest}</p>
<p>قميص: ${r.shirt}</p>
<p>ربطة/فراشة: ${r.neck}</p>
<p>حذاء: ${r.shoe}</p>
<p>حزام: ${r.belt}</p>
<p>تاريخ التأجير: ${r.rentDate}</p>
<p>تاريخ الإرجاع: ${r.returnDate}</p>
<p>السعر: ${r.price} DA</p>
<hr><p>شكراً لتعاملكم معنا!</p>`);
 w.print();
}

// ===== تاريخ اليوم تلقائي =====
if(document.getElementById("rentDate")) rentDate.value=new Date().toISOString().split("T")[0];
fill(); loadcouleurs(); loadPants(); loadGilets(); loadVests(); loadShirts(); loadShoes(); loadTies(); loadBows(); loadBelts(); loadRenters();


