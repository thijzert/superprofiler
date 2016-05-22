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


var Profiler = (function(){
	
	
	$("#out").text( location.hash.substr(1) );
	
	
	var render_profiler = function( profiler_output )
	{
		try
		{
			profiler_output = JSON.parse( profiler_output );
		}
		catch (e)
		{
			try
			{
				profiler_output = JSON.parse( unescape(profiler_output) );
			}
			catch (e) { return; }
		}
		
		// Apply all filters to the profiler output
		for ( var i = 0; i < render_profiler.filters.length; i++ )
			(render_profiler.filters[i])( profiler_output );
		
		
		// Set the title and referrer link
		$("h1#title a").text(document.referrer)
			.attr('href',document.referrer);
		
		// Render each tab
		
		var tab_handles = $("<ul />");
		$("#tabs").append(tab_handles);
		
		for ( var i = 0; i < render_profiler.tabs.length; i++ )
		{
			var ti = render_profiler.tabs[i];
			
			var tab_title   = ti.title;
			var tab_id      = ti.id;
			var render_tab  = ti.renderer;
			
			if ( !tab_title || !tab_id || !render_tab ) continue;
			
			if ( ti.dom )
			{
				if ( ti.destroy )
					ti.destroy( ti.dom );
				ti.dom.remove();
			}
			else
			{
				ti.dom = $("<div></div>");
				ti.dom.attr('id',tab_id);
				
				tab_handles.append(
					$("<li></li>")
						.append($("<a></a>")
							.attr('href','#' + tab_id)
							.html(tab_title)));
			}
			
			render_tab( profiler_output, ti.dom );
			$("#tabs").append(ti.dom);
		}
		
		// Done. Now, initialize the (jQuery) tab switcher if we hadn't already
		if ( !$("#tabs").hasClass("ui-tabs") )
			$("#tabs").tabs();
	};
	
	render_profiler.tabs = [];
	render_profiler.filters = [];
	
	render_profiler.Util = {};
	
	return render_profiler;
})();


$(document).ready(function(){
	var p = function(){
		Profiler( location.hash.substr(1) );
	};
	
	// Render the profiler once
	p();
	
	// Bind it to the hashChange event, so this window can be reused.
	window.onhashchange = p;
});

