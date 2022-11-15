<template>
  <div>
    <h1>Latest Products</h1>
    <hr />

    <div class="product" v-for="product of allProducts" :key="product.id">
      <router-link :to="{ name: 'single-product', params: { id: product.id } }">
        <div class="productContainer">
          <img :src="product.image" alt="" class="product_image" />
          <br /><br />
          <strong> {{ product.name }}</strong>
          <p class="price">&#2547; {{ product.price }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShopProduct",
  data() {
    return {
      allProducts: [],
      price: []
    };
  },

  methods: {},
  mounted() {
    this.$eventBus.$emit("loadingStatus", true);

    axios.get("http://127.0.0.1:8000/api/product").then(response => {
      this.allProducts = response.data.data;

      this.$eventBus.$emit("loadingStatus", false);
      console.log(response.data);
    });
  }
};
</script>
