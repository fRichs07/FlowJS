from datetime import datetime
from typing import Dict

class Expense:
    def __init__(self, amount: float, description: str = "", date: datetime = None, tag: str = "", who: str = "", method: str = "", extra: bool = False):
        self.amount = amount
        self.description = description
        self.date = date or datetime.utcnow()
        self.tag = tag
        self.who = who
        self.method = method
        self.extra = extra

    def to_dict(self) -> Dict:
        """Converte l'oggetto in un dizionario per MongoDB"""
        return {
            # "_id": self._id,
            "amount": self.amount,
            "description": self.description,
            "date": self.date,
            "tag": self.tag,
            "who": self.who,
            "method": self.method,
            "extra": self.extra
        }

    @classmethod
    def from_dict(cls, data: Dict):
        """Crea un'istanza di Expense da un documento MongoDB"""
        return cls(
            amount=data["amount"],
            description=data.get("description", ""),
            date=data.get("date", datetime.utcnow()),
            tag=data.get("tag", ""),
            who=data.get("who", ""),
            method=data.get("method", ""),
            extra=data.get("extra", False)
            # _id=str(data.get("_id"))
        )
