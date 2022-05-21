import { mountOnBody } from './helpers'

# This function is intended to be imported by the user, and is what mounts the modal to the DOM.

export default mountVueModal = (component, options = {}) -> mountOnBody component, options