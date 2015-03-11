Rails.application.routes.draw do

  root 'users#login'

  get 'login', to: "users#login", as: 'login'

  get 'signup', to: "users#signup", as: 'signup'

  post 'login', to: "users#attempt_login"

  get 'about', to: "main#about", as: 'about'

  post 'signup', to: "users#create"

  get 'home', to: "users#home", as: 'home'

  delete 'logout', to: "users#logout", as: "logout"

  get '/main/map'

  post 'main', to: "comments#create", as: "comment"

  get '/main', to: 'main#map', as: 'map'

  get '/search', to: 'main#search', as: 'search'

  post '/save', to: 'main#save_hood', as: 'save'

  #### RAKE ROUTES ####

  #   Prefix Verb   URI Pattern         Controller#Action
  #     root GET    /                   users#login
  #    login GET    /login(.:format)    users#login
  #   signup GET    /signup(.:format)   users#signup
  #          POST   /login(.:format)    users#attempt_login
  #    about GET    /about(.:format)    main#about
  #          POST   /signup(.:format)   users#create
  #     home GET    /home(.:format)     users#home
  #   logout DELETE /logout(.:format)   users#logout
  # main_map GET    /main/map(.:format) main#map
  #      map GET    /main(.:format)     main#map
  #   search GET    /search(.:format)   main#search

end
