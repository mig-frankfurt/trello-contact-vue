<template>
    <div id="trello-form">
        <div v-show="state.finished" class="notification is-success" :class="{ 'is-success': !state.withError, 'is-danger': state.withError }">
            <div v-if="!state.withError">
                {{ successText }}<br>
                <a href=".">{{ redoText }}</a>
            </div>
            <div v-if="state.withError">
                {{ failText }} <br>
                => <i>{{ state.errorMessage }}</i>
            </div>
        </div>
        <form v-show="!state.finished" action="" autocomplete="off">
            <!-- Name -->
            <div class="field">
                <label class="label">{{ labelNameText }} <span class="required">*</span></label>
                <p class="control">
                    <input class="input" type="text" :placeholder="placeholderNameText" v-model="formData.name">
                </p>
            </div>

            <!-- E-Mail -->
            <div class="field">
                <label class="label">{{ labelMailText }} <span class="required">*</span></label>
                <p class="control">
                    <input class="input" type="email" :placeholder="placeholderMailText" v-model="formData.mail">
                </p>
            </div>

            <!-- More Contact Data -->
            <div class="field">
                <label class="label">{{ labelContactDataText }} (optional)</label>
                <p class="control">
                    <textarea class="textarea" :placeholder="placeholderContactDataText" v-model="formData.contactData"></textarea>
                </p>
            </div>

            <!-- Category -->
            <div class="field">
                <label class="label">{{ labelCategoryText }} <span class="required">*</span></label>
                <p class="control">
            <span class="select">
              <select v-model="formData.category">
                <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
              </select>
            </span>
                </p>
            </div>

            <!-- Short title -->
            <div class="field">
                <label class="label">{{ labelTitleText }} <span class="required">*</span></label>
                <p class="control">
                    <input class="input" type="text" :placeholder="placeholderTitleText" v-model="formData.title">
                </p>
            </div>

            <!-- What can we do for you? -->
            <div class="field">
                <label class="label">{{ labelDetailsText }} <span class="required">*</span></label>
                <p class="control">
                    <textarea class="textarea area-height-l" :placeholder="placeholderDetailsText" v-model="formData.inquiry"></textarea>
                </p>
            </div>

            <!-- Buttons -->
            <div class="field is-grouped">
                <p class="control">
                    <button class="button is-primary" @click.prevent="createCard()">{{ submitButtonText }}</button>
                </p>
                <p class="control">
                    <button class="button is-link" @click.prevent="resetForm()">{{ resetButtonText }}</button>
                </p>
            </div>
        </form>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
      name: 'trello-contact-form',

      props: {
        oauthKey: {
          type: String,
          required: true
        },

        boardId: {
          type: String,
          required: true
        },

        cssFramework: {
          type: String,
          required: false,
          default: 'bulma'
        },

        successText: {
          type: String,
          required: false,
          default: 'Thank you! We have received your message.'
        },

        failText: {
          type: String,
          required: false,
          default: 'Looks that something went wrong. Try again!'
        },

        redoText: {
          type: String,
          required: false,
          default: 'Do you want to add another ticket?'
        },

        // Labels
        labelNameText: {
          type: String,
          required: false,
          default: 'Your name'
        },

        labelMailText: {
          type: String,
          required: false,
          default: 'Your e-mail'
        },

        labelContactDataText: {
          type: String,
          required: false,
          default: 'Additional contact data'
        },

        labelCategoryText: {
          type: String,
          required: false,
          default: 'Category'
        },

        labelTitleText: {
          type: String,
          required: false,
          default: 'Title'
        },

        labelDetailsText: {
          type: String,
          required: false,
          default: 'Details'
        },

        // Placeholder
        placeholderNameText: {
          type: String,
          required: false,
          default: 'e.g. John Doe'
        },

        placeholderMailText: {
          type: String,
          required: false,
          default: 'e.g. jdoe@mail.fake'
        },

        placeholderContactDataText: {
          type: String,
          required: false,
          default: 'Additional Contact Data'
        },

        placeholderTitleText: {
          type: String,
          required: false,
          default: 'e.g. Help with problem XYZ'
        },

        placeholderDetailsText: {
          type: String,
          required: false,
          default: 'Describe your problem as detailed as you can'
        },

        // Buttons
        submitButtonText: {
          type: String,
          required: false,
          default: 'Submit'
        },

        resetButtonText: {
          type: String,
          required: false,
          default: 'Reset'
        }
      },

      mounted () {
        // Set token
        localStorage.setItem('trello_token', this.oauthKey)

        // Authorize to Trello
        // eslint-disable-next-line no-undef
        Trello.authorize({
          type: 'popup',
          name: 'Getting Started Application',
          scope: {
            read: 'true',
            write: 'true' },
          expiration: 'never',
          interactive: false,
          success: this.authenticationSuccess,
          error: this.authenticationFailure
        })

        // Set Categories
        // eslint-disable-next-line no-undef
        Trello.get('/boards/' + this.boardId + '/labels', (response) => {
          _(response)
            .reject((label) => {
              return label.name === ''
            })
            .map((label) => {
              this.categories.push({ name: label.name, id: label.id, color: label.color })
            }).value()
        }, () => {
          this.finishWithError('Could not retrieve label names')
        })

        // Get the destination list
        // eslint-disable-next-line no-undef
        Trello.get('/boards/' + this.boardId + '/lists', (response) => {
          this.listId = _(response).first().id
        }, () => {
          this.finishWithError('Could not retrieve list id')
        })
      },

      data () {
        return {
          state: {
            finished: false,
            withError: false,
            errorMessage: ''
          },
          listId: '',
          categories: [],
          formData: {
            name: '',
            mail: '',
            contactData: '',
            category: '',
            title: '',
            inquiry: ''
          }
        }
      },

      computed: {
        nameIsEmpty () {
          return this.formData.name === ''
        },

        mailIsEmpty () {
          return this.formData.mail === ''
        },

        categoryIsEmpty () {
          return this.formData.category === ''
        },

        titleIsEmpty () {
          return this.formData.title === ''
        },

        inquiryIsEmpty () {
          return this.formData.inquiry === ''
        }
      },

      methods: {
        createCard () {
          if (this.nameIsEmpty || this.mailIsEmpty || this.categoryIsEmpty || this.titleIsEmpty || this.inquiryIsEmpty) {
            return
          }

          // Create Description
          let description = '**Name:** ' + this.formData.name + '\n**E-Mail:** ' + this.formData.mail + '\n\n\n**Beschreibung**\n' + this.formData.inquiry
          if (this.formData.contactData !== '') {
            description += '\n\n\n**Weitere Kontaktdaten**\n' + this.formData.contactData
          }

          // Build card
          let card = {
            name: this.formData.title,
            desc: description,
            pos: 'bottom',
            idList: this.listId,
            idLabels: [this.formData.category]
          }

          // Send card to Trello
          // eslint-disable-next-line no-undef
          Trello.post('/cards/', card, () => {
            console.log('Card was sent')
            this.finishWithoutError()
          }, () => {
            console.log('Error sending card ...')
            this.finishWithError('Could not sent message to Trello')
          })
        },

        resetForm () {
          this.formData = {
            name: '',
            mail: '',
            contactData: '',
            category: '',
            title: '',
            inquiry: ''
          }
        },

        authenticationSuccess () {
          console.log('OK!')
        },

        authenticationFailure () {
          console.log('Error when trying to authenticate to Trello.')
          this.finishWithError('Could not authenticate to Trello')
        },

        finishWithError (error) {
          this.state.finished = true
          this.state.withError = true
          this.state.errorMessage = error
        },

        finishWithoutError () {
          this.state.finished = true
          this.state.withError = false
        }
      }
    }
</script>

<style scoped>
    .area-height-l {
        min-height: 250px;
    }
</style>
