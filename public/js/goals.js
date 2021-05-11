$('#add-goal').click((e) =>
{
    e.preventDefault();
    e.stopPropagation();
    const form = $('#goal-form');
    const goalName = form[0][0].value;
    const color = form[0][1].value;

    if(goalName && color)
    {
        fetch('/api/catagory//', 
        {
            method: 'POST',
            body: JSON.stringify(
                {
                   name: goalName, color: color
                }),
            headers: { 'Content-Type': 'application/json'}
        })
        .then((response) =>
        {
            if (response.ok)
            {
                document.location.replace('/goals');
            }
            else
            {
                console.log(response.message);
                document.getElementById('#goal-form').reset();
            }
        });
        
    }
});

$('#delete').click((e) =>
{
    console.log(e);
    fetch(`/api/catagory/${e.target.parentNode.dataset.id}`,
    {
        method:'DELETE',
        headers: { 'Content-Type': 'application/json'}
    })
    .then((response) =>
    {
        if(response.ok)
        {
            document.location.replace('/goals');
        }
        else
        {
            console.log(response.message);
        }
    })
})
