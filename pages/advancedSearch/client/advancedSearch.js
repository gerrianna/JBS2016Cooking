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

    const number = Session.get("number");
    //const offset = Session.get("offset");

    Session.set("search",{
      recipe:recipe,
      ingr:ingr,
      cuisine:cuisine,
      mealType:mealType,
      allergies:allergies,
      maxCal:maxCal,
      maxCarb:maxCarb,
      maxFat:maxFat,
      maxProtein:maxProtein,
      minCal:minCal,
      minCarb:minCarb,
      minFat:minFat,
      minProtein:minProtein,
      number:number,
      //offset:0,
    });
    const search = Session.get("search");

    Meteor.apply("advancedGet",[search],{returnStubValue: true},
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
    console.log("clicked it");
    $(".js-talk").html("Listening...");
      //https://shapeshed.com/html5-speech-recognition-api/
    var recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
      console.dir(event);
      $(".js-talk").html("Talk");
      const item = event.results[0][0].transcript;
      console.log("item");
      console.log(item);
          //const dish2 = event.results[0][0].transcript;
      console.log(event.results[0][0].confidence);
      console.log("done");
      const number = 10;


      Meteor.call("getRecipeTalk",item,{returnStubValue:true},
        function(error,result){
          if(error){
            console.dir(error);
          }
          console.dir("r");
          r = JSON.parse(result);
              //console.dir(r);
          var s = r.result.parameters.ingredients;
          if(r.result.parameters.page != undefined){
            t = r.result.parameters.page;
            Router.go('/'+t);
          } else if(r.result.parameters.page == undefined){
              console.dir("finding recipe");
              Meteor.apply("getRecipe",[s,number],{returnStubValue: true},
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
              Router.go('/results');
          }              
        }
      );
    };
    recognition.start();
    console.log("starting the recognizer");
  },

});
