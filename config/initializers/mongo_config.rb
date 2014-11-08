MongoMapper.connection = Mongo::Connection.new('localhost', 27017)

MongoMapper.database = "eat_it_app_#{Rails.env}"
# MongoMapper.database = "appname-#{Rails.env}"

# MongoMapper.database = "eat_it_app_development"