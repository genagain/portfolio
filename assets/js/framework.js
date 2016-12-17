import bigwheel from 'bigwheel'

/* ----------
create our framework instance
see https://github.com/bigwheel-framework/documentation/blob/master/quickstart.md#bigwheel-quick-start
---------- */
module.exports = bigwheel((done) => {
	done({
		// https://github.com/bigwheel-framework/documentation/blob/master/misc.md#overlap
		overlap: true,
		// https://github.com/bigwheel-framework/documentation/blob/master/routes-special.md#initsection
		initSection: require('./sections/preloader'),
		routes: require('./routes')
	})
})
