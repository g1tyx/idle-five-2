function hidemenus() {
    for (var i = 1; i < 5; i++) {
        document.getElementById('tab' + i).style.display = 'none';
        $("#"+i).removeClass("active");
    }
}

function progressBar(percent, $element) {
    progressBarWidth = percent * $element.width() / 100;
    console.log(fixing(progressBarWidth, 3));
    p.progress = fixing(progressBarWidth, 3);
    $element.find('div').animate({ width: progressBarWidth }, 500).html(fixing(percent, 2) + "%&nbsp;");
}

//Calculer 10% de 15 €
// 15 x (10/100)= 1.5

function UpdateUI() {
    $("#CashOnScreen").html("<font class='cash-title'> My Cash </font><br><strong> $" + fixing(p.cash ,2) + "</strong>");
    $('#gameinfos').html('Version ' + VERSION + "<br>Created by Aizen_");
    $("#TimeText").html("You started the " + p.DateStarted + ". <br>And played for <strong>" + toHHMMSS(p.playTime) + "</strong>");
    $("#MissionInProgress").html(p.mission);
    $("#MoneyPerCompletition").html("<strong>$" + p.cashtoadd + "</strong>");
    save();
}