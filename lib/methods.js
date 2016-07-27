Meteor.methods({
"pierreSpeak": function(){
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
      console.log(event.results[0][0].confidence);
      console.log("done");
      var shopping_obj={
        text:item,
        user:Meteor.userId()
      }
      console.dir(shopping_obj);
      Meteor.call("addShoppingTalk",shopping_obj,item, {returnStubValue: true},
        function(error,result){
          if(error) {
            console.dir(error);
          }
          console.dir("r");
          r = JSON.parse(result);
          console.dir(r);
          if(r.result.action == "shoppingList.add"){
            var s = r.result.parameters.groceryItem;
            console.dir(s);
            shopping_obj = {
              text:s,
              user:Meteor.userId()
            }
            console.log("shopping obj");
            console.dir(shopping_obj);
            Meteor.call("addShopping",shopping_obj);
            var t = r.result.fulfillment.speech;

            var pierreWords = new SpeechSynthesisUtterance(t);
            window.speechSynthesis.speak(pierreWords);
          } else if (r.result.action == "shoppingList.remove" && r.result.parameters.page == "myShopping"){
            var s = r.result.parameters.groceryItem;
            console.dir(s);
            const grocery = Shopping.findOne({text:r.result.parameters.groceryItem});
            console.log("grocery");
            console.dir(grocery);
            Meteor.call("removeShopping",grocery);
            var t = r.result.fulfillment.speech;

            var pierreWords = new SpeechSynthesisUtterance(t);
            window.speechSynthesis.speak(pierreWords);
          } else if(r.result.action == "page.find"){
            t = r.result.parameters.page;
            Router.go('/'+t);
          } else if(r.result.action == "recipe.find"){
          	console.dir("finding recipe");
          	var m = r.result.parameters.ingredients;
            const number =Session.get("number");
            Session.set("search",{
              recipe:m,
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
            Router.go('/results');
          } else if(r.result.action == "fridge.add"){
            var s = r.result.parameters.fridgeItem;
            fridge_obj = {
              text:s,
              user:Meteor.userId()
            },
            Meteor.call("addFridge",fridge_obj);
            var t = r.result.fulfillment.speech;
            var pierreWords = new SpeechSynthesisUtterance(t);
            window.speechSynthesis.speak(pierreWords);
          } else if(r.result.action == "fridge.remove" && r.result.paramter.page == "myFridge"){
            var s = r.result.parameters.fridgeItem;
            const fridge = Fridge.findOne({text:r.result.parameters.fridgeItem});
            Meteor.call("removeFridge",fridge);
            var t = r.result.fulfillment.speech;
            var pierreWords = new SpeechSynthesisUtterance(t);
            window.speechSynthesis.speak(pierreWords);
          }
        }
      );
      
    };
    recognition.start();
    console.log("starting the recognizer");
  },

})
