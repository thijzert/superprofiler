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
					totals.push({
						act: k,
						total: data.averages[k].sum,
						count: data.averages[k].count
					});
			totals.sort(function(a,b){return b.total-a.total;});
			
			// Make a list
			var tul = $("<ul></ul>").addClass('total-time');
			var sofar = 0;
			var count = 0;
			var tot = data.dur > 0 ? data.dur : 1;
			for ( var i = 0; i < totals.length; i++ )
			{
				var tit = totals[i].total;
				tul.append(
					$('<li></li>')
						.append($('<strong></strong>')
							.text(totals[i].act))
						.append('<span class="amt">'+totals[i].count+'</span>')
						.append('<span class="time">'+tit.toFixed(3)+'</span>')
						.append('<span class="perc">'+(100*tit/tot).toFixed(2)+'%</span>'));
				
				sofar += totals[i].total;
				count += totals[i].count;
			}
			tul.append(
				$('<li></li>')
					.addClass('unaccounted')
					.append($('<strong></strong>')
						.text('Unaccounted for'))
					.append('<span class="amt"></span>')
					.append('<span class="time">'+(tot - sofar).toFixed(3)+'</span>')
					.append('<span class="perc">'+(100-100*sofar/tot).toFixed(2)+'%</span>'));
			tul.append(
				$('<li></li>')
					.addClass('total')
					.append($('<strong></strong>')
						.text('Total time'))
					.append('<span class="amt">'+count+'</span>')
					.append('<span class="time">'+tot.toFixed(3)+'</span>')
					.append('<span class="perc">100%</span>'));
			
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

