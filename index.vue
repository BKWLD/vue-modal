<template lang='pug'>

.bvm-modal(ref='modal' tabindex='-1' role='dialog' id='modal' aria-modal='true')

	//- Backdrop
	transition(:name='bkgTransition' appear): .bvm-background(v-if='isOpen')
	.bvm-background-hitbox(v-if='isOpen && closeable' @click='close')

	//- Container of the slotted contnet
	transition(:name='transition' appear @after-leave='remove'): .bvm-slot(
		v-if='isOpen'
		:class='`type-${type}`')

		//- Close icon
		button.bvm-close(aria-label='Close' @click='close' v-if='closeable' role='button')
			.icon-close(aria-hidden='true')

		//- The flex-centered contents
		.bvm-contents(ref='scrollable')

			//- Slotted in content
			slot

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
# 

export default

	name: 'VueModal'

	props:
		
		type:
			type: String
			default: 'compact'
		
		closeable:
			type: Boolean
			default: true
		
		removeOnClose:
			type: Boolean
		# Whether the modal is open by default
		openOnMount:
			type: Boolean
			default: true

		transition:
			type: String
			default: 'slide-up'

		bkgTransition:
			type: String
			default: 'fade'

	data: ->
		isOpen: @openOnMount
		focusableElements: null
		focusableContent: null
		lastFocusableElement: null

	mounted: ->

		# NUXT SPECIFIC: Add aria-hidden to the nuxt el
		# reason: this is a sibling of the mounted component
		# adding aria hidden whilst the modal is open allows
		# ios voiceover to only read the contents of the modal
		# when the modal is closed, we'll remove this hidden attr
		# https://stackoverflow.com/questions/53561764/trap-focus-with-in-popup-modal-only-ios-voiceover
		nuxt = document.querySelector('#__nuxt')
		nuxt.setAttribute 'aria-hidden', 'true'

		# disable the body scrolling
		disableBodyScroll @$refs.scrollable

		# establish a trap focus within the modal
		setTimeout @setupTrapFocus, 0
		
	methods:

		# Remove the modal
		close: -> 

			# remove the key press listener
			document.removeEventListener 'keydown', @onKeyDown

			# remove the scroll locks
			clearAllBodyScrollLocks()

			# NUXT SPECIFIC: remove aria hidden attribute
			nuxt = document.querySelector('#__nuxt')
			nuxt.removeAttribute 'aria-hidden', 'false'

			# tell others about it's closing
			@$emit('close')

			# set open to false
			@open = false

		# Remove it after the transition ends
		remove: ->
			if !@removeOnClose then return
			@$destroy()
			@$el.remove()

		setupTrapFocus: ->
			@modal = @$refs.modal
			@focusableElements = 'button, [href], input, [tabindex]:not([tabindex="-1"])'
			@firstFocusableElement = @modal.querySelectorAll(@focusableElements)[0]
			@focusableContent = @modal.querySelectorAll @focusableElements
			@lastFocusableElement = @focusableContent[@focusableContent.length - 1]

			# if fodus elements found, then add listener
			# and focus the first one
			if @focusableContent.length
				document.addEventListener 'keydown', @onKeyDown
				@firstFocusableElement.focus()

		onKeyDown: (e) ->
			isTabPressed = e.key == 'Tab' or e.keyCode == 9
			return if !isTabPressed
			if e.shiftKey
				if document.activeElement == @firstFocusableElement
					@lastFocusableElement.focus()
					e.preventDefault()
			else
				if document.activeElement == @lastFocusableElement
					@firstFocusableElement.focus()
					e.preventDefault()

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus'>
@import '~bukwild-stylus-library/index.styl'

.bvm-modal
	position fixed
	top 0
	left 0
	width 100%
	height 100%
	z-index 20
	display flex
	align-items center
	justify-content center
	fluid padding, 50, 30

// Background color
.bvm-background
	top 0
	left 0
	width 100%
	height 100%
	position absolute
	background rgba(grey, .8)

// Captures clicks if enabled
.bvm-background-hitbox
	top 0
	left 0
	width 100%
	height 100%
	position absolute

// The box the slot is rendered in
.bvm-slot

	// Overlap the background
	position relative

	// Apply layout styling
	&.type-video
		background white
		width 100%
		max-width 600px

		.contents
			padding-top 56.25%
			background white

		.close
			fluid right, 0, 0
			fluid top, -40, -30

	&.type-standard
		background white
		width 100%
		max-width 600px
		text-align center

	// Slide in and up
	&.v-enter-active
		transition opacity .3s, transform 1.5s ease-out-quint
	&.v-enter
		opacity 0
		transform translateY(40px)
	&.v-leave-active
		transition opacity .5s, transform .5s ease-in
	&.v-leave-to
		opacity 0
		transform scale(0.9)

.bvm-contents
	overflow auto

// Close icon
.bvm-close
	color white
	position absolute
	fluid right, 50, 10
	fluid top, 50, 10

	.icon
		font-size 20px

	// Slight hover
	transition color .3s

// Scope the built-in transitions to the modal so we don`t
// override any project transitions
.bvm-slot, .bvm-background

	// "Slide Up" Transition
	&.slide-up-enter-active
		transition opacity .3s, transform 1.5s ease-out-quint
	&.slide-up-enter
		opacity 0
		transform translateY(40px)
	&.slide-up-leave-active
		transition opacity .5s, transform .5s ease-in
	&.slide-up-leave-to
		opacity 0
		transform scale(0.9) translateY(20px)

	// "Scale" Transition
	&.scale-enter-active
		transition opacity .2s, transform .5s ease-out-circ
	&.scale-enter
		opacity 0
		transform scale(0.9)
	&.scale-leave-active
		transition opacity .5s, transform .5s ease-in
	&.scale-leave-to
		opacity 0
		transform scale(0.9)

	// "Fade" Transition (opacity fade)
	&.fade-enter-active, .fade-leave-active
		transition opacity .2s

	&.fade-enter-to, &.fade-leave // In state
		opacity 1

	&.fade-enter, &.fade-leave-to // Out state
		opacity 0

</style>
