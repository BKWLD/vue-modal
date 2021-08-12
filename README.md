# Vue Modal
A component that renders a modal window with slotted content. Includes trapped tabbing for ADA compliance

## Props
`closable`: prevent the user from closing the modal (like for an age gate)
`type`: Default is standard, which is a generic modal

## To-Do
- video 
- fix the styles, import stylus library, basic dried up styles for layout and functionality
- document trap tab for ada


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