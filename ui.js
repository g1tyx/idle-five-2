function hidemenus() {
    for (var i = 1; i < 5; i++) {
        document.getElementById('tab' + i).style.display = 'none';
        $("#"+i).removeClass("active");
    }
}

function progressBar(percent, $element) {
	var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
}

function UpdateUI() {
    $("#CashOnScreen").html("<font class='cash-title'> My Cash </font><br><strong> $" + fixing(p.cash ,2) + "</strong>");
    $('#gameinfos').html('Version ' + VERSION + "<br>Created by Aizen_");
    $("#TimeText").html("You started the " + p.DateStarted + ". <br>And played for <strong>" + toHHMMSS(p.playTime) + "</strong>");
    $("#MissionInProgress").html(p.mission);
    $("#MoneyPerCompletition").html("<strong>$" + p.cashtoadd + "</strong>");
    save();
}