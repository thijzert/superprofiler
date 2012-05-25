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

// Simple object browser
// Allows a user to see the internal structure of the object returned by the profiler.
// 

Profiler.tabs.push({
	"title": "Object browser",
	"id":    "object-browser",
	"renderer": (function(){
		var ob_b = function( inp, out ){
			
			if ( typeof(inp) == 'object' )
			{
				var ul = $('<ul></ul>');
				for ( i in inp )
				{
					var li = $('<li></li>');
					li.html(": ")
						.prepend($("<strong></strong>").html(i));
					ob_b( inp[i], li );
					
					ul.append(li);
				}
				
				out.append(ul);
			}
			else
			{
				out.append($('<span></span>').html(inp));
			}
		};
		return ob_b;
	})()
});

