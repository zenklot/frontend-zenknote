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
            <li class="nav-item">
              <router-link class="btn btn-warning" to="/login">
              Login
              <b-icon-arrow-right-circle-fill></b-icon-arrow-right-circle-fill>
              </router-link>
            </li>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  <!-- </nav> -->
</template>

<script>
// import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
    //   jumlah_pesanans: [],
    };
  },
//   props: ["updateKeranjang"],
  methods: {
    // setJumlah(data) {
    //   this.jumlah_pesanans = data;
    // },
  },
  mounted() {
    // axios
    //   .get("http://localhost:3000/keranjangs/")
    //   .then((response) => {
    //     // handle success
    //     this.setJumlah(response.data);
    //   })
    //   .catch((error) => {
    //     // handle error
    //     console.log(error);
    //   });
  },
};
</script>

<style>
</style>