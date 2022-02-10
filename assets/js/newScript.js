import * as mod from "./script.js";

let class_obj = new mod.class_collect();
let todo_obj = class_obj.data_obj;
let load_list_data = mod.function_collect;

// --------- clear button event start ----------
const close_btn_list = document.querySelectorAll("a[title='close']");
close_btn_list.forEach((e,index) => {
    e.addEventListener("click",() => {
        let close_btn_index = index;
        todo_obj.list.splice(close_btn_index,1);
        document.cookie = `todo=${JSON.stringify(todo_obj)}`;
        
        load_list_data();
        document.location.reload();
    });
});
// --------- clear button event end ----------