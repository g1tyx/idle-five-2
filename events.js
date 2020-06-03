function loadAllEvents() {
    $("#menu").on("click", "button", function () {
        var id = $(this).data('id');
        hidemenus();
        $("#tab" + id).show();
        $("#" + id).addClass("active");
    });
    $("#alert").on("click", "input", function () {
        $("#alert").hide();
        p.TutorialStep++;
        $("#tab1").show();
        $("#1").addClass("active");
        showbuttons();
    });
    $("#welcome").on("click", "#btnCloseWelcome", function () {
        $("#welcome").hide();
        p.completed++;
        p.name = $("#playername").val();
        $("#tab1").show();
        $("#1").addClass("active");
        showbuttons();
    });
    $("#saveedit").on("click", "#btnReset", function() { confirmReset(); });
    $("#saveedit").on("click", "#btnImport", function() { importSave(); });
    $("#saveedit").on("click", "#btnExport", function() { exportSave(); });
//$('#btnCloseWelcome').trigger('click');
}
