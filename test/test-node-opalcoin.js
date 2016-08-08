var fs = require('fs'),
	events = require('events');

var config = {
    rpchost: "127.0.0.1",
    rpcport: 51990,
    rpcuser: "testnet_user",
    rpcpassword: "testnet_pass"
};
ca = fs.readFileSync('./test/test.crt')
options = {
      host: config.rpchost,
      port: config.rpcport,
      user: config.rpcuser,
      pass: config.rpcpassword,
      passphrasecallback: function () { return "passphrasecallback";},
      https: true,
      ca: ca
    };
var martexcoin = require('../lib/martexcoin')(options);

exports.get = function (test) {
	var options_keys = Object.keys(options);

	var num_propt = Object.keys(options_keys).length;
	test.expect(num_propt);
	

	if( options.length < config.length ){
		throw new Error('not all config options being used');
		test.done();
	}

	var idx = 0;
	for(var propt in options){
		test.deepEqual(martexcoin.get(''+options_keys[idx]), options[''+propt]);
		idx ++;
	}
	
	test.done();
}
exports.set = function (test) {

	var new_options = {
      host: '133.7.7.7',
      port: 51990,
      user: 'new_1337_^*)()',
      pass: '*&@#cra$%zy@',
      passphrasecallback: function () { return 1+1;},
      https: false,
      ca: 'nothing here'
    };
	var options_keys = Object.keys(new_options);

	var num_propt = Object.keys(new_options).length;
	test.expect(num_propt);

	if( new_options.length < config.length ){
		throw new Error('not all config options being used');
		test.done();
	}

	var idx = 0;
	for(var propt in new_options){
		martexcoin.set(''+options_keys[idx], new_options[ ''+options_keys[idx] ]);
		test.deepEqual(martexcoin.get(''+options_keys[idx]), new_options[''+propt]);
		idx ++;
	}
	test.done();
}


// NOTE:
// 			All the code below has beencommented out as
// 			not sure if account name is the same as the user name or not

/*
/* BEFORE RUNNING read below:
 * Either run martexcoind directly or run martexcoin-qt with the -server
 * command line option. Make sure you have a ~/.martexcoin/martexcoin.conf
 * with rpcuser and rpcpassword config values filled out.
 *
 */
/*
exports.commands_noAuth = {		
	//NOTE: Before running the getBalance test add some testopal to your wallet here: http://testopal.lionservers.de/
	// 			or add "gen=1" to the bottom of your martexcoin.conf file
	getBalance: function(test){
		var curr_balance;
		martexcoin.getBalance(function(err, balance) {
			test.ifError(err);
		  if (err) {
		    console.error('Failed to fetch balance', err.message);
		  }else {
		  	console.log('DOGE balance is', balance);
			}
		  test.done();
		});
	},
	getBalance: function(test){

	},

	getGenerate: function(test){
		test.expect(2);
		martexcoin.setGenerate(true,1);
		test.equal(martexcoin.getGenerate(), true);

		martexcoin.setGenerate(false,1);
		test.equal(martexcoin.getGenerate(), false);
		test.done();
	},
	getreceived_: function(test){
		var amount= 0.0001;
		//martexcoin.setAccount()
		sendfrom("testnet_user", martexcoin.getaccountaddress('testnet_user'),amount, function(err,addr){
			test.equal(getreceivedbyaccount('testnet_user', amount);
			test.equal( getreceivedbyaddress( martexcoin.getaccountaddress('testnet_user') ), amount);
			test.done();

		});



	}

	
}

//all api commands that need .auth()
exports.commands_Auth = {		
	
	setUp: function () {
		martexcoin.auth('testnet_user', 'testnet_pass');
	}

	
}
*/
