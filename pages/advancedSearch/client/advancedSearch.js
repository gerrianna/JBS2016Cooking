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
    const ingr = $(".js-ingr").val();//includeingredients
    console.log("ingredients = " + ingr);
    const cuisine = $(".js-cuisine").val();//cuisine
    console.log("cuisine = " + cuisine);

    const mealType = $(".js-type").val();//mealType
    console.log("meal type = " + mealType);

    const allergies = $(".js-allergies").val();//allergies/exclude ingredients
    console.log("allergies = " + allergies);

    const maxCal = $(".js-maxCal").val();//maxCalories
    console.log("max calories = " + maxCal);
    const maxCarb = $(".js-maxCarb").val();//maxCarbs
    console.log("max carbs = " + maxCarb);
    const maxFat = $(".js-maxFat").val();//maxFat
    console.log("max fat = " + maxFat);
    const maxProtein = $(".js-maxProtein").val();//maxProtein
    console.log("max protein = " + maxProtein);


    const minCal = $(".js-minCal").val();//minCalories
    console.log("min calories = " + minCal);
    const minCarb = $(".js-minCarb").val();//minCarbs
    console.log("min carbs = " + minCarb);
    const minFat = $(".js-minFat").val();//minFat
    console.log("min fat = " + minFat);
    const minProtein = $(".js-minProtein").val();//minProtein
    console.log("min protein = " + minProtein);
    //const number = $(".js-number").val();
  //  console.log("number = " + number);

    const diet = document.getElementsByName("diet");

    console.log("diet = "+ diet);


/*
    var diets;
    if(diet[0].checked){
      diets = ""+diet[0].val;
      console.log(diets);
    }else{
      diets ="";
    }
    */
    var i;
    var diets = "";
    for (i = 0; i <	diet.length; i++) {
      if(diet[i].checked){
      //  console.log(diet[i].value);
        if(i>0){
          diets += ',';
        }
      diets += diet[i].value;
      }
    }
    console.log("diets = "+ diets);

    const number = $(".js-num").val();
    console.log("num:")
    console.log(number);

    Meteor.apply("advancedGet",[recipe,ingr,cuisine,mealType,allergies,maxCal,maxCarb,maxFat,maxProtein,minCal,minCarb,minFat,minProtein,number],{returnStubValue: true},
        function(error,result){
          if(error) {
            console.dir(error);
          }
          console.dir("result = ");
          console.dir(result);
          console.dir("reached");

          r = JSON.parse(result);
          console.dir("here");
          console.dir("r= ");
          console.dir(r);
          y = r.results;
          console.dir(y);
           // console.dir(r);
            //return instance.state.set("recipes",r.results);

            //console.dir(result);
          return Session.set("recipes",y);

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
  "click .js-talk": function(event,instance){
    Meteor.call('pierreSpeak');
  },

});
