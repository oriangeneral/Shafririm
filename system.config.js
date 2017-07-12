SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "app/": "src/js/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "ts-runtime": "npm:babel-runtime@6.23.0",
      "core-js": "npm:core-js@2.4.1",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.21",
      "text": "github:systemjs/plugin-text@0.0.9",
      "ts": "github:frankwallis/plugin-typescript@7.0.6"
    },
    "packages": {
      "npm:babel-runtime@6.23.0": {
        "map": {
          "core-js": "npm:core-js@2.4.1",
          "regenerator-runtime": "npm:regenerator-runtime@0.10.5"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  typescriptOptions: {
    "tsconfig": true
  },
  packages: {
    "app": {
      "main": "main.prod",
      "defaultExtension": "ts",
      "map": {
        "./services": "./services/index",
        "./components": "./components/index",
        "./components/app": "./components/app/index",
        "./components/landing": "./components/landing/index",
        "./components/quiz": "./components/quiz/index",
        "./components/quiz/card": "./components/quiz/card/index",
        "./components/quiz/done": "./components/quiz/done/index",
        "./components/quiz/nav": "./components/quiz/nav/index",
        "./components/quiz/status": "./components/quiz/status/index",
        "./facades": "./facades/index",
        "./helpers": "./helpers/index",
        "./modules": "./modules/index",
        "./routes": "./routes/index",
        "./support": "./support/index"
      },
      "meta": {
        "*.ts": {
          "loader": "ts"
        },
        "*.js": {
          "loader": "plugin-babel"
        },
        "*.css": {
          "loader": "text"
        },
        "*.html": {
          "loader": "text"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "@angular/common": "npm:@angular/common@4.2.6",
    "@angular/compiler": "npm:@angular/compiler@4.2.6",
    "@angular/core": "npm:@angular/core@4.2.6",
    "@angular/forms": "npm:@angular/forms@4.2.6",
    "@angular/http": "npm:@angular/http@4.2.6",
    "@angular/platform-browser": "npm:@angular/platform-browser@4.2.6",
    "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic@4.2.6",
    "@angular/router": "npm:@angular/router@4.2.6",
    "angular2-materialize": "npm:angular2-materialize@15.0.4",
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "css-animator": "npm:css-animator@2.1.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "iscroll": "npm:iscroll@5.2.0",
    "jquery": "npm:jquery@2.2.4",
    "materialize-css": "npm:materialize-css@0.98.2",
    "module": "npm:jspm-nodelibs-module@0.2.1",
    "net": "npm:jspm-nodelibs-net@0.2.1",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "reflect-metadata": "npm:reflect-metadata@0.1.10",
    "rxjs": "npm:rxjs@5.4.2",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.1",
    "timers": "npm:jspm-nodelibs-timers@0.2.1",
    "tty": "npm:jspm-nodelibs-tty@0.2.1",
    "typescript": "npm:typescript@2.4.1",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3",
    "zone.js": "npm:zone.js@0.8.12"
  },
  packages: {
    "npm:browserify-aes@1.0.6": {
      "map": {
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "des.js": "npm:des.js@1.0.0",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "randombytes": "npm:randombytes@2.0.5"
      }
    },
    "npm:buffer-xor@1.0.3": {
      "map": {}
    },
    "npm:core-util-is@1.0.2": {
      "map": {}
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "elliptic": "npm:elliptic@6.4.0"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "miller-rabin": "npm:miller-rabin@4.0.0",
        "randombytes": "npm:randombytes@2.0.5"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.3",
        "parse-asn1": "npm:parse-asn1@5.1.0",
        "randombytes": "npm:randombytes@2.0.5"
      }
    },
    "npm:string_decoder@0.10.31": {
      "map": {}
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.3"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:timers-browserify@1.4.2": {
      "map": {
        "process": "npm:process@0.11.10"
      }
    },
    "npm:sha.js@2.4.8": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.7.2"
      }
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "inherits": "npm:inherits@2.0.3",
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "brorand": "npm:brorand@1.1.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "hmac-drbg": "npm:hmac-drbg@1.0.1"
      }
    },
    "npm:asn1.js@4.9.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.6",
        "parse-asn1": "npm:parse-asn1@5.1.0",
        "elliptic": "npm:elliptic@6.4.0",
        "bn.js": "npm:bn.js@4.11.7",
        "create-hash": "npm:create-hash@1.1.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:parse-asn1@5.1.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.12",
        "asn1.js": "npm:asn1.js@4.9.1"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:materialize-css@0.98.2": {
      "map": {
        "hammerjs": "npm:hammerjs@2.0.8",
        "node-archiver": "npm:node-archiver@0.3.0",
        "jquery": "npm:jquery@2.2.4"
      }
    },
    "npm:node-archiver@0.3.0": {
      "map": {
        "fstream": "npm:fstream@1.0.11",
        "tar": "npm:tar@2.2.1"
      }
    },
    "npm:tar@2.2.1": {
      "map": {
        "fstream": "npm:fstream@1.0.11",
        "inherits": "npm:inherits@2.0.3",
        "block-stream": "npm:block-stream@0.0.9"
      }
    },
    "npm:fstream@1.0.11": {
      "map": {
        "mkdirp": "npm:mkdirp@0.5.1",
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "rimraf": "npm:rimraf@2.6.1",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.3": {
      "map": {
        "browserify-zlib": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:block-stream@0.0.9": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:mkdirp@0.5.1": {
      "map": {
        "minimist": "npm:minimist@0.0.8"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.3",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:rimraf@2.6.1": {
      "map": {
        "glob": "npm:glob@7.1.2"
      }
    },
    "npm:inflight@1.0.6": {
      "map": {
        "once": "npm:once@1.4.0",
        "wrappy": "npm:wrappy@1.0.2"
      }
    },
    "npm:once@1.4.0": {
      "map": {
        "wrappy": "npm:wrappy@1.0.2"
      }
    },
    "npm:jspm-nodelibs-timers@0.2.1": {
      "map": {
        "timers-browserify": "npm:timers-browserify@1.4.2"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.1"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.0.6"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.1": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:buffer@5.0.6": {
      "map": {
        "ieee754": "npm:ieee754@1.1.8",
        "base64-js": "npm:base64-js@1.2.1"
      }
    },
    "npm:source-map-support@0.4.15": {
      "map": {
        "source-map": "npm:source-map@0.5.6"
      }
    },
    "npm:pbkdf2@3.0.12": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "sha.js": "npm:sha.js@2.4.8",
        "ripemd160": "npm:ripemd160@2.0.1"
      }
    },
    "npm:create-hmac@1.1.6": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "sha.js": "npm:sha.js@2.4.8",
        "ripemd160": "npm:ripemd160@2.0.1",
        "cipher-base": "npm:cipher-base@1.0.4"
      }
    },
    "npm:create-hash@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "sha.js": "npm:sha.js@2.4.8",
        "ripemd160": "npm:ripemd160@2.0.1",
        "cipher-base": "npm:cipher-base@1.0.4"
      }
    },
    "npm:randombytes@2.0.5": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:ripemd160@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@2.0.2"
      }
    },
    "npm:glob@7.1.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "fs.realpath": "npm:fs.realpath@1.0.0",
        "path-is-absolute": "npm:path-is-absolute@1.0.1",
        "once": "npm:once@1.4.0",
        "inflight": "npm:inflight@1.0.6",
        "minimatch": "npm:minimatch@3.0.4"
      }
    },
    "npm:hash-base@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:minimatch@3.0.4": {
      "map": {
        "brace-expansion": "npm:brace-expansion@1.1.8"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:stream-http@2.7.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.3",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
        "xtend": "npm:xtend@4.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:brace-expansion@1.1.8": {
      "map": {
        "concat-map": "npm:concat-map@0.0.1",
        "balanced-match": "npm:balanced-match@1.0.0"
      }
    },
    "npm:typescript@2.4.1": {
      "map": {
        "source-map-support": "npm:source-map-support@0.4.15"
      }
    },
    "npm:readable-stream@2.3.3": {
      "map": {
        "string_decoder": "npm:string_decoder@1.0.3",
        "inherits": "npm:inherits@2.0.3",
        "isarray": "npm:isarray@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "core-util-is": "npm:core-util-is@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:string_decoder@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:hash.js@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:rxjs@5.4.2": {
      "map": {
        "symbol-observable": "npm:symbol-observable@1.0.4"
      }
    },
    "npm:@angular/router@4.2.6": {
      "map": {
        "tslib": "npm:tslib@1.7.1"
      }
    },
    "npm:@angular/platform-browser-dynamic@4.2.6": {
      "map": {
        "tslib": "npm:tslib@1.7.1"
      }
    },
    "npm:@angular/forms@4.2.6": {
      "map": {
        "tslib": "npm:tslib@1.7.1"
      }
    },
    "npm:@angular/http@4.2.6": {
      "map": {
        "tslib": "npm:tslib@1.7.1"
      }
    },
    "npm:crypto-browserify@3.11.1": {
      "map": {
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.3",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "pbkdf2": "npm:pbkdf2@3.0.12",
        "create-hmac": "npm:create-hmac@1.1.6",
        "randombytes": "npm:randombytes@2.0.5",
        "browserify-cipher": "npm:browserify-cipher@1.0.0"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:@angular/core@4.2.6": {
      "map": {
        "tslib": "npm:tslib@1.7.1"
      }
    },
    "npm:@angular/common@4.2.6": {
      "map": {
        "tslib": "npm:tslib@1.7.1"
      }
    },
    "npm:@angular/platform-browser@4.2.6": {
      "map": {
        "tslib": "npm:tslib@1.7.1"
      }
    },
    "npm:@angular/compiler@4.2.6": {
      "map": {
        "tslib": "npm:tslib@1.7.1"
      }
    }
  }
});
