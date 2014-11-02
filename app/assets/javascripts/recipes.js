var recipeObject = {};
var recipeListObject = [];
var recipeSortedArray = []

$(document).ready(function(){

  $('.eatItBody').on('click', 'a.matchedRecipeTitle', function(){
    $(this).next().next().toggle(800);
    $(this).next().toggle(1200);
  })


  $('.submit-button').on('click', function(){
    recipeObject.stop = [];
    var array = document.forms["ingredientForm"].getElementsByTagName('input');
    for(var i = 0; i < array.length - 1 ; i++){
      if(array[i].checked){recipeObject.stop.push(array[i].value.toLowerCase())}
    };
    recipeObject.go = $('#ingredientInput').val().split(',');
    recipeObject.name = $('#ex1_value').val();
  });
  
  // $('#recipeDropDown').bind('ajax:success', function(){
  //   recipeListObject = arguments[1]['recipe_list_relations'];
  //   recipeSorter(recipeListObject);
  //   matchingRecipeAppend(recipeObject.displayOrder);
  //   $('form, angucomplete, .base').toggle(3000);
  // });

  var recipeSorter = function(array){
    recipeObject.displayOrder = [], go = [], ord = [];
    for(var i = 0; i < array.length; i++){
      if((_.intersection(array[i].ingredient_array, recipeObject.stop).length !== 0)){
      } else if((_.intersection(array[i].ingredient_array, recipeObject.go).length !== 0)){
        go.push(array[i]);
      } else { ord.push(array[i])};
    }
    var newArray = _.union(go,ord);
    recipeObject.displayOrder = _.uniq(newArray);
  }
});



(function(){
  var app = angular.module('app', ["angucomplete"]);
  app.controller('MainController', ['$scope', '$http',
    function MainController($scope, $http) {
      $scope.titles = recipeTitles;
      $scope.recipe = "";
      $scope.getRecipes = function(){
        var string = 'http://localhost:3000/finder/'+ $scope.recipe.title;
        var returnedRecipes = $http.get(string);
        returnedRecipes.success(function(data){
          $scope.resultsRecipes = data.recipe_list_relations;
          
          for(var i = 0; i < $scope.resultsRecipes.length; i++){
            var length = ($scope.resultsRecipes[i].ingredient.length)-4;
            var array = $scope.resultsRecipes[i].ingredient.substr(2,length).split('",')
            $scope.resultsRecipes[i].ingredient = array
            console.log($scope.resultsRecipes[i].title)
          }


          $('form, angucomplete, .base').toggle(3000);
          $('ul').toggle(3000)
        })
      }
    }
  ]);

})();

