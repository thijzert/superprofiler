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


// The page at which the profiler visualisation code is located.
if ( !defined("PROFILER_LINK_URL") )
	define( "PROFILER_LINK_URL", 'http://ametheus.github.com/profiler/' );

// The ID for both the link tag, and the window opened.
if ( !defined("PROFILER_LINK_ID") )
	define( "PROFILER_LINK_ID", 'Ametheus_Superprofiler' );

// The text to show in the profiler link
if ( !defined("PROFILER_LINK_TEXT") )
	define( "PROFILER_LINK_TEXT", 'Open in profiler...' );


class Profiler
{
	private static $items = array();
	
	private static $root = null;
	private static $section = null;
	
	private static $activity = null;
	
	private static $output = null;
	
	public static function init()
	{
		if ( self::$root ) return;
		
		self::enter_section( "root" );
		self::$root =& self::$section;
	}
	
	
	/**
	 * Add a note to the current section or activity
	 **/
	public static function annotate( $text )
	{
		$n =& self::$section;
		if ( self::$activity )
		{
			$c = count(self::$section->items);
			if ( $c > 0 )
			{
				$n =& self::$section->items[$c - 1];
			}
		}
		
		if ( !isset($n->notes) )
			$n->notes = array();
		
		$n->notes[] = $text;
	}
	
	
	/**
	 * Enter a new section with the name specified. (Sections can be nested.)
	 **/
	public static function enter_section( $name )
	{
		self::stop();
		
		//print( "Entering section {$name}...\n" );
		$ns = new stdClass();
		
		$ns->parent = self::$section;
		$ns->name = $name;
		$ns->items = array();
		$ns->start = microtime(true);
		
		self::$section->items[] =& $ns;
		self::$section =& $ns;
	}
	
	
	/**
	 * Leave the current (topmost) section.
	 **/
	public static function leave_section()
	{
		//print( "Leaving section  " . self::$section->name . 
		//	" in order to return to " . self::$section->parent->name . "\n" );
		
		if ( !isset(self::$section->end) )
			self::$section->end = microtime(true);
		
		if ( self::$section == self::$root ) return;
		
		self::stop();
		
		$p =& self::$section->parent;
		unset( self::$section->parent );
		
		self::$section =& $p;
	}
	
	
	/**
	 * Start an activity.
	 * 
	 * Unlike sections, activities cannot be nested; there can only be one at 
	 * any given time. In the future, the time similarly named activities took
	 * will be tallied, thus providing an intuitive way of determining what's
	 * to blame for your page's load time.
	 * 
	 * Examples:
	 * 
	 *    Profiler::start('db');
	 *    mysql_query(...);
	 *    Profiler::stop();
	 *    
	 *    Profiler::start('cache');
	 *    xcache_set(..., ...);
	 *    Profiler::stop();
	 *    
	 *    Profiler::start('fs');
	 *    $x = file_get_contents(...);
	 *    Profiler::stop();
	 **/
	public static function start( $activity )
	{
		if ( self::$activity ) self::stop();
		
		self::$activity = $activity;
		
		$a = new stdClass();
		$a->name = $activity;
		$a->start = microtime(true);
		
		self::$section->items[] =& $a;
	}
	
	
	/**
	 * Stop the current activity.
	 **/
	public static function stop()
	{
		if ( ! self::$activity ) return;
		
		$c = count(self::$section->items);
		if ( $c > 0 )
		{
			self::$section->items[$c - 1]->end = microtime(true);
		}
		self::$activity = null;
	}
	
	
	/**
	 * Replace all absolute start and end times with relative start times and 
	 * durations.
	 **/
	private static function duration( &$x )
	{
		if ( isset($x->items) )
			foreach ( $x->items as $y )
				self::duration( $y );
		
		$x->dur   = round( $x->end   - $x->start,          6 );
		$x->start = round( $x->start - self::$root->start, 6 );
		unset( $x->end );
	}
	
	
	/**
	 * Returns a string with JSON-encoded output.
	 **/
	public static function output()
	{
		if ( self::$output != null )
			return self::$output;
		
		while ( self::$section != self::$root )
			self::leave_section();
		
		self::$root->end = microtime(true);
		self::duration( self::$root );
		
		unset( self::$root->start );
		unset( self::$root->parent );
		
		self::$output = json_encode( self::$root );
		return self::$output;
	}
	
	
	/**
	 * Returns an ECMAscript code that writes a link to the profiler page.
	 **/
	public static function write_link()
	{
		$op = str_replace(
			array(   "\\",   "'",  "\n" ),
			array( "\\\\", "\\'", "\\n" ),
			self::output()
		);
		
		$rv = '<script type="text/javascript">';
		$rv .= '(function(){';
			$rv .= 'var a = document.createElement("a");';
			$rv .= 'a.appendChild(document.createTextNode("'.PROFILER_LINK_TEXT.'"));';
			$rv .= 'a.setAttribute("id","'.PROFILER_LINK_ID.'");';
			$rv .= 'a.setAttribute("href",\''.PROFILER_LINK_URL.'#'.$op.'\');'."\n";
			
			$rv .= 'a.onclick = (function(){';
				$rv .= 'window.open( a.href, "'.PROFILER_LINK_ID.'" );';
				$rv .= 'return false;';
			$rv .= '});'."\n";
			
			$rv .= 'var s = document.getElementsByTagName("script");';
			$rv .= 's = s[s.length - 1];';
			$rv .= 's.parentNode.insertBefore( a, s.nextSibling );';
		$rv .= '})();';
		$rv .= '</script>';
		
		return $rv;
	}
}
Profiler::init();

