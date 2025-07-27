from typing import Dict

from app.models.model_interfaces.Model_Interface import ModelInterface


class Method(ModelInterface):
    def __init__(self,
                 method_id : int = -1,
                 name : str = "",
                 ):

        self.method_id = method_id
        self.name = name
