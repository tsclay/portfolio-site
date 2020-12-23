import {writable} from 'svelte/store'

const windowWidth = writable(window.innerWidth)
const windowHeight = writable(window.innerHeight)

export {windowWidth, windowHeight}