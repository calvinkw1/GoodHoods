class CommentsController < ApplicationController
  before_action :confirm_logged_in
  def create
    find_commentable.comments.build(comment_params).save
    redirect_to :back, flash: {success: "Thanks for the comment"}
  end

  def show_on_click
  end

  def edit 
  end

  def delete
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
