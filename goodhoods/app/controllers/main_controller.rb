class MainController < ApplicationController
  require 'json'

  def map
    @found_user = User.find session[:user_id]
  end

  def about
    @found_user = User.find session[:user_id]
  end

  def search
    city = params[:city]
    wu_city = params[:city].squish.downcase.tr(" ","_")
    state = params[:state]
    neighborhood = params[:neighborhood]
    requestZillow = Typhoeus::Request.new(
      # ZWIS ID  X1-ZWz1e2kpo0z8cr_60bkd
      "http://www.zillow.com/webservice/GetDemographics.htm?zws-id=X1-ZWz1e2kpo0z8cr_60bkd&",
      method: :get,
      params: {
        city: city,
        neighborhood: neighborhood,
        state: state
      }
    )
    requestZillow.run
    @zillowData = JSON.parse(Hash.from_xml(requestZillow.response.body).to_json)
    requestWeather = Typhoeus::Request.new(
      "http://api.wunderground.com/api/acf7fb055f9d4a5d/geolookup/q/#{state}/#{wu_city}.json",
      method: :get
    )
    requestWeather.run
    @weatherData = JSON.parse(requestWeather.response.body)
    respond_to do |format|
      format.html
      format.json { render json: {
        :zillowData => @zillowData,
        :weatherData => @weatherData 
        }
      }
    end
  end

end
