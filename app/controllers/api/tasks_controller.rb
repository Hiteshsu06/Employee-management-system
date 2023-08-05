class Api::TasksController < ApplicationController
  before_action :set_task, only: %i[ show update destroy ]

  # GET /tasks
  def index
    project = Project.find(params[:project_id])
    tasks = project.tasks
    render json: tasks
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)
    if @task.save
      render json: {
        status:{
          code: 200, 
          message:'Task has been created successfully'
          }
      }
    else
      render json:{
        status: { message: 'Task could not be created successfully'} , 
        status: :unprocessable_entity,
        errors: @task.errors
         }
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: {
        status:{
          code: 200, 
          message:'Task has been updated successfully'
          }
      }
    else
      render json:{
        status: { message: 'Task could not be updated successfully'} , 
        status: :unprocessable_entity,
        errors: @task.errors
         }
    end
  end

  # DELETE /tasks/1
  def destroy
    if @task.destroy
      render json:{
        status:{
          code: 200, 
          message:'Task has been deleted successfully'}
      }
    else
      render json:{
        errors: @task.errors
      }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:project_id, :task_name, :task_status)
    end
end
