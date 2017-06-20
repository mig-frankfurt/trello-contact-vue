# Trello Contact Vue

> A Vue.js project

## Install

### Example index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>trello-form</title>
    <link rel="stylesheet" href="/static/css/bulma.css">
    <link rel="stylesheet" href="/static/css/app.css">
  </head>
  <body>
    <div id="vue">
      <div class="container form-container">
        <h1 class="title">Trello Contact Vue</h1>
        <trello-form oauth-key="[oauth-key]" board-id="[board-id]"></trello-form>
      </div>
    </div>
    <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
    <script src="https://api.trello.com/1/client.js?key=[api-key]"></script>
    <!-- built files will be auto injected -->
  </body>
</html>

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
