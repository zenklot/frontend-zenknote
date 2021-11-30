<template>
  <div class="dashboard">
   <Loading v-if="loading" />
    <Navbar :userData="users" />
    <AddBtn />
    <div class="container">
      <div class="row mt-5">
        <div class="col">
          <h2>Your <strong>Notes</strong></h2>
          <hr />
        </div>
      </div>
      <div class="row mt-1">
        <div class="col">
          <h4 class="text-center text-secondary mt-2" v-if="kosong"><strong>You don't have any notes</strong></h4>
          <div class="card-columns">
            <div v-for="note in notes" :key="note.id">
              <CardNote :note="note" :tag="note.tags.split(',')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CardNote from "@/components/CardNote.vue";
import AddBtn from "@/components/AddBtn.vue";
import Loading from "@/components/Loading.vue";
import axios from "axios";
export default {
  components: {
    Navbar,
    CardNote,
    AddBtn,
    Loading 
  },
  data() {
    return {
      users: {},
      notes: {},
      kosong:false,
    };
  },
  beforeMount() {
    this.loading = true;
    axios
      .get("https://be-zenk-note.herokuapp.com/api/profile", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((res) => {
        this.users = res.data.data;
      })
      .catch((err) => {
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
        this.$router.push({ path: "/refresh" });
      })
      .finally(() => {
        this.loading = false;
      });
    this.loading = true;
    axios
      .get("https://be-zenk-note.herokuapp.com/api/notes", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((res) => {
        if(res.status == 204){
          this.kosong = true
        }else{
          this.kosong = false
          this.notes = res.data.data;
        }
      })
      .catch((err) => {
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
      })
      .finally(() => {
        this.loading = false;
      });
  },
  beforeCreate(){
    if(localStorage.title){
       this.loading = true;
       let homeNote = {
         title : localStorage.title,
         tags : localStorage.tags,
         note : localStorage.note
       }
    axios
      .post("https://be-zenk-note.herokuapp.com/api/note", homeNote, {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((res) => {
        this.notes = res.data.data;
      })
      .catch((err) => {
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
      })
      .finally(() => {
        localStorage.removeItem('title')
        localStorage.removeItem('tags')
        localStorage.removeItem('note')
        this.loading = false;
      });
    }
  }
};
</script>

<style>
</style>