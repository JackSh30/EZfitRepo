require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get root_url
    assert_response :success

    assert_select 'title', 'EZfit'
    assert_select 'h1', 'EZfit'
    assert_select 'p', 'Welcome to EZfit!'

  end

end
