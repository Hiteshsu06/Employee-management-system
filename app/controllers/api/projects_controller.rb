class Api::ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show update destroy ]

  # GET /projects
  def index
    @projects = Project.all
    render json: @projects 
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    if @project.save
      render json: {
        status:{
          code: 200, 
          message:'Project has been created successfully'
          }
      }
    else
      render json:{
        status: { message: 'Project could not be created successfully'} , 
        status: :unprocessable_entity,
        errors: @project.errors
         }
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      render json: {
        status:{
          code: 200, 
          message:'Project has been updated successfully'
          }
      }
    else
      render json:{
        status: { message: 'Project could not be updated successfully'} , 
        status: :unprocessable_entity,
        errors: @project.errors
         }
    end
  end

  # DELETE /projects/1
  def destroy
    if @project.destroy
      render json:{
        status:{
          code: 200, 
          message:'Project has been deleted successfully'}
      }
    else
      render json:{
        errors: @project.errors
      }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_params
      params.require(:project).permit(:project_name, :current_date, :project_status)
    end
end
