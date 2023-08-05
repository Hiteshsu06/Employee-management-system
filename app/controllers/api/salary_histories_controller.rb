class Api::SalaryHistoriesController < ApplicationController
  before_action :set_salary_history, only: %i[ update ]

  def monthly_salary
    #Logs data for particular month and user
    current_date = Date.today
    last_day_previous_month = current_date.beginning_of_month.prev_day #first day of the current month
    first_day_previous_month = last_day_previous_month.beginning_of_month #the first day of the previous month
    @user_id = params[:user_id]
    @user = User.find(@user_id)
    @logs = Log.where(clock_in: true, clock_out: true, user_id: @user_id, created_at: first_day_previous_month...last_day_previous_month)
    @log_hours = 0;
    @logs.each do |log|
      @log_hours = @log_hours + log.time_stamp
    end
    @log_hours = (@log_hours / 3600)

    #Default Salary of particular user
    @user_salary = Salary.where(user_id: params[:user_id])[0]

    #Net salary
    @net_salary =  (@user_salary.amount / 30) * @log_hours
    render json: {
      status:{
        code: 200, 
        message:'Monthly salary details has been fetched successfully',
        data: {
          basic_salary: @user_salary.amount,
          net_salary: @net_salary,
          user_name: @user.name,
          user_roll: @user.roll_name,
          time_duration: {
            start_date: first_day_previous_month,
            end_date: last_day_previous_month
          }}
        }
    }
  end

  def yearly_salary
     #Logs data for particular month and user
     current_date = Date.today
     start_date = Date.new(current_date.year - 1, 4, 1)
     end_date = Date.new(current_date.year, 3, 1)

     # Get the previous year
     @user_id = params[:user_id]
     @user = User.find(@user_id)
     @logs = Log.where(clock_in: true, clock_out: true, user_id: @user_id, created_at: start_date...end_date)
     @log_hours = 0;
     @logs.each do |log|
       @log_hours = @log_hours + log.time_stamp
     end
     @log_hours = (@log_hours / 3600)
 
     #Default Salary of particular user
     @user_salary = Salary.where(user_id: params[:user_id])[0]
 
     #Net salary
     @net_salary =  (@user_salary.amount / 30) * @log_hours
     render json: {
       status:{
         code: 200, 
         message:'Yearly salary has been added successfully',
         data: {
           basic_salary: @user_salary.annual_package,
           net_salary: @net_salary,
           user_name: @user.name,
           user_roll: @user.roll_name,
           time_duration: {
             start_date: start_date,
             end_date: end_date
           },
 
         }
         }
     }
  end

  # POST /salary_histories
  def create
    @salary_history = SalaryHistory.new(salary_history_params)

    if @salary_history.save
      render json: @salary_history, status: :created, location: @salary_history
    else
      render json: @salary_history.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /salary_histories/1
  def update
    if @salary_history.update(salary_history_params)
      render json: @salary_history
    else
      render json: @salary_history.errors, status: :unprocessable_entity
    end
  end

  # DELETE /salary_histories/1
  def destroy
    @salary_history.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_salary_history
      @salary_history = SalaryHistory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def salary_history_params
      params.require(:salary_history).permit(:user_id, :amount, :start_date, :end_date, :salary_id)
    end
end
