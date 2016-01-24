/*
 * Copyright (c) 2015 Robot Studio, LLC, LGPL-3 License
 *
 *  This file is part of Choreo.
 *
 *  Choreo is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Choreo is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict'

var _ = require('lodash');

var version = require('package.json')
  .version;

/* 
 * Synopsis:
 *
 *  The choreo server starts, detects the network (from configuration, or
 *  otherwise) then it launches a UDP broadcast campaign to direct unknown
 *  agents to authenticate with itself.
 *
 *  Once authentication occurs, the node network communicates freely using
 *  the SWIM gossip protocol.  The communication establishes a decentralized
 *  layout, allowing various nodes to publish or subscribe to topics.
 */
