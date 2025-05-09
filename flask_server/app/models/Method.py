from typing import Dict

class Method:
    def __init__(self,
                 method_id : int = -1,
                 name : str = "",
                 ):

        self.method_id = method_id
        self.name = name

    def to_dict(self) -> Dict:
        return {

            "tag_id": self.method_id,
            "name":self.name,
        }

    @classmethod
    def from_dict(cls, data: Dict):
        return cls(
            method_id=data.get("method_id"),
            name=data.get("name", ""),
        )
