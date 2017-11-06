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
