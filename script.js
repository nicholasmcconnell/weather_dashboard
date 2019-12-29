

var query5DayURL = "http://api.openweathermap.org/data/2.5/forecast?q=philadelphia,us&units=imperial&APPID=b2af0c249ef1580d9d26aa8ca64187be"

function dailyWeather(input) {
    
    // $("#dailyDiv").empty();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + ",us&APPID=b2af0c249ef1580d9d26aa8ca64187be";
    
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response){


        //console.log(response);

        //Heading
        var dailyDiv = $("#dailyDiv");

        var city = response.name;
        var date = response.dt * 1000;
        var dateTimeString = moment(date).format("MM-DD-YYYY");
        var iconCode = JSON.stringify(response.weather[0].icon);
        iconCode = iconCode.replace("\"","");
        iconCode = iconCode.replace("\"","");
        //console.log(iconCode);
        var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        //console.log(icon);
        var icon = $("<img>").attr("src", iconURL)
        var dailyHeading = $("#cityDateIcon").text(city + " (" + dateTimeString + ") ");
        dailyDiv.append(dailyHeading);
        $("#icon").append(icon);

        //Other parts
        var temperature = ((response.main.temp - 273.15) * 9/5 + 32).toFixed(0);
       $("#dailyTemp").text("Temperature: " + temperature);
       
       var humidity = response.main.humidity;
       $("#dailyHumidity").text("Humidity: " + humidity + "%");
       //console.log(humidity);




        

    

        


        var lat = 0;
        var lon = 0;

        //UVIndex();
        //return(lat, lon);
        //uv call after longitude and lat is pulled
        //pass long and lat as var to fill in url for UV call.
    });
 };


function fiveDayForecast() {
    $.ajax({
        url: query5DayURL,
        method: "GET"

    }).then(function(response){

        //for (var i = 8, i+=8

        //for loop pulls what is needed and appends all in one swoop.

        console.log(response);
    });
}


function UVIndex(){

    var queryUVIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=b2af0c249ef1580d9d26aa8ca64187be&lat=" + lat + "&lon=" + lon;

    $.ajax({

        url
    })
}

//On Click

$("#searchButton").on("click", function(event){
    event.preventDefault();

    var input = $("#input").val().trim();
    dailyWeather(input);


});
