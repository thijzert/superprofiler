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
		profiler_output = JSON.parse( profiler_output );
		if ( typeof(profiler_output) != 'object' ) return;
		
		// Clear out all tabs
		$("#tabs *").remove();
		
		var tab_handles = $("<ul />");
		$("#tabs").append(tab_handles);
		
		for ( var i = 0; i < render_profiler.tabs.length; i++ )
		{
			var tab_title   = render_profiler.tabs[i].title;
			var tab_id      = render_profiler.tabs[i].id;
			var render_tab  = render_profiler.tabs[i].renderer;
			
			if ( !tab_title || !tab_id || !render_tab ) continue;
			
			var tit = $("<li></li>")
				.append($("<a></a>")
					.attr('href','#' + tab_id)
					.html(tab_title));
			var tab = $("<div></div>").attr('id',tab_id);
			
			render_tab( profiler_output, tab );
			
			tab_handles.append(tit)
			$("#tabs").append(tab);
		}
		
		$("#tabs").tabs();
	};
	
	render_profiler.tabs = [];
	
	
	return render_profiler;
})();


$(document).ready(function(){
	Profiler( location.hash.substr(1) );
});

