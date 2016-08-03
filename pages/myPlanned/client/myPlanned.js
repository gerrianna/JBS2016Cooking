Template.myPlanned.helpers({
	"sundmorn":function(){
		return Weekly.find({day:'Sunday',time:"Breakfast"});
	},
	"sul":function(){
		return Weekly.find({day:'Sunday',time:"Lunch"});
	},
	"sud":function(){
		return Weekly.find({day:'Sunday',time:"Dinner"});
	},
	"mb":function(){
		return Weekly.find({day:'Monday',time:"Breakfast"});
	},
	"ml":function(){
		return Weekly.find({day:'Monday',time:"Lunch"});
	},
	"md":function(){
		return Weekly.find({day:'Monday',time:"Dinner"});
	},
	"tub":function(){
		return Weekly.find({day:'Tuesday',time:"Breakfast"});
	},
	"tul":function(){
		return Weekly.find({day:'Tuesday',time:"Lunch"});
	},
	"tud":function(){
		return Weekly.find({day:'Tuesday',time:"Dinner"});
	},
	"wb":function(){
		return Weekly.find({day:'Wednesday',time:"Breakfast"});
	},
	"wl":function(){
		return Weekly.find({day:'Wednesday',time:"Lunch"});
	},
	"wd":function(){
		return Weekly.find({day:'Wednesday',time:"Dinner"});
	},
	"thb":function(){
		return Weekly.find({day:'Thursday',time:"Breakfast"});
	},
	"thl":function(){
		return Weekly.find({day:'Thursday',time:"Lunch"});
	},
	"thd":function(){
		return Weekly.find({day:'Thursday',time:"Dinner"});
	},
	"fb":function(){
		return Weekly.find({day:'Friday',time:"Breakfast"});
	},
	"fl":function(){
		return Weekly.find({day:'Friday',time:"Lunch"});
	},
	"fd":function(){
		return Weekly.find({day:'Friday',time:"Dinner"});
	},
	"sab":function(){
		return Weekly.find({day:'Saturday',time:"Breakfast"});
	},
	"sal":function(){
		return Weekly.find({day:'Saturday',time:"Lunch"});
	},
	"sad":function(){
		return Weekly.find({day:'Saturday',time:"Dinner"});
	},
	/*"calorietotalM":function(){
		const weekday = "Monday"
		Meteor.call("insertTotal", weekday);
		return Total.find({day:weekday});
	},
	"calorietotalTu":function(){
		const weekday = "Tuesday"
		Meteor.call("insertTotal", weekday);
		return Total.find({day:weekday});
	},*/
	"calorietotalW":function(){
		const weekday = "Wednesday"
		Meteor.call("insertTotal", weekday);
		return Total.find({day:weekday});
	},
	/*"calorietotalTh":function(){
		const weekday = "Thursday"
		Meteor.call("insertTotal", weekday);
		return Total.find({day:weekday});
	},
	"calorietotalF":function(){
		const weekday = "Friday"
		Meteor.call("insertTotal", weekday);
		return Total.find({day:weekday});
	},
	"calorietotalSa":function(){
		const weekday = "Saturday"
		Meteor.call("insertTotal", weekday);
		return Total.find({day:weekday});
	},
	"calorietotalSu":function(){
		const weekday = "Sunday"
		Meteor.call("insertTotal", weekday);
		return Total.find({day:weekday});
	}*/
});
Template.myPlanned.events({
	"click .js-link":function(events){
		var recId = this.id;
		 Meteor.call("removeIns");
    	 Meteor.call("removeHealth");

    	Meteor.apply("getInstructions",[recId],
      		function(error,result){
        		x = JSON.parse(result);
        		console.dir(x);
        		const text = x[0].name;
        		console.dir("text");
        		console.dir(text);
        		const instructionsArray = x[0].steps;
        		console.dir(x[0]);
        		Ins.insert(x[0]);
       			//Meteor.call("insertIns",x[0]);
        /*for(var i=0;i<x.length; i++){
          console.dir("hello");
          console.dir(x[i]);
          var c = x[i];
          console.dir(c);
          Meteor.call("insertIns",c);
        }*/
        //return Ins.find({});
      		}
    	);
    	Meteor.apply("getRecipeIngredients", [recId],
      		function(error, result){
        		a = JSON.parse(result);
        		console.log(a);
        		Health.insert(a);
      		}
    	);
    	Router.go('/instructions');
    }
})