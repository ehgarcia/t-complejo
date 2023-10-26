function initMap() {
  // Coordenadas de la dirección de origen
  var coordenadasOrigen = { lat: -34.76363300936045, lng: -58.82571255086833 };

  // Crea un mapa centrado en la dirección de origen
  var map = new google.maps.Map(document.getElementById("map"), {
    center: coordenadasOrigen,
    zoom: 15, // Ajusta el nivel de zoom según tus necesidades
  });

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  calcularRuta(directionsService, directionsDisplay);
}

function calcularRuta(directionsService, directionsDisplay) {
  var request = {
    origin: "Av. Libertad 261, B1727 HEC, Provincia de Buenos Aires", // Dirección de origen
    destination: "Emilio Mitre 155, Marcos Paz", // Dirección de destino
    travelMode: "DRIVING", // Modo de transporte (puede ser DRIVING, WALKING, BICYCLING, etc.)
  };

  directionsService.route(request, function (result, status) {
    if (status == "OK") {
      directionsDisplay.setDirections(result);
    } else {
      console.error("Error al calcular la ruta: " + status);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var sheetKey = "15DoO0ruwBuea0mbJzLEFUk7mxEvd2-80TX18Hz7a-6g"; // Reemplaza con tu clave de hoja
  var sheetName = "comidas"; // Nombre de la hoja de cálculo

  // URL de la hoja de Google Sheets publicada
  var sheetURL =
    "https://docs.google.com/spreadsheets/d/" +
    sheetKey +
    "/gviz/tq?tqx=out:csv&sheet=" +
    sheetName;

  fetch(sheetURL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(function (data) {
      var options = data.split("\n").slice(1); // Ignorar la primera línea (encabezados)
      var datalist = document.getElementById("datalistOptions");

      for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i].split(",")[0].trim();
        datalist.appendChild(option);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});

// Reemplaza el uso de google.maps.event.addDomListener con addEventListener
window.addEventListener("load", initMap);