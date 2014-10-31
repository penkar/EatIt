var recipeObject = {};
var recipeListObject = [];
var recipeSortedArray = []

$(document).ready(function(){

  $('.submit-button').on('click', function(){
    recipeObject.stop = [];
    var array = document.forms["ingredientForm"].getElementsByTagName('input');
    for(var i = 0; i < array.length - 1 ; i++){
      if(array[i].checked){recipeObject.stop.push(array[i].value)}
    };
    recipeObject.go = $('#ingredientInput').val().split(',');
    recipeObject.name = $('#ex1_value').val();
  });

  $('#aaaa').bind('ajax:success', function(){
    recipeListObject = arguments[1]['recipe_list_relations'];
    console.log(recipeListObject);
    recipeSorter(recipeListObject);
    $('form').toggle(500);

  });

  var recipeSorter = function(array){
    recipeObject.displayOrder = []
    var go = []
    for(var i = 0; i < array.length; i++){
      if((_.intersection(array[i].ingredient_array,recipeObject.stop).length === 0){
      } else if((_.intersection(array[i].ingredient_array,recipeObject.go).length !== 0)){
        recipeObject.displayOrder.push(array[i])
      } else { go.push(array[i])}
    }
    _.flatten(recipeObject.displayOrder.push(go))
  }

});






var app = angular.module('app', ["angucomplete"]);
app.controller('MainController', ['$scope', '$http',
    function MainController($scope, $http) {
        $scope.titles = recipeTitles;
    }
]);

