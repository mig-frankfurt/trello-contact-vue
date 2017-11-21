<template>
  <div id="bootstrap3">
    <div v-show="state.finished" class="alert" :class="{ 'alert-success': !state.withError, 'alert-danger': state.withError }">
            <div v-if="!state.withError">
                {{ successText }}<br>
                <a :href="reloadUrl">{{ redoText }}</a>
            </div>
            <div v-if="state.withError">
                {{ failText }} <br>
                => <i>{{ state.errorMessage }}</i>
            </div>
        </div>
        <div v-show="!validation.allFields.areValid" class="alert alert-danger" role="alert">
            {{ validationEmptyText }}
        </div>
        <form v-show="!state.finished" action="" autocomplete="off">
            <!-- Name -->
            <div class="form-group">
                <label for="nameInput">{{ labelNameText }} <span class="required">*</span></label>
                <input class="form-control" id="nameInput" type="text" :placeholder="placeholderNameText" v-model="formData.name" @change="undoValidation('empty')">
            </div>

            <!-- E-Mail -->
            <div class="form-group" :class="{ 'has-error': !validation.email.isValid, 'has-feedback': !validation.email.isValid }">
                <label for="emailInput" class="control-label">{{ labelMailText }} <span class="required">*</span></label>
                <input id="emailInput" class="form-control" :class="{ 'is-danger': !validation.email.isValid }" type="email" :placeholder="placeholderMailText" v-model="formData.mail" @change="undoValidation('mail')">
                <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                <p v-show="!validation.email.isValid" class="help-block">{{ validationMailText }}</p>
            </div>

            <!-- More Contact Data -->
            <div v-show="showAdditionalContactData" class="form-group">
                <label for="additionalContactDataInput">{{ labelContactDataText }} (optional)</label>
                <textarea class="form-control" id="additionalContactDataInput" :placeholder="placeholderContactDataText" v-model="formData.contactData"></textarea>
            </div>

            <!-- Category -->
            <div class="form-group">
              <label for="categoryInput">{{ labelCategoryText }} <span class="required">*</span></label>
              <select id="categoryInput" class="form-control" v-model="formData.category" @change="undoValidation('empty')">
                <option v-for="(c, idx) in categories" :key="idx" :value="c.id">{{ c.name }}</option>
              </select>
            </div>

            <!-- Short title -->
            <div class="form-group">
                <label for="titleInput">{{ labelTitleText }} <span class="required">*</span></label>
                <input class="form-control" id="titleInput" type="text" :placeholder="placeholderTitleText" v-model="formData.title" @change="undoValidation('empty')">
            </div>

            <!-- What can we do for you? -->
            <div class="form-group">
                <label for="detailsInput">{{ labelDetailsText }} <span class="required">*</span></label>
                <textarea class="form-control" id="detailsInput" :placeholder="placeholderDetailsText" v-model="formData.inquiry" @change="undoValidation('empty')"></textarea>
            </div>

            <!-- Buttons -->
            <div class="row">
                <div class="col-md-12">
                    <button type="button" class="btn btn-primary" @click.prevent="create()">{{ submitButtonText }}</button>
                    <button type="button" class="btn btn-default" @click.prevent="reset()">{{ resetButtonText }}</button>
                </div>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
  import PropertiesMixin from '../mixins/PropertiesMixin'
  import UIFrameworkMixin from '../mixins/UIFrameworkMixin'

  export default {
    name: 'Bootstrap3Form',

    mixins: [
      PropertiesMixin,
      UIFrameworkMixin
    ]
  }
</script>

<style scoped>
  
</style>
