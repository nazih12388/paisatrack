[Uploading index (1).html…]()
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0b7a55"><link rel="manifest" href="manifest.json"><link rel="icon" href="icon-192.png">
<title>PaisaTrack</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#f3f5f4;--card:#fff;--tx:#14211c;--mu:#64736c;--br:#e2e8e5;--em:#0b7a55;--em2:#12a373;--rd:#c8433a;--am:#b7791f;--sel:#e3f5ee;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0e1512;--card:#17211d;--tx:#e8f1ed;--mu:#8fa39a;--br:#26342e;--em:#2bc48d;--em2:#18a074;--rd:#ef7a70;--am:#e0a84a;--sel:#1b3a2f;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#0e1512;--card:#17211d;--tx:#e8f1ed;--mu:#8fa39a;--br:#26342e;--em:#2bc48d;--em2:#18a074;--rd:#ef7a70;--am:#e0a84a;--sel:#1b3a2f;color-scheme:dark}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.45 "Plus Jakarta Sans","Segoe UI",Roboto,sans-serif}
main{max-width:560px;margin:0 auto;padding:16px 16px 96px}
h1{font-size:20px;margin:0}h2{font-size:16px;margin:20px 0 10px}
.hero{background:linear-gradient(135deg,var(--em),var(--em2));color:#fff;border-radius:24px;padding:22px}
.hero small{opacity:.85}.hero .big{font-size:34px;font-weight:700;margin:4px 0 14px}
.hero .row{display:flex;gap:16px}.hero .row div{flex:1}.hero b{display:block;font-size:16px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.card{background:var(--card);border:1px solid var(--br);border-radius:16px;padding:14px}
.card small{color:var(--mu);display:block}.card b{font-size:17px}
.pos{color:var(--em)}.neg{color:var(--rd)}.warn{color:var(--am)}
.qa{display:flex;gap:8px;margin-top:12px;overflow-x:auto}
button,select,input,textarea{font:inherit;color:inherit}
.chip{border:1px solid var(--br);background:var(--card);border-radius:999px;padding:9px 14px;white-space:nowrap;cursor:pointer}
.chip.on{background:var(--sel);border-color:var(--em);color:var(--em)}
.btn{background:var(--em);color:#fff;border:0;border-radius:14px;padding:13px 18px;font-weight:700;width:100%;cursor:pointer}
.btn.ghost{background:transparent;color:var(--em);border:1px solid var(--em)}
.item{display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid var(--br);cursor:pointer}
.item:last-child{border:0}.av{width:40px;height:40px;border-radius:12px;background:var(--sel);color:var(--em);display:grid;place-items:center;font-weight:700;flex:none}
.item .m{flex:1;min-width:0}.item .m div{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.item .m small{color:var(--mu)}
.amt{font-weight:700;white-space:nowrap}
input,select,textarea{width:100%;background:var(--card);border:1px solid var(--br);border-radius:12px;padding:11px 12px;margin:4px 0 10px}
label{font-size:13px;color:var(--mu)}
nav{position:fixed;left:0;right:0;bottom:0;background:var(--card);border-top:1px solid var(--br);display:flex;padding:6px 6px calc(6px + env(safe-area-inset-bottom,0px))}
nav button{flex:1;background:none;border:0;color:var(--mu);padding:6px 0;font-size:11px;cursor:pointer}
nav button span{display:block;font-size:20px}nav button.on{color:var(--em);font-weight:700}
.sheet{position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;align-items:flex-end;justify-content:center;z-index:5}
.sheet.open{display:flex}.sheet>div{background:var(--bg);width:100%;max-width:560px;max-height:92%;overflow:auto;border-radius:24px 24px 0 0;padding:18px 16px 28px}
.bar{height:8px;border-radius:4px;background:var(--em);margin-top:4px}
.scroll{overflow-x:auto}.empty{color:var(--mu);text-align:center;padding:28px 0}
.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.shot{max-width:100%;border-radius:12px;margin-bottom:10px}
.card.red{border-color:var(--rd);background:color-mix(in srgb,var(--rd) 10%,var(--card))}.item.red .m div,.item.red .amt{color:var(--rd);font-weight:700}
</style>
</head>
<body>
<main id="app"></main>
<nav id="nav"></nav>
<div class="sheet" id="sheet"><div id="sheetBody"></div></div>
<script>
const TYPES=["Income","Expense","Money Lent","Money Borrowed","Loan Repayment","Transfer"];
const CATS=["Food","Shopping","Travel","College fees","Bills","Loan","Salary or gift","Other"];
const METHODS=["Google Pay","UPI","Cash","Bank Transfer","Other"];
const NAV=[["home","⌂","Home"],["tx","☰","Transactions"],["people","☺","People"],["rep","▥","Reports"],["set","⚙","Settings"]];
let tab="home",tx=[],flt={q:"",type:"",method:"",from:"",to:""};
try{tx=JSON.parse(localStorage.getItem("pt_tx")||"[]")}catch(e){tx=[]}
const save=()=>{try{localStorage.setItem("pt_tx",JSON.stringify(tx))}catch(e){alert("Storage is full. Export a backup and delete old screenshots.")}syncSoon()};
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const inr=n=>(n<0?"−":"")+"₹"+Math.abs(n).toLocaleString("en-IN",{maximumFractionDigits:2});
const fd=d=>new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
// sign effect on cash balance
function eff(t){switch(t.type){case"Income":case"Money Borrowed":return t.amt;case"Expense":case"Money Lent":return -t.amt;case"Loan Repayment":return t.dir==="Paid"?-t.amt:t.amt;default:return 0}}
// effect on person net: positive = they owe me
function pnet(t){if(t.type==="Money Lent")return t.amt;if(t.type==="Money Borrowed")return -t.amt;if(t.type==="Loan Repayment")return t.dir==="Paid"?t.amt:-t.amt;return 0}
function stats(){const s={bal:0,inc:0,exp:0,lent:0,bor:0,rec:0,pay:0};tx.forEach(t=>{s.bal+=eff(t);if(t.type==="Income"||(t.type==="Loan Repayment"&&t.dir!=="Paid"))s.inc+=t.amt;if(t.type==="Expense")s.exp+=t.amt;if(t.type==="Money Lent")s.lent+=t.amt;if(t.type==="Money Borrowed")s.bor+=t.amt});
 people().forEach(p=>{if(p.net>0)s.rec+=p.net;else s.pay-=p.net});return s}
function people(){const m={};tx.forEach(t=>{if(!t.person)return;const p=m[t.person]||(m[t.person]={name:t.person,lent:0,bor:0,rep:0,net:0,list:[]});if(t.type==="Money Lent")p.lent+=t.amt;if(t.type==="Money Borrowed")p.bor+=t.amt;if(t.type==="Loan Repayment")p.rep+=t.amt;p.net+=pnet(t);p.list.push(t)});
 return Object.values(m).filter(p=>p.lent||p.bor||p.rep).sort((a,b)=>Math.abs(b.net)-Math.abs(a.net))}
function nav(){$("#nav").innerHTML=NAV.map(n=>`<button class="${tab===n[0]?"on":""}" onclick="go('${n[0]}')"><span>${n[1]}</span>${n[2]}</button>`).join("")}
function go(t){tab=t;render();scrollTo(0,0)}
function row(t){const e=eff(t),loan=t.type==="Money Lent"||t.type==="Money Borrowed";
 return `<div class="item" onclick="openTx('${t.id}')"><div class="av">${esc((t.person||t.cat||t.type)[0]).toUpperCase()}</div><div class="m"><div>${esc(t.person||t.cat)} <small>${esc(t.type)}</small></div><small>${fd(t.dt)} · ${esc(t.method)}${t.note?" · "+esc(t.note):""}</small></div><div class="amt ${e>0?"pos":e<0?"neg":""}">${e===0?inr(t.amt):(e>0?"+":"")+inr(e)}</div></div>`}
function chart(){const now=new Date(),ms=[];for(let i=5;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1);ms.push({k:d.getFullYear()*12+d.getMonth(),l:d.toLocaleString("en",{month:"short"}),i:0,e:0})}
 tx.forEach(t=>{const d=new Date(t.dt),k=d.getFullYear()*12+d.getMonth(),m=ms.find(x=>x.k===k);if(!m)return;if(t.type==="Income")m.i+=t.amt;if(t.type==="Expense")m.e+=t.amt});
 const mx=Math.max(1,...ms.map(m=>Math.max(m.i,m.e)));
 return `<svg viewBox="0 0 320 150" width="100%" role="img" aria-label="Monthly income versus expense">${ms.map((m,i)=>{const x=i*53+8,hi=m.i/mx*100,he=m.e/mx*100;return `<rect x="${x}" y="${115-hi}" width="19" height="${hi}" rx="4" fill="var(--em)"/><rect x="${x+22}" y="${115-he}" width="19" height="${he}" rx="4" fill="var(--rd)"/><text x="${x+20}" y="136" text-anchor="middle" font-size="11" fill="var(--mu)">${m.l}</text>`}).join("")}</svg><small style="color:var(--mu)"><span class="pos">■</span> Income &nbsp;<span class="neg">■</span> Expense</small>`}
function home(){const s=stats(),mo=new Date(),thisM=tx.filter(t=>t.type==="Expense"&&new Date(t.dt).getMonth()===mo.getMonth()&&new Date(t.dt).getFullYear()===mo.getFullYear()).reduce((a,t)=>a+t.amt,0),owe=people().filter(p=>p.net<0),r=[...tx].sort((a,b)=>b.dt.localeCompare(a.dt)).slice(0,5);
 return `<div class="top"><h1>PaisaTrack</h1></div>
 <div class="hero"><small>Total balance</small><div class="big">${inr(s.bal)}</div><div class="row"><div><small>Received</small><b>${inr(s.inc)}</b></div><div><small>Spent</small><b>${inr(s.exp)}</b></div></div></div>
 <div class="qa"><button class="chip on" onclick="importShot()">📷 Import GPay screenshot</button><button class="chip" onclick="openForm('Income')">＋ Add income</button><button class="chip" onclick="openForm('Expense')">− Add expense</button><button class="chip" onclick="openForm('Transfer')">↔ Transfer</button><button class="chip" onclick="openForm('Money Lent')">🤝 Add loan</button></div>
 <div class="grid"><div class="card"><small>Money lent</small><b>${inr(s.lent)}</b></div><div class="card"><small>Money borrowed</small><b>${inr(s.bor)}</b></div><div class="card"><small>To receive</small><b class="pos">${inr(s.rec)}</b></div><div class="card red"><small>To pay</small><b class="neg">${inr(s.pay)}</b></div><div class="card"><small>Expense this month</small><b>${inr(thisM)}</b></div><div class="card"><small>Expense without dues</small><b>${inr(s.exp)}</b></div></div>
 <div class="card red" style="margin-top:10px"><small>Total expense including dues to pay</small><b class="neg">${inr(s.exp+s.pay)}</b></div>
 ${owe.length?`<h2 class="neg">You have to pay</h2><div class="card red">${owe.map(p=>`<div class="item red" onclick="openPerson('${esc(p.name).replace(/'/g,"\\'")}')"><div class="av">${esc(p.name[0]).toUpperCase()}</div><div class="m"><div>${esc(p.name)}</div></div><div class="amt">${inr(-p.net)}</div></div>`).join("")}</div>`:""}
 <h2>Income versus expense</h2><div class="card">${chart()}</div>
 <h2>Recent transactions</h2><div class="card">${r.length?r.map(row).join(""):'<div class="empty">No transactions yet. Add one, or load sample data in Settings.</div>'}</div>`}
function txView(){let l=[...tx].sort((a,b)=>b.dt.localeCompare(a.dt));const q=flt.q.toLowerCase();
 l=l.filter(t=>(!q||[t.person,t.note,t.cat,t.ref,t.tags,t.type].join(" ").toLowerCase().includes(q))&&(!flt.type||t.type===flt.type)&&(!flt.method||t.method===flt.method)&&(!flt.from||t.dt.slice(0,10)>=flt.from)&&(!flt.to||t.dt.slice(0,10)<=flt.to));
 const opt=(a,v)=>`<option value="">All</option>`+a.map(x=>`<option ${v===x?"selected":""}>${x}</option>`).join("");
 return `<div class="top"><h1>Transactions</h1><button class="chip" onclick="openForm()">＋ Add</button></div>
 <input placeholder="Search name, note, tag or reference" value="${esc(flt.q)}" oninput="flt.q=this.value;list()">
 <div class="grid"><div><label>Type</label><select onchange="flt.type=this.value;list()">${opt(TYPES,flt.type)}</select></div><div><label>Payment method</label><select onchange="flt.method=this.value;list()">${opt(METHODS,flt.method)}</select></div><div><label>From</label><input type="date" value="${flt.from}" onchange="flt.from=this.value;list()"></div><div><label>To</label><input type="date" value="${flt.to}" onchange="flt.to=this.value;list()"></div></div>
 <div class="card" id="txl">${l.length?l.map(row).join(""):'<div class="empty">Nothing matches these filters.</div>'}</div>`}
function list(){const keep=document.activeElement;const h=txView();const d=document.createElement("div");d.innerHTML=h;$("#txl").innerHTML=d.querySelector("#txl").innerHTML}
function peopleView(){const p=people();
 return `<div class="top"><h1>People</h1></div>${p.length?`<div class="card">${p.map(x=>`<div class="item ${x.net<0?"red":""}" onclick="openPerson('${esc(x.name).replace(/'/g,"\\'")}')"><div class="av">${esc(x.name[0]).toUpperCase()}</div><div class="m"><div>${esc(x.name)}</div><small>Lent ${inr(x.lent)} · Borrowed ${inr(x.bor)} · Repaid ${inr(x.rep)}</small></div><div class="amt ${x.net>0?"pos":x.net<0?"neg":""}">${x.net>0?"Gets "+inr(x.net):x.net<0?"Owes "+inr(-x.net):"Settled"}</div></div>`).join("")}</div>`:'<div class="empty">Add a loan to see people here.</div>'}`}
function sumBy(f,arr){const m={};arr.forEach(t=>{const k=f(t);m[k]=(m[k]||0)+t.amt});return Object.entries(m).sort((a,b)=>b[1]-a[1])}
function bars(a){const mx=Math.max(1,...a.map(x=>x[1]));return a.length?a.map(([k,v])=>`<div style="margin:8px 0"><div style="display:flex;justify-content:space-between"><span>${esc(k)}</span><b>${inr(v)}</b></div><div class="bar" style="width:${v/mx*100}%"></div></div>`).join(""):'<div class="empty">No data yet.</div>'}
let range="month";
function monthBars(){const m={};tx.filter(t=>t.type==="Expense").forEach(t=>{const d=new Date(t.dt),k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");m[k]=(m[k]||0)+t.amt});return bars(Object.entries(m).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,12).map(([k,v])=>[new Date(k+"-01").toLocaleString("en-IN",{month:"long",year:"numeric"}),v]))}
function repView(){const now=new Date(),st=new Date(now);if(range==="day")st.setHours(0,0,0,0);if(range==="week"){st.setDate(now.getDate()-6);st.setHours(0,0,0,0)}if(range==="month")st.setDate(1),st.setHours(0,0,0,0);if(range==="year")st.setMonth(0,1),st.setHours(0,0,0,0);
 const r=tx.filter(t=>new Date(t.dt)>=st),inc=r.filter(t=>t.type==="Income").reduce((a,t)=>a+t.amt,0),ex=r.filter(t=>t.type==="Expense").reduce((a,t)=>a+t.amt,0);
 const lb=people().filter(p=>p.net!==0).map(p=>[p.name+(p.net>0?" (to receive)":" (to pay)"),Math.abs(p.net)]);
 return `<div class="top"><h1>Reports</h1></div><div class="qa" style="margin:0 0 10px">${[["day","Today"],["week","7 days"],["month","This month"],["year","This year"]].map(x=>`<button class="chip ${range===x[0]?"on":""}" onclick="range='${x[0]}';render()">${x[1]}</button>`).join("")}</div>
 <div class="grid"><div class="card"><small>Income</small><b class="pos">${inr(inc)}</b></div><div class="card"><small>Expenses</small><b class="neg">${inr(ex)}</b></div></div>
 <div class="card" style="margin-top:10px"><small>All-time expense without dues</small><b>${inr(stats().exp)}</b><small style="margin-top:6px">All-time expense including dues to pay</small><b class="neg">${inr(stats().exp+stats().pay)}</b></div>
 <h2>Month by month expense</h2><div class="card">${monthBars()}</div>
 <h2>Spending by category</h2><div class="card">${bars(sumBy(t=>t.cat,r.filter(t=>t.type==="Expense")))}</div>
 <h2>Payment methods</h2><div class="card">${bars(sumBy(t=>t.method,r))}</div>
 <h2>Outstanding loans</h2><div class="card">${bars(lb)}</div>
 <h2>Six-month trend</h2><div class="card">${chart()}</div>
 <div class="grid" style="margin-top:14px"><button class="btn ghost" onclick="csv()">Export CSV</button><button class="btn ghost" onclick="print()">Save as PDF</button></div>`}
function setView(){return `<div class="top"><h1>Settings</h1></div>
 <div class="card"><label>Theme</label><select onchange="theme(this.value)"><option value="">Match phone</option><option value="light">Light</option><option value="dark">Dark</option></select>
 <button class="btn ghost" style="margin-bottom:10px" onclick="sample()">Load sample data</button>
 <button class="btn ghost" style="margin-bottom:10px" onclick="backup()">Backup to file</button>
 <label>Restore from backup file</label><input type="file" accept=".json" onchange="restore(this)">
 <button class="btn" style="background:var(--rd)" onclick="wipe()">Delete all my data</button></div>
 ${syncCard()}<p style="color:var(--mu)">PaisaTrack records transactions you enter or import from screenshots. It does not connect to Google Pay or read messages, and nothing leaves this device unless you turn on Google sync above. Without sync, data lives only in this browser, so back it up regularly.</p>`}
function render(){nav();$("#app").innerHTML={home,tx:txView,people:peopleView,rep:repView,set:setView}[tab]()}
function sheet(h){$("#sheetBody").innerHTML=h;$("#sheet").classList.add("open")}
function closeSheet(){$("#sheet").classList.remove("open")}
$("#sheet").addEventListener("click",e=>{if(e.target.id==="sheet")closeSheet()});
const nowLocal=()=>{const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,16)};
let shot="";
function openForm(type,id){const t=id?tx.find(x=>x.id===id):{type:type||"Expense",dir:"Received",amt:"",person:"",cat:"Other",method:"Google Pay",dt:nowLocal(),ref:"",note:"",tags:"",shot:""};shot=t.shot||"";
 const o=(a,v)=>a.map(x=>`<option ${v===x?"selected":""}>${x}</option>`).join("");
 sheet(`<div class="top"><h1>${id?"Edit":"Add"} transaction</h1><button class="chip" onclick="closeSheet()">Close</button></div>
 <label>Type</label><select id="f_type" onchange="dirShow()">${o(TYPES,t.type)}</select>
 <div id="dirBox"><label>Repayment direction</label><select id="f_dir">${o(["Received","Paid"],t.dir||"Received")}</select></div>
 <label>Amount (₹)</label><input id="f_amt" type="number" inputmode="decimal" min="0" step="0.01" value="${t.amt}">
 <label>Person or contact</label><input id="f_person" value="${esc(t.person)}">
 <label>Category</label><select id="f_cat">${o(CATS,t.cat)}</select>
 <label>Payment method</label><select id="f_method">${o(METHODS,t.method)}</select>
 <label>Date and time</label><input id="f_dt" type="datetime-local" value="${t.dt}">
 <label>UPI or transaction reference (optional)</label><input id="f_ref" value="${esc(t.ref)}">
 <label>Note</label><textarea id="f_note" rows="2">${esc(t.note)}</textarea>
 <label>Tags (comma separated)</label><input id="f_tags" value="${esc(t.tags)}">
 <label>Screenshot (optional)</label><input id="f_file" type="file" accept="image/*" onchange="pickShot(this)"><p id="scanMsg" class="warn"></p><div id="shotBox">${shot?`<img class="shot" src="${shot}" alt="Attached screenshot">`:""}</div>
 <p id="dupMsg" class="warn"></p>
 <button class="btn" onclick="saveTx('${id||""}')">Save transaction</button>${id?`<button class="btn ghost" style="margin-top:10px;color:var(--rd);border-color:var(--rd)" onclick="delTx('${id}')">Delete</button>`:""}`);dirShow()}
function importShot(){openForm('Expense');$('#f_file').click()}
function scanImg(img){const c=document.createElement('canvas'),s=Math.min(1,1100/img.width);c.width=img.width*s;c.height=img.height*s;c.getContext('2d').drawImage(img,0,0,c.width,c.height);c.toBlob(b=>scan(b),'image/jpeg',.85)}
async function scan(blob){const m=$('#scanMsg');if(!m)return;m.textContent='Reading screenshot… (first time needs internet)';
 try{if(!window.Tesseract)await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)});
 const r=await Tesseract.recognize(await prep(blob),'eng');parseShot(r.data.text)}catch(e){m.textContent='Could not read it automatically. Fill the details by hand.'}}
const numOf=s=>{const v=parseFloat(String(s).replace(/,/g,''));return v>0&&v<1e7?v:null};
function findAmount(t){const c=t.replace(/\b\d{1,2}:\d{2}(?::\d{2})?\s*([ap]m)?/gi,' ').replace(/\b\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4}/g,' ').replace(/\b\d{9,}\b/g,' ');
 let m=c.match(/(?:₹|Rs\.?|INR)\s?(\d[\d,]*(?:\.\d{1,2})?)/i);if(m&&numOf(m[1]))return numOf(m[1]);
 m=c.match(/^\s*[^\w\n]{0,2}\s*(\d[\d,]*(?:\.\d{1,2})?)\s*$/m);if(m&&numOf(m[1]))return numOf(m[1]);
 m=c.match(/(\d[\d,]*(?:\.\d{1,2})?)/);return m?numOf(m[1]):null}
async function prep(b){try{const bm=await createImageBitmap(b),s=Math.max(1,Math.min(2.5,1600/bm.width)),c=document.createElement('canvas');c.width=bm.width*s;c.height=bm.height*s;const x=c.getContext('2d');x.drawImage(bm,0,0,c.width,c.height);const d=x.getImageData(0,0,c.width,c.height),p=d.data;let sum=0;for(let i=0;i<p.length;i+=4){const g=.3*p[i]+.59*p[i+1]+.11*p[i+2];p[i]=p[i+1]=p[i+2]=g;sum+=g}if(sum/(p.length/4)<110)for(let i=0;i<p.length;i+=4){p[i]=p[i+1]=p[i+2]=255-p[i]}x.putImageData(d,0,0);return await new Promise(r=>c.toBlob(r,'image/png'))}catch(e){return b}}

// ---- Google sync (Firebase) ----
let FB=null,syncMsg='Not synced yet',syncing=false,syncT;
function fbCfg(){try{return JSON.parse(localStorage.getItem('pt_fb')||'null')}catch(e){return null}}
async function fbInit(){if(FB)return FB;const cfg=fbCfg();if(!cfg)return null;const B='https://www.gstatic.com/firebasejs/10.12.2/';
 const [a,au,fs]=await Promise.all([import(B+'firebase-app.js'),import(B+'firebase-auth.js'),import(B+'firebase-firestore.js')]);
 const app=a.initializeApp(cfg);FB={au,fs,auth:au.getAuth(app),db:fs.getFirestore(app),user:null};
 au.onAuthStateChanged(FB.auth,u=>{FB.user=u;if(tab==='set')render();if(u)syncNow()});return FB}
function syncCard(){const cfg=fbCfg(),u=FB&&FB.user;let b;
 if(!cfg)b='<p style="color:var(--mu)">Paste the firebaseConfig block from your Firebase project.</p><textarea id="fbcfg" rows="6" placeholder="const firebaseConfig = { apiKey: ..., projectId: ... }"></textarea><button class="btn" onclick="fbSave()">Save config</button>';
 else if(!u)b='<button class="btn" onclick="fbLogin()">Sign in with Google</button><button class="chip" style="margin-top:10px" onclick="fbReset()">Change config</button>';
 else b='<p>Signed in as <b>'+esc(u.email)+'</b><br><small style="color:var(--mu)">'+esc(syncMsg)+'</small></p><button class="btn" onclick="syncNow(true)">Sync now</button><button class="btn ghost" style="margin-top:10px" onclick="fbOut()">Sign out</button>';
 return '<h2>Google sync</h2><div class="card">'+b+'</div>'}
function fbSave(){const t=$('#fbcfg').value,cfg={};t.replace(/(\w+)\s*:\s*["']([^"']*)["']/g,(m,k,v)=>{cfg[k]=v;return m});
 if(!cfg.apiKey||!cfg.projectId){alert('apiKey and projectId not found. Copy the whole firebaseConfig block.');return}
 localStorage.setItem('pt_fb',JSON.stringify(cfg));fbInit().then(render).catch(e=>alert('Could not load Firebase: '+e.message));render()}
function fbReset(){localStorage.removeItem('pt_fb');FB=null;render()}
async function fbLogin(){try{await fbInit();await FB.au.signInWithPopup(FB.auth,new FB.au.GoogleAuthProvider())}catch(e){alert('Sign-in failed: '+(e.code||e.message))}}
function fbOut(){FB.au.signOut(FB.auth).then(render)}
function syncSoon(){if(FB&&FB.user){clearTimeout(syncT);syncT=setTimeout(()=>syncNow(),1500)}}
async function syncNow(manual){if(!FB||!FB.user||syncing)return;syncing=true;syncMsg='Syncing…';if(tab==='set')render();let changed=false;
 try{const {fs,db}=FB,col=fs.collection(db,'users',FB.user.uid,'tx');let del=[];try{del=JSON.parse(localStorage.getItem('pt_del')||'[]')}catch(e){}
  const snap=await fs.getDocs(col),remote={};snap.forEach(d=>remote[d.id]=d.data());
  const loc={},dl={};tx.forEach(t=>{if(!t.u)t.u=Date.parse(t.dt)||Date.now();loc[t.id]=t});del.forEach(d=>dl[d.id]=d);
  const push=new Set();
  Object.entries(remote).forEach(([id,r])=>{const l=loc[id],d=dl[id],lu=l?l.u:d?d.u:0;
   if(r.u>lu){tx=tx.filter(x=>x.id!==id);delete dl[id];if(!r.del){const {del:_x,...rest}=r;tx.push(rest)}changed=true}else if(r.u<lu)push.add(id)});
  Object.keys(loc).forEach(id=>{if(!remote[id])push.add(id)});
  Object.keys(dl).forEach(id=>{if(!remote[id]||remote[id].u<dl[id].u)push.add(id)});
  for(const id of push){const l=tx.find(x=>x.id===id),d=dl[id];if(l)await fs.setDoc(fs.doc(col,id),l);else if(d)await fs.setDoc(fs.doc(col,id),{id,del:true,u:d.u})}
  localStorage.setItem('pt_tx',JSON.stringify(tx));localStorage.setItem('pt_del',JSON.stringify(Object.values(dl)));
  syncMsg='Last synced '+new Date().toLocaleTimeString('en-IN')}
 catch(e){syncMsg='Sync failed: '+(e.code||e.message)}
 syncing=false;if(tab==='set'||changed)render()}
function parseShot(t){const m=$('#scanMsg');if(!m||!$('#f_type'))return;
 const a=t.search(/you paid|paid to|sent to|payment to/i),b=t.search(/received|paid you|credited/i);
 let dir='';if(a>=0&&(b<0||a<b))dir='paid';else if(b>=0)dir='received';
 if(dir==='paid')$('#f_type').value='Expense';if(dir==='received')$('#f_type').value='Income';
 const am=findAmount(t);if(am)$('#f_amt').value=am;else $('#f_amt').focus();
 const rf=t.match(/(?:transaction id|upi ref\w*(?: no\.?)?)\D{0,6}(\d{10,14})/i)||t.match(/\b(\d{12})\b/);if(rf)$('#f_ref').value=rf[1];
 const nm=t.match(/(?:paid to|received from|from|to)\s*:?\s*([A-Za-z][A-Za-z .]{1,30})/i);if(nm)$('#f_person').value=nm[1].trim();
 const d=t.match(/(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+(\d{4}),?\s+(\d{1,2}):(\d{2})\s*([ap]m)?/i);
 if(d){const mo=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(d[2].toLowerCase());let hh=+d[4];if(d[6]){const p=d[6].toLowerCase();if(p==='pm'&&hh<12)hh+=12;if(p==='am'&&hh===12)hh=0}
  if(mo>=0)$('#f_dt').value=d[3]+'-'+String(mo+1).padStart(2,'0')+'-'+d[1].padStart(2,'0')+'T'+String(hh).padStart(2,'0')+':'+d[5]}
 $('#f_method').value='Google Pay';const st=t.match(/completed|successful|failed|pending/i);
 m.textContent=(dir==='paid'?'Set as Expense. ':dir==='received'?'Set as Income. ':'Could not tell paid or received. Choose the type. ')+(am?'Amount ₹'+am+', check it. ':'Amount not found, type it. ')+(st?(/failed|pending/i.test(st[0])?'Status shows '+st[0]+'. Check before saving. ':'Status: '+st[0]+'. '):'Status not visible. Verify it yourself. ')+'Review, then save.'}
function dirShow(){$("#dirBox").style.display=$("#f_type").value==="Loan Repayment"?"block":"none"}
function pickShot(inp){if(inp.files[0])useBlob(inp.files[0])}
function useBlob(f){const img=new Image();img.onload=()=>{const c=document.createElement('canvas'),s=Math.min(1,720/img.width);c.width=img.width*s;c.height=img.height*s;c.getContext('2d').drawImage(img,0,0,c.width,c.height);shot=c.toDataURL('image/jpeg',.6);const b=$('#shotBox');if(b)b.innerHTML='<img class="shot" src="'+shot+'" alt="Attached screenshot">';scan(f);URL.revokeObjectURL(img.src)};img.src=URL.createObjectURL(f)}
function saveTx(id){const g=k=>$("#f_"+k).value.trim(),amt=parseFloat(g("amt"));
 if(!(amt>0)){alert("Enter an amount greater than zero.");return}
 const type=g("type"),person=g("person");
 if(["Money Lent","Money Borrowed","Loan Repayment"].includes(type)&&!person){alert("Enter the person for this loan.");return}
 const t={id:id||"t"+Date.now()+Math.floor(Math.random()*1e3),type,dir:type==="Loan Repayment"?g("dir"):"",amt:Math.round(amt*100)/100,person,cat:g("cat"),method:g("method"),dt:g("dt")||nowLocal(),ref:g("ref"),note:g("note"),tags:g("tags"),shot,u:Date.now()};
 const dup=tx.find(x=>x.id!==t.id&&((t.ref&&x.ref===t.ref)||(x.amt===t.amt&&x.dt.slice(0,10)===t.dt.slice(0,10)&&x.person===t.person&&x.type===t.type)));
 if(dup&&!confirm("A similar transaction already exists ("+inr(dup.amt)+" on "+fd(dup.dt)+"). Save anyway?"))return;
 if(id){tx=tx.map(x=>x.id===id?t:x)}else tx.push(t);save();closeSheet();render()}
function tomb(ids){let d=[];try{d=JSON.parse(localStorage.getItem("pt_del")||"[]")}catch(e){}ids.forEach(id=>d.push({id,u:Date.now()}));try{localStorage.setItem("pt_del",JSON.stringify(d))}catch(e){}}
function delTx(id){if(confirm("Delete this transaction?")){tomb([id]);tx=tx.filter(x=>x.id!==id);save();closeSheet();render()}}
function openTx(id){const t=tx.find(x=>x.id===id);sheet(`<div class="top"><h1>${inr(t.amt)}</h1><button class="chip" onclick="closeSheet()">Close</button></div>
 <div class="card"><small>${esc(t.type)}${t.dir?" ("+t.dir+")":""} · ${esc(t.method)} · ${esc(t.cat)}</small><p>${esc(t.person)||"No person"}<br><small>${new Date(t.dt).toLocaleString("en-IN")}</small></p>${t.ref?`<p><small>Reference: ${esc(t.ref)}</small></p>`:""}<p>${esc(t.note)||"No note"}</p>${t.tags?`<p><small>Tags: ${esc(t.tags)}</small></p>`:""}${t.shot?`<img class="shot" src="${t.shot}" alt="Screenshot">`:""}</div>
 <button class="btn" style="margin-top:12px" onclick="openForm('','${id}')">Edit</button>`)}
function openPerson(name){const p=people().find(x=>x.name===name);if(!p)return;
 sheet(`<div class="top"><h1>${esc(p.name)}</h1><button class="chip" onclick="closeSheet()">Close</button></div>
 <div class="card"><h1 class="${p.net>0?"pos":p.net<0?"neg":""}">${p.net>0?"Pending to receive "+inr(p.net):p.net<0?"You owe "+inr(-p.net):"All settled"}</h1><small>Lent ${inr(p.lent)} · Borrowed ${inr(p.bor)} · Repaid ${inr(p.rep)}</small></div>
 ${p.net!==0?`<button class="btn" style="margin:12px 0" onclick="repay('${esc(p.name).replace(/'/g,"\\'")}',${p.net})">Record a repayment</button>`:""}
 <div class="card">${[...p.list].sort((a,b)=>b.dt.localeCompare(a.dt)).map(row).join("")}</div>`)}
function repay(name,net){openForm("Loan Repayment");$("#f_person").value=name;$("#f_dir").value=net>0?"Received":"Paid";$("#f_cat").value="Loan";$("#f_amt").placeholder="Partial or full: up to "+Math.abs(net)}
function theme(v){if(v)document.documentElement.dataset.theme=v;else delete document.documentElement.dataset.theme}
function dl(name,text,type){const a=document.createElement("a");a.href="data:"+type+";charset=utf-8,"+encodeURIComponent(text);a.download=name;a.click()}
function csv(){const h=["Date","Type","Direction","Amount","Person","Category","Method","Reference","Note","Tags"],q=v=>'"'+String(v??"").replace(/"/g,'""')+'"';
 dl("paisatrack.csv",[h.join(",")].concat([...tx].sort((a,b)=>a.dt.localeCompare(b.dt)).map(t=>[t.dt,t.type,t.dir,t.amt,t.person,t.cat,t.method,t.ref,t.note,t.tags].map(q).join(","))).join("\n"),"text/csv")}
function backup(){dl("paisatrack-backup.json",JSON.stringify(tx),"application/json")}
function restore(inp){const f=inp.files[0];if(!f)return;f.text().then(s=>{try{const a=JSON.parse(s);if(!Array.isArray(a))throw 0;if(confirm("Replace current data with "+a.length+" transactions from this backup?")){tx=a.map(t=>({...t,u:Date.now()}));save();render()}}catch(e){alert("This file is not a PaisaTrack backup.")}})}
function wipe(){if(confirm("Delete every transaction and screenshot? If Google sync is on, they are deleted from the cloud too. This cannot be undone.")){tomb(tx.map(t=>t.id));tx=[];save();render()}}
function sample(){if(tx.length&&!confirm("Add sample data to your existing transactions?"))return;
 const d=n=>{const x=new Date();x.setDate(x.getDate()-n);x.setHours(12,0,0,0);x.setMinutes(x.getMinutes()-x.getTimezoneOffset());return x.toISOString().slice(0,16)};
 const S=[["Income",30000,"","Salary or gift","Bank Transfer","Monthly allowance",70],["Expense",850,"","Food","Google Pay","Dinner with friends",3],["Expense",1200,"","Shopping","Google Pay","Shopping",8],["Expense",4500,"","College fees","Bank Transfer","Exam fee",20],["Expense",640,"","Travel","UPI","Bus and auto",12],["Income",25000,"","Salary or gift","Bank Transfer","Monthly allowance",40],["Income",2000,"","Salary or gift","Cash","Gift",15],["Money Lent",5000,"Rahul","Loan","Google Pay","Given to friend for college expenses",25],["Loan Repayment",2000,"Rahul","Loan","Google Pay","Partial repayment",10,"Received"],["Money Borrowed",2000,"Anu","Loan","Cash","Borrowed from a friend",18],["Loan Repayment",750,"Anu","Loan","UPI","Paid back part",5,"Paid"],["Expense",500,"","Bills","UPI","Mobile recharge",35],["Expense",1800,"","Food","Cash","Groceries",50],["Income",25000,"","Salary or gift","Bank Transfer","Monthly allowance",100],["Expense",2200,"","Shopping","Google Pay","Clothes",90]];
 S.forEach((s,i)=>tx.push({id:"s"+Date.now()+i,type:s[0],dir:s[7]||"",amt:s[1],person:s[2],cat:s[3],method:s[4],dt:d(s[6]),ref:"",note:s[5],tags:"sample",shot:""}));save();render()}
if(fbCfg())fbInit().catch(()=>{});
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
if(location.search.includes('shared=1')){history.replaceState(null,'','index.html');caches.open('shared').then(async c=>{const r=await c.match('shared-shot');if(r){const b=await r.blob();await c.delete('shared-shot');openForm('Expense');useBlob(b)}})}
render();
</script>
</body>
</html>
