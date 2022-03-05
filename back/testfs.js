const fs = require('fs');

fs.rm('./images/image1646410471249.jpg', () => {
    console.log('remove success');
})