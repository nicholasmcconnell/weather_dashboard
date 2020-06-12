$(document).ready(function () {

    $('#alertInput').hide();
    // $('#input').empty();

    let arrCitySet = JSON.parse(localStorage.getItem("arrCitySet")) || [];

    const uniqueSet = new Set(arrCitySet);
    const arrCity = [...uniqueSet];

    let onLoadIndex = arrCity.length - 1
    let onLoad = arrCity[onLoadIndex];


    if (arrCity.length >= 1) {
        arrCity.forEach(addButton);
    }

    dailyWeather(onLoad);
    fiveDayForecast(onLoad);

    //On Click's

    $('#clearButton').on("click", function (event) {
        localStorage.clear();
        window.location.reload();
        // $('#dailyDiv').empty();
        // $('#fiveDayCards').empty();
    })

    $('#saveSearches').on("click", function (event) {
        window.location.reload();
        // $('#dailyDiv').empty();
        // $('#fiveDayCards').empty();
    })

    $("#searchButton").on("click", function (event) {
        event.preventDefault();

        let cityString = $("#input").val().trim();
        let city = cityString.charAt(0).toUpperCase() + cityString.slice(1);

        if (cityString === '') {
            event.preventDefault();
            $('#alertInput').show();
            return
        } else {
            event.preventDefault();

            dailyWeather(city);
        }
    });

    $(document).on("click", ".cityButton", function () {
        var city = $(this).text();
        dailyWeather(city);
        fiveDayForecast(city);
    });

    return;

    // control(cityString, city)
    // async function control(cityString, city){
    //     try {
    //         await inputCheck(cityString, city);


    //     } catch (error) {
    //         console.log(error);   
    //     }
    // }

    const inputCheck = (cityString, city) => {
        console.log("in input check")


    }

    function dailyWeather(input) {

        let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + ",us&APPID=b2af0c249ef1580d9d26aa8ca64187be";

        $.ajax({
            url: queryURL,
            method: "GET",
            success: function () {
                event.preventDefault();

                if (!input) {
                    return;
                }

                $('#alertInput').hide();
                arrCitySet.push(input);
                localStorage.setItem("arrCitySet", JSON.stringify(arrCitySet));
                fiveDayForecast(input);
                // location.reload();
            },
            error: function () {
                console.log('3333333')
                $('#input').val('');
                $('#alertInput').show();
                // return false;
            }

        }).then(function (response) {

            //Heading
            let city = response.name;
            let date = response.dt * 1000;
            let dateString = moment(date).format("MM/DD/YYYY");
            let iconCode = response.weather[0].icon;
            iconCode = iconCode.replace("\"", "");
            iconCode = iconCode.replace("\"", "");
            let iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
            let icon = $("<img>").attr("src", iconURL)
            let dailyHeading = $("#cityDateIcon").text(city + " (" + dateString + ") ");
            $("#cityDateIcon").append(dailyHeading, icon);

            //Other parts
            let temperature = ((response.main.temp - 273.15) * 9 / 5 + 32).toFixed(0);
            $("#dailyTemp").text("Temperature: " + temperature + " °F");

            let humidity = response.main.humidity;
            $("#dailyHumidity").text("Humidity: " + humidity + "%");

            let windspeed = response.wind.speed;
            $("#dailyWindSpeed").text("Windspeed: " + windspeed + " mph");

            let lat = response.coord.lat;
            let lon = response.coord.lon;

            UVIndex(lon, lat);
        });
    };

    function fiveDayForecast(input) {

        var query5DayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + ",us&units=imperial&APPID=b2af0c249ef1580d9d26aa8ca64187be";

        $.ajax({
            url: query5DayURL,
            method: "GET",

        }).then(function (response) {

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
                $("#Day-" + idString).children("#icon").empty();
                var iconCode = dailyArray[listIndex].weather[0].icon;
                iconCode = iconCode.replace("\"", "");
                iconCode = iconCode.replace("\"", "");
                //console.log(iconCode);
                var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
                var icon = $("<img>").attr("src", iconURL)
                $("#Day-" + idString).children("#icon").append(icon);

                //Humidity
                var humidity = dailyArray[listIndex].main.humidity;
                $("#Day-" + idString).children("#humidity").text("Humidity: " + humidity + "%");

                //Temperature

                var tempString = dailyArray[listIndex].main.temp.toFixed(0);
                $("#Day-" + idString).children("#temp").text("Temp: " + tempString + " °F");

                listIndex += 8;
            }
        });
    };

    function UVIndex(lon, lat) {


        var queryUVIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=b2af0c249ef1580d9d26aa8ca64187be&lat=" + lat + "&lon=" + lon;

        $.ajax({

            url: queryUVIndex,
            method: "GET"
        }).then(function (response) {

            uvIndex = response.value;
            JSON.stringify(uvIndex);
            $("#dailyUVIndex").text("UV Index: ");
            $("#dailyUVIndex2").text(uvIndex);

        });
    };

    function addButton(input) {
        let city = input
        console.log(city, input)

        let button = $("<button>");
        $('#input').val('');
        button.addClass("btn btn-light btn-lg btn-block mb-2 cityButton");
        button.text(city);
        button.attr("type", "button");
        $("#cityButtonDiv").append(button);
    }

});
