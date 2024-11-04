let draggedElement = null;
const todo = document.querySelector("#todo");
const finished = document.getElementById('finished');

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  draggedElement = ev.target;
  ev.dataTransfer.setData("text", ev.target.id);
  ev.target.classList.add('dragging');
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var element = document.getElementById(data);
  element.classList.remove('dragging');
  
  var targetSection = ev.target.closest('section');
  
  if (targetSection && element !== targetSection) {
    targetSection.appendChild(element);
  }
  
  draggedElement = null;
}

function dragEnd(ev) {
  if (draggedElement) {
    draggedElement.classList.remove('dragging');
    draggedElement = null;
  }
}

function initializeDragAndDrop() {
  const draggables = document.querySelectorAll('.component');
  const dropZones = document.querySelectorAll('section');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', drag);
    draggable.addEventListener('dragend', dragEnd);
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', allowDrop);
    zone.addEventListener('drop', drop);
  });
}

function add(id){
    const idS = document.getElementById(id);
    if(document.getElementById("todo-item-1"))
        document.getElementById("todo-item-1").remove();

    if(document.getElementById('temp')) return;
    const div = document.createElement('div');
    div.setAttribute("class","component");
    div.setAttribute("id","temp");
    div.innerHTML = `
        <input id="input-task" placeholder="Enter Task Name">
        <textarea id="input-description" rows="4" placeholder="Enter Task Description"></textarea>
        <select name="Level" id="task-difficulty">
        <option value="">Choose Task Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        </select>
        <div class="task-meta">
            <button id="btn1" class="add-btn">Submit</button>
            <button onclick="this.closest('.component').remove()" class="delete-btn">Cancel</button>
        </div>
    `;
    const components = document.querySelectorAll(`#${id} .component`);
    console.log(components);
    idS.insertBefore(div, components[0]);
    
    document.getElementById('btn1').addEventListener('click', () => {
      submit(id);
    });
}


function submit(id){
    const idS = document.getElementById(id);
    const div = document.createElement('div');
    div.setAttribute("class","component");
    div.setAttribute("draggable","true");
    div.setAttribute("id","task-" + Date.now());
    const h1 = document.querySelector('#input-task').value;
    const des = document.querySelector('#input-description').value;
    const dif = document.querySelector('#task-difficulty').value;
    if(!h1 || !des || !dif) {
      alert("Give an Input value");
      return;
    }
    const date = new Date();
    div.innerHTML = `
        <h3>${h1}</h3>
        <p>${des}</p>
        <div class="task-meta">
            <span class="difficulty">${dif}</span>
            <span>${date.toLocaleTimeString()}</span>
        </div>
    `;
    const temp = document.getElementById('temp');
    temp.remove();
    idS.appendChild(div);

    div.addEventListener('dragstart', drag);
    div.addEventListener('dragend', dragEnd);
}

function remove(){
    const components = finished.querySelector('.component');
    components.remove();
}

document.addEventListener('DOMContentLoaded', initializeDragAndDrop);

window.onload = initializeDragAndDrop;