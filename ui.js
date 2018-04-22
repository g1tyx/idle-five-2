function hidemenus() {
    for (var i = 1; i < 5; i++) {
        document.getElementById('tab' + i).style.display = 'none';
        $("#" + i).removeClass("active");
    }
}
function progressBar(percent, time, $element) {
    progressBarWidth = percent * $element.width() / 100;
    p.progress = fixing(progressBarWidth, 3);
    $element.find('div').animate({ width: progressBarWidth }, 500).html(time + " sec");
}

function UpdateUI() {
    var count = p.missionStarted;
    var totalmission = count[0] + count[1] + count[2] + count[3] + count[4] + count[5] + count[6] + count[7] + count[8] + count[9] + count[10] + count[11] + count[12];
    $("#CashOnScreen").html("<font class='cash-title'> My Cash </font><br><strong> $" + fixing(p.cash, 2) + "</strong>");
    $('#gameinfos').html('Version ' + VERSION + "<br>Created by Aizen_");
    $("#TimeText").html("You started the " + p.DateStarted + ". <br>And played for <strong>" + toHHMMSS(p.playTime) + "</strong>");
    $("#MissionInProgress").html(totalmission);
    $("#MoneyPerCompletition").html("<strong>$" + missions[1].reward + "</strong>");
    save();
    MissionsBoard();
}

function MissionsBoard() {
    $('#missionsList').html("");

    for (var i in missions) {
        var mission = missions[i];
        if (p.missionStarted[i] == 1) {
        cost = "<font class='blanc'><strong>LAUNCHED";
        reward = "<font class='vert'><strong>$" + fixing(mission.reward, 2);
        time = toHHMMSS(mission.timer);
        } else {
        cost = "Cost to launch : <font class='vert'><strong>$" + fixing(mission.cost, 2);
        reward = "<font class='gris'><strong>$" + fixing(mission.reward, 2);
        time = toHHMMSS(mission.timer);
        }

        var missionsDIV = $(
            "<div class='content'>" +
            "<p class='text-title'>" + mission.name + "</p>" +
            "<p class='text-normal'>" + cost + "</strong></font></p>" +
            "<p class='text-normal'>Production : " + reward + "</strong></font></p>" +
            "<p class='text-normal'>Time : <font class='jaune'><strong>"+ time + "</strong></font></p><br>" +
            "<div class='bar' id='progressBar" + i + "'><div></div></div>" +
            "</div>"
        );
        $('#missionsList').append(missionsDIV);
    }
}