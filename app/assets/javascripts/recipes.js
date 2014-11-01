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
    matchingRecipeAppend(recipeObject);
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
    // update();

  }

  var matchingRecipeAppend = function(object){
    console.log(object)
    var html = "";
  }
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
      // var update = function(){
      //   $scope.$apply(function() {
      //     $scope.recipeList = recipeListObject;
      //   });
      // }
    }
  ]);
})();

