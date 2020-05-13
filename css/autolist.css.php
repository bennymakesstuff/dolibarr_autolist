<?php
/* Copyright (C) 2020 Benjamin Broad
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * \file    autolist/css/autolist.css.php
 * \ingroup autolist
 * \brief   CSS file for module Autolist.
 */

//if (! defined('NOREQUIREUSER')) define('NOREQUIREUSER','1');	// Not disabled because need to load personalized language
//if (! defined('NOREQUIREDB'))   define('NOREQUIREDB','1');	// Not disabled. Language code is found on url.
if (! defined('NOREQUIRESOC'))    define('NOREQUIRESOC', '1');
//if (! defined('NOREQUIRETRAN')) define('NOREQUIRETRAN','1');	// Not disabled because need to do translations
if (! defined('NOCSRFCHECK'))     define('NOCSRFCHECK', 1);
if (! defined('NOTOKENRENEWAL'))  define('NOTOKENRENEWAL', 1);
if (! defined('NOLOGIN'))         define('NOLOGIN', 1);          // File must be accessed by logon page so without login
//if (! defined('NOREQUIREMENU'))   define('NOREQUIREMENU',1);  // We need top menu content
if (! defined('NOREQUIREHTML'))   define('NOREQUIREHTML', 1);
if (! defined('NOREQUIREAJAX'))   define('NOREQUIREAJAX', '1');

// Load Dolibarr environment
$res=0;
// Try main.inc.php into web root known defined into CONTEXT_DOCUMENT_ROOT (not always defined)
if (! $res && ! empty($_SERVER["CONTEXT_DOCUMENT_ROOT"])) $res=@include $_SERVER["CONTEXT_DOCUMENT_ROOT"]."/main.inc.php";
// Try main.inc.php into web root detected using web root calculated from SCRIPT_FILENAME
$tmp=empty($_SERVER['SCRIPT_FILENAME'])?'':$_SERVER['SCRIPT_FILENAME'];$tmp2=realpath(__FILE__); $i=strlen($tmp)-1; $j=strlen($tmp2)-1;
while($i > 0 && $j > 0 && isset($tmp[$i]) && isset($tmp2[$j]) && $tmp[$i]==$tmp2[$j]) { $i--; $j--; }
if (! $res && $i > 0 && file_exists(substr($tmp, 0, ($i+1))."/main.inc.php")) $res=@include substr($tmp, 0, ($i+1))."/main.inc.php";
if (! $res && $i > 0 && file_exists(substr($tmp, 0, ($i+1))."/../main.inc.php")) $res=@include substr($tmp, 0, ($i+1))."/../main.inc.php";
// Try main.inc.php using relative path
if (! $res && file_exists("../../main.inc.php")) $res=@include "../../main.inc.php";
if (! $res && file_exists("../../../main.inc.php")) $res=@include "../../../main.inc.php";
if (! $res) die("Include of main fails");

require_once DOL_DOCUMENT_ROOT.'/core/lib/functions2.lib.php';

session_cache_limiter('public');
// false or '' = keep cache instruction added by server
// 'public'  = remove cache instruction added by server and if no cache-control added later, a default cache delay (10800) will be added by PHP.

// Load user to have $user->conf loaded (not done by default here because of NOLOGIN constant defined) and load permission if we need to use them in CSS
/*if (empty($user->id) && ! empty($_SESSION['dol_login']))
{
    $user->fetch('',$_SESSION['dol_login']);
	$user->getrights();
}*/


// Define css type
header('Content-type: text/css');
// Important: Following code is to cache this file to avoid page request by browser at each Dolibarr page access.
// You can use CTRL+F5 to refresh your browser cache.
if (empty($dolibarr_nocache)) header('Cache-Control: max-age=10800, public, must-revalidate');
else header('Cache-Control: no-cache');

?>
.fichetwothirdright {display: none;}

.fichethirdleft {width: 100%;}

.fiche {margin: 10px;}

.listArea {background-color: #f5f5f5;
					height: 200px;
					width: 200px;}

#rightContentInner {width: calc(100%);
										text-align: center;
										position: relative;}

#rightContentInner .hide {display: none;}
#rightContentInner .show {display: block;}

#rightContentInner .moduleModal {position: absolute;
														    top: calc(40vh - 150px);
														    left: calc(50% - 300px);
														    width: 600px;
														    height: 300px;
														    z-index: 99;
														    background-color: white;
														    box-shadow: 1px 1px 5px #bfbfbf;
														    border-radius: 0.25rem;
														    border: 1px solid #bfbfbf;}

#rightContentInner .moduleModal .top {height: 1.2rem;
																			position:relative;
																	    line-height: 1.2rem;
																	    padding-top: 0.5rem;
																	    text-align: left;
																	    padding: 0.5rem;
																			border-bottom: 1px solid #bfbfbf;}

#rightContentInner .moduleModal .top p {padding: 0;
																		    margin: 0;
																		    font-size: 1rem;
																		    font-weight: 600;
																		    color: #696969;}

#rightContentInner .moduleModal .top .close {position: absolute;
																				    top: 0.25rem;
																				    right: 0.5rem;
																				    font-weight: 300;
																				    font-size: 1.5rem;}

#rightContentInner .moduleModal .middle {}
#rightContentInner .moduleModal .middle .left {width: calc(200px - 1px - 1rem);
																						    height: calc(300px - 3rem - 3px);
																						    display: inline-block;
																						    border-right: 1px solid #bfbfbf;
																						    vertical-align: top;
																						    color: black;
																						    padding: 0.5rem;
																						    text-align: center;}

#rightContentInner .moduleModal .middle .left .image {height: 160px;
																											width: 160px;
																											border: 1px solid #bfbfbf;
																											margin-left: auto;
																											margin-right: auto;
																											background-color: #f3f3f3;
																											line-height: 160px;
																											margin-bottom: 10px;
																											cursor: pointer;
																											border-radius: 0.25rem;}

#rightContentInner .moduleModal .middle .left .image:hover {border: 1px solid #4c4c4c;}

#rightContentInner .moduleModal .middle .left .image .changeButton {color: #737373;
																																    font-size: 1.1rem;
																																    font-weight: 600;}
#rightContentInner .moduleModal .middle .left .image .changeButton > label > div {width: 100%;
																																							    height: 160px;
																																							    cursor: pointer;}

#rightContentInner .moduleModal .middle .left .image .changeButton > label > div:hover {color: #4c4c4c;}

#rightContentInner .moduleModal .middle .right {width: calc(400px - 4px - 1rem);
																						    height: calc(300px - 3rem - 3px);
																						    display: inline-block;
																						    vertical-align: top;
																						    padding: 0.5rem;
																						    text-align: left;}

#rightContentInner .moduleModal .middle .right .inputOuter {border: 1px solid #bfbfbf;
																												    border-radius: 0.25rem;
																												    margin-bottom: 10px;
																												    padding: 0.25rem;}

#rightContentInner .moduleModal .middle .right .inputOuter .inputTitle {font-weight: 600;
																																		    color: #777777;
																																		    font-size: 0.75rem;}

#rightContentInner .moduleModal .middle .right .inputOuter .inputTitle .subText { margin-left: 5px;
																																							    font-size: 0.75rem;
																																							    font-weight: 200;
																																							    font-style: italic;}

#rightContentInner .moduleModal .middle .right .inputOuter input {width: calc(100% - 1rem);
																																    border: 0;
																																    padding-left: 0;
																																    font-size: 0.9rem;
																																		outline: none;}

#rightContentInner .moduleModal .middle .right .inputOuter select {border: none;
																																    font-size: 1rem;
																																		outline: none;}

#rightContentInner .moduleModal .middle .right button { font-size: 1rem;
																										    background-color: rgb(128, 0, 0);
																										    color: rgb(243, 243, 243);
																										    cursor: pointer;
																										    padding: 0.5rem 0.75rem;
																										    border-width: 0px;
																										    border-style: initial;
																										    border-color: initial;
																										    border-image: initial;
																										    border-radius: 3px;
																										    transition: background-color 200ms ease 0s;
																										    position: absolute;
																										    right: 0.5rem;
																										    bottom: 0.5rem;}

#rightContentInner .moduleHead {display: block;
																width: 100%;
																border-bottom: 1px solid #d0d0d0;
																height: 100px;
																background-color: #f3f3f3;}

#rightContentInner .moduleHead .top {height: 30px;
																		padding-top: 5px;
																		padding-bottom: 5px;
																		width: 100%;}

#rightContentInner .moduleHead .top .title {float: left;
																					line-height: 30px;
																					font-size: 1.4rem;
																					margin-left: 1rem;
																					max-width: 500px;
																					color: #461616;
																					font-weight: 400;}

#rightContentInner .moduleHead .top .buttongroup button {padding: 0.5rem 0.75rem;
																													border: 0;
																													font-size: 1rem;
																													background-color: #800000;
																													color: #f3f3f3;
																													border-radius: 3px;
																													cursor: pointer;
																													transition: background-color 200ms ease;}

#rightContentInner .moduleHead .top .buttongroup button:hover {background-color: #9c0202;}


#rightContentInner .moduleHead .top .buttongroup {float: right;
																					line-height: 30px;
																					margin-right: 0.5rem;
																					height: 30px;
																					margin-top: 0.5rem;}

#rightContentInner .moduleHead .bottom {height: 50px;
																				padding-top: 5px;
																				padding-bottom: 5px;
																				width: 100%;
																				text-align: left;}

#rightContentInner .moduleHead .bottom .searchArea {margin-left: 1rem;
																								    border: 1px solid #d0d0d0;
																								    width: 300px;
																								    height: 30px;
																								    background-color: #ffffff;
																								    line-height: 35px;
																								    padding: 5px;}

#rightContentInner .moduleHead .bottom .searchArea input[type='text'] {border: 0;
																																		    width: calc(100% - 1rem);
																																		    background-color: transparent;
																																		    margin: 0;
																																		    padding: 0;
																																		    font-size: 1.2rem;}

#rightContentInner .moduleList {display: block;
																width: 100%;
																border-top: 1px solid #ffffff;
																height: 100px;
																background-color: transparent;
																position: relative;}

#rightContentInner .moduleList .listTop {height: calc(40px);
																		    width: 100%;
																		    border-bottom: 1px solid #bfbfbf;
																				position: absolute;
																				top: 0;
																				left: 0;
																				font-size: 0;}

#rightContentInner .moduleList .listTop .listHeader {height: 40px;
																						background-color: #f1f1f1;
																						line-height: 40px;
																						display: inline-block;
																						vertical-align: top;
																						font-size: 0.9rem;}

#rightContentInner .moduleList .listTop .active {width: 80px;}
#rightContentInner .moduleList .listTop .image {width: 80px;}
#rightContentInner .moduleList .listTop .make {width: calc(80% - 160px);}
#rightContentInner .moduleList .listTop .origin {width: calc(20% - 4px);}

#rightContentInner .moduleList .listBottom {height: 600px;
																		    width: 100%;
																		    border-bottom: 1px solid #bfbfbf;
																				position: relative;
																				overflow: scroll;
																				font-size: 0;
																				margin-top: 41px;}

#rightContentInner .moduleList .listBottom .listEntry {height: calc(80px);
																		    width: 100%;
																		    border-bottom: 1px solid #bfbfbf;
																				position: relative;
																				font-size: 0;
																			background-color: #ffffff;}

#rightContentInner .moduleList .listBottom .listEntry .listColumn {border-right: 1px solid #f1f1f1;
																						height: 80px;
																						background-color: transparent;
																						border-bottom: 1px solid #f1f1f1;
																						line-height: 80px;
																						display: inline-block;
																						vertical-align: top;
																						font-size: 0.8rem;}

#rightContentInner .moduleList .listBottom .listEntry .active {width: 80px;line-height:90px;}
#rightContentInner .moduleList .listBottom .listEntry .image {width: 80px;
																															text-align: center;
																															line-height: 80px;}
#rightContentInner .moduleList .listBottom .listEntry .image .logo {width: 70px;
																																		display: inline-block;
																																		height: auto;
																																		vertical-align: middle;}
#rightContentInner .moduleList .listBottom .listEntry .make {width: calc(80% - 180px);padding-left: 20px;font-size: 1.3rem;text-align: left;}
#rightContentInner .moduleList .listBottom .listEntry .origin {width: calc(20% - 4px);}

/* width */
::-webkit-scrollbar {
	width: 8px;
position: absolute;
top: 0;
right: 0;
padding-left: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #888;
	border-radius: 5rem;
	width: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}


#moduleOverlay {width: 100vw;
								height: 100vh;
								position: absolute;
								top: 0;
								left: 0;
								background-color: #333333;
								opacity: 0.25;
								z-index: 90;}

.toggle {width: 40px;
				height: 19px;
				border-radius: 12px;
				border: 1px solid #bfbfbf;
				box-shadow: inset 0px 0px 1px #cecece;
				display: inline-block;
				position: relative;
				line-height: 15px;
				transition: text-align 400ms ease;
				cursor: pointer;
				}


.toggle .innerToggle {width: 17px;
											height: 17px;
											border: 1px solid #bfbfbf;
											border-radius: 10px;
											background-color: #ffffff;
											box-shadow: 0px 0px 1px #333333;
											display: inline-block;
											position: relative;
											cursor: pointer;
											pointer-events: none}

.toggleOn {text-align: right;
							background-color: #8ca484;}

.toggleOff {text-align: left;
							background-color: #f5f5f5;}
