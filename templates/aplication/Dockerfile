FROM python:latest

WORKDIR /usr/src/app

COPY . .

RUN pip install --no-cache-dir -r requerimientos.txt

ENTRYPOINT ["python"]

CMD ["app.py"]
EXPOSE 5000