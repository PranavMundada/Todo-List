import "./mainpage.css";
import "./addtask.css"
import { addTaskDialogFunc, showNotesContent } from "./addtask";
import { displayHomeContent } from "./home";
import { displayTodayContent } from "./today";
import { displayWeekContent } from "./week";
import { displayNotesContent } from "./notes";
import { displayProject } from "./projects";
import { format } from "date-fns";


const home = document.getElementById("home");
const today = document.getElementById("today");
const week = document.getElementById("week");
const projects = document.getElementById("projects");
const notes = document.getElementById("notes");
const addTask = document.getElementById("addTask");
const content = document.getElementById("content");
const noteDialog = document.getElementById("noteDialog");
const closedialog=document.getElementById("closeDialog");
const dialogbox=document.getElementById("dialogBox");

// localStorage.clear();
displayHomeContent();
console.log("hi");
addTask.addEventListener("click", () => {
    addTaskDialogFunc();
})

home.addEventListener("click", () => {
    displayHomeContent();
})

today.addEventListener("click", () => {
    displayTodayContent();
})

week.addEventListener("click", () => {
    displayWeekContent();
})



notes.addEventListener("click", () => {
    displayNotesContent();
})

noteDialog.addEventListener("click", () => {
    showNotesContent();
})

function displayProjectSidebar(){
    projects.innerText="";
    let projectlist=[];
    if(localStorage.projects!=undefined)
    projectlist=localStorage.projects.split(";");
    let setofprojects=new Set();
    for(let i=1;i<projectlist.length;i++){
        setofprojects.add(projectlist[i]);
    }
    console.log(setofprojects);
    for(const x of setofprojects){
        const projectBtn=document.createElement("button");
        console.log(x);
        projectBtn.innerText=x;
        projectBtn.id=x;
        projects.appendChild(projectBtn);
        projectBtn.addEventListener("click",()=>{
            displayProject(x);
        });
    }
}

closedialog.addEventListener("click",()=>{
    dialogbox.close();
})

displayProjectSidebar();
export {displayProjectSidebar};