import json

from flask import request, jsonify, Response
from app.API import *
from .models.Accounts import Accounts
from .models.Expense import Expense
from .models.Method import Method
from .models.Recurrent_Expense import RecurrentExpense
from .models.Tag import Tag
from .models.Who import Who

date_format = "%Y-%m-%d"

def init_routes(app):

    # ---------------------------------------------------------------------- #
    # ---------------------------- Expenses -------------------------------- #
    # ---------------------------------------------------------------------- #

    # Expenses

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
            extra = bool(data['extra'])

            if amount < 0:
                return jsonify({"error": "Amount must be positive"}), 500
            if not date:
                return jsonify({"error": "Date not provided or error in formatting (%d-%m-%Y %H:%M)"}), 500

            if not (date and tag and who and method and desc):
                return jsonify({"error": "Some fields are missing"}), 500

            new_expense = Expense(amount, desc, date, tag, who, method, extra)
            insert_expense(new_expense)
            print(new_expense.to_dict())

            return jsonify({"success": True}),200
        else:
            return "Richiesta POST, ricevuta GET"


    @app.route('/expenses/', methods=['GET'])
    def get_exp():
        json_data = json.dumps(get_expenses(), default=custom_serializer)
        return Response(json_data, mimetype='application/json')

    # Recurrent Expenses
    @app.route('/rec_expenses/', methods=['POST'])
    def insert_new_rec_expense():
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
            extra = data['extra']
            cadency = int(data['cadency'])
            tag_id = int(data['tag_id'])
            method_id = int(data['method_id'])
            who_id = int(data['who_id'])

            if amount < 0:
                return jsonify({"error": "Amount must be positive"}), 500
            if not date:
                return jsonify({"error": "Date not provided or error in formatting (%d-%m-%Y %H:%M)"}), 500

            if not (date and tag and who and method and desc and category):
                return jsonify({"error": "Some fields are missing"}), 500

            new_expense = RecurrentExpense(amount, desc, date, tag, who, method, extra, cadency, tag_id, method_id, who_id)
            insert_recurrent_expense(new_expense)
            return  new_expense.__repr__()# restituisce i dati in formato JSON
        else:
            return "Richiesta POST, ricevuta GET"


    @app.route('/rec_expenses/', methods=['GET'])
    def get_rec_exp():
        json_data = json.dumps(get_rec_expenses(), default=custom_serializer)
        print(get_rec_expenses())
        return Response(json_data, mimetype='application/json')

    # --------------------------------------------------------------------- #
    # ------------------------------ Tag ---------------------------------- #
    # --------------------------------------------------------------------- #
    @app.route('/tags/', methods=['GET'])
    def get_tag():
        json_data = json.dumps(get_tags(), default=custom_serializer)
        return Response(json_data, mimetype='application/json')

    @app.route('/tags/', methods=['POST'])
    def insert_tag():
        if request.method == "POST":
            data = request.get_json() or request.form.to_dict()

            if data is None:
                return jsonify({"error": "No data provided"}), 500

            name = data['name']
            new_tag = Tag(-1,name)
            insert_tags(new_tag)
        return None

    # ------------------------------------------------------------------- #
    # ---------------------------- User --------------------------------- #
    # ------------------------------------------------------------------- #

    @app.route('/users/', methods=['GET'])
    def get_usrs():
        json_data = json.dumps(get_users(), default=custom_serializer)
        return Response(json_data, mimetype='application/json')

    @app.route('/users/', methods=['POST'])
    def insert_usrs():
        if request.method == "POST":
            data = request.get_json() or request.form.to_dict()

            if data is None:
                return jsonify({"error": "No data provided"}), 500

            name = data['name']
            new_user = Who(-1, name)

            insert_users(new_user)
        return None

    # ---------------------------------------------------------------------- #
    # ---------------------------- Methods --------------------------------- #
    # ---------------------------------------------------------------------- #

    @app.route('/methods/', methods=['GET'])
    def get_methds():
        db_data = get_methods()
        return jsonify(db_data)

    @app.route('/methods/', methods=['POST'])
    def insert_methds():
        if request.method == "POST":
            data = request.get_json() or request.form.to_dict()

            if data is None:
                return jsonify({"error": "No data provided"}), 500

            method_id = int(data['method_id'])
            name = data['name']
            new_method = Method(method_id, name)

            insert_methods(new_method)
            return jsonify({"success": True}),200
        return None

    # ---------------------------------------------------------------------- #
    # ---------------------------- Accounts --------------------------------- #
    # ---------------------------------------------------------------------- #

    @app.route('/account/', methods=['GET'])
    def get_accs():
        json_data = json.dumps(get_account(), default=custom_serializer)
        return Response(json_data, mimetype='application/json')

    @app.route('/account/', methods=['POST'])
    def insert_acc():
        if request.method == "POST":

            data = request.get_json() or request.form.to_dict()

            if data is None:
                return jsonify({"error": "No data provided"}), 500

            print(data)
            account_id = (data['account_name'])

            who_id = (data['who_id'])
            value = int(data['balance'])
            name = data['account_name']
            method_ids = [] ## da controllare
            new_account = Accounts(-1,who_id, name, value, method_ids)

            insert_account(new_account)
            return jsonify({"success": True}),200
        return None

    # ---------------------------------------------------------------------- #
    # ----------------------------- CHARTS --------------------------------- #
    # ---------------------------------------------------------------------- #

# --------------- BAR CHARTS ROUTES -----------------------#
    @app.route('/chart/tags/', methods=['GET'])
    def get_chart_tags():
        db_data = get_expenses_by_tags()
        return jsonify(db_data)

    @app.route('/chart/monthly_tags/', methods=['GET'])
    def get_chart_monthly_tags():
        db_data = get_monthly_tag_expenses()
        return jsonify(db_data)

# ------------ GAUGE CHARTS ROUTES -------------------------#

    ## Send extra percentage out of the total spending
    @app.route('/chart/extrap/', methods=['GET'])
    def get_extra():
        db_data = list(get_extra_ratio())
        if len(db_data)>1:
            ratio = ((db_data[0])['total_amount'] / (db_data[1])['total_amount'])
            # return str(ratio), db_data
            return str(ratio)

        else:
            return "not enough data",509

    ## Send the percentage of fixed spending out of the total
    ## TODO: dopo la creazione dell ownings page
    @app.route("/chart/fixedp/", methods=['GET'])
    def send_fixed_percentage():
        return str(0.13)

    ## Sends the percentage of the monthly spending out of the heritage
    ## TODO: dopo la creazione dell ownings page
    @app.route("/chart/totalp/", methods=['GET'])
    def send_total_percentage():
        return str(0.1)