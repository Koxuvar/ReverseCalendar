
$('#login-form-button').click(e =>
    {
        e.preventDefault();
        $('.signup').css('opacity', '0');
        $('.login').css('opacity', '1');
        console.log('ello')
    });
    
$('#signup-form-button').click(e =>
    {
        e.preventDefault();
        $('.signup').css('opacity', '1');
        $('.login').css('opacity', '0');
    });    

$('#dark-mode-switch').click((e) =>
    {
        $('html, body').toggleClass('bg-dark text-lite');
    });