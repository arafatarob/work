const createNote = document.querySelector('.add_btn');
const note_items = document.querySelector('#note_items');
const note = document.querySelector('.note');
const remove = document.querySelector('.remove');


function saveBrowser(){
    note_items.innerHTML = localStorage.getItem('note');
}

saveBrowser();

createNote.addEventListener('click', function(){
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = 'inputBox';
    inputBox.setAttribute('contenteditable', 'true');
    img.src = 'img/delete.png';

    note_items.appendChild(inputBox);
    
    inputBox.appendChild(img);
    setbrowser();

    
});

note_items.addEventListener('click', function(e){
    if(e.target.tagName === 'IMG'){
        e.target.parentElement.remove();
        setbrowser();
    }else if(e.target.tagName === "P"){
        notes = document.querySelectorAll('.inputBox');
        notes.forEach(nt=>{
            nt.onkeyup = function(){
                setbrowser();
            }
        })
    }
});

note_items.addEventListener('input', function(){
    setbrowser();
})

function setbrowser(){
    localStorage.setItem('note',  note_items.innerHTML);
}

document.addEventListener('keydown', event =>{
    if(event.key === 'Enter'){
        event.preventDefault();
        document.execCommand('insertLineBreak');
    }
})
