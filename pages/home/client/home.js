Template.home.onCreated(function() {
  //this.state = new ReactiveDict();
  Session.setDefault({
    number:10,
  });

  console.log("creating the template");
  //console.dir(this.state);
});
Template.home.helpers({
  number: function(){
    const instance = Template.instance();
    //return instance.state.get("recipes");
    return Session.get("number");
  },
});

Template.home.events({
  "click .js-recipe": function(event,instance){
    //const ingr = $(".js-ingr").val(); //this gets what the user typed in
    Session.set("number",10);
    const dish = $(".js-dish").val(); //this gets the dish the user want to make
    Session.set("dish",dish);
    const recipe = Session.get("dish");
    console.log(recipe);
   // console.log("ingr = " + ingr);
    console.log("dish = " + dish);
    //const number = $(".js-showNum").val();

    const number = Session.get("number");
    //const offset = Session.get("offset");
    console.log("num:")
    console.log(number);
  //  console.log("offset:")
    //console.log(offset);

    Session.set("search",{
      recipe:recipe,
      ingr:null,
      cuisine:null,
      mealType:null,
      allergies:null,
      maxCal:null,
      maxCarb:null,
      maxFat:null,
      maxProtein:null,
      minCal:null,
      minCarb:null,
      minFat:null,
      minProtein:null,
      number:number,
      //offset:0,
    });
    const search = Session.get("search");
    console.log(search);
    //const number = Session.get("number");
    //Meteor.call("test1",function(e,r){console.log(r)});
    // Meteor.call("getRecipe",[text]);
    Meteor.apply("getRecipe",[search],{returnStubValue: true},
        function(error,result){
          if(error) {
            console.dir(error);
          }
          console.dir("result=");
          console.dir(result);
          r = JSON.parse(result);
          console.dir("r= ");
          console.dir(r);
          x = r.results;
          console.dir(x);
          return Session.set("recipes",x);

        }
    );
  },

  "click .js-talk": function(event){
    Meteor.call('pierreSpeak');
  },
  "click .js-reclink":function(events){
    //events.preventDefaults();
    console.log("hi");
    var recId = this.id;
    console.log("recId");
    console.log(recId);
    var name = this.title;
    console.log("name");
    console.log(name);
    var id = this._id;
    //Sessions.setPersistent("selectedrecipe",id);
    Session.set("recname",name);
    var u = Session.get("recname");
    console.log(u);
    Meteor.call("removeIns");
    Meteor.call("removeHealth");

    Meteor.apply("getInstructions",[recId],
      function(error,result){
        x = JSON.parse(result);
        console.dir(x);
        const text = x[0].name;
        console.dir("text");
        console.dir(text);
        const instructionsArray = x[0].steps;
        console.dir(x[0]);
        Meteor.call("insertIns",x[0]);
        /*for(var i=0;i<x.length; i++){
          console.dir("hello");
          console.dir(x[i]);
          var c = x[i];
          console.dir(c);
          Meteor.call("insertIns",c);
        }*/
        //return Ins.find({});
      }
    );
    Meteor.apply("getRecipeIngredients", [recId],
      function(error, result){
        a = JSON.parse(result);
        console.log(a);
        Health.insert(a);
      }
    );
    Router.go('/instructions');
  },
})
