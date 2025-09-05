curl -H 'Content-Type: application/json' \
      -d '{ "title":"foo","body":"bar", "id": 1}' \
      -X POST http://localhost:3000/api/todos/updateTodoStatus