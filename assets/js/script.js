/****** create list start ******/
function addCookie(){
    let list_data = {"list":[]};
    // console.log(list_data);
    document.cookie = 'todo='+ JSON.stringify(list_data);
    // document.cookie = "gogo="+ JSON.stringify(list_data);
    // console.log(document.cookie);
    // console.log("--------------");
};
// if(document.)
// addCookie();


//todo obj 
let todo_obj = "";
function create_obj(){
    let cookie_arr = document.cookie.split("; ");
    let todo_avaiable = false;
    let cookie_data = "";
    cookie_arr.forEach(e => {
        cookie_data = e.split("=");
        if(cookie_data[0]=="todo") {
            todo_avaiable = true;
        }
        else {
            todo_avaiable = false;
        }
    });

    if(todo_avaiable) {
        todo_obj = JSON.parse(cookie_data[1]);
    }
    else {
        addCookie();
        create_obj();
    }
}
create_obj();
console.log(todo_obj);
//todo obj end

// -------- load list data --------
function load_list_data(){
    console.log("load function");
    const todo_list = document.querySelector(".todo_list");
    const todo_list_li = document.querySelectorAll(".todo_list li");
    
    todo_list.innerHTML = "";
    // todo_list_li.forEach(function(e){
    // });

    console.log(todo_obj.list.length);
    for(let i=0; i< todo_obj.list.length; i++){
        function set_attribute(element, attribute){
            Object.keys(attribute).forEach(e =>{
                element.setAttribute(e, attribute[e]);
            });
        }

        let input_element = document.createElement("input");
        let input_attribute = {
            type: "checkbox",
            id: "list"+todo_obj.list[i].id,
            name: "list",
            class: "list_checkbox",
        }
        set_attribute(input_element, input_attribute);

        let label_element = document.createElement("label");
        label_element.innerHTML = todo_obj.list[i].content;
        label_element.setAttribute("for","list"+todo_obj.list[i].id);
        label_element.setAttribute("class","list_content");

        let form_group_div = document.createElement("div");
        form_group_div.setAttribute("class","form_group");
        form_group_div.appendChild(input_element);
        form_group_div.appendChild(label_element);
        
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
console.log(todo_obj);
load_list_data();
//--------- load list data end ----------

//------------ new list data start ------------
const create_btn = document.querySelector("a[title='create']");
const input_text = document.querySelector(".input_text");

create_btn.addEventListener("click", ()=>{
    if(input_text.value != "" ){
        let list_length = todo_obj.list.length;
        let new_list_data = "";

        if(list_length == 0) {
            new_list_data = {"id":list_length,"content":input_text.value,"checked":false};
        }
        else {
            new_list_data = {"id":todo_obj.list[list_length-1].id+1,"content":input_text.value,"checked":false};
        }

        todo_obj.list.push(new_list_data);
        document.cookie = 'todo='+ JSON.stringify(todo_obj);
        load_list_data();
        input_text.value = "";
        // document.location.reload();
    }
    else{
        let error_message = document.querySelector(".error_message");
        error_message.classList.add("display");
    }
});
//------------ new list data end ------------

// -------- checkbox functions start -------
const list_checkbox_list = document.querySelectorAll(".list_checkbox");
const list_content_list = document.querySelectorAll(".list_content");

// function checkbox_click(){
    list_checkbox_list.forEach((e,index) => {
        console.log(e); //comment
        e.addEventListener("click", (e1)=>{
            e1.stopPropagation();
            console.log(index);
            // console.log("checbox"); //comment
            let checkbox_index = Array.prototype.indexOf.call(list_checkbox_list, e);
            // if(list_content_list[checkbox_index].className == "list_content"){
            if(e.checked){
                list_content_list[checkbox_index].classList.add("strike");
                todo_obj.list[checkbox_index].checked = true;
                document.cookie = "todo="+JSON.stringify(todo_obj);
                // checkbox_click();
            }
            else{
                list_content_list[checkbox_index].classList.remove("strike");
                todo_obj.list[checkbox_index].checked = false;
                document.cookie = "todo="+JSON.stringify(todo_obj);
                // checkbox_click();
            }
            console.log(todo_obj); //comment
        });
        
    });
// }
// checkbox_click();
// -------- checkbox functions end -------

// --------- clear button event start ----------
const close_btn_list = document.querySelectorAll("a[title='close']");
close_btn_list.forEach((e,index) => {
    e.addEventListener("click",()=>{
        // close_btn_index = Array.prototype.indexOf.call(close_btn_list, e);
        close_btn_index = index;
        todo_obj.list.splice(close_btn_index,1);
        document.cookie = "todo="+JSON.stringify(todo_obj);
        
        load_list_data();
        console.log("complete");
        // console.log("load complete"); //comment 
        // checkbox_click();
        // document.location.reload();
    });
    console.log("for each end");//comment
    // console.log(e); //comment
});
console.log("end");//comment
// --------- clear button event end ----------

/****** create list end ******/
