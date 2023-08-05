class Api::LogsController < ApplicationController
  before_action :set_log, only: %i[ show update destroy ]

  # GET /logs
  def index
    @logs = Log.all
    render json: @logs
  end

  # GET /logs/1
  def show
    render json: @log
  end

  # POST /logs
  def create
    @log = Log.new(log_params)
    if @log.save
      render json: {
        status:{
          code: 200, 
          message:'Clock In successfully',
          data: @log
          }
      }
    else
      render json:{
        status: { message: 'Log error'} , 
        status: :unprocessable_entity,
        errors: @project.errors
         }
    end
  end

  # PATCH/PUT /logs/1
  def update
    if @log.update(log_params)
      render json: {
        status:{
          code: 200, 
          message:'Clock out successfully'
          }
      }
    else
      render json:{
        status: { message: 'Log error'} , 
        status: :unprocessable_entity,
        errors: @log.errors
         }
    end
  end

  # DELETE /logs/1
  def destroy
    @log.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_log
      @log = Log.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def log_params
      params.require(:log).permit(:user_id, :time_stamp, :clock_in, :clock_out)
    end
end
