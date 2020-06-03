var VERSION = 0.32;

$(document).ready(function () {
    document.title = "IdleFive v" + VERSION;
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
    upgradesBought: 0,
    missionLaunched: 0,
    prestige: 0,
    name: "锅巴汉化组",
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
    0: { name: 'Pickpocketing I', missionid: 0, cost: 5, time: 1, reward: 1.1 },
    1: { name: 'Pickpocketing II', req: 0, missionid: 0, cost: 20, time: 1, reward: 1.25 },
    2: { name: 'Pickpocketing III', req: 1, missionid: 0, cost: 100, time: 1, reward: 1.5 },
    3: { name: 'Pickpocketing IV', req: 2, missionid: 0, cost: 200, time: 1, reward: 1.75 },
    4: { name: 'Pickpocketing V', req: 3, missionid: 0, cost: 400, time: 1, reward: 2 },
    5: { name: 'Pickpocketing VI', req: 4, missionid: 0, cost: 4000, time: 0, reward: 3 },
    6: { name: 'Pickpocketing VII', req: 5, missionid: 0, cost: 8000, time: 0, reward: 4 },
    7: { name: 'Grocery Store Robbing I', missionid: 1, cost: 150, time: 2, reward: 1.1 },
    8: { name: 'Grocery Store Robbing II', req: 7, missionid: 1, cost: 300, time: 2, reward: 1.25 },
    9: { name: 'Grocery Store Robbing III', req: 8, missionid: 1, cost: 1500, time: 2, reward: 1.5 },
    10: { name: 'Grocery Store Robbing IV', req: 9, missionid: 1, cost: 3000, time: 2, reward: 1.75 },
    11: { name: 'Grocery Store Robbing V', req: 10, missionid: 1, cost: 4500, time: 2, reward: 2 },
    12: { name: 'Grocery Store Robbing VI', req: 11, missionid: 1, cost: 4500, time: 2, reward: 3 },
    13: { name: 'Street Races I', missionid: 2, cost: 1000, time: 3, reward: 1.1 },
    14: { name: 'Street Races II', req: 13, missionid: 2, cost: 2000, time: 3, reward: 1.25 },
    15: { name: 'Street Races III', req: 14, missionid: 2, cost: 10000, time: 3, reward: 1.5 },
    16: { name: 'Street Races IV', req: 15, missionid: 2, cost: 20000, time: 3, reward: 1.75 },
    17: { name: 'Street Races V', req: 16, missionid: 2, cost: 30000, time: 3, reward: 2 },
    18: { name: 'Street Races VI', req: 17, missionid: 2, cost: 300000, time: 3, reward: 3 },
    19: { name: 'Armored Vans I', missionid: 3, cost: 2500, time: 6, reward: 1.1 },
    20: { name: 'Armored Vans II', req: 19, missionid: 3, cost: 5000, time: 6, reward: 1.25 },
    21: { name: 'Armored Vans III', req: 20, missionid: 3, cost: 25000, time: 6, reward: 1.5 },
    22: { name: 'Armored Vans IV', req: 21, missionid: 3, cost: 50000, time: 6, reward: 1.75 },
    23: { name: 'Armored Vans V', req: 22, missionid: 3, cost: 75000, time: 6, reward: 2 },
    24: { name: 'Armored Vans VI', req: 23, missionid: 3, cost: 750000, time: 6, reward: 3 },
    25: { name: 'False Papers Factory I', missionid: 4, cost: 5000, time: 12, reward: 1.1 },
    26: { name: 'False Papers Factory II', req: 25, missionid: 4, cost: 10000, time: 12, reward: 1.25 },
    27: { name: 'False Papers Factory III', req: 26, missionid: 4, cost: 50000, time: 12, reward: 1.5 },
    28: { name: 'False Papers Factory IV', req: 27, missionid: 4, cost: 100000, time: 12, reward: 1.75 },
    29: { name: 'False Papers Factory V', req: 28, missionid: 4, cost: 150000, time: 12, reward: 2 },
    30: { name: 'False Papers Factory VI', req: 29, missionid: 4, cost: 1500000, time: 12, reward: 3 },
    31: { name: 'Weed Farm I', missionid: 5, cost: 10000, time: 18, reward: 1.1 },
    32: { name: 'Weed Farm II', req: 31, missionid: 5, cost: 20000, time: 18, reward: 1.25 },
    33: { name: 'Weed Farm III', req: 32, missionid: 5, cost: 100000, time: 18, reward: 1.5 },
    34: { name: 'Weed Farm IV', req: 33, missionid: 5, cost: 200000, time: 18, reward: 1.75 },
    35: { name: 'Weed Farm V', req: 34, missionid: 5, cost: 300000, time: 18, reward: 2 },
    36: { name: 'Weed Farm V', req: 35, missionid: 5, cost: 3000000, time: 18, reward: 3 },
    37: { name: 'False Money Factory I', missionid: 6, cost: 20000, time: 60, reward: 1.1 },
    38: { name: 'False Money Factory II', req: 37, missionid: 6, cost: 40000, time: 60, reward: 1.25 },
    39: { name: 'False Money Factory III', req: 38, missionid: 6, cost: 200000, time: 60, reward: 1.5 },
    40: { name: 'False Money Factory IV', req: 39, missionid: 6, cost: 400000, time: 60, reward: 1.75 },
    41: { name: 'False Money Factory V', req: 40, missionid: 6, cost: 600000, time: 60, reward: 2 },
    42: { name: 'False Money Factory VI', req: 41, missionid: 6, cost: 6000000, time: 60, reward: 3 },
    43: { name: 'Meth Workshop I', missionid: 7, cost: 50000, time: 90, reward: 1.1 },
    44: { name: 'Meth Workshop II', req: 43, missionid: 7, cost: 100000, time: 90, reward: 1.25 },
    45: { name: 'Meth Workshop III', req: 44, missionid: 7, cost: 500000, time: 90, reward: 1.5 },
    46: { name: 'Meth Workshop IV', req: 45, missionid: 7, cost: 1000000, time: 90, reward: 1.75 },
    47: { name: 'Meth Workshop V', req: 46, missionid: 7, cost: 1500000, time: 90, reward: 2 },
    48: { name: 'Meth Workshop VI', req: 47, missionid: 7, cost: 15000000, time: 90, reward: 3 },
    49: { name: 'Cocaine Workshop I', missionid: 8, cost: 65000, time: 120, reward: 1.1 },
    50: { name: 'Cocaine Workshop II', req: 49, missionid: 8, cost: 130000, time: 120, reward: 1.25 },
    51: { name: 'Cocaine Workshop III', req: 50, missionid: 8, cost: 650000, time: 120, reward: 1.5 },
    52: { name: 'Cocaine Workshop IV', req: 51, missionid: 8, cost: 1300000, time: 120, reward: 1.75 },
    53: { name: 'Cocaine Workshop V', req: 52, missionid: 8, cost: 19500000, time: 120, reward: 2 },
    54: { name: 'Cocaine Workshop VI', req: 53, missionid: 8, cost: 195000000, time: 120, reward: 3 },
    55: { name: 'Hangar I', missionid: 9, cost: 200000, time: 180, reward: 1.1 },
    56: { name: 'Hangar II', req: 55, missionid: 9, cost: 400000, time: 180, reward: 1.25 },
    57: { name: 'Hangar III', req: 56, missionid: 9, cost: 2000000, time: 180, reward: 1.5 },
    58: { name: 'Hangar IV', req: 57, missionid: 9, cost: 800000, time: 180, reward: 1.75 },
    59: { name: 'Hangar V', req: 58, missionid: 9, cost: 1000000, time: 180, reward: 2 },
    60: { name: 'Hangar VI', req: 59, missionid: 9, cost: 10000000, time: 180, reward: 3 },
    61: { name: 'Bunker I', missionid: 10, cost: 1000000, time: 240, reward: 1.1 },
    62: { name: 'Bunker II', req: 61, missionid: 10, cost: 2000000, time: 240, reward: 1.25 },
    63: { name: 'Bunker III', req: 62, missionid: 10, cost: 10000000, time: 240, reward: 1.5 },
    64: { name: 'Bunker IV', req: 63, missionid: 10, cost: 20000000, time: 240, reward: 1.75 },
    65: { name: 'Bunker V', req: 64, missionid: 10, cost: 30000000, time: 240, reward: 2 },
    66: { name: 'Bunker VI', req: 65, missionid: 10, cost: 300000000, time: 240, reward: 3 },
    67: { name: 'Vehicle Trafficking I', missionid: 11, cost: 5000000, time: 300, reward: 1.1 },
    68: { name: 'Vehicle Trafficking II', req: 67, missionid: 11, cost: 10000000, time: 300, reward: 1.25 },
    69: { name: 'Vehicle Trafficking III', req: 68, missionid: 11, cost: 50000000, time: 300, reward: 1.5 },
    70: { name: 'Vehicle Trafficking IV', req: 69, missionid: 11, cost: 100000000, time: 300, reward: 1.75 },
    71: { name: 'Vehicle Trafficking V', req: 70, missionid: 11, cost: 150000000, time: 300, reward: 2 },
    72: { name: 'Vehicle Trafficking VI', req: 71, missionid: 11, cost: 1500000000, time: 300, reward: 3 },
    73: { name: 'Union Depository Robbing I', missionid: 12, cost: 10000000, time: 360, reward: 1.1 },
    74: { name: 'Union Depository Robbing II', req: 73, missionid: 12, cost: 20000000, time: 360, reward: 1.25 },
    75: { name: 'Union Depository Robbing III', req: 74, missionid: 12, cost: 100000000, time: 360, reward: 1.5 },
    76: { name: 'Union Depository Robbing IV', req: 75, missionid: 12, cost: 200000000, time: 360, reward: 1.75 },
    77: { name: 'Union Depository Robbing V', req: 76, missionid: 12, cost: 300000000, time: 360, reward: 2 },
    78: { name: 'Union Depository Robbing VI', req: 77, missionid: 12, cost: 3000000000, time: 360, reward: 3 },
};

var stocks = {
    0: { name: "Los Santos City", action: 0, value: 0.10 },
    1: { name: "Maze Bank", action: 1, value: 0.15 },
    2: { name: "24/7 Stores", action: 2, value: 0.25 },
};

var WelcomeTexts = {
    0: "Hello sir, welcome to Los Santos !<br>My name is Lamar, i'm here to help you to start your new company.<br>So first thing i need to know is the name of your new company :",
    1: "Oh that's you,<br>And you want to buy a new action for your company, okay.<br> You can change the name of your current company if you want,<br> you just have to type it here :",
};

var AlertText = {
    0: "Do you have a method to make some money ?.. A way to get it ?<br>Okay so, let me help you.<br> The first thing that you can do is to launch the mission called <font class='bold'>Pickpocketing</font>.",
    1: "Good job !<br>Now that you started this mission, you can gain money.<br>But i think it'll not be enough for now so,<br>you have to find a way in your <font class='bold'>office</font> to upgrade the rentability!",
    2: "Excellent job, i think that you can now live by your own,<br> have fun in Los Santos !",
    3: "Hey boss, everyone in Los Santos is talking about<br> an organization called " + p.name + " that's amazing !<br> You start to have an important reputation.<br> Continue like that, that's perfect !",
    4: "Wow, you've just finished my game.<br> Thank you for playing it, i'll add more content when i can, stay tuned !<br>- <font class='bold'>Soleil_Rouge</font>",
};

var progressBarWidth = 0;
var TimeRemaining = 0;

function GetTutorialRewards(id) {
    if (id == 0) {
        if (p.rewards[id] < 1) p.cash += 1 + (p.prestige * stocks[2].value);
    }
    p.rewards[id] = 1;
}

function idleLoop() {
    if (p.playTime == 0) { WelcomeText("Welcome to IdleFive", 0); }
    if (p.TutorialStep == 0) { if (p.completed == 1) { ShowAlert("Lamar", 0); p.cash += 1 + (p.prestige * stocks[2].value); p.completed++; } }
    if (p.missionStarted[0] == 1) { if (p.TutorialStep == 1) { ShowAlert("Lamar", 1); } }
    if (p.upgradeBuyed[0] == 1) { if (p.TutorialStep == 2) { ShowAlert("Lamar", 2); } }
    if (p.TutorialStep == 3) { if (p.completed >= 2000) ShowAlert("Lamar", 3); }
    if (p.TutorialStep == 4) { if (p.upgradesBought == 65) { if (p.missionLaunched == 13) { ShowAlert("Lamar", 4); } } }
    p.playTime++;
    UPDATESTATS();
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
        if (p.cash >= getUpgradeCost(id)) {
            p.cash -= getUpgradeCost(id);
            p.MissionMultiplier[upgrades[id].missionid] = upgrades[id].reward;
            p.TimeReducer[upgrades[id].missionid] += upgrades[id].time;
            p.upgradeBuyed[id] = 1;
            p.upgradesBought++;
        }
    }
}

function UPDATESTATS() {
    p.CashMult = stocks[0].value * p.prestige + 1;
    p.RPmult = stocks[1].value * p.prestige + 1;
    p.priceMult = stocks[2].value * p.prestige + 1;
    checkRP();
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

function getUpgradeCost(id) {
    cost = upgrades[id].cost * p.priceMult;
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
            p.upgradesBought = 0;
            p.TutorialStep = 1;
            p.missionLaunched = 0;
        }
        WelcomeText("Stocks Management", 1);
    }
}

function ForceHax() {
    p.cash = getPrestigePrice();
    p.rank = getPrestigePrice2();
}