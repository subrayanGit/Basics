var mapStyles =[{featureType:"administrative.province",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"landscape",elementType:"all",stylers:[{visibility:"on"},{color:"#f4f6f7"}]},{featureType:"poi",elementType:"all",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"},{color:"#dee2e4"}]},{featureType:"road.highway",elementType:"all",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"all",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",elementType:"all",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",elementType:"all",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"water",elementType:"geometry",stylers:[{lightness:-25},{saturation:-97},{color:"#a4afb6"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]}];
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
var coin_arr = [];
var working_hrs = [];
var map;
var infoWindow;
var class_logo;
var offer_logo;
var atm_logo;
var store_logo;
var classified_read_more;
var offer_read_more;
var store_read_more;
var atm_read_more;
var availableAtms = [];
var availableStores = [];
var availableClass = [];
var base_url = 'http://stallioni.in/Bitcoins/';
var no_logo_atm;
var no_logo_store;
var no_logo_class;
var no_logo_offer;
var atm_json; 
var store_json;
var class_json; 
var offer_json; 
var category_sub_category;

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(51.4975941, -0.0803232),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: mapStyles,
        minZoom: 2,
            disableDefaultUI: true, // a way to quickly hide all controls
    mapTypeControl: true,
    scaleControl: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE 
    },    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    infoWindow = new google.maps.InfoWindow({maxWidth: 300});
    google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
    });
    show_loader();
    $.ajax({
        url: base_url + 'storesApi/index/stores.json',
        method: 'post',
        success: function(data) {
            availableStores = []; store_json = data.data.stores; 
            create_marker_stores(data.data.stores);
            mc_sto = new MarkerClusterer(map, sto_markers);
            mc_sto.repaint();
            whole_group()
            $("#place_store").autocomplete({
                source: availableStores
            });
        },
        error: function(return_data, status, error) {
            alert('Error occured... Please try again');
        }
    });
    $.ajax({
        url: base_url + 'classifiedsApi/index/classifieds.json',
        method: 'post',
        success: function(data) {
            availableClass = []; class_json = data.data.classified;
            create_marker_classifieds(data.data.classified);
            mc_cls = new MarkerClusterer(map, cls_markers); 
            mc_cls.repaint();
            whole_group()
            $("#place_classified").autocomplete({
                source: availableClass
            });
        },
        error: function(return_data, status, error) {
            alert('Error occured... Please try again');
        }
    });

    $.ajax({
        url: base_url + 'offersApi/index/offers.json',
        method: 'post',
        success: function(data) { offer_json = data; 
            create_marker_offers(data);
            mc_off = new MarkerClusterer(map, off_markers);
            mc_off.repaint();
            whole_group()
        },
        error: function(return_data, status, error) {
            alert('Error occured... Please try again');
        }
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
$(document).ready(function() {
    $.ajax({
        type: 'POST',
        url: base_url + 'searchApi/getcointype/coin.json',
        dataType: 'json',
        success: function(return_data) {
            
                coin_arr = return_data.data.cointype;

        }
    });

    $.ajax({
        type: 'POST',
        url: base_url + 'classifiedsApi/siteinfo/info.json',
        dataType: 'json',
        success: function(return_data) {
            class_logo = return_data.data.classified.siteinfo.logo_path;
            classified_read_more = base_url + return_data.data.classified.siteinfo.class_link;
            no_logo_class = return_data.data.classified.siteinfo.no_logo;
        }
    });  

 $.ajax({
        type: 'POST',
        url: base_url + 'searchApi/categories/cat.json',
        dataType: 'json',
        success: function(data) {
             
            category_sub_category = data;  
        }
    });

    $.ajax({
        type: 'POST',
        url: base_url + 'offersApi/offersiteinfo/info.json',
        dataType: 'json',
        success: function(return_data) {
            offer_logo = return_data.data.offers.siteinfo.logo_path;
            offer_read_more = base_url + return_data.data.offers.siteinfo.store_link;
            no_logo_offer = return_data.data.offers.siteinfo.no_logo;
        }
    });


    $.ajax({
        type: 'POST',
        url: base_url + 'storesApi/storesiteinfo/info.json',
        dataType: 'json',
        success: function(return_data) {
            store_logo = return_data.data.stores.siteinfo.logo_path;
            store_read_more = base_url + return_data.data.stores.siteinfo.store_link;
            no_logo_store = return_data.data.stores.siteinfo.no_logo;
        }
    });

    $.ajax({
        type: 'POST',
        url: base_url + 'atmsApi/atmsiteinfo/info.json',
        dataType: 'json',
        success: function(return_data) {
            atm_logo = return_data.data.atms.logo_path;
            atm_read_more = base_url + return_data.data.atms.read_more;
            no_logo_atm = return_data.data.atms.no_logo;
        }
    });
});

function show_loader() {
    $("#loader").show();
    $('#map-canvas').addClass('map_loader');
}

function hide_loader() {
    $("#loader").hide();
    $('#map-canvas').removeClass('map_loader');
}

function hide_previous_markers() {
    if (mc_atm != null)
        mc_atm.clearMarkers();
    if (mc_cls != null)
        mc_cls.clearMarkers();
    if (mc_sto != null)
        mc_sto.clearMarkers();
    if (mc_off != null)
        mc_off.clearMarkers();
    if (mc != null)
        mc.clearMarkers();
}

function whole_group() { console.log(markers.length);
        hide_previous_markers();
        mc = new MarkerClusterer(map, markers);
        mc.repaint();
}

/*Map Init */
navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    position.coords.latitude
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(latlng);
    map.setZoom(10);
}

/* Atm Json*/
$.ajax({
    url: base_url + 'Bitcoin-ATM-Locations-Find-Your-Nearest-Bitcoin-ATM-Locations/index/getatm.json',
    method: 'post',
    success: function(data) {
        $("#filter_inital").show();
        hide_loader();
        availableAtms = []; atm_json = data.data.atms;
        create_marker_by_search(data.data.atms);
        mc_atm = new MarkerClusterer(map, atm_markers);
        mc_atm.repaint();
        whole_group()
        $("#place_atm").autocomplete({
            source: availableAtms
        });
    },
    error: function(return_data, status, error) {
        hide_loader();
        alert('Error occured... Please try again');
    }
});

/*Form Json */
$.ajax({
    type: "GET",
    url: base_url + "searchApi/index/search.json",
    success: function(data) {
        /* Manufacturer filter form */
        $.map(data.data.search.amts.manufacturer, function(value, index) {
            $("#manufacturer").append('<option value="' + index + '">' + value + '</option>')
        });
        $.map(data.data.search.amts.coinType, function(value, index) {
            $("#coin").append('<option value="' + index + '">' + value + '</option>')
        });
        $.map(data.data.search.amts.country, function(value, index) {
            $("#country").append('<option value="' + index + '">' + value + '</option>')
        });
        $.map(data.data.search.amts.distance, function(value, index) {
            $("#distance").append('<option value="' + index + '">' + value + '</option>')
        });
        $.map(data.data.search.amts.all_atm, function(value, index) {
            $("#AllAtms").append('<option value="' + index + '">' + value + '</option>')
        });
        /* Manufactors End */

        /* offer form */
        $.map(data.data.search.offers.category, function(value, index) {
            $("#category-offer").append('<option value="' + index + '">' + value + '</option>')
        });
        $.map(data.data.search.offers.offer_type, function(value, index) {
            $("#offer_type-offer").append('<option value="' + index + '">' + value + '</option>')
        });
        $.map(data.data.search.offers.all_stores, function(value, index) {
            $("#all_stores-offer").append('<option value="' + index + '">' + value + '</option>')
        });
        /* offer end */

        /* stores form */
        $.map(data.data.search.stores.category, function(value, index) {
            $("#category-stores").append('<option value="' + index + '">' + value + '</option>')
        });
        $.map(data.data.search.stores.distance, function(value, index) {
            $("#distance-stores").append('<option value="' + index + '">' + value + '</option>')
        });

        $.map(data.data.search.stores.country, function(value, index) {
            $("#country-stores").append('<option value="' + index + '">' + value + '</option>')
        });
        $.map(data.data.search.stores.coinType, function(value, index) {
            $("#coinType-stores").append('<option value="' + index + '">' + value + '</option>')
        });
        $.map(data.data.search.stores.all_stores, function(value, index) {
            $("#all_stores-stores").append('<option value="' + index + '">' + value + '</option>')
        });
        /*  stores end */
        /* Filter Classifieds */
        $.map(data.data.search.classified.coinType, function(value, index) {
            $("#classified_coin").append('<option value="' + index + '">' + value + '</option>')
        });
        $.map(data.data.search.classified.category, function(value, index) {
            $("#classified_category").append('<option value="' + index + '">' + value + '</option>')
        });

        $.map(data.data.search.classified["classified-all"], function(value, index) {
            $("#classified_all").append('<option value="' + index + '">' + value + '</option>')
        });

        $.map(data.data.search.classified["classified-sort"], function(value, index) {
            $("#classified_most_recent").append('<option value="' + index + '">' + value + '</option>')
        });

        $.map(data.data.search.classified.distance, function(value, index) {
            $("#classified_distance").append('<option value="' + index + '">' + value + '</option>')
        });

        /*Classifieds End */
    },
    error: function(return_data, status, error) {
        alert('Error occured in form... Please try again');
    }
});
/* Filter Reults */

function createMarker(marker, name, address1, address2, contact, latlng, coin, logo, read, wrk_hrs, c, sc,web_link,class_spe) {
    if (wrk_hrs.monday != null && wrk_hrs.friday != null) {

        var working_hrs = '<p> <b> Monday:</b>' + wrk_hrs.monday + '</p>' +
            '<p> <b> Tuesday:</b>' + wrk_hrs.tuesday + '</p>' +
            '<p> <b> Wednesday:</b>' + wrk_hrs.wednesday + '</p>' +
            '<p> <b> Thursday:</b>' + wrk_hrs.thursday + '</p>' +
            '<p> <b> Friday:</b>' + wrk_hrs.friday + '</p>' +
            '<p> <b> Saturday:</b>' + wrk_hrs.saturday + '</p>' +
            '<p> <b> Sunday:</b>' + wrk_hrs.sunday + '</p>';
    } else {
        var working_hrs = '';
    } 

    if (c == null)
        var c_category = '';
    else
        var c_category = '<p> <b>Category -</b>' + c + '</p>';



    if (sc == null)
        var sub_category = '';
    else
        var sub_category = '<p> <b>Subcategory -</b>' + sc + '</p>';

var sc = '<p> <b>Category -</b>' + coin_arr[coin] + '</p>';


    if (coin == null)
        var dis = '';
    else
        var dis = '<p> <b>Accepted Coins -</b>' + coin + '</p>';

    if (logo == "")
        var logo_dis = '';
    else
        var logo_dis = '<center> <img src="' + logo + '" height="70"> </center> ';
   
     if(contact != '' && contact != null)
       var contact = '<p> <i class="fa fa-mobile" aria-hidden="true"></i> ' +contact +'</p>';
      else 
        var contact =''; 

     if(web_link != null)
       var web_link = '<p> <i class="fa fa-globe" aria-hidden="true"></i> <a href="http://'+web_link+'">'+web_link +'</a></p>';
      else 
        var web_link =''; 



    if(class_spe == null) {

    var class_data_dis = '';
  } else {
  var star = '';

     for(var z=0;z<5;z++) {
       
         star+= '<i class="fa fa-star-o" style="color: gold;font-size: 1.5em;"></i>';      

    } 

    var class_data_dis = '<p> <i class="fa fa-user" aria-hidden="true"></i>  Posted By : '+class_spe.user+'</p><p> &nbsp;&nbsp;User Since:'+date_formater(class_spe.user_since)+'</p> <p>'+star+'('+class_spe.reviews+' reviews)</p><p> <i class="fa fa-calendar" aria-hidden="true"> </i> Date Posted ' +date_formater(class_spe.date_posted) +'</p>'+'<i class="fa fa-tag" aria-hidden="true"></i> <b>Price</b></p><p> <i class="fa fa-usd" aria-hidden="true"></i> ' +class_spe.price +'(USD)</p>'+'<p> <i class="fa fa-btc" aria-hidden="true"></i> ' +class_spe.price*0.0015  +'(BTC)</p> <p> Views : '+class_spe.views+'</p>';
}

    if(address1 != null && address1 != '') 
      var contact_dis   = '<b>Contact Information </b><br> <p> <i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp;' + address1 + '</p>';
    else
      var contact_dis   = ' ';

    var open_div      = '<div id="iw_container" style="height:200px!important;">';
    var name_lable    = '<p> <b>Name  -</b>' + name + '</p>';

    var footer        = '<a href="' + read + '" target="_blank"> View Listings </a> | <a href="https://maps.google.com/?daddr=' + address1 + '" target="_blank"> Get Girections </a> </div>';
    

    google.maps.event.addListener(marker, 'click', function() {
        var iwContent = open_div + logo_dis + name_lable + c_category + sub_category + dis + contact_dis + contact+ web_link +working_hrs +class_data_dis+ footer ;
        infoWindow.setContent(iwContent);
        infoWindow.open(map, marker);
    });
}

function DeleteMarkers() {
    if (mc_atm != null)
        mc_atm.clearMarkers();
    if (mc_cls != null)
        mc_cls.clearMarkers();
    if (mc_sto != null)
        mc_sto.clearMarkers();
    if (mc_off != null)
        mc_off.clearMarkers();
    if (mc != null)
        mc.clearMarkers();

    atm_markers = [];
    off_markers = [];
    sto_markers = [];
    cls_markers = [];
    markers = [];
}

$(document).ready(function() {
    /* atm fillter */
    $(".filter_get_result_atm").click(function() {
        $(".filter_get_result_atm").attr("disabled", true);
        show_loader()
        
        var manufacturer = $("#manufacturer").val();
        var country = $("#country").val();
        var distance = $("#distance").val();
        var coin = $("#coin").val();
        var atm = $("#AllAtms").val();
        var zipcode = $("#zipcode").val();
        var place_atm = $("#place_atm").val();

        $.ajax({
            type: 'POST',
            url: base_url + 'Bitcoin-ATM-Locations-Find-Your-Nearest-Bitcoin-ATM-Locations/search/search.json',
            dataType: 'json',
            data: {
                'm': manufacturer,
                loc: country,
                dis: distance,
                coin: coin,
                atm: atm,
                a: place_atm,
                location: zipcode
            },
            success: function(return_data) {
                DeleteMarkers();
                hide_loader();
                availableAtms = [];            
                $(".filter_get_result_atm").attr("disabled", false);
                create_marker_by_search(return_data.data.atms);
                mc_atm = new MarkerClusterer(map, atm_markers); 
                mc_atm.repaint();
                  
            },
            error: function(return_data, status, error) {
                $(".filter_get_result_atm").attr("disabled", false);
                hide_loader()
                alert("Error while fetching...");
            }
        });
    });
    /* Atm filter */

    /* Store filter */
    $(".result_stores_filter").click(function() {
        show_loader()
        $(".result_stores_filter").attr("disabled", true);
        var store = $("#all_stores-stores").val();
        var category = $("#category-stores").val();
        var coin_type = $("#coinType-stores").val();
        var place = $("#place_store").val();
        var country = $("#country-stores").val();
        var zipcode = $("#zipcode_store").val();
        var distance = $("#distance-stores").val();
        var data = {
            store: store,
            cat: category,
            coin: coin_type,
            n: place,
            loc: country,
            location: zipcode,
            dis: distance
        };
        $.ajax({
            url: base_url + 'storesApi/search/stores.json',
            method: 'post',
            data: data,
            success: function(data) {
                DeleteMarkers();
                availableStores = [];
                $(".result_stores_filter").attr("disabled", false);
                hide_loader()
                create_marker_stores(data.data.stores);
                mc_sto = new MarkerClusterer(map, sto_markers);
                mc_sto.repaint();
                  
            },
            error: function(return_data, status, error) {
                $(".result_stores_filter").attr("disabled", false);
                hide_loader();
                alert("Error while fetching...");
            }
        });
    });
    /* Store end */

    $(".filter_classified").click(function() {
        show_loader();
        $(".filter_classified").attr("disabled", true);
        var coin = $("#classified_coin").val();
        if (coin == 'all') coin = '';
        var category = $("#classified_category").val();
        if (category == 'all') category = '';
        var all = $("#classified_all").val();
        if (all == 'all') all = '';
        var most_recent = $("#classified_most_recent").val();
        if (most_recent == 'all') most_recent = '';
        var distance = $("#classified_distance").val();
        var zipcode = $("#zipcode_classified").val();
        var place = $("#place_classified").val();

        var data = {
            keyword: place,
            classified: all,
            cat: category,
            coin: coin,
            location: zipcode,
            dis: distance
        };
        $.ajax({
            url: base_url + 'classifiedsApi/search/classifieds.json',
            method: 'post',
            data: data,
            success: function(data) {
                DeleteMarkers()
                hide_loader()
                availableClass = [];
                $(".filter_classified").attr("disabled", false);
                create_marker_classifieds(data.data.classified);
                mc_cls = new MarkerClusterer(map, cls_markers);
                mc_cls.repaint();
                  
            },
            error: function(return_data, status, error) {
                $(".filter_classified").attr("disabled", false);
                hide_loader()
                alert("Error while fetching...");
            }
        });
    });
    /* Offer filter */
    $(".filter_result_offers").click(function() {
        show_loader()
        $(".filter_result_offers").attr("disabled", true);
        var category_offer = $("#category-offer").val();
        var offer_type_offer = $("#offer_type-offer").val();
        var all_stores_offer = $("#all_stores-offer").val();
        $.ajax({
            url: base_url + 'offersApi/search/offers.json',
            method: 'post',
            data: {
                cat: category_offer,
                t: offer_type_offer,
                offer: all_stores_offer
            },
            success: function(data) {
                DeleteMarkers()
                hide_loader()
                $(".filter_result_offers").attr("disabled", false);
                create_marker_offers(data);
                mc_off = new MarkerClusterer(map, off_markers);
                mc_off.repaint();
                  
            },
            error: function(return_data, status, error) {
                $(".filter_result_offers").attr("disabled", false);
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
        $("#hide_search").hide();
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
        DeleteMarkers();
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
        $("#hide_search").show();

        create_marker_by_search(atm_json);
        create_marker_classifieds(class_json);
        create_marker_stores(store_json);
        create_marker_offers(offer_json);

       whole_group();
     set_center_map(0,0);
     map.setZoom(2);
    });
    /* remove filter */
});

function create_marker_by_search(search_results) {
var i = 0;
    $.map(search_results, function(value, index) {
        
        var tot_coin = value.AtmsCoinType.length; var coin ='';

        for(var z=0; z<tot_coin;z++) {

          coin+= coin_arr[value.AtmsCoinType[z].coin_id]+', &nbsp;';          
         }

        var id = value.Atm.id;
        var lat = value.Atm.latitude;
        var lon = value.Atm.longitude;

if(i==0) {
  set_center_map(lat,lon)
}
i++;

        var title = value.Atm.name;
        var description = value.Atm.description;
        var address = value.Atm.address;
        var contact_no = value.Atm.contact_no;
        var latlng = new google.maps.LatLng(lat, lon);    
        var icon = "/map/assets/img/atm.png";
        if (value.Atm.logo.length > 0) {
            var logo = atm_logo + '/' + value.Atm.logo;
        } else {
            var logo = no_logo_atm;
        }

        var read_more = atm_read_more + value.Atm.slug;
        var marker = new google.maps.Marker({
            map: map,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            position: latlng,
            icon: icon,
            styles: mapStyles,
            scrollwheel: true,
            title: name,
        });
        atm_markers.push(marker);
markers.push(marker);
        availableAtms.push(title);
        if (value.AtmsBusinesshour.length > 0) {
            var monday = value.AtmsBusinesshour[0].monday;
            var tuesday = value.AtmsBusinesshour[0].tuesday;
            var wednesday = value.AtmsBusinesshour[0].wednesday;
            var thursday = value.AtmsBusinesshour[0].thursday;
            var friday = value.AtmsBusinesshour[0].friday;
            var saturday = value.AtmsBusinesshour[0].saturday;
            var sunday = value.AtmsBusinesshour[0].sunday;
        } else {
            var wrk_hrs = {
                friday: null,
                monday: null,
                saturday: null,
                sunday: null,
                thursday: null,
                tuesday: null,
                wednesday: null
            }
        }
        var category = null;
        var subcategory = null;

        var wrk_hrs = {
            friday: friday,
            monday: monday,
            saturday: saturday,
            sunday: sunday,
            thursday: thursday,
            tuesday: tuesday,
            wednesday: wednesday
        };


        createMarker(marker, title, address, address, contact_no, latlng, coin, logo, read_more, wrk_hrs, category, subcategory,null,null);
    });
}

function create_marker_stores(search_results) {
    var i = 0;
    $.map(search_results, function(value, index) {

        var lat = value.Store.latitude;
        var lon = value.Store.longitude;
if(i==0) {
  set_center_map(lat,lon)
}
i++;

      var coin ='';
        var tot_coin = value.StoresCoinType.length;

        for(var z=0; z<tot_coin;z++) { 

          coin+= coin_arr[value.StoresCoinType[z].coin_id]+', &nbsp;';          
         }




        var name             = value.Store.name;
        var address          = value.Store.address;
        var contact          = value.Store.contact_no;

        var category = '';
        var subcategory = null;  

        var StoresCat_length = value.StoresCategory.length;
        var storeCat = category_sub_category.data.search.category;

       for(var yx=0;yx<StoresCat_length;yx++) {
         category+= storeCat[value.StoresCategory[yx].category_id]+', &nbsp;';
       }

        var read = store_read_more + '/profile/s:' + value.Store.slug;
        var web_link = value.Store.web_link;
        var icon = "/map//assets/img/store.png";
        var latlng = new google.maps.LatLng(lat, lon);     
        var marker = new google.maps.Marker({
            map: map,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            position: latlng,
            icon: icon,
            styles: mapStyles,
            scrollwheel: false,
            title: name,
        });
        sto_markers.push(marker);
markers.push(marker);
        availableStores.push(name);
        if (value.StoresBusinesshour.length > 0) {
            var monday = value.StoresBusinesshour[0].monday;
            var tuesday = value.StoresBusinesshour[0].tuesday;
            var wednesday = value.StoresBusinesshour[0].wednesday;
            var thursday = value.StoresBusinesshour[0].thursday;
            var friday = value.StoresBusinesshour[0].friday;
            var saturday = value.StoresBusinesshour[0].saturday;
            var sunday = value.StoresBusinesshour[0].sunday;

            var wrk_hrs = {
                friday: friday,
                monday: monday,
                saturday: saturday,
                sunday: sunday,
                thursday: thursday,
                tuesday: tuesday,
                wednesday: wednesday
            };
        } else {
            var wrk_hrs = {
                friday: null,
                monday: null,
                saturday: null,
                sunday: null,
                thursday: null,
                tuesday: null,
                wednesday: null
            }
        }
     
        if (value.Store.logo.length > 0) {
            var logo = store_logo + '/' + value.Store.logo;
        } else {
            var logo = no_logo_store; 
        }



        createMarker(marker, name, address, 'address', contact, latlng, coin, logo, read, wrk_hrs, category, subcategory,web_link,null);
    });
    $("#result_div_stores").html(i + ' Stores  ')
}



function create_marker_offers(search_results) {
    var i = 0;
    $.map(search_results.data.offers, function(value, index) {
        
        var lat = value.Store.latitude;
        var read = offer_read_more + '/profile/s:' + value.Store.slug;

        var lon = value.Store.longitude;

if(i==0) {
  set_center_map(lat,lon)
}
i++;
       var coin = null;
  

        var name = value.Store.name;
        var address = value.Store.address;
        var contact = value.Store.contact_no;

        var icon = "/map/assets/img/offers.png";
        var latlng = new google.maps.LatLng(lat, lon);    
        var marker = new google.maps.Marker({
            map: map,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            position: latlng,
            icon: icon,
            styles: mapStyles,
            scrollwheel: false,
            title: name,
        });
        off_markers.push(marker);
markers.push(marker);


        var category = '';
        var subcategory = '';  

        var length = value.OffersCategory.length;
        var storeCat = category_sub_category.data.search.category;

       for(var yx=0;yx<length;yx++) {
         category+= storeCat[value.OffersCategory[yx].category_id]+', &nbsp;';
       }


        var length = value.OffersOfferType.length;
        var storeCat = category_sub_category.data.search.offertype;

       for(var yx=0;yx<length;yx++) {
         subcategory+= storeCat[value.OffersOfferType[yx].offer_type_id]+', &nbsp;';
       }



        if (value.Store.logo.length > 0) {
            var logo = offer_logo + '/' + value.Store.logo;
        } else {
            var logo = no_logo_offer;
        }


        var wrk_hrs = {
            friday: null,
            monday: null,
            saturday: null,
            sunday: null,
            thursday: null,
            tuesday: null,
            wednesday: null
        };

      

        createMarker(marker, name, address, address, contact, latlng, coin, logo, read, wrk_hrs, category, subcategory,null,null);
    });
    $("#result_div_offer").html(i + ' Offers  ')
}

function create_marker_classifieds(search_results) {
    var i = 0;
    $.map(search_results, function(value, index) {

        var lat = value.Classified.latitude;
        var lon = value.Classified.longitude;
if(i==0) {
  set_center_map(lat,lon)
}
i++;

        //var coin = value.Classified.accepting_coins;
      var coin ='';
        var tot_coin = value.ClassifiedsCoinType.length;

        for(var z=0; z<tot_coin;z++) {

          coin+= coin_arr[value.ClassifiedsCoinType[z].coin_id]+', &nbsp;';          
         }



        var category = '';
        var subcategory = '';   
        var length = value.Classified.category_id;  
        var storeCat = category_sub_category.data.search.classifield_category;   
        category+= storeCat[length];
        var length = value.Classified.sub_category_id; 
        var storeCat = category_sub_category.data.search.classifield_sub_category
        subcategory+= storeCat[length];

        var title = value.Classified.title;
        var address = value.Classified.address;
        var contact = value.Classified.contact_no;

        var read = classified_read_more + '/detail/s:' + value.Classified.slug;
        var icon = "/map/assets/img/class.png";
        var latlng = new google.maps.LatLng(lat, lon);   
        var marker = new google.maps.Marker({
            map: map,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            position: latlng,
            icon: icon,
            styles: mapStyles,
            scrollwheel: false,
            title: name,
        });
        cls_markers.push(marker);
markers.push(marker);
        availableClass.push(title);
        var wrk_hrs = {
            friday: null,
            monday: null,
            saturday: null,
            sunday: null,
            thursday: null,
            tuesday: null,
            wednesday: null
        };
 

        logo = no_logo_class;

    var class_spc = {
         date_posted:value.Classified.date_posted,
         price:value.Classified.price,
         btc:value.CurrenciesList.bitcoin_price,
         user:value.userinfo.User.name,
         user_since:value.userinfo.User.date_created,
         views:value.ClassifiedsCount[0].count,
         reviews:value.review
        };

        createMarker(marker, title, address, address, contact, latlng, coin, logo, read, wrk_hrs, category, subcategory,null,class_spc);
    });

}

$.ajax({
    url: base_url + "searchApi/getMapSearch/search.json",
    method: 'post',
    success: function(data) {
        availableTags = [];
        $.map(data.data.search, function(value, index) {
            availableTags = data.data.search;
            //availableTags.push(value); 
        });
        $("#pac-input").autocomplete({
            source: availableTags
        });
    }
});

$("#get_combined_result").click(function() {
    $("#get_combined_result").attr("disabled", true);
    var keyword = $("#pac-input").val();
    if (keyword != null) {
        show_loader()
        $.ajax({
            url: base_url + "searchApi/searchMap/search.json",
            method: 'post',
            data: {
                q: keyword
            },
            success: function(data) {
                DeleteMarkers();
                hide_loader();
                $("#get_combined_result").attr("disabled", false);
                if (data.data.search.atm.length > 0) {
                    create_marker_by_search(data.data.search.atm);
                    mc_atm = new MarkerClusterer(map, atm_markers);
                    mc_atm.repaint();
                      
                }
                if (data.data.search.classified.length > 0) {
                    create_marker_classifieds(data.data.search.classified);
                    mc_cls = new MarkerClusterer(map, cls_markers);
                    mc_cls.repaint();
                      
                }
                if (data.data.search.store.length > 0) {
                    create_marker_stores(data.data.search.store);
                    mc_sto = new MarkerClusterer(map, sto_markers);
                    mc_sto.repaint();
                      
                }
            }
        });
    }

});

/*window.fbAsyncInit = function() {
    FB.init({
        appId: '1727424514177735',
        status: true,
        xfbml: true
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "http://connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



document.getElementById('fbShareBtn').onclick = function() {
    FB.ui({
        method: 'feed',
        caption: 'Bitcoin ATM Map – Find Bitcoin ATM, Online Rates',
        picture: 'http://www.coinmapia.com/assets/img/cover_image.png',
        description: 'Find Bitcoin ATM locations easily with our Bitcoin ATM Map. For many Bitcoin machines online rates are available.',
        link: 'http://www.coinmapia.com',
    }, function(response) {});
}
*/

function date_formater(data) {
  var month = [ "Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];  
  var dateAr = data.split('-'); var day = dateAr[2].substring(0, 3)
  var month_code = Math.round(dateAr[1]);  month_code =  month_code-1; var format =  day+' '+month[month_code]+' '+dateAr[0];
  return format; 
}


if(typeof Storage !== "undefined")
  {
  //console.log('yesy');
  }
else
  {
  //console.log('no');
  }


function set_center_map(lat,lon) {
        map.setCenter(new google.maps.LatLng(lat, lon));
         map.setZoom(12);
}
