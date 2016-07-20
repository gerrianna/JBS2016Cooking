Template.advancedSearch.onCreated(function(){
  this.state = new ReactiveDict();
  this.state.setDefault({
    healthy: false,
    diet: false,
  });
});

Template.advancedSearch.helpers({
  recipes: function(){
    const instance = Template.instance();
    return instance.state.get("recipes");
  },
  checkHealthy:function(){
    const instance = Template.instance();
    return instance.state.get("healthy");
  },
  checkDiet:function(){
    const instance = Template.instance();
    return instance.state.get("diet");
  },
});

Template.advancedSearch.events({
  "click .js-get": function(event,instance){
    console.log("hi");
    const recipe = $(".js-recipe").val();//search query
    console.log("recipe = " + recipe);
    const cuisine = $(".js-cuisine").val();//cuisine
    console.log("cuisine = " + cuisine);
    const ingr = $(".js-ingr").val();//includeingredients
    console.log("ingredients = " + ingr);

    const allergies = $(".js-allergies").val();//allergies/exclude ingredients
    console.log("allergies = " + allergies);
    //const diet = //diet

    const maxCal = $(".js-maxCal").val();//maxCalories
    console.log("max calories = " + maxCal);
    const maxCarb = $(".js-maxCarb").val();//maxCarbs
    console.log("max carbs = " + maxCarb);
    const maxFat = $(".js-maxFat").val();//maxFat
    console.log("max fat = " + maxFat);
    const maxProtein = $(".js-maxProtein").val();//maxProtein
    console.log("max protein = " + maxProtein);
    const mealType = $(".js-type").val();//mealType
    console.log("meal type = " + mealType);

    Meteor.apply("advancedGet",[recipe,cuisine,ingr,allergies,diet,maxCal,maxCarb,maxFat,maxProtein,mealType],{returnStubValue: true},
        function(error,result){
          if(error) {
            console.dir(error);
          }
          console.dir("r");
            r = JSON.parse(result);

           // console.dir(r);
            //return instance.state.set("recipes",r.results);
            console.dir("result");
            console.dir(result);
            return Session.set("recipes",r);

        }
    );

  },
  "click #healthybox":function(event,instance){
     var checked = instance.$('#healthybox').prop('checked');
     instance.state.set("healthy",checked);
  },
  "click #dietbox":function(event,instance){
     var checked = instance.$('#dietbox').prop('checked');
     instance.state.set("diet",checked);
  },

});
