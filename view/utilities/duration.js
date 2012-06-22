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

// Contains some utility functions for formatting duration times.

Profiler.Util.format_duration = function( sec )
{
	if ( typeof(sec) == 'undefined' ) return "?";
	
	if ( sec < 0 )
		return "This took " + sec + " seconds for some reason.";
	
	if ( sec > 3600 )
		return Math.floor(sec / 3600) + "h" +
			Math.floor((sec % 3600)/60) + "m";
	if ( sec > 60 )
		return Math.floor(sec / 60) + "m" +
			Math.floor(sec % 60) + "s";
	
	if ( sec > 1 )
		return sec.toPrecision( 4 ) + "s";
	if ( sec > 0.001 )
		return (sec * 1000).toPrecision( 4 ) + "ms";
	return (sec * 1000000).toFixed(0) + "&micro;s";
};



Profiler.Util.duration_box = (function()
{
	// Shorthands
	var format_duration = Profiler.Util.format_duration;
	
	
	// The min/max colour intensity. (high -> white -> barely visible)
	var colour_min = 200;
	var colour_max = 0;
	
	
	// Generate a greyscale colour from a single intensity channel
	var white = function( intensity )
	{
		intensity = intensity.toFixed(0);
		if ( intensity < 0 ) intensity = 0;
		if ( intensity > 255 ) intensity = 255;
		
		return "rgb(" + intensity + "," + intensity + "," + intensity + ")";
	};
	
	var colourbox_zvalue = function( act )
	{
		var rv = $("<span></span>")
			.addClass('duration')
			.html(format_duration(act.dur));
		
		if ( !('z_value' in act) )
			return rv;
		
		if ( act.z_value < -2 )
		{
			rv.css({color: white(colour_min)});
		}
		else if ( act.z_value < 2 )
		{
			var I = colour_min + (colour_max - colour_min)*((act.z_value + 2) / 4);
			rv.css({color: white( Math.sqrt(I/255)*255 )});
		}
		else
		{
			rv.addClass("warning");
		}
		
		return rv;
	};
	
	return (function( out, inp )
	{
		var start = inp.start;
		var duration = inp.dur;
		var error = inp.error;
		
		var erb = $("<span></span>")
			.addClass("error")
			.html("&#8203;");
		
		if ( error )
			erb.addClass( "yarly" ).attr('title','Got error ' + error);
		
		out.append( 
			$("<div></div>")
				.addClass("durationbox")
				.append(
					$("<span></span>")
						.addClass("start")
						.html(start))
				.append(colourbox_zvalue(inp))
				.append( erb ) );
	});
})();

