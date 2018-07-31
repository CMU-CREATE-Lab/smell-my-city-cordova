var MapPage = {

  centerLocation: [],
  maxTimeForPlaces:24*60*60,
  text:null, //the text for the page's template
  inNewCity:false,
  zipcode:"",
  popupTimer:undefined,

  initialize: function () {
    //load template
    this.text=App.text.map;
    var mapTpl=Handlebars.compile($("#map-tpl").html());
    $('#map').html(mapTpl(this.text));
    $('#map').trigger('create');
    MapPage.refreshCityName(LocalStorage.get("current_city"));
    console.log("MapPage.initialize");

    // first-time map modals
    if (LocalStorage.get("firsttime_map")) {
      MapPage.showMapModal();
      LocalStorage.set("firsttime_map",false);
    }

    // don't perform this when you redirect from submitting a smell report
    if (MapPage.centerLocation.length != 2) {
      Location.requestLocation(function(latitude,longitude) {
        $('#iframe-map').attr('src', Constants.URL_SMELLPGH+"/visualization?user_hash="+LocalStorage.get("user_hash")+"&latLng="+latitude+","+longitude);
        if(MapPage.inNewCity){
          MapPage.makePopup(LocalStorage.get("current_city"));
          MapPage.inNewCity=false;
        }
      },function (error){
        console.log(error);
        //if unable to get location use this src to at display something
         $('#iframe-map').attr('src', Constants.URL_SMELLPGH+"/visualization?user_hash="+LocalStorage.get("user_hash") );
      });
    } else {
      var latitude = MapPage.centerLocation[0], longitude = MapPage.centerLocation[1];
      console.log("got latlong (without requesting a second time): "+latitude+","+longitude);
      $('#iframe-map').attr('src', Constants.URL_SMELLPGH+"/visualization?user_hash="+LocalStorage.get("user_hash")+"&latLng="+latitude+","+longitude);
      MapPage.centerLocation = [];
    }

    // browser compatibility issues (Yay?)
    $("#map-panel").find(".ui-btn-active").removeClass("ui-btn-active");
  },


  onDeviceReady: function() {
    console.log("Mappage.onDeviceReady");
  },


  // helper functions


  showMapModal: function() {
    showModal("modal-map-firsttime");
  },

  getCity:function(lat,lng,callback){
    var geocoder = new google.maps.Geocoder;
    var latlng={lat:lat,lng:lng};
    var city2;
    geocoder.geocode({'location': latlng}, function(results, status) {
      console.log(results)
      for(var i=0;i<results.length;i++){
        if(results[i].types[0]==="locality"){
          city2=results[i].address_components[0].long_name;
        }
      }
      if(results.length>0&&results[0].address_components.length>6){
     MapPage.zipcode=results[0].address_components[7].long_name;
      }
     callback(city2)
    });
  },

//returns if the new city is the same as the old one
  updateCity:function(newCity){
    var oldCity=LocalStorage.get("current_city");
    return oldCity===newCity;
  },

//Creats and animates new city pop up
  makePopup:function(){
    MapPage.getAQI(MapPage.zipcode,function(aqi){
      $(".aqi").text(aqi);
      $("#new-city-popup")[0].setAttribute("style","position:absolute;top:0px");
      $("#new-city-popup").animate({top:"-110px"},1250)
      $("#close-popup").click(MapPage.closePopup);
      MapPage.popupTimer=setTimeout(MapPage.closePopup, 1000*10);
    });

  },

//updates text instances of new city
  refreshCityName:function(city){
    $(".your-city").text(city);
  },

  //hides the new city popup
  closePopup:function(){
    console.log("closed")
    clearTimeout(MapPage.popupTimer);
    $("#new-city-popup")[0].setAttribute("style","display:none");
  },

  //returns the aqi for a zip code
  getAQI:function(zip,callback){
    var url="http://staging.api.smellpittsburgh.org"+"/api/v2/get_aqi?zipcode="+zip;
    $.getJSON(url,function(data){
      callback(data);
    });
  }
}
