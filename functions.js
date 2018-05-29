
$(function() {

	$.getJSON("data.json", function(json) {
   	 console.log(json); // this will show the info it in firebug console
     console.log(json.data.length);


     $(".foursquare").click(function() {
      console.log("user would like foursquare-rated pubs");
      for (var i = 0; i < 10; i++) {
        var fs = json.data[i]
        console.log(fs[" rate_foursquare"])};
    
    });
    $(".near").click(function() {
      console.log("user would like pubs nearby");
    });
    $(".photo").click(function() {
      console.log("user would like pubs with photo");
    });
    $(".gone").click(function() {
      console.log("user would pubs that no longer exist");
    });
     
	});

});



var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.6633, lng: -0.0923},
          zoom: 15
        });
        infoWindow = new google.maps.InfoWindow;
        
        

// Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

           infoWindow.setPosition(pos);
           infoWindow.setContent('You are here.');
           infoWindow.open(map);
            map.setCenter(pos);

          var image = {
            url : 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/google/119/flag-for-united-kingdom_1f1ec-1f1e7.png',
            scaledSize: new google.maps.Size(25, 25), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0), // anchor
          }
          var marker = new google.maps.Marker({
            position: pos,
            map:map,
            icon: image,
          });

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map,marker);
      }


