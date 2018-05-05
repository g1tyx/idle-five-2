function hidemenus() {
    for (var i = 1; i < 5; i++) {
        $("#tab" + i).hide();
        $("#" + i).removeClass("active");
    }
}

function clearmenus() {
    for (var i = 1; i < 5; i++) {
        $("#tab" + i).hide();
        $("#" + i).removeClass("active");
        $("#" + i).hide();
    }
}

function showbuttons() {
    for (var i = 1; i < 5; i++) {
        $("#" + i).show();
    }
}

function UpdateUI() {
    $("#CashOnScreen").html("<div class='icon5'></div> $" + fixing(p.cash, 2));
    $("#RPOnScreen").html("<div class='icon6'></div>" + fixing(p.rp, 3) + "/" + fixing(p.maxrp, 3));
    $('#gameinfos').html('Version <font class=""' + VERSION + "<br>Created by <font class='rouge'>Soleil_Rouge</font>");
    $("#TimeText").html("You started the " + p.DateStarted + " and played for <font class'type2'>" + toHHMMSS(p.playTime) + "</font>");
    $("#MissionInProgress").html("<font class='type2 jaune'>" + p.missionLaunched + "/13</font> missions in progress (<font class='type2 jaune'>" + p.upgradesBought + "</font> upgrades bought)<br><font class='jaune type2'>" + p.completed + "</font> missions completed");
    $("#CurrentRank").html("Rank <font class='rp'>" + fixing(p.rank, 3) + "</font>");
    for (var i = 0; i < 13; i++) {
        name = missions[i].name;
        reward = fixing(missions[i].reward * p.MissionMultiplier[i], 1);
        rp = fixing(missions[i].reward * 10, 3);
        time = toHHMMSS(missions[i].timer - p.TimeReducer[i]);

        if (p.missionStarted[i] == 1) {
            $("#MissionStats" + i).html("<font class='type1'>" + name + "</font> produce <font class='vert type2'>$" + reward + "</font> and give <font class='rp type2'>" + rp + " RP</font> every <font class='jaune type2'>" + time + "</font>");
        } else {
            $("#MissionStats" + i).html("<font class='type1 gris'>" + name + "</font> can product <font class='gris type2'>$" + reward + "</font> and give <font class='gris type2'>" + rp + " RP</font> every <font class='gris type2'>" + time + "</font>");
        }
    }
    save();
    MissionsList();
    PrestigeList();
    StocksList();
    OfficeList();
}

function MissionsList() {
    $('#MissionsBoard').html("");

    for (var i in missions) {
        var mission = missions[i];
        if (p.missionStarted[i] == 1) {
            name = " vert'>" + mission.name;
            cost = "";
            reward = "Product <font class='vert type2'>$" + fixing(mission.reward * p.MissionMultiplier[i], 1) + "</font>";
            if (p.timerscount[i] <= mission.timer) { p.timerscount[i] += 1; remains = mission.timer - (p.timerscount[i] + p.TimeReducer[i]); } else { GetReward(i); }
            time = " in <font class='jaune type2'>" + toHHMMSS(remains);
            if (remains == 0) { GetReward(i); }
        } else {
            var canBuy = mission.cost > p.cash ? 'rouge' : 'vert';
            var canBuy2 = mission.cost > p.cash ? 'gris2' : 'blanc';
            name = " " + canBuy2 + "'>" + mission.name;
            cost = "Cost to launch : <font class='type2 " + canBuy + "'>$" + fixing(getMissionCost(i), 2);
            reward = "Produce <font class='gris type2'>$" + fixing(mission.reward * p.MissionMultiplier[i], 1) + "</font>";
            time = " every <font class='gris type2'> " + toHHMMSS(mission.timer);
        }

        var canLaunch = mission.cost > p.cash ? ' disabled' : '';
        var bought = p.missionStarted[i] > 0 ? ' disabled' : '';

        var missionsDIV = $(
            "<div class='content2'>" +
            "<p class='text-title" + name + "</p><br>" +
            "<p class='text-normal'>" + cost + "</font></p>" +
            "<p class='text-normal'>" + reward + time + "</font></p>" +
            "<input type='button' class='button4" + canLaunch + bought + "' value='Launch the mission' onClick='LaunchMission(" + i + ")'></input>" +
            "</div>"
        );
        $('#MissionsBoard').append(missionsDIV);
    }
}

function OfficeList() {
    $('#OfficeBoard').html("");

    for (var i in upgrades) {
        var upgrade = upgrades[i];
        if (p.upgradeBuyed[i] == 1) {
            viewable = 0;
            name = "";
            cost = "";
            reward = "";
            time = "";
        } else {
            if (isNaN(upgrade.req)) {
                viewable = 1;
            } else {
                if (p.upgradeBuyed[upgrade.req] == 1) { viewable = 1; }
                else { viewable = 0; }
            }
            var canBuy = upgrade.cost > p.cash ? 'rouge' : 'vert';
            name = " blanc'>" + upgrade.name;
            cost = "Cost to upgrade : <font class='type2 " + canBuy + "'>$" + fixing(upgrade.cost, 2);
            reward = "Multiply rewards by <font class='gris type2'> x" + fixing(upgrade.reward, 1) + "</font>";
            time = " and reduce time by <font class='gris type2'> " + toHHMMSS(upgrade.time);
        }

        var canAdd = upgrade.cost > p.cash ? ' disabled' : '';
        var MissionBought = p.missionStarted[upgrade.missionid] > 0 ? '' : ' style="display:none;"';
        var view = viewable == 1 ? '' : ' style="display:none;"';

        var officeDIV = $(
            "<div class='content2'" + view + MissionBought + ">" +
            "<p class='text-title" + name + "</p><br>" +
            "<p class='text-normal'>" + cost + "</font></p>" +
            "<p class='text-normal'>" + reward + time + "</font></p>" +
            "<input type='button' class='button4" + canAdd + "' value='Buy it!' onClick='BuyUpgrade(" + i + ")'></input>" +
            "</div>"
        );
        $('#OfficeBoard').append(officeDIV);
    }
}

function ShowAlert(title, id) {
    clearmenus();
    var text = AlertText[id];
    $("#alert").show();
    $('#alerttitle').html(title);
    $('#alerttext').html(text);
}

function WelcomeText(title) {
    clearmenus();
    $("#welcome").show();
    $('#welcometitle').html(title);
    $('#welcometext').html(WelcomeTextt);
}

function StocksList() {
    $('#StocksBoard').html("");
    for (var i in stocks) {
        var stock = stocks[i];

        if (stock.action == 0) { type = "multiply RP gained by <font class='rp type2'>"; }
        if (stock.action == 1) { type = "multiply Cash gained by <font class='vert type2'>"; }
        if (stock.action == 2) { type = "Prices multiplied by <font class='jaune type2'>"; }

        var value = type + stock.value * p.prestige;

        var stocksDIV = $(
            "<div class='content3'>" +
            "<p class='text-title blanc'>" + stock.name + "</p><br>" +
            "<p class='text-normal'>" + value + "</font></p>" +
            "</div>"
        );
        $('#StocksBoard').append(stocksDIV);
    }
}

function PrestigeList() {
    $('#PrestigeBoard').html("");

    var canBuy = getPrestigePrice() > p.cash ? ' disabled' : '';
    var canBuy2 = getPrestigePrice2() > p.rank ? ' disabled' : '';
    var cost = fixing(getPrestigePrice(), 2);
    var cost2 = fixing(getPrestigePrice2(), 3);

    var prestigeDIV = $(
        "<div class='content3'>" +
        "<p class='text-title blanc'>" + p.name + "</p><br>" +
        "<p class='text-normal'>Owned actions : <font class='type2 gris2 blanc'>" + p.prestige + "</font></p>" +
        "<p class='text-normal'>Price : <font class='type2 vert'>$" + cost + "</font></p>" +
        "<p class='text-normal'>Reputation needed : <font style='font-size:2.25vh;' class='type1'>Rank " + cost2 + "</font></p>" +
        "<input type='button' class='button4" + canBuy + canBuy2 + "' value='Buy a new action!' onClick='BuyActions()'></input>" +
        "</div>"
    );
    $('#PrestigeBoard').append(prestigeDIV);
}

//ADD UPGRADES PRICES MULT, DIV PRESTIGE, FONCTIONS ACHAT PRESTIGE