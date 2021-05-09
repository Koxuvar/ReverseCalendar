const DateTime = luxon.DateTime;
const year = DateTime.now().year;
let currentMonth = DateTime.now().month;

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

const createCal = (cal) =>
{
    let calendar = document.getElementById('calendar');
    clearNodes(calendar);
    console.log(cal);
    cal.forEach(e =>
        {

            $('.calendar').append(`<a class="date text-center narrower short" data.day="${e}"><h2 class="shorter thin">${e}</h2><a>`);
            
        });
    if(cal.length > 42)
    {
        for(let i = 0; i < 49 - cal.length; i++)
        {
            $('.calendar').append(`<a class="date text-center narrower short" data.day=""><h2 class="shorter thin"></h2><a>`);
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
    console.log(cal);

    
    createCal(cal);
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


setMonth(DateTime.now());
populateCal(DateTime.now());
