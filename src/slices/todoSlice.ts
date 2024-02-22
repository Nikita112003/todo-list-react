import { createSlice } from "@reduxjs/toolkit";

const api = 'http://localhost:3000/'

const nextIndexResponse = await fetch(api + 'nextIndex/');
const valueResponse = await fetch(api + 'todos/');

const nextIndex = await nextIndexResponse.json();
const value = await valueResponse.json();

interface Todo {
    id: string,
    name: string,
    description: string,
    mark: boolean,
    done: boolean
}
const initialState: {value: Record<string, Todo>, nextIndex: string} = {
    value: Object.fromEntries(value.map((elem: Todo) => [elem.id, elem])),
    nextIndex: nextIndex.value
}

const todoSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        create: (state, action) => {
            let [index, name, description] = action.payload;
            const todo: Todo = {
                id: index,
                name: name,
                description: description,
                mark: false,
                done: false
            }
            state.value[index] = todo;
            state.nextIndex = (+state.nextIndex + 1).toString()

            fetch(api + 'todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });
            fetch(api + 'nextIndex/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({value: state.nextIndex})
            });
        },
        change: (state, action) => {
            let [index, name, description] = action.payload;
            state.value[index].name = name;
            state.value[index].description = description;
            fetch(api + `todos/${index}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state.value[index])
            })
        },
        mark: (state, action) => {
            let index = action.payload;
            state.value[index].mark = !state.value[index].mark;
            fetch(api + `todos/${index}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state.value[index])
            })
        },
        done: (state, action) => {
            let index = action.payload;
            state.value[index].done = !state.value[index].done;
            fetch(api + `todos/${index}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state.value[index])
            })
        },
        remove: (state, action) => {
            let index = action.payload;
            delete state.value[index]
            fetch(api + `todos/${index}`, {
                method: 'DELETE'
            })
        }
    } 
});

export const { create, change, mark, done, remove } = todoSlice.actions;
export default todoSlice.reducer;