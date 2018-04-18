function loadAllEvents() {
    $("#menu").on("click", "button", function () {
        var id = $(this).data('id');
        hidemenus();
        document.getElementById('tab' + id).style.display = 'block';
    });
}