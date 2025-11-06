<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { usePackageStore } from '@/store/package.js';
import { ArrowLeft, Search } from '@element-plus/icons-vue';
import Multiselect from 'vue-multiselect';

const router = useRouter();
const route = useRoute();
const packageId = route.params.id;

const loading = ref(false);
const packageDetail = ref({
  sender: {},
  receiver: {},
  branch: {},
  package_type: {},
  package: {},
  delivery_fee: {},
  driver: {},
});
const packageStore = usePackageStore();

const options = ref({
  vendor: [],
  branch: [],
  package_type: [],
  driver: [],
});
const searchOption = async (key, search) => {
  try {
    loading.value = true;
    const query = {
      key: key,
      search: search || '',
    };
    const response = await packageStore.searchOptions(query);
    options.value[key] = response.data;

    // If we have a specific item selected and it exists in the new options
    if (packageDetail.value[key]?.id) {
      const selectedItem = options.value[key].find((item) => item.id === packageDetail.value[key].id);
      if (selectedItem) {
        // Update the local data with the fresh information
        packageDetail.value[key] = {
          ...packageDetail.value[key],
          ...selectedItem,
          phone: selectedItem.contact_number || selectedItem.phone,
          name: selectedItem.name || `${selectedItem.first_name} ${selectedItem.last_name}`,
        };
      }
    }
  } catch (error) {
    console.error('Error fetching options:', error);
    ElMessage.error('Failed to load options');
  } finally {
    loading.value = false;
  }
};

// Search functions for each entity
const searchVendor = async (query) => {
  await searchOption('vendor', query);
};

const searchBranch = async (query) => {
  await searchOption('branch', query);
};

const searchDriver = async (query) => {
  await searchOption('driver', query);
};

const searchPackageType = async (query) => {
  await searchOption('package_type', query);
};

// Selection handlers
const onVendorSelect = (selected) => {
  packageDetail.value.sender = {
    id: selected.id,
    name: selected.name || `${selected.first_name} ${selected.last_name}`,
    phone: selected.contact_number || selected.phone,
  };
  // Optionally fetch additional details if needed
  fetchVendorDetails(selected.id);
};

const onBranchSelect = (selected) => {
  packageDetail.value.branch = {
    id: selected.id,
    name: selected.name,
    phone: selected.phone,
    address: selected.address,
  };
  fetchBranchDetails(selected.id);
};

const onDriverSelect = (selected) => {
  packageDetail.value.driver = {
    id: selected.id,
    name: selected.name || `${selected.first_name} ${selected.last_name}`,
    phone: selected.phone,
    telegram_contact: selected.telegram_contact,
  };
  fetchDriverDetails(selected.id);
};

const onPackageTypeSelect = (selected) => {
  packageDetail.value.package_type = {
    id: selected.id,
    name: selected.name,
    description: selected.description,
  };
  fetchPackageTypeDetails(selected.id);
};

// Detailed fetch functions
const fetchVendorDetails = async (id) => {
  try {
    const response = await packageStore.searchVendor(id);
    packageDetail.value.sender = {
      ...packageDetail.value.sender,
      ...response.data,
      phone: response.data.contact_number || packageDetail.value.sender.phone,
    };
  } catch (error) {
    console.error('Error fetching vendor details:', error);
  }
};

const fetchBranchDetails = async (query) => {
  try {
    const response = await packageStore.searchBranch(query);
    packageDetail.value.branch = {
      ...packageDetail.value.branch,
      ...response.data,
      phone: response.data.contact_number || packageDetail.value.branch.phone,
    };
  } catch (error) {
    console.error('Error fetching branch details:', error);
  }
};

const searchDeliveryFee = async (query) => {
  if (!query) return;
  try {
    const response = await packageStore.searchCurrency(query);
    packageDetail.value.package = {
      ...packageDetail.value.package,
      ...response.data,
    };
  } catch (error) {
    console.error('Error searching delivery fee:', error);
    ElMessage.error('Failed to search delivery fee');
  }
};

const fetchDriverDetails = async (id) => {
  try {
    const response = await packageStore.searchDriver(id);
    packageDetail.value.driver = {
      ...packageDetail.value.driver,
      ...response.data,
      name: `${response.data.first_name} ${response.data.last_name}`,
      phone: response.data.contact_number || packageDetail.value.driver.phone,
    };
  } catch (error) {
    console.error('Error fetching driver details:', error);
  }
};

const fetchPackageTypeDetails = async (id) => {
  try {
    const response = await packageStore.searchPackageType(id);
    packageDetail.value.package_type = {
      ...packageDetail.value.package_type,
      ...response.data,
    };
  } catch (error) {
    console.error('Error fetching package type details:', error);
  }
};

const previewImage = ref(null);
const packageImageFile = ref(null);

const handleImageUpload = (file) => {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    ElMessage.error('Only JPG/PNG images are allowed');
    return false;
  }

  // Validate file size (2MB max)
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    ElMessage.error('Image size should not exceed 2MB');
    return false;
  }

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result;
  };
  reader.readAsDataURL(file);

  // Store the file for submission
  packageImageFile.value = file;
  return true;
};

// Custom option formatters for Multiselect
const formatVendor = (option) => `${option.id} - ${option.name}`;
const formatBranch = (option) => `${option.id} - ${option.name}`;
const formatDriver = (option) => `${option.id} - ${option.name}`;
const formatPackageType = (option) => `${option.id} - ${option.name}`;

// Submit update
const submitUpdate = async () => {
  try {
    const formData = new FormData();

    // Sender information
    formData.append('sender_id', packageDetail.value.sender.id);
    formData.append('sender_name', packageDetail.value.sender.name);
    formData.append('sender_phone', packageDetail.value.sender.phone);

    // Receiver information
    formData.append('receiver_name', packageDetail.value.receiver.name);
    formData.append('receiver_phone', packageDetail.value.receiver.phone);
    formData.append('receiver_address', packageDetail.value.receiver.address);
    formData.append('receiver_lat', packageDetail.value.receiver.latitude);
    formData.append('receiver_lng', packageDetail.value.receiver.longitude);

    // Branch information
    formData.append('branch_id', packageDetail.value.branch.id);
    formData.append('branch_name', packageDetail.value.branch.name);
    formData.append('branch_phone', packageDetail.value.branch.phone);
    formData.append('branch_address', packageDetail.value.branch.address);

    // Package type information
    formData.append('package_type_id', packageDetail.value.package_type.id);
    formData.append('package_type_name', packageDetail.value.package_type.name);
    formData.append('package_type_description', packageDetail.value.package_type.description);

    // Package image (assuming this is a file)
    if (packageImageFile.value) {
      formData.append('package_image', packageImageFile.value);
    }

    // Package pricing
    formData.append('package_price', packageDetail.value.package.price);
    formData.append('package_price_khr', packageDetail.value.package.price_khr);

    // Delivery fee
    formData.append('delivery_fee_price', packageDetail.value.delivery_fee.price);

    // Driver information
    formData.append('driver_id', packageDetail.value.driver.id);
    formData.append('driver_name', packageDetail.value.driver.name);
    formData.append('driver_phone', packageDetail.value.driver.phone);
    formData.append('driver_telegram_contact', packageDetail.value.driver.telegram_contact);

    await packageStore.store(formData);

    ElMessage.success('Package updated successfully');
    // Redirect to package list or detail page
    router.push({ name: 'package' });
  } catch (error) {
    console.error('Error updating package:', error);
    ElMessage.error('Failed to update package');
  }
};

onMounted(() => {
  searchOption('vendor');
  searchOption('branch');
  searchOption('driver');
  searchOption('package_type');
});
</script>

<template>
  <div class="package-detail-container">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <!-- Skeleton template remains the same -->
      </template>

      <template #default>
        <div class="detail-card">
          <div class="header-container">
            <el-button class="ms-3" :icon="ArrowLeft" @click="$router.push({ name: 'package' })">Back</el-button>
            <div class="card-header">
              <h3 class="card-title">Package Create</h3>
            </div>
          </div>

          <div class="card-body">
            <div class="detail-grid">
              <!-- Sender/Receiver Information -->
              <div class="detail-section">
                <h5 class="section-title">
                  <i class="el-icon-user"></i>
                  Vendor/Receiver Information
                </h5>
                <el-card class="card-container">
                  <div class="mb-3">
                    <label class="form-label">Vendor</label>
                    <multiselect
                      id="vendor"
                      v-model="packageDetail.sender"
                      :options="options.vendor"
                      :custom-label="formatVendor"
                      :loading="loading"
                      placeholder="Search vendor by ID or name"
                      label="name"
                      track-by="id"
                      :append-to-body="true"
                      open-direction="bottom"
                      :searchable="true"
                      :options-limit="300"
                      :limit="3"
                      :show-no-results="false"
                      :hide-selected="true"
                      @search-change="searchVendor"
                      @select="onVendorSelect"
                    >
                      <template v-slot:singleLabel="{ option }"> {{ option.id }} - {{ option.name }} </template>
                      <template v-slot:option="{ option }">
                        <div class="option__desc z-9">
                          <span class="option__title">{{ option.id }} | </span>
                          <span class="option__small">{{ option.name }}</span>
                        </div>
                      </template>
                    </multiselect>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Vendor name</label>
                    <el-input
                      v-model="packageDetail.sender.name"
                      placeholder="Vendor name"
                      clearable
                      size="large"
                      disabled
                    />
                  </div>
                </el-card>
                <el-card class="card-container">
                  <div class="input-group mb-3">
                    <label>Receiver Phone</label>
                    <el-input
                      v-model="packageDetail.receiver.phone"
                      placeholder="Receiver phone"
                      clearable
                      size="large"
                    />
                  </div>
                  <div class="input-group mb-3">
                    <label>Receiver name</label>
                    <el-input
                      v-model="packageDetail.receiver.name"
                      placeholder="Receiver name"
                      clearable
                      size="large"
                    />
                  </div>
                  <div class="input-group mb-3">
                    <label>Receiver Address</label>
                    <el-input
                      v-model="packageDetail.receiver.address"
                      placeholder="Receiver Address"
                      clearable
                      size="large"
                    />
                  </div>
                  <div class="input-group mb-3">
                    <label>Receiver Latitude</label>
                    <el-input
                      v-model="packageDetail.receiver.latitude"
                      placeholder="Receiver Latitude"
                      clearable
                      size="large"
                    />
                  </div>
                  <div class="input-group mb-3">
                    <label>Receiver Longitude</label>
                    <el-input
                      v-model="packageDetail.receiver.longitude"
                      placeholder="Receiver Longitude"
                      clearable
                      size="large"
                    />
                  </div>
                </el-card>
              </div>

              <!-- Package Details -->
              <div class="detail-section">
                <h5 class="section-title">
                  <i class="el-icon-box"></i>
                  Package Details
                </h5>
                <el-card class="card-container">
                  <div class="input-group mb-3">
                    <label>Package type</label>
                    <multiselect
                      v-model="packageDetail.package_type"
                      :options="options.package_type"
                      :custom-label="formatPackageType"
                      :loading="loading"
                      placeholder="Search package type"
                      label="name"
                      track-by="id"
                      @search-change="searchPackageType"
                      @select="onPackageTypeSelect"
                    >
                      <template v-slot:singleLabel="{ option }"> {{ option.id }} - {{ option.name }}</template>
                      <template v-slot:option="{ option }">
                        <div class="option__desc">
                          <span class="option__title">{{ option.id }} | </span>
                          <span class="option__small">{{ option.name }}</span>
                        </div>
                      </template>
                    </multiselect>
                  </div>
                  <div class="input-group mb-3">
                    <label>Description</label>
                    <el-input
                      v-model="packageDetail.package_type.description"
                      placeholder="Description"
                      clearable
                      size="large"
                      disabled
                    />
                  </div>
                </el-card>
                <el-card class="card-container">
                  <div class="input-group mb-3">
                    <label>Package price ($)</label>
                    <el-input
                      v-model="packageDetail.package.price"
                      placeholder="Package price"
                      clearable
                      prefix="$"
                      size="large"
                      type="number"
                      @keyup.enter="searchDeliveryFee(packageDetail.package.price)"
                    />
                  </div>
                  <div class="input-group mb-3">
                    <label>Package price (Riel)</label>
                    <el-input
                      v-model="packageDetail.package.price_khr"
                      placeholder="Package price in KHR"
                      clearable
                      type="number"
                      size="large"
                      disabled
                    />
                  </div>
                </el-card>

                <el-card class="card-container">
                  <div class="mb-3">
                    <label class="form-label">Branch</label>
                    <multiselect
                      v-model="packageDetail.branch"
                      :options="options.branch"
                      :custom-label="formatBranch"
                      :loading="loading"
                      placeholder="Search branch by ID or name"
                      label="name"
                      track-by="id"
                      @search-change="searchBranch"
                      @select="onBranchSelect"
                    >
                      <template v-slot:singleLabel="{ option }"> {{ option.id }} - {{ option.name }}</template>
                      <template v-slot:option="{ option }">
                        <div class="option__desc">
                          <span class="option__title">{{ option.id }} | </span>
                          <span class="option__small">{{ option.name }}</span>
                        </div>
                      </template>
                    </multiselect>
                  </div>
                  <div class="input-group mb-3">
                    <label>Branch Phone</label>
                    <el-input
                      v-model="packageDetail.branch.phone"
                      placeholder="Branch phone"
                      clearable
                      size="large"
                      disabled
                    />
                  </div>
                  <div class="input-group mb-3">
                    <label>Branch Name</label>
                    <el-input
                      v-model="packageDetail.branch.name"
                      placeholder="Branch name"
                      clearable
                      size="large"
                      disabled
                    />
                  </div>
                  <div class="input-group">
                    <label>Destination</label>
                    <el-input
                      v-model="packageDetail.branch.address"
                      placeholder="Destination"
                      clearable
                      size="large"
                      disabled
                    />
                  </div>
                </el-card>
              </div>

              <!-- Delivery Information -->
              <div class="detail-section">
                <h5 class="section-title">
                  <i class="el-icon-money"></i>
                  Delivery Information
                </h5>
                <el-card class="card-container">
                  <div class="input-group mb-3">
                    <label>Driver</label>
                    <multiselect
                      v-model="packageDetail.driver"
                      :options="options.driver"
                      :custom-label="formatDriver"
                      :loading="loading"
                      placeholder="Search driver by ID or name"
                      label="name"
                      track-by="id"
                      @search-change="searchDriver"
                      @select="onDriverSelect"
                    >
                      <template v-slot:singleLabel="{ option }"> {{ option.id }} - {{ option.name }}</template>
                      <template v-slot:option="{ option }">
                        <div class="option__desc">
                          <span class="option__title">{{ option.id }} | </span>
                          <span class="option__small">{{ option.name }}</span>
                        </div>
                      </template>
                    </multiselect>
                  </div>
                  <div class="input-group mb-3">
                    <label>Driver Name</label>
                    <el-input
                      v-model="packageDetail.driver.name"
                      placeholder="Driver name"
                      clearable
                      size="large"
                      disabled
                    />
                  </div>
                  <div class="input-group mb-3">
                    <label>Driver Phone</label>
                    <el-input
                      v-model="packageDetail.driver.phone"
                      placeholder="Driver phone"
                      clearable
                      size="large"
                      disabled
                    />
                  </div>
                  <div class="input-group mb-3">
                    <label>Driver Telegram</label>
                    <el-input
                      v-model="packageDetail.driver.telegram_contact"
                      placeholder="Driver telegram"
                      clearable
                      size="large"
                      disabled
                    />
                  </div>
                </el-card>
                <el-card class="card-container">
                  <div class="input-group mb-3">
                    <label>Note</label>
                    <el-input
                      v-model="packageDetail.package.note"
                      placeholder="Note"
                      clearable
                      type="textarea"
                      size="large"
                    />
                  </div>
                </el-card>
                <el-card class="card-container">
                  <div class="input-group mb-3">
                    <label>Package Image</label>
                    <el-upload
                      class="upload-demo"
                      action="#"
                      :show-file-list="false"
                      :auto-upload="false"
                      accept="image/jpeg,image/png"
                      :on-change="handleImageUpload"
                      :before-upload="(file) => !handleImageUpload(file)"
                    >
                      <el-button size="small" type="primary">Select Image</el-button>
                      <template #tip>
                        <div class="el-upload__tip">Only JPG/PNG files are allowed (max 2MB)</div>
                      </template>
                    </el-upload>
                  </div>
                  <img v-if="previewImage" :src="previewImage" alt="Package Preview" class="preview-image" />
                  <div v-if="previewImage" class="mt-2">
                    <el-button
                      size="small"
                      type="danger"
                      @click="
                        previewImage = null;
                        packageImageFile = null;
                      "
                    >
                      Remove Image
                    </el-button>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <el-button type="primary" size="large" @click="submitUpdate">
            <i class="el-icon-check"></i>
            Save Changes
          </el-button>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  gap: 16px; /* Adjust the gap between items as needed */
}

.card-header {
  margin: 0; /* Remove default margins if needed */
}

.card-title {
  margin: 0; /* Remove default margins if needed */
}

.package-detail-container {
  padding: 24px;
  transition: margin-left 0.3s ease;
}

.detail-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #ebeef5;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #ebeef5;
}

.card-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #303133;
}

.status-badge {
  margin-left: 12px;
}

.card-body {
  padding: 24px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.section-title i {
  margin-right: 8px;
  font-size: 1.2rem;
  color: #409eff;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #606266;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #ebeef5;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .package-detail-container {
    margin-left: 0;
    padding: 16px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .status-badge {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .card-body {
    padding: 16px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .el-button {
    width: 100%;
  }
}

.card-container {
  margin-bottom: 20px;
  overflow: visible !important;
  position: relative;
}

.multiselect__content-wrapper {
  z-index: 9999 !important;
}
</style>
