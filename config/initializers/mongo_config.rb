# MongoMapper.connection = Mongo::Connection.new('localhost', 27017)

# MongoMapper.database = "eat_it_app_#{Rails.env}"
# # MongoMapper.database = "appname-#{Rails.env}"

# # MongoMapper.database = "eat_it_app_development"


if ENV["MONGOHQ_URL"]
 uri = URI.parse(ENV["MONGOHQ_URL"])
 MongoMapper.connection = Mongo::Connection.from_uri(ENV["MONGOHQ_URL"])
 MongoMapper.database = uri.path.gsub(/^\//, '')
else
 MongoMapper.connection = Mongo::Connection.new('localhost')
 MongoMapper.database = "eat_it_app_#{Rails.env}"
end