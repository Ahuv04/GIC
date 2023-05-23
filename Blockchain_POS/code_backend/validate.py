from Wallet import Wallet
from BlockchainUtils import BlockchainUtils
import requests

if __name__ == '__main__':

    bob = Wallet()
    alice = Wallet()
    exchange = Wallet()
    stakerPublicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCz5GsVfnrZJdX+121CA8e2pa0s\nSDPIgAkWoruT29I14NYPnK77BwIxTxUFfa68BT5uLCqmrG3Et8mfSuNNhdhrJJOZ\nZVdKll5JEomvpLCmImbNPyWxjTA75w7R7cUeLL6oJh7UChKKrZs+T2/7WqpmGw7u\nO0OFWWc8/Eh3MD7ISwIDAQAB\n-----END PUBLIC KEY-----"
    node1PublicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApyYf8k89iJtGQjBE2mHq\naSq98gDEMQpAsihSaVI72zmKWDqObFaW5RT0egANz272ShWWB4tlWwWPJyhEVd+C\no8uaru/774y2Y3hzxg10sli4NqH0jRqVXHDoCvXZoiQmYx7owhg3P37ZstgBU2v5\n6erpcPowyc1e4cT4Y8HTqaLzx3fh4HgsuCeTAvqMBcfTCnBphMogmW8v89lZ99qn\nytqm5TIEISYm6JokshNbJ9ISrbsrz1ZdC+GggyIe+NwRL2TnM6n6JwTRve6Q44oj\nmduf1D8oetx9gP9zesj1unDLT5xL8D3yQhJ5KAQVjDSdV22HSpvNQfRzMNlYLmJX\n9wIDAQAB\n-----END PUBLIC KEY-----"
    node2PublicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp+yyTqHHZq7Iw51G+yur\nEIOM0L9hp8a8IkHaBZuEhotBNvXwyyfghgLOGyGeX8fPq4OyhAbN0Gi3VAdBytr1\np0nETt2H0DbSQ2oH8n4l0WT3VQLE8vn+qeNCzo9Cr6CDZek94a6QlXYbTfPOxgLP\nVRZHUHA1rRXWRqynM13hxKqz7fVF0dRx4xD/stWwJSBywYygkY411qLwHe3zMAq4\nzcLYEq7LCquan9F5pFjr9RCJW8LQIefRCZuVeec1X5/5K9wkUUO3PvCQuuhUizsM\nUgEWSY24tLJdf99b172ILyKoVJHxLVPnrWSwZeybGQMgZnS30SwrqzxaUlY0rCtF\nNQIDAQAB\n-----END PUBLIC KEY-----"


    url = "http://localhost:5002/verifyParts"
    package = {"parts":{'engine': 200, 'drive': 200, 'piston':500, 'fricpads': 400, 'battery': 455}, "ownerID":'Abhay',"vin":'VIN0001'}
    request = requests.post(url, json=package)
    print(request.text)