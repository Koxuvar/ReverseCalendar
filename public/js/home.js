
$('#login-form-button').click(e =>
{
    e.preventDefault();
    $('.signup').css('opacity', '0').css('transform','translateX(150%)');
    $('.login').css('opacity', '1').css('transform','translateX(-150%)');
});
    
$('#signup-form-button').click(e =>
{
    e.preventDefault();
    $('.login').css('opacity', '0').css('transform','translateX(150%)');
    $('.signup').css('opacity', '1').css('transform','translateX(-150%)');
});    




$('#register-button').click(async (e) =>
{
    e.preventDefault();
    e.stopPropagation();
    const form = $('#register-form');
    const username = form[0][0].value;
    const password = form[0][1].value;
    const email = form[0][2].value;

    if(username && password)
    {
        const response = await fetch('/api/users/register', 
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
            document.getElementById('register-form').reset();
        }
    }
    
});

$('#login-button').click(async (e) =>
{
    e.preventDefault();
    e.stopPropagation();
    const form = $('#login-form');
    const username = form[0][0].value;
    const password = form[0][1].value;

    if(username && password)
    {
        const response = await fetch('/api/users/login', 
        {
            method: 'POST',
            body: JSON.stringify(
                {
                   username: username, password: password
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