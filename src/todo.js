"use strict";
/**
* page set up (one time)
*/
function init() {
  var add = document.getElementById('add').addEventListener('click',add);
}
init();

/**
* fetches todo items as array 'todos'
*/
function get_todos() {
  var todos = new Array;
  var todos_str = localStorage.getItem('todo');
  if (todos_str !== null) {
    todos = JSON.parse(todos_str);
  }
  return todos;
}

/**
* add item to list
*/
function add() {
  // finds element 'task' and retrieves its value.
  // the element is the input box, and the value is whatever the user has typed in
  var task = document.getElementById('task').value;
  
  // get list out
  var todos = get_todos();
  // add task to list
  todos.push(task);
  // put list back in storage
  localStorage.setItem('todo',JSON.stringify(todos));
  
  // render on the page
  show();
  
  // ends action. ensures no further actions occur due to the 'click' event
  return false;
}

/**
* render on the page
*/
function show() {
  var todos = get_todos();
  
  var html = '<ul>';
  // ul = unordered list
  for(var ii=0; ii < todos.length; ii++) {
    html += '<li>' + todos[ii] + '<button class="remove" id"' + ii + '">x</button></li>';
    // li = list item
  };
  html += '</ul>';
  
  // update todos element on the page
  document.getElementById('todos').innerHTML = html;
  
  // add a remove element to the list item
  var buttons = document.getElementsByClassName('remove');
  for (var ii=0; ii < buttons.length; ii++) {
    buttons[ii].addEventListener('click',remove);
  };
}

/**
* remove an item from the list
*/
function remove() {
  // 'this' is the current DOM-object (the remove button just clicked)
  // retrieve the object's id
  var id = this.getAttribute('id');
  var todos = get_todos();
  // js for remove
  todos.splice(id,1);
  // and then put the list back
  localStorage.setItem('todo', JSON.stringify(todos));
  
  show();
  
  // end click event propagation
  return false;
}
