
<template>
  <div>
    <section>
      my name is
      <edit-span :value="name" @change="change"></edit-span>
    </section>
    <section>
      <button @click="name = 'bar'">change</button>
    </section>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      name: "foo"
    };
  },
  created() {},
  mounted() {},
  methods: {
    change(e) {
      console.log("from <edit-span>:" + e.detail.value);
      this.name = e.detail.value;
    }
  }
};
</script>


<style>
section {
  padding: 5px;
}
</style>