const row = document.querySelector('.row')
const modal = document.querySelector('.modal')
const modalBackdrop = document.querySelector('.modal-backdrop')
row.addEventListener('click',(event)=>{
  openCard()
})
modalBackdrop = addEventListener('click',()=>{
  closeCard()
})
function openCard (){
  modal.classList.add('open')
}
function closeCard (){
  modal.classList.remove('open')
}