# Preview all emails at http://localhost:3000/rails/mailers/contact_mailer
class ContactMailerPreview < ActionMailer::Preview
  def contact_email
    ContactMailer.contact_email("example@gmail.com",
    "John Doe", "1234567890", @message = "Hello")
  end
end
