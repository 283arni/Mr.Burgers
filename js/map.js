ymaps.ready(init);

var myPlacemarks = [{
    coords: 59.938433,
    coords2: 30.306681,
    hint: "Бургеры на Адмиралтейской набережной, 10"
  },
  {
    coords: 59.966402,
    coords2: 30.311461,
    hint: "Бургеры на Каменноостровском проспекте, 37"
  },
  {
    coords: 59.946715, 
    coords2: 30.434368,
    hint: "Бургеры на проспекте Энергетиков, 16"
  }
]

function init() {
  var myMap = new ymaps.Map("map", {
    center: [59.939095, 30.315868],
    zoom: 12,
    controls: ['geolocationControl','zoomControl','searchControl']
  });
  myMap.behaviors.disable('scrollZoom'); 
  myPlacemarks.forEach(function (obj) {
    var myPlacemark = new ymaps.Placemark([obj.coords, obj.coords2], {
      hintContent: obj.hint
    }, {
      iconLayout: 'default#image',
      iconImageHref: '/images/contacts/map-marker.svg',
      iconImageSize: [46, 57]
    });
    myMap.geoObjects
      .add(myPlacemark);
  })
}