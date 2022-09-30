const path = require('path');
const router = require('express').Router();

router.get('/signin', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/public/pages/signin/signin.html'));
});

module.exports = router;