var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=Philadelphia,us&APPID=b2af0c249ef1580d9d26aa8ca64187be";
var query5DayURL = "http://api.openweathermap.org/data/2.5/forecast?q=philadelphia,us&units=imperial&APPID=b2af0c249ef1580d9d26aa8ca64187be"

function dailyWeather(){

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response){

        console.log(response);

        
        var date = 1577512800 * 1000;

        var dateTimeString = moment(date).format("MM-DD-YYYY");
        
        console.log(dateTimeString);


        var lat = 0;
        var lon = 0;

        UVIndex();
        return(lat, lon);
        //uv call after longitude and lat is pulled
        //pass long and lat as var to fill in url for UV call.
    });
}


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
