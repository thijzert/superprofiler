Superprofiler
=============

Superprofiler is a tool to help gather and visualise profiler data for web pages.
It's called "Superprofiler" because it was a lot better than the one we had, and
that one was simply called "profiler".

Superprofiler is released under the terms of the GPLv3 license.
See the file `LICENSE` for details.


Overview
--------

This repository consists of two parts: libraries to gather profiler data on 
multiple server-side platforms (though, currently, only PHP), and the data
visualisation code.

The visualisation code consists of a number of static HTML, JS, and CSS files
that can be hosted anywhere. The latest stable release can be hotlinked at
http://ametheus.github.com/profiler/ .

Data gathered is passed by encoding it as JSON, and passing it into the URL hash 
of the profiler like so:
 http://ametheus.github.com/profiler/#{...}


Requirements
---------

The requirements for each server-side platform vary somewhat.

### PHP ###
* PHP 5.3.x or greater


