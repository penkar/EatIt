class RecipesController < ApplicationController
	def index
		@recipe_title = Recipe.all.map{|x| x.title}
		@food = [1]
		@recipe = Recipe
	end
end
