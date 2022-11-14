<template>
  <div>
    <form @submit.prevent="updateSupplier()">
      <table>
        <tr>
          <td>
            Supplier Name:
          </td>
          <td>
            <input
              v-model="supplier.name"
              type="text"
              id="newCatName"
              placeholder="Category Name"
            />
          </td>
        </tr>
        <tr>
          <td>
            Supplier Description:
          </td>
          <td>
            <textarea
              v-model="supplier.description"
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
  name: "EditSupplier",
  data: function() {
    return {
      supplier: {
        name: "",
        description: ""
      }
    };
  },

  methods: {
    updateSupplier() {
      axios
        .post(
          "http://127.0.0.1:8000/api/supplier/" + this.$route.params.id,
          this.supplier
        )
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "admin.supplier" });

          iziToast.success({
            title: "Hello",
            message: " Supplier update successfully !"
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
      .get("http://127.0.0.1:8000/api/supplier/" + this.$route.params.id)
      .then(response => {
        this.supplier.name = response.data.data.name;
        this.supplier.description = response.data.data.description;
      });
  }
};
</script>
