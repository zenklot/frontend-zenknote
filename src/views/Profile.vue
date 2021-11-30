<template>
  <div class="detail">
    <Loading v-if="loading" />
    <Navbar :userData="users" />
    <div class="container">
      <div class="row mt-5">
        <div class="col">
          <h2>My <strong>Profile</strong></h2>
          <hr />
        </div>
      </div>
      <div class="row mt-2 justify-content-center">
        <div class="col col-md-6">
          <div class="page shadow">
            <h1>{{ users.name }}</h1>
            <p>{{ users.email }}</p>
            <p class="text-secondary">Created : {{ convert_time(users.created_at) }}
            <br>Updated :{{ convert_time(users.updated_at) }}</p>
            <div class="row">
              <div class="col">
                <b-link to="/" class="float-right btn btn-secondary mt-4 ml-2">
                  Back
                  <b-icon-backspace-fill></b-icon-backspace-fill>
                </b-link>
                <button @click="changePassword"
                  class="float-right btn btn-warning mt-4 ml-2"
                >
                  Change Password
                  <b-icon-pencil-square></b-icon-pencil-square>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";
import axios from "axios";
export default {
name:"Profile",
components:{
    Navbar,
    Loading
},
data(){
return {
    users:{},
    loading:false
    }
},
methods: {
    convert_time(isotime){
        let date = new Date(isotime);
        return date.toUTCString()
    },
    changePassword(){
        this.$swal({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 5000,
                icon: "error",
                title: "This function is not yet available :(",
              });
    },
},
beforeMount(){
    this.loading = true;
    axios
      .get("https://be-zenk-note.herokuapp.com/api/profile", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((res) => {
        this.users = res.data.data;
      })
      .catch((err) => {
        if(localStorage.token){

        
        localStorage.removeItem("token");
        let message = err.response.data.error;
        if (message) {
          message.forEach((e) => {
            this.$swal({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
                icon: "error",
                title: e,
              });
          });
        }
        }
        this.users = false;
      })
      .finally(() => {
        this.loading = false;
      });
}
}
</script>

<style>

</style>