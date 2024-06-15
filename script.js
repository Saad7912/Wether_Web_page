const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'e665e4e95bmshe09ee884ada5136p11c8e8jsn213d91e1d361',
        'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};


//funtion to convert unix to time
const convertUnixToTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 12-hour clock with AM/PM
        timeZoneName: 'short' // Include time zone abbreviation
    };
    const localTime = date.toLocaleTimeString('en-US', options);
    return localTime;
}





const getweather = (city) => {

    // Show loading state
    temp.innerHTML = "Loading...";
    temp2.innerHTML = "Loading...";
    humidity.innerHTML = "Loading...";
    humidity2.innerHTML = "Loading...";
    wind_speed.innerHTML = "Loading...";
    wind_speed2.innerHTML = "Loading...";


    cityname.innerHTML = city
    fetch(url + city, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            // cloud_pct.innerHTML = response.cloud_pct
            feels_like.innerHTML = response.feels_like
            humidity.innerHTML = response.humidity
            humidity2.innerHTML = response.humidity
            max_temp.innerHTML = response.max_temp
            min_temp.innerHTML = response.min_temp
            sunrise.innerHTML = convertUnixToTime(response.sunrise)
            sunset.innerHTML = convertUnixToTime(response.sunset)
            temp.innerHTML = response.temp
            temp2.innerHTML = response.temp
            wind_degrees.innerHTML = response.wind_degrees
            wind_speed.innerHTML = response.wind_speed
            wind_speed2.innerHTML = response.wind_speed

        })
        .catch(err => console.error(err))
}



submit.addEventListener("click", (e) => {

    e.preventDefault()
    getweather(city.value)
})

getweather("Lahore")



//logic for table values
const populateTable = (cities) => {
    const tableBody = document.querySelector('table tbody');

    cities.forEach(city => {
        fetch(url + city, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(response => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row" class="text-start">${city}</th>
                    <td>${response.cloud_pct}</td>
                    <td>${response.feels_like}</td>
                    <td>${response.humidity}</td>
                    <td>${response.max_temp}</td>
                    <td>${response.min_temp}</td>
                    <td>${convertUnixToTime(response.sunrise)}</td>
                    <td>${convertUnixToTime(response.sunset)}</td>
                    <td>${response.temp}</td>
                    <td>${response.wind_degrees}</td>
                    <td>${response.wind_speed}</td>
                `;
                tableBody.appendChild(row);
            })
            .catch(err => {
                console.error(err);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row" class="text-start">${city}</th>
                    <td colspan="10">Error fetching data</td>
                `;
                tableBody.appendChild(row);
            });
    });
}

populateTable(["Murree", "Karachi", "Islamabad"]);
