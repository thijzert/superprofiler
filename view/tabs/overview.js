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
			output.append($("<h3>Total time<h3>"));
			
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
			
			
			// Find the 5 most time-consuming anomalies.
			// That is, find all items with a z-value of 1.5 or more, and display
			// the 5 with the longest duration.
			
			output.append($("<h3>What's taking so long?<h3>"));
			
			var rv = [];
			for ( i in data.sorted )
			{
				var acts = data.sorted[i];
				var l = acts.length < 5 ? acts.length : 5;
				
				for ( var j = 1; j <= l; j++ )
				{
					var it = acts[acts.length - j];
					if ( it.z_value < 1.5 && acts.length > 5 ) continue;
					
					rv.push(it);
				}
			}
			rv.sort(function(a,b){return b.dur - a.dur;});
			
			var wtsl = $("<ul></ul>").addClass('whats-taking-so-long activity-list');
			for ( var i = 0; i < rv.length; i++ )
			{
				var li = $("<li><p>"+rv[i].name+"</p></li>").addClass(rv[i].name);
				Profiler.Util.duration_box( li, rv[i] );
				if ( rv[i].notes )
					for ( var j = 0; j < rv[i].notes.length; j++ )
						li.append($("<p></p>").text(rv[i].notes[j]));
				wtsl.append(li);
			}
			
			output.append( wtsl );
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

