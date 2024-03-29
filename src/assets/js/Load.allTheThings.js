// Generated by CoffeeScript 1.3.3

/*
     __                           __                ___    ___  ______  __              ______  __
    /\ \                         /\ \              /\_ \  /\_ \/\__  _\/\ \            /\__  _\/\ \      __
    \ \ \        ___      __     \_\ \         __  \//\ \ \//\ \/_/\ \/\ \ \___      __\/_/\ \/\ \ \___ /\_\    ___      __     ____
     \ \ \  __  / __`\  /'__`\   /'_` \      /'__`\  \ \ \  \ \ \ \ \ \ \ \  _ `\  /'__`\ \ \ \ \ \  _ `\/\ \ /' _ `\  /'_ `\  /',__\
      \ \ \L\ \/\ \L\ \/\ \L\.\_/\ \L\ \  __/\ \L\.\_ \_\ \_ \_\ \_\ \ \ \ \ \ \ \/\  __/  \ \ \ \ \ \ \ \ \ \/\ \/\ \/\ \L\ \/\__, `\
       \ \____/\ \____/\ \__/.\_\ \___,_\/\_\ \__/.\_\/\____\/\____\\ \_\ \ \_\ \_\ \____\  \ \_\ \ \_\ \_\ \_\ \_\ \_\ \____ \/\____/
        \/___/  \/___/  \/__/\/_/\/__,_ /\/_/\/__/\/_/\/____/\/____/ \/_/  \/_/\/_/\/____/   \/_/  \/_/\/_/\/_/\/_/\/_/\/___L\ \/___/
                                                                                                                         /\____/
                                                                                                                         \_/__/
    ==================================================================================================================================
    ----------------------------------------------------------------------------------------------------------------------------------
*/


/*!
    Load.allTheThings v0.7.2 - 12 September, 2012

    (c) Amsul Naeem, 2012 - http://amsul.ca
    Licensed under MIT ("expat" flavour) license.
    Hosted on http://github.com/amsul/Load.allTheThings

    This library creates a Load object which can be used to
    preload things before they are needed on your page. It can
    load images, fonts, stylesheets, scripts, and html.

    To invoke the loader, use Load.allTheThings()
    For more documentation, check http://github.com/amsul/Load.allTheThings


    * Note: Load.fonts is required to load fonts (http://github.com/amsul/Load.fonts)
*/


/*jshint debug: true, browser: true, devel: true, curly: false, forin: false, nonew: true, plusplus: false
 */


(function() {
    var Load,
        __hasProp = {}.hasOwnProperty;

    Load = (function() {
        var dom, self;

        function Load() {}

        window.Load = Load;

        self = {};

        dom = {
            get: function(selector) {
                if (selector && typeof selector === 'string') {
                    if (selector.match(/^#/)) {
                        return document.getElementById(selector.replace(/^#/, ''));
                    } else if (selector.match(/^\./)) {
                        return document.getElementsByClassName(selector.replace(/^\./, ''));
                    } else {
                        return document.querySelectorAll(selector);
                    }
                }
                return null;
            }
        };

        /*
            Load all the things!
            ========================================================================
        */


        Load.allTheThings = function(options) {
            self.beginLoading(options);
            return Load;
        };

        /*
            When loading begins, do some things
            ========================================================================
        */


        self.beginLoading = function(options) {
            var context, key, value, _ref;
            self.PROGRESS = 0;
            self.THINGS = 0;
            self.THINGS_LOADED = 0;
            options = options || {};
            Load.options = options;
            self.defaults = {
                thingsToLoad: ['images'],
                within: null,
                progressId: null,
                progressBarId: null,
                thingsId: null,
                thingsLoadedId: null,
                cleanUp: false,
                onError: function(thing) {
                    return Load;
                },
                onLoad: function(thing) {
                    return Load;
                },
                onComplete: function() {
                    return Load;
                }
            };
            _ref = self.defaults;
            for (key in _ref) {
                if (!__hasProp.call(_ref, key)) continue;
                value = _ref[key];
                Load.options[key] = options[key] || value;
            }
            if (Load.options.thingsToLoad.indexOf('fonts' !== -1)) {

            }
            Load.elemProgress = dom.get('#' + Load.options.progressId);
            Load.elemProgressBar = dom.get('#' + Load.options.progressBarId);
            Load.elemThings = dom.get('#' + Load.options.thingsId);
            Load.elemThingsLoaded = dom.get('#' + Load.options.thingsLoadedId);
            if (Load.elemThingsLoaded) {
                Load.elemThingsLoaded.innerHTML = self.THINGS_LOADED;
            }
            if (Load.elemProgress) {
                Load.elemProgress.innerHTML = self.PROGRESS;
            }
            context = (function() {
                var selector;
                selector = dom.get(Load.options.within);
                return selector || document;
            })();
            if (context) {
                self.loadAllThingsWithin(context);
            }
            if (Load.elemThings) {
                Load.elemThings.innerHTML = self.THINGS;
            }
            if (Load.elemProgressBar) {
                Load.elemProgressBar.style.width = 0 + '%';
            }
            return self;
        };

        /*
            Add things to a collection to be loaded
            ========================================================================
        */


        self.loadAllThingsWithin = function(context) {
            var collectionOfNodes, collectionOfThings, node, thingsToLoad, type, _i, _j, _len, _len1;
            collectionOfNodes = [];
            collectionOfThings = [];
            if (context.constructor.name === 'NodeList') {
                for (_i = 0, _len = context.length; _i < _len; _i++) {
                    node = context[_i];
                    collectionOfNodes.push(node);
                }
            } else {
                collectionOfNodes.push(context);
            }
            thingsToLoad = Load.options.thingsToLoad;
            thingsToLoad = typeof thingsToLoad === 'string' ? [thingsToLoad] : thingsToLoad;
            for (_j = 0, _len1 = thingsToLoad.length; _j < _len1; _j++) {
                type = thingsToLoad[_j];
                self.findThings(collectionOfNodes, collectionOfThings, type);
            }
            self.THINGS += collectionOfThings.length;
            return self;
        };

        /*
            Find things to load in a collection
            ========================================================================
        */


        self.findThings = function(collectionNodes, collectionThings, type) {
            var filterThenLoad, node, selector, things, _i, _len;
            filterThenLoad = function(things, type) {
                var thing, _i, _len;
                for (_i = 0, _len = things.length; _i < _len; _i++) {
                    thing = things[_i];
                    if (thing.dataset && thing.dataset.src) {
                        self.load(thing, type);
                        collectionThings.push(thing);
                    }
                }
                return self;
            };
            selector = (function() {
                switch (type) {
                    case 'images':
                        return 'img';
                    case 'fonts':
                        return 'font';
                    case 'css':
                        return 'link';
                    case 'js':
                        return 'script';
                    case 'html':
                        return 'section';
                    case 'data':
                        return 'code';
                    default:
                        throw 'Thing type \'' + type + '\' is unknown';
                }
            })();
            for (_i = 0, _len = collectionNodes.length; _i < _len; _i++) {
                node = collectionNodes[_i];
                things = node.querySelectorAll(selector);
                if (things.length) {
                    filterThenLoad(things, type);
                }
            }
            return self;
        };

        /*
            Load things based on type of things
            ========================================================================
        */


        self.load = function(thing, type) {
            var font, request;
            if (type === 'fonts') {
                font = new Font();
                self.addHandlers(font, type);
                font.fontFamily = thing.dataset.family;
                font.src = thing.dataset.src;
            } else {
                request = thing.dataset.src;
                self.addHandlers(thing, type);
                if (type === 'css') {
                    thing.href = request;
                } else {
                    thing.src = request;
                }
            }
            self.doCleanUp(thing, type);
            return self;
        };

        /*
            Do a clean up of the thing data-src
            ========================================================================
        */


        self.doCleanUp = function(thing, type) {
            thing.removeAttribute('data-src');
            if (type === 'data' || type === 'fonts') {
                if (Load.options.cleanUp) {
                    thing.outerHTML = '';
                } else {
                    thing.style.display = 'none';
                }
            }
            return self;
        };

        /*
            Update the progress as things load
            ========================================================================
        */


        self.thingLoaded = function(thing, type, request) {
            self.THINGS_LOADED += 1;
            self.PROGRESS = self.THINGS_LOADED / self.THINGS * 100;
            if (Load.elemProgress) {
                Load.elemProgress.innerHTML = self.PROGRESS;
            }
            if (Load.elemProgressBar) {
                Load.elemProgressBar.style.width = self.PROGRESS + '%';
            }
            if (Load.elemThingsLoaded) {
                Load.elemThingsLoaded.innerHTML = self.THINGS_LOADED;
            }
            if (type === 'html') {
                thing.innerHTML = request.responseText;
            } else if (type === 'data') {
                self.addToCache(thing, type, request.responseText);
            }
            Load.options.onLoad(thing, type);
            if (self.THINGS_LOADED === self.THINGS) {
                self.loadComplete();
            }
            return self;
        };

        /*
            Update the progress as things load
            ========================================================================
        */


        self.loadComplete = function() {
            Load.options.onComplete();
            return self;
        };

        /*
            Bind and unbind some events
            ========================================================================
        */


        self.bind = function(thing, listener, handler) {
            thing.addEventListener(listener, handler, false);
            return self;
        };

        self.unbind = function(thing, listener, handler) {
            thing.removeEventListener(listener, handler);
            return self;
        };

        /*
            Add and remove handlers
            ========================================================================
        */


        self.addHandlers = function(thing, type) {
            var onError, onLoad, request;
            if (type === 'images' || type === 'css' || type === 'js') {
                self.commonHandlers(thing, type);
            } else if (type === 'fonts') {
                onLoad = function() {
                    self.removeHandlers(thing, type).thingLoaded(thing, type);
                };
                onError = function() {
                    self.removeHandlers(thing, type);
                    Load.options.onError(thing, type);
                };
                thing.onload = onLoad;
                thing.onerror = onError;
            } else if (type === 'html' || type === 'data') {
                request = new XMLHttpRequest();
                request.onload = function(e) {
                    self.removeHandlers(request, type).thingLoaded(thing, type, request);
                };
                request.onreadystatechange = function(e) {
                    if (request.readyState === 4 && request.status === 200) {
                        self.removeHandlers(request, type).thingLoaded(thing, type, request);
                    }
                };
                request.onerror = function() {
                    self.removeHandlers(request, type);
                };
                request.open('GET', thing.dataset.src, true);
                request.send();
            } else {
                console.log('no add handler', thing, type);
            }
            return self;
        };

        self.removeHandlers = function(thing, type) {
            if (type === 'images' || type === 'css' || type === 'js') {
                self.unbind(thing, 'load', thing.onLoad).unbind(thing, 'readyStateChange', thing.onReadyStateChange).unbind(thing, 'error', thing.onError);
            } else if (type === 'fonts') {
                thing.onload = function() {};
                thing.onerror = function() {};
            } else if (type === 'html' || type === 'data') {
                thing.onload = function() {};
                thing.onreadystatechange = function() {};
                thing.onerror = function() {};
            } else {
                console.log('no remove handler', thing, type);
            }
            return self;
        };

        self.commonHandlers = function(thing, type) {
            var onError, onLoad, onReadyStateChange;
            onLoad = function(e) {
                self.removeHandlers(thing, type).thingLoaded(thing, type);
            };
            onReadyStateChange = function(e) {
                if (thing.readyState === 'complete') {
                    self.removeHandlers(thing, type).thingLoaded(thing, type);
                }
            };
            onError = function(e) {
                self.removeHandlers(thing, type);
                Load.options.onError(thing, type);
            };
            self.bind(thing, 'load', onLoad).bind(thing, 'readyStateChange', onReadyStateChange).bind(thing, 'error', onError);
            return self;
        };

        /*
            Add a thing to the cache
            ========================================================================
        */


        self.addToCache = function(thing, type, content) {
            var item;
            self.cache = self.cache || {};
            if (type === 'data') {
                item = JSON.parse(content);
                if (thing.dataset && thing.dataset.name) {
                    self.cache[thing.dataset.name] = item;
                } else {
                    throw 'No name given to this type \'' + type + '\'';
                }
            }
            return self;
        };

        /*
            Get a thing from cache
            ========================================================================
        */


        Load.getCached = function(name) {
            var cachedThing;
            cachedThing = self.cache[name];
            if (cachedThing) {
                return cachedThing;
            }
        };

        return Load;

    })();

}).call(this);