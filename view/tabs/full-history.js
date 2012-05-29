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

// Full history
// 
// Shows the complete history as a list. Each activity is on a row; each section
// shows its items in a collapsible list.

Profiler.tabs.push({
	"title": "All events",
	"id":    "full-history",
	"renderer": (function(){
		
		
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
		
		var format_duration = function( sec )
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
			return (sec * 1000000).toPrecision( 4 ) + "&micro;s";
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
		
		var duration_box = function( out, inp )
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
		};
		
		var history = function( inp, out, root ){
			
			if ( inp.items )
			{
				if ( root )
				{
					out.append( "Total time: <strong>" + inp.dur + "</strong>" );
				}
				else
				{
					duration_box( out, inp );
					out.append( "Begin section <strong>" + inp.name + "</strong>" );
					out.append( $("<span>...</span>").addClass("ellipsis") );
				}
				
				// Add Notes (if any)
				if ( inp.notes )
					for ( var i = 0; i < inp.notes.length; i++ )
						out.append($('<p></p>').html(inp.notes[i]));
				
				
				var ul = $('<ul></ul>');
				for ( var i = 0; i < inp.items.length; i++ )
				{
					var li = $('<li></li>');
					history( inp.items[i], li, false );
					ul.append(li);
				}
				
				out.append(ul);
				
				if ( !root )
				{
					out.click(function(){
						ul.toggle( 200 );
						out.toggleClass( "collapsed" );
						
						return false;
					});
					ul.click(function(){return false;})
				}
				
				if ( root )
					out.append( "Total time: <strong>" + inp.dur + "</strong>" );
				else
					out.append( '<span class="footer">End section <strong>' + inp.name + 
						'</strong></span>' );
			}
			else
			{
				duration_box( out, inp );
				
				out.addClass( inp.name );
				out.append($('<p></p>').text(inp.name));
				
				if ( inp.notes )
					for ( var i = 0; i < inp.notes.length; i++ )
						out.append($('<p></p>').html(inp.notes[i]));
			}
		};
		
		return (function(i,o) { history( i, o, true ); });
	})(),
	"destroy": (function(){
		return function( tab ){
			tab.find('*').remove();
			tab.text('');
		};
	})()
});

