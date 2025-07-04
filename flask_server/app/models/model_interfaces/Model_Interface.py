import inspect
from abc import ABC, abstractmethod
from symtable import Class
from typing import Dict


class ModelInterface(ABC):

    def to_dict(self):
        return self.__dict__

    def from_dict(self, cls, data: Dict):
        # Ottieni la signature del costruttore
        sig = inspect.signature(cls.__init__)

        # Ignora 'self'
        params = list(sig.parameters.values())[1:]

        # Costruisci kwargs solo con le chiavi presenti in data
        kwargs = {}
        for param in params:
            name = param.name
            if name in data:
                kwargs[name] = data[name]
            elif param.default is not param.empty:
                kwargs[name] = param.default
            else:
                raise ValueError(f"Missing required parameter: {name}")

        return cls(**kwargs)