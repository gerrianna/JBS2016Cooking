Meteor.methods({
  "addShopping":function(item){
    console.dir(item);
    console.log("clicked the button");
    Shopping.insert(item);
  },
  "removeShopping":function(item){
    Shopping.remove(item);
  },
  /*
  "showMe":function(it,box){
    var vis = (box.checked) ? "block" : "none";
    document.getElementById(it).style.display = vis;
  },
  */
})
