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

// Sort each activity type into separate arrays


Profiler.filters.push(function( data ){
	
	data.activities = {};
	
	/**
	 * Push  val  onto  data.activities[key],  and create it if necessary.
	 **/
	var ppush = function( key, val )
	{
		if ( !(key in data.activities) )
			data.activities[key] = [];
		
		data.activities[key].push( val );
	};
	
	var extract_from = function( section )
	{
		for ( var i = 0; i < section.items.length; i++ )
		{
			var it = section.items[i];
			if ( it.items )
			{
				extract_from( it );
				
				if ( it.class )
				{
					var lass = "" + it.class;
					//console.log("Found classed section [" + lass + "]");
					var p = lass.indexOf(" ");
					
					if ( p > 0 )
					{
						lass = it.class.substr(0,p);
						//console.log("adjusted class [" + lass + "]");
					}
					
					ppush( lass, it );
				}
			}
			else if ( it.name )
			{
				ppush( it.name, it );
			}
		}
	};
	
	extract_from( data );
	
	// If the data is from an official source, we can assume it to be sorted.
	// To be on the safe side, however, we'll want to sort each array anyway.
	for ( i in data.activities )
		data.activities[i].sort( function(a,b){ return a.start - b.start; });
});

