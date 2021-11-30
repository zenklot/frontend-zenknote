<template>
  <div class="Register">
    <Loading v-if="loading" />
    <Navbar />
    <br />
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-md-6">
          <div class="page shadow">
            <h3>
              <b-icon icon="arrow-up-circle-fill" variant="warning"></b-icon>
              <strong>Register</strong> Page
            </h3>
            <label class="field field_v1 mt-3">
              <input
                type="text"
                class="field__input"
                placeholder="e.g. your fullname"
                v-model="$v.user.name.$model"
                :class="status($v.user.name)"
              />
              <span class="field__label-wrap">
                <span class="field__label">Fullname</span>
              </span>
            </label>

            <span
              v-if="!$v.user.name.minLength"
              class="text-danger warning-text"
              >*Name min 4</span
            >

            <label class="field field_v3">
              <input
                type="email"
                class="field__input"
                placeholder="e.g. your11@mail.com"
                v-model="$v.user.email.$model"
                :class="status($v.user.email)"
              />
              <span class="field__label-wrap">
                <span class="field__label">E-mail</span>
              </span>
            </label>

            <span v-if="!$v.user.email.email" class="text-danger warning-text"
              >*Email not valid</span
            >

            <label class="field field_v2">
              <input
                class="field__input"
                placeholder=" "
                type="password"
                v-model="$v.user.password.$model"
                :class="status($v.user.password)"
              />
              <span class="field__label-wrap">
                <span class="field__label">Password</span>
              </span>
            </label>

            <span
              v-if="!$v.user.password.minLength"
              class="text-danger warning-text"
            >
              *Password Required & min. 6
            </span>

            <label class="field field_v2">
              <input
                class="field__input"
                placeholder=" "
                type="password"
                v-model="$v.user.repassword.$model"
                :class="status($v.user.repassword)"
              />
              <span class="field__label-wrap">
                <span class="field__label">Repeat Password</span>
              </span>
            </label>

            <span
              v-if="!$v.user.repassword.sameAsPassword"
              class="text-danger warning-text mb-3"
            >
              *Password Not Same
            </span>

            <button
              class="btn btn-success"
              @click="sendRegister"
              :disabled="loading"
            >
              Register
            </button>
            <div class="row mt-3">
              <div class="col">
                <p class="text-center text-secondary">
                  already have an account ?,
                  <router-link to="/login">Login</router-link>
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
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "Register",
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        repassword: null,
      },
      loading: false,
    };
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      repassword: {
        required,
        sameAsPassword: sameAs(function () {
          return this.user.password;
        }),
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
    sendRegister() {
      if (!this.$v.$invalid) {
        this.loading = true;
        axios
          .post(
            "https://be-zenk-note.herokuapp.com/api/auth/register",
            this.user
          )
          .then((response) => {
            localStorage.token = response.data.data.token;
            localStorage.refresh_token = response.data.data.refresh_token;
            this.$swal({
              icon: "success",
              title: "Succes Registration",
              text: "Please Login To Check Your Account",
            });

            this.$router.push({ path: "/login" }).catch(() => {});
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
      } else {
        this.$swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          icon: "error",
          title: "Please Fill The Form!",
        });
      }
    },
  },
};
</script>

<style>
</style>