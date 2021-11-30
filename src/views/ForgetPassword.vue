<template>
  <div class="forget-password">
    <Loading v-if="loading" />
    <Navbar />
    <br />
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-md-6">
          <div class="page shadow">
            <h3 align="center" class="mt-4">
              Are You <strong>Forget</strong> Password ?
            </h3>
            <p class="text-center mt-3 mb-1">
              if you forget your password account we will send you email.
            </p>
            <label class="field field_v3">
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
            <span v-if="!$v.femail.email" class="text-danger warning-text mb-3"
              >*Email not valid</span
            >
            <p class="text-center text-secondary">
              Before you click the button please
              <b-link to="/">Read Our Term</b-link>
            </p>
            <b-form-checkbox
              id="checkbox-1"
              v-model="ceklis"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
              class="text-secondary warning-text"
            >
              I accept the terms and use
            </b-form-checkbox>
            <button
              v-if="ceklis == 'accepted'"
              class="btn btn-info mt-2"
              @click="sendEmail"
              :disabled="loading"
            >
              Send Email Forget Password
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
  name: "ForgetPassword",
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      femail: "",
      ceklis: "not_accepted",
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
    sendEmail() {
      if (!this.$v.femail.$invalid) {
        let data = {
          email : this.femail
        }
        this.loading = true;
        axios
          .post("https://be-zenk-note.herokuapp.com/api/auth/forget-password", data)
          .then(() => {
            this.$swal({
              icon: "success",
              title:"Email has been sent",
              text:"Please check your email : "+ this.femail
            });
            
            this.$router.push({ path: "/" }).catch(()=>{});
          })
          .catch((err) => {
            if(err.response.status == 401){
                    this.$swal({
                      toast: true,
                      position: "bottom-end",
                      showConfirmButton: false,
                      timer: 2000,
                      icon: "error",
                      title: "This Email Is Not Registered!",
                    });
            }else{
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
                      title: "Email Not Valid",
                    });
      }
    },
  },

};
</script>

<style>
</style>