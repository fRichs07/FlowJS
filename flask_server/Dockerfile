FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

ENV FLASK_APP=app.py

COPY . .

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--debug"]
