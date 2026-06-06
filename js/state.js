/* ---------- state & persistence ----------
   The in-memory STATE object and its localStorage load/save.
   dayState() lazily creates the record for a given day key. */

let STATE={};
const SKEY="coachclaude_knee_v1";
function load(){try{const r=localStorage.getItem(SKEY);if(r)STATE=JSON.parse(r);}catch(e){STATE={};}}
function save(){try{localStorage.setItem(SKEY,JSON.stringify(STATE));}catch(e){}}
function dayState(k){if(!STATE[k])STATE[k]={items:{},pain:null,loc:"",settled:"",km:null,notes:""};return STATE[k];}
load();
