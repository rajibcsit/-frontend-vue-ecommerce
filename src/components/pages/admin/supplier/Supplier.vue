<template>
  <div>
    <h2 class="fleft">Supplier</h2>
    <router-link :to="{ name: 'supplier' }">
      <button class="addBtn fright">Add New</button>
    </router-link>

    <div class="clear"></div>
    <hr />
    <form>
      <table class="nice-table" v-if="supplier.length > 0">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr v-for="(supplier, index) of supplier" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ supplier.name }}</td>
          <td>{{ supplier.description }}</td>
          <td>
            <router-link
              :to="{ name: 'supplierEdit', params: { id: supplier.id } }"
            >
              <button class="edit">Edit</button>
            </router-link>
          </td>
          <td>
            <button class="delete" @click="deleteSuppliers(supplier.id)">
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
  name: "Supplier",
  data() {
    return {
      supplier: [],
      errorMessage: null
    };
  },
  methods: {
    loadSuppliers() {
      this.$eventBus.$emit("loadingStatus", true);

      axios.get("http://127.0.0.1:8000/api/supplier").then(response => {
        console.log(response);
        this.$eventBus.$emit("loadingStatus", false);

        this.supplier = response.data.data;
      });
    },

    deleteSuppliers(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/supplier/${id}`)
        .then(response => {
          console.log(response);
          this.loadSuppliers();
        });

      iziToast.success({
        title: "Hello",
        message: "Delete  successfully!!"
      });
    }
  },

  mounted() {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      this.$router.push("/login");
    }
    setTimeout(() => {
      this.loadSuppliers();
    }, 1000);
  }
};
</script>
