from datetime import datetime
from typing import Dict
from bson import ObjectId

class Expense:
    def __init__(self, amount: float, category: str, description: str = "", date: datetime = None, tag: str = "", who: str = "", method: str = ""):
        self.amount = amount  # Importo della spesa
        self.category = category  # Categoria della spesa (es. "Cibo", "Trasporti")
        self.description = description  # Descrizione opzionale
        self.date = date or datetime.utcnow()  # Data della spesa
        self.tag = tag  # Tag opzionale per la spesa
        self.who = who  # Chi ha effettuato la spesa
        self.method = method  # Metodo di pagamento

    def to_dict(self) -> Dict:
        """Converte l'oggetto in un dizionario per MongoDB"""
        return {
            # "_id": self._id,
            "amount": self.amount,
            "category": self.category,
            "description": self.description,
            "date": self.date,
            "tag": self.tag,
            "who": self.who,
            "method": self.method
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
            # _id=str(data.get("_id"))
        )
