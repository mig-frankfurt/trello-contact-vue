# Trello Contact Vue [![npm (scoped)](https://img.shields.io/npm/v/@mig-frankfurt/trello-contact-vue.svg?style=flat-square)](https://www.npmjs.com/package/@mig-frankfurt/trello-contact-vue) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/mig-frankfurt/trello-contact-vue/blob/master/LICENSE.txt)

> Trello Contact Vue is a Vue.js library for transforming Trello into a ticket system without any hassle. You just import the library and add your Trello keys and your board id - thats it.

## Features

 - Can be imported into any Vue.js powered front end
 - Reads the board label names and add them as categories into the contact form
 - Displays all informations well-formatted in the description section (categories will be transformed to card labels)
 - All new cards will be added to the left list on the board
 - Supports following CSS Frameworks: Bulma *(more to come!)*

![](https://github.com/mig-frankfurt/trello-contact-vue/blob/master/readme/demonstration_small.gif?raw=true)

## Install

### Prequisites

 - [Vue.js](https://vuejs.org/) (`npm install vue`)
 - [Bulma](http://bulma.io)

### npm

```shell
$ npm install @mig-frankfurt/trello-contact-vue
```

### Register to your project

```js
import Vue from 'vue'
import TrelloContactVue from '@mig-frankfurt/trello-contact-vue'

Vue.component('trello-form', TrelloContactVue)
```

### Get your data from Trello
(Maybe you want to create a new Trello user for security reasons first.)
 1. Get your app-key: https://trello.com/app-key
 2. Reference Trello's client.js and add your app-key: `<script src="https://api.trello.com/1/client.js?key=[app-key]"></script>`
 3. Get your OAuth key (insert your app-key at the end!): https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=app-key
 4. Get your board id from URL: e.g. https://trello.com/b/board-id/board-name

### Examples

 - [Bulma](https://github.com/mig-frankfurt/trello-contact-vue/blob/master/examples/bulma.html)

## Documentation

### Minimal import

```html
<trello-form oauth-key="[oauth-key]" board-id="[board-id]"></trello-form>
```

### Properties

| Property | Type | Required | Default Value |
| -------- | ---- | -------- | ------------- |
| oauth-key | String | true | - |
| board-id | String | true | - |
| css-framework | String { 'bulma' } | false | 'bulma' |
| success-text | String | false | 'Thank you! We have received your message.' |
| fail-text | String | false | 'Looks that something went wrong. Try again!' |
| redo-text | String | false | 'Do you want to add another ticket?' |
| label-name-text | String | false | 'Your name' |
| label-mail-text | String | false | 'Your e-mail' |
| label-contact-data-text | String | false | 'Additional contact data' |
| label-category-text | String | false | 'Category' |
| label-title-text | String | false | 'Title' |
| label-details-text | String | false | 'Details' |
| placeholder-name-text | String | false | 'e.g. John Doe' |
| placeholder-mail-text | String | false | 'e.g. jdoe@mail.fake' |
| placeholder-contact-data-text | String | false | 'Additional Contact Data' |
| placeholder-title-text | String | false | 'e.g. Help with problem XYZ' |
| placeholder-details-text | String | false | 'Describe your problem as detailed as you can' |
| validation-empty-text | String | false | 'Please fill out every required input field' |
| validation-mail-text | String | false | 'This email is invalid' |
| submit-button-text | String | false | 'Submit' |
| reset-button-text | String | false | 'Reset' |
| reload-url | String | false | `window.location.href` |

### Full import

```html
<trello-form oauth-key="[oauth-key]"
             board-id="[board-id]"
             success-text="Vielen Dank! Wir haben Ihre Anfrage entgegengenommen."
             fail-text="Hoppla, da ist wohl etwas schief gelaufen. Versuchen Sie es nochmal."
             redo-text="Möchten Sie eine weitere Anfrage einreichen?"
             label-name-text="Ihr Name"
             label-mail-text="Ihre E-Mail"
             label-contact-data-text="Weitere Kontaktdaten"
             label-category-text="Kategorie"
             label-title-text="Kurzer Titel für die Anfrage"
             label-details-text="Wobei können wir Ihnen behilflich sein?"
             placeholder-name-text="z.B. Dr. John Doe"
             placeholder-mail-text="z.B. jdoe@mail.fake"
             placeholder-contact-data-text="Haus? Raumnummer? Telefonnummer?"
             placeholder-title-text="z.B. Hilfe beim Unwandeln von Patientendaten"
             placeholder-details-text="Beschreiben Sie ihr Problem kurz und prägnant"
             validation-empty-text="Bitte füllen Sie alle erforderlichen Felder aus"
             validation-mail-text="Diese E-Mail-Adresse ist ungültig"
             submit-button-text="Abschicken"
             reset-button-text="Zurücksetzen"
             reload-url="http://localhost:8080"
></trello-form>
```

## How to build (for developers only)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Developed by

Medical Informatics Group (MIG)\
University Hospital Frankfurt\
Theodor-Stern-Kai 7\
60590 Frankfurt\
[mig-frankfurt.de](https://www.mig-frankfurt.de/)

**Maintained by:** Patric Vormstein (vormstein@med.uni-frankfurt.de)

## License

MIT License

Copyright (c) 2017 Medical Informatics Group (MIG) Frankfurt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
