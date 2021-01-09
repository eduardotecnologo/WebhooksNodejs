const express = require('express');
const bodyParser = require('body-parser');
const webhooks = require('node-webhooks');

const app = express();

const hooks = new webhooks({
    db: {
        'callback_hook': ['http://localhost:9000/cb']
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    hooks.trigger('callback_hook', {
        msg: 'success trigged'
    });
    return res.status(200).send('Webhook trigged');
});
app.post('/cb', (req, res) => {
    console.log('Inside callback hooks', req.body);
    return res.stat(200).end();
});

app.listen(9000, () => console.log(`Express has been started`));