Rails.application.routes.draw do
  
  namespace :alter do
    resources :posts
  end
  #devise users
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
 
  #user routes
  namespace :api do
     #get all employee amd human resource list
      get "/users/employees", to: "users#employee"
      get "/users/human_resources", to: "users#human_resource"
      get "/users_count", to: "users#user_count"
     resources :users do
      resources :logs
      resources :salaries
      get "/salary_histories/monthly", to: "salary_histories#monthly_salary"
      get "/salary_histories/yearly", to: "salary_histories#yearly_salary"
     end
     resources :projects do
         resources :tasks
    end
  end
 
end
