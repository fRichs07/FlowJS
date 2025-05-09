from typing import Dict

class Tag:
    def __init__(self,
                 tag_id : int = -1,
                 name : str = "",
                 ):
        self.tag_id = tag_id
        self.name = name

    def to_dict(self) -> Dict:
        return {

            "tag_id": self.tag_id,
            "name":self.name,
        }

    @classmethod
    def from_dict(cls, data: Dict):
        return cls(
            tag_id=data.get("tag_id"),
            name=data.get("name", ""),
        )
