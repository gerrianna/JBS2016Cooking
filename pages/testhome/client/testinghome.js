Template.testinghome.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    recipes:[],
  });
  console.log("creating the template");
  console.dir(this.state);
});

Template.testinghome.helpers({
  recipes: function(){
    const instance = Template.instance();
    return instance.state.get("recipes");
  },

});

Template.testinghome.events({
  "click .js-submit": function(event,instance){
    console.log("clicked");
    const ingr = $(".js-ingr").val(); //this gets what the user typed in
    //const dish = $(".js-dish").val(); //this gets the dish the user want to make
    //console.log("ingr = " + ingr);
    //console.log("dish = " + dish);
    //Meteor.call("test1",function(e,r){console.log(r)});
   // Meteor.call("getRecipe",[text]);

    Meteor.apply("getnewRecipe",[ingr], 

      function(error,result){
        console.dir(error);
        r = JSON.parse(result);
        console.dir(r);
        return instance.state.set("recipes",r.results);
      });
  },
})