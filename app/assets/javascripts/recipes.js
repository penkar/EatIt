var recipeObject = {};
var recipeListObject = [];
var recipeSortedArray = []

$(document).ready(function(){
  $('.submit-button').on('click', function(){
    recipeObject.stop = [];
    var array = document.forms["ingredientForm"].getElementsByTagName('input');
    for(var i = 0; i < array.length - 1 ; i++){
      if(array[i].checked){recipeObject.stop.push(array[i].value.toLowerCase())}
    };
    recipeObject.go = $('#ingredientInput').val().split(',');
    recipeObject.name = $('#ex1_value').val();
  });
  
  $('#recipeDropDown').bind('ajax:success', function(){
    recipeListObject = arguments[1]['recipe_list_relations'];
    recipeSorter(recipeListObject);
    matchingRecipeAppend(recipeObject.displayOrder);
    $('form').toggle(500);

  });


  var recipeSorter = function(array){
    recipeObject.displayOrder = [], go = [], ord = [];
    for(var i = 0; i < array.length; i++){
      if((_.intersection(array[i].ingredient_array, recipeObject.stop).length !== 0)){
      } else if((_.intersection(array[i].ingredient_array, recipeObject.go).length !== 0)){
        go.push(array[i])
      } else { ord.push(array[i])}
    }
    var newArray = _.union(go,ord);
    recipeObject.displayOrder = _.uniq(newArray);
  }

  var matchingRecipeAppend = function(object){
    console.log(object);
    var html = "";
    for(var i = 0; i < object.length; i++){
      html += '<a class="matchedRecipeTitle">'+object[i].title+'</a><br>'
      directionsList = createDirectionListHTML(object[i].direction, 'Direction')
      ingredientList = createIngredientListHTML(object[i].ingredient, 'Ingredient')
      html += directionsList
      html += ingredientList
      $('form').after(html)
      html = ''
    }
    $('ul').toggle(600)
  }

  var createIngredientListHTML = function(stringObject, title){
    var length = (stringObject.length)-4 ;
    stringObject = stringObject.substr(2,length).split('",')
    var text = '';
    text += '<ul class='+title+'>'+ title+':'
    _.each(stringObject, function(dir) {
      text+= '<li>'+dir+'</li>'
    })
    text += '</ul>'
    return text
  }

  var createDirectionListHTML = function(object, title){
    var text = '';
    text += '<ul class='+title+'>'+ title+':'
    _.each(object, function(dir) {
      text+= '<li>'+dir+'</li>'
    })
    text += '</ul>'
    return text
  } 

  $('.matchedRecipeTitle').on('click', function(){
    this.next().toggle();
    this.next().next().toggle;
  })
});

(function(){
  var app = angular.module('app', ["angucomplete"]);
  app.controller('MainController', ['$scope', '$http',
    function MainController($scope, $http) {
        $scope.titles = recipeTitles;
    }
  ]);
  app.controller('RecipeBuilder', ['$scope', '$http',
    function RecipeBuilder($scope, $http) {
      $scope.recipeList = recipeListObject;
    }
  ]);
})();

