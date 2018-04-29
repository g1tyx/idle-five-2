var VERSION = 0.2;

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
    completed: 0,
    TutorialStep: 0,
    playTime: 0,
    missionStarted: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    TimeReducer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    MissionMultiplier: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    timerscount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    upgradeBuyed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

var missions = {
    0: { name: 'Pickpocketing', timer: 10, reward: 0.5, cost: 1 },
    1: { name: 'Rob a Grocery Store', timer: 20, reward: 5, cost: 10 },
    2: { name: 'Street Race', timer: 30, reward: 10, cost: 100 },
    3: { name: 'Rob an Armored Van', timer: 60, reward: 25, cost: 250 },
    4: { name: 'False Papers Factory', timer: 120, reward: 50, cost: 500 },
    5: { name: 'Weed Farm', timer: 180, reward: 100, cost: 1000 },
    6: { name: 'False Money Factory', timer: 600, reward: 200, cost: 2000 },
    7: { name: 'Meth Workshop', timer: 900, reward: 500, cost: 5000 },
    8: { name: 'Cocaine Workshop', timer: 1200, reward: 5000, cost: 6500 },
    9: { name: 'Hangar', timer: 1800, reward: 10000, cost: 20000 },
    10: { name: 'Bunker', timer: 2400, reward: 50000, cost: 100000 },
    11: { name: 'Vehicle Trafficking', timer: 3000, reward: 100000, cost: 1500000 },
    12: { name: 'Rob the Union Depository', timer: 3600, reward: 1000000, cost: 2500000 }
};

var upgrades = {
    0: { name: 'Pickpocketing', missionid: 0, cost: 10, time: 1, reward: 1.1 },
    1: { name: 'Grocery Store Robbing', missionid: 1, cost: 100, time: 2, reward: 1.1 },
    2: { name: 'Street Races', missionid: 2, cost: 1000, time: 3, reward: 1.1 },
    3: { name: 'Armored Vans', missionid: 3, cost: 2500, time: 6, reward: 1.1 },
    4: { name: 'False Papers Factory', missionid: 4, cost: 5000, time: 12, reward: 1.1 },
    5: { name: 'Weed Farm', missionid: 5, cost: 10000, time: 18, reward: 1.1 },
    6: { name: 'False Money Factory', missionid: 6, cost: 20000, time: 60, reward: 1.1 },
    7: { name: 'Meth Workshop', missionid: 7, cost: 50000, time: 90, reward: 1.1 },
    8: { name: 'Cocaine Workshop', missionid: 8, cost: 65000, time: 120, reward: 1.1 },
    9: { name: 'Hangar', missionid: 9, cost: 200000, time: 180, reward: 1.1 },
    10: { name: 'Bunker', missionid: 10, cost: 1000000, time: 240, reward: 1.1 },
    11: { name: 'Vehicle Trafficking', missionid: 11, cost: 15000000, time: 300, reward: 1.1 },
    12: { name: 'Union Depository Robbing', missionid: 12, cost: 25000000, time: 360, reward: 1.1 },
};


var TutorialText = {
    1: { text: "Hi man, welcome to Los Santos !<br>Did you have a job yet ?.. Anyway to get a little bit of cash?<br>Okay, let me help you then.<br> First, launch the mission called 'Pickpocketing' !" },
    2: { text: "Good job !<br>Now that you have a mission to do, you will get some money.<br>But i think it'll not be enough for you to live properly.<br>Find a way in your office to fix this problem!" },
    3: { text: "Okay, now you can live by your own, have fun in Los Santos !"},
    4: { text: "None" },
    5: { text: "None" },
};

var progressBarWidth = 0;
var TimeRemaining = 0;

function idleLoop() {
    if (p.TutorialStep == 0) { ShowTutorial(1); p.cash += 1; }
    else if (p.missionStarted[0] == 1) { if (p.TutorialStep == 1) { ShowTutorial(2); p.cash += 10; } }
    if (p.upgradeBuyed[0]==1) {if (p.TutorialStep == 2) { ShowTutorial(3); } }
    p.playTime++;
    checkRP();
    UpdateUI();
}
setInterval(idleLoop, 1000);

function LaunchMission(id) {
    if (p.missionStarted[id] !== 1) {
        if (p.cash >= missions[id].cost) {
            p.cash -= missions[id].cost;
            p.missionStarted[id] = 1;
        }
    }
}

function BuyUpgrade(id) {
    if (p.upgradeBuyed[id] !== 1) {
        if (p.cash >= upgrades[id].cost) {
            p.cash -= upgrades[id].cost;
            p.MissionMultiplier[upgrades[id].missionid] += upgrades[id].reward;
            p.TimeReducer[upgrades[id].missionid] = upgrades[id].time;
            p.upgradeBuyed[id] = 1;
        }
    }
}


function checkRP() {
    if (p.rp >= p.maxrp) {
        p.rp -= p.maxrp;
        p.rank++;
        if (p.rank < 5) { p.maxrp = p.rank * 100; }
        if (p.rank > 4) { p.maxrp = p.rank * 200; }
        if (p.rank > 49) { p.maxrp = p.maxrp + 50000; }
        if (p.rank > 99) { p.maxrp = p.maxrp + 1000000; }
    }
    if (p.rp >= p.maxrp) { checkRP(); }
}

function GetReward(id) {
    p.timerscount[id] = 0;
    p.rp += missions[id].reward * 10;
    p.cash += missions[id].reward * p.MissionMultiplier[id];
    p.completed++;
}