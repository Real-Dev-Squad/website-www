import MAPBOXGL_ACCESS_TOKEN from './config.js';
import {
  MAP_CONTAINER_ID,
  MAP_STYLE,
  MAP_ZOOM,
  MAP_COORDINATES,
} from './constants.js';

mapboxgl.accessToken = MAPBOXGL_ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: MAP_CONTAINER_ID,
  style: MAP_STYLE,
  center: [MAP_COORDINATES.LNG, MAP_COORDINATES.LAT],
  zoom: MAP_ZOOM,
});

const getUsersData = async () => {
  try {
    const userDetailsResponse = await fetch('http://localhost:3000/users', {
      method: 'GET',
      cache: 'default',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    });
    const { users } = await userDetailsResponse.json();
    if (users) {
      let userHaveLocationAndImageDetails = users.filter(
        (user) =>
          // todo: update location related keys after it finalizes in backend for now in dummy data I used these keys
          // and tested this feature using that data
          user.location_coordinates &&
          Array.isArray(user.location_coordinates) &&
          user.location_coordinates.length == 2 &&
          user.picture &&
          user.picture.url,
      );
      addMarkersToMap(userHaveLocationAndImageDetails);
    }
  } catch (err) {
    console.log('get users data error', err);
  }
};

async function addMarkersToMap(userDetails) {
  if (!map._loaded || !map._fullyLoaded || !userDetails.length || !showMap) {
    return;
  }
  userDetails.forEach(({ location_coordinates, picture }) => {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'marker';
    markerDiv.style.backgroundImage = `url(${picture.url})`;
    // Add markers to the map.
    new mapboxgl.Marker(markerDiv).setLngLat(location_coordinates).addTo(map);
    mapSection.classList.remove('element-display-remove');
    map.resize();
  });
}

if (showMap) {
  window.addEventListener('DOMContentLoaded', getUsersData);
}
