
const noteNumber = 0; //<- glaub unnötig
const xListContainer = document.getElementById('lists');
const xList = document.getElementsByTagName('dt');
const iconsInContainer = xListContainer.getElementsByTagName('i');
const listSub = xListContainer.getElementsByTagName('sub');

//------> für test listeneinträge
const groceriesList = document.getElementById('lists_Groceries');
const fromTheMarketList = document.getElementById('lists_FromTheMarket');
const forThePartyList = document.getElementById('lists_ForTheParty');
const moviesList = document.getElementById('lists_Movies');
const workList = document.getElementById('lists_Work');
//-------

let addListBtn = document.getElementById('add-list-button')
const cancelBtnForAddList = document.getElementById('Cancel-Button')
const addBtnForAddList = document.getElementById('Add-ok-Button')
const backButton = document.getElementById('pfeil');
const gridIcon = document.getElementById('grid-icon');
const listIcon = document.getElementById('list-icon');

gridIcon.addEventListener('click', () => {
  for (let listEl of xList) {
    listEl.classList.add('grid-view');
    listEl.classList.remove('list-view');
  };
  for (let iconEl of iconsInContainer) {
    iconEl.classList.add('delete-gridview');
    iconEl.classList.remove('delete-listview');
  };
  for (let subEl of listSub) {
    subEl.classList.add('sub-gridview');
    subEl.classList.remove('sub-listview');
  };
  gridIcon.classList.add('icon-active');
  listIcon.classList.remove('icon-active');
});

listIcon.addEventListener('click', () => {
  for (let listEl of xList) {
    listEl.classList.add('list-view');
    listEl.classList.remove('grid-view');
  };
  for (let iconEl of iconsInContainer) {
    iconEl.classList.add('delete-listview');
    iconEl.classList.remove('delete-gridview');
  };
  for (let subEl of listSub) {
    subEl.classList.add('sub-listview');
    subEl.classList.remove('sub-gridview');
  };
  listIcon.classList.add('icon-active');
  gridIcon.classList.remove('icon-active');
});

document.getElementById('List-Namen-Input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    createNewList();
  };
});

addListBtn.addEventListener('click', () => {
  document.getElementById('Add-List-Container').style.display = "flex";
  document.getElementById('todolist-id-container').style.opacity = "0.2";
  document.getElementById('List-Namen-Input').value = '';
  document.getElementById('List-Namen-Input').focus();

});

cancelBtnForAddList.addEventListener('click', () => {
  document.getElementById('Add-List-Container').style.display = "none";
  document.getElementById('todolist-id-container').style.opacity = "1";
});

addBtnForAddList.addEventListener('click', createNewList);

function createNewList() {
  if (document.getElementById('List-Namen-Input').value === '') {

    alert('Feld ist leer, bitte bezeichnen Sie ihre Liste');

  } else {

    let newListName = document.getElementById('List-Namen-Input').value;
  
    let newList = document.createElement('dt');
    newList.id = 'lists_' + newListName;
    newList.classList.add('list-view');
    newList.innerText = newListName;
    document.getElementById('lists').appendChild(newList);
    
    let newListSub = document.createElement('sub');
    newListSub.classList.add('sub-listview');
    newList.appendChild(newListSub);
  
    let newDeleteListIcon = document.createElement('i');
    newDeleteListIcon.id = newListName + '-del-list-icon';
    newDeleteListIcon.classList.add('fas');
    newDeleteListIcon.classList.add('fa-times-circle');
    newDeleteListIcon.classList.add('delete-listview');
    document.getElementById('lists').appendChild(newDeleteListIcon);
  
    newDeleteListIcon.addEventListener('click', () => {
      document.getElementById('lists').removeChild(newDeleteListIcon);
      document.getElementById('lists').removeChild(newList);
    })
  
    if (listIcon.classList.contains('icon-active')) {
      listIcon.click();
    } else if (gridIcon.classList.contains('icon-active')) {
      gridIcon.click();
    };
  
    const updateListItems = () => {
      let itemList = document.getElementById(newListName + '-note-entry-list').getElementsByClassName('note-list').length;
      if (itemList === 0) {
        newListSub.innerText = '';
      } else {
        if (itemList < 2) {
          newListSub.innerText = itemList + ' Item';
        } else {
          newListSub.innerText = itemList + ' Items';
        };
      };
    };
  
    newList.addEventListener('click', () => {
  
  
      if (document.getElementById(newListName + '-container') !== null ) {
  
        document.getElementById('todolist-id-container').style.display = "none";
        document.getElementById(newListName + '-container').style.display = "block";
        document.getElementById(newListName + '-addnote-input').focus();
  
        } else {
  
        let newListContainer = document.createElement('div');
        newListContainer.id = newListName + '-container';
        newListContainer.classList.add('todolist-container');
        document.body.appendChild(newListContainer);
  
        let newTitelContainer = document.createElement('div');
        newTitelContainer.id = newListName + '-titel-container';
        newTitelContainer.classList.add('list_titel-container');
        newListContainer.appendChild(newTitelContainer);
  
        let newTitel = document.createElement('h2');
        newTitel.setAttribute("id", newListName + '-titel');
        newTitel.innerText = newListName;
        newTitelContainer.appendChild(newTitel);
  
        let newBackBtnIcon = document.createElement('i');
        newBackBtnIcon.id = newListName + '-back-icon';
        newBackBtnIcon.classList.add('fas');
        newBackBtnIcon.classList.add('fa-arrow-left');
        newTitelContainer.appendChild(newBackBtnIcon);
  
        let newNoteEntryContainer = document.createElement('div');
        newNoteEntryContainer.id = newListName + '-noteentry-container';
        newNoteEntryContainer.classList.add('list-container');
        newNoteEntryContainer.classList.add('listoflist-container');
        newListContainer.appendChild(newNoteEntryContainer);
  
        let newNoteEntryList = document.createElement('ul');
        newNoteEntryList.id = newListName + '-note-entry-list';
        newNoteEntryList.classList.add('note-entry-list');
        newNoteEntryContainer.appendChild(newNoteEntryList);
  
        let newResolvedContainer = document.createElement('div');
        newResolvedContainer.id = newListName + '-resolved-container';
        newResolvedContainer.classList.add('list-container');
        newResolvedContainer.classList.add('resolvedlist-container');
        newListContainer.appendChild(newResolvedContainer);
  
        let newAddNoteContainer = document.createElement('div');
        newAddNoteContainer.id = newListName + '-addnote-container';
        newAddNoteContainer.classList.add('addnote-container');
        newListContainer.appendChild(newAddNoteContainer);
  
        let newAddNoteInput = document.createElement('input');
        newAddNoteInput.id = newListName + '-addnote-input';
        newAddNoteInput.classList.add('input-style');
        newAddNoteInput.type = "text";
        newAddNoteInput.placeholder = "+ Add new Items...";
        newAddNoteContainer.appendChild(newAddNoteInput);
        newAddNoteInput.focus();
        newAddNoteInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            newAddNoteBtn.click();
          };
        });
  
        let newAddNoteBtn = document.createElement('button');
        newAddNoteBtn.id = newListName + '-addnote-btn';
        newAddNoteBtn.classList.add('button-style');
        newAddNoteBtn.classList.add('add-note-style');
        newAddNoteBtn.innerHTML = 'ADD&nbsp&nbsp';
        newAddNoteContainer.appendChild(newAddNoteBtn);
  
        newBackBtnIcon.addEventListener('click', () => {
          document.getElementById('todolist-id-container').style.display = "block";
          newListContainer.style.display = "none";
          updateListItems();
        });
  
        newAddNoteBtn.addEventListener('click', () => {
          if (newAddNoteInput.value === '') {

            alert('Leere Notizen lassen sich nicht hinzufügen');
            
          } else {

            let newNote = document.createElement('li')
            newNote.classList.add('note-list');
            newNote.innerText = newAddNoteInput.value;
            newNoteEntryList.appendChild(newNote);
    
            let newOptions = document.createElement('i');
            newOptions.classList.add('fas');
            newOptions.classList.add('fa-ellipsis-v');
            newNoteEntryList.appendChild(newOptions);
    
            let newEditIcon = document.createElement('i');
            newEditIcon.classList.add('far');
            newEditIcon.classList.add('fa-edit');
    
            let newCheckedIcon = document.createElement('i');
            newCheckedIcon.classList.add('fas');
            newCheckedIcon.classList.add('fa-check');
    
            let newDeleteBtnIcon = document.createElement('i');
            newDeleteBtnIcon.id = newListName + '-delete-icon';
            newDeleteBtnIcon.classList.add('far');
            newDeleteBtnIcon.classList.add('fa-trash-alt');
    
            newDeleteBtnIcon.addEventListener('click', () => {
              newNoteEntryList.removeChild(newNote);
              newNoteEntryList.removeChild(newOptions);
              optionPopUp.classList.remove('active');
              optionPopUpContainer.removeChild(optionPopUp);
              newNoteEntryList.removeChild(optionPopUpContainer);
            });
    
            newCheckedIcon.addEventListener('click', () => {
              newNoteEntryList.removeChild(newNote);
              newNoteEntryList.removeChild(newOptions);
              optionPopUp.classList.remove('active');
              optionPopUpContainer.removeChild(optionPopUp);
              newNoteEntryList.removeChild(optionPopUpContainer);
              newResolvedContainer.appendChild(newNote);
              
              let newUncheckIcon = document.createElement('i');
              newUncheckIcon.classList.add('fas');
              newUncheckIcon.classList.add('fa-plus-circle');
              newResolvedContainer.appendChild(newUncheckIcon);
    
              newUncheckIcon.addEventListener('click', () =>{
                newResolvedContainer.removeChild(newNote);
                newResolvedContainer.removeChild(newUncheckIcon);
                newNoteEntryList.appendChild(newNote);
                newNoteEntryList.appendChild(newOptions);
                newNoteEntryList.appendChild(optionPopUpContainer);
                optionPopUpContainer.appendChild(optionPopUp);
              })
            })
    
            newEditIcon.addEventListener('click', () => {
              newNote.contentEditable = 'true';
              newNote.classList.add('edit-modus');
              optionPopUp.classList.remove('active');
              newNote.focus();
              //->Cursor at the end
              const elemLength = newNote.innerText.length;
              const range = document.createRange();
              const sel = window.getSelection();
              range.setStart(newNote.childNodes[0], elemLength);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
              //<-
              newNote.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                  if (newNote.firstChild.length === undefined) {
                    event.preventDefault();
                    alert('Achtung! Eintrag leer.');
                  } else {
                    event.preventDefault();
                    newNote.contentEditable = 'false';
                    newNote.classList.remove('edit-modus');
                  };
                };
              });
    
              document.addEventListener('click', closeEditModus);
    
              function closeEditModus(e) {
                if (newNote.classList[1] == 'edit-modus') {
    
                  if (e.target.classList[1] == 'edit-modus' || e.target.classList[1] == 'fa-edit') {
                    return;
                    //alert('greenzone');
                  } else {
                    newNote.contentEditable = 'false';
                    newNote.classList.remove('edit-modus');
                    //alert('redzone');
                  }
                }
              }
            });
    
            //---> pop up window for options
            const optionPopUpContainer = document.createElement('div');
            optionPopUpContainer.classList.add('option-container')
            optionPopUpContainer.id = 'optionpopup-container';
            newNoteEntryList.appendChild(optionPopUpContainer);
            const optionPopUp = document.createElement('div');
            optionPopUp.classList.add('option-body');
            optionPopUp.id = 'option-popup';
            
            newOptions.addEventListener('click', () => {
              if (optionPopUp.classList[1] !== 'active') {
                optionPopUp.classList.add('active');
                optionPopUpContainer.appendChild(optionPopUp);
                optionPopUp.appendChild(newEditIcon);
                optionPopUp.appendChild(newCheckedIcon);
                optionPopUp.appendChild(newDeleteBtnIcon);
                
                document.addEventListener('click', closeWindow);
              } else {
                optionPopUp.classList.remove('active');
                optionPopUpContainer.removeChild(optionPopUp);
              };
            });
    
    
            const closeWindow = (e) => {
    
              if (optionPopUp.classList[1] == 'active') {
    
                if (e.target.id == 'option-popup' || e.target.classList[1] == 'fa-ellipsis-v') {
                  return;
                  //alert('greenzone');
                } else {
                  optionPopUp.classList.remove('active');
                  optionPopUpContainer.removeChild(optionPopUp);
                  //alert('redzone');
                }
              }
            };
            
    
            newAddNoteInput.value = '';
    
            newAddNoteInput.focus();
    
            updateListItems();
          };
        });
  
        newDeleteListIcon.addEventListener('click', () => {
          document.body.removeChild(newListContainer);
        })
  
        document.getElementById('todolist-id-container').style.display = "none";
        newListContainer.style.display = "block";
      };
  
    });
  
    document.getElementById('Add-List-Container').style.display = "none";
    document.getElementById('todolist-id-container').style.opacity = "1";
  
    mouseOverFunc();
  };
};


const mouseOverFunc = () => {

  for (let listElm of xList) {
    listElm.addEventListener('mouseover', showDelIcons);
    listElm.addEventListener('mouseout', hideDelIcons);
  };
  function showDelIcons(e) {
    if (e.target.localName === 'sub') {
      e.stopPropagation();
    } else {
      e.target.nextElementSibling.classList.add('show-icon');
    };
    //console.log(document.querySelectorAll(' :hover'));
  };
  function hideDelIcons(e) {
    if (e.target.localName !== 'sub') {
      e.target.nextElementSibling.classList.remove('show-icon');
    } else {
      e.stopPropagation();
    };
  };
};
mouseOverFunc();


// erledigte notes in resolved list verschieben
// resolved list eintrag rückgängig machen
//liste & notes bearbeitungs modus
//focus auf inputtext
//focus cursor position anpassen
//overlay damit aussenbereich unklickbar wird --> anderst gelöst
//leer einträge verhindern

