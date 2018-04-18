function hidemenus() {
    for (var i = 1; i < 5; i++) {
        document.getElementById('tab' + i).style.display = 'none';
    }
}

function progressBar(percent, $element) {
	var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
    console.log(progressBarWidth);
}


function updateUI() {
    
}