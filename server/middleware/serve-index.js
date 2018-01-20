const { stripIndent } = require("common-tags");

const createServeIndex = () => {
  return ctx => {
    ctx.body = stripIndent`
      <!doctype html>
      <html style="-webkit-font-smoothing: antialiased;">
        <head>
          <meta charset="utf-8">
          <title>Bitcoin Hotspot</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="/css/normalize.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600" />
          <style id="styles"></style>
        </head>
        <body>
          <div id="app"></div>
          <script src="/js/app.js"></script>
        </body>
      </html>
    `;
  };
};

module.exports = createServeIndex;
