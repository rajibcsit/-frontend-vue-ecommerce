<template>
  <div>
    <h1 class="fleft">Delivery Information</h1>
    <router-link to="/shop/products" class="fright"> All Products </router-link>
    <div class="clear"></div>
    <hr />
    <form>
      <table>
        <tr>
          <td>Full Name</td>
          <td>
            <input type="text" placeholder=" Full Name" />
          </td>
        </tr>
        <tr>
          <td>City</td>
          <td>
            <select>
              <option value=""> ... Selete One ...</option>
              <option> Dhaka </option>
              <option> Rangpur </option>
              <option> Rajshahi </option>
              <option> Khulna </option>
              <option> Barishal </option>
              <option> Sylhet </option>
              <option> Chittegong </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Address</td>
          <td>
            <textarea placeholder="Write Delivery Address..."></textarea>
          </td>
        </tr>
        <tr>
          <td>Contact Number</td>
          <td>
            <input type="number" placeholder="Phone number here..." />
          </td>
        </tr>
        <tr>
          <td>Payment Method</td>
          <td>
            <select>
              <option value=""> ... Selete One ...</option>
              <option> Cash on delivery </option>
              <option> Bkash </option>
              <option> Dutch-Bangla </option>
              <option> SureCash </option>
              <option> Nagad </option>
              <option> Master Card </option>
            </select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <router-link :to="{ name: 'shop.products' }">
              <button class="btnSave" @click="orderNow()">Order Now</button>
            </router-link>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
import iziToast from "izitoast";
export default {
  name: "ShopProduct",
  data() {
    return {};
  },

  methods: {
    orderNow() {
      this.$eventBus.$emit("removeToCart", {
        product: this.product,
        quantity: this.qty
      });

      iziToast.success({
        title: "Hello",
        message:
          "Your order has been received. We will send another text when it’s on the way home."
      });
    }
  }
};
</script>

<style></style>
