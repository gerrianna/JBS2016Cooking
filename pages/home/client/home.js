Template.home.events({
  "click .js-recipe": function(event,instance){
    //const ingr = $(".js-ingr").val(); //this gets what the user typed in
    const dish = $(".js-dish").val(); //this gets the dish the user want to make
   // console.log("ingr = " + ingr);
    console.log("dish = " + dish);
    //Meteor.call("test1",function(e,r){console.log(r)});
    // Meteor.call("getRecipe",[text]);
    Meteor.apply("getRecipe",[dish],{returnStubValue: true},
        function(error,result){
          if(error) {
            console.dir(error);
          }
          console.dir("result=");
          console.dir(result);
          r = JSON.parse(result);
          console.dir("r= ");
          console.dir(r);
            return Session.set("recipes",r);

        }
    );},

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

          Meteor.call("getRecipeTalk",item,{returnStubValue:true},
            function(error,result){
              if(error){
                console.dir(error);
              }
              console.dir("r");
              r = JSON.parse(result);
              console.dir(r);
              var s = r.result.parameters.ingredients;
              Meteor.apply("getRecipe",[s],{returnStubValue:true},
                function(error,result){
                console.dir(error);
                r = JSON.parse(result);
                console.dir(r);
                //return instance.state.set("recipes",r.results);
                return Session.set("recipes",r);
              })
            }
          );
        };
        recognition.start();
        console.log("starting the recognizer");
    },
})
