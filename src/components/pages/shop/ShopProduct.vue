<template>
  <div>
    <h1 class="fleft">{{ product.name }}</h1>
    <router-link to="/shop/products" class="fright"> All Products </router-link>
    <div class="clear"></div>
    <hr />
    <div class="product-left">
      <img :src="product.image" alt="" class="product_image single_p_img" />
      <br /><br />
      <br />
    </div>

    <div class="product-right">
      <div class="product-description">
        <p>
          <strong> Category: </strong> {{ product.category_id }} <br /><br />
          <strong> Supplier: </strong> {{ product.supplier_id }} <br /><br />
          <strong> Price: </strong> {{ product.price }} <br /><br />
          <strong> Description: </strong> {{ product.description }} <br /><br />
        </p>
        <strong> Quantity: </strong>
        <input type="number" class="input-number" v-model="qty" />
        <button class="addBtn" @click="addToCart()">Add to Cart</button>
      </div>
    </div>
    <div class="clear"></div>
    <hr />
    <br /><br /><br />
    <p class="txt-center">
      <router-link to="/shop/products" class="addBtn">
        Continue Shopping
      </router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ShopProduct",
  data() {
    return {
      product: {
        name: "",
        description: "",
        supplier_id: "",
        category_id: "",
        price: 0,
        image: "",
        photo: ""
      },
      qty: 1
    };
  },

  methods: {
    loadImage(e) {
      const file = e.target.files[0];
      // Do some client side validation...
      this.product.image = file;
      // show image here
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.product.photo = e.target.result;
      };
    },
    singleProduct() {
      axios
        .get("http://127.0.0.1:8000/api/product/" + this.$route.params.id)
        .then(response => {
          console.log(response.data);
          this.product.name = response.data.data.name;
          this.product.description = response.data.data.description;
          this.product.price = response.data.data.price;
          this.product.category_id = response.data.data.category.name;
          this.product.supplier_id = response.data.data.supplier.name;
          this.product.image = response.data.data.image;
        })
        .catch(response => {
          console.log(response.data.data);
        });
    },

    //Add product qty Cart page
    addToCart() {
      this.$eventBus.$emit("addToCart", {
        product: this.product,
        quantity: this.qty
      });
    }
  },

  mounted() {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      this.$router.push("/login");
    }
    //show single product data
    setTimeout(() => {
      this.singleProduct();
    }, 1000);
  }
};
</script>
