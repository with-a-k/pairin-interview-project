Rails.application.routes.draw do

  resources :users, only: [:create]
  resources :surveys, only: [:create, :edit, :update]

  post '/signin', to: 'session#create'
  get '/signout', to: 'session#destroy'
  root 'landing#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
