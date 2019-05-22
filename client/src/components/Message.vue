<template>
  <div class="message">
    <p>{{nick}}: {{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: String,
    nick: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
