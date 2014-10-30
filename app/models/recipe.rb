class Recipe
  include MongoMapper::Document
  key :key, String
  key :title, String
  key :ingredient, String
  key :ingredient_array, String
  key :match, String
end
