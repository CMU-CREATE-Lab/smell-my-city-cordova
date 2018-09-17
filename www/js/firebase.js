/**
 * Helper for all calls to Firebase; makes it easier to remove/add package
 * @namespace Firebase
 */

var Firebase = {

  // NOTE: this is a constant value and should be true iff the firebase plugin is included
  isEnabled: false,
  verboseLogging: true,


  /**
   * Should be called from app.js on device ready.
   */
  initialize: function () {
    console.log("Firebase.initialize");
    if (!Firebase.isEnabled) {
      if (Firebase.verboseLogging) console.log("NOTE: !Firebase.isEnabled");
      return;
    }

    window.FirebasePlugin.getToken(function(token) {
        console.log("Your firebaseInstanceID is "+token);
      }, function(error) {
        console.error(error);
    });
    window.FirebasePlugin.onNotificationOpen(function(notification) {
        console.log(JSON.stringify(notification));
        Analytics.logOnClickNotificationEvent(notification["notification_type"]);
        if (notification["open_with_page"]) {
          openWithPage(notification["open_with_page"], notification["notification_type"]);
        }
      }, function(error) {
        console.error(error);
    });

    // subscribe to topics
    window.FirebasePlugin.subscribe(Constants.GLOBAL_TOPIC);
    if (Firebase.verboseLogging) console.log("subcribed to: " + Constants.GLOBAL_TOPIC);
    if (LocalStorage.get("receive_pghaqi_notifications")) {
      window.FirebasePlugin.subscribe(Constants.PITTSBURGH_AQI_TOPIC);
      if (Firebase.verboseLogging) console.log("subcribed to: " + Constants.PITTSBURGH_AQI_TOPIC);
    }
    if (LocalStorage.get("receive_smell_notifications")) {
      window.FirebasePlugin.subscribe(Constants.SMELL_REPORT_TOPIC);
      if (Firebase.verboseLogging) console.log("subcribed to: " + Constants.SMELL_REPORT_TOPIC);
    }

    window.FirebasePlugin.grantPermission();
  },


  // helper functions


  setUserId: function(userHash) {
    if (Firebase.isEnabled) {
      window.FirebasePlugin.setUserId(userHash)
    }
    if (Firebase.verboseLogging) {
      console.log("Firebase.setUserId: "+userHash);
    }
  },


  setUserProperty: function(key, value) {
    if (Firebase.isEnabled) {
      window.FirebasePlugin.setUserProperty(key,value);
    }
    if (Firebase.verboseLogging) {
      console.log("Firebase.setUserProperty: "+key+","+value);
    }
  },


  setScreenName: function(name) {
    if (Firebase.isEnabled) {
      window.FirebasePlugin.setScreenName(name);
    }
    if (Firebase.verboseLogging) {
      console.log("Firebase.setScreenName: "+name);
    }
  },


  subscribe: function(topicName) {
    if (Firebase.isEnabled) {
      window.FirebasePlugin.subscribe(topicName);
    }
    if (Firebase.verboseLogging) {
      console.log("subscribed to "+topicName);
    }
  },


  unsubscribe: function(topicName) {
    if (Firebase.isEnabled) {
      window.FirebasePlugin.unsubscribe(topicName);
    }
    if (Firebase.verboseLogging) {
      console.log("unsubscribed from "+topicName);
    }
  },


  logEvent: function(eventName, params) {
    if (Firebase.isEnabled) {
      window.FirebasePlugin.logEvent(eventName, params);
    }
    if (Firebase.verboseLogging) {
      console.log("Firebase.logEvent: "+eventName+","+params);
    }
  },

}
