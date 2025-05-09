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
        self.category = category
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

    def to_dict(self) -> Dict:
        """Converte l'oggetto in un dizionario per MongoDB"""
        return {

            "amount": self.amount,
            "description": self.description,
            "starting_date": self.date,
            "tag": self.tag,
            "who": self.who,
            "method": self.method,
            "extra": self.extra,
            "cadence": self.cadence,

            "tag_id": self.tag_id,
            "method_id":self.method_id,
            "who_id":self.who_id,
        }

    @classmethod
    def from_dict(cls, data: Dict):
        """Crea un'istanza di Expense da un documento MongoDB"""
        return cls(
            amount=data["amount"],
            category=data["category"],
            description=data.get("description", ""),
            date=data.get("date", datetime.utcnow()),
            tag=data.get("tag", ""),
            who=data.get("who", ""),
            method=data.get("method", ""),
            extra=data.get("extra", False),
            cadence=data.get("cadence"),

            method_id=data.get("method_id"),
            tag_id=data.get("tag_id"),
            who_id=data.get("who_id"),
        )
