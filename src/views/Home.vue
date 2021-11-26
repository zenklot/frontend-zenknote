<template>
  <div class="home">
    <Navbar />
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
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
              <input class="field__input" placeholder="e.g. My notes..." v-model="title"/>
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
              <input class="field__input" placeholder="e.g. first,new,note" v-model="tagProces" @keyup="tagArr"/>
              <span class="field__label-wrap">
                <span class="field__label">Tags</span>
              </span>
            </label>
            <div class="row">
              <div class="col">
                <b-badge variant="secondary" class="mr-1" v-for="tg in tags" :key="tg">{{ tg == "#" ? "" : tg }}</b-badge>
                
              </div>
            </div>
            <div class="row">
              <div class="col">
                <button class="float-right btn btn-success mt-4">
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

export default {
  name: "Home",
  components: {
    Navbar,
  },

  data(){
    return{
      title:"",
      note:"",
      tag:"",
      tags:[],
      tagProces:""
    }
  },
  methods:{
tagArr(){
  let filter = this.tagProces.replace(/\s+/g,"").replace("#","").trim()
  this.tags = filter.split(",");
  this.tags = this.tags.map(tag => "#"+tag)
  return this.tag = this.tags.join(",")
  }
  },
  computed:{
    
  }


};
</script>
