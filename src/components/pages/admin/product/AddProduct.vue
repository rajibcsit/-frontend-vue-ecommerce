<template>
  <form @submit.prevent="addProducts()">
    <table>
      <tr>
        <td>
          Product Name:
        </td>
        <td>
          <input
            required
            v-model="newProduct.name"
            type="text"
            id="newCatName"
            placeholder="product Name"
          />
        </td>
      </tr>

      <tr>
        <td>
          Category:
        </td>
        <td>
          <select required v-model="newProduct.category_id">
            <option value="">
              -- --- Select One --- --
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
          <select required v-model="newProduct.supplier_id">
            <option value="">
              -- --- Select One --- --
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
            required
            v-model="newProduct.image"
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
            required
            v-model="newProduct.price"
            type="text"
            id="newCatName"
            placeholder="product Price"
          />
        </td>
      </tr>
      <tr>
        <td>
          Product Description:
        </td>
        <td>
          <textarea
            required
            v-model="newProduct.description"
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
          <button class="btnSave" type="submit">Save</button>
        </td>
      </tr>
    </table>
  </form>
</template>

<script>
import axios from "axios";
import iziToast from "izitoast";

export default {
  name: "AddProduct",
  data: function() {
    return {
      newProduct: {
        name: "",
        description: "",
        supplier_id: "",
        category_id: "",
        price: 0,
        image: ""
      },
      categories: [],
      suppliers: []
    };
  },

  methods: {
    addProducts() {
      axios
        .post("http://127.0.0.1:8000/api/product", this.newProduct)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "admin.product" });
        });
    }
  },

  mounted() {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      this.$router.push("/login");
    }
    // setTimeout(() => {
    //   this.addProducts();
    // }, 1000);
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
