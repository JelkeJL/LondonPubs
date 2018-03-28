$.getJSON("data.json", function(json) {
    console.log(json); // this will show the info it in firebug console

});

function initMap() {
    var ArenbergIII = {lat: 50.863002, lng: 4.678974};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: ArenbergIII
    });
    var marker = new google.maps.Marker({
        position: ArenbergIII,
        map: map
    });
}
