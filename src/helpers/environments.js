let APIURL = ''

switch(window.location.hostname){
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break
    case 'photolinkclient.herokuapp.com':
        APIURL = 'https://photolinkserver.herokuapp.com'

}

export default APIURL