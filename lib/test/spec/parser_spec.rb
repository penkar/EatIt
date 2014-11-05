require 'rspec'
require 'pry-byebug'


require_relative '../Library/parser.rb'

describe String do 
	it 'It should be able to remove leading spaces.' do
		string = '     String'
		new_string = string.unindent
		expect(new_string).to eq('String')	
	end
end

describe Recipebook do 
	it 'It should be able to start a cookbook recipes.' do
		cookbook = Recipebook.new
		expect(cookbook.count).to eq(0)
		expect(cookbook.cookbook).to eq({})
	end

	it 'It should be able to receive recipes.' do 
		cookbook = Recipebook.new
		recipe = {title: 'one'}
		cookbook.build_recipe(recipe)
		expect(cookbook.cookbook[1]).to eq({title: 'one', :ingredient_array=> nil, :match => {}})
		expect(cookbook.count).to eq(1)	
		STDOUT.should_receive(:puts).with('one')
		expect(cookbook.titles)
	end

	it 'It should be able to split ingredients.' do 
		cookbook = Recipebook.new
		recipe1 = {title: 'one', ingredients:['[[flour]] eggs not bacon']}
		result = cookbook.ingredient_split(recipe1[:ingredients])
		expect(result).to eq(['Flour'])	
	end

	it 'It should be able to split directions.' do 
		joyofcooking = Recipebook.new
		recipe1 = {title: 'one', ingredients:['[[flour]] eggs not bacon'], directions:['Add the [[onion]]s and cook about 5 minutes.','Until translucent.','Add the [[black beans|beans]], [[garlic]], and 6 cups cold [[water]].']}
		recipe2 = {title: 'one', ingredients:['[[flour]] eggs not bacon'], directions:['Add the [[onion]]s and cook about 5 minutes.','Until translucent.','Add the [[black beans|beans]], [[garlic]], and 6 cups cold [[water]].']}
		joyofcooking.build_recipe(recipe1)
		joyofcooking.build_recipe(recipe2)
		joyofcooking.build_relations
		puts joyofcooking.cookbook
		expect(joyofcooking.cookbook[1][:match]).to eq({'2'=> 2.5})
	end

	it 'It should be able to split directions.' do 
		cookbook = Recipebook.new
		recipe1 = {title: 'one', directions:['Add the [[onion]]s and cook about 5 minutes.','Until translucent.','Add the [[black beans|beans]], [[garlic]], and 6 cups cold [[water]].']}
		result = cookbook.direction_split(recipe1[:directions])
		expect(result).to eq(["about", "minutes", "until", "translucent"])	
	end
end

