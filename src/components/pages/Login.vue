<template>
  <div class="login">
    <div class="loginHeader">
      User Login
    </div>
    <form @submit.prevent="loginNow()">
      <table>
        <tr>
          <td>Email</td>
          <td>:</td>
          <td>
            <input type="text" placeholder="Email" v-model="user.email" />
          </td>
        </tr>

        <tr>
          <td>Password</td>
          <td>:</td>
          <td>
            <input
              type="password"
              placeholder="Password"
              v-model="user.password"
            />
          </td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td>
            <button class="addBtn" type="submit">
              Login
            </button>
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
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    loginNow() {
      console.log(this.user);
      this.$eventBus.$emit("loadingStatus", true);
      this.$axios
        .post("http://127.0.0.1:8000/api/login", this.user)
        .then(res => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.user.name);
            this.$router.push({ name: "admin.category" });
          }

          this.$eventBus.$emit("loadingStatus", false);

          iziToast.success({
            title: "Welcome",
            message: " Login Successfully !"
          });

          if (res.data.error) {
            this.$iziToast.error({
              title: "Error",
              message: res.data.message
            });
          } else {
            // localStorage.setItem("token", res.data.token);
            // this.$axios.defaults.headers.common["Authorization"] =
            //   "token " + localStorage.getItem("token");
            // this.$router.push({ name: "admin" });
          }
        });
    }
  },
  mounted() {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      this.$router.push({ name: "admin.category" });
    }
  }
};
</script>
