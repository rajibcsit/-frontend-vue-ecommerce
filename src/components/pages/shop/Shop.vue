<template>
  <div class="admin">
    <div id="header">
      <h1 class="fleft">Twite Soft- Best SEO Service</h1>

      <router-link to="/admin" class="fright"> Dashboard </router-link>
    </div>
    <div id="shop">
      <div id="shopContainer">
        <router-view />
      </div>
    </div>

    <div id="cart">
      <div id="cartContainer">
        <h2>Your Cart</h2>
        <hr />
        <table class="cart">
          <tr>
            <td>Product</td>
            <td>Quantity</td>
            <td>Price</td>
          </tr>

          <tr v-for="item in cart">
            <td>{{ item.product.name }}</td>
            <td>
              <input
                type="number"
                class="input-number"
                v-model="item.quantity"
              />
            </td>
            <td>&#2547; {{ item.product.price * item.quantity }}</td>
          </tr>
          <tr>
            <td class="3">
              <hr />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>Total =</td>
            <td>&#2547; {{ total }}</td>
          </tr>
        </table>

        <br /><br />
        <p class="txt-center">
          <router-link to="/shop/checkout" class="addBtn">
            Checkout
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  data() {
    return {
      cart: []
    };
  },

  //Calculation product price
  computed: {
    total() {
      var total = 0;
      for (var i = 0; i < this.cart.length; i++) {
        var item = this.cart[i];
        total += item.quantity * item.product.price;
      }
      return total;
    }
  },

  mounted() {
    if (localStorage.getItem("token") == "") {
      this.$router.push({ name: "login" });
    }

    // product add to cart
    this.$eventBus.$on("addToCart", payload => {
      this.cart.push(payload);
    });

    // product remove to cart
    this.$eventBus.$on("removeToCart", payload => {
      this.cart = [];
    });
  },
  methods: {
    logoutNow() {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
