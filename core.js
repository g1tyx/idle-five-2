var VERSION = 0.1;

$(document).ready(function () {
    document.title = "IdleFive";
    console.log("Have fun of IdleFive!   - Aizen_");
    progressBar(0, $('#progressBar'));
    loadAllEvents();
    if (localStorage.getItem("IdleFive") != null) { load(); }
    UpdateUI();
});
    var p = {
        DateStarted: getDate(),
        cash: 0,
        progressSpeed: 10,
        cashtoadd: 0,
        mission: "None",
        progress: 0,
        playTime: 0
    };

function idleLoop() {
    if (p.progress < 100) {
        p.progress += p.progressSpeed; progressBar(p.progress, $('#progressBar'));
    } else { p.progress = 0; progressBar(p.progress, $('#progressBar')); p.cash += p.cashtoadd; }
    p.playTime++;
    UpdateUI();
}
setInterval(idleLoop, 1000);