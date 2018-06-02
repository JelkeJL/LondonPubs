var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.6633, lng: -0.0923},
          zoom: 15
        });

        infoWindow = new google.maps.InfoWindow;       

        function addPubtoMap(a,b){

            var addmarker = {lat: a, lng: b};

            var pint = {
              url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/beer-mug_1f37a.png',
              scaledSize: new google.maps.Size(10,10),
              origin: new google.maps.Point(0,0),
              anchor: new google.maps.Point(0,0),
            };

            var newmarker = new google.maps.Marker({
              position: addmarker,
              map: map,
              icon: pint

            });

        };



        // http://snipplr.com/view/25479/calculate-distance-between-two-points-with-latitude-and-longitude-coordinates/
        //calc distance between locations
        function vicinity(lt,ln) {
          navigator.geolocation.getCurrentPosition(function(position){
              var here_lat = position.coords.latitude;
              var here_lng = position.coords.longitude;
              //console.log(position)

              //console.log(here_lat, here_lng)

              var R = 6371; 
              var dLat = (lt-here_lat) * Math.PI / 180;
              var dLon = (ln-here_lng) * Math.PI / 180;
    
              var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(here_lat * Math.PI / 180 ) * Math.cos(lt * Math.PI / 180 ) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
    
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
              var d = R * c;
    
              if (d>1) {
                console.log("Further than 1km");
                //line added and commented out to check if adding the markers worked
                //addPubtoMap(lt,ln);
              } else if (d<=1) {
                console.log("within Walking Distance");
                addPubtoMap(lt,ln);
              };

            })
          
        };



        //vicinity(51.514208,-0.116286)

        $(function() {
        
          $.getJSON("data.json", function(json) {
             //console.log(json); // this will show the info it in firebug console
             //console.log(json.data.length);
        

             $('#criterium').bind('change', function (e){

               if ($('#criterium').val() == 'empty'){
                 console.log("empty");

               } else if ($('#criterium').val() == 'foursquare'){
                console.log('foursquare');

                for (var i = 0; i < json.data.length; i++) {

                  var item = json.data[i];
                  //console.log(item[" rate_foursquare"]);
                  var fs = item[" rate_foursquare"]
                  if (fs != "null"){
                    //console.log(fs)

                    pub_lat = parseFloat(item["location.lat"])
                    pub_lng = parseFloat(item["location.lng"])
                    console.log(pub_lat, pub_lng)

                    vicinity(pub_lat,pub_lng)
                  }

                }

               } else if ($('#criterium').val() == 'near'){
                console.log('near');
               } else if ($('#criterium').val() == 'photo'){
                console.log('photo');
               } else if ($('#criterium').val() == 'gone'){
                console.log('gone');
               }
             }).trigger('change');
             
          });
        
        });        

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
            scaledSize: new google.maps.Size(15, 15), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0), // anchor
          }
          var marker = new google.maps.Marker({
            position: pos,
            map:map,
            icon: image,
          });

         //console.log(pos.lat, pos.lng)

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

