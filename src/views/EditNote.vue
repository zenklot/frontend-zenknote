<template>
  <div class="Edit">
    <Loading v-if="loading" />
    <Navbar :userData="users" />
    <div class="container">
      <div class="row mt-5">
        <div class="col">
          <h2>Edit <strong>Note</strong></h2>
          <hr />
        </div>
      </div>
      <div class="row mt-2 justify-content-center">
        <div class="col col-md-6">
          <div class="page shadow">
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="e.g. My notes..."
                v-model="notes.title"
              />
              <span class="field__label-wrap">
                <span class="field__label">Title</span>
              </span>
            </label>

            <textarea
              class="textarea mb-2"
              type="text"
              placeholder="Your note..."
              v-model="notes.note"
            ></textarea>
            <label class="field field_v3">
              <input
                class="field__input"
                placeholder="e.g. first,new,note"
                v-model="notes.tags"
                @keyup="tagArr"
              />
              <span class="field__label-wrap">
                <span class="field__label">Tags</span>
              </span>
            </label>
            <div class="row">
              <div class="col">
                <b-badge
                  variant="secondary"
                  class="mr-1"
                   v-for="(tg, index) in tags"
                  :key="index"
                  >{{ tg ? tg : null }}</b-badge
                >
              </div>
            </div>
            <div class="row">
              <div class="col">
                <button
                  class="float-right btn btn-success mt-4 ml-2"
                  @click="updateNote(notes.id)"
                >
                  Update Note
                  <b-icon-cloud-arrow-up-fill></b-icon-cloud-arrow-up-fill>
                </button>
                <button
                  @click="cancelEdit"
                  class="float-right btn btn-danger mt-4"
                >
                  Cancel
                  <b-icon-backspace-fill></b-icon-backspace-fill>
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
import { required } from "vuelidate/lib/validators";
export default {
  name: "EditNote",
  components: {
    Navbar,
    Loading,
  },

  data() {
    return {
      users: {},
      notes: {},
      tags: [],
    };
  },
  validations: {
    notes: {
      title: {
        required,
      },
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
        localStorage.removeItem("refresh_token");
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
        this.tags = res.data.data.tags.split(",");
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

  methods: {
    cancelEdit() {
      this.$swal({
        title: "Do you want discard update ?",
        icon: "question",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Don't Update",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ path: "/" }).catch(() =>{});
        }
      });
    },
    updateNote(id) {
      if (this.$v.notes.title.required) {
        this.$swal({
        title: "Do you want update this note ?",
        icon: "question",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Update",
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          axios
            .put(
              "https://be-zenk-note.herokuapp.com/api/note/" + id,
              this.notes,
              {
                headers: { Authorization: "Bearer " + localStorage.token },
              }
            )
            .then(() => {
              this.$router.push({ path: "/" }).catch(() =>{});
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: "Success update note",
              });
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
            });
        }
      });
      }else{
         this.$swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          icon: "error",
          title: "Title Required!",
        });
      }
      
    },
    tagArr() {

 let filter = this.notes.tags.replace(/\s+/g, "").replace("#", "").trim();
      this.tags = filter.split(",");
      this.notes.tag = this.tags.join(",");
      this.tags = this.tags.map((tag) => {
        return tag ? "#" + tag : "";
      });

    },
  },
  computed: {},
};
</script>
