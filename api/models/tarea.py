from sqlmodel import SQLModel, Field
import uuid
from sqlalchemy import Column, Enum as SAEnum
from enum import StrEnum

class StatusTarea(StrEnum): 
    COMPLETADA = "completada"
    POR_HACER = "por_hacer"

class Tarea(SQLModel, table=True): 
    __tablename__ = "tareas"
    id: uuid.UUID = Field(..., default_factory=uuid.uuid1, primary_key=True)
    title: str = Field(...)
    status: StatusTarea = Field(
        default=StatusTarea.POR_HACER,
        sa_column=Column(
            SAEnum(
                StatusTarea,
                name="statustarea_enum",  
                native_enum=False       
            ),
            nullable=False
        )
    )