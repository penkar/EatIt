class RecipesController < ApplicationController
	def index
		@find = 'a'
		@recipe_title = Recipe.all.map do |x| {name: x.title, ingredients: x.ingredient_array.map!{|x| x.capitalize} } end
	end

	def find
		title = params[:recipe_title]
		match = eval(Recipe.all(:title => title).first.match).sort_by{|x,y| y}.map{|x| x[0].to_i}
		recipes = match.map{|key| Recipe.all(:key => key).first}
		render :json => { recipe_list_relations: recipes }
	end
end
