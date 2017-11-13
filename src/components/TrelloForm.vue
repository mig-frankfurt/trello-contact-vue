<template>
    <div id="trello-form">
        <div v-show="state.finished" class="notification is-success" :class="{ 'is-success': !state.withError, 'is-danger': state.withError }">
            <div v-if="!state.withError">
                {{ successText }}<br>
                <a :href="reloadUrl">{{ redoText }}</a>
            </div>
            <div v-if="state.withError">
                {{ failText }} <br>
                => <i>{{ state.errorMessage }}</i>
            </div>
        </div>
        <div v-show="!validation.allFields.areValid" class="notification is-danger">
            {{ validationEmptyText }}
        </div>
        <form v-show="!state.finished" action="" autocomplete="off">
            <!-- Name -->
            <div class="field">
                <label class="label">{{ labelNameText }} <span class="required">*</span></label>
                <p class="control">
                    <input class="input" type="text" :placeholder="placeholderNameText" v-model="formData.name" @change="undoValidation('empty')">
                </p>
            </div>

            <!-- E-Mail -->
            <div class="field">
                <label class="label" :class="{ 'has-icons-right': !validation.email.isValid }">{{ labelMailText }} <span class="required">*</span></label>
                <p class="control" :class="{ 'has-icons-right': !validation.email.isValid }">
                    <input class="input" :class="{ 'is-danger': !validation.email.isValid }" type="email" :placeholder="placeholderMailText" v-model="formData.mail" @change="undoValidation('mail')">
                    <span v-show="!validation.email.isValid" class="icon is-small is-right">
                      <i class="fa fa-warning"></i>
                    </span>
                </p>
                <p v-show="!validation.email.isValid" class="help is-danger">{{ validationMailText }}</p>
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
                      <select v-model="formData.category" @change="undoValidation('empty')">
                        <option v-for="(c, idx) in categories" :key="idx" :value="c.id">{{ c.name }}</option>
                      </select>
                    </span>
                </p>
            </div>

            <!-- Short title -->
            <div class="field">
                <label class="label">{{ labelTitleText }} <span class="required">*</span></label>
                <p class="control">
                    <input class="input" type="text" :placeholder="placeholderTitleText" v-model="formData.title" @change="undoValidation('empty')">
                </p>
            </div>

            <!-- What can we do for you? -->
            <div class="field">
                <label class="label">{{ labelDetailsText }} <span class="required">*</span></label>
                <p class="control">
                    <textarea class="textarea area-height-l" :placeholder="placeholderDetailsText" v-model="formData.inquiry" @change="undoValidation('empty')"></textarea>
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

        validationEmptyText: {
          type: String,
          required: false,
          default: 'Please fill out every required input field'
        },

        validationMailText: {
          type: String,
          required: false,
          default: 'This email is invalid'
        },
        
        // Headers in Trello
        headerName: {
          type: String,
          required: false,
          default: 'Name'
        },
        
        headerEMail: {
          type: String,
          required: false,
          default: 'E-Mail'
        },
        
        headerDescription: {
          type: String,
          required: false,
          default: 'Description'
        },
        
        headerAdditionalContactData: {
          type: String,
          required: false,
          default: 'Additional Contact Data'
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
        },
        
        // Reload URL
        reloadUrl: {
          type: String,
          required: false,
          default: () => window.location.href
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
          // Gather named labels
          _(response)
            .reject((label) => {
              return label.name === ''
            })
            .sortBy((label) => label.name.toLowerCase())
            .map((label) => {
              this.categories.push({ name: label.name, id: label.id, color: label.color })
            })
            .value()
        }, () => {
          this.finishWithError('Could not retrieve label names')
        })

        // Get the destination list
        // eslint-disable-next-line no-undef
        Trello.get('/boards/' + this.boardId + '/lists', (response) => {
          let firstList = _(response).first()
          
          if (firstList !== undefined) {
            this.listId = firstList.id
          } else {
            this.finishWithError('There is no list on board available. Please create one in Trello first.')
          }
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
          },
          validation: {
            email: {
              isValid: true
            },
            allFields: {
              areValid: true
            }
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
            this.validation.allFields.areValid = false
            return
          }

          if (!this.mailIsValid(this.formData.mail)) {
            this.validation.email.isValid = false
            return
          }

          // Create Description
          let description = `**${this.headerName}:** ${this.formData.name}\n**${this.headerEMail}:** ${this.formData.mail}\n\n\n**${this.headerDescription}:**\n${this.formData.inquiry}`
          if (this.formData.contactData !== '') {
            description += `\n\n\n**${this.headerAdditionalContactData}:**\n${this.formData.contactData}`
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
        },

        mailIsValid (mail) {
          let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          return re.test(mail)
        },

        undoValidation (field) {
          switch (field) {
            case 'empty':
              this.validation.allFields.areValid = true
              break
            case 'mail':
              this.validation.email.isValid = true
              this.validation.allFields.areValid = true
          }
        }
      }
    }
</script>

<style scoped>
    .area-height-l {
        min-height: 250px;
    }
</style>
