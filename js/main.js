const container = document.querySelector('.container');
const search = document.querySelector('#btnSearch');
const weatherBox = document.querySelector('.weather__box');
const weatherDetails = document.querySelector('.weather__details');
const error404 = document.querySelector('.error');

function performSearch() {
    const APIKey = '1e4f76c098df4e0e223ddef918101345'
    const city = document.querySelector('#searchInput').value;
    
    if (city == '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
    

    if(json.cod == '404'){
        container.style.height = '400px'
        container.classList.add('container--error');
        error404.classList.add('active');
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        return;
    }   
        container.style.height = '500px'
        container.classList.remove('container--error');
        error404.classList.remove('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');

    const image = document.querySelector('.weather__box img');
    const temperature = document.querySelector('.temperature');
    const information = document.querySelector('.information');
    const humidity = document.querySelector('.humidity__span');
    const wind = document.querySelector('.wind__span');


    
    switch (json.weather[0].main) {
        case 'Clear':
            image.src = 'assets/sun.png'
            break;
            
            case 'Clouds':
                image.src = 'assets/cloudy.png' 
                break;
                
                case 'Rain':
                    image.src = 'assets/rain.png'
                    break;
                    
                    case 'Snow':
                        image.src = 'assets/snow.png'
                        break;
                        
                        case 'Mist':
                            image.src = 'assets/mist.png'
                            break;
                            
                            case 'Storm':
                                image.src = 'assets/storm.png'
                                break;
                                
                                default:
                                    
            image.src = 'assets/inicio.png'
        }

    
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    information.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`
    
    
    
    })
    
}

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

search.addEventListener('click', performSearch);