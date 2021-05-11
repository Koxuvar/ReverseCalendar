const DateTime = luxon.DateTime;
const year = DateTime.now().year;
let currentMonth = DateTime.now().month;
let userCat = [];
let curDay = 0;
let curCat = 0;

const setMonth = (dt) =>
{
    $('#month-display').text(dt.monthLong).addClass('thinner');
}

const cleanCal = [
    "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun",
    "","","","","","","",
    "","","","","","","",
    "","","","","","","",
    "","","","","","","",
    "","","","","","",""
];


const clearNodes = (parent) =>
{
    while(parent.firstChild)
    {
        parent.removeChild(parent.firstChild);
    }
}

const renderCal = async (cal) =>
{
    let calendar = document.getElementById('calendar');
    clearNodes(calendar);

    const arrDailyCheck = await fetch('/api/dailyCheck/',
    {
        method:'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8', }
    }).then((response) =>
    {
        if(response.ok)
        {
            return response.json();
        }
    });

    arrDaCheck = arrDailyCheck.map((e) =>
    {
        return {
            day: DateTime.fromISO(e.day).day,
            cat_id:e.catagory_id
        }
    });
    console.log(arrDaCheck);
    
    cal.forEach(e =>
        {

            $('.calendar').append(`<a class="date container row narrower short" id="date" data-day="${e}"><h2 class="daynum shorter thin">${e}</h2><a>`);
            
        });
    if(cal.length > 42)
    {
        for(let i = 0; i < 49 - cal.length; i++)
        {
            $('.calendar').append(`<a class="date text-center narrower short" data-day=""><h2 class="shorter thin"></h2><a>`);
        }
    }
    

    
}

const populateCal = (dt) =>
{
    const firstDay = DateTime.local(dt.year, dt.month, 1).weekday + 6;
    const monthLength = DateTime.local(dt.year, dt.month).daysInMonth;
    
    let cal = Array.from(cleanCal);

    for( let i = 0; i < monthLength; i++)
    {
        cal[firstDay + i] = i + 1;
    }
    
    renderCal(cal);
}

const plusMonth = () =>
{
    currentMonth += 1;
    const dt = DateTime.local(year, currentMonth);
    setMonth(dt);
    populateCal(dt);
}

const minusMonth = () =>
{
    currentMonth -= 1;
    const dt = DateTime.local(year, currentMonth);
    setMonth(dt);
    populateCal(dt);
}

const pushCat = (day, cat) =>
{
   
    $('#cat-select').css('display','none');

    fetch('/api/dailyCheck/',
    {
        method: 'POST',
        body:JSON.stringify({
            'catagory_id':cat,
            'day':day
        }),
        headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
    .then((response) =>
    {
        if (response.ok)
        {
            console.log(response);
            return response.json();
        }
        else
        {
            console.log("shits broke pushing cat");
        }
    })
    .then((data) =>
    {
        console.log(data);
    });

}

$('body').on('click', '#date', (e) =>
{
    let t = e.target;
    let day = 0;
    if(t.nodeName =='H2')
    {
        
        userDay = t.parentNode.dataset.day;
    }
    else if(t.nodeName == 'A')
    {
        userDay = t.dataset.day;
    }

    $('#cat-select').css('display',' block');

});

$('li').click( (e)=>
{
    let t = e.target;
    if(t.nodeName == "LI")
    {
        curCat = t.dataset.id;
    }
    else if(t.nodeName == "H2" || t.nodeName == "DIV")
    {
        curCat = t.parentNode.dataset.id;
    }

    pushCat(userDay, curCat);
    populateCal(DateTime.now());

});

const getCategory = () =>
{
    fetch('/api/catagory/',
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8', }
    })
    .then((response) =>
    {
        if (response.ok)
        {
            return response.json();
        }
        else
        {
            console.log("shits broke getting cats")
        }
    })
    .then((data) =>
    {
        userCat = Array.from(data);
    });

}

setMonth(DateTime.now());
populateCal(DateTime.now());
getCategory();
