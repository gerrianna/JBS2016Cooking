Template.advancedSearch.helpers({
  recipes: function(){
    const instance = Template.instance();
    return instance.state.get("recipes");
  },

  //$('#healthycheckbox').change(function(){
  //  $('#healthydiv').toggle();
//  });

});

Template.home.events({
  "click .js-get": function(event,instance){
    const ingr = $(".js-ingr").val();
    const cuisine = $(".js-cuisine").val();
    const allergies = $(".js-allergies").val();

    const maxCal = $(".js-maxCal").val();
    const maxCarb = $(".js-maxCarb").val();
    const maxFat = $(".js-maxFat").val();
    const maxProtein = $(".js-maxProtein").val();


  }
});
