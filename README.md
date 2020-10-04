# mqtt-eight-sleep-bridge

This is a simple docker container that I use to bridge to/from my MQTT bridge.

I have a collection of bridges, and the general format of these begins with these environment variables:

```yaml
      TOPIC_PREFIX: /your_topic_prefix  (eg: /some_topic_prefix/somthing)
      MQTT_HOST: YOUR_MQTT_URL (eg: mqtt://mqtt.yourdomain.net)
      (OPTIONAL) MQTT_USER: YOUR_MQTT_USERNAME
      (OPTIONAL) MQTT_PASS: YOUR_MQTT_PASSWORD
```

Here's an example docker compose:

```yaml
version: '3.3'
services:
  mqtt-eight-sleep-bridge:
    image: terafin/mqtt-eight-sleep-bridge:latest
    environment:
      LOGGING_NAME: mqtt-eight-sleep-bridge
      TZ: YOUR_TIMEZONE (eg: America/Los_Angeles)
      TOPIC_PREFIX: /your_topic_prefix  (eg: /eight)
      USERNAME: YOUR_EIGHT_SLEEP_USERNAME,
      PASSWORD: YOUR_EIGHT_SLEEP_PASSWORD,
      MQTT_HOST: YOUR_MQTT_URL (eg: mqtt://mqtt.yourdomain.net)
      (OPTIONAL) MQTT_USER: YOUR_MQTT_USERNAME
      (OPTIONAL) MQTT_PASS: YOUR_MQTT_PASSWORD
      (OPTIONAL) HEALTH_CHECK_PORT: "3001"
      (OPTIONAL) HEALTH_CHECK_TIME: "120"
      (OPTIONAL) HEALTH_CHECK_URL: /healthcheck
```

Here's an example publish for my setup:

```log
/test/eight/deviceid "**REDACTED**"
/test/eight/ownerid "**REDACTED**"
/test/eight/priming false
/test/eight/lastlowwater "2020-09-24T02:17:16.539Z"
/test/eight/lastprime "2020-09-24T02:17:58.112Z"
/test/eight/needspriming false
/test/eight/haswater true
/test/eight/ledbrightnesslevel 100
/test/eight/sensorinfo {"label":"**REDACTED**","partNumber":"20600","sku":"0002","hwRevision":"C03","serialNumber":"**REDACTED**","lastConnected":"2020-10-04T18:11:44.610Z","skuName":"king","connected":true}
/test/eight/hubinfo "20500-0001-A07-00003A5A"
/test/eight/timezone "America/Los_Angeles"
/test/eight/location **REDACTED**
/test/eight/mattressinfo {"firstUsedDate":null,"eightMattress":null,"brand":null}
/test/eight/firmwarecommit "efa8205"
/test/eight/firmwareversion "2.3.24.0"
/test/eight/firmwareupdated true
/test/eight/firmwareupdating false
/test/eight/lastfirmwareupdatestart "1970-01-01T00:00:00.000+00:00"
/test/eight/lastheard "2020-10-04T18:11:59.609Z"
/test/eight/online true
/test/eight/features ["warming","cooling"]
/test/eight/left/nowheating false
/test/eight/left/present false
/test/eight/left/heatinglevel -55
/test/eight/left/userid **REDACTED**
/test/eight/left/heatingduration 0
/test/eight/left/targetheatinglevel 0
/test/eight/right/nowheating false
/test/eight/right/present false
/test/eight/right/heatinglevel -57
/test/eight/right/userid **REDACTED**
/test/eight/right/heatingduration 0
/test/eight/right/targetheatinglevel 0

```
