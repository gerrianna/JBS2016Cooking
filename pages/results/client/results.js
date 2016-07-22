Template.results.onCreated(function() {
  //this.state = new ReactiveDict();
  Session.setDefault({
    recipes:[],
  });
  console.log("creating the template");
  //console.dir(this.state);
});

Template.results.helpers({
  recipes: function(){
    const instance = Template.instance();
    //return instance.state.get("recipes");
    return Session.get("recipes");
  },

})
/*
Template.advancedSearch.events({
    "click .js-thumbs-up": function(event){


    },

    "click .js-star": function(event)
*/
