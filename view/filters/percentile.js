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

// A simple percentile calculation.
// 
// Within each activity type, assign a percentile score to the duration of the
// activity. In spite of their name, percentiles range between 0 and 1.

// Requires: activity-sort


Profiler.filters.push(function(data){
	
	if ( ! data.activities )
	{
		console.warn( "This filter requires the [activity-sort] filter." );
	}
	
	var add_perc = function( acts )
	{
		if ( acts.length < 2 ) return acts;
		
		// Make a shallow copy of acts we can sort freely
		var sacts = [];
		for ( var i = 0; i < acts.length; i++ )
			sacts.push(acts[i]);
		
		// Sort activities in sacts by their duration
		sacts.sort(function(a,b){ return a.dur - b.dur; });
		
		var max = sacts.length - 1;
		for ( var i = 0; i <= max; i++ )
			sacts[i].duration_percentile = i / max;
		
		return sacts;
	};
	
	data.sorted = {};
	
	for ( i in data.activities )
		data.sorted[i] = add_perc( data.activities[i] );
});

