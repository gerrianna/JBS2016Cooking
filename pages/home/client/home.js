Template.home.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    recipes:[],
  });
  console.log("creating the template");
  console.dir(this.state);
});

Template.home.helpers({
  recipes: function(){
    const instance = Template.instance();
    return instance.state.get("recipes");
  },

});

Template.home.events({
  "click .js-recipe": function(event,instance){
    const text = $(".js-search").val(); //this gets what the user typed in
    console.log("text = " + text);
    //Meteor.call("test1",function(e,r){console.log(r)});
   Meteor.call("getRecipe", "abc", text);

    Meteor.apply("getRecipe",[text],{returnStubValue: true},

      function(error,result){
        console.dir(error);
        r = JSON.parse(result);
        console.dir(r);
        return instance.state.set("recipes",r.results);
      });
  },
})
