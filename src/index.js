import fastify from 'fastify';
import view from '@fastify/view';
import pug from 'pug';  // https://pugjs.org/api/getting-started.html
import sanitize from 'sanitize-html';
import fastifyWebSocket from 'fastify-websocket';

const app = fastify();
const port = 3000;



// Регистрируем плагин для работы с WebSocket
app.register(fastifyWebSocket);



// Обработчик для WebSocket
app.get('/chat', { websocket: true }, (connection, request) => {
  connection.on('message', message => {
    console.log('Сообщение от клиента:', message);
    connection.send(`Вы написали: ${message}`);
  });
});



// Подключаем pug через плагин
//await app.register(view, { engine: { pug } });


// app.get('/users', (req, res) => {
//   res.send('GET /users');
// });

// app.post('/users', (req, res) => {
//   res.send('POST /users');
// });




// Обработчик GET-запроса по адресу /borsy
app.get('/borsy', (req, res) => {
  // Получаем параметр name из запроса
  const name = req.query;

  // Если name есть в запросе, приветствуем пользователя по имени, иначе - "Hello, World!"
  //const greeting = name ? `Hello, ${name}!` : 'Hello, World!';
  
  // Отправляем приветствие как ответ
  res.send(name);
});



// Обработчик GET-запроса по адресу /hello
app.get('/hello', (req, res) => {
  // Получаем параметр name из запроса
  const name = req.query.name;

  // Если name есть в запросе, приветствуем пользователя по имени, иначе - "Hello, World!"
  const greeting = name ? `Hello, ${name}!` : 'Hello, World!';
  
  // Отправляем приветствие как ответ
  res.send(greeting);
});






// app.get('/', (req, res) => {
//   res.type('html');
//   res.send('<h1>Hello World!</h1>');
// });



const state = {
  users: [
    {
      id: 1,
      name: 'user',
    },
  ],
};

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = state.users.find((user) => user.id === parseInt(id));
  if (!user) {
    res.code(404).send({ message: 'User not found' });
  } else {
    res.send(user);
  }
});



app.get('/courses/:courseId/lessons/:id', (req, res) => {
  res.send(`Course ID: ${req.params.courseId}; Lesson ID: ${req.params.id}`);
});


//app.get('/', (req, res) => res.view('src/views/index'));


// http://localhost:3000/users/%3Cscript%3Ealert('attack!')%3B%3C%2Fscript%3E
// http://localhost:3000/users/&lt;script&gt;alert('attack!');&lt;/script&gt;
/*
app.get('/users/:id', (req, res) => {
  const escapedId = sanitize(req.params.id);
  res.type('html');
  res.send(`<h1>${escapedId}</h1>`);
});
*/



// app.get('/', (req, res) => {
//   res.view('src/views/index');



//   const term = req.query.term;
//    if (term !== null) {

//    } else {

//    }
// console.log(term);
//   const data = { term: state.courses };

//   res.view('src/views/index', data);



// });



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







