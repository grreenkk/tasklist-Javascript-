//DOM ELEMENTS
const form = document.querySelector('#task-form')
const taskInput = document.querySelector('#task');
const addTaskBtn = document.querySelector('.btn');
const filter = document.querySelector('#filter')
let taskList = document.querySelector('ul');
const clearBtn = document.querySelector('.clear-tasks')

loadAllEventListeners();

function loadAllEventListeners(){
  form.addEventListener('submit', addTask);

  taskList.addEventListener('click', removeTask);

  clearBtn.addEventListener('click', clearTasks);

  filter.addEventListener('keyup', filterThru)

  
};


function addTask(e){


  if (taskInput.value === ""){
    alert('Add a task');

  }
  let li = document.createElement('li');
  li.className = 'collection-item';
  li.innerHTML = taskInput.value;
  let link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  let i = document.createElement('i');
  link.appendChild(i);
  i.className = "fa fa-remove";
  li.appendChild(link);
  taskList.appendChild(li)
  storeInLocalStorage(taskInput.value)
  
  // tasks.forEach(function(task){
  //   let li = document.createElement('li');
  //   li.className = 'collection-item';
  //   li.innerHTML = task;
  //   let link = document.createElement('a');
  //   link.className = 'delete-item secondary-content';
  //   let i = document.createElement('i');
  //   link.appendChild(i);
  //   i.className = "fa fa-remove";
  //   li.appendChild(link);
  //   taskList.appendChild(li)
    
  // })
  e.preventDefault();
}

function removeTask(e){
  if(confirm('Are you sure')){
    if(e.target.parentElement.classList.contains('delete-item')){
      e.target.parentElement.parentElement.remove();
    }
    removeFromLocalStorage(e.target.parentElement.parentElement)


  }
  
  
}

function removeFromLocalStorage(taskItem){
  let tasks;

  if (localStorage.getItem('tasks') === null){
    task =[]
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if (taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  })
  
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasks(e){
  
 while(taskList.lastChild){
   console.log(taskList.lastChild)
   taskList.lastChild.remove();
   
 }

 localStorage.clear();
  
}

function filterThru(e) {
  let item = e.target.value
  document.querySelectorAll('.collection-item').forEach(function(collect){
    if(collect.textContent.indexOf(item) != -1){
      collect.style.display = 'block'
    }else{
      collect.style.display = 'none'
    }
  });
}

function storeInLocalStorage(Tasks){
  
  let tasks;
  if (localStorage.getItem('tasks') === null ){
    tasks = []
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(Tasks);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  
}



