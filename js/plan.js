/* ---------- plan builder ----------
   Date helpers and the function that turns the 12-week WEEKS
   config into a flat list of 84 concrete days (PLAN). */

function fmt(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
const WD=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
function addDays(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x;}

function buildPlan(){
  const days=[];
  for(let i=0;i<84;i++){
    const date=addDays(START,i), key=fmt(date), dow=i%7, wi=Math.floor(i/7), w=WEEKS[wi];
    let title="",type="rest",items=[],run=false,targetKm=null,intent="";
    const iso=["iso_spanish","iso_legext"];
    const exObjs=keys=>keys.map(k=>({key:k,...LIB[k]}));

    if(dow===0){ // Mon
      if(w.stA.length){title="Strength A · quad + tendon";type="strength";items=exObjs([...w.stA,...iso]);}
      else{title="Isometrics + mobility";type="iso";items=exObjs(iso);}
    } else if(dow===2){ // Wed
      if(w.stB.length){title="Strength B · hips + posterior";type="strength";items=exObjs([...w.stB,...iso]);}
      else{title="Isometrics + mobility";type="iso";items=exObjs(iso);}
    } else if(dow===1||dow===3){ // Tue/Thu run
      const km=w.easy[dow===1?0:1], et=w.easyType||"easy"; run=true; targetKm=km;
      if(et==="walkjog"){title="Walk / easy jog";intent="Very easy, only if pain-free";}
      else{title="Easy run";intent="Conversational pace";}
      type="run"; items=exObjs(["prime"]);
    } else if(dow===4){ // Fri
      title="Isometrics + mobility";type="iso";items=exObjs(iso);
    } else if(dow===5){ // Sat
      if(w.long==="MARATHON"){title="MARATHON";type="race";run=true;targetKm=42.2;intent="With your friend, 7:30–8:00/km, run-walk, ease the downhills";
        items=[{key:"marathon",nm:"Marathon · 42.2k",ds:"Easy and together. Prime first, pace conservative, walk the aid stations, brake gently downhill.",link:yt("run walk marathon strategy beginner")}];}
      else if(w.long===0){title="Rest";type="rest";items=[];}
      else{run=true;targetKm=w.long;type="run";
        if(w.longType==="opt"){title="Optional easy run";intent="Skip if anything is tender";}
        else{title="Long run";intent="Easy, walk breaks fine";}
        items=exObjs(["prime"]);}
    } else { // Sun
      title="Rest";type="rest";items=[];
    }
    days.push({i,key,date,dow,wi,title,type,items,run,targetKm,intent,
      phase:w.phase,tag:w.tag,accent:w.accent});
  }
  return days;
}
const PLAN=buildPlan();
