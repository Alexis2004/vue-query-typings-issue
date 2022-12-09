<template>
  <h1>Vue Query typings issue demo</h1>
  <div>
    Load Product:
    &nbsp;
    <button @click="loadProduct(1)">1</button>
    &nbsp;
    <button @click="loadProduct(2)">2</button>
    &nbsp;
    <button @click="loadProduct(3)">3</button>
    <br />
  </div>
  <div v-if="isLoading">
    ⏳ Product #{{ productId }} is loading from the server...
  </div>
  <div v-else-if="product !== undefined && product !== null">
    ✅ <strong>#{{ product.id }}</strong>: {{ product.name }}
  </div>
  <div v-else>
    ❌ Product #{{ productId }} does not exist :(
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';
import { useProduct } from "./product";

export default defineComponent({
  name: 'App',
  setup() {
    const productId = ref(1);

    const {
      isLoading,
      data: product
    } = useProduct(productId)

    const loadProduct = (newProductId: number) => {
      productId.value = newProductId;
    }

    return {
      isLoading,
      productId,
      product,
      loadProduct
    };
  },
});
</script>
