import domselect from 'dom-select'

const config = {

	BASE: '/',

	body: document.body,
	view: domselect('main'),

	width: window.innerWidth,
	height: window.innerHeight,

  infos: null,

	commandHistory: []
}

export default config
