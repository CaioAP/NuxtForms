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
export default {
  name: 'MyForms',
  async asyncData({ $axios }) {
    let forms = (await $axios.get('/forms')).data
    
    forms = forms.map(form => {
      form.id = form._id
      return form
    })

    forms.sort((previous, current) => {
      if (previous.updatedAt > current.updatedAt) return -1
      if (previous.updatedAt < current.updatedAt) return 1
      return 0
    })

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