import math
from datetime import datetime
from typing import Dict

class RecurrentExpense:
    def __init__(self,
                 amount: float,
                 description: str = "",
                 date: datetime = None,
                 tag: str = "",
                 who: str = "",
                 method: str = "",
                 extra: bool = False,
                 cadence: int = math.inf,
                 tag_id : int = -1,
                 method_id : int = -1,
                 who_id : int = -1,
                 ):
        self.amount = amount
        self.description = description
        self.date = date or datetime.utcnow()
        self.tag = tag
        self.who = who
        self.method = method
        self.extra = extra
        self.cadence = cadence
        self.tag_id = tag_id
        self.method_id = method_id
        self.who_id = who_id

