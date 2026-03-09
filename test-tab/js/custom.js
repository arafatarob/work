const tabButton = document.querySelectorAll('.tabLink');

for(var i = 0; i < tabButton.length; i++){
    

    tabButton[i].addEventListener('click', function(){
        var tabName = this.dataset.tab;
        var tabContent = document.getElementById(tabName);

        var allBtn = document.querySelectorAll('.tabLink');
        var allContent = document.querySelectorAll('.tabContent');

        for(var j = 0; j < allContent.length; j++){
            allContent[j].style.display = 'none';
        }
        for(var k = 0; k < allBtn.length; k++){
            allBtn[k].classList.remove('active');
        }

        tabContent.style.display = 'block';
        this.classList.add('active');
    });
    
}

document.querySelector('.tabLink').click();