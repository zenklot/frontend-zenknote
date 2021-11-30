<template>
  <div class="Login">
    <Loading v-if="loading" />
    <Navbar />
    <br />
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-md-6">
          <div class="page shadow">
            <h3>
              <b-icon icon="arrow-right-circle-fill" variant="warning"></b-icon>
              <strong>Login</strong> Page
            </h3>
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

            <span
              v-if="!$v.login.email.email"
              class="text-danger warning-text mb-3"
              >*Email not valid</span
            >

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

            <span
              v-if="!$v.login.password.minLength"
              class="text-danger warning-text"
            >
              *Password Required & min. 6
            </span>
            <button
              class="btn btn-success"
              v-if="!$v.login.email.$invalid && !$v.login.password.$invalid"
              @click="sendLogin"
              :disabled="loading"
            >
              Login
            </button>
            <p class="text-secondary warning-text mt-2 mb-1">
              *Please input email & password
            </p>
            <div class="row mt-3">
              <div class="col text-center">
                <b-link
                  class="text-secondary warning-text"
                  to="/forget-password"
                  >Forget Password ? <strong>Click Me</strong></b-link
                >
                <p class="text-center text-secondary">
                  not have an account ?,
                  <router-link to="/register">Register</router-link>
                </p>
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
import Loading from "@/components/Loading.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "Login",
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      loading: false,
      users: {},
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
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            icon: "success",
            timerProgressBar: true,
            title: "Login Success",
          });
          localStorage.token = response.data.data.token;
          localStorage.refresh_token = response.data.data.refresh_token;

          this.$router.push({ path: "/dashboard" }).catch(() => {});
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
  },
};
</script>

<style>
</style>