<template>
   <div class="about">
   <Loading v-if="loading" />
    <Navbar :userData="users" />
    <AddBtn />
    <div class="container ">
      <div class="row mt-5">
        <div class="col">
          <h2>About <strong>Zenk-note</strong></h2>
          <hr />
        </div>
      </div>
      <div class="row mt-1 justify-content-center">
        <div class="col col-md-7">
          <img src="../assets/image/note.png" alt="" width="300" class="mx-auto d-block" >
          <h3 class="text-center mt-3 mb-5"><strong>Welcome to zenknote</strong></h3>
          <h5 class="text-center mb-3"><strong>Description</strong></h5>
          <p class="text-center"><strong>zenk-note</strong> is a simple notes application which is built on the basis of the <strong>C</strong>reate, <strong>R</strong>ead, <strong>U</strong>pdate, <strong>D</strong>elete process and authentication process with <strong>JWT</strong>.<br>This project is not completely finished. in the next update will be added search notes by title or tag and add the function change profile.</p>
          <h5 class="text-center mt-5 mb-3"><strong>Technology</strong></h5>
          <p class="text-center">The technology used to build this application is the <strong>backend</strong> using the <strong>Golang</strong> programming language and the <strong>frontend</strong> using javascript with the <strong>vue.js</strong> framework.</p>
          <h5 class="text-center mt-5 mb-3"><strong>Technology Details</strong></h5>
          <p class="text-center">Plugin And Dependencies</p>
          <div class="row ">
            <div class="col col-md-6">
              <h4 class="text-center mb-5">Golang</h4>
              <img src="../assets/image/golang.png" alt="" width="150" class="img-fluid rounded mx-auto d-block mt-4 mb-3" >
              <ul class="text-center mt-5">
                <li>Gofiber</li>
                <li>Gorm</li>
                <li>BCrypto</li>
                <li>Validator</li>
                <li>Gomail</li>
              </ul>
              <p class="text-center">For More Detail : <a href="https://github.com/zenklot/backend-zenknote">Github</a></p>
              <p class="text-center">Don't forget to support me give me start on github</p>
            </div>
            <div class="col col-md-6">
              <h4 class="text-center">Vue.js</h4>
              <img src="../assets/image/vue.png" alt="" class="img-fluid rounded mx-auto d-block" width="150">
              <ul class="text-center mt-3">
                <li>Vue Router</li>
                <li>Axios</li>
                <li>Bootstrap-Vue</li>
                <li>Vue-Sweetalert2</li>
                <li>Vuelidate</li>
              </ul>
              <p class="text-center">For More Detail : <a href="https://github.com/zenklot/frontend-zenknote">Github</a></p> 
              <p class="text-center">Don't forget to support me give me start on github</p>
            </div>
          </div>
          <h5 class="text-center mt-5 mb-3"><strong>Thanks To</strong></h5>
          <p class="text-center">in some css styles I'm using someone else's taken from <strong>Codepen.io</strong>. and I say thank you very much for the creator.</p>
          <p class="text-center"><strong>Single Element CSS-Only Absolute Center Overlay Spinner</strong> | <a href="https://codepen.io/MattIn4D">Mattln4D</a><br>
          <strong>Field Animations with CSS Custom Properties</strong> | <a href="https://codepen.io/melnik909">Stas Melnikov</a><br>
          <strong>CSS Typing Effect</strong> | <a href="https://codepen.io/denic">Marko</a></p>
          <h5 class="text-center mt-5 mb-3"><strong>Follow Me</strong></h5>
          <p class="text-center">Follow Me In My Social Media</p>
          <div class="text-center">
          <a href="https://facebook.com/gozenxs" class="mr-5"><b-icon icon="facebook" scale="2" variant="secondary"></b-icon></a>
          <a href="https://twitter.com/zenklot12" class="mr-5"><b-icon icon="twitter" scale="2" variant="secondary"></b-icon></a>
          <a href="https://instagram.com/zenklot" class="mr-5"><b-icon icon="instagram" scale="2" variant="secondary"></b-icon></a>
          <a href="https://www.linkedin.com/in/gozenx/" class="mr-5"><b-icon icon="linkedin" scale="2" variant="secondary"></b-icon></a>
          <a href="https://www.youtube.com/channel/UCiDXSqL_Rjv8wWKcx6suUzQ" ><b-icon icon="youtube" scale="2" variant="secondary"></b-icon></a>
          </div>
           <h5 class="text-center mt-5 mb-3"><strong>Contact Me</strong></h5>
          <p class="text-center">if you want to hire or have other interests please contact me via email: <strong>supriatna.raisa.z@gmail.com</strong></p>
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
name:"About",
components:{
  Navbar,
  Loading,
},
data(){
  return {
    users:{},
    loading: false
  }
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