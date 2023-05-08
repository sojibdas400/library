'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    'ember-bootstrap': {
      bootstrapVersion: 4,
      importBootstrapCSS: false,
    },
  });
  app.import('node_modules/bootstrap/dist/js/bootstrap.js');

  return app.toTree();
};
