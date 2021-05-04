Rails.application.routes.draw do
  resources :notices
  post 'sessions', to: 'sessions#create'
  delete 'sessions', to: 'sessions#destroy'
  post 'sessions/token', to: 'sessions#identify'
  # resources :sessions
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
