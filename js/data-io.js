/* ---------- data import / export ----------
   Builds the export payload for Coach Claude, drives the shared modal,
   and handles copy / download / import / reset of the saved log. */

function buildExport(){
  const now=new Date();
  let total=0,done=0;
  PLAN.forEach(d=>{const s=STATE[d.key];if(d.date<=now&&d.items.length)d.items.forEach(e=>{total++;if(s&&s.items[e.key])done++;});});
  const recent=PLAN.map(d=>({key:d.key,...STATE[d.key]})).filter(s=>s.pain!=null);
  return {
    app:"Coach Claude",plan:"patellar-tendon-12wk",version:1,
    startDate:fmt(START),marathon:MARATHON,exportedAt:now.toISOString(),
    currentWeek:CUR,
    summary:{
      sessionsLogged:recent.length,
      adherencePct:total?Math.round(done/total*100):0,
      itemsDone:done,itemsToDate:total,
      avgPainLast7:(()=>{const p=recent.slice(-7).map(s=>s.pain);return p.length?+(p.reduce((a,b)=>a+b,0)/p.length).toFixed(1):null;})()
    },
    weekAvgPain:WEEKS.map((_,i)=>{const v=weekAvgPain(i);return v==null?null:+v.toFixed(1);}),
    log:Object.fromEntries(Object.entries(STATE).filter(([k,v])=>v&&(v.pain!=null||v.notes||v.km!=null||Object.values(v.items||{}).some(Boolean))))
  };
}
function openModal(title,desc,text,btns){
  document.getElementById("modalTitle").textContent=title;
  document.getElementById("modalDesc").textContent=desc;
  document.getElementById("modalText").value=text;
  document.getElementById("modalBtns").innerHTML=btns;
  document.getElementById("overlay").classList.add("open");
}
function closeModal(){document.getElementById("overlay").classList.remove("open");}
function openExport(){
  const json=JSON.stringify(buildExport(),null,2);
  openModal("Export for Coach Claude","Copy this and paste it into your chat. It's your progress so far.",json,
    `<button class="act primary" onclick="copyModal()">Copy</button>
     <button class="act" onclick="downloadModal()">Download .json</button>
     <button class="act" onclick="closeModal()">Close</button>`);
}
function openImport(){
  openModal("Import data","Paste a previously exported JSON to restore your progress in this browser.","",
    `<button class="act primary" onclick="doImport()">Load it</button>
     <button class="act" onclick="closeModal()">Cancel</button>`);
}
function copyModal(){const t=document.getElementById("modalText");t.select();
  try{navigator.clipboard.writeText(t.value);}catch(e){document.execCommand("copy");}
  const b=event.target;b.textContent="Copied!";setTimeout(()=>b.textContent="Copy",1400);}
function downloadModal(){const blob=new Blob([document.getElementById("modalText").value],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="coach-claude-knee.json";a.click();}
function doImport(){try{const obj=JSON.parse(document.getElementById("modalText").value);
  const log=obj.log||obj;STATE=log;save();closeModal();renderWeek();refreshDash();}
  catch(e){alert("That didn't parse as JSON. Paste the full export.");}}
function resetAll(){if(confirm("Clear all logged data in this browser? Export first if you want to keep it."))
  {STATE={};save();renderWeek();refreshDash();}}

document.getElementById("overlay").addEventListener("click",e=>{if(e.target.id==="overlay")closeModal();});
