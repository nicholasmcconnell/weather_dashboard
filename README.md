# homework-six
index.html

    1. The .html contains a bootstrap grid system with various div's with id's.
        Link: https://nicholasmcconnell.github.io/homework-six/

script.js

    1. There are four main functions
        -dailyWeather
        -fiveDayForecast
        -UVIndex
        -addButton

    lines 3 - 10 
        - Items are pulled from local storage.  If there are items in the array, a forEach utilizing the code of the addButton function, creates buttons for previously searched cities
        - setting the onLoad variable's value to the last item of the localStorage array and making it an arguement when calling the dailyWeather and fiveDayForecast functions ensurse it is what the page displays upon being refreshed.

    lines 12 - 26
        - This is an onClick event listener that pulls the users city search and calls the dailyWeather and fiveDayForecast functions setting it as an argument.

    lines 32 - 69
        - This is fucntion dailyWeather
        - It makes an ajax call to the open weaathermap api and pulls the appropriate information and appends it to the appropriate html elements.
        - it ends by calling the UVIndex function and sends the longitude and latitude from dailyWeather's ajax call as arguments.  
        

    lines 71 - 119
        - makes an AJAX call pulls the appropriate data and apends it to the appropraite html elements.
        - A for loop is used to make sure the appropriate dates weather is placed on the appropriate days bootstrap card.
        - the value of variable list index is increased by 8 so to pull data from the next day in the openWeatherAPI's Array.  Every 8 index's a new days weather begins.

    lines 121 - 137
        -This UVIndex function pulls the appropriate data from the ajax call sand appends it to the html

    139 - 146
        -This function addButton creates a button for previously searched cities and appends it to the the #cityButtonDiv.

style.CSS
    - Add's margins padding borders and color to style the page.






