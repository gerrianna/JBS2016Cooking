Template.home.events({
  "click .js-recipe": function(event,instance){
    //const ingr = $(".js-ingr").val(); //this gets what the user typed in
    const dish = $(".js-dish").val(); //this gets the dish the user want to make
   // console.log("ingr = " + ingr);
    console.log("dish = " + dish);
    const number = $(".js-showNum").val();
    console.log("num:")
    console.log(number);
    //const number = Session.get("number");
    //Meteor.call("test1",function(e,r){console.log(r)});
    // Meteor.call("getRecipe",[text]);
    Meteor.apply("getRecipe",[dish,number],{returnStubValue: true},
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
    Meteor.call('pierreSpeak');
  },
})
