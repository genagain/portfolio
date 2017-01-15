import config from 'config'

module.exports = {
	[`${config.BASE}`]: require('./sections/home'),
	[`${config.BASE}home`]: { section: require('./sections/home') },
	[`${config.BASE}project/:id`]: { section: require('./sections/section'), duplicate: true },
	'404': `${config.BASE}`
}
