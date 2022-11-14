<template>
  <div>
    <h2 class="fleft">Product</h2>
    <router-link :to="{ name: 'AddProduct' }">
      <button class="addBtn fright">Add New</button>
    </router-link>

    <div class="clear"></div>
    <hr />
    <table class="nice-table" v-if="product.length > 0">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Supplier</th>
        <th>Image</th>
        <th>Price</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      <tr v-for="(product, index) of product" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.category.name }}</td>
        <td>{{ product.supplier.name }}</td>
        <td><img :src="product.image" alt="" class="product_image" /></td>
        <td>{{ product.price }}</td>
        <td>{{ product.description }}</td>
        <td>
          <router-link :to="`product/edit/${product.id}`">
            <button class="edit">Edit</button>
          </router-link>
        </td>
        <td>
          <button
            type="submit"
            class="delete"
            v-on:click="deleteProduct(product.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import iziToast from "izitoast";

export default {
  name: "Product",
  data: function() {
    return {
      product: [],
      errorMessage: null
    };
  },

  methods: {
    loadProducts() {
      this.$eventBus.$emit("loadingStatus", true);

      axios.get("http://127.0.0.1:8000/api/product").then(response => {
        this.product = response.data.data;

        this.$eventBus.$emit("loadingStatus", false);
        console.log(response.data);
      });
    },

    deleteProduct(id) {
      axios.delete(`http://127.0.0.1:8000/api/product/${id}`).then(response => {
        console.log(response);
        this.loadProducts();
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
      this.loadProducts();
    }, 1000);
  }
};
</script>

<style></style>
