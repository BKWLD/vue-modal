import Vue from 'vue'

# Mount a component on the body, like a modal, and return the mounted component
# instance. The "component" argument should be a Vue component instance, like
# returned from importing a single file component.
export default mountOnBody = (component, options = {}) ->
	appendMount document.body, component, options

export appendMount = (element, component, options = {}) ->
	mountInside element, component, options, true

# Mount a component within an element
export mountInside = (
	element,
	component,
	options = {},
	append = true) -> new Promise (resolve) ->

	# Set default options
	unless options.parent then options.parent = window.$nuxt?.$root

	# Mount the component
	attachMethod = if append then 'appendChild' else 'prepend'
	mount = ->
		vm = new (Vue.extend component)(options)
		vm.$mount()
		element[attachMethod](vm.$el)
		resolve vm
	if window.$nuxt then mount() else wait 50, mount
