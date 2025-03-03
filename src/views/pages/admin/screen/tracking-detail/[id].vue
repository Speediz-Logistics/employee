<template>
  <MapOffcanvas ref="offcanvasRef" />
  <div id="map-container">
    <div id="map" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import useEnv from '@/composables/useEnv';
import { useRoute } from 'vue-router';
import { useTrackingStore } from '@/store/tracking.js';
import MapOffcanvas from "@/components/MapOffcanvas.vue";

const offcanvasRef = ref(null); // Reference to MapOffcanvas
const route = useRoute();
const id = route.params.id;
const packages = ref({
  id: 0,
  delivery_tracking: { lat: 0, lng: 0 }, // Start location
  location: { lat: 0, lng: 0 }, // End location
});

const { show } = useTrackingStore();
const { APP_MAP_BOX_TOKEN } = useEnv();
mapboxgl.accessToken = APP_MAP_BOX_TOKEN;

const getPackage = async () => {
  const response = await show(id);
  console.log('response', response.data);
  packages.value = response.data;
};

onMounted(async () => {
  await getPackage();
  const {delivery_tracking, location} = packages.value;
  offcanvasRef.value.show();
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [delivery_tracking.lng, delivery_tracking.lat],
    zoom: 12,
    interactive: true, // Enable zooming but disable setting points manually
  });

  new mapboxgl.Marker({color: 'blue'})
    .setLngLat([delivery_tracking.lng, delivery_tracking.lat])
    .addTo(map);

  new mapboxgl.Marker({color: 'red'})
    .setLngLat([location.lng, location.lat])
    .addTo(map);

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
    alternatives: false,
    controls: {instructions: false},
    interactive: false, // Prevent clicking to change locations
    geometries: 'geojson',
  });

  map.addControl(directions, 'top-left');

  // Prevent user from clicking to change origin/destination
  map.on('click', (e) => {
    e.preventDefault();
  });

  // Ensure directions load correctly
  setTimeout(() => {
    directions.setOrigin([delivery_tracking.lng, delivery_tracking.lat]);
    directions.setDestination([location.lng, location.lat]);
  }, 1000);

  directions.on('route', () => {
    const routeLayerId = 'directions-route-line';
    if (map.getLayer(routeLayerId)) {
      map.setPaintProperty(routeLayerId, 'line-width', 4);
    }
  });
});
</script>

<style scoped></style>
