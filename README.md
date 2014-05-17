Vellum
======

Vellum is a JavaRosa [XForm](http://en.wikipedia.org/wiki/XForms) designer built by
[Dimagi][0] for [CommCare HQ][1].

 [0]: http://www.dimagi.com
 [1]: http://www.commcarehq.org


Usage
-----

### Setup

Install dependencies:
```
$ npm install -g bower requirejs
$ npm install
```

There are three ways to load Vellum, depending on whether you want asychronous
module loading, and whether jQuery, jQueryUI, and Bootstrap are already loaded
on the page.

Asynchronous, will use existing jQuery, jQueryUI, Boostrap (V2) plugins if present:
```html
<script src="bower_components/requirejs/require.js"></script>
<script>
    require.config({
        baseUrl: '/path/to/vellum/src'
    });
</script>
```

Bundled with all dependencies:
```
$ grunt dist
```

```html
<script src="dist/main.min.js"></script>
<script>
</script>
```

Bundled with all dependencies except jQuery, jQuery UI, and Bootstrap plugins,
expects them already to be loaded:
```
$ grunt dist-min
```

```html
<script src="dist/main.no-jquery.min.js"></script>
<script>
</script>
```

Finally, for all three:
```javascript
require(["main"], function ($) {
    $("#formdesigner").vellum(options)
});
```


### Options

Todo


Contributing
------------

### Coding style

Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

### Tests

Run tests in a browser:
```
$ python -m SimpleHTTPServer
$ chromium-browser http://localhost:8000
```

Run tests headlessly (currently broken):
```
$ npm install -g phantomjs
$ npm test
```

### Testing on Heroku

This repo can be deployed to Heroku using
[heroku-buildpack-vellum](http://github.com/mwhite/heroku-buildpack-vellum),
which is just a fork of
[heroku-buildpack-static](https://github.com/pearkes/heroku-buildpack-static)
with the build script from the standard Node.js buildpack added in order to
install dependencies.

Until [prune.io](http://prune.io/) is available, we use
Rainforest's [fourchette](https://github.com/jipiboily/fourchette) along with a
[slightly modified version](https://github.com/mwhite/fourchette-vellum) of
their example fourchette app in order to create an isolated test environment for
each Pull Request on Heroku.

The latest master is also deployed to
[vellum-master.herokuapp.com](http://vellum-master.herokuapp.com) using
[drone.io](http://drone.io).
