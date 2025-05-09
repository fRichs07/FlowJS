from typing import Dict

class Who:
    def __init__(self,
                 who_id : int = -1,
                 name : str = "",
                 ):
        self.who_id = who_id
        self.name = name

    def to_dict(self) -> Dict:
        return {

            "who_id": self.who_id,
            "name":self.name,
        }

    @classmethod
    def from_dict(cls, data: Dict):
        return cls(
            who_id=data.get("who_id"),
            name=data.get("name", ""),
        )
