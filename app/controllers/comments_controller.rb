class CommentsController < ApplicationController
  before_action :confirm_logged_in
  def create
    find_commentable.comments.build(comment_params.merge user_id: session[:user_id]).save
    if @comment.save
      flash[:success] = "Congrats! You added a comment, bro."    
    else
      flash[:alert] = "No comment for you."      
    end
    redirect_to :back, flash: {success: "Thanks for the comment."}
  end

  def show_on_click
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
