class MainController < ApplicationController
  require 'json'

  def map
    @found_user = User.find session[:user_id]
  end

  def search
    city = params[:city]
    state = params[:state]
    request = Typhoeus::Request.new(
      # ZWIS ID  X1-ZWz1e2kpo0z8cr_60bkd
      "http://www.zillow.com/webservice/GetDemographics.htm?zws-id=X1-ZWz1e2kpo0z8cr_60bkd&",
      method: :get,
      params: {
        city: city,
        state: state
      }
    )
    request.run
    @data = Hash.from_xml(request.response.body).to_json
    respond_to do |format|
      format.html
      format.json { render json: @data }
    end
  end

end
