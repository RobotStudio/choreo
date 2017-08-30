# Status

This project is in its infancy.  If you would like to know more, please see
[Contributing](#contributing) below.


# Synopsis

The Choreo Framework is a microservices framework for assisting in the
development of robotics and _Internet-of-things_ applications.  While it is
lightweight, it intends to act as a more more flexible and modular approach
than ROS ("Robot Operating System).

One way to think of Choreo is as an SOA ([Service-Oriented Architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture))
without centralization.  What this means is that a network of services using
the Choreo framework self-organize themselves as peers, and establish
communications across these channels using the [GOSSIP protocol](https://en.wikipedia.org/wiki/Gossip_protocol) to
communicate events, whereby applications within the network can respond and
effect action on the network.  ([More information below.](#architecture))


### Key Features

This is a preliminary list, and not at all the current state of things:
- Service Authentication + Authorization
- Network encryption
- Minimal knowledge required to get fully-capable robotics platform
- Modular architecture, allowing swappable technologies (ie- [DDS](https://en.wikipedia.org/wiki/Data_Distribution_Service))
- Ingress protection
- Cloud integration
- Language and platform/technology agnostic
- Highly extensible/configurable


## Road Map

We are currently creating several PoC pieces to integrate various systems to
create a *development stack* for robotics that is comparable to [ROS](http://www.ros.org/core-components/).

* Integration with [`Consul`, `Serf`, `Swim`, and `Gossip` (Hashicorp Protocols)](https://www.hashicorp.com/)
  for decentralized resource management, configuration, and auth.
* Integration with [GRPC](https://grpc.io) for language-agnostic messaging.
* Communication using Protocol Buffers.


# Language

While the core of the framework is being built in Golang, the application is
built to be language-agnostic and with [_convention over configuration_](https://en.wikipedia.org/wiki/Convention_over_configuration) in
mind.

The core Choreo libraries are created using the Go programming language,
and will likely incorporate some mix of code generation and external libraries
to build compliant interfaces for your chosen language.


# Getting Started

## Installation

We aren't currently providing binary distribution.  With that, you are welcome
to download the application using your Golang environment.

Make sure you have your Go environment setup, and the `$GOPATH/bin` in your
`$PATH`.  See the GoLang instructions for your distribution.

    go get github/RobotStudio/choreo


## Creating a project

** NOTE: ** This does not currently work.

A Choreo project can contain several _apps_, each performing a specific
function:

    choreo new projectName

This will create a new project in the `projectName` directory.

_More coming soon..._


# Architecture

### Overview

The _stack_, as it stands.

```
    +================+
    |     Cloud      |
    |  Integrations  |
    +----------------+
    |     Auth       |
    +----------------+
    |    Config      |
    +----------------+
    |    Events      |
    +----------------+
    |   Membership   |
    +----------------+
    |    Discovery   |
    +----------------+
    |  Communication |
    +----------------+
    |    Physical    |
    +================+
```

- Cloud Integrations ([tafy.io](https://tafy.io) _TBD ... coming soon_)
- Auth ([Consul](https://github.com/hashicorp/consul))
- Configuration ([Consul](https://github.com/hashicorp/consul))
- Events ([Serf](https://www.serf.io/))
- Membership ([SWIM](https://www.cs.cornell.edu/~asdas/research/dsn02-swim.pdf))
- Discovery ([Gossip](https://en.wikipedia.org/wiki/Gossip_protocol))
- Communication ([GRPC](https://grpc.io))
- Physical ([Imagen](https://github.com/RobotStudio/imagen) _TBD ... coming soon_)

Each of the layers is built independently, and the architecture intends to be
modular, allowing for any of these technologies to be swapped to meet the
needs of the individual.

While this isn't the typical `middleware` model, it aims to achieve similar
design considerations.


### Design

Consider the following architecture for a given robot:

                        XXX
                    XXXXX XXX    XXXXXX
                 XXX        XXXXXX    XXX
          XXXXXXXX           XX          XXXXXXXXX
         X                                XX     XX
         XXX           CLOUD SERVICES             XX
           XXX                                     X
             XX          X                         X
              XXX       XX  XX+X        XXX      XXX
                XXXXXXXXX XXX |XX      XX XXXXXXXX
                        XXX   | XXXXXXXX
                              |     XX
                              |
                              |
                              |
                              |
                          +---+--+
                          |      |
                          | RPi  | Gateway
                          |      |
                          +--+---+
                             |
                             |
                        +----+-----+
                        | Ethernet |
             +----------+  Switch  +-----------+
             |          +----+-----+           |
             |               |                 |
             |               |                 |
         +---+--+         +--+---+         +---+--+
         |      |         |      |         |      |
         | RPi  |         | RPi  |         | RPi  |
         |      |         |      |         |      |
         +----+-+         +----+-+         +----+-+
              |                |                |
              |                |                |
        +-----+----+     +-----+----+     +-----+----+
        |          |     |          |     |          |
        |  Arduino |     |  Arduino |     |  Arduino |
        |          |     |          |     |          |
        +----+-----+     +-+-------++     +-+--------+
             |             |       |        |
        +----+------+      | +---+ |        |  XXXXXXX
        |Peripherals|      +---| +-+        | X X     X
        +-----------+        +---+          +-+ X     XXX
                                              X X     X
                            Sensors            XXXXXXX
                                              Actuators

_In this example, the Raspberry Pi's could be any embedded Linux platform, and
Arduino's could be any embedded controller capable of interfacing with
Hardware._

In this design, the RPi would be installed with a standard image (Imagen) and
would autodetect hardware on the Arduino's using standard images that it would
deploy to the detected device.  Essentially, auto-configuring the physical
application using a _Plug & Play_ type interface.

The standard Imagen images will come with the Hashicorp suite of tools,
allowing for discovery and membership between the RPi devices.  To read more
about the images, visit the [Imagen](https://github.com/RobotStudio/imagen)
GitHub page.

In this setup, Choreo would _choreograph_ the entities, both: software and
hardware, into a cohesive solution.  With a web interface on the Gateway, and
the backend configuration deployed across the network using Consul, the robot
can then automatically assemble and integrate with cloud-based AI solutions
with minimal input from the user.


# Contributing

In order to contribute, for the time being, please create an issue with what
you would like to see.  It's still pretty early in this project's initiation,
so please be patient with us as we try to get the ball rolling.  Pull requests
are welcome, but not advised unless you've already reached out to us.

# Contact Us

Please contact me at the email [bobby _AT_ robot.studio](), [follow
Robot Studio on Twitter](https://twitter.com/sokstherobot), or submit an issue on the GitHub
project page for the associated project that you would like to speak about.

