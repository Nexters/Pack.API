require "capistrano/node-deploy"

set :application, "Pack.API"
set :repository,  "git@github.com:Nexters/Pack.API.git"
set :user, "root"
set :scm, :git
set :deploy_to, "/home/ubuntu/Pack.API"

role :app, "54.199.171.240"

set :app_command, "server.js"
set :node_env, "development"
set :node_user, "root"
set :app_environment, "PORT=3001"

namespace :node do
  task :start do
    run "cd #{deploy_to}/current && PORT=3001 NODE_ENV=development forever --debug start server.js"
  end
  task :restart do
    run "cd #{deploy_to}/current && PORT=3001 forever restart server.js"
  end
  task :stop do
    run "cd #{deploy_to}/current && PORT=3001 forever stop server.js"
  end
end

namespace :node do
  task :install_packages do
    run "cd #{fetch(:latest_release)} && npm install"
  end
end