var config = {
    user: 'sa',
    password: 'felipe',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'sistema',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}

exports.getConfig = function(){
	return config;
}
