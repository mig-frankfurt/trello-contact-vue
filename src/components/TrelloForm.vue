<template>
    <div id="trello-form">
      <div v-if="cssFramework === 'bulma'">
        <bulma-form ref="form"
          :oauth-key="oauthKey"
          :board-id="boardId"
          :css-framework="cssFramework"
          :success-text="successText"
          :fail-text="failText"
          :redo-text="redoText"
          :show-additional-contact-data="showAdditionalContactData"
          :label-name-text="labelNameText"
          :label-mail-text="labelMailText"
          :label-contact-data-text="labelContactDataText"
          :label-category-text="labelCategoryText"
          :label-title-text="labelTitleText"
          :label-details-text="labelDetailsText"
          :placeholder-name-text="placeholderNameText"
          :placeholder-mail-text="placeholderMailText"
          :placeholder-contact-data-text="placeholderContactDataText"
          :placeholder-title-text="placeholderTitleText"
          :placeholder-details-text="placeholderDetailsText"
          :validation-empty-text="validationEmptyText"
          :validation-mail-text="validationMailText"
          :card-title-template="cardTitleTemplate"
          :header-name="headerName"
          :header-e-mail="headerEMail"
          :header-additional-contact-data="headerAdditionalContactData"
          :submit-button-text="submitButtonText"
          :reset-button-text="resetButtonText"
          :reload-url="reloadUrl"
          @create="createCard()"
        ></bulma-form>
      </div>
      <div v-else-if="cssFramework === 'bootstrap3'">
        <bootstrap-3-form ref="form"
          :oauth-key="oauthKey"
          :board-id="boardId"
          :css-framework="cssFramework"
          :success-text="successText"
          :fail-text="failText"
          :redo-text="redoText"
          :show-additional-contact-data="showAdditionalContactData"
          :label-name-text="labelNameText"
          :label-mail-text="labelMailText"
          :label-contact-data-text="labelContactDataText"
          :label-category-text="labelCategoryText"
          :label-title-text="labelTitleText"
          :label-details-text="labelDetailsText"
          :placeholder-name-text="placeholderNameText"
          :placeholder-mail-text="placeholderMailText"
          :placeholder-contact-data-text="placeholderContactDataText"
          :placeholder-title-text="placeholderTitleText"
          :placeholder-details-text="placeholderDetailsText"
          :validation-empty-text="validationEmptyText"
          :validation-mail-text="validationMailText"
          :card-title-template="cardTitleTemplate"
          :header-name="headerName"
          :header-e-mail="headerEMail"
          :header-additional-contact-data="headerAdditionalContactData"
          :submit-button-text="submitButtonText"
          :reset-button-text="resetButtonText"
          :reload-url="reloadUrl"
          @create="createCard()"
        ></bootstrap-3-form>
      </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    import PropertiesMixin from './mixins/PropertiesMixin'
    import BulmaForm from './framework/BulmaForm'
    import Bootstrap3Form from './framework/Bootstrap3Form'

    export default {
      name: 'trello-contact-form',
      
      mixins: [
        PropertiesMixin
      ],
      
      components: {
        BulmaForm,
        Bootstrap3Form
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
              this.$refs.form.categories.push({ name: label.name, id: label.id, color: label.color })
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
            this.$refs.form.listId = firstList.id
          } else {
            this.finishWithError('There is no list on board available. Please create one in Trello first.')
          }
        }, () => {
          this.finishWithError('Could not retrieve list id')
        })
      },
      
      methods: {
        createCard () {
          // Create Description
          let description = `**${this.headerName}:** ${this.$refs.form.formData.name}\n**${this.headerEMail}:** ${this.$refs.form.formData.mail}\n\n\n**${this.headerDescription}:**\n${this.$refs.form.formData.inquiry}`
          if (this.showAdditionalContactData && this.$refs.form.formData.contactData !== '') {
            description += `\n\n\n**${this.headerAdditionalContactData}:**\n${this.$refs.form.formData.contactData}`
          }

          // Build card
          let card = {
            name: this.buildCardTitle(),
            desc: description,
            pos: 'bottom',
            idList: this.$refs.form.listId,
            idLabels: [this.$refs.form.formData.category]
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
        
        buildCardTitle () {
          let replaceables = {
            '{name}': this.$refs.form.formData.name,
            '{email}': this.$refs.form.formData.mail,
            '{contactData}': this.$refs.form.formData.contactData,
            '{category}': this.getCategoryName(this.$refs.form.formData.category),
            '{title}': this.$refs.form.formData.title,
            '{inquiry}': this.$refs.form.formData.inquiry,
            '{dateNumber}': this.generateDateNumber
          }
          
          let cardTitle = this.cardTitleTemplate
          for (let key in replaceables) {
            cardTitle = this.replacePlaceholder(cardTitle, key, replaceables[key])
          }
          
          return cardTitle
        },
        
        generateDateNumber () {
          let today = new Date()
          let ss = today.getSeconds()
          let MM = today.getMinutes()
          let HH = today.getHours()
          let dd = today.getDate()
          let mm = today.getMonth() + 1
          let yyyy = today.getFullYear()
          
          if (ss < 10) {
            ss = `0${ss}`
          }
          
          if (MM < 10) {
            MM = `0${MM}`
          }
          
          if (HH < 10) {
            HH = `0${HH}`
          }
          
          if (dd < 10) {
            dd = `0${dd}`
          }
          
          if (mm < 10) {
            mm = `0${mm}`
          }
          
          return `${yyyy}-${mm}-${dd}-${HH}${MM}${ss}`
        },
        
        replacePlaceholder (str, placeholder, replacer) {
          if (str.includes(placeholder)) {
            return str.replace(placeholder, replacer)
          }
          
          return str
        },
        
        getCategoryName (id) {
          return _.find(this.$refs.form.categories, (category) => category.id === id).name
        },

        authenticationSuccess () {
          console.log('OK!')
        },

        authenticationFailure () {
          console.log('Error when trying to authenticate to Trello.')
          this.finishWithError('Could not authenticate to Trello')
        },

        finishWithError (error) {
          this.$refs.form.state.finished = true
          this.$refs.form.state.withError = true
          this.$refs.form.state.errorMessage = error
        },

        finishWithoutError () {
          this.$refs.form.state.finished = true
          this.$refs.form.state.withError = false
        }
      }
    }
</script>

<style scoped>
    .area-height-l {
        min-height: 250px;
    }
</style>
