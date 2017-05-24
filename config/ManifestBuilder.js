'use strict';


class ManifestBuilder {

    getManifest() {
        const Fs = require('fs');
        const manifestLogging = require('./manifest-plugins/manifest-logging.json');
        const manifestDoc = require('./manifest-plugins/manifest-doc.json');

        const dbOptions = {
            url: 'mongodb://localhost:27017/test',
            settings: {
                poolSize: 10
            },
            decorate: true
        };

        let manifest = {
            server: {
                app: {
                    slogan: 'Breaking the Monolith'
                }
            },

            connections: [
                {
                    port: 3000,
                    host: 'localhost',
                    labels: 'http'
                }
                //,
                //{
                //    port: 8443,
                //    host: 'localhost',
                //    tls: {
                //        key: Fs.readFileSync('server.key'),
                //        cert: Fs.readFileSync('server.crt')
                //    },
                //    labels: 'https'
                //}
            ],
            registrations: [
                {
                    'plugin': {
                        'register': 'hapi-mongodb',
                        'options': dbOptions
                    }

                },
                {
                    "plugin": {
                        "register": "customers"
                    }
                },
                {
                    "plugin": {
                        "register": "products"
                    }
                }
            ]
        };


        manifest.registrations.push(manifestLogging);
        manifest.registrations = manifest.registrations.concat(manifestDoc.registrations);

        return manifest;
    }
}

module.exports = ManifestBuilder;
