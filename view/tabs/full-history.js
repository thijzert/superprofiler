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
		
		// Shorthands
		var duration_box = Profiler.Util.duration_box;
		
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
					if ( li.children().length < 3 )
						li.append('&#8203;');
					ul.append(li);
				}
				
				out.append(ul);
				
				if ( !root )
				{
					out.click(function(){
						
						var collapsed = ul.hasClass('collapsed');
						
						ul.toggle( 200, function()
						{
							if ( !collapsed )
								ul.find("ul").toggle(false)
									.parent().toggleClass("collapsed", true);
						});
						out.toggleClass( "collapsed" );
						
						return false;
					});
					ul.click(function(){return false;});
					
					if ( "class" in inp )
					{
						out.addClass( inp.class ).addClass( "collapsed" );
						ul.toggle(false);
					}
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

