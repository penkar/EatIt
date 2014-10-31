class RecipesController < ApplicationController
	def index
		@recipe_title = Recipe.all.map do |x| {name: x.title, ingredients: x.ingredient_array.map!{|x| x.capitalize} } end
		@food = [1]
		@recipe = Recipe
	end
end
