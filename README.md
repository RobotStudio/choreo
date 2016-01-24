# Status

This project is in its infancy.  If you would like to know more, please see
[Contributing](#Contributing) below.


# Synopsis

The Choreo Framework is a microservices framework for assisting in the
development of robotics and _Internet-of-things_ applications.  While it is
lightweight, it intends to act as a more robust framework than [Seneca.js](http://senecajs.org),
a web-based microservices toolkit, and a more flexibile, modern, and
lightweight approach than ROS ("Robot Operating System) yet, in idea, it
borrows from both.

One way to think of Choreo is as an SOA ([Service-Oriented Architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture))
without centralization.  What this means is that a network of services using
the Choreo framework self-organize themselves as peers, and establish
communications across these channels using the [GOSSIP protocol](https://en.wikipedia.org/wiki/Gossip_protocol) to
communicate events, whereby applications within the network can respond and
effect action on the network.  ([More information below.](#Architecture))


# Language

While the framework itself is built in Node.js, the application is built
with [_convention over configuration_](https://en.wikipedia.org/wiki/Convention_over_configuration) in mind, similar to Rails or Sails.js.

This framework is currently intended to be able to work with any software
written in `JavaScript` or `C/C++` (using `ffi`, `SWIG`, `emscripten`, or
similar) allowing integration with most low-level or robotics systems out
there.  There are also probably a handful of ways to compile your language of
choice into JavaScript or to create bindings in order to integrate, but the
goal will be to eventually create several ports of integration wares,
freeing users of adherance to a single language.  See [Contributing](#Contributing) for ways
which you can help.

# Getting Started

## Installation

Install globally to run from anywhere:

    npm install -g choreo

Or, install locally, and add `./node_modules/.bin` to your PATH:

    npm install choreo
    export PATH="$PATH:./node_modules/.bin"


## Creating a project

A Choreo project can contain several _apps_, each performing a specific
function:

    choreo new projectName

This will create a new project in the `projectName` directory.

_More coming soon..._

# Architecture

Upon executing `choreo graph` the application launches the application stack
and a peer server, which begins listening for peers.  When a peer message is
broadcasted on the configured port, the application will attempt to decrypt it
using the configured means, and upon success, will attempt a connect with the
peer server.  Upon launch, a host and port may be specified, allowing for
a peer network connection to establish across subnets.

Once the connection is established, a `peer-connect` event signal goes out to
the applications, allowing for them to handle any connections.

    +----------+  +--------------+   +----------+
    |          |  |--------------|   |          |
    |  Launch  <---|choreo graph||   |  Listen  |
    |   app    |  |--------------| +->   for    |
    |  stack   |  +--------------+ | |  peers   <---+
    |          |         |         | |          |   |
    +----+-----+    +----v-----+   | +-----+----+   |
         |          |          |   |       |        |
         |          |  Launch  |   | +-----v-----+  |
         |          |   peer   +---+ |           |  |
         |          |  server  |     |  Decrypt  |  |
         |          |          |     |   peer    |  |
         |          +----------+     |  message  |  |
     +---v----+                      |           |  |
     |        |    +------------+    +-----+-----+  |
     |  App   |    |            |          |        |
     |  -to-  |    | Establish  |    +-----v-----+  |
     |  peer  <----+   peer     <----+ Validate  +--+
     |  init  |    | connection |    +-----------+
     |        |    |            | Success        Fail
     +---+----+    +------------+
         |
         |       +----------------+
         |       |----------------|
         +-------->   Launched   ||
                 |----------------|
                 +----------------+


Once a connection is established on the peer network, an application (or,
_microservice_) can begin serving connections to the peer network.  These
communications may then exist as peer-to-peer communications, passed through
the middleware stack, or as self-standing applications, only tying into other
microservices on the peer network as the backend to an external, or
front-facing service.  The backend can be used to share resources such as
authentication, data storage, or even access to a load balanced farm of web
scrapers.

All applications on the peer network are assumed to use the same middlewares,
in order to "speak" the same lingo.

                                 +--------------------+
                                 |     Middleware     |
                                 +--------------------+
                                 | +----------------+ |
                                 | |   Encryption   | |
                                 | +----------------+ |
                                 | +----------------+ |    Peer
                             XXXXX | Authentication | |   Network
                             X   | +----------------+ | <--------->
                             X   | +----------------+ |
    +--------------------+   X   | |    Logging     | |
    |      Services      |   X   | +----------------+ |
    +--------------------+   X   | +----------------+ |
    | +----------------+ |   X   | | Comm. Protocol | |
    | |   Encrypt lib  | |   X   | +----------------+ |
    | +----------------+ |   X   +--------------------+
    | +----------------+ XXXXX             |
    | | Data store lib | |                 | Request
    | +----------------+ |                 |
    | +----------------+ |             +---v----+
    | | Authentication | |             |        |
    | +----------------+ |             | Rules  |
    | +----------------+ XXXXX         | Engine |
    | |  MessagePack   | |   X         |        |
    | +----------------+ |   X         +---+----+
    | +----------------+ |   X             |
    | |  Requests lib  | |   X             | Handlers
    | +----------------+ |   X             |
    +--------------------+   X   +---------v---------+
                             X   | Application Stack |
                             X   +-------------------+      WEB
                             X   | +---------------+ |       +
                             X   | |     Echo      | |       |
                             X   | +---------------+ |       |
                             XXXXX +---------------+ |       |
                                 | |   REST API    <------------->
                                 | +---------------+ |       |
                                 | +---------------+ |       |
                                 | |  Web Scraper  +------------->
                                 | +---------------+ |       |
                                 +-------------------+       +

_Services_, as listed in the diagram, are libraries that allow for a common
interface from the perspective of the middleware and applications.  These can
be accessed as global variables and provide access to basic functionality that
is common to all parts of the application.


# Contributing

In order to contribute, for the time being, please create an issue with what
you would like to see.  It's still pretty early in this project's initiation, so be patient with us as we try to get the ball rolling.  Pull requests are
welcome.

# Contact Us

Please contact us at the email associated with our NPM page [here](https://www.npmjs.com/~robotstudio), [follow
Robot Studio on Twitter](https://twitter.com/sokstherobot), or submit an issue on the GitHub
project page for the associated project that you would like to speak about.

