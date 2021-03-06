<template lang='pug'>

.bvm-modal(ref='modal' tabindex='-1' role='dialog' id='modal' aria-modal='true' v-if='isOpenOrAnimating')

	//- Backdrop
	transition(:name='bkgTransition' appear): .bvm-background(v-if='isOpen')
	.bvm-background-hitbox(v-if='isOpen && closeable' @click='close')

	//- Container of the slotted contnet
	transition(:name='transition' appear @after-leave='afterLeave'): .bvm-slot(
		v-if='isOpen'
		:class='`type-${type}`')

		//- Close icon
		button.bvm-close(aria-label='Close' @click='close' v-if='closeable' role='button')
			slot(name='close-button'): .icon-close(aria-hidden='true')

		//- The flex-centered contents
		.bvm-contents(ref='scrollable')

			//- Slotted content.  Pass the open and close methods, and isOpen boolean.
			slot(:open='open' :close='close' :is-open='isOpen')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default

	name: 'VueModal'

	props:
		
		# Add .type-* class for styling
		type:
			type: String
			default: 'compact'
		
		# Click outside the modal to close it
		closeable:
			type: Boolean
			default: true
		
		# Whether the modal is open by default
		openOnMount:
			type: Boolean
			default: true

		# Destroy this component when the modal closes
		removeOnClose:
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
		# Separate boolean. True when isOpen==true, when animating open, and animating closed.
		isOpenOrAnimating: @openOnMount
		focusableElements: null
		focusableContent: null
		lastFocusableElement: null

	mounted: -> @open() if @openOnMount
		
	methods:

		# Open the modal, setup listeners
		open: ->
			# NUXT SPECIFIC: Add aria-hidden to the nuxt element.
			# This is a sibling of the mounted component.
			# Adding aria-hidden whilst the modal is open allows
			# ios voiceover to only read the contents of the modal.
			# When the modal is closed, we'll remove this hidden attr.
			# https://stackoverflow.com/questions/53561764/trap-focus-with-in-popup-modal-only-ios-voiceover
			nuxt = document.querySelector('#__nuxt')
			nuxt.setAttribute 'aria-hidden', 'true'

			# Tell others about its opening
			@$emit('open')

			@isOpen = true
			@isOpenOrAnimating = true

			# Wait a tick before doing things that require refs
			setTimeout =>
				# Disable body scroll
				disableBodyScroll @$refs.scrollable

				# Establish a trap focus within the modal
				@setupTrapFocus
			, 0

		# Close the modal, clean up listeners
		close: -> 
			# remove the key press listener
			document.removeEventListener 'keydown', @onKeyDown

			# remove the scroll locks
			clearAllBodyScrollLocks()

			# NUXT SPECIFIC: Remove aria-hidden attribute
			nuxt = document.querySelector('#__nuxt')
			nuxt.removeAttribute 'aria-hidden', 'false'

			# Tell others about its closing
			@$emit('close')

			# set isOpen to false
			@isOpen = false

		# Called after the close transition ends
		afterLeave: ->
			@isOpenOrAnimating = false
			@$emit('afterLeave')
			return unless @removeOnClose
			@destroy()

		destroy: ->
			# Emit event so the parent component can do cleanup
			@$emit('destroyed')
			# Remove the element and destroy the component
			@$el.remove()
			@$destroy()

		setupTrapFocus: ->
			@modal = @$refs.modal
			@focusableElements = 'button, [href], input, [tabindex]:not([tabindex="-1"])'
			@firstFocusableElement = @modal.querySelectorAll(@focusableElements)[0]
			@focusableContent = @modal.querySelectorAll @focusableElements
			@lastFocusableElement = @focusableContent[@focusableContent.length - 1]

			# if focus elements found, then add listener
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
