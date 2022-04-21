const path = require('path');
const fs = require('fs')

module.exports = (on, config) => {
    on('after:screenshot', (details) => {
        var str = details.path
        var new_path = str.replace(/[a-z-]+\.spec\.js/, '')
        var new_dir  = path.dirname(new_path)
        fs.mkdirSync(new_dir, { recursive: true })
        fs.renameSync(details.path, new_path)
        return { path: new_path }
    })
}
