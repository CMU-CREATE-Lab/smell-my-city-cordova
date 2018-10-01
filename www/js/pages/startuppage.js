var StartupPage = {

  text: null, //the text for the page's template


  loadTemplate: function() {
    this.text = App.text.startup;
    var startupTpl = Handlebars.compile($("#startup-tpl").html());
    $('#startup').html(startupTpl(this.text));
    $('#startup').trigger('create');
  },


  setListeners: function() {
    $(".langSelect").change(SettingsPage.langSelect);
    $("#startup-to-settings").click(function() {
      LocalStorage.set("firsttime_startup", false);
    });
  },


  onCreate: function() {
    this.loadTemplate();
    this.setListeners();

    // previously in onDeviceReady
    Location.requestLocation( function(latitude, longitude) {
        StartupPage.storeCity(latitude, longitude);
      }, function(error) {
        console.log("Warning: tried to request location on StartupPage but failed.", error);
    });
  },


  initialize: function() {
    console.log("StartupPage.initialize");
    StartupPage.onCreate();
  },


  // gets and stores home city on first launch
  // home city is not currently being used
  // the user should be made aware that this is happening
  // also it should be changable in settings
  storeCity: function(Lat, Lng) {
    // NOTE: does not store a city name for now (old code commented)
    LocalStorage.set("home_city", {lat: Lat,lng: Lng,});

    // // get city
    // App.getCity(Lat, Lng, function(city) {
    //   // store retrived city
    //   // the city object has lat lng so it can be substitute for user location
    //   var cityObj = {
    //     name: city,
    //     lat: Lat,
    //     lng: Lng,
    //   }
    //   //the stores in local storage
    //   LocalStorage.set("home_city", cityObj);
    // });
  },

}
