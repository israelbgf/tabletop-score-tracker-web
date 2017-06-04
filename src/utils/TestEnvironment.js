import injectTapEventPlugin from 'react-tap-event-plugin';
import jsdom from 'jsdom'

let alreadySetup = false

function setupTestEnvironment() {
    try {
        injectTapEventPlugin()
    } catch (e){
        // Already Injected
    }

    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
    global.window = global.document.defaultView

    alreadySetup = true
}

export default setupTestEnvironment