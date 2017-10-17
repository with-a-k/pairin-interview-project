Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      post 'survey/create'
      put 'survey/update'
    end
  end

  namespace :api do
    namespace :v1 do
      post 'users/create'
      get 'users/show/:id'
    end
  end

  get 'landing/index'

  get 'survey/index'

  resources :users, only: [:create]
  resources :surveys, only: [:create, :edit, :update]

  post '/signin', to: 'session#create'
  get '/signout', to: 'session#destroy'
  root 'landing#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
