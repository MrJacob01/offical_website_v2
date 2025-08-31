# app/database.py
from sqlalchemy import create_engine 
from sqlalchemy.orm import declarative_base, sessionmaker

# PostgreSQL DATABASE URL Format:
# postgresql://<username>:<password>@<host>:<port>/<database_name>
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:root@localhost:5432/tgshop"

engine = create_engine(SQLALCHEMY_DATABASE_URL, future=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
