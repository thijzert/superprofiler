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

// Simple averaging.
// 
// Calculates the average duration, the standard deviation, and the percentage
// of activities that return with an error.

// Requires: activity-sort

Profiler.filters.push(function(data){
	
	data.averages = {};
	
	if ( ! data.activities )
	{
		console.warn( "This filter requires the [activity-sort] filter." );
		return;
	}
	
	for ( i in data.activities )
	{
		var act = data.activities[i];
		var avg = data.averages[i] = {
			count: act.length,
			errors: 0,
			sum: 0,
			sumsquared: 0
		};
		
		if ( avg.count == 0 )
		{
			avg.average = avg.variance = avg.stddev = 0;
			continue;
		}
		
		var j;
		// Calculate the sum
		for ( j = 0; j < act.length; j++ )
		{
			avg.sum += act[j].dur;
			
			if ( act[j].error )
				avg.errors++;
		}
		
		// Average
		avg.average = avg.sum / avg.count;
		
		// Variance
		for ( j = 0; j < act.length; j++ )
		{
			avg.sumsquared += ( avg.average - act[j].dur ) * 
			                  ( avg.average - act[j].dur );
		}
		avg.variance = avg.sumsquared / avg.count;
		
		// Standard deviation
		avg.stddev = Math.sqrt(avg.variance);
		if ( avg.stddev == 0 ) continue;
		
		// The Z-value of each activity
		for ( j = 0; j < act.length; j++ )
		{
			act[j].z_value = ( act[j].dur - avg.average ) / avg.stddev;
		}
	}
	
});
