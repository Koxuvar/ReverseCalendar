
$('#login-form-button').click(e =>
    {
        e.preventDefault();
        $('.signup').css('opacity', '0');
        $('.login').css('opacity', '1');
    });
    
$('#signup-form-button').click(e =>
    {
        e.preventDefault();
        $('.login').css('opacity', '0');
        $('.signup').css('opacity', '1');
    });    

$('#dark-mode-switch').click((e) =>
    {
        $('html, body').toggleClass('bg-dark text-lite');
        $('button').toggleClass('btn-dark');
    });