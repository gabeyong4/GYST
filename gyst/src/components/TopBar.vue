<template>
  <div id="title">
    <h1> {{text}} </h1>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      text:"Title"
    }
  }

}
</script>

<style>

.TopBar {
    padding: 20px;
    text-align: center;
    background-color: #474e5d;
    color: white;
  }

</style>