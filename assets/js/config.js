import queryDom from 'query-dom-components'
import domselect from 'dom-select'
import sniffer from 'sniffer'

const config = {

	BASE: '/',

	body: document.body,
	view: domselect('main'),
	dom: queryDom({ el: document.body }),

	width: window.innerWidth,
	height: window.innerHeight,

	infos: sniffer.getInfos(),

	direction: 'next',

	hist: []
}

export default config
