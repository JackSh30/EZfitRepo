require 'test_helper'

class ContactMailerTest < ActionMailer::TestCase
  test "should return contact email" do
    mail = ContactMailer.contact_email("example@gmail.com",
    "John Doe", "1234567890", @message = "Hello")
    assert_equal ['EZfit@gmail.com'], mail.to
    assert_equal ['EZfit@gmail.com'], mail.from
  end
end
