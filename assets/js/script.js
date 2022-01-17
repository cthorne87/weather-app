var searchColumn = $("#search");

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
        console.log(data)
        

        let city = document.querySelector('#city');
        
        city.innerHTML = data[0].name + " (" + moment().format("M/D/YYYY") + ")";

        if(localStorage.getItem(data[0].name) === null) {
          localStorage.setItem(data[0].name, JSON.stringify(data))
        }
        app.fetchWeather(data);
      })
      .catch(console.err);
    },

    //get weather by coordinates
    fetchWeather: (data) => {
      console.log(data);

      let lat = data[0].lat
      let lon = data[0].lon
      let units = "imperial"
      let lang = "eng"
      let part = "current,minutely,hourly,alerts"
      let apiKey = "1bb4ca202846b97a3b9b56fdd24db801"
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}&units=${units}&lang=${lang}`;

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
      
      console.log(data)
      $(".card-text").remove();
      var today = `<p class="currentTemp card-text">Temp: ${data.daily[0].temp.day} °F</p>` +
      `<p class="currentWind card-text">Wind: ${data.daily[0].wind_speed} MPH</p>` +
      `<p class="currentHumidity card-text">Humidity: ${data.daily[0].humidity}%</p>` + 
      `<p class="currentUV card-text">UV Index: ${data.daily[0].uvi}</p>`

      var day1 = `<p id="date1" class="date mb-1 card-text"></p>` +
      `<img class="card-text icon" src="http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png"></img>` +
      `<p class="card-text">Temp: ${data.daily[1].temp.day} °F</p>` +
      `<p class="card-text">Wind: ${data.daily[1].wind_speed} MPH</p>` +
      `<p class="card-text">Humidity: ${data.daily[1].humidity}%</p>` + 
      `<p class="card-text">UV Index: ${data.daily[1].uvi}</p>`
       
      var day2 = `<p id="date2" class="date mb-1 card-text"></p>` +
      `<img class="card-text icon" src="http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png"></img>` +
      `<p class="card-text">Temp: ${data.daily[2].temp.day} °F</p>` +
      `<p class="card-text">Wind: ${data.daily[2].wind_speed} MPH</p>` +
      `<p class="card-text">Humidity: ${data.daily[2].humidity}%</p>` + 
      `<p class="card-text">UV Index: ${data.daily[2].uvi}</p>`
       
      var day3 = `<p id="date3" class="date mb-1 card-text"></p>` +
      `<img class="card-text icon" src="http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}.png"></img>` +
      `<p class="card-text">Temp: ${data.daily[3].temp.day} °F</p>` +
      `<p class="card-text">Wind: ${data.daily[3].wind_speed} MPH</p>` +
      `<p class="card-text">Humidity: ${data.daily[3].humidity}%</p>` + 
      `<p class="card-text">UV Index: ${data.daily[3].uvi}</p>`
       
      var day4 = `<p id="date4" class="date mb-1 card-text"></p>` +
      `<img class="card-text icon" src="http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}.png"></img>` +
      `<p class="card-text">Temp: ${data.daily[4].temp.day} °F</p>` +
      `<p class="card-text">Wind: ${data.daily[4].wind_speed} MPH</p>` +
      `<p class="card-text">Humidity: ${data.daily[4].humidity}%</p>` + 
      `<p class="card-text">UV Index: ${data.daily[4].uvi}</p>`
       
      var day5 = `<p id="date5" class="date mb-1 card-text"></p>` +
      `<img class="card-text icon" src="http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}.png"></img>` +
      `<p class="card-text">Temp: ${data.daily[5].temp.day} °F</p>` +
      `<p class="card-text">Wind: ${data.daily[5].wind_speed} MPH</p>` +
      `<p class="card-text">Humidity: ${data.daily[5].humidity}%</p>` + 
      `<p class="card-text">UV Index: ${data.daily[5].uvi}</p>`

      $("#city").append( `<img src="http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}.png"></img>`)
      $("#today").append(today)
      $(".day1").append(day1)
      $(".day2").append(day2)
      $(".day3").append(day3)
      $(".day4").append(day4)
      $(".day5").append(day5)
      
      document.getElementById("date1").innerHTML = moment().add(1,'d').format("M/D/YYYY");
      document.getElementById("date2").innerHTML = moment().add(2,'d').format("M/D/YYYY");
      document.getElementById("date3").innerHTML = moment().add(3,'d').format("M/D/YYYY");
      document.getElementById("date4").innerHTML = moment().add(4,'d').format("M/D/YYYY");
      document.getElementById("date5").innerHTML = moment().add(5,'d').format("M/D/YYYY");
},

}

app.init();


  
  for(var i = 0; i<localStorage.length; i++){
  var data = JSON.parse(localStorage[Object.keys(localStorage)[i]]);
  console.log(data)
  var newLocationButton = $("<button>")
  .addClass("btn pastSearch mt-3 w-100")
  .attr("id", data[0].name)
  .text(data[0].name)
searchColumn.append(newLocationButton);
  }
$('.pastSearch').click(function(){
 document.getElementById("input").value = event.target.id

 app.getCoords()
console.log(event.target.id)})
