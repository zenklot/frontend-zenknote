<template>
  <div class="refresh-token">
    <Loading v-if="loading" />
    <Navbar />
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-md-6">
          <div class="page shadow">
            <h3 class="mt-4">Opps... <strong>Token Expired !</strong></h3>
            <p class="text-center mt-3 mb-1 p-3">Your token has been expired, input your email & click refresh button to renew your token</p>
            <label class="field field_v3 mt-1">
              <input
                type="email"
                class="field__input"
                placeholder="e.g. your11@mail.com"
                v-model="$v.femail.$model"
                :class="status($v.femail)"
              />
              <span class="field__label-wrap">
                <span class="field__label">E-mail</span>
              </span>
            </label>
            <span
              v-if="!$v.femail.email"
              class="text-danger warning-text mb-3"
              >*Email not valid</span
            >
            <button class="btn btn-primary mt-2"
              @click="sendRefresh"
              :disabled="loading">
              Refresh My Token
            </button>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "RefreshToken",
  components: {
    Navbar,
    Loading
  },
  data() {
    return {
      femail:"",
      loading: false,
    };
  },
 validations: {
      femail: {
        required,
        email,
      },    
  },

  methods: {
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    sendRefresh() {
      if (!this.$v.femail.$invalid) {
 this.loading = true;
      let data = {
        refresh_token : localStorage.refresh_token,
        email: this.femail
      }
      axios
        .post("https://be-zenk-note.herokuapp.com/api/auth/refresh", data)
        .then((response) => {
          
           this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              icon: "success",
              timerProgressBar: true,
              title: "Success Refresh Token!",
            });
          localStorage.token = response.data.data.token;
          localStorage.refresh_token = response.data.data.refresh_token;

          this.$router.push({ path: "/" }).catch(()=>{});
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
            localStorage.removeItem('refresh_token')
            this.$router.push({ path: "/login" }).catch(() => {});
        })
        .finally(() => {
          this.loading = false;
        });
    }else{
       this.$swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          icon: "error",
          title: "Email Required!",
        });
    }
      },

     
  },
};
</script>

<style>
</style>