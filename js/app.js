$(document).ready(function() {
  var latitude = "";
  var longitude = "";
  var locationUrl = "";
  var locationKey = "";
  const apiKey = "810f5b8073e58776654a95b21dababda";
  const convertToC = (fahrenheit) => {
    var celsius = (fahrenheit - 32) * 5/9;
    return celsius = Math.round(celsius);
  }
  const getLocation = () => {
    const geoOptions = {
      enableHighAccuracy: false,
      maximumAge: 5000,
      timeout: 8000
    }
    const geoError = () => {
      alert("No position available.");
    }
    const success = (pos) => {
      latitude += pos.coords.latitude;
      longitude += pos.coords.longitude;
      locationUrl = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;
      $.ajax({
        type: "GET",
        url: locationUrl,
        dataType: "jsonp",
        cache: true,
        jsonpCallback: "callback",
        success: function (data) {
                const conditions = data.currently;
                const html = `<h2>${Math.round(conditions.temperature)}F</h2>`;
                const secondHTML = `<p>Nearest City: ${data.timezone} | ${conditions.summary} | ${conditions.windSpeed} mph</p>`;
                $("#info").html(html);
                $("#info2").html(secondHTML);
                const tempInF = conditions.temperature;
                const tempInC = convertToC(tempInF);
                $("div h2").click(function() {
                  const newHTML = `<h2>${tempInC}C</h2>`;
                  $(this).hide();
                  $("#info").html(newHTML);
                }); // end success
        } // end success
      }); // end ajax request

    } // end function success
    navigator.geolocation.getCurrentPosition(success, geoError, geoOptions);
  } // end getLocation function
  if ("geolocation" in navigator) {
    getLocation();
  }
}); // end document ready
