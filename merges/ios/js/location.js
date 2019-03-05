var Location = {

  hasLocation: false,
  isRequestingLocation: false,
  fromNativeSettingsMenu: false,
  coords: {},


  // Request location permission
  requestLocationPermission: function() {
    console.log("requestLocationPermission");

    function onError(error) {
      console.error("The following error occurred when requesting location authorization: " + error);
    }

    cordova.plugins.diagnostic.getLocationAuthorizationStatus(function(status){
      console.log("Current location auth status: " + status);
      // Check the Location permission status
      switch(status){
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
          console.log("Location permission not requested");
          App.authorizationStatus = Constants.AuthorizationEnum.NOT_REQUESTED;
          cordova.plugins.diagnostic.requestLocationAuthorization(Location.requestLocationPermission, onError);
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          console.log("Location permission denied");
          App.authorizationStatus = Constants.AuthorizationEnum.DENIED;
          navigator.notification.confirm("Would you like to go to the system settings to manually allow location permissions for this app?", onConfirm, "Location permission is required", ["Yes", "No"]);
          function onConfirm(index) {
            if (index === 1) {
              navigator.notification.alert(
                "After you enable Location permissions, relaunch the app.",
                function() {
                  Location.fromNativeSettingsMenu = true;
                  cordova.plugins.diagnostic.switchToSettings();
                },
                ""
              );
            }
            Location.stopRequestLocation();
          }
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
          console.log("Location permission granted");
          App.authorizationStatus = Constants.AuthorizationEnum.GRANTED;
          break;
      }
    }, onError);
  },


  // Request the user's location
  requestLocation: function(afterSuccess, afterFailure) {
    console.log("requestLocation");
    if (isConnected()) {
      if (!Location.isRequestingLocation) {
        Location.isRequestingLocation = true;
        if (!HomePage.submittingReport) {
          showSpinner("Requesting Location\nPlease Wait...");
        }
        var onSuccess = function(position) {
          Location.coords = position.coords;
          Location.hasLocation = true;
          console.log("requestLocation got coords: " + Location.coords.latitude + ", " + Location.coords.longitude);
          Location.stopRequestLocation();
          var latitude = (Location.coords != null) ? Location.coords.latitude : 0;
          var longitude = (Location.coords != null) ? Location.coords.longitude : 0;
          afterSuccess(latitude,longitude);
        };
        var onError = function (error) {
          console.log("requestLocation error code: " + error.code);
          console.log("requestLocation error message: " + error.message);
          Location.stopRequestLocation();
          afterFailure(error);
          /*navigator.notification.confirm("Would you like to retry?", onConfirm, "Failure Requesting Location", ["Retry", "Cancel"]);
          function onConfirm(index) {
            if (index == 1) {
               Location.requestLocation(afterSuccess, afterFailure);
            } else {
              // if getting location failed and they do not want to retry, then fire afterFailure callback
              if (typeof afterFailure === "function") {
                afterFailure(error);
              } else {
                console.log("requestLocation: afterFailure callback not specified");
              }
            }
          }*/
        };

        // Request change settings if we need to
        if (App.authorizationStatus == Constants.AuthorizationEnum.DENIED && !Location.fromNativeSettingsMenu) {
          Location.requestLocationPermission();
        } else {
          Location.fromNativeSettingsMenu = false;
          navigator.geolocation.getCurrentPosition( onSuccess, onError, { maximumAge: 3000, timeout: 60000, enableHighAccuracy: true } );
        }
      }
    } else {
      navigator.notification.confirm("Enable wifi or data then click 'Retry' in order to request location.", alertDismissed, "No Internet Connection", ["Retry"]);
      function alertDismissed() {
        Location.requestLocation(afterSuccess, afterFailure);
      }
    }
  },


  // Stop requesting the user's location
  stopRequestLocation: function() {
    console.log("stopRequestLocation");
    Location.isRequestingLocation = false;
    if (!HomePage.submittingReport) {
      hideSpinner();
    }
  }

}
