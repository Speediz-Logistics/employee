<script setup>
import { ref } from 'vue';

const props = defineProps({
  packageData: {
    type: Object,
    required: true,
  },
});

const dialogVisible = ref(false);

const open = () => {
  dialogVisible.value = true;
};

defineExpose({
  open,
});
</script>

<template>
  <el-dialog v-model="dialogVisible" title="Package Invoice Details" width="70%" top="5vh" destroy-on-close>
    <el-descriptions :column="2" border>
      <!-- Basic Information -->
      <el-descriptions-item label="Package Number">
        {{ packageData.package_number }}
      </el-descriptions-item>
      <el-descriptions-item label="Status">
        <el-tag
          :type="
            packageData.package_status === 'completed'
              ? 'success'
              : packageData.package_status === 'cancelled'
                ? 'danger'
                : packageData.package_status === 'in_transit'
                  ? 'warning'
                  : 'info'
          "
        >
          {{ packageData.package_status }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Package Date">
        {{ packageData.package_date }}
      </el-descriptions-item>
      <el-descriptions-item label="Customer Phone">
        {{ packageData.customer_phone }}
      </el-descriptions-item>

      <!-- Personal Information -->
      <el-descriptions-item label="Sender Name" :span="2">
        {{ packageData.personal?.sender_name }}
      </el-descriptions-item>
      <el-descriptions-item label="Sender Phone">
        {{ packageData.personal?.sender_phone_number }}
      </el-descriptions-item>
      <el-descriptions-item label="Receiver Phone">
        {{ packageData.personal?.receiver_phone }}
      </el-descriptions-item>
      <el-descriptions-item label="Branch">
        {{ packageData.personal?.branch || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="Destination" :span="2">
        {{ packageData.personal?.destination }}
      </el-descriptions-item>

      <!-- Package Information -->
      <el-descriptions-item label="Package Type">
        {{ packageData.package_info?.package_type || 'N/A' }}
      </el-descriptions-item>
      <el-descriptions-item label="Package Name">
        {{ packageData.package_info?.package_name }}
      </el-descriptions-item>
      <el-descriptions-item label="Package Price (USD)">
        ${{ packageData.package_info?.package_price }}
      </el-descriptions-item>
      <el-descriptions-item label="Package Price (Riel)">
        ៛{{ packageData.package_info?.package_price_riel?.toLocaleString() }}
      </el-descriptions-item>

      <!-- Delivery Information -->
      <el-descriptions-item label="Delivery Fee"> ${{ packageData.delivery_fee?.delivery_fee }} </el-descriptions-item>
      <el-descriptions-item label="Delivery Contact">
        {{ packageData.delivery_fee?.delivery_contact }}
      </el-descriptions-item>
      <el-descriptions-item label="Delivery Telegram">
        <a :href="packageData.delivery_fee?.delivery_telegram" target="_blank">Telegram Link</a>
      </el-descriptions-item>
      <el-descriptions-item label="Note">
        {{ packageData.delivery_fee?.note }}
      </el-descriptions-item>
    </el-descriptions>

    <template #footer>
      <el-button type="primary" @click="dialogVisible = false">Close</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-descriptions {
  margin: 20px 0;
}

.el-descriptions-item__label {
  font-weight: bold;
  width: 180px;
}

.el-tag {
  text-transform: capitalize;
}

a {
  color: var(--el-color-primary);
  text-decoration: none;
}
</style>
