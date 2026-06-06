/* ---------- dashboard ----------
   Derives the headline stats (sessions logged, adherence, weekly and
   session-over-session pain trend) and the 14-session sparkline, then
   renders the dashboard panel. */

function weekAvgPain(wi){const ds=PLAN.filter(d=>d.wi===wi).map(d=>STATE[d.key]).filter(s=>s&&s.pain!=null);
  if(!ds.length)return null;return ds.reduce((a,s)=>a+s.pain,0)/ds.length;}
function loggedSorted(){return PLAN.map(d=>STATE[d.key]).filter(Boolean)
  .filter((s,i)=>s.pain!=null);}
function refreshDash(){
  const now=new Date();
  // adherence over days up to today
  let total=0,done=0,logged=0;
  PLAN.forEach(d=>{const s=STATE[d.key];
    if(d.date<=now && d.items.length){d.items.forEach(e=>{total++; if(s&&s.items[e.key])done++;});}
    if(s&&(s.pain!=null||Object.values(s.items||{}).some(Boolean)))logged++;
  });
  const adh=total?Math.round(done/total*100):0;

  const cur=weekAvgPain(CUR-1), prev=weekAvgPain(CUR-2);
  let painNote="no data yet";
  if(cur!=null && prev!=null){const diff=cur-prev;
    if(diff<=-0.5)painNote=`<span class="down">&#9660; ${Math.abs(diff).toFixed(1)} vs last wk · easing</span>`;
    else if(diff>=0.5)painNote=`<span class="up">&#9650; ${diff.toFixed(1)} vs last wk · watch it</span>`;
    else painNote=`<span class="flat">level vs last wk</span>`;}
  else if(cur!=null)painNote="first week logged";

  // session-over-session
  const recent=PLAN.map(d=>STATE[d.key]).filter(s=>s&&s.pain!=null);
  let lastP="–",sessNote="log a session";
  if(recent.length){lastP=recent[recent.length-1].pain;
    if(recent.length>=2){const d2=recent[recent.length-1].pain-recent[recent.length-2].pain;
      if(d2<0)sessNote=`<span class="down">&#9660; ${Math.abs(d2)} vs last session</span>`;
      else if(d2>0)sessNote=`<span class="up">&#9650; ${d2} vs last session</span>`;
      else sessNote=`<span class="flat">same as last session</span>`;}
    else sessNote="first session";}

  const w=WEEKS[CUR-1];
  const dStart=PLAN.find(d=>d.wi===CUR-1).date, dEnd=addDays(dStart,6);
  const range=`${dStart.getDate()} ${dStart.toLocaleString("en",{month:"short"})} – ${dEnd.getDate()} ${dEnd.toLocaleString("en",{month:"short"})}`;

  // sparkline last 14 logged
  const pts=recent.slice(-14).map(s=>s.pain);
  const spark = pts.length? pts.map(p=>{const h=Math.max(8,p/10*36+4);
    const c=p<=3?"var(--teal)":p<=5?"var(--amber)":"var(--red)";
    return `<div class="bar" style="height:${h}px;background:${c}" title="${p}/10"></div>`;}).join("")
    : `<span class="empty">log pain to see the trend</span>`;

  document.getElementById("dashboard").innerHTML=`
    <div class="dash-head">
      <div><span class="wk">Week ${CUR} / 12</span> &nbsp;<span class="ph">${w.tag} · ${w.phase}</span></div>
      <span class="dates">${range}</span>
    </div>
    <div class="tiles">
      <div class="tile"><div class="lab">Sessions logged</div><div class="big">${logged}</div><div class="note">of 84 days</div></div>
      <div class="tile"><div class="lab">Adherence</div><div class="big">${adh}%</div><div class="note">${done}/${total} items to date</div></div>
      <div class="tile"><div class="lab">Pain · this week</div><div class="big" style="color:${painColor(cur==null?null:Math.round(cur))}">${cur==null?"–":cur.toFixed(1)}</div><div class="note">${painNote}</div></div>
      <div class="tile"><div class="lab">Latest session</div><div class="big" style="color:${painColor(lastP==="–"?null:lastP)}">${lastP}</div><div class="note">${sessNote}</div></div>
    </div>
    <div class="spark">${spark}</div>
    <div class="spark-cap">Pain trend · last ${pts.length||0} logged sessions (left = older)</div>`;
  const dn=document.getElementById("daynav");
  if(dn&&dn.children.length)renderDayNav(PLAN.filter(d=>d.wi===CUR-1));
}
