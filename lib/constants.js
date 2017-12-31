module.exports.API_BASE_URL = 'https://client-api.8slp.net/v1'
module.exports.headers = {  'Host': 'client-api.8slp.net',
                            'Content-Type': 'application/json',
                            'API-Key': 'api-key',
                            'Application-Id': 'morphy-app-id',
                            'Connection': 'keep-alive',
                            'User-Agent' : 'Eight%20AppStore/11 CFNetwork/808.2.16 Darwin/16.3.0',
                            'Accept-Language': 'en-gb',
                            'Accept-Encoding': 'gzip, deflate',
                            'Accept': '*/*',
                            'app-Version': '1.10.0'}

module.exports.loginPath = '/login'
module.exports.myDevicesPath = '/users/me'

module.exports.devicesQueryBase = '/devices/'
module.exports.deviceQuery = '?offlineView=true'
module.exports.ownerQuery = '?filter=ownerId,leftUserId,rightUserId'