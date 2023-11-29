<template>
    <div class="todo" :class="finishMark">
        <div class="todo-check" >
            <BFormCheckbox v-model="checked" @click="finishSubmit" v-show="!showEdit"/>
        </div>
        <div class="todo-msg" @dblclick.stop="editMsg">
            <div v-show="!showEdit">{{ msg }}</div>
            <BFormInput v-show="showEdit" v-model="newMsg" />
        </div>
        <div class="todo-btns">
            <!-- 刪除紐 -->
            <BButton variant="danger" @click.stop="deleteConfirm()" v-show="!showEdit">
                <IBitrash />
            </BButton>
            <!-- 儲存紐 -->
            <BButton variant="success" @click.stop="editSubmit" v-show="showEdit">
                <IBisave />
            </BButton>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'pinia'
import { useTodoStore } from '../store/todo';

export default {
    props: ['seq', 'msg', 'finish'],
    data() {
        return {
            showEdit: false,
            newMsg: "",
            checked: false,
        }
    },
    methods: {
        ...mapActions(useTodoStore, ['updateTodo', 'deleteTodo','finishTodo']),
        /** 編輯待辦*/
        editMsg() {
            if(this.checked){
                return;
            }

            this.showEdit = true;
            this.newMsg = this.msg;
        },
        /** 儲存編輯*/
        editSubmit() {
            console.log("new msg: " + this.newMsg);
            this.updateTodo(this.seq, this.newMsg);
            this.showEdit = false;
        },
        /** 勾選完成*/
        finishSubmit(){
            this.showEdit = false;
            this.finishTodo(this.seq, this.checked);
        },
        /** 刪除待辦*/
        deleteConfirm(){
            this.deleteTodo(this.seq);
        }
    },
    computed: {
        finishMark: function(){
            return this.checked ? 'finish-mark' : '';
        }
    },
    mounted(){
        this.checked = this.finish;
    }
}
</script>

<style scoped>
.todo {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #FDF7E4;
}

.todo-check {
    flex: 0 0 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.todo-msg {
    flex: 1;
    text-align: left;
    display: flex;
    justify-content: left;
    align-items: center;
    word-break: break-all;
}

.todo-btns {
    padding-left: 5px;
    flex: 0 0 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.finish-mark{
    background-color: lightgray;
}
</style>