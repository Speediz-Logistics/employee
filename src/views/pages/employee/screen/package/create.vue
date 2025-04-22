<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { usePackageStore } from '@/store/package.js';

const route = useRoute();
const packageId = route.params.id;

const loading = ref(true);
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

// Search functions for each entity
const searchVendor = async (query) => {
  if (!query) return;
  try {
    const response = await packageStore.searchVendor(query);
    packageDetail.value.sender = {
      ...packageDetail.value.sender,
      ...response.data,
    };
  } catch (error) {
    console.error('Error searching vendor:', error);
    ElMessage.error('Failed to search vendor');
  }
};

const searchReceiver = async (query) => {
  if (!query) return;
  try {
    const response = await packageStore.searchReceiver(query);
    packageDetail.value.receiver = {
      ...packageDetail.value.receiver,
      ...response.data,
    };
  } catch (error) {
    console.error('Error searching receiver:', error);
    ElMessage.error('Failed to search receiver');
  }
};

const searchBranch = async (query) => {
  if (!query) return;
  try {
    const response = await packageStore.searchBranch(query);
    packageDetail.value.branch = {
      ...packageDetail.value.branch,
      ...response.data,
    };
  } catch (error) {
    console.error('Error searching branch:', error);
    ElMessage.error('Failed to search branch');
  }
};

const searchPackageType = async (query) => {
  if (!query) return;
  try {
    const response = await packageStore.searchPackageType(query);
    packageDetail.value.package_type = {
      ...packageDetail.value.package_type,
      ...response.data,
    };
  } catch (error) {
    console.error('Error searching package type:', error);
    ElMessage.error('Failed to search package type');
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

const searchDriver = async (query) => {
  if (!query) return;
  try {
    const response = await packageStore.searchDriver(query);
    packageDetail.value.driver = {
      ...packageDetail.value.driver,
      ...response.data,
    };
  } catch (error) {
    console.error('Error searching driver:', error);
    ElMessage.error('Failed to search driver');
  }
};

//submit update update
const submitUpdate = async () => {
  try {
    const params = {
      sender_name: packageDetail.value.sender.name,
      sender_phone: packageDetail.value.sender.phone,

      receiver_name: packageDetail.value.receiver.name,
      receiver_phone: packageDetail.value.receiver.phone,

      branch_name: packageDetail.value.branch.name,
      branch_phone: packageDetail.value.branch.phone,
      branch_address: packageDetail.value.branch.address,

      package_type_name: packageDetail.value.package_type.name,
      package_type_description: packageDetail.value.package_type.description,

      package_price: packageDetail.value.package.price,
      package_price_khr: packageDetail.value.package.price_khr,

      delivery_fee_price: packageDetail.value.delivery_fee.price,

      driver_name: packageDetail.value.driver.name,
      driver_phone: packageDetail.value.driver.phone,
      driver_telegram_contact: packageDetail.value.driver.telegram_contact,
    };
    await packageStore.update(packageId, params);
    ElMessage.success('Package updated successfully');
  } catch (error) {
    console.error('Error updating package:', error);
    ElMessage.error('Failed to update package');
  }
};
</script>

<template>
  <div class="package-detail-container">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <!-- Skeleton template remains the same -->
      </template>

      <template #default>
        <div class="detail-card">
          <div class="card-header">
            <h3 class="card-title">Package Details</h3>
            <div class="status-badge">
              <el-tag type="success" size="large">{{ packageDetail.package.status }}</el-tag>
            </div>
          </div>

          <div class="card-body">
            <div class="detail-grid">
              <!-- Sender/Receiver Information -->
              <div class="detail-section">
                <h5 class="section-title">
                  <i class="el-icon-user"></i>
                  Sender/Receiver Information
                </h5>
                <div class="input-group">
                  <label>Sender Phone</label>
                  <el-input
                    v-model="packageDetail.sender.phone"
                    placeholder="Search by sender phone"
                    clearable
                    size="large"
                    @keyup.enter="searchVendor(packageDetail.sender.phone)"
                  />
                </div>
                <div class="input-group">
                  <label>Sender name</label>
                  <el-input
                    v-model="packageDetail.sender.name"
                    placeholder="Sender name"
                    clearable
                    size="large"
                    disabled
                  />
                </div>

                <div class="input-group">
                  <label>Receiver Phone</label>
                  <el-input
                    v-model="packageDetail.receiver.phone"
                    placeholder="Search by receiver phone"
                    clearable
                    size="large"
                    @keyup.enter="searchReceiver(packageDetail.receiver.phone)"
                  />
                </div>
                <div class="input-group">
                  <label>Receiver name</label>
                  <el-input v-model="packageDetail.receiver.name" placeholder="Receiver name" clearable size="large" />
                </div>

                <div class="input-group">
                  <label>Branch Phone</label>
                  <el-input
                    v-model="packageDetail.branch.phone"
                    placeholder="Search by branch phone"
                    clearable
                    size="large"
                    @keyup.enter="searchBranch(packageDetail.branch.phone)"
                  />
                </div>
                <div class="input-group">
                  <label>Branch Name</label>
                  <el-input v-model="packageDetail.branch.name" placeholder="Branch" clearable size="large" disabled />
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
              </div>

              <!-- Package Details -->
              <div class="detail-section">
                <h5 class="section-title">
                  <i class="el-icon-box"></i>
                  Package Details
                </h5>
                <div class="input-group">
                  <label>Package type</label>
                  <el-input
                    v-model="packageDetail.package_type.name"
                    placeholder="Search package type"
                    clearable
                    size="large"
                    @keyup.enter="searchPackageType(packageDetail.package_type.name)"
                  />
                </div>
                <div class="input-group">
                  <label>Description</label>
                  <el-input
                    v-model="packageDetail.package_type.description"
                    placeholder="Description"
                    clearable
                    size="large"
                    disabled
                  />
                </div>
                <div class="input-group">
                  <label>Package price ($)</label>
                  <el-input
                    v-model="packageDetail.package.price"
                    placeholder="Package price"
                    clearable
                    prefix="$"
                    size="large"
                    @keyup.enter="searchDeliveryFee(packageDetail.package.price)"
                  />
                </div>
                <div class="input-group">
                  <label>Package price (Riel)</label>
                  <el-input
                    v-model="packageDetail.package.price_khr"
                    placeholder="Package price in KHR"
                    clearable
                    size="large"
                    disabled
                  />
                </div>
              </div>

              <!-- Delivery Information -->
              <div class="detail-section">
                <h5 class="section-title">
                  <i class="el-icon-money"></i>
                  Delivery Information
                </h5>
                <div class="input-group">
                  <label>Fee ($)</label>
                  <el-input
                    v-model="packageDetail.delivery_fee.price"
                    placeholder="Search delivery fee"
                    clearable
                    prefix="$"
                    size="large"
                    disabled
                  />
                </div>
                <div class="input-group">
                  <label>Delivery contact</label>
                  <el-input
                    v-model="packageDetail.driver.phone"
                    placeholder="Search by driver phone"
                    clearable
                    size="large"
                    @keyup.enter="searchDriver(packageDetail.driver.phone)"
                  />
                </div>
                <div class="input-group">
                  <label>Delivery Name</label>
                  <el-input
                    v-model="packageDetail.driver.name"
                    placeholder="Delivery contact"
                    clearable
                    size="large"
                    disabled
                  />
                </div>
                <div class="input-group">
                  <label>Delivery telegram</label>
                  <el-input
                    v-model="packageDetail.driver.telegram_contact"
                    placeholder="Delivery telegram"
                    clearable
                    size="large"
                    disabled
                  />
                </div>
                <div class="input-group">
                  <label>Note</label>
                  <el-input
                    v-model="packageDetail.package.note"
                    placeholder="Note"
                    clearable
                    type="textarea"
                    size="large"
                  />
                </div>
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
</style>
