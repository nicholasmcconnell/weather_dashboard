$(document).ready(function() {

    var arrCity = JSON.parse(localStorage.getItem("arrCity")) || [];
    arrCity.forEach(addButton);

    //On Click's

    $("#searchButton").on("click", function(event){
        event.preventDefault();

        var cityString = $("#input").val().trim();
        var city = cityString.charAt(0).toUpperCase() + cityString.slice(1);
     
        console.log(city);

        dailyWeather(city);
        fiveDayForecast(city);
        addButton(city);
        arrCity.push(city),

        localStorage.setItem("arrCity", JSON.stringify(arrCity));
    });

    $(document).on("click", ".cityButton", function(){
        console.log($(this));
        var city = $(this).text();
        dailyWeather(city);
        fiveDayForecast(city);

    });

    function dailyWeather(input) {
        
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + ",us&APPID=b2af0c249ef1580d9d26aa8ca64187be";
        
        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function(response){

            //Heading
            var dailyDiv = $("#dailyDiv");

            var city = response.name;
            var date = response.dt * 1000;
            var dateString = moment(date).format("MM/DD/YYYY");
            var iconCode = response.weather[0].icon;
            iconCode = iconCode.replace("\"","");
            iconCode = iconCode.replace("\"","");
            var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
            var icon = $("<img>").attr("src", iconURL)
            var dailyHeading = $("#cityDateIcon").text(city + " (" + dateString + ") ");
            $("#cityDateIcon").append(dailyHeading, icon);

            //Other parts
            var temperature = ((response.main.temp - 273.15) * 9/5 + 32).toFixed(0);
            $("#dailyTemp").text("Temperature: " + temperature) + "°";
        
            var humidity = response.main.humidity;
            $("#dailyHumidity").text("Humidity: " + humidity + "%");

            var windspeed = response.wind.speed;
            $("#dailyWindSpeed").text("Windspeed: " + windspeed + " mph");

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            UVIndex(lon, lat);
        });
    };

    function fiveDayForecast(input) {
        
        var query5DayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + ",us&units=imperial&APPID=b2af0c249ef1580d9d26aa8ca64187be";
        
        $.ajax({
            url: query5DayURL,
            method: "GET"
            
        }).then(function(response) {
            
            var dailyArray = response.list;
            var idArray = [1, 2, 3, 4, 5];
            var listIndex = 6;
            
            for (var i = 0; i < idArray.length; i++) {
                
                var idString = idArray[i];

                //Date

                var date = dailyArray[listIndex].dt * 1000;
                var dateString = moment(date).format("MM/DD/YYYY");
                dateString = dateString.replace("0", "");
                dateString = dateString.replace("0", "");
                $("#Day-" + idString).children("#date").text(dateString);

                //Icon

                var iconCode = dailyArray[listIndex].weather[0].icon;
                iconCode = iconCode.replace("\"","");
                iconCode = iconCode.replace("\"","");
                //console.log(iconCode);
                var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
                var icon = $("<img>").attr("src", iconURL)
                $("#Day-" + idString).children("#icon").append(icon);

                //Humidity
                var humidity = dailyArray[listIndex].main.humidity;
                $("#Day-" + idString).children("#humidity").text("Humidity: " + humidity + "%");

                //Temperature

                var tempString = dailyArray[listIndex].main.temp.toFixed(0);
                $("#Day-" + idString).children("#temp").text("Temp: " + tempString);

                listIndex+=8;
            }   
        });
    };
           
    function UVIndex(lon, lat){
        

        var queryUVIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=b2af0c249ef1580d9d26aa8ca64187be&lat=" + lat + "&lon=" + lon;

        $.ajax({

            url: queryUVIndex,
            method: "GET"
        }).then(function(response){
            uvIndex = response.value;
            $("#dailyUVIndex").text("UV Index: " + uvIndex);
        });
    };

    function addButton(input) {

        var button = $("<button>");
        button.addClass("btn btn-light btn-lg btn-block mb-2 cityButton");
        button.text(input);
        button.attr("type", "button");
        $("#cityButtonDiv").append(button);
    }

});
