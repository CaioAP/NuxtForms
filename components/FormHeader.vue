<template>
  <header>
    <BaseCard class="forms-header">
      <h1 v-if="title" class="forms-header-title">{{ title }}</h1>
      <slot v-else name="title"></slot>
      <slot name="action"></slot>
    </BaseCard>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
  },
}
</script>

<style scoped>
.forms-header {
  border-top: 4px solid var(--primary);
}

.forms-header-title {
  font-size: 2rem;
}

.forms-header >>> .card-body {
  display: flex;
  justify-content: space-between;
}
</style>