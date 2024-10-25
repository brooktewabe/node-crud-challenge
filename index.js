const express = require('express');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/person', personRoutes);

// 404 Handler for non-existing routes
app.use((req, res, next) => {
    res.status(404).json({
        message: "Not Found",  // Custom message for 404 error
        requestedUrl: req.originalUrl
    });
});

if (require.main === module) {
    app.listen(3000, () => console.log('Server is running on port 3000'));
}

module.exports = app;
