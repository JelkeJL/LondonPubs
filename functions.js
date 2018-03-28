$.getJSON("data.json", function(json) {
    console.log(json); // this will show the info it in firebug console

});

function initMap() {
    var GH_london = {lat: 51.6633, lng: -0.0923};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: GH_london
    });
    var marker = new google.maps.Marker({
        position: GH_london,
        map: map
    });
}
