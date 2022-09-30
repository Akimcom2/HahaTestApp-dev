const path = require('path');
const router = require('express').Router();

router.get('/exchange', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/public/pages/exchange/exchange.html'))
});

module.exports = router;