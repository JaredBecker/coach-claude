/* ---------- week & day rendering ----------
   Builds the knee SVG, the per-day cards with their check-in logs,
   the week navigation and the sticky day nav. CUR is the currently
   viewed week (1-based), seeded to today's week. */

let CUR=Math.min(12,Math.max(1,Math.floor((new Date()-START)/(7*864e5))+1))||1;

function kneeSVG(k){
  const sel=dayState(k).loc;
  let dots=ZONES.map(z=>`<g class="zone ${sel===z.k?'sel':''}" data-zone="${z.k}" onclick="onZone('${k}','${z.k}')">
     <circle cx="${z.x}" cy="${z.y}" r="11"/><text x="${z.x}" y="${z.y+2.5}" text-anchor="middle">${z.lab}</text></g>`).join("");
  return `<svg class="knee" width="120" height="150" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 6 Q60 0 80 6 L84 50 Q92 70 88 96 Q86 128 78 148 L42 148 Q34 128 32 96 Q28 70 36 50 Z" fill="#141311" stroke="var(--line)" stroke-width="1.5"/>
    <ellipse cx="60" cy="78" rx="20" ry="24" fill="none" stroke="var(--faint)" stroke-width="1" stroke-dasharray="3 3"/>
    ${dots}</svg>`;
}

function dayCard(d){
  const todayKey=fmt(new Date());
  const isToday=d.key===todayKey;
  const tagClass={strength:"t-str",run:"t-run",iso:"t-iso",rest:"t-rest",race:"t-race"}[d.type];
  const s=dayState(d.key);
  let exHTML = d.items.length? d.items.map(e=>`
    <div class="ex">
      <input type="checkbox" ${s.items[e.key]?"checked":""} onchange="onCheck('${d.key}','${e.key}',this.checked)">
      <div class="meta"><div class="nm">${e.nm}</div><div class="ds">${e.ds}</div>
        <a class="how" href="${e.link}" target="_blank" rel="noopener">how-to &#8599;</a></div>
    </div>`).join("")
    : `<div style="color:var(--faint);font-size:14px;padding:4px 0">Rest day. Let it recover. A gentle isometric hold is fine if it feels stiff.</div>`;

  // log block
  const runField = d.run? `
    <div class="logrow"><span class="k">Distance done (target ${d.targetKm}k)</span>
      <input class="km" type="number" step="0.1" placeholder="${d.targetKm}" value="${s.km??""}" onchange="onKm('${d.key}',this.value)"><span class="km-unit">km</span></div>`:"";

  const log = `
    <div class="log">
      <div class="lh">Daily check-in</div>
      <div class="logrow"><span class="k">Pain level</span>
        <div class="painwrap">
          <input type="range" min="0" max="10" step="1" value="${s.pain??0}"
            oninput="onPain('${d.key}',this.value)" onchange="onPainDone()">
          <span class="painval" id="pv-${d.key}" style="color:${painColor(s.pain)}">${s.pain===null?"–":s.pain}<small>/10</small></span>
        </div>
      </div>
      <div class="logrow"><span class="k">Where is the pain?</span>
        <div class="knee-zones" id="zones-${d.key}">
          ${kneeSVG(d.key)}
          <div class="zonekey">
            <span>Picked: <span class="picked" id="picked-${d.key}">${s.loc?ZONE_LABEL[s.loc]:"tap the map"}</span></span>
            <span class="none ${s.loc==="none"?"sel":""}" id="none-${d.key}" onclick="onZone('${d.key}','none')">No pain today</span>
            <span style="color:var(--faint);font-size:10px;max-width:150px;line-height:1.4">out = little-toe side · cap = kneecap</span>
          </div>
        </div>
      </div>
      <div class="logrow"><span class="k">Settled within 24h?</span>
        <div class="seg ${s.settled==="no"?"no":""}" id="settled-${d.key}">
          <button data-v="yes" class="${s.settled==="yes"?"on":""}" onclick="onSettled('${d.key}','yes')">Yes</button>
          <button data-v="no" class="${s.settled==="no"?"on":""}" onclick="onSettled('${d.key}','no')">No</button>
        </div>
      </div>
      ${runField}
      <div class="logrow"><span class="k">Notes</span>
        <textarea class="notes" placeholder="how it felt, favourite bit, anything off…" onchange="onNotes('${d.key}',this.value)">${s.notes||""}</textarea>
      </div>
    </div>`;

  return `<div id="daycard-${d.dow}" class="day ${isToday?"today":""} ${d.type==="race"?"race":""}">
    <div class="day-head">
      <div><div class="dn">${WD[d.dow]} · ${d.date.getDate()} ${d.date.toLocaleString("en",{month:"short"})}${isToday?" · TODAY":""}</div>
        <div class="dt">${d.title}${d.intent?` <span style="font-weight:400;color:var(--muted);font-size:13px;text-transform:none">${d.intent}</span>`:""}</div></div>
      <span class="pilltag ${tagClass}">${d.type}</span>
    </div>
    <div class="day-body">${exHTML}${log}</div>
  </div>`;
}

function renderWeek(){
  const w=WEEKS[CUR-1];
  document.getElementById("weeknav").innerHTML=WEEKS.map((x,i)=>{
    const n=i+1, race=x.long==="MARATHON";
    return `<div class="pill ${race?"race":""} ${n===CUR?"active":""}" onclick="goWeek(${n})">${n}</div>`;}).join("");
  document.getElementById("weeknote").innerHTML=`<b>Week ${CUR} · ${w.phase}.</b> ${w.note}`;
  document.getElementById("weeknote").style.borderLeftColor=ACCENT[w.accent];
  const wd=PLAN.filter(d=>d.wi===CUR-1);
  document.getElementById("weekView").innerHTML=wd.map(dayCard).join("");
  renderDayNav(wd);
}
function renderDayNav(wd){
  const todayKey=fmt(new Date());
  document.getElementById("daynav").innerHTML=wd.map(d=>{
    const s=STATE[d.key];
    const done=s&&(s.pain!=null||Object.values(s.items||{}).some(Boolean));
    const isToday=d.key===todayKey;
    return `<button class="dbtn ${isToday?"today":""} ${done?"done":""}" onclick="jumpDay(${d.dow})">${WD[d.dow]}</button>`;
  }).join("");
}
function jumpDay(dow){
  const el=document.getElementById("daycard-"+dow);
  if(el)el.scrollIntoView({behavior:"smooth",block:"start"});
}
function goWeek(n){CUR=n;renderWeek();window.scrollTo({top:document.getElementById("weeknav").offsetTop-20,behavior:"smooth"});}
