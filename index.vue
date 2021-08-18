<template lang='pug'>

//- Don't need aria hidden because this is a mount on body
.modal(ref='modal' tabindex='-1' role='dialog' id='modal' aria-modal='true')

	//- Backdrop
	transition(name='fade' appear): .background(v-if='open')
	.background-hitbox(v-if='closeable' @click='close')

	//- Container of the slotted contnet
	transition(appear @after-leave='remove'): .slot(
		v-if='open'
		:class='`type-${type}`')

		//- Close icon
		button.close(aria-label='Close' @click='close' v-if='closeable')
			.icon-close

		//- The flex-centered contents
		.contents(ref='scrollable')

			//- Slotted in content
			slot

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
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

	data: ->
		open: true
		focusableElements: null
		focusableContent: null
		lastFocusableElement: null

	mounted: ->
		disableBodyScroll @$refs.scrollable
		setTimeout @setupTrapFocus, 0
		
	methods:

		# Remove the modal
		close: -> 
			document.removeEventListener 'keydown', @onKeyDown
			enableBodyScroll @$refs.scrollable
			@open = false

		# Remove it after the transition ends
		remove: ->
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

<style lang='stylus' scoped>
@import '~bukwild-stylus-library/index.styl'

.modal
	position fixed
	top 0
	left 0
	width 100%
	height 100%
	z-index 20
	display flex
	align-items center
	justify-content center
	padding 50px

// Background color
.background
	top 0
	left 0
	width 100%
	height 100%
	position absolute
	background rgba(grey, .8)

// Captures clicks if enabled
.background-hitbox
	top 0
	left 0
	width 100%
	height 100%
	position absolute

// The box the slot is rendered in
.slot

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
		padding 90px
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

.contents
	overflow auto

// Close icon
.close
	color white
	position absolute
	fluid right, 50, 10
	fluid top, 50, 10

	.icon
		font-size 20px

	// Slight hover
	transition color .3s

</style>
