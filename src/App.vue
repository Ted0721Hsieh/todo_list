<template>
    <BContainer id="input-block">
        <BRow>
            <BCol >
                <BForm @submit="onSubmit" >
                    <BInputGroup >
                        <BFormInput v-model="todoMsg" placeholder="請輸入待辦事項" />
                        <BButton type="submit" variant="primary">加入</BButton>
                    </BInputGroup>
                </BForm>
            </BCol>
        </BRow>
    </BContainer>
    <hr>
    <todo v-for="(item, key) in todoList" 
        :key="item.id" 
        :seq="item.id"
        :msg="item.msg"
        :finish="item.finish"
    />
</template>

<script lang="ts">
import Todo from './components/Todo.vue'
import { mapState} from 'pinia'
import { useTodoStore } from './store/todo';

export default{
    components:{
        Todo
    },
    
    data(){
        return{
            count: 1,
            todoMsg: "",
        }
    },
    methods:{
        /** 新增待辦*/
        onSubmit(){
            console.log("msg: "+this.todoMsg);
            this.todoList.push({
                id: this.count++,
                msg: this.todoMsg,
                finish: false
            });
            this.todoMsg = '';
        }
    },
    computed: {
        ...mapState(useTodoStore, ['todoList']),
    }
}
</script>

