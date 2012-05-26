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

?><p>This is a page with simulated load for the profiler.
	The data you see is random.</p><?php


flush();
require_once( "profiler.inc" );

section( is_numeric($_REQUEST['sections']) ? $_REQUEST['sections'] : 6 );

$link = "view/profiler.html#" . Profiler::output();
$href = htmlspecialchars($link);

?>

<p>Finished generating data. Got <?=strlen(Profiler::output())?> bytes of data.</p>

<p><a href="<?=$href?>">Click here to open the development profiler</a></p>

<?=Profiler::write_link()?>

<?php


function section( $countdown )
{
	global $alph;
	$activities = array(
		"xmldom",     "xslt",
		"fs read",    "fs write",
		"net",
		"cache read", "cache write",
		"db"
	);
	
	if ( !isset($alph) ) $alph = 'A';
	
	Profiler::enter_section( $alph );
	
	$it = mt_rand( 3, 35 );
	
	for ( $i = 0; $i < $it; $i++ )
	{
		if ( mt_rand( 0, 31 ) < 3 )
		{
			if (( $countdown > 0 ) && ( $alph != 'Z' ))
			{
				$alph = chr( ord($alph) + 1 );
				section( $countdown - 1 );
			}
		}
		else
		{
			$act = floor(sqrt(mt_rand(0, 8*8-1)));
			
			Profiler::start( $activities[$act] );
			
			// Simulate a load of some kind
			usleep( mt_rand(1,10000) );
			
			// Add notes
			$nt = mt_rand(-14,4);
			if ( $nt > 0 )
				for ( $j = 0; $j < $nt; $j++ )
					Profiler::annotate( "This is a note for <emph>{$activities[$act]}</emph>" );
			
			if ( mt_rand(0,($act == 5 ? 3 : 100)) == 0 )
				Profiler::error(mt_rand(0,5000));
			
			Profiler::stop();
		}
		
		if ( mt_rand(0,100) == 0 )
			Profiler::error(mt_rand(0,5000));
		
		if ( mt_rand(0,7) < 2 )
		{
			Profiler::annotate( "I felt compelled to tell you " . str_repeat( $alph, 5 ) . "!!" );
		}
	}
	
	Profiler::leave_section();
}



