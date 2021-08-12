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
@import '~bukwild-stylus-library/index.styl'

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
		@$nextTick @setupTrapFocus

	beforeDestroy: ->
		document.removeEventListener 'keydown', @onKeyDown
		enableBodyScroll @$refs.scrollable

	methods:

		# Remove the modal
		close: -> @open = false

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

			console.log @firstFocusableElement, @focusableContent, @lastFocusableElement
			document.addEventListener 'keydown', @onKeyDown

			# focus the first one
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
	background rgba(red, .8)

// Captures clicks if enabled
.background-hitbox
	top 0
	left 0
	width 100%
	height 100%
	position absolute

// The box the slot is rendered in
.slot
	border 10px solid blue

	// Overlap the background
	position relative

	// Apply layout styling
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
	color red
	position absolute
	fluid right, 50, 10
	fluid top, 50, 10

	.icon
		font-size 20px
		border 1px solid red

	// Slight hover
	transition color .3s

	&:hover
		transition-duration .1s
		color darken(red, 20%)

</style>
