from flask import request, jsonify
from .db import db
from .models.API import *
# Dataset data
data_ds = [
    {"id": 0, "User": "Home", "Amount": 122.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},
    {"id": 1, "User": "Home", "Amount": 12.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},
    {"id": 2, "User": "Home", "Amount": 12.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},
    {"id": 3, "User": "Home", "Amount": 12.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},
    {"id": 4, "User": "Home", "Amount": 12.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},
    {"id": 5, "User": "Home", "Amount": 12.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},
    {"id": 6, "User": "Home", "Amount": 12.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},
    {"id": 7, "User": "Home", "Amount": 12.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},
    {"id": 8, "User": "Home", "Amount": 12.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},
    {"id": 9, "User": "Home", "Amount": 12.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},

]

## Bar charts
data_chart = [
    {"label": 'Tabacco', "value": 40},
    {"label": 'Bollette', "value": 80},
    {"label": 'Casa', "value": 45},
    {"label": 'Cibo', "value": 60},
    {"label": 'Vestiti', "value": 20},
    {"label": 'Extra', "value": 90},
    {"label": 'Animali', "value": 50},
]

## Gauge charts data
data_gauge_total = 0.4
data_gauge_extra = 0.2
data_gauge_fixed = 0.4

## --------------------------------------------------------- ##

## General function to send a json
def send_json(data):
    if data is not None:
        return data
    else:
        return []
def init_routes(app):
    ## Send the dataset entries to the frontend
    @app.route("/ds/all")
    def send_ds():
        return send_json(data_ds)

    ## Send method barchart data
    @app.route("/chart/method")
    def send_method_chart():
        return send_json(data_chart)

    ## Send the percentage of extras out the total spending
    @app.route("/chart/extrapercentage")
    def send_extra_percentage():
        return str(data_gauge_extra)

    ## Send the percentage of fixed spending out of the total
    @app.route("/chart/fixedpercentage")
    def send_fixed_percentage():
        return str(data_gauge_fixed)

    ## Sends the percentage of the monthly spending out of the heritage
    @app.route("/chart/totalpercentage")
    def send_total_percentage():
        return str(data_gauge_total)

    @app.route("/dev/post", methods=["POST"])
    def send_some_data():
        if request.method == "POST":
            data = request.get_json() or request.form.to_dict()
            print(data)
            return jsonify(request.data)  # restituisce i dati in formato JSON
        else:
            return "Richiesta POST, ricevuta GET"

    @app.route('/ds/all', methods=['GET'])
    def get_collection():
        """Example of fetching documents from MongoDB"""
        collection = db.test_collection
        data = get_expenses()

        return jsonify(data)


