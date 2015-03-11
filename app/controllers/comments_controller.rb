class CommentsController < ApplicationController
  require 'json'
  # before_action :confirm_logged_in
  def create
    find_commentable.comments.build(comment_params.merge user_id: session[:user_id]).save
    if @comment.save
      flash[:success] = "Congrats! You Added A Comment Bro."    
    else
      flash[:alert] = "No Comment for You"      
    end
    redirect_to :back, flash: {success: "Thanks for the comment"}
  end

  def show_on_click
    content = params[:content]
    id = params[:id]

    hood = Hood.find_by_id(params[:id])
    @comments = hood.comments


  end

  def edit 
  end

  def delete
    comment = Comment.find(params[:id]).destroy
    redirect_to :back
  end
  private 
    def comment_params
      params.require(:comment).permit(:content)
    end
    def find_commentable
      params.each do |name, value|
        if name =~ /(.+)_id$/
          return $1.classify.constantize.find(value)
        end
      end
      nil
    end
end
