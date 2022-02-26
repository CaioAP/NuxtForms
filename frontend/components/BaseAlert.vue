<template>
  <div class="b-alert">
    <b-alert
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot></slot>
    </b-alert>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.b-alert >>> .alert {
  margin-bottom: 0;
}
</style>