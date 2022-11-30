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
            <input
              type="email"
              placeholder="Email"
              v-model="user.email"
              @keypress="change()"
            />
            <p v-if="error.email">{{ error.email }}</p>
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
            <p v-if="error.password">{{ error.password }}</p>
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
          <td>
            <router-link :to="{ name: 'registration' }">
              <button class="addBtn" type="submit" style="margin-left: -135px;">
                Registration
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
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      error: []
    };
  },
  methods: {
    loginNow() {
      console.log(this.user);
      this.$eventBus.$emit("loadingStatus", true);

      if (this.user.email == "" && this.user.password == "") {
        this.error["email"] = "Email field is required";
        this.error["password"] = "password field is required";
      } else {
        (this.error["email"] = null),
          (this.error["password"] = null),
          axios
            .post("http://127.0.0.1:8000/api/login", this.user)
            .then(res => {
              if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", res.data.user.name);
                this.$router.push({ name: "admin.category" });
              } else {
                alert("invalid token");
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
              }
            })
            .catch(error => {
              console.log(res);
              this.error["email"] = error.res.data.error;
              this.error["password"] = error.res.data.error;

              this.user.email = null;
              this.user.password = null;
            });
      }
    },
    change() {
      this.user.email = null;
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
