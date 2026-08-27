import os
import sys

# Vercel ejecuta la funcion con la base del proyecto (/var/task) en sys.path,
# no el directorio de este fichero, asi que "models", "core" y "schemas" no se
# encuentran. En local si funcionan porque uvicorn arranca dentro de api/.
# Anadir este directorio explicitamente cubre los dos entornos.
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, Body, Depends, HTTPException, status
from core.database import engine, get_session
from models.tarea import Tarea
from sqlmodel import SQLModel, Session, select
from schemas.tarea import CreateTaskRequests
import uuid
from models.tarea import StatusTarea

app = FastAPI(root_path="/api")
SQLModel.metadata.create_all(engine)

@app.get("/")
async def root():
    return {
        "message": "api arriba. ✅"
    }

@app.post("/tasks/create", status_code=status.HTTP_201_CREATED)
async def create_task(tarea: CreateTaskRequests, 
                    session: Session = Depends(get_session)):
    try: 
        new_task = Tarea(**tarea.model_dump(exclude_none=True))
        session.add(new_task)
        session.commit()
        session.refresh(new_task)
        return { 
            "status": "tarea creada. ✅",
            "tarea": new_task
        }
    except Exception as e:
        return {
            "error": f"e"
        }

@app.get("/tasks", status_code=status.HTTP_200_OK)
async def all_tasks(session: Session = Depends(get_session)): 
    try: 
        statement = select(Tarea)
        data = session.exec(statement).all()
        return data
    except Exception as e: 
        return { 
            "error": f"{e}"
        }


@app.patch('/tasks/complete', status_code=status.HTTP_200_OK)
async def complete_task(id: uuid.UUID = Body(..., embed=True),
                        estado: StatusTarea = Body(StatusTarea.COMPLETADA, embed=True),
                        session: Session = Depends(get_session)):
    task = session.get(Tarea, id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Tarea no encontrada.")

    task.status = estado
    session.commit()
    session.refresh(task)
    return {
        "status": "tarea actualizada. ✅",
        "tarea": task
    }