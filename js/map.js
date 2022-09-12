const mapBlock = document.getElementById('section-map');

mapboxgl.accessToken = MAPBOXGL_ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: MAP_CONTAINER_ID,
  style: MAP_STYLE,
  center: [MAP_COORDINATES.LNG, MAP_COORDINATES.LAT],
  zoom: MAP_ZOOM,
});

const getUsersData = async () => {
  const userDetailsResponse = await fetch(
    'https://api.realdevsquad.com/users',
    {
      method: 'GET',
      cache: 'default',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    },
  );
  const { users } = await userDetailsResponse.json();
  const userHaveLocationAndImageDetails = users.filter(
    (user) =>
      user.location_coordinates &&
      Array.isArray(user.location_coordinates) &&
      user.location_coordinates.length == 2 &&
      user.picture &&
      user.picture.url,
  );
  addMarkersToMap(userHaveLocationAndImageDetails);
};

async function addMarkersToMap(userDetails) {
  userDetails.forEach(({ location_coordinates, picture }) => {
    // Create a DOM element for each marker.
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${picture.url})`;
    // Add markers to the map.
    new mapboxgl.Marker(el).setLngLat(location_coordinates).addTo(map);
    mapBlock.style.display = 'block';
  });
}

window.addEventListener('DOMContentLoaded', getUsersData);
