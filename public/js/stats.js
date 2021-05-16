const DateTime = luxon.DateTime;
const year = DateTime.now().year;
const month = DateTime.now().month;
const currMonth = DateTime.local(year, month);
let myChart;

const setMonthDisplay = (dt) =>
{
    $('#month-display').text(dt.monthLong);
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

const getDailyChecksForAll = async () =>
{
    const arrDailyCheck = await fetch('/api/dailyCheck/getChecksForUsers',
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

    arrUserData = arrDailyCheck.map((e) =>
    {
        let obj = {};
        obj.user = e.username;
        obj.count = e.dailyChecks.length;
        return obj;
    });

    return arrUserData;
}

const makeChartAll = async () =>
{
    const data = await getDailyChecksForAll();
    const labels = data.map((e) => e.user);
    const dataB = data.map((e) => e.count);
    const colors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];

    makeChart(labels, dataB, colors, 'You and your 35 closest friends!');
}


const makeChartMonth = async () =>
{
    const data = await getDailyChecks();
    const chartData = [];
    for(let i = 1; i < currMonth.daysInMonth; i++)
    {
        chartData[i] = data.filter((e) => 
        {
            return e.month == currMonth.month && e.day == i;
            
        });
    }

    const prettyData = chartData.map((e, i) =>
    {
        let obj = {};
        obj.day = i;
        obj.entry = 0;
        obj.colors = [];
        if(e.length > 0)
        {
            e.forEach((t) =>
            {
                obj.entry += 1;
                obj.colors.push(t.color);
            });
        }
        return obj;
    });

    const labels = prettyData.map((e) => {return e.day});
    const dataB = prettyData.map((e) => {return e.entry});
    const colors = prettyData.map((e) => 
    {
        let ctx = document.getElementById('myChart').getContext('2d');
        let cvg = ctx.createLinearGradient(0,0,50,50);

        let gradientStep = 1/e.colors.length;

        for(let i = 0; i < e.colors.length; i++)
        {
            cvg.addColorStop(i*gradientStep, e.colors[i]);
        }

        return cvg;
    });
    
    makeChart(labels, dataB, colors, 'Completions Per Day');
}

const makeChartYear = async () =>
{
    const data = await getDailyChecks();
    const chartData = [];
    for(let i = 1; i < currMonth.daysInYear; i++)
    {
        chartData[i] = data.filter((e) => DateTime.local(year, e.month, e.day).ordinal == i);
    }

    const prettyData = chartData.map((e, i) =>
    {
        let obj = {};
        obj.day = i;
        obj.entry = 0;
        obj.colors = [];
        if(e.length > 0)
        {
            e.forEach((t) =>
            {
                obj.entry += 1;
                obj.colors.push(t.color);
            });
        }
        return obj;
    });

    const labels = prettyData.map((e) => {return e.day});
    const dataB = prettyData.map((e) => {return e.entry});
    const colors = prettyData.map((e) => 
    {
        let ctx = document.getElementById('myChart').getContext('2d');
        let cvg = ctx.createLinearGradient(0,0,50,50);

        let gradientStep = 1/e.colors.length;

        for(let i = 0; i < e.colors.length; i++)
        {
            cvg.addColorStop(i*gradientStep, e.colors[i]);
        }

        return cvg;
    });
    
    makeChart(labels, dataB, colors, 'Completions Per Day');
}

const makeChart = (labels, dataB, colors, uniqueLabel) =>
{
    let ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, 
        {
            type: 'bar',
            data: 
            {
                labels: labels,
                datasets: 
                [{
                    label: uniqueLabel,
                    data: dataB,
                    backgroundColor: colors
                }]
            },
            options: 
            {
                scales: 
                {
                    y: 
                    {
                        beginAtZero: true
                    }
                }
            }
        });
}

$('#month').click((e) =>
{
    e.preventDefault();
    e.stopPropagation();
    if(myChart)
    {
        myChart.destroy();
    }
    makeChartMonth();
});

$('#year').click((e) =>
{
    e.preventDefault();
    e.stopPropagation();
    if(myChart)
    {
        myChart.destroy();
    }
    makeChartYear();
});

$('#compare').click((e) =>
{
    e.preventDefault();
    e.stopPropagation();
    if(myChart)
    {
        myChart.destroy();
    }
    makeChartAll();
})

setMonthDisplay(DateTime.now())
makeChartMonth();
getDailyChecksForAll();
