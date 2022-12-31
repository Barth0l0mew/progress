const row = document.querySelector('.row')
const modal = document.querySelector('.modal')
const modalBackdrop = document.querySelector('.modal-backdrop')
const progressValue = document.querySelector('.progress-value') 
const form = document.querySelector('.form')
const ADD_TITLE = document.title
const LS_KEY = 'MY_KEY'
// const content = [
//   {title:'HTML',description:'Lorem ipsum dolor sit amet.',type:'html',done:true},
//   {title:'CSS',description:'Lorem ipsum dolor sit amet.',type:'css',done:true},
//   {title:'JavaScript',description:'Lorem ipsum dolor sit amet.',type:'javascript',done:false},
//   {title:'GIT',description:'Lorem ipsum dolor sit amet.',type:'git',done:false},
//   {title:'React',description:'Lorem ipsum dolor sit amet.',type:'react',done:false},
// ]
const content = load()
form.addEventListener('submit',createTech)
modal.addEventListener('change',toggleCheck)
row.addEventListener('click',(event)=>{
  console.log (event.target)
  const techCount = event.target.dataset
  console.log (techCount.type)
  const tech = content.find(el=>el.type==techCount.type)
  console.log (tech)
  if (tech){
    openCard(tech)
  }
})
modalBackdrop.addEventListener('click',()=>{
  closeCard()
})
function createTech (event){
  event.preventDefault ();
  const {title, description} = event.target 
  if (isValidate(title,description)){
    if (!title.value) title.classList.add('invalid')
    if (!description.value) description.classList.add('invalid')
    setTimeout(() => {
      title.classList.remove('invalid')
      description.classList.remove('invalid')
      
    }, 2000);
    return
  }
  console.log (title.value, description.value)
  const newTech ={
    title: title.value,
    description: description.value,
    done: false,
    type: title.value.toLowerCase()
  }
  content.push(newTech)
  title.value = ''
  description.value = ''
  save()
  init()
}
function isValidate (title,description){
  return !title.value || !description.value
}
function toggleCheck (event){
  const data = event.target.dataset
  const tech = content.find (el=>el.type===data.type)
  tech.done = event.target.checked
  init()
  console.log (event.target.checked)
  save()
}
function openCard (tech){
  const done = tech.done ? 'checked': ''
  modal.classList.add('open')
  modal.innerHTML = `
  <h2>${tech.title}</h2>
      <p>
        ${tech.description}
      </p>
      <hr />
      <div>
        <input type="checkbox" id="done" ${done} data-type="${tech.type}"/>
        <label for="done">Выучил</label>
      </div>`
}
function closeCard (){
  modal.classList.remove('open')
}
function renderCard(){
  let html =''
  console.log (content.length,'111')
  if (content.length == 0){
    row.innerHTML = '<p class="emty">Технологий пока еще нет</p>'
  } else  {
    for (let key of content){
      html +=toCard (key)
    }
    row.innerHTML = html
  }
}

function toCard (key){
  const doneCount = key.done? 'done': '' 
  return `<div class='card ${doneCount}'data-type='${key.type}' > 
  <h3 data-type='${key.type}'>${key.title}</h3>
  </div>`
}
function renderProgress (){
  const procent = procentCount()
  if (!procent) {
    return
  }
  if (procent<30){
    console.log ('1')
    progressValue.style.backgroundColor = '#e75a5a'
  } else if ( procent>=30 && procent<60){
    console.log ('2')
    progressValue.style.background = '#f99415'
  } else if (procent >= 60) {
    console.log ('3')
    progressValue.style.background = '#73ba3c'
  }
  progressValue.style.width = procent + '%' 
  progressValue.textContent = procent + '%'
  console.log (procent)
}
function procentCount (){
  let count = 0;
  if (content.length === 0) return 0
  for (let i=0; i<content.length; i++)
    if (content[i].done){
      count++
    }
    console.log (count)
  return Math.round(100*count)/content.length
}
function init (){
 renderCard ()
 renderProgress ()
}
function save (){
  localStorage.setItem(LS_KEY,JSON.stringify(content))
}
function load (){
  const data = localStorage.getItem(LS_KEY)
  return data ? JSON.parse(data) : []
}
init()


