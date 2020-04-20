# vue-webcomponents

# 丝滑体验webcomponents

```
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
```