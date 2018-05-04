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
    $("#TimeText").html("You started the " + p.DateStarted + " and played for <font class'type2'>" + toHHMMSS(p.playTime) + "</font>");
    $("#MissionInProgress").html("<font class='type2 jaune'>" + totalmission + "/13</font> Missions in progress<br><font class='jaune type2'>" + p.completed + "</font> missions completed.");
    $("#CurrentRank").html("Rank <font class='rp'>" + fixing(p.rank, 3) + "</font>");
    for (var i = 0; i < 13; i++) {
        name = missions[i].name;
        reward = fixing(missions[i].reward * p.MissionMultiplier[i], 1);
        rp = fixing(missions[i].reward * 10, 3);
        time = toHHMMSS(missions[i].timer - p.TimeReducer[i]);

        if (p.missionStarted[i] == 1) {
            $("#MissionStats" + i).html("<font class='type1'>" + name + "</font> produce <font class='vert type2'>$" + reward + "</font> and give <font class='rp type2'>" + rp + " RP</font> in <font class='jaune type2'>" + time + "</font>");
        } else {
            $("#MissionStats" + i).html("<font class='type1 gris'>" + name + "</font> can product <font class='gris type2'>$" + reward + "</font> and give <font class='gris type2'>" + rp + " RP</font> in <font class='gris type2'>" + time + "</font>");
        }
    }
    save();
    OfficeList();
    MissionsList();
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
            name = " blanc'>" + mission.name;
            cost = "Cost to launch : <font class='type2 " + canBuy + "'>$" + fixing(mission.cost, 2);
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

function ShowTutorial(id) {
    hidemenus();
    var text = TutorialText[id];
    document.getElementById('overlay').style.display = 'block';
    $('#tutorialtext').html(text);
}