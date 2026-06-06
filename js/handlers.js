/* ---------- input handlers & painters ----------
   Wired to the controls in each day card: they mutate STATE,
   persist it, and repaint the affected widget. painColor maps a
   pain score to a colour and is shared with render/dashboard. */

function onCheck(k,ex,v){dayState(k).items[ex]=v;save();refreshDash();}
function onPain(k,v){const s=dayState(k);s.pain=v===""?null:Number(v);save();
  const el=document.getElementById("pv-"+k); if(el){el.innerHTML=(s.pain===null?"–":s.pain)+"<small>/10</small>";el.style.color=painColor(s.pain);}}
function onPainDone(){refreshDash();}
function onZone(k,z){const s=dayState(k);s.loc=(s.loc===z?"":z);save();paintZones(k);refreshDash();}
function onSettled(k,v){const s=dayState(k);s.settled=(s.settled===v?"":v);save();paintSettled(k);}
function onKm(k,v){dayState(k).km=v===""?null:Number(v);save();refreshDash();}
function onNotes(k,v){dayState(k).notes=v;save();}

function paintZones(k){const wrap=document.getElementById("zones-"+k);if(!wrap)return;const sel=dayState(k).loc;
  wrap.querySelectorAll(".zone").forEach(g=>g.classList.toggle("sel",g.dataset.zone===sel));
  const none=document.getElementById("none-"+k); if(none)none.classList.toggle("sel",sel==="none");
  const pk=document.getElementById("picked-"+k); if(pk)pk.textContent=sel?ZONE_LABEL[sel]:"tap the map";}
function paintSettled(k){const seg=document.getElementById("settled-"+k);if(!seg)return;const v=dayState(k).settled;
  seg.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===v));}
function painColor(p){if(p===null)return "var(--muted)";if(p<=3)return "var(--teal)";if(p<=5)return "var(--amber)";return "var(--red)";}
