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
      "https://www.zillow.com/webservice/GetDemographics.htm?zws-id=X1-ZWz1e2kpo0z8cr_60bkd&",
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
      "https://api.wunderground.com/api/acf7fb055f9d4a5d/geolookup/q/#{state}/#{wu_city}.json",
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

  def save_hood
    name = params[:name]
    city = params[:city]
    state = params[:state]
    Hood.create(name:name, city:city, state:state)
    redirect_to map_path
  end

  def favorites
    @user = User.find session[:user_id]
    @hoods = @user.search
  end

  def add_fav 
    user = User.find session[:user_id]
    hood = Hood.find_by name: params[:neighborhood], city: params[:city]
    hood_id = hood.id
    Search.create(user_id:user, hood_id:hood_id, is_fav:true)
    render nothing: true
  end

  def remove_fav

  end

end
