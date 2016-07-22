<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<title>Map</title>
		<meta name="generator" content="Bootply" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link href="/map_ci/assets/css/bootstrap.min.css" rel="stylesheet">
		<!--[if lt IE 9]>
			<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<link href="/map_ci/assets/css/styles.css?ver=4.1" rel="stylesheet">
                <link rel="stylesheet" href="/map_ci/assets/css/jquery-ui.css?ver=4.1">
                <link rel="stylesheet" href="/map_ci/assets/css/font-awesome.min.css">
<style>
.map_loader {
 opacity:0.4!important;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 30px;
  color:#fff;
  background: transparent;
}
      .controls {
        margin-top: 1%;
        border: 1px solid transparent;
        border-radius: 2px 0 0 2px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        height: 32px;
        outline: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      }

      #pac-input {
        background-color: #fff;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        margin-left: 12px;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 300px;
      }

      #pac-input:focus {
        border-color: #4d90fe;
      }

a[href^="http://maps.google.com/maps"]{display:none !important}
a[href^="https://maps.google.com/maps"]{display:none !important}

.gmnoprint a, .gmnoprint span, .gm-style-cc {
    display:none;
}
.gmnoprint div {
    background:none !important;
}


.ui-autocomplete {
		max-height: 300px;
		overflow-y: auto;
		overflow-x: hidden;
                background-size: 0 0;
 
	}
	/* IE 6 doesn't support max-height
	 * we use height instead, but this forces the menu to always be this tall
	 */
	* html .ui-autocomplete {
		height: 300px;
                background-size: 0 0;
	}
</style>

	</head>
	<body>
<!-- begin template -->



<div class="container" style="z-index: 1;position: absolute;top: 0%;">

<center> <input id="pac-input" class="controls" type="text" placeholder="Search Box"><button class="controls" id="get_combined_result"> <i class="fa fa-search" aria-hidden="true"></i>

</button></center>

<button id="filter_inital" class="btn-sample" style="display:none;" > Filter </button>

 <div id="filter_categories" style="display:none;"> 
    <button class="stores btn-sample stores-category"> Filter Stores </button> 
    <button class="offers btn-sample offers-category"> Filter Offers </button> 
    <button class="atms btn-sample atms-category">   Filter ATMs   </button> 
    <button class="classifieds btn-sample classifieds-category"> Filter Classifieds</button> 
    <button class="btn-sample remove_filter" > Remove Filter </button>
</div>


<div id="filters-atm" style="display:none;" >
  <select id="manufacturer"><!-- <option value="all"> Select a manufacturer--> </option> </select> 
  <select id="coin"> <!--<option value="none"> Select a coin type </option>--> </select> 
  <select id="country"> <option value=""> All Country </option> </select> 
  <select id="distance"> <option value="none">All Distance</option> </select>
  <select id="AllAtms"> <!-- <option value="all"> ATM </option> --> </select> 
  Zipcode <input type="text" id="zipcode" placeholder = "Zip"> 
  Place   <input type="search" id="place_atm" placeholder = "Keyword" style="width:39%;"> 
  <!--<img src="/map_ci/assets/img/ajax-loader.gif?ver=1.1" class="auto_complete_loader" style="display:none;"><br><br>-->
  <div id="search_results"> </div>
  <button class="btn-sample filter_get_result_atm"> Filter </button>
  <button class="btn-sample remove_filter" > Remove Filter </button>
</div>

<div id="filters-stores" style="display:none;" >
  <select id="category-stores"> </select> 
  <select id="distance-stores"> <option value="none">All Distance</option> </select> 
  <select id="country-stores"> <option value=""> All Country </option> </select> 
  <select id="coinType-stores"> </select>
  <select id="all_stores-stores"> </select>
  Zipcode <input type="text"   id="zipcode_store" placeholder = "Zip"> 
  Place   <input type="search" id="place_store" placeholder = "Keyword" style="width:39%;">
  <!--<img src="/map_ci/assets/img/ajax-loader.gif?ver=1.1" class="auto_complete_loader" style="display:none;"><br><br>-->
  <button class="btn-sample filter_get_result_stores" style="display:none;"> Filter </button>
  <button class="btn-sample result_stores_filter"> Filter </button>
  <button class="btn-sample remove_filter"> Remove Filter </button>
</div>

<div id="filters-offers" style="display:none;" >
  <select id="category-offer"> </select> 
  <select id="offer_type-offer"> </select> 
  <select id="all_stores-offer"> </select> 
  <button class="btn-sample filter_result_offers" > Filter </button>
  <button class="btn-sample remove_filter" > Remove Filter     </button>
</div>

<div id="filters-classifieds" style="display:none;" >
  <select id="classified_coin"> </select> 
  <select id="classified_category"> </select> 
  <select id="classified_all"> </select> 
  <select id="classified_most_recent"> </select> 
  <select id="classified_distance"> <option value="none">All Distance</option>  </select> 
  Zipcode <input type="text"   id="zipcode_classified" placeholder = "Zip"> 
  Place   <input type="search" id="place_classified" placeholder = "Keyword" style="width:39%;"> 
  <!--<img src="/map_ci/assets/img/ajax-loader.gif?ver=1.1" class="auto_complete_loader" style="display:none;"><br><br>-->
  <button class="btn-sample filter_classified" > Filter </button>
  <button class="btn-sample remove_filter" > Remove Filter     </button>
</div>
  <!--<center>
  <span id="result_div_atm"> </span>
  <span id="result_div_stores"> </span>
  <span id="result_div_offer"> </span>
  <span id="result_div_class"> </span>
 </center>-->

</div>
  <center id="loader" style="margin-top: 20%;margin-left: 7%!important;">  <img src="/map_ci/assets/img/ajax-loader.gif?ver=2.1" /> <br /></center> 

<div id="map-canvas"  class="col-md-12 col-sm-12 col-xs-12 col-lg-12"></div>
    <footer class="footer">
      <div class="container">
        <p class="text-muted"><center> 
               <div class="social_media" style="cursor:pointer;position: absolute;bottom: 100%;
left: 1%;"> 
                 <img id="fbShareBtn" src="/map_ci/assets/img/facebook.png" height="30" width="30">
                 <img src="/map_ci/assets/img/gplus.png" height="30" width="30">
                 <img src="/map_ci/assets/img/twitter.png" height="30" width="30">
               </div>
          </div>
    </footer>

	<!-- script references -->
		<script src="/map_ci/assets/js/jquery.min.js"></script>
                <script src="/map_ci/assets/js/jquery-ui.js"></script>
		<script src="/map_ci/assets/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaPUOvueL6rh8f7fP8vrnQfTZcwh_oNww&libraries=places"></script>
    <script type="text/javascript" src="/map_ci/assets/js/markerclusterer.js"></script>
    <script type="text/javascript" src="/map_ci/assets/js/custom-map.js?ver=2.1"></script>
    
	</body>
</html>
