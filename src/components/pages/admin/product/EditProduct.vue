<template>
  <div>
    <form @submit.prevent="updateProduct()">
      <table>
        <tr>
          <td>
            Product Name:
          </td>
          <td>
            <input
              v-model="product.name"
              type="text"
              id="newCatName"
              placeholder="Product Name"
            />
          </td>
        </tr>
        <tr>
          <td>
            Category:
          </td>
          <td>
            <select v-model="product.category_id">
              <option value="">
                --- Select One ---
              </option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </td>
        </tr>

        <tr>
          <td>
            Supplier:
          </td>
          <td>
            <select v-model="product.supplier_id">
              <option value="">
                --- Select One ---
              </option>
              <option
                v-for="supplier in suppliers"
                :key="supplier.id"
                :value="supplier.id"
              >
                {{ supplier.name }}
              </option>
            </select>
          </td>
        </tr>

        <tr>
          <td>
            Image:
          </td>
          <td>
            <input
              v-model="product.image"
              type="text"
              class=" product_image"
              placeholder="Photo URL"
            />
          </td>
        </tr>

        <tr>
          <td>
            Price:
          </td>
          <td>
            <input
              v-model="product.price"
              type="text"
              id="newCatName"
              placeholder="product Price"
            />
          </td>
        </tr>

        <tr>
          <td>
            Category Description:
          </td>
          <td>
            <textarea
              v-model="product.description"
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
            <button class="btnSave" type="submit">Update</button>
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
  name: "EditProduct",
  data: function() {
    return {
      product: {
        name: "",
        description: "",
        supplier_id: "",
        category_id: "",
        price: 0,
        image: ""
      },
      suppliers: [],
      categories: "",
      errorMessage: null
    };
  },

  methods: {
    //show single product data
    updateProduct() {
      axios
        .put(
          "http://127.0.0.1:8000/api/product/" + this.$route.params.id,
          this.product
        )
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "admin.product" });
          iziToast.success({
            title: "Hello",
            message: " Product update successfully !"
          });
        });
    }
  },

  mounted() {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      this.$router.push("/login");
    }
    //show single product data
    axios
      .get(
        "http://127.0.0.1:8000/api/product/" + this.$route.params.id,
        this.product
      )
      .then(response => {
        console.log(response.data);
        this.product.name = response.data.data.name;
        this.product.description = response.data.data.description;
        this.product.price = response.data.data.price;
        this.product.category_id = response.data.data.category_id;
        this.product.supplier_id = response.data.data.supplier_id;
        // this.$router.push({ name: "admin.product" });
      });

    // /get all suppllier/
    axios.get("http://127.0.0.1:8000/api/supplier").then(response => {
      this.suppliers = response.data.data;
    });
    // /get all suppllier/
    axios.get("http://127.0.0.1:8000/api/category").then(response => {
      this.categories = response.data.data;
    });
  }
};
</script>

<style></style>
