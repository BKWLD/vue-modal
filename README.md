# Vue Modal

A component that renders a modal window with slotted content. Includes trapped tabbing for ADA compliance

## Props

* `closable`: prevent the user from closing the modal (like for an age gate)
* `type`: Adds a `.type-*` class to `.bvm-slot` for styling the modal.  Default is "standard", which is a generic modal.  See `index.vue` for included styles.
* `removeOnClose`: Default is true.  If true, VueModal will destroy itself when closed.  If false, it animates out and renders nothing, and can be destroyed by calling its `destroy` method.
* `openOnMount`: Default is true.  If true, VueModal will animate open when mounted.  If false, it mounts but renders nothing, and must be opened by calling its `open` method.
* `transition`: (string) Name of the transition on the `.bvm-slot` element.  Default is "slide-up".
* `bkgTransition`: (string) Name of the transition on the `.bvm-background` element.  Default is "fade".

## Events

* `open`: Emitted when the modal opens (at the transition start)
* `close`: When the modal closes (at the transition start)
* `afterLeave`: When the modal close transition has finished
* `destroyed`: Emitted right before the modal destroys itself (when `removeOnClose` is true)

## MountOnBody Function

Use this function to add VueModal to the page. 

MountOnBody is an async function that:
* Mounts a component appended to the end of the document body
* Returns a ref of the component

The arguments are:
* `component`: The Vue component to be mounted
* `options`: Options object, with a `propsData` property, which is the props object to be passed to your component.

Usage: 
```coffee
import mountOnBody from '@bkwld/vue-modal/helpers'
import WelcomeModal from './welcome-modal.vue'
@welcomeModalRef = await mountOnBody WelcomeModal, propsData: modalTitle: "Hello world"
```

## VueModal Component

Make your own Modal component, using VueModal to wrap your modal contents.  

Example with all options:

```pug
vue-modal.welcome-modal(
	
	//- Ref so you can call component methods:
	//- open, close, destroy
	ref='modal'
	
	//- Props
	:closeable='true'
	:open-on-mount='true'
	:remove-on-close='true'
	transition='slide-up'
	type='compact'
	
	//- Events
	@open='onOpen'
	@close='onClose'
	@after-leave='afterLeave'
	@destroyed='destroyed')

	//- Default slot
	//- Slot props: open (function), close (function), isOpen (boolean)
	template(#default='{ open, close, isOpen }')
		
		h2 This modal is {{ isOpen ? 'open' : 'closed' }}
		
		button(@click='close') Close modal
```

## Usage (Open on mount)

welcome-modal.vue
```pug
vue-modal(@destroyed='destroyed')
	template(#default='{close}')
		h2 {{ modalTitle }}
		button(@click='close') Close modal
```
```coffee
import VueModal from '@bkwld/vue-modal'
import '@bkwld/vue-modal/index.css'
export default
	components: { VueModal }
	props: modalTitle: String
	methods: 
		destroyed: -> @$destroy()
```

home.vue
```pug
	h2 Homepage
	button(@click='openModal') Open modal
```
```coffee
import mountOnBody from '@bkwld/vue-modal/helpers'
export default
	data: -> modalTitle: 'Welcome to our website!'
	methods:
		openModal: -> await mountOnBody WelcomeModal, propsData: modalTitle: @modalTitle
```


## Usage (Don't open on mount, don't remove on close)

welcome-modal.vue
```pug
vue-modal(
	ref='modal'
	:open-on-mount='false'
	:remove-on-close='false')
	template(#default='{close}')
		h2 {{ modalTitle }}
		button(@click='close') Close modal
```
```coffee
import VueModal from '@bkwld/vue-modal'
import '@bkwld/vue-modal/index.css'
export default
	components: { VueModal }
	props: modalTitle: String
	methods:
		open: -> @$refs.modal.open()
		close: -> @$refs.modal.close()
```

home.vue
```pug
	h2 Homepage
	button(@click='openModal') Open modal
```
```coffee
import mountOnBody from '@bkwld/vue-modal/helpers'
export default
	data: -> modalTitle: 'Welcome to our website!'
	mounted: ->
		@welcomeModalRef = await mountOnBody WelcomeModal, propsData: modalTitle: @modalTitle
	methods:
		openModal: -> @welcomeModalRef.open()
```

## To-Do
- video support & document
- document trap focus for acessibility
