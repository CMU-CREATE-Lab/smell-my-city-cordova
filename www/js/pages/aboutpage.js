var AboutPage = {

  text: null, //the text for the page's template


  loadTemplate: function() {
    this.text = App.text.about;
    var aboutTpl = Handlebars.compile($("#about-tpl").html());
    $('#about').html(aboutTpl(this.text));
    $('#about').trigger('create');
  },


  setListeners: function() {
    // add back (x) button functionality
    $(".back-x").click(function() {App.navigateToPastPage()});
  },


  onCreate: function() {
    this.loadTemplate();
    this.setListeners();
    this.displayVersionNumber();
  },


  initialize: function () {
    console.log("AboutPage.initialize (deprecated; start using onCreate instead)");
    AboutPage.onCreate();
  },


  // helper functions


  displayVersionNumber: function() {
    $("#about-version-number").text("version: " + Constants.APP_VERSION);
  },

}
