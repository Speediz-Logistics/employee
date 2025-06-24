<script setup>
import { useInvoiceVendorStore } from '@/store/invoice-vendor.js';
import { ref, onMounted } from 'vue';
import { useDebounce } from '@/composables/useDebounce.js';

const tableData = ref([]);
const searchQuery = ref('');
const total = ref(0);
const currentPage = ref(1);
const date = ref([]);
const store = useInvoiceVendorStore();
const { debounce } = useDebounce();

// Dialog related refs
const detailDialogVisible = ref(false);
const selectedInvoice = ref(null);

const fetchData = async () => {
  const params = {
    search: searchQuery.value || '',
    date: date.value || '',
    page: currentPage.value,
  };
  const response = await store.all(params);
  tableData.value = response.data?.data;
  total.value = response?.data?.pagination?.total || 0;
  currentPage.value = response?.data?.pagination?.current_page || 1;
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchData();
};

// Updated handleView to use dialog
const handleView = (invoice) => {
  selectedInvoice.value = invoice;
  detailDialogVisible.value = true;
};

const handleSearch = debounce(async (query) => {
  searchQuery.value = query;
  fetchData();
}, 300);

const handleDateChange = (selectDate) => {
  date.value = selectDate;
  fetchData();
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="m-4">
    <h1 class="fw-bold">Vendor Invoice</h1>
    <div class="d-flex justify-content-between mt-2">
      <!--Search-->
      <div class="d-flex gap-3">
        <el-input
          v-model="searchQuery"
          clearable
          class="inline-input w-75"
          placeholder="Please enter vendor name..."
          @input="handleSearch"
        />
      </div>
      <div>
        <el-date-picker
          v-model="date"
          type="datetime"
          format="YYYY-MM-DD"
          placeholder="Pick a date"
          @change="handleDateChange"
        />
      </div>
    </div>
    <div>
      <el-table :data="tableData" class="vendor-table">
        <el-table-column prop="id" label="ID Invoice" width="180" />
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="vendor_name" label="Vendor name" width="380" />
        <el-table-column prop="amount" label="Count" width="180" />
        <el-table-column prop="total_invoice" label="Total Invoice" width="180" />
        <el-table-column prop="payment_status" label="Payment status" width="180">
          <template #default="{ row }">
            <el-tag :type="row.payment_status === 'paid' ? 'success' : 'danger'">
              {{ row.payment_status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Action">
          <template #default="scope">
            <el-button type="warning" @click="handleView(scope.row)">View</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="total" @change="handlePageChange" />
    </div>

    <!-- Invoice Detail Dialog -->
    <el-dialog
      v-model="detailDialogVisible"
      :title="`Invoice #${selectedInvoice?.invoice_number || ''}`"
      width="80%"
      top="5vh"
    >
      <div v-if="selectedInvoice" class="invoice-detail">
        <div class="invoice-header">
          <div class="invoice-meta">
            <div><strong>Date:</strong> {{ selectedInvoice.date }}</div>
            <div><strong>Vendor:</strong> {{ selectedInvoice.vendor_name }}</div>
            <div>
              <strong>Status:</strong>
              <el-tag :type="selectedInvoice.payment_status === 'paid' ? 'success' : 'danger'">
                {{ selectedInvoice.payment_status }}
              </el-tag>
            </div>
            <div><strong>Contact:</strong> {{ selectedInvoice.phone }}</div>
          </div>
        </div>

        <el-divider />

        <div class="invoice-summary">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="Total Packages">{{ selectedInvoice.amount }}</el-descriptions-item>
            <el-descriptions-item label="Total Amount">${{ selectedInvoice.total_invoice }}</el-descriptions-item>
            <el-descriptions-item label="Description">{{ selectedInvoice.description }}</el-descriptions-item>
            <el-descriptions-item label="Package Status">
              <div v-for="(count, status) in selectedInvoice.package_status" :key="status">
                <span v-if="status !== 'total'">{{ status }}: {{ count }}</span>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <el-divider />

        <h3>Package Details</h3>
        <el-table :data="selectedInvoice.invoices" border style="width: 100%">
          <el-table-column prop="shipment_code" label="Shipment Code" width="180" />
          <el-table-column prop="receiver_contact" label="Receiver Contact" width="180" />
          <el-table-column prop="location" label="Location" />
          <el-table-column prop="package_date" label="Date" width="120" />
          <el-table-column label="Status" width="120">
            <template #default="{ row }">
              <el-tag
                :type="
                  row.package_status === 'completed'
                    ? 'success'
                    : row.package_status === 'cancelled'
                      ? 'danger'
                      : 'warning'
                "
              >
                {{ row.package_status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="package_price" label="Price" width="120">
            <template #default="{ row }">${{ row.package_price }}</template>
          </el-table-column>
          <el-table-column prop="delivery_fee" label="Delivery Fee" width="120">
            <template #default="{ row }">${{ row.delivery_fee }}</template>
          </el-table-column>
          <el-table-column label="Total" width="120">
            <template #default="{ row }">${{ (row.package_price + row.delivery_fee).toFixed(2) }}</template>
          </el-table-column>
        </el-table>

        <div class="invoice-total">
          <h4>Grand Total: ${{ selectedInvoice.total_invoice }}</h4>
        </div>
      </div>

      <template #footer>
        <el-button type="primary" @click="detailDialogVisible = false">Close</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.vendor-table {
  font-size: 20px;
  margin-top: 20px;
  border: #ffde59;
  border-radius: 10px;
}
h1 {
  font-size: 30px;
}

.invoice-detail {
  padding: 10px;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.invoice-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.invoice-summary {
  margin: 20px 0;
}

.invoice-total {
  text-align: right;
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

h3 {
  margin: 20px 0 15px;
}

.el-tag {
  text-transform: capitalize;
}
</style>
