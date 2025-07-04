from datetime import datetime
from app.models.model_interfaces.Model_Interface import ModelInterface

class Expense(ModelInterface):
    def __init__(self, amount: float, description: str = "", date: datetime = None, tag: str = "", who: str = "", method: str = "", extra: bool = False):
        self.amount = amount
        self.description = description
        self.date = date or datetime.utcnow()
        self.tag = tag
        self.who = who
        self.method = method
        self.extra = extra