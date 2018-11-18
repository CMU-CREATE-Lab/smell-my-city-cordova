/**
 * Namespace for all app-related calls.
 * @namespace App
 */
var App = {

  isDeviceReady: false,
  authorizationStatus: Constants.AuthorizationEnum.NOT_REQUESTED,
  accuracyStatus: Constants.AccuracyEnum.DISABLED,
  htmlElementToScrollAfterKeyboard: null, // this is the HTML element you want to scroll to after the keyboard has been opened
  htmlElementToBlurAfterKeyboardCloses: null, // this is the HTML element you need to blur after the keyboard has been closed to avoid weird glitches on using checkboxradio widgets
  pastPage: Constants.HOME_PAGE,//The page one was on before switching used for x button
  text: getText(LocalStorage.get("language")),//parameter doesnt matter until more languages and method of selecting and getting them is desided
  didFirstTimeLocationCheck: false,
  isFinalPermissionPopupActive: false,

  /**
   * The type of callback that is being handled for calls to {@link initializePage}.
   * @enum {number}
   */
  CallbackType: {
    CREATE: 0,
    RESUME: 1,
    PAUSE: 2,
  },


  /**
   * Called after the HTML body loads.
   */
  initialize: function() {
    console.log("onInitialize");
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },


  // helper functions


  /**
   * Perform necessary initialization after page loads.
   * @param {string} pageId - HTML id for the jquerymobile page.
   * @param {callbackType} callbackType
   */
  initializePage: function(pageId, callbackType) {
    console.log("initializePage");
    // remove listener for keyboard events
    window.removeEventListener("keyboardDidShow", onKeyboardShowInHomePage);
    window.removeEventListener('keyboardDidHide', onKeyboardHide);

    // set Screen name for Firebase Analytics (NOTE: pageId might be nonsense)
    Analytics.setScreenName(pageId);

    // Use this if the page needs initialized everytime the page is viewed
    switch (pageId) {
      case Constants.STARTUP_PAGE:
        StartupPage.initialize();
        break;
      case Constants.HOME_PAGE:
        HomePage.initialize();
        // change pastPage so the x sends the user here
        App.pastPage=Constants.HOME_PAGE;
        // listen for keyboard events
        window.addEventListener("keyboardDidShow", onKeyboardShowInHomePage);
        window.addEventListener('keyboardDidHide', onKeyboardHide);
        break;
      case Constants.MAP_PAGE:
        if (callbackType == App.CallbackType.CREATE) {
          MapPage.initialize();
        }
        // change pastPage so the x sends the user here
        App.pastPage = Constants.MAP_PAGE;
        break;
      case Constants.SETTINGS_PAGE:
        SettingsPage.initialize();
        // listen for keyboard events
        window.addEventListener("keyboardDidShow", onKeyboardShowInHomePage);
        window.addEventListener('keyboardDidHide', onKeyboardHide);
        break;
      case Constants.ABOUT_PAGE:
        AboutPage.initialize();
        break;
      case "howitworks":
         var howitworksTpl = Handlebars.compile($("#howitworks-tpl").html());
         // initialization for howitworks page
         // mostly the page's template but also the x button
         $('#howitworks').html(howitworksTpl(App.text.howitworks));
         $('#howitworks').trigger('create');
         $(".back-x").click(function() {App.navigateToPastPage()});
        break;
      case Constants.LOCATION_SELECT_PAGE:
        if (callbackType == App.CallbackType.CREATE) {
          LocationSelectPage.initialize();
        }
        break;
      default:
        // TODO some default page?
        break;
    }
  },


  // callbacks


  /**
   * Listener for ondeviceready on document.
   */
  onDeviceReady: function () {
    console.log("onDeviceReady");

    // bind App events
    $(document).on("resume", App.onResume);
    $(document).on("pause", App.onPause);
    $(document).on("pagecontainershow", App.onPageContainerShow);
    // remove FastClick glitch from checkboxradio widgets
    disableUnwantedFastClickElements();

    App.isDeviceReady = true;

    Firebase.initialize();
    Location.requestLocationPermission();

    // start Analytics
    Analytics.initialize();

    // listen for keyboard events
    window.addEventListener("keyboardDidShow", onKeyboardShowInHomePage);
    window.addEventListener('keyboardDidHide', onKeyboardHide);
    if (LocalStorage.get("firsttime_startup")) {
      App.navigateToPage(Constants.STARTUP_PAGE);
    } else {
      if ($.mobile.pageContainer.pagecontainer("getActivePage")[0].id == Constants.HOME_PAGE) {
        HomePage.initialize();
      }
    }

  },


  /**
   * Binded "resume" event for document.
   */
  onResume: function() {
    console.log("onResume");
    Location.requestLocationPermission();
    Analytics.logOnResumeEvent();
    var pageId = $.mobile.pageContainer.pagecontainer("getActivePage")[0].id;
    App.initializePage(pageId, App.CallbackType.RESUME);
  },


  /**
   * Binded "pause" event for document.
   */
  onPause: function() {
    console.log("onPause");
    Analytics.logOnPauseEvent();
    if (App.isDeviceReady && App.authorizationStatus === Constants.AuthorizationEnum.GRANTED) {
      Location.stopRequestLocation();
    } else if (App.isDeviceReady) {
      hideSpinner();
    }
  },


  /**
   * Binded "pagecontainershow" event for document. switch
   */
  onPageContainerShow: function (event, ui) {
    var pageId = $.mobile.pageContainer.pagecontainer("getActivePage")[0].id;
    console.log("onPageContainerShow: " + pageId);
    App.initializePage(pageId, App.CallbackType.CREATE);
  },


  /**
   * changes current page through the jquery mobile framework.
   * @param {string} pageId -id of the page to go to
   */
  navigateToPage: function(pageId) {
    $.mobile.pageContainer.pagecontainer("change", "#" + pageId, { changeHash: true, transition: "none" });
  },


  /**
   * goes back to the previous page, most likely called when back/X button is clicked.
   */
  navigateToPastPage: function() {
    App.navigateToPage(App.pastPage);
  },


  reverseGeocode: function(lat, lng, callback) {
    console.log("reverse geocode");
    nativegeocoder.reverseGeocode(success, failure, lat, lng, { useLocale: true, maxResults: 1 });

    function success(result) {
      console.log("SUCCESS REVERSE");
      callback(result[0]);
    }

    function failure(err) {
      console.log("REVERSE_GEOCODE_FAILED");
    }
  },

  // /**
  //  * gets city based on user location
  //  * @param {float} lat - latitude as float
  //  * @param {float} lng - longitude as float
  //  * @param {function} callback - city object
  //  */
  getCityFromLocation: function(lat, lng, callback) {
    App.reverseGeocode(lat, lng, function(geocode) {
      var cityObj = {
        name: geocode.locality,
        zip: geocode.postalCode,
        state: geocode.administrativeArea,
        lat: lat,
        lng: lng,
        lastUpdate: (new Date()).getTime()
      };
      LocalStorage.set("current_city", cityObj);
      console.log("cityObj populated");
      callback(cityObj);
    });
   /*var geocoder = new google.maps.Geocoder;
   var latlng = {lat:lat, lng:lng};//reformat params into google style LatLng object
   var city2;// the 2 at the end of the variable name, dont worry about it

   // TODO We need to have a fall back if this does not return properly (without a callback the home page never loads)
   // city2 = "pittsburgh";
   // callback(city2)

   geocoder.geocode({'location': latlng}, function(results, status) {
     console.log("geocoder.geocode response");
     //find city name
     for (var i=0; i<results.length; i++) {
       //google geocoding returns a object where cities are objets with type locality
       if (results[i].types[0] === "locality") {
         city2 = results[i].address_components[0].long_name;
       }
     }
     //find zipcode
     //zip code only exists inside lower levels of the return object unlike city
     //want to use address_components of first part of the object so it must exist
     if (results.length>0) {
       //results[0] usually has the fullest address of a place and therefore has the zip code
       for (var j=0; j<results[0].address_components.length; j++) {
         //in the returned object zipc codes are objects with type of postal_code
         if (results[0].address_components[j].types[0] === "postal_code") {
           //stored in MapPage as it is only use there. Used to get aqi
            MapPage.zipcode = results[0].address_components[j].long_name;
         }
       }
     }
     callback(city2)
   });*/
  },

}


// HTML body onLoad
$(function() {
  console.log("onLoad");
  // avoid click delay on ios
  FastClick.attach(document.body);
  App.initialize();
});
