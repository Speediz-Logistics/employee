<script setup>
import { usePackageStore } from '@/store/package.js';
import { ref, onMounted, computed } from 'vue';
import { Search, View } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const data = ref({});
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const searchQuery = ref('');
const router = useRouter();

const dashboardStore = usePackageStore();
const { all } = dashboardStore;

const fetchData = async (page = 1) => {
  loading.value = true;
  const params = {
    page: page,
    per_page: pageSize.value,
    search: searchQuery.value,
  };
  try {
    data.value = (await all(params)) || {};
  } catch (error) {
    console.error('Error fetching packages:', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchData();
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchData(page);
};

const statusTagType = (status) => {
  const statusMap = {
    completed: 'success',
    in_transit: 'primary',
    pending: 'warning',
    cancelled: 'danger',
    default: 'info',
  };
  return statusMap[status] || statusMap['default'];
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const navigateToDetails = (id) => {
  // Assuming you have a router set up
  router.push({ name: 'package-detail', params: { id } });
};
onMounted(() => {
  fetchData();
});

// Computed properties
const packages = computed(() => data.value.data?.data || []);
const total = computed(() => data.value.data?.total || 0);
</script>

<template>
  <div class="container-fluid px-3 py-4">
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-bottom py-3">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <h5 class="mb-0 fw-semibold">📦 Package Management</h5>
          <div class="d-flex flex-wrap gap-2">
            <div class="d-flex gap-2">
              <el-input
                v-model="searchQuery"
                type="text"
                placeholder="Search packages..."
                @keyup.enter="handleSearch"
              />
              <el-button type="primary" @click="handleSearch">
                <el-icon>
                  <Search />
                </el-icon>
              </el-button>
            </div>
            <button class="btn btn-sm btn-primary"><i class="bi bi-plus-lg me-1"></i> Add Package</button>
          </div>
        </div>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive">
          <el-table
            v-loading="loading"
            :data="packages"
            empty-text="No packages found"
            stripe
            highlight-current-row
            :header-cell-style="{ backgroundColor: '#f8f9fa', color: '#212529', fontWeight: '600' }"
          >
            <el-table-column prop="number" label="Package #" width="140" sortable />
            <el-table-column prop="name" label="Name" sortable />
            <el-table-column label="Image" align="center">
              <template #default="{ row }">
                <el-image
                  :src="row.image"
                  :preview-src-list="[row.image]"
                  fit="cover"
                  style="width: 50px; height: 50px; border-radius: 4px"
                  hide-on-click-modal
                >
                  <template #error>
                    <div class="image-slot">
                      <i class="bi bi-image text-muted"></i>
                    </div>
                  </template>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="Price" width="120" align="right" sortable>
              <template #default="{ row }">
                <span class="fw-semibold">${{ parseFloat(row.price).toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="zone" label="Zone" width="100" align="center" />
            <el-table-column prop="status" label="Status" width="150" sortable>
              <template #default="{ row }">
                <el-tag :type="statusTagType(row.status)" effect="light" class="text-capitalize">
                  {{ row.status.replace('_', ' ') }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="created_at" label="Created" width="150" sortable>
              <template #default="{ row }">
                {{ formatDate(row.created_at) }}
              </template>
            </el-table-column>
            <el-table-column label="Actions" width="160" fixed="right" align="center">
              <template #default="{ row }">
                <div class="d-flex justify-content-center gap-2">
                  <el-button size="small" type="primary" plain circle @click="navigateToDetails(row.id)">
                    <el-icon>
                      <View />
                    </el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- Pagination and Entry Count -->
        <div class="d-flex flex-column justify-content-between align-items-center px-3 py-3 border-top gap-4">
          <div class="text-muted small">Showing {{ packages.length }} of {{ total }} entries</div>
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            :pager-count="5"
            layout="prev, pager, next"
            background
            class="flex"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
