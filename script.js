let taskList = document.getElementById('tasks-container');
let add = document.querySelector('.add-task button');
let changeColor = document.querySelector('.change-color');
let colorsItems =document.querySelectorAll('.colors li');

// window.localStorage.clear();

// Add Tasks
add.addEventListener('click',function () {
    if (document.querySelector('input').value !== "") {
        let li = document.createElement('li');
        li.textContent = document.querySelector('input').value;
        document.querySelector('input').value = "";
        let i = document.createElement('i');
        i.classList.add('fa-regular','fa-circle');
        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        li.append(i,delBtn);
        delBtn.style.backgroundImage = window.getComputedStyle(changeColor)['backgroundImage'];
        i.style.color = changeColor.dataset.color;
        taskList.appendChild(li);
        window.localStorage.setItem('tasks',taskList.innerHTML);
    }
})

// complete task 
document.querySelector('#tasks-container').addEventListener('click',function(el) {
    if (el.target.tagName === 'LI') {
        if (el.target.style.textDecoration !== 'line-through') {
            addStyles(el.target);
        }
        else {
            removeStyle(el.target);
        }
        
    }
    else if (el.target.tagName === 'I') {
        if (el.target.parentElement.style.textDecoration !== 'line-through') {
            addStyles(el.target.parentElement);
        }
        else {
            removeStyle(el.target.parentElement);
        }
    }
    function addStyles (element){
        element.style.textDecoration = 'line-through';
        element.firstElementChild.classList.remove('fa-regular','fa-circle');
        element.firstElementChild.classList.add('fa-solid','fa-circle-check');
    }
    function removeStyle (element) {
        element.style.textDecoration = 'none';
        element.firstElementChild.classList.remove('fa-solid','fa-circle-check');
        element.firstElementChild.classList.add('fa-regular','fa-circle');
    }
    window.localStorage.setItem('tasks',taskList.innerHTML);
});

// delete task 
document.querySelector('#tasks-container').addEventListener('click', function (el) {
    if (el.target.tagName === 'BUTTON'){
        el.target.parentElement.remove();
    }
    window.localStorage.setItem('tasks',taskList.innerHTML);
});

// Dark-light Theme

document.querySelector('.theme').addEventListener('click', function (ele) {
    if (ele.target.classList[1] === 'sun') {
        ele.target.style.display = 'none';
        document.querySelector('.moon').style.display = 'block';
        ele.target.parentElement.style.backgroundColor = '#2f2e2e';
        document.querySelector('.to-do').classList.add('dark-theme');
        window.localStorage.setItem('dark','dark-theme');

    }
    else if (ele.target.classList[1] === 'moon') {
        ele.target.style.display = 'none';
        document.querySelector('.sun').style.display = 'block';
        ele.target.parentElement.style.backgroundColor = '#a4d7fb';
        document.querySelector('.to-do').classList.remove('dark-theme');
        window.localStorage.setItem('dark','light-theme');
    }
    window.localStorage.setItem('sun',window.getComputedStyle(document.querySelector('.sun'))['display']);
    window.localStorage.setItem('moon',window.getComputedStyle(document.querySelector('.moon'))['display']);
    window.localStorage.setItem('themeBack',window.getComputedStyle(document.querySelector('.theme'))['background-color']);
})

// Change to Chosen Color
colorsItems.forEach((el) => {
    el.addEventListener('click',function () {
        // Remove Active Class From All Element
        colorsItems.forEach((el) => {
            el.classList.remove('active');
        })
        el.classList.add('active');
        changeColor.style.backgroundImage = window.getComputedStyle(el)['backgroundImage'];
        changeColor.dataset.color = el.dataset.color;
        localStorage.setItem('dataset',el.dataset.color);
        // Change Buttons Color
        document.querySelectorAll('button').forEach((btn) => {
            btn.style.backgroundImage = window.getComputedStyle(el)['backgroundImage'];
        })
        // Change Icons Color
        document.querySelectorAll('#tasks-container li i').forEach((icon) => {
            icon.style.color = el.dataset.color;
        })
        window.localStorage.setItem('color', window.getComputedStyle(el)['backgroundImage']);
    });
    
})

// Show Data From Local Storage

function showSavedData () {
    // Show Tasks
    taskList.innerHTML = window.localStorage.getItem('tasks');
    // Theme
    document.querySelector('.sun').style.display = localStorage.getItem('sun');
    document.querySelector('.moon').style.display = localStorage.getItem('moon');
    document.querySelector('.theme').style.backgroundColor = localStorage.getItem('themeBack');
    document.querySelector('.to-do').classList.add(localStorage.getItem('dark'));

    // Add Active Class

    // Change-Color
    if (localStorage.getItem('dataset') !== null) {
        changeColor.dataset.color = localStorage.getItem('dataset');
        colorsItems.forEach((el) => {
            el.classList.remove('active');
        })
        document.querySelectorAll(`[data-color="${changeColor.dataset.color}"]`)[1].classList.add('active');
        // Icons Color
        document.querySelectorAll('#tasks-container li i').forEach((icon) => {
            icon.style.color = localStorage.getItem('dataset');
        })
    }
    changeColor.style.backgroundImage = localStorage.getItem('color');
    document.querySelectorAll('button').forEach((btn) => {
        btn.style.backgroundImage = localStorage.getItem('color');
    })
    
}
showSavedData();