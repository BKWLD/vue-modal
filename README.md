# Vue Modal
A component that renders a modal window with slotted content. Includes trapped tabbing for ADA compliance

## Props
`closable`: prevent the user from closing the modal (like for an age gate)
`type`: Default is standard, which is a generic modal
`removeOnClose`: Wether or not the modal destroys itself on close. Defaluts to *false*

## Events
`close`: Emitted when the modal closes

## To-Do
- video support & document
- document trap focus for acessibility

## Usage

```javascript
// Add component (example in global plugins)
import 'vue-modal/index.css'
Vue.component('modal', require('vue-modal'))
```

```pug

modal(ref='modal' :closeable='false' type='standard')
	transition(name='fade')
		div
			h2 Modal Content

```