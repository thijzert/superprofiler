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
https://thijzert.github.io/superprofiler/ .

Data gathered is passed by encoding it as JSON, and passing it into the URL hash 
of the profiler like so:
 https://thijzert.github.io/superprofiler/#{...}


Demo
----
To see SP in action, check out the [hosted version with some randomly generated data](https://thijzert.github.com/superprofiler/#{"name":"root","items":[{"name":"A","items":[{"name":"cache read","start":0.000165,"dur":0.008259},{"name":"B","items":[{"name":"cache read","start":0.008481,"dur":0.004396},{"name":"db","start":0.012902,"dur":0.003086},{"name":"cache write","start":0.01601,"dur":0.005586},{"name":"db","start":0.021624,"dur":0.00266},{"name":"db","start":0.024319,"dur":0.003437},{"name":"db","start":0.027791,"notes":["This is a note for <emph>db<\/emph>","This is a note for <emph>db<\/emph>"],"dur":0.002907},{"name":"db","start":0.030725,"dur":0.003251},{"name":"cache write","start":0.034024,"dur":0.008485},{"name":"cache read","start":0.042545,"dur":0.00361},{"name":"cache read","start":0.0462,"dur":0.006617},{"name":"cache read","start":0.052889,"dur":0.005133},{"name":"fs write","start":0.058054,"dur":0.010828},{"name":"cache read","start":0.068915,"dur":0.00179},{"name":"db","start":0.070728,"dur":0.001469},{"name":"net","start":0.072211,"dur":0.013951},{"name":"C","items":[{"name":"db","start":0.086223,"dur":0.002136},{"name":"db","start":0.088373,"dur":0.003798},{"name":"db","start":0.092196,"dur":0.002429},{"name":"cache read","start":0.094639,"notes":["This is a note for <emph>cache read<\/emph>","This is a note for <emph>cache read<\/emph>","This is a note for <emph>cache read<\/emph>"],"dur":0.002839},{"name":"cache write","start":0.097501,"dur":0.002502},{"name":"cache read","start":0.100016,"dur":0.007695},{"name":"cache read","start":0.107736,"dur":0.006456},{"name":"cache read","start":0.114217,"dur":0.003241},{"name":"cache write","start":0.117476,"dur":0.006441},{"name":"net","start":0.123953,"dur":0.013064},{"name":"db","start":0.137048,"dur":0.004089},{"name":"cache read","start":0.141153,"dur":0.003843},{"name":"db","start":0.145011,"dur":0.002915},{"name":"db","start":0.147942,"dur":0.002504}],"start":0.086202,"notes":["I felt compelled to tell you CCCCC!!"],"dur":0.064278},{"name":"db","start":0.150508,"dur":0.003494},{"name":"cache read","start":0.154017,"dur":0.004264},{"name":"db","start":0.158305,"dur":0.003492},{"name":"db","start":0.161813,"notes":["This is a note for <emph>db<\/emph>","This is a note for <emph>db<\/emph>"],"dur":0.00402},{"name":"cache read","start":0.165852,"dur":0.004512},{"name":"cache write","start":0.17038,"dur":0.003027},{"name":"db","start":0.173422,"dur":0.00091},{"name":"db","start":0.174348,"notes":["This is a note for <emph>db<\/emph>"],"dur":0.001895},{"name":"cache read","start":0.176257,"dur":0.005066},{"name":"db","start":0.181338,"dur":0.003363},{"name":"db","start":0.184716,"dur":0.002677},{"name":"cache read","start":0.187409,"dur":0.008176},{"name":"cache read","start":0.195602,"notes":["This is a note for <emph>cache read<\/emph>","This is a note for <emph>cache read<\/emph>","This is a note for <emph>cache read<\/emph>"],"dur":0.00512},{"name":"fs write","start":0.200736,"notes":["This is a note for <emph>fs write<\/emph>","This is a note for <emph>fs write<\/emph>","This is a note for <emph>fs write<\/emph>"],"dur":0.01238},{"name":"db","start":0.213137,"dur":0.003332},{"name":"db","start":0.216484,"dur":0.002001}],"start":0.008467,"notes":["I felt compelled to tell you BBBBB!!","I felt compelled to tell you CCCCC!!","I felt compelled to tell you CCCCC!!","I felt compelled to tell you CCCCC!!"],"dur":0.210029},{"name":"db","start":0.218518,"notes":["This is a note for <emph>db<\/emph>","This is a note for <emph>db<\/emph>"],"dur":0.003115},{"name":"db","start":0.221652,"dur":0.001264},{"name":"cache read","start":0.222931,"dur":0.003448},{"name":"cache read","start":0.226395,"dur":0.003126},{"name":"cache read","start":0.229543,"dur":0.00676},{"name":"db","start":0.236318,"dur":0.002804},{"name":"db","start":0.239142,"notes":["This is a note for <emph>db<\/emph>","This is a note for <emph>db<\/emph>","This is a note for <emph>db<\/emph>"],"dur":0.003153},{"name":"db","start":0.242309,"dur":0.003113},{"name":"cache read","start":0.245437,"dur":0.005678},{"name":"db","start":0.251125,"dur":0.003353},{"name":"D","items":[{"name":"db","start":0.254515,"dur":0.004816},{"name":"db","start":0.259347,"dur":0.001647},{"name":"db","start":0.26102,"dur":0.003107},{"name":"fs read","start":0.264142,"dur":0.007434},{"name":"net","start":0.271592,"dur":0.006989},{"name":"fs write","start":0.278597,"dur":0.011305},{"name":"db","start":0.289919,"dur":0.002433},{"name":"db","start":0.292366,"dur":0.003206},{"name":"db","start":0.295586,"notes":["This is a note for <emph>db<\/emph>","This is a note for <emph>db<\/emph>"],"dur":0.002272}],"start":0.2545,"dur":0.043364},{"name":"db","start":0.297883,"dur":0.003451},{"name":"E","items":[{"name":"cache write","start":0.301373,"dur":0.003837},{"name":"db","start":0.305225,"dur":0.002338},{"name":"cache read","start":0.307578,"dur":0.004131},{"name":"cache read","start":0.311733,"notes":["This is a note for <emph>cache read<\/emph>","This is a note for <emph>cache read<\/emph>"],"dur":0.003938},{"name":"db","start":0.315692,"dur":0.003359},{"name":"cache read","start":0.319066,"dur":0.005128},{"name":"db","start":0.324208,"dur":0.002648},{"name":"db","start":0.326872,"dur":0.004138},{"name":"db","start":0.331026,"dur":0.00512},{"name":"db","start":0.336161,"dur":0.002814},{"name":"db","start":0.338989,"dur":0.003594}],"start":0.301352,"notes":["I felt compelled to tell you EEEEE!!"],"dur":0.041238},{"name":"cache write","start":0.342612,"dur":0.007468}],"start":0.000102,"notes":["I felt compelled to tell you CCCCC!!","I felt compelled to tell you CCCCC!!"],"dur":0.349985}],"dur":0.3501}).


Requirements
---------

The requirements for each server-side platform vary somewhat.

### PHP ###
* PHP 5.3.x or greater


