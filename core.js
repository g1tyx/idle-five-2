var VERSION = 0.3;

$(document).ready(function () {
    document.title = "IdleFive v" + VERSION;
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
    completed: 0,
    TutorialStep: 0,
    playTime: 0,
    RPmult: 1,
    CashMult: 1,
    priceMult: 1,
    missionStarted: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    TimeReducer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    MissionMultiplier: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    timerscount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    upgradeBuyed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    rewards: [0, 0],
    upgradesBought: 0,
    missionLaunched: 0,
    prestige: 0,
    name: "None",
};

var missions = {
    0: { name: 'Pickpocketing', timer: 10, reward: 0.5, cost: 1 },
    1: { name: 'Rob a Grocery Store', timer: 20, reward: 5, cost: 15 },
    2: { name: 'Street Race', timer: 30, reward: 10, cost: 100 },
    3: { name: 'Rob an Armored Van', timer: 60, reward: 25, cost: 250 },
    4: { name: 'False Papers Factory', timer: 120, reward: 50, cost: 500 },
    5: { name: 'Weed Farm', timer: 180, reward: 100, cost: 1000 },
    6: { name: 'False Money Factory', timer: 600, reward: 200, cost: 2000 },
    7: { name: 'Meth Workshop', timer: 900, reward: 500, cost: 5000 },
    8: { name: 'Cocaine Workshop', timer: 1200, reward: 5000, cost: 6500 },
    9: { name: 'Hangar', timer: 1800, reward: 10000, cost: 20000 },
    10: { name: 'Bunker', timer: 2400, reward: 50000, cost: 100000 },
    11: { name: 'Vehicle Trafficking', timer: 3000, reward: 100000, cost: 500000 },
    12: { name: 'Rob the Union Depository', timer: 3600, reward: 1000000, cost: 1000000 },
};

var upgrades = {
    0: { name: 'Pickpocketing I', missionid: 0, cost: 10, time: 1, reward: 1.1 },
    1: { name: 'Pickpocketing II', req: 0, missionid: 0, cost: 20, time: 1, reward: 1.25 },
    2: { name: 'Pickpocketing III', req: 1, missionid: 0, cost: 100, time: 1, reward: 1.5 },
    3: { name: 'Pickpocketing IV', req: 2, missionid: 0, cost: 200, time: 1, reward: 1.75 },
    4: { name: 'Pickpocketing V', req: 3, missionid: 0, cost: 400, time: 1, reward: 2 },
    5: { name: 'Grocery Store Robbing I', missionid: 1, cost: 150, time: 2, reward: 1.1 },
    6: { name: 'Grocery Store Robbing II', req: 5, missionid: 1, cost: 300, time: 2, reward: 1.25 },
    7: { name: 'Grocery Store Robbing III', req: 6, missionid: 1, cost: 1500, time: 2, reward: 1.5 },
    8: { name: 'Grocery Store Robbing IV', req: 7, missionid: 1, cost: 3000, time: 2, reward: 1.75 },
    9: { name: 'Grocery Store Robbing V', req: 8, missionid: 1, cost: 4500, time: 2, reward: 2 },
    10: { name: 'Street Races I', missionid: 2, cost: 1000, time: 3, reward: 1.1 },
    11: { name: 'Street Races II', req: 10, missionid: 2, cost: 2000, time: 3, reward: 1.25 },
    12: { name: 'Street Races III', req: 11, missionid: 2, cost: 10000, time: 3, reward: 1.5 },
    13: { name: 'Street Races IV', req: 12, missionid: 2, cost: 20000, time: 3, reward: 1.75 },
    14: { name: 'Street Races V', req: 13, missionid: 2, cost: 30000, time: 3, reward: 2 },
    15: { name: 'Armored Vans I', missionid: 3, cost: 2500, time: 6, reward: 1.1 },
    16: { name: 'Armored Vans II', req: 15, missionid: 3, cost: 5000, time: 6, reward: 1.25 },
    17: { name: 'Armored Vans III', req: 16, missionid: 3, cost: 25000, time: 6, reward: 1.5 },
    18: { name: 'Armored Vans IV', req: 17, missionid: 3, cost: 50000, time: 6, reward: 1.75 },
    19: { name: 'Armored Vans V', req: 18, missionid: 3, cost: 75000, time: 6, reward: 2 },
    20: { name: 'False Papers Factory I', missionid: 4, cost: 5000, time: 12, reward: 1.1 },
    21: { name: 'False Papers Factory II', req: 20, missionid: 4, cost: 10000, time: 12, reward: 1.25 },
    22: { name: 'False Papers Factory III', req: 21, missionid: 4, cost: 50000, time: 12, reward: 1.5 },
    23: { name: 'False Papers Factory IV', req: 22, missionid: 4, cost: 100000, time: 12, reward: 1.75 },
    24: { name: 'False Papers Factory V', req: 23, missionid: 4, cost: 150000, time: 12, reward: 2 },
    25: { name: 'Weed Farm I', missionid: 5, cost: 10000, time: 18, reward: 1.1 },
    26: { name: 'Weed Farm II', req: 25, missionid: 5, cost: 20000, time: 18, reward: 1.25 },
    27: { name: 'Weed Farm III', req: 26, missionid: 5, cost: 100000, time: 18, reward: 1.5 },
    28: { name: 'Weed Farm IV', req: 27, missionid: 5, cost: 200000, time: 18, reward: 1.75 },
    29: { name: 'Weed Farm V', req: 28, missionid: 5, cost: 300000, time: 18, reward: 2 },
    30: { name: 'False Money Factory I', missionid: 6, cost: 20000, time: 60, reward: 1.1 },
    31: { name: 'False Money Factory II', req: 30, missionid: 6, cost: 40000, time: 60, reward: 1.25 },
    32: { name: 'False Money Factory III', req: 31, missionid: 6, cost: 200000, time: 60, reward: 1.5 },
    33: { name: 'False Money Factory IV', req: 32, missionid: 6, cost: 400000, time: 60, reward: 1.75 },
    34: { name: 'False Money Factory V', req: 33, missionid: 6, cost: 600000, time: 60, reward: 2 },
    35: { name: 'Meth Workshop I', missionid: 7, cost: 50000, time: 90, reward: 1.1 },
    36: { name: 'Meth Workshop II', req: 35, missionid: 7, cost: 100000, time: 90, reward: 1.25 },
    37: { name: 'Meth Workshop III', req: 36, missionid: 7, cost: 500000, time: 90, reward: 1.5 },
    38: { name: 'Meth Workshop IV', req: 37, missionid: 7, cost: 1000000, time: 90, reward: 1.75 },
    39: { name: 'Meth Workshop V', req: 38, missionid: 7, cost: 1500000, time: 90, reward: 2 },
    40: { name: 'Cocaine Workshop I', missionid: 8, cost: 65000, time: 120, reward: 1.1 },
    41: { name: 'Cocaine Workshop II', req: 40, missionid: 8, cost: 130000, time: 120, reward: 1.25 },
    42: { name: 'Cocaine Workshop III', req: 41, missionid: 8, cost: 650000, time: 120, reward: 1.5 },
    43: { name: 'Cocaine Workshop IV', req: 42, missionid: 8, cost: 1300000, time: 120, reward: 1.75 },
    44: { name: 'Cocaine Workshop V', req: 43, missionid: 8, cost: 19500000, time: 120, reward: 2 },
    45: { name: 'Hangar I', missionid: 9, cost: 200000, time: 180, reward: 1.1 },
    46: { name: 'Hangar II', req: 45, missionid: 9, cost: 400000, time: 180, reward: 1.25 },
    47: { name: 'Hangar III', req: 46, missionid: 9, cost: 2000000, time: 180, reward: 1.5 },
    48: { name: 'Hangar IV', req: 47, missionid: 9, cost: 800000, time: 180, reward: 1.75 },
    49: { name: 'Hangar V', req: 48, missionid: 9, cost: 1000000, time: 180, reward: 2 },
    50: { name: 'Bunker I', missionid: 10, cost: 1000000, time: 240, reward: 1.1 },
    51: { name: 'Bunker II', req: 50, missionid: 10, cost: 2000000, time: 240, reward: 1.25 },
    52: { name: 'Bunker III', req: 51, missionid: 10, cost: 10000000, time: 240, reward: 1.5 },
    53: { name: 'Bunker IV', req: 52, missionid: 10, cost: 20000000, time: 240, reward: 1.75 },
    54: { name: 'Bunker V', req: 53, missionid: 10, cost: 30000000, time: 240, reward: 2 },
    55: { name: 'Vehicle Trafficking I', missionid: 11, cost: 5000000, time: 300, reward: 1.1 },
    56: { name: 'Vehicle Trafficking II', req: 55, missionid: 11, cost: 10000000, time: 300, reward: 1.25 },
    57: { name: 'Vehicle Trafficking III', req: 56, missionid: 11, cost: 50000000, time: 300, reward: 1.5 },
    58: { name: 'Vehicle Trafficking IV', req: 57, missionid: 11, cost: 100000000, time: 300, reward: 1.75 },
    59: { name: 'Vehicle Trafficking V', req: 58, missionid: 11, cost: 150000000, time: 300, reward: 2 },
    60: { name: 'Union Depository Robbing I', missionid: 12, cost: 10000000, time: 360, reward: 1.1 },
    61: { name: 'Union Depository Robbing II', req: 60, missionid: 12, cost: 20000000, time: 360, reward: 1.25 },
    62: { name: 'Union Depository Robbing III', req: 61, missionid: 12, cost: 100000000, time: 360, reward: 1.5 },
    63: { name: 'Union Depository Robbing IV', req: 62, missionid: 12, cost: 200000000, time: 360, reward: 1.75 },
    64: { name: 'Union Depository Robbing V', req: 63, missionid: 12, cost: 300000000, time: 360, reward: 2 },
};

var WelcomeTextt = "Hi man, welcome to Los Santos !<br>I'm Lamar, i will help you to have a good start.<br>But first, what is your name ?";

var AlertText = {
    0: "Did you have a job yet ?.. Anyway to get a little bit of cash?<br>Okay, let me help you then.<br> First, launch the mission called 'Pickpocketing' !",
    1: "Good job !<br>Now that you have a mission to do, you will get some money.<br>But i think it'll not be enough for you to live properly.<br>Find a way in your office to fix this problem!",
    2: "You did well here, i think that you can now live by your own, have fun in Los Santos !",
    3: "Heyy, how are you today ?<br> I can see that you are starting to have a good reputation, that's impressive, keep up man !",
    4: "Wow, you've just finished my game.<br> Thank you for playing it, i'll add more content when i can, stay tuned !<br>- <font class='rouge'>Soleil_Rouge</font>",
};

var progressBarWidth = 0;
var TimeRemaining = 0;

function GetTutorialRewards(id) {
    if (id == 0) {
        if (p.rewards[id] < 1) p.cash += 1 + (p.prestige * stocks[2].value);
    } else {
        if (p.rewards[id] < 1) p.cash += 10;
    }
    p.rewards[id] = 1;
}

function idleLoop() {
    if (p.TutorialStep == 0) { WelcomeText("Welcome to IdleFive"); }
    if (p.TutorialStep == 1) { ShowAlert("Lamar", 0); GetTutorialRewards(0); }
    if (p.missionStarted[0] == 1) { if (p.TutorialStep == 2) { ShowAlert("Lamar", 1); GetTutorialRewards(1); } }
    if (p.upgradeBuyed[0] == 1) { if (p.TutorialStep == 3) { ShowAlert("Lamar", 2); } }
    if (p.TutorialStep == 4) { if (p.completed >= 100) ShowAlert("Lamar", 3); }
    if (p.TutorialStep == 5) { if (p.MissionMultiplier[12] == 2) { if (p.missionStarted[12] == 1) { ShowAlert("Lamar", 4); } } }
    p.playTime++;
    checkRP();
    UpdateUI();
}
setInterval(idleLoop, 1000);

function LaunchMission(id) {
    if (p.missionStarted[id] !== 1) {
        if (p.cash >= getMissionCost(id)) {
            p.cash -= getMissionCost(id);
            p.missionStarted[id] = 1;
            p.missionLaunched++;
        }
    }
}

function BuyUpgrade(id) {
    if (p.upgradeBuyed[id] !== 1) {
        if (p.cash >= upgrades[id].cost) {
            p.cash -= upgrades[id].cost;
            p.MissionMultiplier[upgrades[id].missionid] = upgrades[id].reward;
            p.TimeReducer[upgrades[id].missionid] += upgrades[id].time;
            p.upgradeBuyed[id] = 1;
            p.upgradesBought++;
        }
    }
}

function checkRP() {
    if (p.rp >= p.maxrp) {
        p.rp -= p.maxrp;
        p.rank++;
    }
    if (p.rank < 5) { p.maxrp = p.rank * 100; }
    if (p.rank > 4) { p.maxrp = p.rank * 200; }
    if (p.rank > 49) { p.maxrp = p.rank * 300; }
    if (p.rank > 99) { p.maxrp = p.rank * 500; }
    if (p.rp >= p.maxrp) { checkRP(); }
}

function GetReward(id) {
    p.timerscount[id] = 0;
    p.rp += (missions[id].reward * 10) * p.RPmult;
    p.cash += (missions[id].reward * p.MissionMultiplier[id]) * p.CashMult;
    p.completed++;
}

function getMissionCost(id) {
    cost = missions[id].cost * p.priceMult;
    return cost;
}

function getPrestigePrice() {
    price = (1 + p.prestige) * 1e7;
    return price;
}

function getPrestigePrice2() {
    price = 75 + (p.prestige + 1) * 25;
    return price;
}

function BuyActions() {
    if (p.cash >= getPrestigePrice()) {
        if (p.rank >= getPrestigePrice2()) {
            p.prestige++;
            p.cash = 0;
            p.rank = 0;
            p.rp = 0;
            p.completed = 0;
            p.missionStarted = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            p.TimeReducer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            p.MissionMultiplier = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            p.timerscount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            p.upgradeBuyed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            p.rewards = [0, 0];
            p.upgradesBought = 0;
            p.TutorialStep = 0;
            p.missionLaunched = 0;
            p.CashMult = stocks[0].value * p.prestige + 1;
            p.RPmult = stocks[1].value * p.prestige + 1;
            p.priceMult = stocks[2].value * p.prestige + 1;
        }
    }
}

var stocks = {
    0: { name: "Los Santos City", action: 0, value: 0.10 },
    1: { name: "Maze Bank", action: 1, value: 0.15 },
    2: { name: "24/7 Stores", action: 2, value: 0.25 },
};
//LIST OF TYPES : 0 = RPMult; 1 = CashMult; 2 = PriceModifier