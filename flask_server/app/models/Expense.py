from datetime import datetime
from typing import Dict
from bson import ObjectId

class Expense:
    def __init__(self, amount: float, category: str, description: str = "", date: datetime = None, _id=None):
        self.amount = amount  # Importo della spesa
        self.category = category  # Categoria della spesa (es. "Cibo", "Trasporti")
        self.description = description  # Descrizione opzionale
        self.date = date or datetime.utcnow()  # Data della spesa
        self._id = ObjectId(_id) if _id else None  # ID MongoDB

    def to_dict(self) -> Dict:
        """Converte l'oggetto in un dizionario per MongoDB"""
        return {
            "_id": self._id,
            "amount": self.amount,
            "category": self.category,
            "description": self.description,
            "date": self.date
        }

    @classmethod
    def from_dict(cls, data: Dict):
        """Crea un'istanza di Expense da un documento MongoDB"""
        return cls(
            amount=data["amount"],
            category=data["category"],
            description=data.get("description", ""),
            date=data.get("date", datetime.utcnow()),
            _id=str(data.get("_id"))
        )

    def __repr__(self):
        return f"Expense(amount={self.amount}, category='{self.category}', description='{self.description}', date={self.date})"
