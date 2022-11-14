<template>
  <div>
    <h2 class="fleft">Categories</h2>
    <router-link :to="{ name: 'category' }">
      <button class="addBtn fright">Add New</button>
    </router-link>

    <div class="clear"></div>
    <hr />
    <form>
      <table class="nice-table" v-if="category.length > 0">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr v-for="(category, index) of category" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <router-link
              :to="{ name: 'categoryEdit', params: { id: category.id } }"
            >
              <button class="edit">Edit</button>
            </router-link>
          </td>
          <td>
            <button class="delete" @click="deleteCategories(category.id)">
              Delete
            </button>
          </td>
        </tr>
      </table>

      <div v-else>
        <p style="text-align:center;font-size:40px;color:red">No data</p>
      </div>
    </form>
  </div>
</template>

<script>
import iziToast from "izitoast";
import axios from "axios";

export default {
  name: "Category",
  data() {
    return {
      category: [],
      errorMessage: null
    };
  },
  mounted() {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      this.$router.push("/login");
    }
    setTimeout(() => {
      this.loadCategories();
    }, 1000);
  },
  methods: {
    // init() {
    //   this.$eventBus.$emit("loadingStatus", true);
    //   this.$axios.get("http://127.0.0.1:8000/api/category").then(res => {
    //     this.$eventBus.$emit("loadingStatus", false);
    //     if (res.data.error) {
    //       this.$iziToast.error({
    //         title: "Error",
    //         message: res.data.message
    //       });
    //     } else {
    //       this.categories = res.data.data;
    //       console.log(res.data);
    //     }
    //   });
    // }

    loadCategories() {
      this.$eventBus.$emit("loadingStatus", true);

      axios.get("http://127.0.0.1:8000/api/category").then(response => {
        console.log(response.data);

        this.$eventBus.$emit("loadingStatus", false);
        this.category = response.data.data;
      });
    },
    deleteCategories(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/category/${id}`)
        .then(response => {
          console.log(response);
          this.loadCategories();
        });

      iziToast.success({
        title: "Hello",
        message: "Delete  successfully!!"
      });
    }
  }
};
</script>
