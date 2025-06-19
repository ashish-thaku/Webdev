    mapboxgl.accessToken=mapToken

    const map=new mapboxgl.Map({
    container:"map",
    style:"mapbox://styles/mapbox/streets-v12",
    center:listing.geometry.coordinates,//starting position, [lng,lat]
    zoom:9
});

console.log(listing.geometry.coordinates)

const marker=new mapboxgl.Marker({color: 'red', rotation: 45})
.setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
.setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(`<h3>${listing.title}</h3><p>Excat location will be given after booking!</p>`))
.addTo(map);







