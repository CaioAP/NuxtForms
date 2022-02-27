<template>
  <main class="container">
    <FormHeader title="My forms">
      <template #action>
        <BaseButton class="btn btn-primary" @click="createNewForm">
          New Form
        </BaseButton>
      </template>
    </FormHeader>

    <section class="no-forms" aria-label="There are no forms">
      <BaseCard>
        <p>There are no forms here</p>
      </BaseCard>
    </section>
    
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
import BaseCard from '@/components/BaseCard.vue'
import FormHeader from '@/components/FormHeader.vue'
import FormCard from '@/components/FormCard.vue'

export default {
  name: 'MeusFormularios',
  components: {
    // BaseButton,
    BaseCard,
    FormHeader,
    FormCard,
  },
  async asyncData({ $axios }) {
    const forms = (await $axios.get('/forms')).data

    return { forms }
  },
  methods: {
    async createNewForm() {
      try {
        const { data } = await this.$axios.post('/forms')
        
        this.$router.push({
          path: `/form/${data.form._id}`,
        })
      } catch (error) {
        
      }
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

.no-forms {
  margin-top: 1rem;
}
</style>