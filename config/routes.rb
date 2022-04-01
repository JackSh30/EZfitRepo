Rails.application.routes.draw do
  devise_for :users
  root 'home#home'

  #get 'ptchat', to: ''
  get 'ezmuscle', to: 'ezmuscle#ezmuscle'
  get 'calendar', to: 'calendar#calendar'
  get 'gymfinder', to: 'gymfinder#gymfinder'
  get 'contact', to: 'home#contact'
  post 'request_contact', to: 'home#request_contact'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
