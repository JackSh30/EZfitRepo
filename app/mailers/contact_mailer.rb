class ContactMailer < ApplicationMailer
  def contact_email(email, name, telephone, message)
    @email = email
    @name = name
    @telephone = telephone
    @message = message
    mail cc: @email
  end

  def welcome_email
    @user = params[:user]
    @url  = 'https://ezfit-fitness.herokuapp.com/users/sign_in'
    mail(to: @user.email, subject: 'Welcome to EZfit!')
  end
end
