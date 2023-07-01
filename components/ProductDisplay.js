app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `
    <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <!-- v-bind: Dynamically bind an attribute to an expression -->
        <a :href="url" target="_blank"
          ><img :src="image" :class="{ 'out-of-stock-img': inventory<=0 }"
        /></a>
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
        <p v-else>Out of Stock</p>

        <p>Shipping:  {{ shipping}}</p>

        <p>{{ description }}</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }"
        ></div>
        <!-- code challenge -->
        <div v-for="(size, index) in sizes" key="index">{{ size }}</div>
        <button
          class="button"
          :class="{ disabledButton: inventory<=0 }"
          :disabled="inventory<=0"
          @click="addToCart"
        >
          Add to Cart
        </button>
        <button class="button" :class="{disabledButton: inventory <=0 }" :disabled="inventory<=0"  @click="removeFromCart">Remove Item</button>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>
  `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      description: "Animal printed pair of socks",
      selectedVariant: 0,
      url: "https://www.happysocks.com/jp/",
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "../assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "../assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
      reviews: [],
      //code challenge
      sizes: [22, 23, 24, 25],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inventory() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
