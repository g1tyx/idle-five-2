var VERSION = 0.1;

$(document).ready(function () {
    document.title = "IdleFive";
    console.log("Have fun of IdleFive!   - Aizen_");
    progressBar(0, $('#progressBar'));
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
    missionList: ["Pickpocketing", "Rob a Grocery Store", "Rob an Armored Van", "Street Race", "False Papers Factory", "Weed Farm", "False Money Factory", "Meth Workshop", "Cocaine Workshop", "Hangar", "Bunker", "Vehicle Trafficking", "Rob the Union Depository"],
    timers: [5, 10, 30, 60, 120, 180, 600, 900, 1200, 1800, 2400, 3000, 3600],
    missionRewards: [1, 5, 10, 25, 50, 200, 300, 1000, 5000, 10000, 50000, 100000, 1000000],
    missionStarted: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    timerscount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};
var progressBarWidth = 0;

function idleLoop() {
    if (p.timerscount[0] < p.timers[0]) { 
        p.timerscount[0] += 1;
        p.progress = (p.timerscount[0]/p.timers[0])*100;
        console.log(p.timerscount[0]+"/"+p.timers[0]+" ("+p.progress+"%)");
        progressBar(p.progress, $('#progressBar'));
    } else { p.timerscount[0] = 0; p.cash += p.missionRewards[13]; progressBar(0, $('#progressBar'));}
    p.playTime++;
    UpdateUI();
}
setInterval(idleLoop, 1000);

//Calculer 10% de 15 €
// 15 x (10/100)= 1.5