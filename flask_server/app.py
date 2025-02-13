from flask import Flask, json
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # This will allow CORS for all routes
## --------------------------------------------------------- ##

# Dataset data
data_ds = [
    {"id": 0, "User": "Home", "Amount": 12.3, "Class": "@fat", "Date": "1-2-2024", "Method": "883-b"},
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
    return send_json(data_gauge_extra)

## Send the percentage of fixed spending out of the total
@app.route("/chart/fixedpercentage")
def send_fixed_percentage():
    return send_json(data_gauge_fixed)

## Sends the percentage of the monthly spending out of the heritage
@app.route("/chart/totalpercentage")
def send_total_percentage():
    return send_json(data_gauge_total)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)