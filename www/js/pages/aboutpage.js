var AboutPage = {

  text: null, //the text for the page's template
  didInitialLoad: false,


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
    if (!AboutPage.didInitialLoad) {
      AboutPage.didInitialLoad = true;
      this.loadTemplate();
      this.setListeners();
    }

    // Update current city name and corresponding info
    App.refreshCity();
  },


  initialize: function () {
    console.log("AboutPage.initialize (deprecated; start using onCreate instead)");
    AboutPage.onCreate();
  },


  // helper functions

}
