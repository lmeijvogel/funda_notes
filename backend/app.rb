require 'sinatra'
require 'sinatra/reloader'

require 'json'
require 'sqlite3'

$users = File.read("passwords.txt").each_line.map(&:strip)

puts $users.inspect

before do
  ensure_authorized!

  headers cors_headers.merge({
    "Content-Type" => "application/json"
  })
end

get "/objects" do
  all_data.to_json
end

options "/objects" do
  status 204
end

options "/objects/:id" do
  status 204
end

get "/objects/:id" do
  with_db do |db|
    row = db.get_first_row("SELECT id, description FROM objects WHERE id=?", [params[:id]])

    if row.nil?
      status 404
      return
    end

    {
      id: row[0],
      description: row[1]
    }.to_json
  end
end

put "/objects/:id" do
  data = JSON.parse(request.body.read)

  with_db do |db|
    db.execute("INSERT INTO objects(id,description) VALUES(?, ?) ON CONFLICT(id) DO UPDATE SET description=?",
               [params["id"], data["description"], data["description"]]);
  end

  status 204
end

def ensure_authorized!
  return true if request.options?

  return if authorized?
  headers['WWW-Authenticate'] = 'Basic realm="Restricted Area"'
  halt 401, "Not authorized\n"
end

def authorized?
  @auth ||=  Rack::Auth::Basic::Request.new(request.env)

  return false if !@auth.provided?
  return false if !@auth.basic?
  return false if !@auth.credentials

  $users.include?(@auth.credentials.join(":"))
end

def cors_headers
  {
    "Access-Control-Allow-Origin" => "*",
    "Access-Control-Allow-Methods" => "GET, PUT, POST",
    "Access-Control-Allow-Headers" => "Content-Type,Authorization",
  }
end

def all_data
  with_db do |db|
    result = {}

    db.execute("SELECT id,description from objects") do |row|
      result[row[0]] = row[1];
    end

    result
  end
end

def with_db
  db = SQLite3::Database.open("db.sqlite3")

  yield db
ensure
  db.close if db
end
