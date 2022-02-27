<template>
  <main class="container">
    <BaseButtonBack />

    <FormHeader class="form-create-header">
      <template #title>
        <BaseInput v-model="title" placeholder="Your form title"/>
      </template>
      <template #action>
        <BaseButton class="btn btn-primary btn-save">
          <fa-icon icon="floppy-disk" />
          Save Form
        </BaseButton>
      </template>
    </FormHeader>

    <section class="form-questions" aria-label="Form questions">
      <FormQuestion
        v-for="question in questions" 
        :key="question.id" 
        v-bind="question"
        @title-updated="updateQuestionTitle"
        @answers-updated="updateQuestionAnswers"
        @remove="removeQuestion"
      />
    </section>

    <footer>
      <BaseButton class="btn btn-primary btn-save" @click="addQuestion">
        <fa-icon icon="plus" />
        Add question
      </BaseButton>
    </footer>
  </main>
</template>

<script>
import BaseButtonBack from '@/components/BaseButtonBack.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import FormQuestion from '@/components/FormQuestion.vue'

export default {
  components: {
    BaseButtonBack,
    BaseButton,
    BaseInput,
    FormQuestion
  },
  asyncData() {
    const title = ''
    const firstQuestion = {
      id: 1,
      title: '',
      answers: [
        {
          id: 1, value: 'Yes'
        }, {
          id: 2, value: 'No'
        }
      ],
      questionAlert: {}
    }

    const questions = [firstQuestion]

    return { title, questions }
  },
  methods: {
    updateQuestionTitle(questionUpdated) {
      const question = this.findQuestionById(questionUpdated.id)
      question.title = questionUpdated.title
    },

    updateQuestionAnswers(questionUpdated) {
      const question = this.findQuestionById(questionUpdated.id)
      question.answers = questionUpdated.answers
    },

    findQuestionById(id) {
      return this.questions.find(quest => quest.id === id)
    },

    addQuestion() {
      this.questions.push({
        id: this.getNextQuestionId(),
        title: '',
        answers: [
          {
            id: 1, value: 'Yes'
          }, {
            id: 2, value: 'No'
          }
        ],
        questionAlert: {}
      })
    },

    getNextQuestionId() {
      return this.questions[this.questions.length - 1].id + 1
    },

    removeQuestion(id) {
      const questionIndex = this.questions.findIndex(question => question.id === id)

      if (this.questions.length > 1) {
        return this.questions.splice(questionIndex, 1)
      }
      
      const question = this.questions[questionIndex]
      question.questionAlert = {
        show: true,
        message: 'The form must have at least one question',
        variant: 'danger'
      }
    }
  },
}
</script>

<style scoped>
.form-create-header {
  margin-block: 1rem;
}

.form-create-header >>> .card-body {
  gap: 1rem;
}

.form-questions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

footer {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>