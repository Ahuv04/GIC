from Crypto.PublicKey import RSA
from Transaction import Transaction
from Block import Block
from BlockchainUtils import BlockchainUtils
from Crypto.Signature import PKCS1_v1_5


class Wallet():

    def __init__(self):
        self.keyPair = RSA.generate(2048)
        self.mineReward = 0

    def fromKey(self, file, passPhrase = None):
        key = ''
        with open(file, 'r') as keyfile:
            if passPhrase is not None:
                key = RSA.importKey(keyfile.read(), passphrase = passPhrase)
            else:
                key = RSA.importKey(keyfile.read())
        self.keyPair = key

    def sign(self, data):
        dataHash = BlockchainUtils.hash(data)
        signatureSchemeObject = PKCS1_v1_5.new(self.keyPair)
        signature = signatureSchemeObject.sign(dataHash)
        return signature.hex()

    @staticmethod
    def signatureValid(data, signature, publicKeyString):
        signature = bytes.fromhex(signature)
        dataHash = BlockchainUtils.hash(data)
        publicKey = RSA.importKey(publicKeyString)
        signatureSchemeObject = PKCS1_v1_5.new(publicKey)
        signatureValid = signatureSchemeObject.verify(dataHash, signature)
        return signatureValid

    def publicKeyString(self):
        publicKeyString = self.keyPair.publickey().exportKey(
            'PEM').decode('utf-8')
        return publicKeyString

    def createTransaction(self, receiver, amount, type, owner, vin, parts):
        transaction = Transaction(
            self.publicKeyString(), receiver, amount, type, owner, vin, parts)
        signature = self.sign(transaction.payload())
        transaction.sign(signature)
        return transaction

    def createBlock(self, transactions, lastHash, blockCount):
        block = Block(transactions, lastHash,
                      self.publicKeyString(), blockCount)
        signature = self.sign(block.payload())
        block.sign(signature)
        self.mineReward = self.mineReward + 5;
        return block
