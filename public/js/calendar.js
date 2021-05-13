const DateTime = luxon.DateTime;
const year = DateTime.now().year;
let currentMonth = DateTime.now().month;
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

const getDailyChecks = async () =>
{
    const arrDailyCheck = await fetch('/api/dailyCheck/getChecks',
    {
        method:'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8', }
    }).then((response) =>
    {
        if(response.ok)
        {
            return response.json();
        }
        else{
            console.log(response.json());
        }
    });
    console.log(arrDailyCheck);
    arrDaCheck = arrDailyCheck.dailyChecks.map((e) =>
    {
        let obj = {};
        for(let i = 0; i < arrDailyCheck.catagories.length; i++)
        {
            if(e.catagory_id == arrDailyCheck.catagories[i].id)
            {
                obj = {
                    month: DateTime.fromISO(e.day).month,
                    day: DateTime.fromISO(e.day).day,
                    cat_id:e.catagory_id,
                    color: arrDailyCheck.catagories[i].color
                }
            }
        }
         return obj; 
    });

    return arrDaCheck;
}

const renderCal = async (cal) =>
{
    let calendar = document.getElementById('calendar');
    clearNodes(calendar);

    const attDC = await getDailyChecks();


    console.log(attDC)
    cal.forEach((e) =>
        {
            
            let a = Number.isInteger(e) ? "clk": "";

            const getMonth = attDC.filter((r) => r.month == currentMonth);
            const getDay = getMonth.filter((t) => t.day == e);
            const colors = getDay.map((e) => e.color);

            let grad = "linear-gradient(0deg";
            for(let i in colors)
            {
                grad += ', ' + colors[i];
            }
            grad += ', transparent)';


            $('.calendar').append(`<a style="background: ${colors.length > 0 ? grad : null}" class="date container row narrower short" id="${a}" data-day="${e}"><h2    class="daynum shorter thin">${e}</h2><a>`);
            
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

const pushCat = (uDay, catagory_id) =>
{
   
    $('#cat-select').css('display','none');

    fetch('/api/dailyCheck/create',
    {
        method: 'POST',
        body:JSON.stringify({
            catagory_id, day: DateTime.local(year, currentMonth, parseInt(uDay)).toISO()
        }),
        headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
    .then((response) =>
    {
        if (response.ok)
        {
            console.log(response);
            populateCal(DateTime.local(year, currentMonth));
        }
        else
        {
            console.log("shits broke pushing cat");
        }
    });
}

$('body').on('click', '#clk', (e) =>
{
    let t = e.target;
    if(t.nodeName =='H2')
    {
        curDay = t.parentNode.dataset.day;
        eval(localStorage.getItem('night')) ? $(t.parentNode).css('box-shadow', '0 10px 1px rgba(255,255,255,.6)'):$(t.parentNode).css('box-shadow', '0 10px 1px rgba(0,255,0,.6)');
    }
    else if(t.nodeName == 'A')
    {
        curDay = t.dataset.day;
        eval(localStorage.getItem('night')) ? $(t).css('box-shadow', '0 10px 1px rgba(255,255,255,.6)'):$(t).css('box-shadow', '0 10px 1px rgba(0,255,0,.6)');
    }

    $('#cat-select').css('display',' block');

});

$('li').click( async (e)=>
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

    pushCat(curDay, curCat)
});

setMonth(DateTime.now());
populateCal(DateTime.now());
