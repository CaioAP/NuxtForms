<template>
  <BaseButton class="btn btn-back" @click="goBack">
    <fa-icon icon="arrow-left-long" />
    Go back
  </BaseButton>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
export default {
  components: {
    BaseButton,
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
.btn-back {
  border: none;
  background-color: transparent;
  color: var(--dark);
}

.btn-back:hover {
  text-decoration: underline;
  color: var(--primary);
}
</style>