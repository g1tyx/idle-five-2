function hidemenus() {
    for (var i = 1; i < 5; i++) {
        document.getElementById('tab' + i).style.display = 'none';
    }
}

function progressBar(percent, $element) {
	var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
}

function UpdateUI() {
    $("#CashOnScreen").html("My Cash <br><strong> $" + fixing(p.cash ,2) + "</strong>");
    $("#TimeText").html("You started the " + p.DateStarted + ". <br>And played for <strong>" + toHHMMSS(p.playTime) + "</strong>");
}