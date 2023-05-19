from Wallet import Wallet
from BlockchainUtils import BlockchainUtils
import requests

def postTransaction(sender, receiver, amount, type,
                    ownerID=0, VIN=0,partID={}):
    transaction = sender.createTransaction(
        receiver.publicKeyString(), amount, type, ownerID, VIN, partID)
    url = "http://localhost:5000/transaction"
    package = {'transaction': BlockchainUtils.encode(transaction)}
    request = requests.post(url, json=package)

if __name__ == '__main__':

    bob = Wallet()
    alice = Wallet()
    alice.fromKey('keys/stakerPrivateKey.pem')
    exchange = Wallet()
    exchange.fromKey('keys/genesisPrivatekey.pem')

    #forger: genesis
    postTransaction(exchange, alice, 100, 'EXCHANGE')
    postTransaction(exchange, bob, 100, 'EXCHANGE')
    postTransaction(exchange, bob, 10, 'EXCHANGE')

    # forger: probably alice
    postTransaction(alice, alice, 25, 'STAKE')

    #TODO: adding parts
    parts={}
    parts['engineID']=321
    postTransaction(exchange, alice, 0, 'OWNERSHIP', 123, 111, parts)

    #TODO: checking parts
    #VERIFICATION:ownerID:VIN:partID
    postTransaction(exchange, exchange, 0, 'VERIFICATION', 123, 111, parts)
    postTransaction(exchange, exchange, 0, 'VERIFICATION', 123, 112, parts)
