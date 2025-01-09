  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  const locts = [
    [4.7399331,11.2205928],
    [4.7399331,11.2205928],
    [4.5738292,11.1164375],
    [3.9663727,12.0179929],
    [3.83599,11.5505661],
    [3.9781803,11.5931287],
    [3.515197,11.503114],
    [3.6426671,10.7728292],
    [3.8689867,11.5213344],
    [3.77339,12.244917],
    [5.8948457,14.5471591],
    [4.4358104,14.3645181],
    [4.5776155,13.6843792],
    [3.9884092,13.1717237],
    [12.0831175,15.0191262],
    [10.3444296,15.2265866],
    [10.1164404,15.3222797],
    [5.9614117,10.1516505],
    [5.4758844,10.4217852],
    [5.7282262,10.8971603],
    [2.6722719,12.6780673],
    [2.9434098,9.9126989],
    [4.6378368,9.4409446],
    [9.7605307,13.959974],
    [9.3070698,13.3934527],
    [4.0429389,9.7062018],
    [12.0831175,15.0191262]
  ];

  function verif(post) {
    const ray = 10000;
    d = 10000;
    p = [];
    locts.forEach(pos => {
      dc = Math.sqrt(Math.pow((pos[0]-post[0]),2)+Math.pow((pos[1]-post[1]),2));
      if (dc < d) {
        d = dc;
        p = pos
        console.log(d)
        console.log(p)
      }
    });
    point = Math.pow((post[0] - p[0]),2)+(Math.pow((post[1] - p[1]),2))*Math.pow(ray,2);
    console.log("point="+point)
    if(point <= ray){
      return true;
    }else{
      return false;
    }
  }



function showPosition(position) {
  var platform = new H.service.Platform({
    'apikey': 'mZLrb9tKzJK9OAN7ocFO2EIFPLMLqXgxbeO1EJjDgBQ' 
});
post = [position.coords.latitude,position.coords.longitude]

var omvService = platform.getOMVService({ path: "v2/vectortiles/core/mc" });
var baseUrl = "https://js.api.here.com/v3/3.1/styles/omv/oslo/";

var style = new H.map.Style(`${baseUrl}normal.day.yaml`, baseUrl);

var omvProvider = new H.service.omv.Provider(omvService, style);
var omvlayer = new H.map.layer.TileLayer(omvProvider, { max: 22 ,dark:true});



var map = new H.Map(document.getElementById("mapContainer"), omvlayer, {
  zoom: 17,
  center: { lat:position.coords.latitude, lng:position.coords.longitude },
});

locts.forEach(loc => {
  const circle = new H.map.Circle(
    new H.geo.Point(loc[0],loc[1]),
    10000,
    {
    style: {
      fillColor: 'rgba(255, 0, 0, 0.5)',
      strokeColor: 'rgba(0, 0, 0, 1)', 
      lineWidth: 2
    }
  });
  map.addObject(circle);
});




const marker = new H.map.Marker({lat:post[0], lng:post[1]});
map.addObject(marker);



window.addEventListener("resize", () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

if (verif(post)) {
  alert("Vous est en zone de risque");
}
}



