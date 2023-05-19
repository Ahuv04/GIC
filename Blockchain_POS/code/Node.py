from Blockchain import Blockchain
from TransactionPool import TransactionPool
from Wallet import Wallet
from SocketCommunication import SocketCommunication
from NodeAPI import NodeAPI
from Message import Message
from BlockchainUtils import BlockchainUtils
import copy

class Node():

    def __init__(self, ip, port, key=None):
        self.p2p = None
        self.ip = ip
        self.port = port
        self.blockchain = Blockchain()
        self.transactionPool = TransactionPool()
        self.wallet = Wallet()
        self.verifpool = {}
        if key is not None:
            self.wallet.fromKey(key)

        #modifications
        self.type = "PEER"

    def startP2P(self):
        self.p2p = SocketCommunication(self.ip, self.port)
        self.p2p.startSocketCommunication(self)

    def startAPI(self, apiPort):
        self.api = NodeAPI()
        self.api.injectNode(self)
        self.api.start(apiPort)

    def handleTransaction(self, transaction):
        data = transaction.payload()
        if transaction.type=='VERIFICATION':
            message = Message(self.p2p.socketConnector,
                                'VERIFICATION', transaction)
            encodedMessage = BlockchainUtils.encode(message)
            self.p2p.broadcast(encodedMessage)
            #TODO: check if we should also do checkTxn
            return

        signature = transaction.signature
        signerPublicKey = transaction.senderPublicKey
        signatureValid = Wallet.signatureValid(
            data, signature, signerPublicKey)
        transactionExists = self.transactionPool.transactionExists(transaction)

        transactionInBlock = self.blockchain.transactionExists(transaction)

        if not transactionExists and not transactionInBlock and signatureValid:
            self.transactionPool.addTransaction(transaction)
            if transaction.type=='OWNERSHIP':
                message = Message(self.p2p.socketConnector,
                                'OWNERSHIP', transaction)
            else:
                message = Message(self.p2p.socketConnector,
                                'TRANSACTION', transaction)
            encodedMessage = BlockchainUtils.encode(message)
            self.p2p.broadcast(encodedMessage)
            forgingRequired = self.transactionPool.forgingRequired()
            if forgingRequired:
                self.forge()

    def handleBlock(self, block):
        forger = block.forger
        blockHash = block.payload()
        signature = block.signature

        blockCountValid = self.blockchain.blockCountValid(block)
        lastBlockHashValid = self.blockchain.lastBlockHashValid(block)
        forgerValid = self.blockchain.forgerValid(block)
        transactionsValid = self.blockchain.transactionsValid(
            block.transactions)
        signatureValid = Wallet.signatureValid(blockHash, signature, forger)
        if not blockCountValid:
            self.requestChain()
        if lastBlockHashValid and forgerValid and transactionsValid and signatureValid:
            self.blockchain.addBlock(block)
            self.transactionPool.removeFromPool(block.transactions)
            message = Message(self.p2p.socketConnector, 'BLOCK', block)
            self.p2p.broadcast(BlockchainUtils.encode(message))

    def handleBlockchainRequest(self, requestingNode):
        message = Message(self.p2p.socketConnector,
                          'BLOCKCHAIN', self.blockchain)
        self.p2p.send(requestingNode, BlockchainUtils.encode(message))

    def handleBlockchain(self, blockchain):
        localBlockchainCopy = copy.deepcopy(self.blockchain)
        localBlockCount = len(localBlockchainCopy.blocks)
        receivedChainBlockCount = len(blockchain.blocks)
        if localBlockCount < receivedChainBlockCount:
            for blockNumber, block in enumerate(blockchain.blocks):
                if blockNumber >= localBlockCount:
                    localBlockchainCopy.addBlock(block)
                    self.transactionPool.removeFromPool(block.transactions)
            self.blockchain = localBlockchainCopy

    def forge(self):
        forger = self.blockchain.nextForger()
        if forger == self.wallet.publicKeyString():
            print('i am the forger')
            block = self.blockchain.createBlock(
                self.transactionPool.transactions, self.wallet)
            self.transactionPool.removeFromPool(
                self.transactionPool.transactions)
            message = Message(self.p2p.socketConnector, 'BLOCK', block)
            self.p2p.broadcast(BlockchainUtils.encode(message))
        else:
            print('i am not the forger')

    def requestChain(self):
        message = Message(self.p2p.socketConnector, 'BLOCKCHAINREQUEST', None)
        self.p2p.broadcast(BlockchainUtils.encode(message))

    def verificationRequest(self,requestingNode,transaction):
        ans=self.blockchain.checkTransaction(transaction.ownerID, transaction.VIN, transaction.partID)
        message = Message(self.p2p.socketConnector,'VERIFREPLY', ans)
        self.p2p.send(requestingNode, BlockchainUtils.encode(message))

        return
    
    #TODO: add functionality of how will you handle this
    #case such 
    # 0 : parts dont exist on blkchain
    # 1 : ownership transaction present and is all good
    # 2 : part registered to diff vin
    # 3 : part registered to diff owner
    # 4 : part registered to diff vin and owner
    def verifReply(self, response_id):
        if response_id==0:
            print("parts dont exist on blkchain")
        elif response_id==1:
            print("ownership transaction present and is all good")
        elif response_id==2:
            print("part registered to diff vin")
        elif response_id==3:
            print("part registered to diff owner")
        elif response_id==4:
            print("part registered to diff vin and owner")
        
