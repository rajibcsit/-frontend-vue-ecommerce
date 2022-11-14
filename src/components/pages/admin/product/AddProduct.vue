<template>
  <form @submit.prevent="submitAdd()">
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
          <select
            required
            v-model="newProduct.category"
            v-if="categories.length > 0"
          >
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
          <select required v-model="newProduct.supplier">
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
        supplier: "",
        category: "",
        price: 0,
        image: ""
      },
      categories: [],
      suppliers: []
    };
  },

  methods: {}
};
</script>

<style></style>
