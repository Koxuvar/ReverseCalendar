const DateTime = luxon.DateTime;
const Duration = luxon.Duration;
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

const makeChartMonth = async () =>
{
    const data = await getDailyChecks();
    const chartData = [];
    for(let i = 1; i < currMonth.daysInMonth; i++)
    {
        chartData[i] = data.filter((e) => e.day == i);
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
        chartData[i] = data.filter((e) => e.day == i);
    }
    console.log(chartData);

    const prettyData = chartData.map((e, i) =>
    {
        let obj = {};
        let start = DateTime.local(year, 1, 1);
        let now = DateTime.local(year, e.month, e.day);
        console.log(Duration.fromObject());
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

setMonthDisplay(DateTime.now())
makeChartMonth();
