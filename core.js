$(document).ready(function () {
    document.title = "IdleFive";
    console.log("Have fun of IdleFive!   - Aizen_");
    $("#menu").on("click", "button", function () {
        var id = $(this).data('id');
        hidemenus();
        document.getElementById('tab' + id).style.display = 'block';
    });
    progressBar(0, $('#progressBar'));
});
var p = {
    DateStarted: getDate(),
    cash: 0,
    cashtoadd: 1000,
    bonuscash: 1,
    progress: 0,
    playTime: 0
};


    function idleLoop () {
        p.playTime++;
        if(p.progress<100) {
        p.progress+=25;
        progressBar(p.progress, $('#progressBar'));
        } else {
        p.progress=0;
        progressBar(p.progress, $('#progressBar'));
        p.cash+=p.cashtoadd;
        }
	}
	setInterval(idleLoop, 1000);