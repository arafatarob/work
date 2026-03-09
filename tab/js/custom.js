const tabButtons = document.querySelectorAll('.tab');


for(var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', function() {
        var tabName = this.dataset.tab;
        var tabContent = document.getElementById(tabName);


        var allTabContent = document.querySelectorAll('.tabs');
        var allTabButtons = document.querySelectorAll('.tab');
        for(var j = 0; j < allTabContent.length; j++){
            allTabContent[j].style.display = 'none';
        }
        for(var k = 0; k < allTabButtons.length; k++){
            allTabButtons[k].classList.remove('active');
        }


        tabContent.style.display = 'block';
        this.classList.add('active');
        

        
    });
}

document.querySelector('.tab').click();