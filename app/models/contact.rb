class Contact < ApplicationRecord
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, allow_blank: true } 
end
