import fastify from 'fastify';
import view from '@fastify/view';
import pug from 'pug';

const app = fastify();
const port = 3000;

// Подключаем pug через плагин
await app.register(view, { engine: { pug } });

/*
app.get('/', (req, res) => {
  res.type('html');
  res.send('<h1>Hello World!</h1>');
});
*/

app.get('/', (req, res) => res.view('src/views/index'));











/*
const state = {
  courses: [
    {
      id: 1,
      title: 'JS: Массивы',
      description: 'Курс про массивы в JavaScript',
    },
    {
      id: 2,
      title: 'JS: Функции',
      description: 'Курс про функции в JavaScript',
    },
  ],
};

app.get('/courses/:id', (req, res) => {
  const { id } = req.params
  const course = state.courses.find(({ id: courseId }) => courseId === parseInt(id));
  if (!course) {
    res.code(404).send({ message: 'Course not found' });
    return;
  }
  const data = {
    course,
  };
  res.view('src/views/courses/show', data);
});

app.get('/courses', (req, res) => {
  const data = {
    courses: state.courses,
  };
  res.view('src/views/courses/index', data);
});
*/
app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`);
});
