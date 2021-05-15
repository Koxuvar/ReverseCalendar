const DateTime = luxon.DateTime;
const year = DateTime.now().year;
const month = DateTime.now().month;
const currMonth = DateTime.local(year, month);

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
    console.log(arrDaCheck);
    return arrDaCheck;
}

const makeChart = async () =>
{

    const data = await getDailyChecks();
    const chartData = [];
    for(let i = 1; i < currMonth.daysInMonth; i++)
    {
        chartData[i] = data.filter((e) => e.day == i);
    }
    console.log(chartData);


    const prettyData = chartData.map((e, i) =>
    {
        let obj = {};
        obj.day = i;
        obj.entry = 0;
        if(e.length > 0)
        {
            e.forEach((t) =>
            {
                obj.entry += 1;
            });
        }
        return obj;
    });

    const labels = prettyData.map((e) => {return e.day});
    const dataB = prettyData.map((e) => {return e.entry});
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Completions Per Day',
            data: dataB,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}


makeChart();
