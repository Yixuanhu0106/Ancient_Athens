var myStyle = function(feature) {
  switch (feature.properties.period) {
    case "Archaic":
      return {
        color: '#646464'
        // color: '#440154FF'
      };
    case "Classical":
      return {
        color: '#00395E'
        // color: '#31688EFF'
      };
    case "Hellenistic":
      return {
        color: '#E0C389'
        // color: '#35B779FF'
      };
    case "Roman":
      return {
        color: '#8B0E3A'
        // color: '#FDE725FF'
      };
    default:
      return {
        color: '#f2f2f2'
      };
  }
};

layerAttractions = L.geoJSON(attractions, {
  style: myStyle
}).addTo(map);

var sidebarOut = false; //the place of sidebar

$('.opacity-container').hide();

$(document).ready(function() {
  $('.opacity-container').hide();
  $('.desp-container').hide();
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
    sidebarOut = !sidebarOut;
  });

  layerAttractions.eachLayer(eachFeatureFunction);
});

$('#sldOpacity').on('change', function() {
  $('#image-opacity').html(this.value);
  layerHistorical.setOpacity(this.value);
})

$('#customSwitch1').change(function() { // toggle historical map
  if ($('#customSwitch1').is(':checked')) {
    map.removeLayer(baseMap);
    layerHistorical.addTo(map);
    sbsInitial.setLeftLayers(layerHistorical);
    $('.opacity-container').fadeIn();
    return;
  } else {
    map.removeLayer(layerHistorical);
    map.addLayer(baseMap);
    sbsInitial.setLeftLayers(baseMap);
    $('.opacity-container').fadeOut();
  }
});

//When clicking features:
var eachFeatureFunction = function(layer) {
  layer.on('click', function(event) {
    url1 = "img/monuments/" + layer.feature.properties.name + "/01.jpg";
    url2 = "img/monuments/" + layer.feature.properties.name + "/02.jpg";
    url3 = "img/monuments/" + layer.feature.properties.name + "/03.jpg";
    $("#carousel-img-1").attr("src", url1);
    $("#carousel-img-2").attr("src", url2);
    $("#carousel-img-3").attr("src", url3);
    if (!sidebarOut) {
      $('#sidebar').toggleClass('active');
      sidebarOut = !sidebarOut;
    }
    $("#despSubmenu p").text(layer.feature.properties.desp);
    $('.desp-container a').text(layer.feature.properties.name);
    $('.desp-container').fadeIn();
    $('.opening-container').fadeOut();
  });
};

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
