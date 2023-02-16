const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '80e989100dd22f069b76a96ea92725b3';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const countryName = document.querySelector('.weather-box .countryName')
            const wind = document.querySelector('.weather-details .wind span');
            console.log(json.sys.country)
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            const descricaoTempo = json.weather[0].description;
            switch (descricaoTempo) {
                case "clear sky":
                    description.innerHTML = "céu limpo";
                    break;
                case "few clouds":
                    description.innerHTML = "poucas nuvens";
                    break;
                case "scattered clouds":
                    description.innerHTML = "nuvens dispersas";
                    break;
                case "broken clouds":
                    description.innerHTML = "nuvens quebradas";
                    break;
                case "overcast clouds":
                    description.innerHTML = "nuvens nubladas";
                    break;
                case "light rain":
                    description.innerHTML = "chuva leve";
                    break;
                case "moderate rain":
                    description.innerHTML = "chuva moderada";
                    break;
                case "heavy intensity rain":
                    description.innerHTML = "chuva intensa";
                    break;
                case "thunderstorm":
                    description.innerHTML = "tempestade";
                    break;
                case "mist":
                    description.innerHTML = "névoa";
                    break;
                case "smoke":
                    description.innerHTML = "fumaça";
                    break;
                case "haze":
                    description.innerHTML = "neblina seca";
                    break;
                case "dust":
                    description.innerHTML = "poeira";
                    break;
                case "fog":
                    description.innerHTML = "névoa";
                    break;
                case "sand":
                    description.innerHTML = "areia";
                    break;
                case "ash":
                    description.innerHTML = "cinzas";
                    break;
                case "squall":
                    description.innerHTML = "rajadas de vento";
                    break;
                case "tornado":
                    description.innerHTML = "tornado";
                    break;
                default:
                    description.innerHTML = descricaoTempo;
                    break;
            }

            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            countryName.innerHTML = json.name + '-' + json.sys.country;
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});