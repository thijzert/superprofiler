<?php

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

require_once( "profiler.inc" );

section(2);


?>
<p>This is a page with simulated load for the profiler.
	The data you see is random.</p>


<iframe src="view/profiler.html#<?=htmlspecialchars(Profiler::output())?>" 
	style="width: 100%; height: 100%;" />

<?php



function section( $countdown )
{
	global $alph;
	if ( !isset($alph) ) $alph = 'A';
	
	Profiler::enter_section( $alph );
	
	$it = mt_rand( 3, 5 );
	
	for ( $i = 0; $i < $it; $i++ )
	{
		if ( mt_rand( 0, 5 ) < 3 )
		{
			if (( $countdown > 0 ) && ( $alph != 'Z' ))
			{
				$alph = chr( ord($alph) + 1 );
				section( $countdown - 1 );
			}
		}
		else
		{
			$act = round(log10(mt_rand(0,999)));
			Profiler::start( $act );
			usleep( mt_rand(100,10000) );
			Profiler::stop();
		}
		
		if ( mt_rand(0,7) < 2 )
		{
			Profiler::annotate( "I felt compelled to tell you " . str_repeat( $alph, 5 ) . "!!" );
		}
	}
	
	Profiler::leave_section();
}



