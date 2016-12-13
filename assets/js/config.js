import domselect from 'dom-select'
import DLL from './lib/doubly-linked-list'

const config = {

	BASE: '/',

	body: document.body,
	view: domselect('main'),

	width: window.innerWidth,
	height: window.innerHeight,

  infos: null,

	hist: []
}

export default config
