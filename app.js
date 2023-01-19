window.addEventListener("load", function () {
let coords;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

navigator.geolocation.getCurrentPosition(async function (position) {
    coords = position.coords;
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    const data = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m,rain,snowfall`)).json()

    console.log(data)
    var ctx = document.getElementById('weatherChart').getContext('2d');

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: data.hourly.time.map(d => {
                return days[new Date(d).getDay()]; // Get the day of the week
              }),
            datasets: [{
                label: 'Rain',
                borderColor: 'rgb(255, 99, 132)',
                data: data.hourly.rain,
                tension: 0.1,
                pointRadius: 0
            },{
                label: 'Temperature',
                borderColor: 'rgb(99, 200, 132)',
                data: data.hourly.temperature_2m,
                tension: 0.1,
                pointRadius: 0
            }
        ]
        }
    });

});
});
