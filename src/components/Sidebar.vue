<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar">
    <!-- Logo -->
    <div class="logo mb-4 text-center">
      <img src="@/assets/images/speediz-logo.png" alt="logo project" class="img-fluid" />
    </div>

    <!-- Navigation Links -->
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link
          to="/admin/dashboard"
          class="nav-link"
          :class="{ active: $route.path === '/admin/dashboard' }">
          <font-awesome-icon :icon="['far', 'clock']" />&nbsp;&nbsp;
          Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/vendor-list"
          class="nav-link"
          :class="{ active: $route.path === '/admin/vendor-list' }">
          <font-awesome-icon :icon="['fas', 'list-check']" />&nbsp;&nbsp;
          Vendor List
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/invoice"
          class="nav-link"
          :class="{ active: $route.path === '/admin/invoice' }">
          <font-awesome-icon :icon="['fas', 'file-invoice-dollar']" />&nbsp;&nbsp;
          Invoice
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/tracking"
          class="nav-link"
          :class="{ active: $route.path === '/admin/tracking' }">
          <font-awesome-icon :icon="['fas', 'map-location-dot']" /> &nbsp;&nbsp;
          Tracking
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/message"
          class="nav-link"
          :class="{ active: $route.path === '/admin/message' }">
          <font-awesome-icon :icon="['fas', 'message']" />&nbsp;&nbsp;
          Message
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/user-management"
          class="nav-link"
          :class="{ active: $route.path === '/admin/user-management' }">
          <font-awesome-icon :icon="['fas', 'users']" />&nbsp;&nbsp;
          User Management
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/setting"
          class="nav-link"
          :class="{ active: $route.path === '/admin/setting' }">
          <font-awesome-icon :icon="['fas', 'gear']" /> &nbsp;&nbsp;
          Setting
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/logout"
          class="nav-link"
          :class="{ active: $route.path === '/admin/logout' }">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />&nbsp;&nbsp;
          Logout
        </router-link>
      </li>
    </ul>
    <!-- Profile Section -->
    <div class="profile mt-auto d-flex justify-content-between">
      <div class="profile-picture mb-2 ">
        <img src="@/assets/logo.svg" alt="Profile" class="rounded-circle" />
      </div>
      <div class="profile-info">
        laseavyong@gmail.com
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  padding: 20px;
  background-color: #f8f9fa; /* Light gray background for the sidebar */
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  text-decoration: none;
  color: #000;
}

.nav-link:hover {
  background-color: #FFDE59;
  border-radius: 10px;
}

.nav-item.active .nav-link {
  background-color: #FFDE59; /* Yellow background for active link */
  border-radius: 10px;
  color: #fff;
}

.nav-link i {
  margin-right: 10px;
}

.profile {
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.profile-picture img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border: 1px solid #FFDE59;
}

.profile-info {
  margin-top: 10px;
}

.profile-info p {
  margin: 0;
  font-weight: bold;
}

.profile-info small {
  font-size: 12px;
  color: #888;
}
.nav-link.active {
  border-radius: 10px;
  background-color: #FFDE59 !important; /* Override any other styles */
  color: #fff !important;
}
</style>
