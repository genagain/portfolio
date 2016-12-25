import queryDom from 'query-dom-components'
import domselect from 'dom-select'

const config = {

	BASE: '/',

	body: document.body,
	view: domselect('main'),
	dom: queryDom({ el: document.body }),

	width: window.innerWidth,
	height: window.innerHeight,

	infos: null,

	direction: 'next',

	hist: []
}

export default config
