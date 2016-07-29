Template.instructions.helpers({
  instruction: function(){
    let user = Ins.findOne({})
    console.log("user");
    console.log(user);
    return user && user.steps;
  },
  ingredient: function(){
    let ingr = Health.findOne({})
    var ingredients = [];
    console.log(ingr.extendedIngredients.length);
    console.log(ingr.extendedIngredients[1].originalString.length);
    for(var i=0; i<ingr.extendedIngredients.length; i++){
        console.log(ingr.extendedIngredients[i].originalString);
        ingredients.push(ingr.extendedIngredients[i].originalString);
    }
    var newone = _.uniq(ingredients);
   
    function register(){
      var printThis = "";
      for(var i = 0; i < newone.length; i++){
        printThis += "<br>"+newone[i];
      }
      return printThis; 
    }
    document.getElementById('ingredients').innerHTML = register();
    
  },
  equipment: function(){
    let equip = Ins.findOne({})
    console.log("equip");
    console.log(equip);
    var eq = [];
    for(var i=0; i<equip.steps.length; i++){
      for(var j=0; j<equip.steps[i].equipment.length; j++){
          eq.push(equip.steps[i].equipment[j].name);
      }
    }
    var newone = _.uniq(eq);
   
    function reg(){
      var printThis = "";
      for(var i = 0; i < newone.length; i++){
        printThis += "<br>"+newone[i];
      }
      return printThis; 
    }
    document.getElementById('eq').innerHTML = reg();
  },
  recipeInfo : function(){
    return Health.find({});
  }

/*
  "click .js-next": function(event){
    const skip =
    Session.set("offset",)
  },
  */
});
