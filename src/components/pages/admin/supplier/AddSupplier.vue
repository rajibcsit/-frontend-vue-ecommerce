<template>
  <form @submit.prevent="supplierSubmit()">
    <table>
      <tr>
        <td>
          Supplier Name:
        </td>
        <td>
          <input
            required
            v-model="supplier.name"
            type="text"
            id="newCatName"
            placeholder="supplier Name"
          />
        </td>
      </tr>
      <tr>
        <td>
          supplier Description:
        </td>
        <td>
          <textarea
            required
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
  name: "AddSupplier",
  data: function() {
    return {
      supplier: {
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
    supplierSubmit() {
      axios
        .post("http://127.0.0.1:8000/api/supplier", this.supplier)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "admin.supplier" });
        });

      iziToast.success({
        title: "Hello",
        message: " Supplier added successfully !"
      });
    }
  }
};
</script>
