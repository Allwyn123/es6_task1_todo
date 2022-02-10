/****** create list start ******/
function addCookie() {
    let list_data = {"list":[]};
    document.cookie = 'todo='+ JSON.stringify(list_data);
}

const todo_list = document.querySelector(".todo_list");

// -------- todo obj --------
let todo_obj = "none";
let create_obj = () => {
    let cookie_arr = document.cookie.split("; ");
    let todo_avaiable = false;
    let cookie_data = "";
    cookie_arr.forEach(e => {
        cookie_data = e.split("=");
        if(cookie_data[0] == "todo") {
            todo_avaiable = true;
        }
        else {
            todo_avaiable = false;
        }
    });

    if(todo_avaiable) {
        todo_obj = JSON.parse(cookie_data[1]);
        load_list_data();
    }
}
create_obj();
// -------- todo obj end --------

// -------- load list data --------
if(todo_obj == "none") {
    todo_list.innerHTML = "";
}

function load_list_data() {
    todo_list.innerHTML = "";

    for(let i = 0; i < todo_obj.list.length; i++) {
        function set_attribute(element, attribute) {
            Object.keys(attribute).forEach(e => {
                element.setAttribute(e, attribute[e]);
            });
        }

        let input_element = document.createElement("input");
        let input_attribute = {
            type: "checkbox",
            id: `list ${todo_obj.list[i].id}`,
            name: "list",
            class: "list_checkbox",
        }
        set_attribute(input_element, input_attribute);

        let label_element = document.createElement("label");
        label_element.innerHTML = todo_obj.list[i].content;
        label_element.setAttribute("class","list_content");

        let icon_element = document.createElement("a");
        icon_element.innerHTML = "Edit";
        let icon_attribute = {
            href: "#FIXME",
            class: "list_edit",
            title: "Edit",
        }
        set_attribute(icon_element, icon_attribute);

        let form_group_div = document.createElement("div");
        form_group_div.setAttribute("class","form_group");
        form_group_div.appendChild(input_element);
        form_group_div.appendChild(label_element);
        form_group_div.appendChild(icon_element);
        
        let a_element =  document.createElement("a");
        a_element.setAttribute("href","#FIXME");
        a_element.setAttribute("title","close");
        a_element.innerHTML = "Close";
        
        let form_controller_div = document.createElement("div");
        form_controller_div.setAttribute("class","form_controller");
        form_controller_div.appendChild(a_element);

        let li_element = document.createElement("li");
        li_element.appendChild(form_group_div);
        li_element.appendChild(form_controller_div);
        todo_list.appendChild(li_element);

        if(todo_obj.list[i].checked == true) {
            input_element.checked = true;
            label_element.classList.add("strike");
        }
        else {
            input_element.checked = false;
            label_element.classList.remove("strike");
        }
    }
}
//--------- load list data end ----------

//------------ new list data start ------------
const create_btn = document.querySelector("a[title='create']");
const input_text = document.querySelector(".input_text");

create_btn.addEventListener("click", () => {
    if(input_text.value != "" ) {
        if(todo_obj == "none") {
            addCookie();
            create_obj();
        }

        let list_length = todo_obj.list.length;
        let new_list_data = "";

        if(list_length == 0) {
            new_list_data = { "id":list_length, "content":input_text.value, "checked":false };
        }
        else {
            new_list_data = { "id":todo_obj.list[list_length-1].id+1, "content":input_text.value, "checked":false };
        }

        todo_obj.list.push(new_list_data);
        document.cookie = `todo=${JSON.stringify(todo_obj)}`;
        load_list_data();
        input_text.value = "";
        document.location.reload();
    }
    else {
        let error_message = document.querySelector(".error_message");
        error_message.classList.add("display");
    }
});
//------------ new list data end ------------

// -------- checkbox functions start -------
const list_checkbox_list = document.querySelectorAll(".list_checkbox");
const list_content_list = document.querySelectorAll(".list_content");

list_checkbox_list.forEach((e,index) => {
    e.addEventListener("click", () => {
        let checkbox_index = index;
        if(e.checked) {
            list_content_list[checkbox_index].classList.add("strike");
            todo_obj.list[checkbox_index].checked = true;
            document.cookie = `todo=${JSON.stringify(todo_obj)}`;
        }
        else {
            list_content_list[checkbox_index].classList.remove("strike");
            todo_obj.list[checkbox_index].checked = false;
            document.cookie = `todo=${JSON.stringify(todo_obj)}`;
        }
    });
    
});
// -------- checkbox functions end -------

// --------- edit content function start ----------
const list_edit = document.querySelectorAll(".list_edit");
const edit_panel = document.querySelector(".edit_panel"); 
const overlay = document.querySelector(".overlay");
const edit_text = document.querySelector(".edit_text");
const add_btn = document.querySelector(".add_btn");
const edit_error_message = document.querySelector(".edit_error_message");

list_edit.forEach((e,list_index) => {
    e.addEventListener("click", () => {
        edit_panel.classList.add("display");
        edit_text.value = todo_obj.list[list_index].content;

        add_btn.addEventListener("click", () => {
            if(edit_text.value != "") {
                todo_obj.list[list_index].content = edit_text.value;
                document.cookie = `todo=${JSON.stringify(todo_obj)}`;
                load_list_data();
                document.location.reload();
            }
            else if(edit_text.value == "") {
                edit_error_message.classList.add("display");
            }
        });
    });
});

overlay.addEventListener("click", () => {
    edit_panel.classList.remove("display");
});

// --------- edit content function end ----------

class list_class{
    constructor(){
        this.data_obj = todo_obj;
    }
}

export let class_collect = list_class;
export let function_collect = load_list_data;

/****** create list end ******/
