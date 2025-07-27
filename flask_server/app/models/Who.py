from app.models.model_interfaces.Model_Interface import ModelInterface

class Who(ModelInterface):
    def __init__(self,
                 name : str = "",
                 ):
        self.name = name
