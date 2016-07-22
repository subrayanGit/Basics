<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,700' rel='stylesheet' type='text/css'>
    <link href="http://localhost/zoner/assets/fonts/font-awesome.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="http://localhost/zoner/assets/bootstrap/css/bootstrap.css" type="text/css">
    <link rel="stylesheet" href="http://localhost/zoner/assets/css/bootstrap-select.min.css" type="text/css">
    <link rel="stylesheet" href="http://localhost/zoner/assets/css/style.css" type="text/css">
    <title>Bit Coin ATM Search</title>
</head>
<body class="page-homepage map-google navigation-fixed-top horizontal-search" id="page-top" data-spy="scroll" data-target=".navigation" data-offset="90">
<!-- Wrapper -->
<div class="wrapper">

    <div class="navigation">
        <div class="secondary-navigation">
            <div class="container">
                <div class="contact">
                    <figure><strong>Phone:</strong>+1 XXX-XXX-XXX</figure>
                    <figure><strong>Email:</strong>XXXXX@XXXX.XXX</figure>
                </div>
            </div>
        </div>
        <div class="container">
            <header class="navbar" id="top" role="banner">
                <div class="navbar-header">
                    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <div class="navbar-brand nav" id="brand">
                        <a href="index-google-map-fullscreen.html"><img src="http://localhost/zoner/assets/img/logo.png" alt="brand"></a>
                    </div>
                </div>
                <nav class="collapse navbar-collapse bs-navbar-collapse navbar-right" role="navigation">
                    <ul class="nav navbar-nav">
                     <li><a href="#">Map</a></li>
                    </ul>
                </nav><!-- /.navbar collapse-->
                <div class="add-your-property">
                    <a href="#" class="btn btn-default"><i class="fa fa-plus"></i><span class="text">Add Your Property</span></a>


<button id="filter_inital" class="btn-sample" > Filter </button>

 <div id="filter_categories" style="display:none;"> 

    <button class="stores btn-sample stores-category"> Filter Stores </button> 
    <button class="offers btn-sample offers-category"> Filter Offers </button> 
    <button class="atms btn-sample atms-category">   Filter ATMs   </button> 
    <button class="classifieds btn-sample classifieds-category"> Filter Classifieds</button> 

</div>


<div id="filters-atm" style="display:none;" >
  <select id="manufacturer"><!-- <option value="all"> Select a manufacturer--> </option> </select> 
  <select id="coin"> <!--<option value="none"> Select a coin type </option>--> </select> 
  <select id="country"> <option value=""> All Country </option> </select> 
  <select id="distance"> <!-- <option value="none"> Select Distance </option>--> </select>
  <select id="AllAtms"> <!-- <option value="all"> ATM </option> --> </select>
  Zipcode <input type="text" id="zipcode"> 
  Place   <input type="search" id="place_atm"> <br>
  <button class="btn-sample filter_get_result_atm"> Filter </button>
  <button class="btn-sample remove_filter"> Remove Filter </button>
</div>

<div id="filters-stores" style="display:none;" >
  <select id="category-stores"> </select> 
  <select id="distance-stores"> </select> 
  <select id="country-stores"> </select> 
  <select id="coinType-stores"> </select>
  <select id="all_stores-stores"> </select>
  Zipcode <input type="text"   id="zipcode_store"> 
  Place   <input type="search" id="place_store"> <br>
  <button class="btn-sample filter_get_result_stores"> Filter </button>
  <button class="btn-sample remove_filter"> Remove Filter </button>
</div>


<div id="filters-offers" style="display:none;" >
  <select id="category-offer"> </select> 
  <select id="offer_type-offer"> </select> 
  <select id="all_stores-offer"> </select> 
  <button class="btn-sample filter_get_result_offers"> Filter </button>
  <button class="btn-sample remove_filter"> Remove Filter     </button>
</div>


  <center id="result_div"> </center>

   <center id="loader">  Fetching Data.... <br /> 
     <img src="http://localhost/map_ci/assets/img/ajax-loader.gif">
   </center> 











                </div>
            </header><!-- /.navbar -->
        </div><!-- /.container -->
    </div><!-- /.navigation -->

   <!-- <div class="container">
        <div class="geo-location-wrapper">
            <span class="btn geo-location"><i class="fa fa-map-marker"></i><span class="text">Find My Position</span></span>
        </div>
    </div>-->


    <!-- Map -->
    <div id="map" class="has-parallax"></div>
    <!-- end Map -->

    <!-- Page Footer -->
    <footer id="page-footer">
        <div class="inner">
            <aside id="footer-main">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 col-sm-3">
                            <!--<article>
                                <h3>About Us</h3>
                                <p>Vel fermentum ipsum. Suspendisse quis molestie odio. Interdum et malesuada fames ac ante ipsum
                                    primis in faucibus. Quisque aliquet a metus in aliquet. Praesent ut turpis posuere, commodo odio
                                    id, ornare tortor
                                </p>
                                <hr>
                                <a href="#" class="link-arrow">Read More</a>
                            </article>-->
                        </div><!-- /.col-sm-3 -->
                        <div class="col-md-3 col-sm-3">
                         
                        </div><!-- /.col-sm-3 -->
                        <div class="col-md-3 col-sm-3">
                            
                        </div><!-- /.col-sm-3 -->
                        <div class="col-md-3 col-sm-3">
 
                        </div><!-- /.col-sm-3 -->
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </aside><!-- /#footer-main -->
            <aside id="footer-thumbnails" class="footer-thumbnails"></aside> <!-- /#footer-thumbnails -->
            <aside id="footer-copyright">
                <div class="container">
                    <span>Copyright © 2013. All Rights Reserved.</span>
                    <span class="pull-right"><a href="#page-top" class="roll">Go to top</a></span>
                </div>
            </aside>
        </div><!-- /.inner -->
    </footer>
    <!-- end Page Footer -->
</div>
<script type="text/javascript" src="http://localhost/zoner/assets/js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaPUOvueL6rh8f7fP8vrnQfTZcwh_oNww"></script>

<script type="text/javascript" src="http://localhost/zoner/assets/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="http://localhost/map_ci/assets/js/custom-map.js"></script>
<script type="text/javascript" src="/map/assets/js/markerclusterer.js"></script>

<!--[if gt IE 8]>
<script type="text/javascript" src="http://localhost/zoner/assets/js/ie.js"></script>
<![endif]-->
</body>
</html>
