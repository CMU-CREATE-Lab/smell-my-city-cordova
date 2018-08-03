var MapPage = {

  centerLocation: [],
  maxTimeForPlaces:24*60*60,
  text:null, //the text for the page's template
  inNewCity:false, // if should make a popup
  zipcode:"", //the user's current zipcode
  popupTimer:undefined, //the timer function for the popups

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


/**
 * returns if the new city is the same as the old one
 * @param {string} newCity -name of city as string
 */
  cityEquality:function(newCity){
    var oldCity=LocalStorage.get("current_city");
    return oldCity===newCity;
  },

//Creats and animates new city pop up
  makePopup:function(){
    //gets aqi
    MapPage.getAQI(MapPage.zipcode,function(aqi){
      //update aqi text
      $(".aqi").text(aqi);
      //show popup
      $("#new-city-popup")[0].setAttribute("style","position:absolute;top:0px");
      //animate it
      $("#new-city-popup").animate({top:"-110px"},1250);
      //10 sec close timer
      $("#close-popup").click(MapPage.closePopup);
      MapPage.popupTimer=setTimeout(MapPage.closePopup, 1000*10);
    });

  },

/**
 * changes all class your-city to the string passed in
 * @param {string} city -nmae of city as string
 */
  refreshCityName:function(city){
    $(".your-city").text(city);
  },

  //hides the new city popup
  closePopup:function(){
    clearTimeout(MapPage.popupTimer);
    $("#new-city-popup")[0].setAttribute("style","display:none");
  },

  /**
   * returns the aqi for a zip code
   * @param {string} zip -zipcode as string
   * @param {function} callback -takes aqi as string
   */
  getAQI:function(zip,callback){
    //TODO when the zipcode aqi goes live change this from staging to actual api
    var url=Constants.STAGING+"/api/v2/get_aqi?zipcode="+zip;
    $.getJSON(url,function(data){
      callback(data);
    });
  }
}
