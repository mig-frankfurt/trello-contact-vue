export default {
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
    create () {
      if (this.nameIsEmpty || this.mailIsEmpty || this.categoryIsEmpty || this.titleIsEmpty || this.inquiryIsEmpty) {
        this.validation.allFields.areValid = false
        return
      }

      if (!this.mailIsValid(this.formData.mail)) {
        this.validation.email.isValid = false
        return
      }
      
      // TODO: EMIT TO PARENT!
      this.$emit('create')
    },
    
    reset () {
      this.formData = {
        name: '',
        mail: '',
        contactData: '',
        category: '',
        title: '',
        inquiry: ''
      }
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
