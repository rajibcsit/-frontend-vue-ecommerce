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
        <td>
          <label for="file" class="col-md-4 col-form-label text-md-right"
            >Image</label
          >
        </td>
        <td>
          <!-- <div class="col-md-6">
            <input
              type="file"
              name="newProduct.image"
              onchange="document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])"
            />
           
            <div class="col-auto mt-3">
              <img
                id="blah"
                src=" "
                alt="your image"
                width="100"
                height="100"
              />
            </div>
          </div> -->

          <div class="form-group">
            <input
              type="file"
              name="image"
              @change="loadImage"
              class="form-control"
              placeholder=""
            />
          </div>
          <br />
          <img :src="photo" alt="" style="height:100px" />
          <br />
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
      photo: "",
      categories: [],
      suppliers: []
    };
  },

  methods: {
    loadImage(e) {
      const file = e.target.files[0];
      // Do some client side validation...
      this.newProduct.image = file;
      // show image here
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.photo = e.target.result;
      };
    },

    addProducts() {
      let formData = new FormData();

      formData.append("name", this.newProduct.name);
      formData.append("description", this.newProduct.description);
      formData.append("supplier_id", this.newProduct.supplier_id);
      formData.append("category_id", this.newProduct.category_id);
      formData.append("price", this.newProduct.price);
      formData.append("image", this.newProduct.image);

      axios
        .post("http://127.0.0.1:8000/api/product", formData)
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
