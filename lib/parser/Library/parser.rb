require 'rubygems'
require 'mongo'
require 'awesome_print'
include Mongo

mongo_collection = MongoClient.new('localhost', 27017).db('eat_it_app_development').collection('recipes');

class String
  def unindent 
    gsub(/^#{scan(/^\s*/).min_by{|l|l.length}}/, "")
  end
end

class Recipebook
	attr_accessor :cookbook, :count
	def initialize
		@count = 0
		@cookbook = {}
	end

	def build_recipe(recipe)
		@count += 1
		@cookbook[@count] = recipe
		@cookbook[@count][:match] = Hash.new
		@cookbook[@count][:ingredient_array] = nil
		# recipe[:match] = Hash.new
		# recipe[:ingredient_array] = nil
		# @cookbook.push(recipe)
	end

	def titles
		@cookbook.each_pair {|key, val| puts val[:title]}
	end

	def ingredient_split(array)
		newarray = array.map{|x| x.split}.flatten.uniq.select{|x| x[0..1]=='[['}.map{|x| x.gsub(/[^a-zA-Z]/,'').downcase.capitalize}
		newarray
	end

	def direction_split(array)
		newarray = array.map{|x| x.split}.flatten.uniq.select{|x| (x.length > 4) && !x.match(/\[|\]|\|/)}.map{|x| x.gsub(',','').gsub('.','').downcase}
	end

	def build_intersection_length(array1,array2,array3,array4)
		common1 = array1 & array2
		common2 = array3 & array4
		relationship = ((common1.length + common2.length)/(array1.length + array2.length).to_f).round(4)
		#relationship = ((common1.length + common2.length)/(array1.length + array2.length + array3.length + array4.length).to_f).round(4)
		relationship
	end

	def build_relations
		1.upto(@count-1) do |num1|
			puts num1
			(num1+1).upto(@count) do |num2|
				ing1 = ingredient_split(@cookbook[num1][:ingredients])
				ing2 = ingredient_split(@cookbook[num2][:ingredients])
				dir1 = direction_split(@cookbook[num1][:directions])
				dir2 = direction_split(@cookbook[num2][:directions])
				intersection_percent_1 = build_intersection_length(ing1,ing2,dir1,dir2)
				intersection_percent_2 = build_intersection_length(ing2,ing1,dir2,dir1)
				@cookbook[num1][:ingredient_array] = ing1 if @cookbook[num1][:ingredient_array].nil?
				@cookbook[num2][:ingredient_array] = ing2 if @cookbook[num2][:ingredient_array].nil?
				@cookbook[num1][:match][num2.to_s] = intersection_percent_1 if intersection_percent_1 > 0.4
				@cookbook[num2][:match][num1.to_s] = intersection_percent_2 if intersection_percent_2 > 0.4
			end
		end	
		puts 'File Read Complete'
	end

	def send_to_mongodb(collection)
		@cookbook.each do |key,val|
			# puts "Key: #{key.inspect}"
			# puts "val: #{val}"
			hash = {
				key: key,
				title: val[:title] || '',
				ingredient: val[:ingredients] || [],
				ingredient_array: val[:ingredient_array] || [],
				direction: val[:directions] || [],
				match: val[:match] || []
			}
			# ap hash
			collection.insert(hash)
		end
	end
end

def start_parse(cookbook)
	File.open('cookbook.txt','r') do |x|
	recipe = {:title=> ''}
	count = 0
		while line = x.gets
			if (!recipe[:directions].nil? && line.gsub(' ','').chomp.length == 0)
				cookbook.build_recipe(recipe)
				recipe = {:title=> ''}
			end
			if (line.unindent[0..6] =='<title>') && (line.unindent[0..14] != '<title>Category') && (line.unindent[0..10] != '<title>User') && (line.unindent[0..10] != '<title>File')
				title = line.unindent[7..-10]
				recipe[:title] = title
			end

			recipe[:description] = [] if(line.unindent[0..16] == "== Description ==")
			if(line.unindent[0] =='*') && !recipe[:description].nil?
				recipe[:description].push(line.unindent[2..-1].chomp)
			end

			recipe[:ingredients] = [] if(line.unindent[0..16] == "== Ingredients ==")
			if(line.unindent[0] =='*') && !recipe[:ingredients].nil?
				recipe[:ingredients].push(line.unindent[2..-1].chomp)
			end

			recipe[:directions] = [] if(line.unindent[0..15] == "== Directions ==")
			if(line.unindent[0] =='#') && !recipe[:directions].nil?
				recipe[:directions].push(line.unindent[2..-1].chomp)
			end
		break if count == 14844
		#76365
		count += 1
		end
	end
end
# cookbook = Recipebook.new
# start_parse(cookbook)
# # cookbook.titles
# cookbook.build_relations
# cookbook.send_to_mongodb(mongo_collection)
# # coll.find({key:  12}).first['ingredient_array']