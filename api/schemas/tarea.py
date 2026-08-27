from pydantic import BaseModel
from models.tarea import StatusTarea

class CreateTaskRequests(BaseModel): 
    title: str
    status: StatusTarea