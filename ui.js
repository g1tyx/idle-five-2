function hidemenus() {
    for (var i = 1; i < 5; i++) {
        document.getElementById('tab' + i).style.display = 'none';
        $("#" + i).removeClass("active");
    }
}

function UpdateUI() {
    var count = p.missionStarted;
    var totalmission = count[0] + count[1] + count[2] + count[3] + count[4] + count[5] + count[6] + count[7] + count[8] + count[9] + count[10] + count[11] + count[12];
    $("#CashOnScreen").html("<div class='icon5'></div><strong> $" + fixing(p.cash, 2) + "</strong>");
    $("#RPOnScreen").html("<div class='icon6'></div><strong>" + fixing(p.rp, 3) + "/" + fixing(p.maxrp, 3) + "</strong>");
    $('#gameinfos').html('Version ' + VERSION + "<br>Created by Aizen_");
    $("#TimeText").html("You started the " + p.DateStarted + ". <br>And played for <strong>" + toHHMMSS(p.playTime) + "</strong>");
    $("#MissionInProgress").html("<font class='jaune'>" + totalmission + "/13</font> Missions in progress");
    $("#CurrentRank").html("Rank <strong class='rp'>" + fixing(p.rank, 3) + "</strong>");
    $("#MoneyPerCompletition").html("<strong>$" + missions[1].reward + "</strong>");
    save();
    MissionsList();
}

function MissionsList() {
    $('#MissionsBoard').html("");

    for (var i in missions) {
        var mission = missions[i];
        if (p.missionStarted[i] == 1) {
            cost = "<font class='blanc'><strong>LAUNCHED";
            reward = "Produce : <font class='vert'><strong>$" + fixing(mission.reward, 2);
            if (p.timerscount[i] < mission.timer) { p.timerscount[i] += 1; remains = mission.timer - p.timerscount[i];} else { GetReward(i); }
            time = "Remaining time : <font class='jaune'><strong>" + toHHMMSS(remains);
            if (remains==0) { GetReward(i); }
        } else {
            var canBuy = mission.cost > p.cash ? 'rouge' : 'vert';
            cost = "Cost to launch : <font class='" + canBuy + "'><strong>$" + fixing(mission.cost, 2);
            reward = "Production : <font class='gris'><strong>$" + fixing(mission.reward, 2);
            time = "Time : <font class='gris'><strong> " + toHHMMSS(mission.timer);
        }

        var canLaunch = mission.cost > p.cash ? ' disabled' : '';
        var bought = p.missionStarted[i] > 0 ? ' disabled' : '';

        var missionsDIV = $(
            "<div class='content'>" +
            "<p class='text-title'>" + mission.name + "</p><br>" +
            "<p class='text-normal'>" + cost + "</strong></font></p>" +
            "<p class='text-normal'>" + reward + "</strong></font></p>" +
            "<p class='text-normal'>" + time + "</strong></font></p><br>" +
            "<input type='button' class='button4" + canLaunch + bought + "' value='Launch the mission' onClick='LaunchMission("+ i +")'></input>" +
            "</div>"
        );
        $('#MissionsBoard').append(missionsDIV);
    }
}