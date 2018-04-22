var VERSION = 0.1;

$(document).ready(function () {
    document.title = "IdleFive";
    console.log("Have fun of IdleFive!   - Aizen_");
    loadAllEvents();
    if (localStorage.getItem("IdleFive") != null) { load(); }
    UpdateUI();
});
var p = {
    DateStarted: getDate(),
    cash: 0,
    rank: 1,
    rp: 0,
    maxrp: 100,
    progress: 0,
    progressSpeed: 0,
    mission: "None",
    playTime: 0,
    missionRewards: [],
    missionStarted: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    timerscount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

var missions = {
    0: { name: 'Pickpocketing', timer: 10, reward: 0.5, cost: 1 },
    1: { name: 'Rob a Grocery Store', timer: 20, reward: 2, cost: 2 },
    2: { name: 'Rob an Armored Van', timer: 30, reward: 10, cost: 3 },
    3: { name: 'Street Race', timer: 60, reward: 25, cost: 6 },
    4: { name: 'False Papers Factory', timer: 120, reward: 50, cost: 12 },
    5: { name: 'Weed Farm', timer: 180, reward: 100, cost: 100 },
    6: { name: 'False Money Factory', timer: 600, reward: 200, cost: 60 },
    7: { name: 'Meth Workshop', timer: 900, reward: 500, cost: 90 },
    8: { name: 'Cocaine Workshop', timer: 1200, reward: 5000, cost: 120 },
    9: { name: 'Hangar', timer: 1800, reward: 10000, cost: 180 },
    10: { name: 'Bunker', timer: 2400, reward: 50000, cost: 240 },
    11: { name: 'Vehicle Trafficking', timer: 3000, reward: 100000, cost: 300 },
    12: { name: 'Rob the Union Depository', timer: 3600, reward: 1000000, cost: 360 }
};
var progressBarWidth = 0;
var TimeRemaiming = 0;

function idleLoop() {
    //    if (p.timerscount[i] < missions[i].timer) { 
    //        p.timerscount[i] += 1;
    //        TimeRemaining = missions[i].timer - p.timerscount[i];
    //        console.log(TimeRemaining);
    //        p.progress = (p.timerscount[i]/missions[i].timer)*100;
    //        progressBar(p.progress, fixing(TimeRemaining, 3), $('#progressBar'+ i));
    //    } else { p.timerscount[i] = 0; p.rp +=p.missionRewards[i]; p.cash += missions[i].rewards; progressBar(0, 0, $('#progressBar' + i));}
    p.playTime++;
    UpdateUI();
}
setInterval(idleLoop, 1000);