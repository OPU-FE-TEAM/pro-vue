<template>
  <div>
    <a-card style="margin:10px;">
      <h1>test</h1>
      <a-input v-model="text"></a-input>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      text: ""
    };
  },
  created() {}
};
</script>
