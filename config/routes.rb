Rails.application.routes.draw do

  namespace :api, defaults: { :format => 'json' } do
    namespace :v1 do
      post 'survey/', to: 'survey#create'
      put 'survey', to: 'survey#update'
      post 'users/', to: 'users#create'
      get 'users/', to: 'users#index'
    end
  end

  root 'landing#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
