const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const input = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const check = document.getElementById('check');

//primeira letra do input vazia
input.addEventListener('input', () => {
  input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
});

//mudar tema
check.addEventListener('change', () => {
    document.body.classList.toggle('light')
});

//pesquisar cidade
search.addEventListener('click', () => {
    const APIKey = '8ffa80474fdf5c0f0d4dee28f81390de'
    const city = document.querySelector('.search-box input').value;
    input.value = "";

    if(city === '')
        return

    /*link para requisição da API*/
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '500px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const name = document.querySelector('.name');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');


            /*MOSTRA A FOTO DO CLIMA DE ACORDO COM O RETORNO DO JSON*/
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
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            name.innerHTML = `${json.name}`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '550px';

        }
    )
})