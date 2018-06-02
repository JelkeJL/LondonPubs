var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.6633, lng: -0.0923},
          zoom: 15
        });

        infoWindow = new google.maps.InfoWindow;       

        function addPubtoMap(a,b,index){

            var addmarker = {lat: a, lng: b};

            var pint = {
              url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/beer-mug_1f37a.png',
              scaledSize: new google.maps.Size(13,13),
              origin: new google.maps.Point(0,0),
              anchor: new google.maps.Point(0,0),
            };

            var newmarker = new google.maps.Marker({
              position: addmarker,
              map: map,
              icon: pint

            });

            newmarker.addListener('click', function() {
              //console.log("this is when the magic happens")

              $(function() {
                $.getJSON("data.json", function(json) {
                   //console.log(json.data.length);
                   var item = json.data[index];
                   var name = item["caption"]
  
                   console.log(name)

                  document.getElementById("pub_name").innerHTML = name
                  //$('#output').show()


                 })
              })
            });            

        };

        function addPhototoMap(a,b, index){

            var addmarker = {lat: a, lng: b};

            var photo = {
              url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/camera_1f4f7.png',
              scaledSize: new google.maps.Size(15,15),
              origin: new google.maps.Point(0,0),
              anchor: new google.maps.Point(0,0),
            };

            var newmarker = new google.maps.Marker({
              position: addmarker,
              map: map,
              icon: photo

            });

            newmarker.addListener('click', function() {
              //console.log("this also is when the magic happens")

              $(function() {
                $.getJSON("data.json", function(json) {
                   //console.log(json.data.length);
                   var item = json.data[index];
                   var name = item["caption"]
  
                   console.log(name)
                 })
              })
            });               

        };



        // http://snipplr.com/view/25479/calculate-distance-between-two-points-with-latitude-and-longitude-coordinates/
        //calc distance between locations
        function vicinity(lt,ln, exists, i) {
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
                //console.log("Further than 1km");
                console.log("verified")
//!!!           line added and commented out to check if adding the markers worked
                addPubtoMap(lt,ln, i);

                if (exists == "gone"){
                  addPhototoMap(lt,ln, i)
                }

              } else if (d<=1) {
                //console.log("within Walking Distance");

                if (exists == "beer"){
                  addPubtoMap(lt,ln, i);
                } else if (exists == "gone"){
                  addPhototoMap(lt,ln, i)
                }
                
              };

            })
          
        };


        function nearby(lt,ln, i) {
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
    
              if (d>5) {
                console.log("verified");
                //line added and commented out to check if adding the markers worked
                //addPubtoMap(lt,ln, i);
              } else if (d<=5) {
                console.log("within Walking Distance");
                addPubtoMap(lt,ln, i);
              };

            })
          
        };

        function refresh(){
          map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.6633, lng: -0.0923},
          zoom: 15
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
  
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
  
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());

          }
        }


        //vicinity(51.514208,-0.116286)

        $(function() {
        
          $.getJSON("data.json", function(json) {
             //console.log(json); // this will show the info it in firebug console
             //console.log(json.data.length);
        

             $('#criterium').bind('change', function (e){

               if ($('#criterium').val() == 'empty'){
                 console.log("empty");
                 refresh()

               } else if ($('#criterium').val() == 'foursquare'){
                //console.log('foursquare');
                refresh()

                for (var i = 0; i < json.data.length; i++) {

                  var item = json.data[i];
                  //console.log(item[" rate_foursquare"]);
                  var fs = item[" rate_foursquare"]
                  if (fs != "null"){
                    //console.log(fs)

                    pub_lat = parseFloat(item["location.lat"])
                    pub_lng = parseFloat(item["location.lng"])
                    //console.log(pub_lat, pub_lng)

                    vicinity(pub_lat,pub_lng,"beer", i)
                  }

                }

               } else if ($('#criterium').val() == 'near'){
                //console.log('near');
                refresh()
                for (var i = 0; i < json.data.length; i++) {

                  var item = json.data[i];
                  //console.log(item[" rate_foursquare"]);

                    pub_lat = parseFloat(item["location.lat"])
                    pub_lng = parseFloat(item["location.lng"])
                    //console.log(pub_lat, pub_lng)

                    nearby(pub_lat,pub_lng, i)
                  
                }

               } else if ($('#criterium').val() == 'photo'){
                //console.log('photo');
                refresh()

                for (var i = 0; i < json.data.length; i++) {

                  var item = json.data[i];
                  //console.log(item[" rate_foursquare"]);
                  var fs = item["display.content"]
                  if (fs != "null"){
                    //console.log(fs)

                    pub_lat = parseFloat(item["location.lat"])
                    pub_lng = parseFloat(item["location.lng"])
                    //console.log(pub_lat, pub_lng)

                    vicinity(pub_lat,pub_lng, "beer", i)
                  }

                }

               } else if ($('#criterium').val() == 'gone'){
                //console.log('gone');
                refresh()

                for (var i = 0; i < json.data.length; i++) {

                  var item = json.data[i];
                  //console.log(item[" rate_foursquare"]);
                  var fs = item[" rate_foursquare"]
                  if (fs == "null"){
                    //console.log(fs)

                    pub_lat = parseFloat(item["location.lat"])
                    pub_lng = parseFloat(item["location.lng"])
                    //console.log(pub_lat, pub_lng)

                    vicinity(pub_lat,pub_lng,"gone", i)
                  }

                }

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

