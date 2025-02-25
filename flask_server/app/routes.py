import json

from flask import request, jsonify, Response
from .models.API import *
from .models.Expense import Expense

# Dataset data

date_format = "%Y-%m-%d"

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



    @app.route('/expenses/', methods=['POST'])
    def insert_new_expense():
        """Insert a new expense in the database"""
        if request.method == "POST":
            data = request.get_json() or request.form.to_dict()

            amount = int(data['amount'])
            date = datetime.strptime(data['date'], date_format)
            tag = data['tag']
            who = data['who']
            method = data['method']
            desc = data['desc']
            category = data['category']
            extra = (data['extra'])

            if amount < 0:
                return jsonify({"error": "Amount must be positive"}), 500
            if not date:
                return jsonify({"error": "Date not provided or error in formatting (%d-%m-%Y %H:%M)"}), 500

            if not (date and tag and who and method and desc and category):
                return jsonify({"error": "Some fields are missing"}), 500

            new_expense = Expense(amount, category, desc, date, tag, who, method, extra)
            print( insert_expense(new_expense) )
            return  new_expense.__repr__()# restituisce i dati in formato JSON
        else:
            return "Richiesta POST, ricevuta GET"


    @app.route('/expenses/', methods=['GET'])
    def get_exp():
        json_data = json.dumps(get_expenses(), default=custom_serializer)
        print(get_expenses())
        return Response(json_data, mimetype='application/json')


# --------------- BAR CHARTS ROUTES -----------------------#
    @app.route('/chart/tags/', methods=['GET'])
    def get_chart_tags():
        db_data = get_tags_aggregate()
        return jsonify(list(db_data))


# ------------ GAUGE CHARTS ROUTES -------------------------#

    ## Send extra percentage out of the total spending
    @app.route('/chart/extrap/', methods=['GET'])
    def get_extra():
        db_data = list(get_extra_ratio())
        if len(db_data)>2:
            ratio = ((db_data[0])['total_amount'] / (db_data[1])['total_amount'])
            return ratio

        else:
            return "not enough data",509

    ## Send the percentage of fixed spending out of the total
    ## TODO: dopo la creazione dell ownings page
    @app.route("/chart/fixedp/", methods=['GET'])
    def send_fixed_percentage():
        return str(0.11)

    ## Sends the percentage of the monthly spending out of the heritage
    ## TODO: dopo la creazione dell ownings page
    @app.route("/chart/totalp/", methods=['GET'])
    def send_total_percentage():
        return str(0.1)