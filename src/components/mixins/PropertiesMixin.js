export default {
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

    // Visibility of fields
    showAdditionalContactData: {
      type: Boolean,
      required: false,
      default: true
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

    // Card Title Template
    cardTitleTemplate: {
      type: String,
      required: false,
      default: '{title}'
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
  }
}
