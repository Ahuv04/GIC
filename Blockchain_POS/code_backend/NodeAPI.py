from flask_classful import FlaskView, route
from flask import Flask, jsonify, request
from BlockchainUtils import BlockchainUtils
from flask_cors import CORS
import pdb
node = None


class NodeAPI(FlaskView):

    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)

    def start(self, port):
        NodeAPI.register(self.app, route_base='/')
        self.app.run(host='localhost', port=port)

    def injectNode(self, injectedNode):
        global node
        node = injectedNode

    @route('/info', methods=['GET'])
    def info(self):
        return 'This is a communiction interface to a nodes blockchain', 200

    @route('/blockchain', methods=['GET'])
    def blockchain(self):
        return node.blockchain.toJson(), 200

    @route('/transactionPool', methods=['GET'])
    def transactionPool(self):
        transactions = {}
        for ctr, transaction in enumerate(node.transactionPool.transactions):
            transactions[ctr] = transaction.toJson()
        return jsonify(transactions), 200

    @route('/publicKey', methods=['GET'])
    def getKey(self):
        key = node.wallet.publicKeyString()
        return jsonify(key), 200

    @route('/walletAmt', methods=['GET'])
    def getWalletAmt(self):
        key = node.wallet.publicKeyString()
        thisWallet = node.blockchain.accountModel.getBalance(key)
        return jsonify(thisWallet), 200

    @route('/mineReward', methods=['GET'])
    def getMineReward(self):
        key = node.wallet.publicKeyString()
        reward = node.wallet.mineReward
        return jsonify(reward), 200

    @route('/getStake', methods=['GET'])
    def getCurrentStake(self):
        key = node.wallet.publicKeyString()
        pos = node.blockchain.pos
        stake = pos.get(key)
        return jsonify(stake), 200

    @route('/getParts', methods=['GET'])
    def getParts(self):
        key = node.wallet.publicKeyString()
        blocks = node.blockchain.blocks
        originalParts = {}
        originalOwner = ''
        vin = ''
        for block in blocks:
            trans = block.transactions
            for thisTrans in trans:
                if thisTrans.type == 'OWNERSHIP' and thisTrans.receiverPublicKey == key:
                    blockParts = thisTrans.parts
                    for (key, val) in blockParts.items():
                        originalParts[key] = val
                    vin = thisTrans.vin
        
        values = {"vin": vin, "parts": originalParts}
        return jsonify(values), 200

    @route('/transaction', methods=['POST'])
    def transaction(self):
        #pdb.set_trace()
        values = request.get_json()

        thisWallet = node.wallet
        transaction = thisWallet.createTransaction(
            values['recieverKey'], values['coins'], values['type'], values['ownerID'], values['vin'], values['parts'])

        node.handleTransaction(transaction)
        response = {'message': 'Received transaction'}
        return jsonify(response), 201

    @route('/verifyParts', methods=['POST'])
    def verifyParts(self):
        values = request.get_json()
        vin = values['vin']
        current_parts = values['parts']
        owner = values['ownerID']
        blocks = node.blockchain.blocks
        originalParts = {}
        originalOwner = ''
        for block in blocks:
            trans = block.transactions
            for thisTrans in trans:
                if thisTrans.type == 'OWNERSHIP' and thisTrans.vin == vin:
                    blockParts = thisTrans.parts
                    for (key, val) in blockParts.items():
                        originalParts[key] = val
                    originalOwner = thisTrans.ownerID
        
        sameOwner = (originalOwner == owner)
        sameParts = {}
        for (key, val) in originalParts.items():
            if key in current_parts and current_parts[key] == val:
                sameParts[key] = True
            else:
                sameParts[key] = False
                
        response = {'owner':sameOwner, 'parts':sameParts}
        return jsonify(response), 201
