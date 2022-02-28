<template>
  <article class="form">
    <BaseCard class="form-card">
      <header>
        <h2 class="form-card-title">{{ title }}</h2>
      </header>

      <div class="form-card-content">
        <p class="form-card-questions">Questions: {{ numberOfQuestions }}</p>
        <p class="form-card-answers">Answers: {{ numberOfAnswers }}</p>
      </div>

      <footer>
        <nuxt-link class="btn btn-outline-primary" :to="`/form/${id}`">
          See more details
        </nuxt-link>
        <p class="form-card-datetime">{{ $Utils.formatDatetimeLastUpdated(updatedAt) }}</p>
      </footer>
    </BaseCard>
  </article>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    numberOfQuestions: {
      type: Number,
      default: 0
    },
    numberOfAnswers: {
      type: Number,
      default: 0
    },
    updatedAt: {
      type: String,
      default: ''
    },
  },
}
</script>

<style scoped>
.form-card {
  border-left: 4px solid var(--primary);
}

.form-card >>> .card-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-card-title {
  font-size: 1.5rem;
}

.form-card footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.form-card-datetime {
  --sat: 20%;
  --light: 50%;

  color: hsl(var(--hue) var(--sat) var(--light))
}
</style>