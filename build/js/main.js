(function () {
  // module loads a popup that has the new todo item form located within it
  // module opened with a click on an element with the "c-add-new-item-button" class
  // module is closed by clicking on an element with the "c-add-item-modal__close-btn" class
  // or by pressing the esc key

  // cache document queries
  var addNewBtn = document.querySelector('.c-add-new-item-button');
  var addNewModal = document.querySelector('.c-add-item-modal');

  // if addNewBtn and addNewModal exist, create add new todo item modal functionality
  if (addNewBtn && addNewModal) {
    var closeModalBtn = addNewModal.querySelector('.c-add-item-modal__close-btn');

    // if addNewBtn clicked launch modal
    addNewBtn.addEventListener('click', function () {
      addNewModal.classList.add('active');
    });

    // close if close btn is pressed
    closeModalBtn.addEventListener('click', function () {
      addNewModal.classList.remove('active');
    });

    // close modal on esc keypress
    window.onkeydown = function (e) {
      if (e.keyCode === 27) {
        if (addNewModal.classList.contains('active')) {
          addNewModal.classList.remove('active');
        }
      }
    };
  }
})();

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

  function viewTodo (index) {
    var todo = todoList[index];
    var todoTitle = todo.title;
    var todoDesc = todo.desc;

    var viewTodoModal = document.querySelector('.c-view-todo-modal');
    var viewTodoModalTitle = viewTodoModal.querySelector('.c-view-todo-modal__todo-title h2');
    var viewTodoModalDesc = viewTodoModal.querySelector('.c-view-todo-modal__todo-desc p');

    viewTodoModalTitle.innerHTML = todoTitle;
    viewTodoModalDesc.innerHTML = todoDesc;
    viewTodoModal.classList.add('active');
  }

  function makeCard (title, desc, index) {
    var card = '<li class="c-todo-list__item-wrapper">' +
                  '<div class="c-todo-list__item o-card">' +
                    '<h3>' + title + '</h3>' +
                    '<p><strong>Description: </strong>' +
                    desc + '</p>' +
                    '<div class="c-todo-list__item__button u-align-center">' +
                      '<button class="btn-small" type="button" name="view-todo" data-index="' + index + '">View</button>' +
                      '<button class="btn-small btn-warning" type="button" name="delete-todo" data-index="' + index + '">Delete</button>' +
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
  }

  // get todolist (if it exists) and show list on page load
  todoList = getTodoList();
  showTodos();

  // ****
  // TODO move below to individul modules
  // ****

  var addTodoBtn = document.querySelector('.c-todo-list__entry--button');
  var viewTodoModal = document.querySelector('.c-view-todo-modal');
  var closeModalBtn = document.querySelector('.c-view-todo-modal__close-btn__X');

  document.querySelector('.c-todo-list__list').addEventListener('click', function (e) {
    var index;
    if (e.target && e.target.name === 'delete-todo') {
      index = e.target.dataset.index;
      removeTodo(index);
    } else if (e.target && e.target.name === 'view-todo') {
      index = e.target.dataset.index;
      viewTodo(index);
    }
  });

  addTodoBtn.addEventListener('click', function () {
    var todoTitle = document.querySelector('input[name=new-todo-title]');
    var todoDesc = document.querySelector('input[name=new-todo-desc]');
    var todoForm = document.querySelector('.c-add-item-modal');
    addTodo(todoTitle.value, todoDesc.value);
    todoForm.classList.remove('active');
    todoTitle.value = '';
    todoDesc.value = '';
  });

  // close if close btn is pressed
  closeModalBtn.addEventListener('click', function () {
    viewTodoModal.classList.remove('active');
  });

  // close modal on esc keypress
  window.onkeydown = function (e) {
    if (e.keyCode === 27) {
      if (viewTodoModal.classList.contains('active')) {
        viewTodoModal.classList.remove('active');
      }
    }
  };
})();
