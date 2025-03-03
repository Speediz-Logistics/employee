<script setup>
import {Offcanvas} from "bootstrap";
import {onMounted, onUnmounted, ref, reactive} from 'vue';
import { useTrackingStore } from '@/store/tracking.js';
import { useRoute, useRouter } from "vue-router";
const store = useTrackingStore();
const data = ref({})
const route = useRoute();
const router = useRouter()
const offcanvasRef = ref();
let bsOffcanvas = null;
const id = route.params.id;

const props = defineProps({
  id: {type: String, default: 'offcanvas'}, // Default id as 'offcanvas'
});

const isPickedUp = ref(false);

const show = () => {
  Offcanvas.getOrCreateInstance(document.querySelector('#' + props.id)).show();
};

const hide = () => {
  Offcanvas.getOrCreateInstance(document.querySelector('#' + props.id)).hide();
};

const toggle = () => {
  Offcanvas.getOrCreateInstance(document.querySelector('#' + props.id)).toggle();
};

const showTracking = async () => {
  const response = await store.show(id);
  data.value = response.data || [];
}

const isShow = () => {
  if (!document.querySelector('#' + props.id)) {
    return false;
  }
  return Offcanvas.getInstance(document.querySelector('#' + props.id))._isShown;
};

const statusClass = computed(() => {
  return data.value.status === 'in_transit' ? 'text-warning' : 'text-success';
});

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
};

onMounted(() => {
  showTracking();
  bsOffcanvas = new Offcanvas(offcanvasRef.value, {
    backdrop: false,
    scroll: true,
  });
});

onUnmounted(() => {
  bsOffcanvas = null;
});

defineExpose({
  show,
  hide,
  toggle,
});
</script>

<template>
  <div ref="offcanvasRef" class="offcanvas offcanvas-top margin-offcanvas offcanvas-info" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
    <div class="offcanvas-body small">
      <div class="package-info p-4 bg-light rounded shadow-sm">
        <h5 class="text-primary mb-3">Package Information</h5>

        <div v-if="data">
          <div class="info-row">
            <div class="label">Package ID</div>
            <div class="value">{{ data.id }}</div>
          </div>
          <div class="info-row">
            <div class="label">Driver</div>
            <div class="value">{{ data.driver_name }}</div>
          </div>
          <div class="info-row">
            <div class="label">Driver Phone</div>
            <div class="value">
              <a :href="'tel:' + data.driver_phone">{{ data.driver_phone }}</a>
            </div>
          </div>
          <div class="info-row">
            <div class="label">Location</div>
            <div class="value">{{ data.location?.address }}</div>
          </div>
          <div class="info-row">
            <div class="label">Delivery Status</div>
            <div class="value text-success">{{ data.status }}</div>
          </div>
        </div>
        <div v-else class="text-danger">No package data available</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
.label {
  font-weight: bold;
}
.value {
  color: #333;
}
.package-info {
  max-width: 500px;
  margin: auto;
  border-left: 5px solid #007bff;
}

.margin-offcanvas {
  margin-top: 20px;
}

.offcanvas-info {
  height: 25vh;
}
.margin-offcanvas {
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 800px;
}
/* Optional custom styles for bottom-offcanvas */
.offcanvas-bottom {
  top: auto;
  bottom: 0;
}

</style>
