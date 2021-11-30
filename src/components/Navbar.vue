<template>
  <div class="container">
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand href="#"><strong>ZENK-NOTE</strong></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <li class="nav-item" v-if="!userData">
            <router-link class="btn btn-warning" to="/login">
              Login
              <b-icon-arrow-right-circle-fill></b-icon-arrow-right-circle-fill>
            </router-link>
          </li>
          <b-nav-item-dropdown right v-else>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{userData.name}}</em>
            </template>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="/logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <!-- </nav> -->
</template>

<script>

export default {
  name: "Navbar",
  data() {
    return {
      user:{}
    };
  },
  props: ["userData"],
};
</script>

<style>
</style>