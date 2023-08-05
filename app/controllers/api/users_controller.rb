class Api::UsersController < ApplicationController
  before_action :find_user, only: %i[ show update destroy ]

  def employee
    @users = User.where(roll_name: "EMPLOYEE")
    render json: {
      status:{
        code: 200, 
        message:'All employee fetched successfully', 
        data: ActiveModelSerializers::SerializableResource.new(@users, each_serializer:  UserSerializer)
      }
    }
  end

  def human_resource
    @users = User.where(roll_name: "HUMAN_RESOURCE")
    render json:{
      status:{
        code: 200,
        message:'All human resource fetched successfully', 
        data: ActiveModelSerializers::SerializableResource.new(@users, each_serializer:  UserSerializer)}
    }
  end

  def show
    @user = User.find(params[:id])
    render json:{
      status:{
        code: 200, 
        message:'User data has been fetched successfully',
        data: @user}
    }
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: {
            status:{
              code: 200, 
              message:'User has been created successfully'
              }
          }
    else
      render json:{
        status: { message: 'User could not be created successfully'} , 
        status: :unprocessable_entity,
        errors: @user.errors
         }
    end
  end

  # PATCH/PUT /users/index
  def update
    @user = find_user
    if @user.update(user_params)
      render json: @user, serializer: UserSerializer, status: :accepted
    else
      render json:{
        status: { message: 'User updated successfully'} , 
        status: :unprocessable_entity,
        errors: @user.errors
         }
    end
  end

  #CountApi / employee / human resource / salary
  def user_count
    @total_salary = Salary.sum(:amount)
    render json:{
      data: {
        employee: User.where(roll_name: "EMPLOYEE").count,
        human_resource: User.where(roll_name: "HUMAN_RESOURCE").count,
        admin: User.where(roll_name: "SUPER_ADMIN").count,
        total_salary: @total_salary
        }
    }
  end

  # DELETE /users/1
  def destroy
    if @user.destroy
      render json:{
        status:{
          code: 200, 
          message:'User has been deleted successfully'}
      }
    else
      render json:{
        errors: @user.errors
      }
    end
  end

  private

  def find_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :name, :address, :roll_name, :image)
  end

end
