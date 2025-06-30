(function (){
  //get elements by ids 
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const feedback = document.getElementById("feedback");
  const taskList = document.getElementById("taskList");


  // show message
  function showFeedback(message, isError){
    if(isError === undefined) isError= true;
    feedback.textContent = message;
    feedback.style.color = isError ? 'red' : 'green';

    // msg disapper after 3sec.

    setTimeout(function(){
      feedback.textContent = '';
    },3000);
  }

  //task validity check
  function isValidTask(text){
    return text.trim().length > 0;
  }

  //for button 

  function createButton(text,className ,onClick){
    let btn = document.createElement("button");
    btn.textContent = text;
    btn.className = className;
    btn.addEventListener('click',onClick);
    return btn;
  }

  // new task 
  function createTaskItem(taskText){
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.className = "taskText";
    span.textContent = taskText;

    let editBtn = createButton('✎', 'editBtn', function () {
      startEdit();
    });

    let deleteBten = createButton('🗑', 'deleteBtn', function () {
      taskList.removeChild(li);
      showFeedback('Task deleted.', false);
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBten);

    // edit function

    function startEdit(){
      if (li.classList.contains("editing")) return;
      
      li.classList.add("editing");

      let input = document.createElement("input");
      input.type = "text";
      input.className = "taskText editable";
      input.value = span.textContent;

      let saveBtn = createButton('✔', 'saveBtn', function () {
        let newText = input.value.trim();
        if (!isValidTask(newText)) {
          showFeedback('Task cannot be empty.');
          return;
        }
        span.textContent = newText;
        finishEdit();
        showFeedback('Task updated.', false);
      });
      
      let cancelBtn = createButton('✖', 'cancelBtn', function () {
        finishEdit();
        showFeedback('Edit canceled.', false);
      });

      li.replaceChild(input, span);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);
      editBtn.style.display = 'none';
      deleteBtn.style.display = 'none';

      input.focus();
      input.select();

      function finishEdit() {
        li.replaceChild(span, input);
        li.removeChild(saveBtn);
        li.removeChild(cancelBtn);
        editBtn.style.display = '';
        deleteBtn.style.display = '';
        li.classList.remove('editing');
      }
    }

    return li;
  }
  // adding new task function
    function addTask() {
    let taskText = taskInput.value;

    if (!isValidTask(taskText)) {
      showFeedback('Please enter a valid task.');
      return;
    }

    let newTask = createTaskItem(taskText);
    taskList.appendChild(newTask);
    taskInput.value = '';
    showFeedback('Task added.', false);
    taskInput.focus();
  }

  //evet listners
    addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
})();