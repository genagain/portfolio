import framework from 'framework'
import domselect from 'dom-select'
import utils from 'utils'

utils.biggie.addRoutingEL(domselect.all('nav a'))

framework.init()
