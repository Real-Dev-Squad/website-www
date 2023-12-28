import FastBootAppServer from 'fastboot-app-server';

const MY_GLOBAL = 'MY GLOBAL';

let server = new FastBootAppServer({
  distPath: 'dist/',
  gzip: true, // Optional - Enables gzip compression.
  buildSandboxGlobals(defaultGlobals) {
    // Optional - Make values available to the Ember app running in the FastBoot server, e.g. "MY_GLOBAL" will be available as "GLOBAL_VALUE"
    return Object.assign({}, defaultGlobals, { GLOBAL_VALUE: MY_GLOBAL });
  },
  log: true, // Optional - Specifies whether the server should use its default request logging. Useful for turning off default logging when providing custom logging middlewares
  chunkedResponse: true, // Optional - Opt-in to chunked transfer encoding, transferring the head, body and potential shoeboxes in separate chunks. Chunked transfer encoding should have a positive effect in particular when the app transfers a lot of data in the shoebox.
});

server.start();
