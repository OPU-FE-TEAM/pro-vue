<template>
  <div>
    <a-card style="margin:10px;height:500px;overflow-y: auto;">
      <div style="height:1000px">
        <h1>test3</h1>
        <a-input v-model="text"></a-input>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "test2",
  data() {
    return {
      text: ""
    };
  }
};
</script>
