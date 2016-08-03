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
            var t = r.result.fulfillment.speech;
            var pierreWords = new SpeechSynthesisUtterance(t);
            window.speechSynthesis.speak(pierreWords);
          } else if(r.result.action == "recipe.find"){
          	console.dir("finding recipe");
          	var m = r.result.parameters.recipe;
            const number =Session.get("number");
            if(r.result.parameters.allergies != ""){
              console.log("allergies is this: ");
              console.log(r.result.parameters.allergies);
              var allergies = r.result.parameters.allergies;
            } else {
              allergies = null;
            }
            var ingredient;
            if(r.result.parameters.ingredients != ""){
              console.dir("ingredient is this: ");
              console.dir(r.result.parameters.ingredients);
              ingredient = r.result.parameters.ingredients;
            } else {
              ingredient = null;
            }
            if(r.result.parameters.cuisine != ""){
              var cuisine = r.result.parameters.cuisine;
            } else {
              cuisine = null;
            }
            if(r.result.parameters.mealType != ""){
              var mealType = r.result.parameters.mealType;
            } else {
              mealType = null;
            }
            Session.set("search",{
              recipe:m,
              ingr:ingredient,
              cuisine:cuisine,
              mealType:mealType,
              allergies:allergies,
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
            console.log("search ingredient");
            console.log(search.ingr);
            Meteor.apply("advancedGet",[search],{returnStubValue: true},
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
          } else if(r.result.action == "instructions.start"){
            Session.set("stepNum",0);
            const stepNum = Session.get("stepNum");
            const v = Ins.find().fetch();

            var step = v[0].steps[stepNum].step;
            console.log("step instructions");
            console.log(step);
            var pierreWords = new SpeechSynthesisUtterance(step);
            window.speechSynthesis.speak(pierreWords);
          } else if(r.result.action == "step.next"){
            const stepNumNew = Session.get("stepNum");
            const stepNum2 = stepNumNew+1;
            Session.set("stepNum",stepNum2);
            const stepNum = Session.get("stepNum");
            const v = Ins.find().fetch();
            var stepCount = v[0].steps.length;
            var step = v[0].steps[stepNum].step;
            var pierreWords = new SpeechSynthesisUtterance(step);
            window.speechSynthesis.speak(pierreWords);
          } else if(r.result.action == "step.repeat"){
            const stepNum = Session.get("stepNum");
            const v = Ins.find().fetch();
            var stepCount = v[0].steps.length;
            var step = v[0].steps[stepNum].step;
            var pierreWords = new SpeechSynthesisUtterance(step);
            window.speechSynthesis.speak(pierreWords);
          } else if(r.result.action == "step.back"){
            const stepNumNew = Session.get("stepNum");
            const stepNum2 = stepNumNew-1;
            Session.set("stepNum",stepNum2);
            const stepNum = Session.get("stepNum");
            const v = Ins.find().fetch();
            var stepCount = v[0].steps.length;
            var step = v[0].steps[stepNum].step;
            var pierreWords = new SpeechSynthesisUtterance(step);
            window.speechSynthesis.speak(pierreWords);
          } else if(r.result.action == "shoppingListspeech.add"){
            var ingredientList = Session.get("ingredients");
            console.log("ingredients");
            console.log(ingredientList);
            console.log(ingredientList.length);
            for(var i = 0; i<ingredientList.length; i++){
              shopping_obj = {
                text:ingredientList[i],
                user:Meteor.userId()
              }
              Meteor.call("addShopping",shopping_obj);
            }
            var t = r.result.fulfillment.speech;

            var pierreWords = new SpeechSynthesisUtterance(t);
            window.speechSynthesis.speak(pierreWords);
          } else if(r.result.action == "favorites.add"){
            var title = Session.get("recipeName");
            var id = Session.get("recipeId");
            var image = Session.get("recipeImage");
            var favorite_obj={
              title:title,
              id:id,
              image:image,
              user:Meteor.userId()
            };
            Meteor.call("addFavorite",favorite_obj);
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
