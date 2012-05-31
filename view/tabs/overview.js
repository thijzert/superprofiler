/*
	Copyright (C) 2012 Thijs van Dijk
	
	This file is part of Superprofiler.
	
	Superprofiler is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	Superprofiler is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	
	You should have received a copy of the GNU General Public License
	along with Superprofiler.  If not, see <http://www.gnu.org/licenses/>.
*/

// Overview
// 
// Shows the total time spent in all activities and/or section classes,
// statistically significant outliers, error rates, etc.

Profiler.tabs.push({
	"title": "Overview",
	"id":    "overview",
	"renderer": (function(){
		
		var ov_t = function( data, output )
		{
			output.append($("<h3>Total time<h3>"))
			
			// Take the total time each activity type cost, and sort in reverse
			var totals = [];
			for ( k in data.averages )
				if ( data.averages[k].sum > 0 )
					totals.push({act: k, total: data.averages[k].sum});
			totals.sort(function(a,b){return b.total-a.total;});
			
			// Make a list
			var tul = $("<ul></ul>").addClass('total-time');
			var sofar = 0;
			for ( var i = 0; i < totals.length; i++ )
			{
				tul.append(
					$('<li></li>')
						.append($('<strong></strong>')
							.html(totals[i].act))
						.append($('<span></span>')
							.html(totals[i].total)));
				sofar += totals[i].total;
			}
			tul.append(
				$('<li></li>')
					.addClass('unaccounted')
					.append($('<strong></strong>')
						.html('Unaccounted for'))
					.append($('<span></span>')
						.html(data.dur - sofar)));
			
			output.append(tul);
		};
		return ov_t;
	})(),
	"destroy": (function(){
		return function( tab ){
			tab.find('*').remove();
			tab.text('');
		};
	})()
});

