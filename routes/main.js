const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/public/pages/main/index.html'))
});

module.exports = router;