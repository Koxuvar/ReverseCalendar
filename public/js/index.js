$('#dark-mode-switch').click((e) =>
{
    $('html, body').toggleClass('bg-dark text-lite');
    $('button').toggleClass('btn-dark');
    $('input').toggleClass('text-lite');
    $('#dark-mode-switch').toggleClass('active');
    let cookVal = eval($('#dark-mode-switch').hasClass('active'));
    
    localStorage.setItem('night', cookVal);
});

if(localStorage.night === "true")
{
    $('#dark-mode-switch').addClass('active').prop('checked', true);
    $('html, body').toggleClass('bg-dark text-lite');
    $('button').toggleClass('btn-dark');
    $('input').toggleClass('text-lite');
}
