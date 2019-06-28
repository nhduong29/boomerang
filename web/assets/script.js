//Add funny script here
$(function() {
    $("#sidebar, #content").mCustomScrollbar({
        theme: "minimal",
        scrollInertia: 200
    });
    
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    $('#gitgub-link, #payme-link').tooltip();
});