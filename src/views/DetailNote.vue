<template>
  <div class="detail">
    <Loading v-if="loading" />
    <Navbar :userData="users" />
    <div class="container">
      <div class="row mt-5">
        <div class="col">
          <h2>Detail <strong>Notes</strong></h2>
          <hr />
        </div>
      </div>
      <div class="row mt-2 justify-content-center">
        <div class="col col-md-6">
          <div class="page shadow">
            <h1>{{ notes.title }}</h1>
            <p>{{ notes.note }}</p>
            <div class="row">
              <div class="col">
                <b-badge
                  variant="secondary"
                  class="mr-1"
                   v-for="(tg, index) in tags"
                  :key="index"
                  >{{ tg ? "#" + tg : null }}</b-badge
                >
              </div>
            </div>
            <div class="row">
              <div class="col">
                <b-link to="/" class="float-right btn btn-secondary mt-4 ml-2">
                  Back
                  <b-icon-backspace-fill></b-icon-backspace-fill>
                </b-link>
                <b-link
                  :to="'/edit/' + notes.id"
                  class="float-right btn btn-warning mt-4 ml-2"
                >
                  Edit
                  <b-icon-pencil-square></b-icon-pencil-square>
                </b-link>
                <button
                  class="float-right btn btn-danger mt-4 ml-2"
                  @click="deleteNote(notes.id)"
                >
                  Delete
                  <b-icon-trash-fill></b-icon-trash-fill>
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
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";
import axios from "axios";
export default {
  name: "DetailNote",
  components: {
    Navbar,
    Loading,
  },

  data() {
    return {
      loading: false,
      users: {},
      notes: {},
      tags: {},
    };
  },
  methods: {
    deleteNote(id) {
      this.$swal({
        title: "Do you want to delete this : " + this.notes.title + " ?",
        icon: "question",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          axios
            .delete("https://be-zenk-note.herokuapp.com/api/note/" + id, {
              headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then(() => {
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: "Delete note success",
              });
              this.$router.push({ path: "/" }).catch(()=>{});
            })
            .catch(() => {
               this.$swal({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
                icon: "error",
                title: "Unknown Error !",
              });
              this.$router.push({ path: "/" }).catch(()=>{});
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
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
        this.$router.push({ path: "/refresh" }).catch(()=>{});
      })
      .finally(() => {
        this.loading = false;
      });

    this.loading = true;
    axios
      .get(
        "https://be-zenk-note.herokuapp.com/api/note/" + this.$route.params.id,
        {
          headers: { Authorization: "Bearer " + localStorage.token },
        }
      )
      .then((res) => {
        this.notes = res.data.data;
        this.tags = res.data.data.tags.split(",")
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
        this.$router.push({ path: "/" }).catch(()=>{});
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>
