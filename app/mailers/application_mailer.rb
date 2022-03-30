class ApplicationMailer < ActionMailer::Base
  default to: "EZfit@gmail.com", from: 'EZfit@gmail.com'
  layout 'mailer'
end
