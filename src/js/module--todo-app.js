/* global localStorage */

(function () {
  // cashe todo list holder
  var todoListHolder = document.querySelector('.c-todo-list__list');
  var todoList;

  function getTodoList () {
    // get raw todoList string from local storage
    var todoList = [];
    var todoListStr = localStorage.getItem('todoList');

    if (todoListStr !== null) {
      todoList = JSON.parse(todoListStr);
    }
    return todoList;
  }

  function updateTodoList () {
    // updates entire todoList
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  function addTodo (title, desc) {
    todoList.push({'title': title, 'desc': desc});
    updateTodoList();
    showTodos();
  }

  function removeTodo (index) {
    todoList.splice(index, 1);
    updateTodoList();
    showTodos();
  }

  function updateTodo (index) {
    // updates and individual todo item
    // do stuff
  }

  function makeCard (title, desc, index) {
    var card = '<li class="c-todo-list__item-wrapper">' +
                  '<div class="c-todo-list__item o-card">' +
                    '<h3>' + title + '</h3>' +
                    '<p><strong>Description: </strong>' +
                    desc + '</p>' +
                    '<div class="c-todo-list__item__button u-align-center">' +
                      '<button type="button" name="view-todo" data-index="' + index + '">View</button>' +
                      '<button type="button" name="delete-todo" class="btn-warning" data-index="' + index + '">Delete</button>' +
                    '</div>' +
                  '</div>' +
                '</li>';
    return card;
  }

  function showTodos () {
    if (todoList.length > 0) {
      todoListHolder.innerHTML = '';
      var updatedHTML = '';
      for (var i = 0; i < todoList.length; i++) {
        var todoTitle = todoList[i].title;
        var todoDesc = todoList[i].desc;
        updatedHTML += makeCard(todoTitle, todoDesc, i);
      }
      todoListHolder.innerHTML = updatedHTML;
    } else {
      todoListHolder.innerHTML = '<li><h3>No Todo List Items</h3></li>';
    }

    // TODO figure out how to decouple this from showTodos
    setTimeout(function () {
      refreshBtnEvents();
    }, 0);
  }

  // get todolist (if it exists) and show list on page load
  todoList = getTodoList();
  showTodos();

  // move below to individul modules
  var addTodoBtn = document.querySelector('.c-todo-list__entry--button');

  function refreshBtnEvents () {
    // **
    // TODO add view todo events
    // **
    var deleteBtns = document.querySelectorAll('button[name=delete-todo]');

    // add event listeners
    for (var j = 0; j < deleteBtns.length; j++) {
      (function (index) {
        deleteBtns[index].addEventListener('click', function () {
          var index = this.dataset.index;
          removeTodo(index);
        });
      })(j);
    }
  }

  addTodoBtn.addEventListener('click', function () {
    var todoTitle = document.querySelector('input[name=new-todo-title]');
    var todoDesc = document.querySelector('input[name=new-todo-desc]');
    var todoForm = document.querySelector('.c-add-item-modal');
    addTodo(todoTitle.value, todoDesc.value);
    todoForm.classList.remove('active');
    todoTitle.value = '';
    todoDesc.value = '';
  });
})();
