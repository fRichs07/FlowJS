import math
from typing import Dict, List


class Accounts:
    def __init__(self,
                 account_id : int = -1,
                 who_id = None,
                 name : str = "",
                 value: float = -math.inf,
                 method_ids=None,
                 ):
        if method_ids is None:
            self.method_ids = []
        if who_id is None:
            self.who_ids = []

        self.name = name
        self.value = value
        self.account_id = account_id
        self.who_id = None
        self.method_ids = method_ids
