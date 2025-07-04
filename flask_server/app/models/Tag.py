from typing import Dict

class Tag:
    def __init__(self,
                 tag_id : int = -1,
                 name : str = "",
                 ):
        self.tag_id = tag_id
        self.name = name
