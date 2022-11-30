<template>
  <div class="login">
    <div class="loginHeader">
      User Registration
    </div>
    <form @submit.prevent="signupNow()">
      <!-- <p v-if="error.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in error" :key="error">{{ error }}</li>
        </ul>
      </p> -->

      <table>
        <tr>
          <td>Name</td>
          <td>:</td>
          <td>
            <input type="text" placeholder="Name" v-model="userSignup.name" />
            <p v-if="error.name" class="errorRegister">{{ error.name }}</p>
          </td>
        </tr>

        <tr>
          <td>Email</td>
          <td>:</td>
          <td>
            <input type="text" placeholder="Email" v-model="userSignup.email" />
          </td>
        </tr>

        <tr>
          <td>Password</td>
          <td>:</td>
          <td>
            <input
              type="password"
              placeholder="Password"
              v-model="userSignup.password"
            />
          </td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td>
            <button class="addBtn" type="submit">
              Sign Up
            </button>
          </td>
          <td>
            <router-link :to="{ name: 'login' }">
              <button class="addBtn" type="submit" style="margin-left: -110px;">
                Login
              </button>
            </router-link>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import iziToast from "izitoast";

export default {
  name: "Registration",
  data() {
    return {
      userSignup: {
        name: "",
        email: "",
        password: ""

        // name: null,
        // email: null,
        // password: null
      },
      error: []
    };
  },
  methods: {
    signupNow() {
      if (
        this.userSignup.name == "" &&
        this.userSignup.email == "" &&
        this.userSignup.password == ""
      ) {
        this.error["name"] = "name is required";
        this.error["email"] = "Email is required";
        this.error["password"] = "Password is required";
      } else {
        axios
          .post("http://127.0.0.1:8000/api/registration", this.userSignup)

          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "login" });

            iziToast.success({
              title: "Hello",
              message: " User registration successfuly "
            });
          });
      }
    }
  }
  // signupNow: function(e) {
  //   if (this.name && this.email && this.password) {
  //     return true;
  //   }

  //   this.error = [];

  //   if (!this.name) {
  //     this.error.push("Name required.");
  //   }
  //   if (!this.email) {
  //     this.error.push("Email required.");
  //   }
  //   if (!this.password) {
  //     this.error.push("Password required.");
  //   }

  //   e.preventDefault();
  // }
};
</script>
