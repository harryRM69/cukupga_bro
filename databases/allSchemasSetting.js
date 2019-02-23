import Realm from 'realm';
export const TODOLIST_SCHEMA_SETTING = "TodoList_Setting";
export const TODO_SCHEMA_SETTING = "Todo_Setting";
// Define your models and their properties
export const TodoSchema_Setting = {
    name: TODO_SCHEMA_SETTING,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        selectBtnSettingSeorang: { type: 'string', indexed: true },
        done: { type: 'bool', default: false },
    }
};
export const TodoListSchema_Setting = {
    name: TODOLIST_SCHEMA_SETTING,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        selectBtnSettingSeorang:'string',
        selectBtnSettingAman:'string',
        amountSetting:'string',
        todos_Setting: { type: 'list', objectType: TODO_SCHEMA_SETTING },
    }
};
const databaseOptions_Setting = {
    path: 'todoListApp_Setting.realm',
    schema: [TodoListSchema_Setting, TodoSchema_Setting],
    schemaVersion: 0, //optional    
};
//functions for TodoLists
export const insertNewTodoList_Setting = newTodoList_Setting => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions_Setting).then(realm => {
        realm.write(() => {
            realm.create(TODOLIST_SCHEMA_SETTING, newTodoList_Setting);
            resolve(newTodoList_Setting);
        });
    }).catch((error) => reject(error));
});
export const updateTodoList_Setting = todoList_Setting => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions_Setting).then(realm => {        
        realm.write(() => {
            let updatingTodoList_Setting = realm.objectForPrimaryKey(TODOLIST_SCHEMA_SETTING, todoList_Setting.id);   
            updatingTodoList_Setting.name = todoList_Setting.name;    
            resolve();     
        });
    }).catch((error) => reject(error));;
});

export const queryAllTodoLists_Setting = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions_Setting).then(realm => {        
        let allTodoLists_Setting = realm.objects(TODOLIST_SCHEMA_SETTING);
        resolve(allTodoLists_Setting);  
    }).catch((error) => {        
        reject(error);  
    });;
});
export default new Realm(databaseOptions_Setting);