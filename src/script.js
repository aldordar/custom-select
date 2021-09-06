mySelect();

function mySelect() {
  let x, i, j, selElmnt, a, b, c;
  //x = all custom select defined in the HTML
  x = document.getElementsByClassName('custom-select');
  
  for (i = 0; i < x.length; i++) {

    //all select elements with provided ID
    selElmnt = x[i].getElementsByTagName('select')[0];

    //a = First <option> (placeholder)
    a = document.createElement('div');
    a.setAttribute('class', 'select-selected placeholder');
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;

    //Add select-selected to custom-select div (placeholder)
    x[i].appendChild(a);

    //Create items
    b = document.createElement('div');
    b.setAttribute('class', 'select-items select-hide');


    //Start in 1 bc first option is placeholder
    for (j = 1; j < selElmnt.length; j++) {
      c = document.createElement('div');
      //Add classes of the original option element to the custom item div
      if (selElmnt.options[j].className) c.className = selElmnt.options[j].className;
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.dataset.optionValue = selElmnt.options[j].value;
      c.dataset.optionIndex = j;

      c.addEventListener('click', function(e) {
          let y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName('select')[0];
          h = this.parentNode.previousSibling;
          if (h.classList.contains('placeholder')) h.classList.remove('placeholder');

          for (i = 0; i < s.length; i++) {
            if (s.options[i].value == this.dataset.optionValue) {
              s.selectedIndex = this.dataset.optionIndex;
              let eventChange = new Event('change');
              s.dispatchEvent(eventChange);
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName('same-as-selected');
              for (k = 0; k < y.length; k++) {
                (y[k].className) ? y[k].classList.remove('same-as-selected') : y[k].removeAttribute('class');
              }
              (this.className) ? this.classList.add('same-as-selected') : this.setAttribute('class', 'same-as-selected');
              break;
            }
          }
          h.click();
      });

      b.appendChild(c);
    }

    if (x[i].firstElementChild.classList.contains('select-search')) {
      x[i].firstElementChild.addEventListener('keyup', function(e) {
        searchFunction(e.target.value, this.parentElement.lastElementChild.childNodes);
      });
    }

    x[i].appendChild(b);

    a.addEventListener('click', function(e) {
      if (this.parentElement.firstElementChild.classList.contains('select-search')){
        this.parentElement.firstElementChild.classList.toggle('active');
        this.parentElement.firstElementChild.focus();
      }
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle('select-hide');
      this.classList.toggle('select-arrow-active');
    });


  }

  document.addEventListener('click', function(e){
    if (!e.target.classList.contains('select-search'))
    closeAllSelect();
  });
}

function searchFunction(searchTerm, optionsList){
  searchTerm = searchTerm.toLowerCase();

  optionsList.forEach(option => {
    let optionName = option.textContent.toLocaleLowerCase();

    if (optionName.indexOf(searchTerm) != -1){
      option.style.display = 'block';
    }
    else {
      option.style.display = 'none';
    }
  });
}

function closeAllSelect(elmnt) {
  let x, y, i, arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  for (i = 0; i < y.length; i++) {
    //Push the index of the custom-select if the element clicked belongs to it
    if (elmnt == y[i]) {
      arrNo.push(i);
    } 
    
    else {
      y[i].parentElement.firstElementChild.classList.remove('active');
      y[i].classList.remove('select-arrow-active');
    }
  }

  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}