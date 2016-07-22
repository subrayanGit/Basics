var base_url  = 'http://stallioni.in/Bitcoins/';
var mapStyles =  [{
            featureType: "administrative.province",
            elementType: "all",
            stylers: [{
                visibility: "on"
            }]
        }, {
            featureType: "landscape",
            elementType: "all",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f4f6f7"
            }]
        }, {
            featureType: "poi",
            elementType: "all",
            stylers: [{
                saturation: -100
            }, {
                lightness: 51
            }, {
                visibility: "simplified"
            }, {
                color: "#dee2e4"
            }]
        }, {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{
                saturation: -100
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [{
                saturation: -100
            }, {
                lightness: 30
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "road.local",
            elementType: "all",
            stylers: [{
                saturation: -100
            }, {
                lightness: 40
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "transit",
            elementType: "all",
            stylers: [{
                saturation: -100
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                lightness: -25
            }, {
                saturation: -97
            }, {
                color: "#a4afb6"
            }]
        }, {
            featureType: "water",
            elementType: "labels",
            stylers: [{
                visibility: "on"
            }, {
                lightness: -25
            }, {
                saturation: -100
            }]
        }];

$.ajaxSetup({
    cache: true
});

var mc = null;
var mc_atm = null;
var mc_cls = null;
var mc_off = null;
var mc_sto = null;
var markers = [];

var atm_markers = [];
var off_markers = [];
var sto_markers = [];
var cls_markers = [];

var map;
var infoWindow;

function show_loader() {
 $("#loader").show();   
 $('#map-canvas').addClass('map_loader');
}

function hide_loader() {
 $("#loader").hide();   
 $('#map-canvas').removeClass('map_loader');
}

   function clearClusters() { alert(atm_markers.length +' '+cls_markers.length +' '+sto_markers.length +' '+off_markers.length) ;
        mc_atm.clearMarkers();
        mc_cls.clearMarkers();
        mc_sto.clearMarkers();
        mc_off.clearMarkers();
      }

/*  Map Init */
function get_latlon(dest) {
  var cur_place   = navigator.geolocation.getCurrentPosition(showPosition);
  var destination = dest;
}
function showPosition(position) {
     var latlon = position.coords.latitude + "," + position.coords.longitude; console.log(latlon);
     return latlon;
}

 function initialize() { //console.log();

    var mapOptions = {
      center: new google.maps.LatLng(51.4975941, -0.0803232),
      zoom: 3,
      scrollwheel: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      icon: "http://localhost/map_ci/assets/img/atm.png",
      styles:mapStyles,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
   };

     map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
     infoWindow = new google.maps.InfoWindow();

      google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   show_loader()

 
}
google.maps.event.addDomListener(window, 'load', initialize);


/* Atm Json*/ 
 $.ajax({
    url:base_url+'Bitcoin-ATM-Locations-Find-Your-Nearest-Bitcoin-ATM-Locations/index/getatm.json',
    method:'post',
    success:function(data) {             
       $("#filter_inital").show();
       hide_loader();  
       create_marker_by_search(data.data.atms);
       mc_atm = new MarkerClusterer(map, atm_markers);
       mc_atm.repaint();      
    },
       error: function(return_data,status,error) { 
       hide_loader();
       alert('Error occured... Please try again');
    }
  });

 $.ajax({
    url:base_url+'storesApi/index/stores.json',
    method:'post',
    success:function(data) {    
       create_marker_stores(data.data.stores);
       mc_sto = new MarkerClusterer(map, sto_markers);
       mc_sto.repaint();                
   },
           error: function(return_data,status,error) { 
            alert('Error occured... Please try again');
   }
 });



 $.ajax({
    url:base_url+'classifiedsApi/index/classifieds.json',
    method:'post',
    success:function(data) { 
       create_marker_classifieds(data.data.classified);           
       mc_cls = new MarkerClusterer(map, cls_markers);
       mc_cls.repaint();      
   },
    error: function(return_data,status,error) { 
     alert('Error occured... Please try again');
   }
 });



 $.ajax({
    url:base_url+'offersApi/index/offers.json',
    method:'post',
    success:function(data) {       
               create_marker_offers(data);   
               mc_off = new MarkerClusterer(map, off_markers);
               mc_off.repaint();                

   },
           error: function(return_data,status,error) { 
            alert('Error occured... Please try again');
   }
 });


/* Form Json */

  $.ajax({
        type: "GET",
        url: base_url+'Bitcoins/searchApi/index/search.json',
        success: function(data) {    //console.log(data);

                /* Manufacturer filter form */
                    $.map(data.data.search.amts.manufacturer,function(value, index) {
                          $("#manufacturer").append('<option value="'+ index +'">'+ value +'</option>')
                    }); 
                    $.map(data.data.search.amts.coinType,function(value, index) {
                          $("#coin").append('<option value="'+ index +'">'+ value +'</option>')
                    }); 
                    $.map(data.data.search.amts.country,function(value, index) { 
                          $("#country").append('<option value="'+index+'">'+ value +'</option>')
 
                    });
                    $.map(data.data.search.amts.distance,function(value, index) {
                            $("#distance").append('<option value="'+index+'">'+ value +'</option>')
                    });
                    $.map(data.data.search.amts.all_atm,function(value, index) { 
                            $("#AllAtms").append('<option value="'+index+'">'+ value +'</option>')
                  });
               /* Manufactors End */




              /* offer form */

                    $.map(data.data.search.offers.category,function(value, index) { 

                            $("#category-offer").append('<option value="'+index+'">'+ value +'</option>')
                    }); 
                    $.map(data.data.search.offers.offer_type,function(value, index) {

                            $("#offer_type-offer").append('<option value="'+index+'">'+ value +'</option>')

                    }); 
                    $.map(data.data.search.offers.all_stores,function(value, index) { 

                            $("#all_stores-offer").append('<option value="'+index+'">'+ value +'</option>')
 
                    });
             /* offer end */

 
             /* stores form */
                       $.map(data.data.search.stores.category,function(value, index) { 

                            $("#category-stores").append('<option value="'+index+'">'+ value +'</option>')
                      }); 
                      $.map(data.data.search.stores.distance,function(value, index) {

                            $("#distance-stores").append('<option value="'+index+'">'+ value +'</option>')
                    }); 
            
 $.map(data.data.search.stores.country,function(value, index) {

                            $("#country-stores").append('<option value="'+index+'">'+ value +'</option>')
                    }); 
 $.map(data.data.search.stores.coinType,function(value, index) {

                            $("#coinType-stores").append('<option value="'+index+'">'+ value +'</option>')
                    }); 
 $.map(data.data.search.stores.all_stores,function(value, index) {

                            $("#all_stores-stores").append('<option value="'+index+'">'+ value +'</option>')
                    }); 
                   /*  stores end */   

                  /* Filter Classifieds *///console.log(data.data.search.classified["classified-all"]);

           $.map(data.data.search.classified.coinType,function(value, index) {  
                $("#classified_coin").append('<option value="'+index+'">'+ value +'</option>')               
           });

            $.map(data.data.search.classified.category,function(value, index) {
                $("#classified_category").append('<option value="'+index+'">'+ value +'</option>')
             }); 
                 
             $.map(data.data.search.classified["classified-all"],function(value, index) {
                $("#classified_all").append('<option value="'+index+'">'+ value +'</option>')
             });  

             $.map(data.data.search.classified["classified-sort"],function(value, index) {
                  $("#classified_most_recent").append('<option value="'+index+'">'+ value +'</option>')
             }); 

             $.map(data.data.search.classified.distance,function(value, index) {
                  $("#classified_distance").append('<option value="'+index+'">'+ value +'</option>')
             }); 

           /*Classifieds End */
            },
           error: function(return_data,status,error) { 
             alert('Error occured in form... Please try again');
            }
        });
 /* Filter Reults */

 


function createMarker(marker,name, address1, address2, contact,latlng){
       google.maps.event.addListener(marker, 'click', function() {
        var iwContent = '<div id="iw_container" >' +
         '<p> <b>Name   :</b>'               + name       + '</p>' +
         '<p> <b>Address:</b>'          + address1   + '</p>' +
         //'<p> <b>Sub Categories:</b>'      + address2   + '</p>' +
         //'<p> <b>Accepted Coins:</b>'      + address2   + '</p>' +
         //'<p> <b>Contact Information:</b>' + address2   + '</p>' +
         '<p> <b>Contact Number:</b>'      + contact + '</p>' +
         //'<p> <b> Monday:</b>'       + postalCode + '</p>' +
         //'<p> <b> Tuesday:</b>'      + postalCode + '</p>' +
         //'<p> <b> Wednesday:</b>'    + postalCode + '</p>' +
         //'<p> <b> Thursday:</b>'     + postalCode + '</p>' +
         //'<p> <b> Friday:</b>'       + postalCode + '</p>' +
         //'<p> <b> Saturday:</b>'     + postalCode + '</p>' +
         //'<p> <b> Sunday:</b>'       + postalCode + '</p>' +
         '<a href="#"> View Listings </a> | <a href="#" onclick="get_latlon('+latlng+')"> Get Girections </a> </div>';
         infoWindow.setContent(iwContent);
         infoWindow.open(map, marker);
   });
}

/*function DeleteMarkers() {   
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
 }*/

  function DeleteMarkers() {   
        mc_atm.clearMarkers();
        mc_cls.clearMarkers();
        mc_sto.clearMarkers();
        mc_off.clearMarkers();
        atm_markers = [];
        off_markers = [];
        sto_markers = [];
        cls_markers = [];
  }

 $(document).ready(function() {
        /* atm fillter */
       $(".filter_get_result_atm").click(function() {
         show_loader()
         var manufacturer =  $("#manufacturer").val(); 
         var country      =  $("#country").val(); 
         var distance     =  $("#distance").val(); 
         var coin         =  $("#coin").val();
         var atm          =  $("#AllAtms").val();            
         var zipcode      =  $("#zipcode").val();
         var place_atm    =  $("#place_atm").val(); 

         $.ajax({
          type      : 'POST',
          url       : base_url+'Bitcoin-ATM-Locations-Find-Your-Nearest-Bitcoin-ATM-Locations/search/search.json',
          dataType  : 'json',
          data      : {  'm': manufacturer,loc:country,dis:distance,coin:coin,atm:atm,a:place_atm,location:zipcode}, 
          success: function(return_data) {
               DeleteMarkers();
               hide_loader()
               create_marker_by_search(return_data.data.atms);
               mc_atm = new MarkerClusterer(map, atm_markers);
               mc_atm.repaint();      
          },
           error: function(return_data,status,error) { 
             hide_loader()   //console.log(error);
             alert("Error while fetching...");
            }
          });
     });
    /* Atm filter */
    
    /* Store filter */
      $(".result_stores_filter").click(function() {
        show_loader()
        var store     =  $("#all_stores-stores").val(); 
        var category  =  $("#category-stores").val(); 
        var coin_type =  $("#coinType-stores").val(); 
        var place     =  $("#place_store").val(); 
        var county    =  $("#country-stores").val(); 
        var zipcode   =  $("#zipcode_store").val(); 
        var distance  =  $("#distance-stores").val(); 
        var data      = {store:store,cat:category,coin:coin_type,n:place,loc:country,location:zipcode,dis:distance}; console.log(data);
        $.ajax({
                 url:base_url+'storesApi/search/stores.json',
                 method:'post',
                 //data: {store:store,cat:category,coin:coin_type,n:place,loc:country,location:zipcode,dis:distance}, 
                 success:function(data) {
                     DeleteMarkers();
                     hide_loader()
                     create_marker_stores(data.data.stores);          
                     mc_sto = new MarkerClusterer(map, sto_markers);
                     mc_sto.repaint();      
                 },error: function(return_data,status,error) { 
                    hide_loader();   //console.log(error);
                   alert("Error while fetching...");
                 } 
        });
        //store:store,cat:category,coin:coin_type,n:place,loc:country,location:zipcode:zipcode,dis:distance
     });
    /* Store end */

      $(".filter_classified").click(function() {
        show_loader();
        var coin          = $("#classified_coin").val();        if(coin == 'all') coin ='';
        var category      = $("#classified_category").val();    if(category == 'all') category ='';
        var all           = $("#classified_all").val();         if(all == 'all') all ='';
        var most_recent   = $("#classified_most_recent").val(); if(most_recent == 'all') most_recent ='';
        var distance      = $("#classified_distance").val();
        var zipcode       = $("#zipcode_classified").val();  
        var place         = $("#place_classified").val();

        var data = {keyword:place,classified:all,cat:category,coin:coin,location:zipcode,dis:distance}; console.log(data);
         $.ajax({
                 url:base_url+'classifiedsApi/search/classifieds.json',
                 method:'post',
                 data: data, 
                 success:function(data) {
                     DeleteMarkers()
                     hide_loader()
                     create_marker_classifieds(data.data.classified);          
	             mc_cls = new MarkerClusterer(map, cls_markers);
	             mc_cls.repaint();      
                 },error: function(return_data,status,error) { 
                 hide_loader()
                   alert("Error while fetching...");
                 } 
         });
       });



    /* Offer filter */
      $(".filter_result_offers").click(function() {
        show_loader()
        var category_offer   = $("#category-offer").val();
        var offer_type_offer = $("#offer_type-offer").val();
        var all_stores_offer = $("#all_stores-offer").val();  
        $.ajax({
                 url:base_url+'offersApi/search/offers.json',
                 method:'post',
                 data: {cat:category_offer, t:offer_type_offer,offer:all_stores_offer}, 
                 success:function(data) {
                     DeleteMarkers()
                     hide_loader()
                     create_marker_offers(data);          
	             mc_off = new MarkerClusterer(map, off_markers);
	             mc_off.repaint();      
                 },error: function(return_data,status,error) { 
                 hide_loader()
                   alert("Error while fetching...");
                 } 
        });
      });
     /* Offer filter */

   /*Filter Creation */

      $("#filter_inital").click(function() {
              $('#map-canvas').addClass('map_loader');
              $("#filter_inital").hide();
              $("#filter_categories").show();
      });

   $(".stores-category").click(function() {

        $("#filter_categories").hide();
        $("#filters-stores").show();

   });

   $(".offers-category").click(function() {

        $("#filter_categories").hide();
        $("#filters-offers").show();

   });

   $(".atms-category").click(function() {

        $("#filter_categories").hide();
        $("#filters-atm").show();

   });

   $(".classifieds-category").click(function() { 

        $("#filter_categories").hide();
        $("#filters-classifieds").show();

   });

   /* filter end */
 
   /* remove filter */
    $(".remove_filter").click(function() {
        $('#map-canvas').removeClass('map_loader'); 
        $("#filters-classifieds").hide();
        $("#filters-offers").hide();
        $("#filters-atm").hide();
        $("#filters-stores").hide();
        $("#filter_categories").hide();

        $("#filter_inital").show();
  
	$("option:selected").removeAttr("selected");
        $("#zipcode").val('');
        $("#place_atm").val(''); 
        $("#zipcode_store").val('');
        $("#place_store").val(''); 


   });
  /* remove filter */
   

    });

   function create_marker_by_search(search_results) {
    var  i = 0;           
    $.map(search_results,function(value, index) {
      i++;  
      var id          = value.Atm.id;        
      var lat         = value.Atm.latitude;
      var lon         = value.Atm.longitude; 
      var title       = value.Atm.name;
      var description = value.Atm.description;
      var address     = value.Atm.address;
      var contact_no  = value.Atm.contact_no;
      var latlng      = new google.maps.LatLng(lat,lon);
      var icon        = "http://localhost/map_ci/assets/img/atm.png";
      var marker = new google.maps.Marker({
        map: map,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        position: latlng,
        icon: icon,
        styles:mapStyles,
        scrollwheel: true,
        title: name,
     });   
     atm_markers.push(marker);
     map.setCenter(latlng)
     createMarker(marker,title, address, address, contact_no,latlng);
   });
          $("#result_div_atm").html( i + ' Atms')
   }

 



   function create_marker_stores(search_results) {
            var  i = 0;  
            $.map(search_results,function(value, index) { i++;
              var lat     = value.Store.latitude;
              var lon     = value.Store.longitude;
              var name    = value.Store.name;
              var address = value.Store.address;
              var contact = value.Store.contact_no;

              var icon = "http://localhost/map_ci/assets/img/store.png";
            
              var latlng      = new google.maps.LatLng(lat,lon);
              var marker = new google.maps.Marker({
                map: map,
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		position: latlng,
		icon: icon,
		styles:mapStyles,
		scrollwheel: false,
		title: name,
            });   
         sto_markers.push(marker);
         map.setCenter(latlng)
         createMarker(marker,name, address, 'address', contact,latlng);

        });
                 $("#result_div_stores").html( i + ' Stores  ')
     }



function create_marker_offers(search_results) {   
            var  i = 0; 
                   $.map(search_results.data.offers,function(value, index) { i++;
                    var lat     = value.Store.latitude;
                    var lon     = value.Store.longitude;
                    var name    = value.Store.name;
                    var address = value.Store.address;
                    var contact = value.Store.contact_no;

                    var icon = "http://localhost/map_ci/assets/img/offers.png";

                    var latlng      = new google.maps.LatLng(lat,lon);

   var marker = new google.maps.Marker({
                     map: map,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      position: latlng,
      icon: icon,
      styles:mapStyles,
      scrollwheel: false,
      title: name,
   });   

     off_markers.push(marker);

                    createMarker(marker ,name, address, address, contact,latlng);
             });


               $("#result_div_offer").html( i + ' Offers  ')
     }

function create_marker_classifieds(search_results) {

            var  i = 0; 
  
                    $.map(search_results,function(value, index) {   

                    var lat     = value.Classified.latitude;
                    var lon     = value.Classified.longitude; 
                    var title   = value.Classified.title;
                    var address = value.Classified.address; 
                    var contact = value.Classified.contact_no; 
                    var icon = "http://localhost/map_ci/assets/img/class.png";

                    var latlng      = new google.maps.LatLng(lat,lon);
 var marker = new google.maps.Marker({
                     map: map,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      position: latlng,
      icon: icon,
      styles:mapStyles,
      scrollwheel: false,
      title: name,
   });   
     cls_markers.push(marker);
     createMarker(marker,title, address,address, contact,latlng);
             });

     }


    $.ajax({
      url: base_url+"searchApi/getMapSearch/search.json",
      method:'post',
          success: function( data ) { 
            $.map(data.data.search,function(value, index) {   
              availableTags = data.data.search; 
             availableTags.push(value); 
           });
            $( "#pac-input" ).autocomplete({
              source: availableTags
           });
         }
        });

    $("#get_combined_result").click(function() {
       var keyword = $("#pac-input").val();
       show_loader()
      $.ajax({
      url: base_url+'Bitcoins/searchApi/searchMap/search.json',
      method:'post',
      data: {q:keyword},
          success: function( data ) {
                       DeleteMarkers();
                       hide_loader();  
                       if(data.data.search.atm.length > 0) {
                         create_marker_by_search(data.data.search.atm);
	                 mc_atm = new MarkerClusterer(map, atm_markers);
	                 mc_atm.repaint();  
                       }
                      if(data.data.search.classified.length > 0) {
                        create_marker_classifieds(data.data.search.classified);
                        mc_cls = new MarkerClusterer(map, cls_markers);
                        mc_cls.repaint();     
                      }
                      if(data.data.search.store.length > 0) {
                        create_marker_stores(data.data.search.store); 
                        mc_sto = new MarkerClusterer(map, sto_markers);
                        mc_sto.repaint();     
                     }
         }
        });
 

 });



/* Auto Complete Atm Zip

 $("#place_atm").keyup(function() {


   var length = $(this).val().length;
   if(length > 3) { $(this).attr('disabled');
      //show_filter_auto_complete_loader();   
      $.ajax({ 
             url:base_url+'atmsApi/atms_search/list.json',
             method:'post',
             data: {q:'robocoin'}, 
             success:function(data) {

             }, error: function(return_data,status,error) { 

          } 

    });
   }
 });*/

/* Auto Complete Atm Zip
    function log( message ) {
      $( "<div>" ).text( message ).prependTo( "#log" );
      $( "#log" ).scrollTop( 0 );
    }

    $( "#pac-input" ).autocomplete({    
      source: function( request, response ) {  
        $.ajax({
          url: "http://stallioni.in/Bitcoins/searchApi/getMapSearch/search.json",
          method:'post',
          data: {
            q: request.term
          },
          success: function( data ) { 
            console.log(data.data.search.length);
            response(data.data.search);
          }
        });
      },
      minLength: 3,
      select: function( event, ui ) {
        log( ui.item ?
          "Selected: " + ui.item.label :
          "Nothing selected, input was " + this.value);
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });*/



 $("#place_aetm").keyup(function() {


   var length = $(this).val().length;
   if(length > 3) { $(this).attr('disabled');
      //show_filter_auto_complete_loader();  
       var str = $(this).val(); $("#auto_complete_loader").show();
      $.ajax({ 
             url:base_url+'atmsApi/atms_search/list.json',
             method:'post',
             data: {q:str}, 
             success:function(data) { $("#auto_complete_loader").hide();
                    $.map(data.data.atms,function(value, index) {   //console.log(value); i++;

                    var limit = value.length; console.log(value);

                  $( "#place_atm" ).autocomplete({
                     source: value
                 });

             });


             }, error: function(return_data,status,error) { 

          } 

    });
   }
 });
/* Auto Complete Atm Zip

 $("#place_atm").keyup(function() {


   var length = $(this).val().length;
   if(length > 3) { $(this).attr('disabled');
      //show_filter_auto_complete_loader();   
      $.ajax({ 
             url:base_url+'atmsApi/atms_search/list.json',
             method:'post',
             data: {q:'robocoin'}, 
             success:function(data) {
               console.log(data);   
             }, error: function(return_data,status,error) { 

          } 

    });
   }
 });

/* Auto Complete Atm Zip
$("#place_atm").keyup(function() {
   var length = $(this).val().length;
   if(length > 3) { $(this).attr('disabled');  var str = $(this).val();
      //show_filter_auto_complete_loader();   
      $.ajax({ 
             url:base_url+'atmsApi/atms_search/list.json',
             method:'post',
             data: {q:'str}, 
             success:function(data) {
               console.log(data);   
             }, error: function(return_data,status,error) { 
          } 
    });
   }
 });
*/
