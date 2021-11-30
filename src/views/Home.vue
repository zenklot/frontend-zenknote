<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <div class="row mt-4 justify-content-center">
        <div class="col col-md-8">
          <hr />
          <div class="wrapper">
            <div class="typing-demo">
              Welcome.. to <strong>zenknote</strong> a notes app for
              everyone.<br />
            </div>
          </div>

          <hr />
        </div>
      </div>

      <div class="row mt-3 justify-content-center">
        <div class="col col-md-6">
          <div class="page shadow">
            <label class="field field_v1">
              <input
                class="field__input"
                placeholder="e.g. My notes..."
                v-model="title"
              />
              <span class="field__label-wrap">
                <span class="field__label">Title</span>
              </span>
            </label>

            <textarea
              class="textarea mb-2"
              type="text"
              placeholder="Your note..."
              v-model="note"
            ></textarea>
            <label class="field field_v3">
              <input
                class="field__input"
                placeholder="e.g. first,new,note"
                v-model="tagProces"
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
                  class="float-right btn btn-success mt-4"
                  @click="saveNote"
                >
                  Save Note
                  <b-icon-cloud-arrow-up-fill></b-icon-cloud-arrow-up-fill>
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
import { required } from "vuelidate/lib/validators";
export default {
  name: "Home",
  components: {
    Navbar,
  },

  data() {
    return {
      title: "",
      note: "",
      tag: "",
      tags: [],
      tagProces: "",
    };
  },
  validations: {
    title: {
      required,
    },
  },
  methods: {
    tagArr() {
      let filter = this.tagProces.replace(/\s+/g, "").replace("#", "").trim();
      this.tags = filter.split(",");
      this.tag = this.tags.join(",");
      this.tags = this.tags.map((tag) => {
        return tag ? "#" + tag : "";
      });
    },
    saveNote() {
      if (this.$v.title.required) {
        localStorage.title = this.title;
        localStorage.note = this.note;
        localStorage.tags = this.tag;
        this.$swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          icon: "error",
          title: "Login Required!",
        });
        this.$router.push({ path: "/login" }).catch(() => {});
      } else {
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
  },
};
</script>
