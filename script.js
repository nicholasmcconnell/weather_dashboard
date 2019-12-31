//$(document).ready(function() {

    function dailyWeather(input) {
        
        $("#dailyIcon").empty();
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + ",us&APPID=b2af0c249ef1580d9d26aa8ca64187be";
        
        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function(response){


            console.log(response);

            //Heading
            var dailyDiv = $("#dailyDiv");

            var city = response.name;
            var date = response.dt * 1000;
            var dateString = moment(date).format("MM-DD-YYYY");
            var iconCode = JSON.stringify(response.weather[0].icon);
            iconCode = iconCode.replace("\"","");
            iconCode = iconCode.replace("\"","");
            //console.log(iconCode);
            var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            //console.log(icon);
            var icon = $("<img>").attr("src", iconURL)
            var dailyHeading = $("#cityDateIcon").text(city + " (" + dateString + ") ");
            dailyDiv.append(dailyHeading);
            $("#dailyIcon").append(icon);

            //Other parts
            var temperature = ((response.main.temp - 273.15) * 9/5 + 32).toFixed(0);
            $("#dailyTemp").text("Temperature: " + temperature);
        
            var humidity = response.main.humidity;
            $("#dailyHumidity").text("Humidity: " + humidity + "%");
             //console.log(humidity);

            var lat = response.coord.lat;
            var lon = response.coord.lon;

        

            UVIndex(lon, lat);
            //return(lat, lon);
            //uv call after longitude and lat is pulled
            //pass long and lat as var to fill in url for UV call.
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
            
            console.log(response);
            
            
            for (var i = 0; i < idArray.length; i++) {
                
                
                var idString = JSON.stringify(idArray[i]);
                console.log(idString);
                
                $("#Day-" + idString).children("#icon").empty();

                //Date

                var date = dailyArray[listIndex].dt * 1000;
                var dateString = moment(date).format("MM/DD/YYYY");
                dateString = dateString.replace("0", "");
                dateString = dateString.replace("0", "");
                $("#Day-" + idString).children("#date").text(dateString);

                //Icon

                var iconCode = JSON.stringify(dailyArray[listIndex].weather[0].icon);
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
                console.log(tempString);
                // var temp = JSON.stringify(tempString);
                // temp = temp.replace("\"","");
                // temp = temp.replace("\"","");
                $("#Day-" + idString).children("#temp").text("Temp: " + tempString);

                listIndex+=8;

            }   
        });
    };
            //var id = 1;
            
            //console.log(id);
            
            
            
            
            
            
            // for (j=0; j < idArray.length; i++) { 
                
                //     var idString = JSON.stringify(idArray[j].value);
                //     var id = $("#Day-" + idString);
                //     console.log(id);
                //    //$(id).children(".description").val(message);
                
                



            //for loop pulls what is needed and appends all in one swoop.

        //});


    function UVIndex(lon, lat){
        

        var queryUVIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=b2af0c249ef1580d9d26aa8ca64187be&lat=" + lat + "&lon=" + lon;

        $.ajax({

            url: queryUVIndex,
            method: "GET"
        }).then(function(response){
            console.log(response);



            uvIndex = response.value;
            $("#dailyUVIndex").text("UV Index: " + uvIndex);
        });
    };

    //On Click

    $("#searchButton").on("click", function(event){
        event.preventDefault();

        var input = $("#input").val().trim();
        dailyWeather(input);
        fiveDayForecast(input);


    });

//});
