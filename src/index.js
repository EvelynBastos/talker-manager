const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const tokenGenerate = require('./utils/token');
const authLogin = require('./middlewares/authLogin');
const authPass = require('./middlewares/authPass');
const authToken = require('./utils/authToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateRate = require('./middlewares/validateRate');
const validateWatchedAt = require('./middlewares/validateWatchedAt');

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

app.post('/talker',
  authToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt, async (req, res) => {
    const talkers = await fs.readFile(talkerF, 'utf-8');
    const talkersJson = JSON.parse(talkers);
    const { name, age, talk } = req.body;
    const newTalker = { id: talkersJson.length + 1, name, age, talk };
    talkersJson.push(newTalker);
    await fs.writeFile(talkerF, JSON.stringify(talkersJson));
    res.status(201).json(newTalker);
  });

app.put('/talker/:id',
  authToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt, async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await fs.readFile(talkerF, 'utf-8');
    const talkersJson = JSON.parse(talkers);
    const talkerIndex = talkersJson.find((talker) => talker.id === +id);
    if (!talkerIndex) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    talkerIndex.name = name;
    talkerIndex.age = age;
    talkerIndex.talk = talk;
    const newTalker = JSON.stringify(talkersJson);
    await fs.writeFile(talkerF, newTalker);
    res.status(200).json(talkerIndex);
  });

app.delete('/talker/:id', authToken, async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await fs.readFile(talkerF, 'utf-8');
  const positionTalker = JSON.parse(talkers);
  const index = positionTalker.findIndex((talk) => talk.id === +id);
  positionTalker.splice(index, 1);
  const newTalkers = JSON.stringify(positionTalker);
  await fs.writeFile(talkerF, newTalkers);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
