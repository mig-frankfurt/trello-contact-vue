<template>
  <div id="bulma">
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
            <div v-show="showAdditionalContactData" class="field">
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
                    <button class="button is-primary" @click.prevent="create()">{{ submitButtonText }}</button>
                </p>
                <p class="control">
                    <button class="button is-link" @click.prevent="reset()">{{ resetButtonText }}</button>
                </p>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
  import PropertiesMixin from '../mixins/PropertiesMixin'
  import UIFrameworkMixin from '../mixins/UIFrameworkMixin'

  export default {
    name: 'BulmaForm',

    mixins: [
      PropertiesMixin,
      UIFrameworkMixin
    ]
  }
</script>

<style scoped>
  
</style>
