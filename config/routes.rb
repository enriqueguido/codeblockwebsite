Rails.application.routes.draw do
  

  

  root 'home#index'
  get 'home/index', to: 'home#index'

  #Headers
  get 'headers/gradient'
  get 'headers/solidcolor'
  get 'headers/parallax'
  get 'headers/typing'
  get 'headers/backgroundimage'

  #Pages
  get 'pages/About'
  get 'pages/Portfolio'
  get 'pages/PortfolioDetails'
  get 'pages/Blog'
  get 'pages/BlogDetails'
  get 'pages/BlogGrid'
  get 'pages/Testmonial'
  get 'pages/Gallery'
  get 'pages/Team'
  get 'pages/Client'
  get 'pages/Form'
  get 'pages/Footers'
  get 'pages/Tabs'
  get 'pages/Accordion'
  get 'pages/Progressbar'
  get 'pages/Countdown'
  get  'pages/Buttons'
  get  'pages/ListStyle'
  get  'pages/Feature'
  get 'pages/Login'
  get 'pages/Register'
  get 'pages/CommingSoon'
  get 'pages/Contact'
  get 'pages/error'

end
