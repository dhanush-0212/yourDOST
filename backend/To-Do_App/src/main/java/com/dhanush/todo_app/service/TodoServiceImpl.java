package com.dhanush.todo_app.service;

import com.dhanush.todo_app.model.Todo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TodoServiceImpl implements TodoService {

    private final Map<Long, Todo> todos = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    @Override
    public List<Todo> getAllTodos() {
        return new ArrayList<>(todos.values());
    }

    @Override
    public Todo createTodo(Todo todo) {
        Long id = idCounter.getAndIncrement();
        todo.setId(id);
        todo.setCreatedAt(LocalDateTime.now());
        todo.setUpdatedAt(LocalDateTime.now());
        todos.put(id, todo);
        return todo;
    }

    @Override
    public Todo updateTodo(Long id, Todo updatedTodo) {
        Todo existing = todos.get(id);
        if (existing == null) {
            throw new NoSuchElementException("Todo with id " + id + " not found");
        }

        if (updatedTodo.getTitle() != null) existing.setTitle(updatedTodo.getTitle());
        if (updatedTodo.getDescription() != null) existing.setDescription(updatedTodo.getDescription());
        if (updatedTodo.getCompleted() != null) existing.setCompleted(updatedTodo.getCompleted());

        existing.setUpdatedAt(LocalDateTime.now());
        todos.put(id, existing);
        return existing;
    }

    @Override
    public void deleteTodo(Long id) {
        if (!todos.containsKey(id)) {
            throw new NoSuchElementException("Todo with id " + id + " not found");
        }
        todos.remove(id);
    }
}
