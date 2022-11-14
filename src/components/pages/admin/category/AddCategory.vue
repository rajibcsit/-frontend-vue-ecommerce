<template>
  <form @submit.prevent="categorySubmit()">
    <table>
      <tr>
        <td>
          Category Name:
        </td>
        <td>
          <input
            required
            v-model="category.name"
            type="text"
            id="newCatName"
            placeholder="Category Name"
          />
        </td>
      </tr>
      <tr>
        <td>
          Category Description:
        </td>
        <td>
          <textarea
            required
            v-model="category.description"
            type="text"
            id="newCatName"
            placeholder="Write short here...."
          >
          </textarea>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <button type="submit" class="btnSave">Save</button>
        </td>
      </tr>
    </table>
  </form>
</template>

<script>
import iziToast from "izitoast";
import axios from "axios";

export default {
  name: "AddCategory",
  data: function() {
    return {
      category: {
        name: "",
        description: ""
      }
    };
  },
  mounted() {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      this.$router.push("/login");
    }
  },

  methods: {
    categorySubmit() {
      axios
        .post("http://127.0.0.1:8000/api/category", this.category)

        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "admin.category" });

          iziToast.success({
            title: "Hello",
            message: " Category Added Successfully !"
          });
        });
    }
  }
};
</script>
