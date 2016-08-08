# A Node.js MarteXcoin Client

![MarteXcoin](https://raw.githubusercontent.com/martexcoin/node-martexcoin/master/node-martexcoin.png)

node-martexcoin is a MarteXcoin client for Node.js. It is a fork of node-dogecoin client (see fork) intended for use with MarteXcoin. The purpose of this repository is:

* Provide a one-stop resource for the Node.js developer to get started with MarteXcoin integration.
* Prevent would-be MarteXcoin web developers worrying whether a MarteXcoin client will work out of the box.
* Promote Node.js development of MarteXcoin web apps.
* Identify and address any incompatibilities with the MarteXcoin and MarteXcoin APIs that exist now and/or in the future.

## Dependencies

You'll need a running instance of [MartexCoind](https://github.com/martexcoin/martexcoin) to connect with.

Then, install the node-martexcoin NPM package.

`npm install node-martexcoin`

## Examples

```js
var martexcoin = require('node-martexcoin')()

martexcoin.auth('myusername', 'mypassword')

martexcoin.getDifficulty(function() {
    console.log(arguments);
})

```

## Options

You may pass options to the initialization function or to the `set` method.

```js

var martexcoin = require('martexcoin')({
    user:'user'
})

martexcoin.set('pass', 'somn')
martexcoin.set({port:22555})

```

Available options and default values:

+ host *127.0.0.1*
+ port *51324*
+ user
+ pass
+ passphrasecallback
+ https
+ ca

### Passphrase Callback

With an encryped wallet, any operation that accesses private keys requires a wallet unlock. A wallet is unlocked using the `walletpassphrase <passphrase> <timeout>` JSON-RPC method: the wallet will relock after `timeout` seconds.

You may pass an optional function `passphrasecallback` to the `node-martexcoin` initialization function to manage wallet unlocks. `passphrasecallback` should be a function accepting three arguments:

    function(command, args, callback) {}

+ **command** is the command that failed due to a locked wallet.
+ **args** is the arguments for the failed command.
+ **callback** is a typical node-style continuation callback of the form `function(err, passphrase, timeout) {}`. Call callback with the wallet passphrase and desired timeout from within your passphrasecallback to unlock the wallet.

You may hard code your passphrase (not recommended) as follows:

```js
var martexcoin = require('node-martexcoin')({
    passphrasecallback: function(command, args, callback) {
        callback(null, 'passphrase', 30);
    }
})
```

Because `passphrasecallback` is a continuation, you can retrieve the passphrase in an asynchronous manner. For example, by prompting the user:

```js
var readline = require('readline')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var martexcoin = require('node-martexcoin')({
  passphrasecallback: function(command, args, callback) {
    rl.question('Enter passphrase for "' + command + '" operation: ', function(passphrase) {
      if (passphrase) {
        callback(null, passphrase, 1)
      } else {
        callback(new Error('no passphrase entered'))
      }
    })
  }
})
```

### Secure RPC with SSL

By default `martexcoind` exposes its JSON-RPC interface via HTTP; that is, all RPC commands are transmitted in plain text across the network! To secure the JSON-RPC channel you can supply `martexcoind` with a self-signed SSL certificate and an associated private key to enable HTTPS. For example, in your `martexcoin.conf`:

    rpcssl=1
    rpcsslcertificatechainfile=/etc/ssl/certs/martexcoind.crt
    rpcsslprivatekeyfile=/etc/ssl/private/martexcoind.pem

In order to securely access an SSL encrypted JSON-RPC interface you need a copy of the self-signed certificate from the server: in this case `martexcoind.crt`. Pass your self-signed certificate in the `ca` option and set `https: true` and node-martexcoin is secured!
    
```js
var fs = require('fs')

var ca = fs.readFileSync('martexcoind.crt')

var martexcoin = require('node-martexcoin')({
  user: 'rpcusername',
  pass: 'rpcpassword',
  https: true,
  ca: ca
})
```


