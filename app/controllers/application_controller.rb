class ApplicationController < ActionController::Base
  # Disable CSRF checks for API calls
  # https://api.rubyonrails.org/v6.0/classes/ActionController/RequestForgeryProtection.html
  protect_from_forgery unless: -> { request.format.json? }
end
