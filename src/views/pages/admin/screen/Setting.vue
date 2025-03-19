

<template>
<div>
  <h1>Setting</h1>
  <div class="d-flex gap-3">
    <div class="profile">
      <div>
        <el-avatar :size="200" src="https://empty" @error="errorHandler">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
      </div>
      <div class="username">@username seavyong</div>
    </div>
    <div class="profile-info">
      <h1>Information</h1>
      <el-form :model="form" label-width="auto">
        <el-form-item label="Name">
          <el-input v-model="form.name" disabled/>
        </el-form-item>
      </el-form>
      <el-form :model="form" label-width="auto" >
        <el-form-item label="Email">
          <el-input v-model="form.name" disabled/>
        </el-form-item>
      </el-form>
      <el-form :model="form" label-width="auto" >
        <el-form-item label="Phone">
          <el-input v-model="form.name"  disabled/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
  <div class="d-flex gap-3">
    <div class="currency">
      <h1>Currency</h1>
      <el-form :model="form" label-width="100" >
        <el-form-item label="From Dollar">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <el-form :model="form" >
        <el-form-item label="to Riel" label-width="100">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <el-button type="warning">Save</el-button>
    </div>
    <div class="delivery-fee">
      <h1>Delivery Fee</h1>
      <el-form :model="form"  >
        <el-form-item label="Fee">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <el-button type="warning">Save</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}

</script>
<style scoped>
.profile{
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: #888888 1px 1px 10px;
  margin-top: 20px;
  border-radius: 20px;
}
.username{
  font-size: 20px;
  margin-top: 10px;
}
h1{
  font-size: 30px;
  margin-bottom: 10px;
}
.profile-info{
  width: 600px;
  height: 350px;
  box-shadow: #888888 1px 1px 10px;
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px;
}
.currency{
  width: 350px;
  height: 350px;
  box-shadow: #888888 1px 1px 10px;
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px;
}
.delivery-fee{
  width: 350px;
  height: 350px;
  box-shadow: #888888 1px 1px 10px;
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px;
}
</style>
