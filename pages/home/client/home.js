Template.home.onCreated(function() {
  //this.state = new ReactiveDict();
  Session.setDefault({
    number:10,
    //offset:90,
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
          //const number = $(".js-showNum").val();
          //console.log("num:")
          //console.log(number);
          const number = 10;
          //const number = Session.get("number");
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
})
