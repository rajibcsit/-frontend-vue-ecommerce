<template>
  <div>
    <form @submit.prevent="updateCategory()">
      <table>
        <tr>
          <td>
            Category Name:
          </td>
          <td>
            <input
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
            <button type="submit" class="btnSave">Update</button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
import iziToast from "izitoast";
import axios from "axios";

export default {
  name: "EditCategory",
  data: function() {
    return {
      category: {
        name: "",
        description: ""
      }
    };
  },

  methods: {
    updateCategory() {
      axios
        .post(
          "http://127.0.0.1:8000/api/category/" + this.$route.params.id,
          this.category
        )
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "admin.category" });

          iziToast.success({
            title: "Hello",
            message: " Category update successfully !"
          });
        });
    }
  },
  mounted() {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      this.$router.push("/login");
    }
    axios
      .get("http://127.0.0.1:8000/api/category/" + this.$route.params.id)
      .then(response => {
        this.category.name = response.data.data.name;
        this.category.description = response.data.data.description;
      });
  }
};
</script>
