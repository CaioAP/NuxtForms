<template>
  <main class="container">
    <FormHeader title="My forms">
      <template #action>
        <!-- <BaseButton class="btn btn-primary">
          New Form
        </BaseButton> -->
        <nuxt-link class="btn btn-primary" to="/form/1">
          New Form
        </nuxt-link>
      </template>
    </FormHeader>
    
    <section class="forms" aria-label="My forms">
      <FormCard 
        v-for="form in forms" 
        :key="form.id"
        v-bind="form"
      />
    </section>
  </main>
</template>

<script>
// import BaseButton from '@/components/BaseButton.vue'
import FormHeader from '@/components/FormHeader.vue'
import FormCard from '@/components/FormCard.vue'

export default {
  name: 'MeusFormularios',
  components: {
    // BaseButton,
    FormHeader,
    FormCard,
  },
  computed: {
    forms() {
      return [
        {
          id: 1,
          title: 'Javascript',
          questions: 5,
          answers: 2135,
          updatedAt: new Date('2022-02-24T20:52:00'),
        },
        {
          id: 2,
          title: 'Vue.js',
          questions: 3,
          answers: 135,
          updatedAt: new Date('2022-02-24T12:43:00'),
        },
        {
          id: 3,
          title: 'React',
          questions: 6,
          answers: 432,
          updatedAt: new Date('2022-02-23T09:13:00'),
        },
        {
          id: 4,
          title: 'Flutter',
          questions: 10,
          answers: 238,
          updatedAt: new Date('2022-02-22T15:27:00'),
        },
        {
          id: 5,
          title: 'Python',
          questions: 7,
          answers: 528,
          updatedAt: new Date('2022-02-22T15:27:00'),
        }
      ]
    }
  },
}
</script>

<style scoped>
.forms {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
</style>