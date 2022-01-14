const app = {
    init: () => {
        document
        .getElementById('searchBtn')
        .addEventListener('click', app.getCoords);
        document
        .getElementById('searchBtn')
        .addEventListener('click', app.fetchWeather); 
    },
    //get city coordinates
    getCoords: (ev) => {
        let cityName = document.getElementById('input').value;
        let apiKey = "1bb4ca202846b97a3b9b56fdd24db801"
        let limit = "1"
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`;
        
      fetch(url)
       .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(console.err);    
    },
}

app.init();