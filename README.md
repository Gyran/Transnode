Screencast: https://www.youtube.com/watch?v=DbuMCwqs5DY

Transnode
===========

A project in the course **TDDD27** - Advanced Web Programming, VT-2013

**Gustav Ahlberg**, gusah849@student.liu.se

Functional specification
-------------------------
I will create a web user interface for the torrent client Transmission. In the webui you can see your torrents from Transmission. You can start and stop torrents, see all the information about the torrents, add new torrents, delete torrents and data. You can also change the settings for Transmission.
The application will also have support for different plugins. Most of the different functionality will be added with different plugins. An plugin can for example be a cookie plugin that will make it possible to download torrents from password protected sites.


Technical specification
-------------------------
### Server
I will use ``nodejs`` on the server with the ``express`` framework for easily serving static javascript and stylesheet files. Also to be able to preprocess some files before they are sent to the client. I will use ``LESS`` for style and express makes it possible to compile the less files. All javascript files will also be minified before they are sent to the client using middlewares in express.
The data that need to be stored will be stored using ``sqlite`` because I like that I don’t need to have a separate database server running. 
The server will be tested using ``vows`` because I have seen it in some other projects and it looks useful. 

### Client
The client will be using ``emberjs`` and ``handlebars`` because it looks like it can be a powerful framework and I want to learn how to use a MVC client-side framework and I like to use templates. I will also use ``bootstrap`` to get good looking components. ``jQuery`` is a dependency for both emberjs and bootstrap so it will also be included. 
The communication between the client and the server will be using ``websockets`` using ``sockets.io`` to send JSON data. 
The client will be tested using ``jasmine``.
