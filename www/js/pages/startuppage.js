var StartupPage = {
  text:null, //the text for the page's template

  initialize: function () {
    //load template
    this.text=App.text.startup;
    var startupTpl=Handlebars.compile($("#startup-tpl").html());
    $('#startup').html(startupTpl(this.text));
    $('#startup').trigger('create');
    console.log("StartupPage.initialize");
  },


  onDeviceReady: function() {
    console.log("StartupPage.onDeviceReady");
    Location.requestLocation(function(latitude,longitude) {
      StartupPage.storeCity(latitude,longitude);
      },function (error){
        console.log("Error",error)
      });
    $("#startup-to-settings").click(function() {
      LocalStorage.set("firsttime_startup", false);
      App.initialize();
    });
  },

//gets and stores home city on first launch
  storeCity:function(Lat,lng){
    MapPage.getCity(Lat,Lng,function(city){
      var cityObj={
        name:city,
        lat:Lat,
        lng:Lng
      }
      LocalStorage.set("home_city",cityObj)
    })
  },

}
