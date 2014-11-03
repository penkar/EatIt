class RecipesController < ApplicationController
	def index
		@find = 'a'
		@recipe_title = Recipe.all.map do |x| {name: x.title} end
	end

	def find
		title = params[:recipe_title]
		match = eval(Recipe.all(:title => title).first.match).sort_by{|x,y| -y}.map{|x| x[0].to_i}
		recipes = match.map{|key| Recipe.all(:key => key).first}
		render :json => { recipe_list_relations: recipes }
	end

	def find_ingredient
		title = params[:title]
		title = title.gsub('%20', ' ')
		puts title;puts title;
		array = Recipe.all(:title => title).first.ingredient_array
		render :json => { recipe_ingredient_array: array }
	end

	def finder
		title = params[:title]
		title = title.gsub('%20', ' ')
		match = eval(Recipe.all(:title => title).first.match).sort_by{|x,y| -y}.map{|x| x[0].to_i}
		recipes = match.map{|key| Recipe.all(:key => key).first}
		render :json => { recipe_list_relations: recipes }
	end
end
