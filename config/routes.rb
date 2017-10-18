Rails.application.routes.draw do

  namespace :api, defaults: { :format => 'json' } do
    namespace :v1 do
      post 'survey', to: 'surveys#create'
      put 'survey', to: 'surveys#update'
      post 'users/', to: 'users#create'
      get 'users/', to: 'users#index'
    end
  end

  root 'landing#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
