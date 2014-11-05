ENV['APP_ENV'] = 'test'

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