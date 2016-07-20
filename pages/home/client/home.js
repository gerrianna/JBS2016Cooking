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

    "click .js-talk": function(event,instance){
      console.log("clicked it");
      $(".js-talk").html("Listening...");
      //https://shapeshed.com/html5-speech-recognition-api/
      var recognition = new webkitSpeechRecognition();
     // var dish2 = "";
      recognition.onresult = function(event) {
          console.dir(event);
          $(".js-talk").html("Talk");
          const dish2 = event.results[0][0].transcript;
          console.log(dish2);
          //const dish2 = event.results[0][0].transcript;
          console.log(event.results[0][0].confidence);
          console.log("done");

          Meteor.apply("getRecipe",[dish2],{returnStubValue: true},
            function(error,result){
              console.dir(error);
              r = JSON.parse(result);
              console.dir(r);
              //return instance.state.set("recipes",r.results);
              return Session.set("recipes",r);
            }
          );
         // console.log("done");
        };

        recognition.start();
        console.log("starting the recognizer");


    },

    //"click .jsx"

})
