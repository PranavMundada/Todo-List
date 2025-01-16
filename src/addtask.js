import { displayHomeContent } from "./home";
import { displayNotesContent } from "./notes";
import { displayProjectSidebar } from ".";293241
import { format } from "date-fns";
import "./mainpage.css";
const dialogBox=document.getElementById("dialogBox");
const todoDialog=document.getElementById("todoDialog");
const projectDialog=document.getElementById("projectDialog");
const noteDialog=document.getElementById("noteDialog");
const contentDialog=document.getElementById("contentDialog");


let totalTODO=0;

function todoitems(title,details,dueDate,priority,totalTODO,projecthead){
    this.title=title;
    this.details=details;
    if(dueDate=="")dueDate=new Date();
    this.dueDate=dueDate;
    this.priority=priority;
    this.todono=totalTODO;
    this.done=0;
    this.project=projecthead;
}

function noteitems(title,details){
    this.title=title;
    this.details=details;
}

function showTodoContent(){
    contentDialog.innerText="";
    const p=document.createElement("div");
    p.classList.add("p");
    const p1=document.createElement("div");
    p1.classList.add("p1");
    const p2=document.createElement("div");
    p2.classList.add("p2");
    const p3=document.createElement("div");
    p3.classList.add("p3");
    const form=document.createElement("form");
    form.id="todoform"; 
    form.method="GET";

    const title=document.createElement("input");
    title.type="text";
    title.name="title";
    title.id="title";
    title.placeholder="Title";
    p1.appendChild(title);

    const projecthead=document.createElement("input");
    projecthead.type="text";
    projecthead.name="projecthead";
    projecthead.id="projecthead";
    projecthead.placeholder="Project Name";
    p1.appendChild(projecthead);

    const details=document.createElement("input");
    details.type="text";
    details.name="details";
    details.id="details";
    details.placeholder="Details";
    p1.appendChild(details);

    const duedatename=document.createElement("label");
    duedatename.innerText="Due Date :";
    duedatename.style.margin="10px";
    const dueDate=document.createElement("input");
    dueDate.type="date";
    dueDate.name="dueDate";
    dueDate.id="dueDate";
    dueDate.value=format(new Date(),'yyyy MM dd');
    
    p2.appendChild(duedatename);
    p2.appendChild(dueDate);
    const p31=document.createElement("div");
    const p32=document.createElement("div");
    const priority=document.createElement("label");
    priority.innerText="Priority:";
    priority.style.margin="10px";
    const low=document.createElement("input");
    low.name="priority";
    const lowlabel=document.createElement("label");
    lowlabel.style.margin="10px";
    lowlabel.innerText="Low";
    low.value="low";
    low.type="radio";
    const medium=document.createElement("input");
    medium.name="priority";
    medium.innerText="Medium"
    medium.type="radio";
    medium.value="medium";
    const mediumlabel=document.createElement("label");
    mediumlabel.innerText="Medium";
    mediumlabel.style.margin="10px";
    const high=document.createElement("input");
    high.name="priority";
    high.innerText="High";
    high.type="radio";
    high.value="high";
    const highlabel=document.createElement("label");
    highlabel.innerText="High";
    highlabel.style.margin="10px";
    p31.appendChild(priority);
    p31.appendChild(low);
    p31.appendChild(lowlabel);
    p31.appendChild(medium);
    p31.appendChild(mediumlabel);
    p31.appendChild(high);
    p31.appendChild(highlabel);

    const addTodo=document.createElement("button");
    addTodo.type="submit";
    addTodo.innerText="ADD TODO";
    addTodo.style.margin="10px";
    addTodo.style.fontSize="15px";
    addTodo.style.padding="5px";
    p32.appendChild(addTodo);

    p3.appendChild(p31);
    p3.appendChild(p32);

    p.appendChild(p1);
    p.appendChild(p2);
    p.appendChild(p3);
    form.appendChild(p);
    contentDialog.appendChild(form);

    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        totalTODO++;
        const data=new FormData(e.target);
        const todoobj=new todoitems(data.get('title'),data.get('details'),data.get('dueDate'),data.get('priority'),totalTODO,data.get('projecthead'));
        // todolist.push(`todos`);

        const todoData=JSON.stringify(todoobj);
        localStorage.todos+=`;${todoData}`;
        localStorage.projects+=`;${todoobj.project}`;
        dialogBox.close();
        displayHomeContent();
        displayProjectSidebar();
    })
}

function showNotesContent(){
    contentDialog.innerText="";
    const p=document.createElement("div");
    p.classList.add("note");
    p.style.height="100%";
    p.style.display="flex";
    const p1=document.createElement("div");
    p1.style.flex="1";
    const p2=document.createElement("div");
    p2.style.flex="5";
    const form=document.createElement("form");
    form.id="todoform"; 
    form.method="GET";

    const title=document.createElement("input");
    title.type="text";
    title.name="title";
    title.id="title";
    title.placeholder="title";
    // title.style.width="600px";
    title.style.margin="20px";
    title.style.flex="9";
    p1.appendChild(title);
    p.appendChild(p1);
    p1.style.display="flex";
    p1.style.alignItems="center";
    p1.style.justifyContent="space-between";

    const details=document.createElement("textarea");
    details.name="details";
    details.id="details";
    details.placeholder="Details";
    p2.appendChild(details);
    p2.style.display="flex";
    p2.style.alignItems="center";
    p2.style.justifyContent="space-between";
    details.style.flex=9;
    details.style.height="60%";
    details.style.margin="20px";
    p2.style.alignItems="flex-start";
    p.appendChild(p2);

    const p3=document.createElement("div");
    const addNote=document.createElement("button");
    addNote.type="submit";
    addNote.innerText="ADD NOTE";
    addNote.style.margin="20px";
    addNote.style.height="40px";
    addNote.style.width="80px";
    p3.appendChild(addNote);
    p3.style.flex="1";
    p.appendChild(p3);

    form.appendChild(p);
    contentDialog.appendChild(form);

    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const data=new FormData(e.target);
        const noteobj=new noteitems(data.get('title'),data.get('details'));
        // todolist.push(`todos`);

        const noteData=JSON.stringify(noteobj);
        localStorage.note+=`;${noteData}`;
        dialogBox.close();
        displayNotesContent();
    })
}

function addTaskDialogFunc(){
    dialogBox.showModal();
    showTodoContent();
}

todoDialog.addEventListener("click",()=>{
    showTodoContent();
})

export {addTaskDialogFunc,dialogBox,todoDialog,projectDialog,noteDialog,showNotesContent};