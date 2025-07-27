import inspect
from abc import ABC, abstractmethod
from typing import Dict


class ModelInterface(ABC):

    def to_dict(self):
        return self.__dict__

    def from_dict(self, data: Dict):
        '''
        NON FUNZIONA, SOLO PERCHE NON VIENE MAI CHIAMATO
        :param cls:
        :param data:
        :return:
        '''
        # Ottieni la signature del costruttore
        sig = inspect.signature(self.__init__)

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

        return self(**kwargs)


'''
import inspect
from typing import List


class cane:
    def __init__(self, razza, nome):
        self.razza = razza
        self.nome = nome

    def abbaia(self):
        print("wof")


bastardo = cane('bastardo', 'kira')
print(inspect.signature(bastardo.__init__))
print(inspect.signature(bastardo.__init__).parameters.values())
print(list(inspect.signature(bastardo.__init__).parameters.keys()))

params : List[inspect.Parameter] = list(inspect.signature(bastardo.__init__).parameters.values())

kwords = {}
data = {
    'razza': 'barbo',
    'nome': 'geppo',
}

for param in params:
    print(param)
    d = data[param.name]
    if not d:
        d = param.default
    kwords[param.name] = d




cane(**kwords).abbaia()
'''