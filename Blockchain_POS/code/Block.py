import time
import copy


class Block():

    def __init__(self, transactions, lastHash, forger, blockCount):
        self.blockCount = blockCount
        self.transactions = transactions
        self.lastHash = lastHash
        self.timestamp = time.time()
        self.forger = forger
        self.signature = ''

    @staticmethod
    def genesis():
        genesisBlock = Block([], 'genesisHash', 'genesis', 0)
        genesisBlock.timestamp = 0
        return genesisBlock

    def toJson(self):
        data = {}
        data['blockCount'] = self.blockCount
        data['lastHash'] = self.lastHash
        data['signature'] = self.signature
        data['forger'] = self.forger
        data['timestamp'] = self.timestamp
        jsonTransactions = []
        for transaction in self.transactions:
            jsonTransactions.append(transaction.toJson())
        data['transactions'] = jsonTransactions
        return data

    def payload(self):
        jsonRepresentation = copy.deepcopy(self.toJson())
        jsonRepresentation['signature'] = ''
        return jsonRepresentation

    def sign(self, signature):
        self.signature = signature

    def checkTxn(self, ownerID,VIN,partID):
        for i in partID:
            for j in self.transactions:
                if i in j.partID:
                    if partID[i]==j.partID[i] and ownerID==j.ownerID and VIN==j.VIN:
                        #ownership transaction already present
                        return 1
                    elif partID[i]==j.partID[i]:
                        if VIN!=j.VIN and ownerID!=j.ownerID:
                            #partid registered to diff vin and owner
                            return 4
                        elif VIN!=j.VIN:
                            #partid registered to diff vin
                            return 2
                        else:
                            #partid registered to diff owner
                            return 3
        #ownership transaction not present
        return 0
    
    def checkMultiplePartTxn(self, ownerID,VIN,partID):
        ans={}
        for i in partID:
            ans[i]=-1
            for j in self.transactions:
                if i in j.partID:
                    if partID[i]==j.partID[i] and ownerID==j.ownerID and VIN==j.VIN:
                        #ownership transaction already present
                        ans[i]=1
                        break
                    elif partID[i]==j.partID[i]:
                        if VIN!=j.VIN and ownerID!=j.ownerID:
                            #partid registered to diff vin and owner
                            ans[i]=4
                            break
                        elif VIN!=j.VIN:
                            #partid registered to diff vin
                            ans[i]=2
                            break
                        else:
                            #partid registered to diff owner
                            ans[i]=3
                            break
            if ans[i]==-1:
            #ownership transaction not present
                ans[i]=0

        return ans

