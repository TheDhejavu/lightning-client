# Lightning client

The present bitcoin lightning network integration necessitates the deployment of a non-mining full node, as the lightning network must constantly monitor the blockchain. This is simple client that integrates with the bitcoin lightning node written in Node.js

## **Integration One**

[GetUmbrel](https://getumbrel.com/) is an interesting tool that allows us to run our personal server with a Bitcoin and Lightning node for free, both Lightning node demon (LND) and bitcoin core  comes out of the box but the project is still in beta and also has some security trades off ([https://github.com/getumbrel/umbrel/blob/master/SECURITY.md](https://github.com/getumbrel/umbrel/blob/master/SECURITY.md))

**Benefits of using GetUmbrel:**

- Umbrel runs a Bitcoin and Lightning node out of the box so that we can start leveraging the power of Lightning.
- We can Connect all of your favorite wallets E.G Trezor, Bluewallet, Ledger E.t.c
- Independently store and validate every single Bitcoin transaction with our Bitcoin node.

### **Integration Two**

Integration with external providers 

[OpenNode.com](http://opennode.com) fosters Bitcoin payments and payouts and has support for bitcoin lightning network. 

[LnPay.co](https://docs.lnpay.co/): LNPay also enables us to integrate the Lightning Network. 

### Integration Three

This is the final and most complex integration; it requires us to run our own bitcoin full-node and lightning network node that is not mining. It's the same as the first integration concept. The LND developers are still testing with neurito, a Bitcoin lite client built in Go. Neutrino does not require our machine to run and hence will not need to be configured separately. Using Neutrino instead of Bitcoind or btcd allows us to run our node in 'light mode,' which means it can run on low-powered devices like a phone without requiring as much storage or bandwidth as syncing our full bitcoin node.

**Required Tools:**

- Btcd: [https://github.com/btcsuite/btcd](https://github.com/btcsuite/btcd)
- Ride The Lightning (UI) [https://github.com/Ride-The-Lightning/RTL#intro](https://github.com/Ride-The-Lightning/RTL#intro)
- Lightning network Demon (LND): [https://github.com/lightningnetwork/lnd](https://github.com/lightningnetwork/lnd)

**Recommended**

- Buy a > 500GB SSD server
- Install Bitcoin Core or BTCD
- Sync the chain

### **Pros of Lightning Network**

The Lightning Network's apparent benefits include faster and cheaper transactions, as well as the ability to make micropayments in ways never previously imaginable. Users would have to pay significant fees for a simple transaction and then wait an hour or more for it to validate if the Lightning Network were not in place. Smaller transactions have longer wait times because miners prefer to validate larger transactions because they pay more.

The Lightning Network is a layer that sits on top of the Bitcoin network. Because of the connectivity, the Lightning Network continues to benefit from the security mechanisms of Bitcoin. Users can then use the main blockchain for larger transactions and the Lightning Network's off-chain for smaller transactions without fear of security issues. Onlookers can't see individual transactions on the Lightning Network payment channels, only the total package, therefore transactions are secret.

### **Cons of Lightning Network**

One has to acquire a wallet compatible with the Lightning Network to actually take advantage of it. While finding a wallet that works with the Lightning Network is easy, a user needs to fund it from a traditional Bitcoin wallet. The initial transaction from the traditional to the Lightning Network wallet costs a fee, so we are losing some Bitcoin to interact with the protocol. After funds are in the Lightning Network wallet, we must lock up their Bitcoin to create a payment channel.

### **Resources**

1. [https://lightninghood.com/lightning-resources/](https://lightninghood.com/lightning-resources/)
2. [https://dev.lightning.community/overview/#lnd-interfaces](https://dev.lightning.community/overview/#lnd-interfaces)
3. [https://docs.lightning.engineering/](https://docs.lightning.engineering/)
4. [https://chaincode.gitbook.io/seminars/lightning-protocol-development/payment-channels-htlcs](https://chaincode.gitbook.io/seminars/lightning-protocol-development/payment-channels-htlcs)
5. [https://btctranscripts.com/chaincode-labs/chaincode-residency/2018-10-22-christian-decker-history-of-lightning/](https://btctranscripts.com/chaincode-labs/chaincode-residency/2018-10-22-christian-decker-history-of-lightning/)
6. [https://medium.com/suredbits/lightning-101-what-is-the-lightning-network-de3e026f3c14](https://medium.com/suredbits/lightning-101-what-is-the-lightning-network-de3e026f3c14)
7. [https://lightning.network/lightning-network-paper.pdf](https://lightning.network/lightning-network-paper.pdf)
8. [https://www.coinbase.com/learn/crypto-basics/what-is-lightning](https://www.coinbase.com/learn/crypto-basics/what-is-lightning)
9. [https://api.lightning.community/?javascript#lnd-grpc-api-reference](https://api.lightning.community/?javascript#lnd-grpc-api-reference)
10. [https://docs.google.com/document/d/1r38-_IgtfOkhJh4QbN7l6bl7Rol05qS-i7BjM3AjKOQ/edit](https://docs.google.com/document/d/1r38-_IgtfOkhJh4QbN7l6bl7Rol05qS-i7BjM3AjKOQ/edit)
11. [https://starblocks.acinq.co/order/587dc4614be6cc4024946de40148fa65ec1452e0e711aee3fe70927ea7866ddb](https://starblocks.acinq.co/order/587dc4614be6cc4024946de40148fa65ec1452e0e711aee3fe70927ea7866ddb)
12. [https://www.theblockcrypto.com/post/108770/how-to-run-a-bitcoin-lightning-node-on-a-raspberry-pi-and-connect-it-to-your-phone](https://www.theblockcrypto.com/post/108770/how-to-run-a-bitcoin-lightning-node-on-a-raspberry-pi-and-connect-it-to-your-phone)
13. [https://www.getpostman.com/collections/412e4494608fb27e7dbe](https://www.getpostman.com/collections/412e4494608fb27e7dbe)
14. [https://medium.com/@yyforyongyu/till-its-lightning-fast-uncover-the-lightning-network-transactions-f3180e467857](https://medium.com/@yyforyongyu/till-its-lightning-fast-uncover-the-lightning-network-transactions-f3180e467857)
15. [https://stopanddecrypt.medium.com/a-complete-beginners-guide-to-installing-a-lightning-node-on-linux-2021-edition-ece227cfc35d](https://stopanddecrypt.medium.com/a-complete-beginners-guide-to-installing-a-lightning-node-on-linux-2021-edition-ece227cfc35d)
