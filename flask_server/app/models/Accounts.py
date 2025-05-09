import math
from typing import Dict, List


class Accounts:
    def __init__(self,
                 account_id : int = -1,
                 who_ids = None,
                 name : str = "",
                 value: float = -math.inf,
                 method_ids=None,
                 ):
        if method_ids is None:
            self.method_ids = []
        if who_ids is None:
            self.who_ids = []

        self.name = name
        self.value = value
        self.account_id = account_id

    def to_dict(self) -> Dict:
        return {

            "who_ids": self.who_ids,
            "name":self.name,
            "value":self.value,
            "method_ids": self.method_ids,
            "account_id": self.account_id,
        }

    @classmethod
    def from_dict(cls, data: Dict):
        return cls(
            who_ids=data.get("who_ids", []),
            method_ids=data.get("method_ids", []),
            value=data.get("value", -math.inf),
            account_id=data.get("account_id", -1),
            name=data.get("name", ""),
        )
