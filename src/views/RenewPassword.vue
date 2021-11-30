<template>
  <div class="renew-password">
    <Loading v-if="loading" />
    <Navbar />
    <br />
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-md-6">
          <div class="page shadow">
            <h3 align="center" class="mt-4">
              Renew <strong>Account</strong> Password ?
            </h3>
            <p class="text-center mt-3 mb-1">
              Please input your new password
            </p>
            
            <label class="field field_v2">
              <input
                class="field__input"
                placeholder=" "
                type="password"
                v-model="$v.password.$model"
                :class="status($v.password)"
              />
              <span class="field__label-wrap">
                <span class="field__label">New Password</span>
              </span>
            </label>

            <span
              v-if="!$v.password.minLength"
              class="text-danger warning-text"
            >
              *Password Required & min. 6
            </span>

            <label class="field field_v2">
              <input
                class="field__input"
                placeholder=" "
                type="password"
                v-model="$v.repassword.$model"
                :class="status($v.repassword)"
              />
              <span class="field__label-wrap">
                <span class="field__label">Repeat New Password</span>
              </span>
            </label>

            <span
              v-if="$v.repassword.$invalid"
              class="text-danger warning-text"
            >
              *Password not same!
            </span>

            <button
              class="btn btn-info mt-2"
              @click="changePassword"
              :disabled="loading"
            >
              Change Password
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
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "ForgetPassword",
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      password :"",
      repassword :"",
      loading: false,
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    repassword: {
        required,
        sameAs: sameAs('password')
    }
  },
  methods: {
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    changePassword() {
      if (!this.$v.password.$invalid && !this.$v.repassword.$invalid) {
        this.loading = true;
        let data = {
          password: this.password
        }
        let token = this.$route.params.token
        axios
          .put("https://be-zenk-note.herokuapp.com/api/auth/forget-password?token="+token, data)
          .then(() => {
            this.$swal({
              icon: "success",
              title:"Succes Change Password",
            });
            
            this.$router.push({ path: "/login" }).catch(()=>{});
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
      }else{
         this.$swal({
                      toast: true,
                      position: "bottom-end",
                      showConfirmButton: false,
                      timer: 2000,
                      icon: "error",
                      title: "Please Check Your Password!",
                    });
      }
    },
  },

};
</script>

<style>
</style>