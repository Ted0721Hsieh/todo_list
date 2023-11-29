import { defineStore } from 'pinia';

interface Todo {
    id: number;
    msg: string;
    finish: boolean;
}

export const useTodoStore = defineStore('todo', {
    state: () => {
        return {
            todoList: <Todo[]>[]
        };
    },
    actions: {
        deleteTodo(id: number) {
            console.log("delete id: " + id);

            for(var index in this.todoList){
                if(this.todoList[index].id == id){
                    this.todoList.splice(index, 1);
                }
            } 
            console.log(this.todoList);
        },
        updateTodo(id: number, msg: string) {
            console.log("update id: " + id);
            console.log("update msg: " + msg);

            for(var index in this.todoList){
                if(this.todoList[index].id == id){
                    this.todoList[index].msg = msg;
                }
            }
        },
        finishTodo(id: number, finish: boolean) {
            console.log("finish id: " + id);

            for(var index in this.todoList){
                if(this.todoList[index].id == id){
                    this.todoList[index].finish = finish;
                }
            }
        }
    }
});