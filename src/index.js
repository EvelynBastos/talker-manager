const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const tokenGenerate = require('./utils/token');
const authLogin = require('./middlewares/authLogin');
const authPass = require('./middlewares/authPass');

const talkerF = path.resolve(__dirname, './talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await fs.readFile(talkerF, 'utf-8');
  const talkersJson = JSON.parse(talkers);

  res.status(HTTP_OK_STATUS).json(talkersJson);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await fs.readFile(talkerF, 'utf-8');
  const talkersJson = JSON.parse(talkers);

  const talker = talkersJson.find((talk) => talk.id === Number(req.params.id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', authLogin, authPass, (_req, res) => {
  const token = tokenGenerate();

  res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
