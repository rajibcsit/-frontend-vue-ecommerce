<template>
  <div>
    <form @submit.prevent="editSubmit()">
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
            <select v-model="product.category">
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
            <select v-model="product.supplier">
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
        supplier: "",
        category: "",
        price: 0,
        image: ""
      },
      suppliers: [],
      categories: "",
      errorMessage: null
    };
  },

  methods: {}
};
</script>

<style></style>
