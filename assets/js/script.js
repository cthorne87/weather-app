const app = {
    init: () => {
        document
        .getElementById('searchBtn')
        .addEventListener('click', app.getCoords);

    },
    //get city coordinates by name
    getCoords: (ev) => {
        let cityName = document.getElementById('input').value;
        let apiKey = "1bb4ca202846b97a3b9b56fdd24db801"
        let limit = "1"
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`;
        //let location = data[0].name

      fetch(url)
       .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        app.fetchWeather(data);
        let city = document.querySelector('#city');
        
        city.innerHTML = data[0].name + " (" + moment().format("M/D/YYYY") + ")";
      })
      .catch(console.err);
    },

    //get weather by coordinates
    fetchWeather: (data) => {
      console.log(data);

      let lat = data[0].lat
      let lon = data[0].lon
      let part = "current,minutely,hourly,alerts"
      let apiKey = "1bb4ca202846b97a3b9b56fdd24db801"
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;

      fetch(url)
        .then((resp) => {
         if (!resp.ok) throw new Error(resp.statusText);
         return resp.json();
       })
       .then((data) => {
         app.displayWeather(data);
       })
      .catch(console.err);
    },

    displayWeather: (data) => {
      console.log(data);
      
      

    }

}


app.init();