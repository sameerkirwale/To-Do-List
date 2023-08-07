// VARIABLE TO DISPLAY TO-DO LIST
const showTodoListElement = document.querySelector ('.js-show-todo-list');

// ARRAY FOR TO-DO LIST NAMES
let todoName = JSON.parse ( localStorage.getItem ('todoName') ) || [];

// ARRAY FOR TO-DO LIST DATES
let todoDate = JSON.parse ( localStorage.getItem ('todoDate') ) || [];

// DELETE BUTTON FOR TO-DO LIST ITEMS
const deleteButton =(i)=> {
    return (`<button id="css-delete-btn" class="css-btn" onclick="deleteTodo(${i})"> Delete </button>`);
} 

// EVENT LISTENER WHEN ADD BTN IS CLICKED
const addBtnEle = document.querySelector ('.js-add-btn');
addBtnEle.addEventListener ( 'click', addTodo );

const todoDateElement = document.querySelector ('.js-todo-date'); // INPUT DATE
const todoNameElement = document.querySelector ('.js-todo-name'); // INPUT NAME 

// FUNCTION TO DISPLAY TO-DO LIST
const renderTodoList =()=> {
    
    let html = ''; // VARIABLE FOR STORING HTML TO DISPLAY

    for ( let i = 0; i < todoName.length ; i ++ ) {
        const name = todoName [i];
        const date = todoDate [i];

        html += `<div class='display-todo'> ${name} </div> 
                    <div class='display-todo'> ${date} </div> 
                    ${deleteButton(i)}
                    <div class='display-todo'> 
                        <input type="checkbox" id="${i}"> 
                    </div>`;
    }

    showTodoListElement.innerHTML = `${html}` ;

    todoNameElement.value = todoDateElement.value = ''; // EMPTY THE INPUT FIELDS
}

// CALLED HERE TO LOAD ANY ITEMS IN LOCALSTORAGE
renderTodoList();

// FUNCTION TO ADD A TO-DO ITEM IN LIST
function addTodo() {

    if ((todoNameElement.value === null && todoDateElement.value !== null) || (todoNameElement.value === '')) {
        alert('Enter a valid To-Do name');
    }

    else if (todoNameElement.value !== '' && todoDateElement.value === '') {
        todoName.push(todoNameElement.value);
        todoDate.push('No Date Selected');
    }

    else {
        todoName.push(todoNameElement.value);
        todoDate.push(todoDateElement.value);
    };

    // SET TO-DO LIST IN LOCALSTORAGE
    localStorage.setItem('todoName', JSON.stringify(todoName));

    // SET TO-DO DATE IN LOCALSTORAGE
    localStorage.setItem('todoDate', JSON.stringify(todoDate));

    renderTodoList();
}

function deleteTodo(i) {

    todoName.splice( i, 1);
    localStorage.setItem('todoName', JSON.stringify(todoName));

    todoDate.splice( i, 1);
    localStorage.setItem('todoDate', JSON.stringify(todoDate));

    renderTodoList();
}