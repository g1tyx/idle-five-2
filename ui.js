function hidemenus() {
    for (var i = 1; i < 5; i++) {
        document.getElementById('tab' + i).style.display = 'none';
        $("#" + i).removeClass("active");
    }
}

function UpdateUI() {
    var count = p.missionStarted;
    var totalmission = count[0] + count[1] + count[2] + count[3] + count[4] + count[5] + count[6] + count[7] + count[8] + count[9] + count[10] + count[11] + count[12];
    $("#CashOnScreen").html("<div class='icon5'></div> $" + fixing(p.cash, 2));
    $("#RPOnScreen").html("<div class='icon6'></div>" + fixing(p.rp, 3) + "/" + fixing(p.maxrp, 3));
    $('#gameinfos').html('Version ' + VERSION + "<br>Created by Aizen_");
    $("#TimeText").html("You started the " + p.DateStarted + " and played for <strong>" + toHHMMSS(p.playTime) + "</strong>");
    $("#MissionInProgress").html("<font class='jaune'>" + totalmission + "/13</font> Missions in progress");
    $("#CurrentRank").html("Rank <strong class='rp'>" + fixing(p.rank, 3) + "</strong>");
    $("#MoneyPerCompletition").html("<strong>$" + missions[1].reward + "</strong>");
    save();
    MissionsList();
    OfficeList();
    if( screen.width <= 480 ) { location.href = '/index2.html'; }
}

function MissionsList() {
    $('#MissionsBoard').html("");

    for (var i in missions) {
        var mission = missions[i];
        if (p.missionStarted[i] == 1) {
            name = " vert'>" + mission.name;
            cost = "";
            reward = "Product <font class='vert type2'>$" + fixing(mission.reward*p.MissionMultiplier[i], 2) + "</font>";
            if (p.timerscount[i] <= mission.timer) { p.timerscount[i] += 1; remains = mission.timer - (p.timerscount[i] + p.TimeReducer[i]);} else { GetReward(i); }
            time = " in <font class='jaune type2'>" + toHHMMSS(remains);
            if (remains==0) { GetReward(i); }
        } else {
            var canBuy = mission.cost > p.cash ? 'rouge' : 'vert';
            name = " blanc'>" + mission.name;
            cost = "Cost to launch : <font class='type2 " + canBuy + "'>$" + fixing(mission.cost, 2);
            reward = "Produce <font class='gris type2'>$" + fixing(mission.reward*p.MissionMultiplier[i], 2) + "</font>";
            time = " every <font class='gris type2'> " + toHHMMSS(mission.timer);
        }

        var canLaunch = mission.cost > p.cash ? ' disabled' : '';
        var bought = p.missionStarted[i] > 0 ? ' disabled' : '';

        var missionsDIV = $(
            "<div class='content2'>" +
            "<p class='text-title" + name + "</p><br>" +
            "<p class='text-normal'>" + cost + "</font></p>" +
            "<p class='text-normal'>" + reward + time + "</font></p>" +
            "<input type='button' class='button4" + canLaunch + bought + "' value='Launch the mission' onClick='LaunchMission("+ i +")'></input>" +
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
        //NOT USED IN THIS VERSION
            name = " vert'>" + upgrade.name;
            cost = "";
            reward = "Producting <font class='vert type2'>$" + fixing(missions[upgrade.missionid].reward*p.MissionMultiplier[upgrade.missionid], 2)+ "</font>";
            time = " in <font class='jaune type2'>" + toHHMMSS(missions[upgrade.missionid].timer-p.TimeReducer[upgrade.missionid]);
        } else {
            var canBuy = upgrade.cost > p.cash ? 'rouge' : 'vert';
            name = " blanc'>" + upgrade.name;
            cost = "Cost to upgrade : <font class='type2 " + canBuy + "'>$" + fixing(upgrade.cost, 2);
            reward = "Multiply rewards by <font class='gris type2'> $" + fixing(upgrade.reward, 2) + "</font>";
            time = " and reduce time by <font class='gris type2'> " + toHHMMSS(upgrade.time);
        }

        var canAdd = upgrade.cost > p.cash ? ' disabled' : '';
        var bought = p.upgradeBuyed[i] > 0 ? ' style="display:none;"' : '';
        var BuyAble = p.missionStarted[upgrade.missionid] > 0 ? '' : ' style="display:none;"';

        var officeDIV = $(
            "<div class='content2'" + bought +  BuyAble + ">" +
            "<p class='text-title" + name + "</p><br>" +
            "<p class='text-normal'>" + cost + "</font></p>" +
            "<p class='text-normal'>" + reward + time +"</font></p>" +
            "<input type='button' class='button4" + canAdd + "' value='Buy it!' onClick='BuyUpgrade("+ i +")'></input>" +
            "</div>"
        );
        $('#OfficeBoard').append(officeDIV);
    }
}

function ShowTutorial(id) {
    hidemenus();
    var text = TutorialText[id].text;
    document.getElementById('overlay').style.display = 'block';
    $('#tutorialtext').html(text);
}