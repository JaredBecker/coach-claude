/* ---------- config & static data ----------
   Plan constants, the exercise library, the 12-week programme,
   and the knee-zone map. Pure data, no behaviour. */

const START = new Date(2026,5,1);      // Mon 1 Jun 2026
const MARATHON = "2026-07-04";
const yt = q => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);

/* ---------- exercise library ---------- */
const LIB = {
  iso_spanish:{nm:"Wall sit (progressive)",ds:"5 × 30–45s · back flat on the wall, start around 60° of knee bend; as it gets easy work deeper toward 90° (try 70°, then 80°, then a full 90°) · the analgesic primer",link:yt("wall sit isometric knee tendon")},
  iso_wall:{nm:"Wall sit (deep)",ds:"retired · merged into the progressive wall sit above",link:yt("single leg wall sit")},
  iso_legext:{nm:"Isometric split-squat hold",ds:"5 × 30s/leg · hold the bottom of a split squat, most weight on the front (left) leg",link:yt("isometric split squat hold")},
  sq_band:{nm:"Bodyweight squat",ds:"3–4 × 10–15 · 3s down, 3s up · hold a loaded backpack once easy · mini band above the knees stops them caving in",link:yt("bodyweight squat slow tempo")},
  stepup:{nm:"Step-up",ds:"3 × 10/leg · onto a stair, drive up through the left, lower slow · add a backpack to progress",link:yt("step up exercise knee strength")},
  tke:{nm:"Step-down (slow)",ds:"3 × 8–10/leg · stand on a step, lower the other heel slowly toward the floor, tap, come back up · trains kneecap control",link:yt("step down exercise knee")},
  sit2stand:{nm:"Single-leg sit-to-stand",ds:"3 × 6–10/leg · from a chair, lower under control · raise the chair if it's too hard, lower it to progress",link:yt("single leg sit to stand exercise")},
  splitsq:{nm:"Rear-foot-elevated split squat",ds:"3 × 8–10/leg · back foot on a chair, slow, as deep as pain allows · backpack to progress",link:yt("bulgarian split squat bodyweight")},
  glute_bridge:{nm:"Glute bridge (mini band)",ds:"3 × 12 · loop above the knees, push the knees out · progress to single-leg",link:yt("banded glute bridge mini band")},
  clamshell:{nm:"Clamshell (mini band)",ds:"3 × 15/side · loop above the knees, feet together, open the top knee",link:yt("clamshell exercise resistance band")},
  band_walk:{nm:"Lateral band walk (mini band)",ds:"3 × 12 steps each way · loop above the knees, stay low",link:yt("lateral band walk monster walk")},
  band_rdl:{nm:"Single-leg Romanian deadlift",ds:"3 × 10/leg · hinge at the hip on the left leg, flat back, slow · hold a backpack once steady",link:yt("single leg romanian deadlift bodyweight")},
  calf_raise:{nm:"Single-leg calf raise",ds:"3 × 15/leg · full range, slow down · off a step for more range",link:yt("single leg calf raise")},
  hip_abd:{nm:"Standing hip abduction (mini band)",ds:"3 × 15/side · loop at the ankles, lift the leg out to the side",link:yt("standing band hip abduction")},
  ecc_decline:{nm:"Single-leg decline squat (eccentric)",ds:"3 × 15 · slow 3–4s lower on the LEFT, come up with the right · stand on a slope/wedge or a thick book",link:yt("single leg decline squat eccentric patellar tendon")},
  plyo_pogo:{nm:"Pogo hops",ds:"3 × 20 · small, stiff ankles, quiet landings",link:yt("pogo hops plyometric drill")},
  plyo_skip:{nm:"Skipping / jump rope",ds:"3 × 30s · light and soft, build slowly · no rope? swap in low pogo hops",link:yt("jump rope beginner form")},
  plyo_hops:{nm:"Single-leg hops in place",ds:"3 × 10/leg · controlled, soft landings",link:yt("single leg hops exercise")},
  prime:{nm:"Pre-run primer",ds:"2 × 30–45s wall squat hold before you set off",link:yt("isometric warm up before running knee")}
};

/* ---------- 12-week plan ---------- */
const ACCENT = {green:"var(--green)",amber:"var(--amber)",red:"var(--red)",teal:"var(--teal)",bright:"var(--bright)"};
const WEEKS = [
 {phase:"Settle & Prime",tag:"PHASE 1",accent:"green",long:12,easy:[4,4],
  stA:["sq_band","stepup","tke","sit2stand"],stB:["glute_bridge","clamshell","band_walk","calf_raise"],
  note:"Wake the left quad up. Light loads, slow tempo, nothing should get sore. Isometrics daily, including before every run."},
 {phase:"Settle & Prime",tag:"PHASE 1",accent:"green",long:15,easy:[5,5],
  stA:["sq_band","stepup","tke","sit2stand"],stB:["glute_bridge","clamshell","band_walk","calf_raise"],
  note:"Same work, a touch more run. Keep pain at or under 3/10 and settling overnight."},
 {phase:"Build to Race",tag:"PHASE 2",accent:"green",long:19,easy:[5,6],
  stA:["sq_band","tke","sit2stand"],stB:["glute_bridge","clamshell","calf_raise"],
  note:"Peak long run this week, then it comes down. Strength drops to light so the legs stay fresh for race week."},
 {phase:"Taper",tag:"PHASE 2",accent:"amber",long:12,easy:[5,4],
  stA:["sq_band","tke"],stB:["glute_bridge","band_walk"],
  note:"Volume drops on purpose. You can't gain fitness now, only freshness. Resist doing more."},
 {phase:"Race Week",tag:"PHASE 2",accent:"red",long:"MARATHON",easy:[5,3],
  stA:[],stB:[],
  note:"Marathon Saturday. Isometrics only for strength. Prime with a wall squat hold, start easy with your friend, walk the aid stations, ease every downhill."},
 {phase:"Recover",tag:"PHASE 3",accent:"teal",long:5,longType:"opt",easy:[2,3],easyType:"walkjog",
  stA:[],stB:["glute_bridge","clamshell"],
  note:"Let everything settle. Walks and gentle isometrics first; easy spins only if pain-free. No heavy strength yet."},
 {phase:"Rebuild Strength",tag:"PHASE 4",accent:"green",long:8,easy:[4,5],
  stA:["sq_band","splitsq","stepup","sit2stand","tke","ecc_decline"],stB:["glute_bridge","band_rdl","band_walk","calf_raise","hip_abd"],
  note:"The real rebuild starts here. Heavier band tension, slower tempo, and the eccentric decline squat goes in. Expect mild working soreness, not joint pain."},
 {phase:"Rebuild Strength",tag:"PHASE 4",accent:"green",long:10,easy:[5,5],
  stA:["sq_band","splitsq","stepup","sit2stand","tke","ecc_decline"],stB:["glute_bridge","band_rdl","band_walk","calf_raise","hip_abd"],
  note:"Add a little load each week. The decline squat is the key exercise now, do it slow and honest on the left leg."},
 {phase:"Rebuild Strength",tag:"PHASE 4",accent:"green",long:12,easy:[5,6],
  stA:["sq_band","splitsq","stepup","sit2stand","tke","ecc_decline"],stB:["glute_bridge","band_rdl","band_walk","calf_raise","hip_abd"],
  note:"Quad should be feeling stronger and the morning-after tenderness easing. Keep loading single-leg so the right side can't hide it."},
 {phase:"Spring & Return",tag:"PHASE 5",accent:"bright",long:13,easy:[5,6],
  stA:["plyo_pogo","sq_band","splitsq","stepup","tke","ecc_decline"],stB:["glute_bridge","band_rdl","calf_raise","hip_abd","plyo_skip"],
  note:"Add the spring back. Light pogos and skipping before strength, only if the tendon is quiet. This is what transfers to running."},
 {phase:"Spring & Return",tag:"PHASE 5",accent:"bright",long:14,easy:[6,6],
  stA:["plyo_pogo","plyo_hops","sq_band","splitsq","ecc_decline","tke"],stB:["glute_bridge","band_rdl","calf_raise","plyo_skip"],
  note:"Build the hops gradually. Land soft and quiet. Back off if it gets reactive the next day."},
 {phase:"Spring & Return",tag:"PHASE 5",accent:"bright",long:15,easy:[6,7],
  stA:["plyo_pogo","plyo_hops","sq_band","splitsq","ecc_decline","tke"],stB:["glute_bridge","band_rdl","calf_raise","plyo_skip"],
  note:"Target: easy runs with no next-morning tenderness, and a deeper squat than week 1. Reassess that catcher's position."}
];

const ZONES = [
  {k:"tendon", x:60, y:118, lab:"tendon"},
  {k:"patella",x:60, y:78,  lab:"cap"},
  {k:"lat_low",x:88, y:112, lab:"out"},
  {k:"med_low",x:32, y:112, lab:"in"},
  {k:"itb",    x:94, y:74,  lab:"ITB"}
];
const ZONE_LABEL = {tendon:"Below kneecap (tendon)",patella:"Behind kneecap",lat_low:"Lower-outer",med_low:"Lower-inner",itb:"Outer / IT band",none:"No pain"};
