from sqlmodel import create_engine, Session
from dotenv import load_dotenv
import os

# En local lee api/.env; en Vercel las variables ya vienen del entorno.
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError(
        "Falta DATABASE_URL. En local va en api/.env; "
        "en Vercel hay que declararla en Project Settings > Environment Variables."
    )

# pool_pre_ping descarta conexiones muertas: entre invocaciones de la funcion
# el Postgres puede haber cerrado la conexion que quedo en el pool.
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

def get_session(): 
    with Session(engine) as session:
        yield session
