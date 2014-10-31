class Recipe
  include MongoMapper::Document
  key :key, Fixnum
  key :title, String
  key :ingredient, String
  key :ingredient_array, Array
  key :match, String
end
