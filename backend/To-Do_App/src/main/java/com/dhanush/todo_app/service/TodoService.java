package com.dhanush.todo_app.service;

import com.dhanush.todo_app.model.Todo;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

public interface TodoService {

    List<Todo> getAllTodos();

    Todo createTodo(Todo todo);

    Todo updateTodo(Long id, Todo updatedTodo);

    void deleteTodo(Long id);
}
