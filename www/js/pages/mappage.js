var MapPage = {

  text: null, //the text for the page's template
  centerLocation: [],
  didInitialLoad: false,
  initialIFrameLoaded: false,
  timer: null,
  iFrameTimeoutInMs: 8000,



  mapCheck: function() {
    console.log("Checking if map loaded");
    MapPage.initialIFrameLoaded = true;
    var $iframe = $($("#iframe-map")[0].contentWindow.document.body.innerHTML);
    if ($iframe) {
      if ($iframe.find("#map-container").length == 0) {
        console.log("Map Error");
        App.navigateToPage(Constants.MAP_ERROR_PAGE);
      } else {
        console.log("Map Loaded");
      }
    }
  },


  loadTemplate: function() {
    this.text = App.text.map;
    var mapTpl = Handlebars.compile($("#map-tpl").html());
    $('#map').html(mapTpl(this.text));
    $('#map').trigger('create');
  },


  setListeners: function() {
    // (future listeners will go here)

    // If IFrame has loaded
    $('#iframe-map').load(function(e) {
      console.log("IFrame has loaded");
      clearTimeout(MapPage.timer);
      // Check if map page is not 404
      if (!MapPage.initialIFrameLoaded) {
        MapPage.mapCheck();
      }
    });
  },


  onCreate: function() {
    // IFrame Loading Check
    MapPage.initialIFrameLoaded = false;
    MapPage.timer = setTimeout(MapPage.mapCheck, MapPage.iFrameTimeoutInMs);

    if (!MapPage.didInitialLoad) {
      MapPage.didInitialLoad = true;
      this.loadTemplate();
      this.setListeners();
    }

    // first-time map modals
    if (LocalStorage.get("firsttime_map")) {
      MapPage.showMapModal();
      LocalStorage.set("firsttime_map",false);
    }

    var mapUrl = Constants.URL_MAP + "?user_hash=" + LocalStorage.get("user_hash") + "&client_token=" + Constants.CLIENT_ID;

    // browser compatibility issues (Yay?)
    $("#map .ui-panel-inner").find(".ui-btn-active").removeClass("ui-btn-active");

    // Update current city name and corresponding info
    App.refreshCity(null, function() {
      var currentCity = LocalStorage.get("current_city");
      if (currentCity && currentCity.name) {
        mapUrl += "&cityName=" + currentCity.name + "&zipCode=" + currentCity.zip;
      }
      mapUrl += "&latLng=" + currentCity.lat + "," + currentCity.lng;
      $('#iframe-map').attr('src', mapUrl);

      // browser compatibility issues (Yay?)
      $("#map").resize();
    });
  },


  initialize: function () {
    console.log("MapPage.initialize (deprecated; start using onCreate instead)");
    this.onCreate();
  },


  // helper functions


  showMapModal: function() {
    showModal("modal-map-firsttime");
  },


  // /**
  //  * returns if the new city is the same as the old one
  //  * @param {string} newCity -name of city as string
  //  */
  // cityEquality: function(newCity) {
  //   var oldCity = LocalStorage.get("current_city");
  //   return oldCity === newCity;
  // },
  //
  //
  // // Creates and animates new city pop up
  // makePopup: function(){
  //   // gets aqi
  //   MapPage.getAQI(MapPage.zipcode, function(aqi) {
  //     // update aqi text
  //     $(".aqi").text(aqi);
  //     // show popup
  //     $("#new-city-popup")[0].setAttribute("style", "position:absolute;top:0px");
  //     // animate it
  //     $("#new-city-popup").animate({top: "-110px"}, 1250);
  //     // 10 sec close timer
  //     $("#close-popup").click(MapPage.closePopup);
  //     MapPage.popupTimer = setTimeout(MapPage.closePopup, 1000*10);
  //   });
  // },
  //
  //
  // /**
  //  * changes all class your-city to the string passed in
  //  * @param {string} city -nmae of city as string
  //  */
  // refreshCityName: function(city) {
  //   $(".your-city").text(city);
  // },
  //
  //
  // // hides the new city popup
  // closePopup: function() {
  //   clearTimeout(MapPage.popupTimer);
  //   $("#new-city-popup")[0].setAttribute("style", "display:none");
  // },
  //
  //
  // /**
  //  * returns the aqi for a zip code
  //  * @param {string} zip -zipcode as string
  //  * @param {function} callback -takes aqi as string
  //  */
  // getAQI: function(zip, callback) {
  //   // TODO when the zipcode aqi goes live change this from staging to actual api
  //   var url = Constants.STAGING + "/api/v2/get_aqi?zipcode=" + zip;
  //   $.getJSON(url, function(data) {
  //     callback(data);
  //   });
  // },

}
