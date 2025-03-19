<script setup>
import { onMounted, ref, watch } from 'vue';
import { useDebounce } from '@/composables/useDebounce.js';
import { useTrackingStore } from '@/store/tracking.js';
import { useRouter } from 'vue-router';

const { debounce } = useDebounce();
const { all } = useTrackingStore();
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);
const trackingData = ref([]);
const totalItems = ref(0);
const router = useRouter();

// Fetch Tracking Data
const fetchData = async () => {
  try {
    const data = await all({
      page: currentPage.value,
      perPage: perPage.value,
      search: searchQuery.value,
    });

    if (data.meta.status) {
      trackingData.value = data.data.data;
      totalItems.value = data.data.pagination.total;
    } else {
      console.error('Error fetching data:', data.meta.message);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

// Debounced Search
const debouncedFetchData = debounce(fetchData, 500);
watch(searchQuery, debouncedFetchData);

// Handle Pagination Change
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchData();
};

const viewTracking = (id) => {
  console.log('View Tracking:', id);
  router.push({
    name: 'tracking-detail',
    params: { id: id },
  });
};

onMounted(fetchData);
</script>

<template>
  <div class="container">
    <h1 class="fw-bold mb-4 h3">Vendor List</h1>

    <!-- Search Input -->
    <el-input v-model="searchQuery" placeholder="Search for tracking" clearable class="search-box mb-4" />

    <!-- Tracking Data Table -->
    <el-table :data="trackingData" class="tracking-table" stripe>
      <el-table-column label="Driver ID" prop="id" sortable />
      <el-table-column label="Driver Name" prop="driver_name" sortable />
      <el-table-column label="Location" prop="location.address" />
      <el-table-column label="Phone" prop="driver_phone" />
      <el-table-column label="Status">
        <template v-slot="scope">
          <el-tag :type="scope.row.status === 'in_transit' ? 'warning' : 'success'">
            {{ scope.row.status.replace('_', ' ').toUpperCase() }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center">
        <template v-slot="scope">
          <el-button
            v-if="scope.row.id !== null"
            type="primary"
            size="small"
            @click="viewTracking(scope.row.package_id)"
          >
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <el-pagination
      :current-page="currentPage"
      :page-size="perPage"
      :total="totalItems"
      layout="prev, pager, next"
      class="pagination"
      @current-change="handlePageChange"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  border: 1px solid #ebeef5;
}

.search-box {
  width: 100%;
  max-width: 400px;
}

.tracking-table {
  border-radius: 8px;
  overflow: hidden;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
