$(document).ready(function () {
    document.title = "IdleFive";
    console.log("Have fun of IdleFive!   - Aizen_");
    progressBar(0, $('#progressBar'));
    loadAllEvents();
    UpdateUI();
});
var p = {
    DateStarted: getDate(),
    cash: 0,
    cashtoadd: 1,
    progress: 0,
    playTime: 0
};

function idleLoop() {
    if (p.progress < 100) {
        p.progress += 25; progressBar(p.progress, $('#progressBar'));
    } else { p.progress = 0; progressBar(p.progress, $('#progressBar')); p.cash += p.cashtoadd; }
    p.playTime++;
    UpdateUI();
}
setInterval(idleLoop, 1000);