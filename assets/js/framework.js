import bigwheel from 'bigwheel'

module.exports = bigwheel((done) => {
	done({
		overlap: true,
		initSection: require('./sections/preloader'),
		routes: require('./routes')
	})
})
