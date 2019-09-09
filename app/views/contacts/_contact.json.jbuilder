json.extract! contact, :id, :name, :email, :twitter, :phone, :created_at, :updated_at
json.url contact_url(contact, format: :json)
