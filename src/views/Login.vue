<template>
  <div class="Login">
    <Navbar />
    <span v-if="loading">Ini Sedang Loading</span>
    <br />
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-md-6">
          <div class="page shadow">
            <h3><b-icon-arrow-right-circle-fill></b-icon-arrow-right-circle-fill> <strong>Login</strong> Page</h3>
            <label class="field field_v3 mt-3">
              <input
                type="email"
                class="field__input"
                placeholder="e.g. your11@mail.com"
                v-model="$v.login.email.$model"
                :class="status($v.login.email)"
              />
              <span class="field__label-wrap">
                <span class="field__label">E-mail</span>
              </span>
            </label>

            <span v-if="!$v.login.email.email">Email Invalid</span>

            <label class="field field_v2">
              <input
                class="field__input"
                placeholder=" "
                type="password"
                v-model="$v.login.password.$model"
                :class="status($v.login.password)"
              />
              <span class="field__label-wrap">
                <span class="field__label">Password</span>
              </span>
            </label>

            <span v-if="!$v.login.password.minLength">
              Fild Required & min 6
            </span>
            <button class="btn btn-success"
              v-if="!$v.login.email.$invalid && !$v.login.password.$invalid"
              @click="sendLogin"
              :disabled="loading">
              Login
            </button>
            <p class="text-secondary warning-text mt-2 mb-1">*Please input email & password</p>            
            <div class="row mt-3">
              <div class="col">
                <p class="text-center text-secondary">not have an account ?, <router-link to="/register">Register</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  validations: {
    login: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    sendLogin() {
      this.loading = true;
      axios
        .post("https://be-zenk-note.herokuapp.com/api/auth/login", this.login)
        .then((response) => {
          // handle success
          this.$swal("Success");
          localStorage.token = response.data.data.token;
          localStorage.refresh_token = response.data.data.refresh_token;

          this.$router.push({ path: "/about" });
          //   console.log(response)
        })
        .catch((error) => {
          // handle error
          let message = error.response.data.error;
          if (message) {
            message.forEach((e) => {
              this.$swal(e);
            });
          } else {
            this.$swal("Eror");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>