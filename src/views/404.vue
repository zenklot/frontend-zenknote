<template>
  <div class="container">
  <Loading v-if="loading" />
  <Navbar :userData="users" />
    <div class="row mt-5">
      <div class="col mt-5">
        <h1 class="text-center"><strong>404</strong> Page Not Found</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";
import axios from "axios";
export default {
name:"NotFound",
data(){
  return {
    users:"",
    loading:false,
  }
},
components:{
  Navbar,
  Loading
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
      .catch(() => {
        localStorage.removeItem("token");
        this.loading = false;
      })
      .finally(() => {
        this.loading = false;
      });
}
}
</script>

<style>

</style>