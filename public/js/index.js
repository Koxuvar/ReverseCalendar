
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

$('#register-button').click(async (e) =>
{
    e.preventDefault();
    const form = $('#register-form');
    console.log(form);
    const username = form[0][0].value;
    const password = form[0][1].value;
    const email = form[0][2].value;

    console.log(username, password, email);
    if(username && password)
    {
        const response = await fetch('/api/users/', 
        {
            method: 'POST',
            body: JSON.stringify(
                {
                   username: username, password: password, email: email 
                }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok)
        {
            document.location.replace('/calendar');
        }
        else
        {
            console.log(response);
            document.getElementById('register-form').reset();
        }
    }
    
});