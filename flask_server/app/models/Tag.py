from typing import Dict

from app.models.model_interfaces.Model_Interface import ModelInterface


class Tag(ModelInterface):
    def __init__(self,
                 tag_id : int = -1,
                 name : str = "",
                 ):
        self.tag_id = tag_id
        self.name = name
