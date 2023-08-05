class Api::SalariesController < ApplicationController
  before_action :set_salary, only: %i[ show update destroy ]

  # GET /salaries
  def index
    @user = User.find(params[:user_id])
    render json:user.salary
  end

  # GET /salaries/1
  def show
    render json: @salary
  end

  # POST /salaries
  def create
    @salary = Salary.new(salary_params)

    if @salary.save
      render json: {
        status:{
          code: 200, 
          message:'Salary has been added successfully'
          }
      }
    else
      render json:{
        status: { message: 'Salary could not be created successfully'} , 
        status: :unprocessable_entity,
        errors: @salary.errors
         }
    end
  end

  # PATCH/PUT /salaries/1
  def update
    if @salary.update(salary_params)
      render json: @salary
    else
      render json: @salary.errors, status: :unprocessable_entity
    end
  end

  # DELETE /salaries/1
  def destroy
    @salary.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_salary      
      @salary = Salary.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def salary_params
      params.require(:salary).permit(:user_id, :annual_package, :amount, :start_date, :end_date)
    end
end
