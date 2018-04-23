function loadAllEvents() {
    $("#menu").on("click", "button", function () {
        var id = $(this).data('id');
        hidemenus();
        document.getElementById('tab' + id).style.display = 'block';
        $("#"+id).addClass("active");
    });
    $("#overlay").on("click", "input", function () {
        document.getElementById('overlay').style.display = 'none';
        $("#tutorialtext").html("");
        p.TutorialStep++;
        document.getElementById('tab1').style.display = 'block';
        $("#1").addClass("active");
    });
}