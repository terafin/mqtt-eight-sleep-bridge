// Requirements
const mqtt = require('mqtt')
const _ = require('lodash')
const logging = require('homeautomation-js-lib/logging.js')
const health = require('homeautomation-js-lib/health.js')
const eight = require('./lib/eight_sleep.js')
const mqtt_helpers = require('homeautomation-js-lib/mqtt_helpers.js')

const username = process.env.USERNAME
const password = process.env.PASSWORD
var pollTime = process.env.POLL_FREQUENCY

if ( _.isNil(pollTime) ) {
	pollTime = 5
}

var shouldRetain = process.env.MQTT_RETAIN

if (_.isNil(shouldRetain)) {
	shouldRetain = true
}

var mqttOptions = {}

if (!_.isNil(shouldRetain)) {
	mqttOptions['retain'] = shouldRetain
}

// Config
const baseTopic = process.env.SLEEP_TOPIC

if (_.isNil(baseTopic)) {
	logging.warn('SLEEP_TOPIC not set, not starting')
	process.abort()
}

var connectedEvent = function() {
	health.healthyEvent()
}

var disconnectedEvent = function() {
	health.unhealthyEvent()
}

// Setup MQTT
var client = mqtt_helpers.setupClient(connectedEvent, disconnectedEvent)

eight.start(username, password, pollTime)

eight.on('updated', (result) => {
	logging.debug('eight updated')
	if (_.isNil(result)) { 
		return 
	}
    
	Object.keys(result).forEach(key => {
		const value = result[key]
		logging.debug('   base: ' + key + ': ' + value)
		var topic = baseTopic + '/' + key

		client.smartPublish(topic, JSON.stringify(value).toString(), mqttOptions)
	})
})

eight.on('user-updated', (user) => {
	logging.debug('user updated: ' + user.name())

	var topic = baseTopic + '/' + user.name() + '/'

	client.smartPublish(topic + 'nowHeating', user.nowHeating().toString(), mqttOptions)
	client.smartPublish(topic + 'present', user.present().toString(), mqttOptions)
	client.smartPublish(topic + 'heatingLevel', user.heatingLevel().toString(), mqttOptions)
	client.smartPublish(topic + 'userId', user.userId().toString(), mqttOptions)
	client.smartPublish(topic + 'heatingDuration', user.heatingDuration().toString(), mqttOptions)
	client.smartPublish(topic + 'targetHeatingLevel', user.targetHeatingLevel().toString(), mqttOptions)
	client.smartPublish(topic + 'presenceEnd', user.presenceEnd().toString(), mqttOptions)
	client.smartPublish(topic + 'presenceStart', user.presenceStart().toString(), mqttOptions)

})

