import { format } from "date-fns";
import { displayProjectSidebar } from ".";
import "./mainpage.css";

function displayHomeContent() {
    const content = document.getElementById("content");
    content.style.display = "flex";
    content.style.flexDirection = "column";
    content.innerText = "";
    let todolist = [];
    if (localStorage.getItem("todos") != null)
        todolist = localStorage.getItem("todos").split(";");
    for (let i = 0; i < todolist.length; i++) {
        if (i == 0) continue;
        const todoobj = JSON.parse(todolist[i]);
        const tododiv = document.createElement('div');

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        if (todoobj.done === 1) {
            checkBox.checked = 1;
        }
        function checkFunction() {
            if (checkBox.checked == true) {
                todoobj.done = 1;
                
            } else {
                todoobj.done = 0;
            }
            let semicolon = 0;
            let str = localStorage.getItem("todos");
            let temp = str;
            let st, end;
            for (let j = 0; j < str.length; j++) {
                if (str[j] === ';') {
                    semicolon++;
                }
                if (semicolon === i - 1) {
                    st = j;
                }
                if (semicolon === i) {
                    end = j + 1;
                }
            }
            let temp1 = temp;
            localStorage.todos = temp1.slice(0, st + 1) +";"+JSON.stringify(todoobj)+ temp.slice(end);
        }
        checkBox.addEventListener("click", checkFunction);

        const title = document.createElement("p");
        title.innerText = `${todoobj["title"]}`;

        const details = document.createElement("button");
        details.innerText = "Details";
        console.log(todoobj)
        const dueDate = document.createElement("p");
        dueDate.innerText = `${format(new Date(todoobj["dueDate"]), 'do LLL')}`;

        const discard = document.createElement("button");
        discard.innerText = "delete";

        const priority = todoobj["priority"];
        if (priority === "high") {
            tododiv.style.boxShadow = "10px 0px red inset";
        }
        else if (priority === "medium") {
            tododiv.style.boxShadow = "10px 0px yellow inset";

        }
        else {
            tododiv.style.boxShadow = "10px 0px lightgreen inset";

        }
        tododiv.style.display = "flex";
        tododiv.style.justifyContent = "space-around";
        tododiv.style.margin = "20px";
        tododiv.style.border = "2px solid black";
        //tododiv.style.padding="10px";
        tododiv.style.fontSize = "30px";
        checkBox.style.flex = "1";
        title.style.flex = "10";
        details.style.flex = "3";
        dueDate.style.flex = "3";
        discard.style.flex="2";
        discard.style.margin="20px";
        dueDate.style.textAlign="center";
        checkBox.style.margin = "20px";
        title.style.margin = "20px";
        details.style.margin = "20px";
        dueDate.style.margin = "20px";
        tododiv.appendChild(checkBox);
        tododiv.appendChild(title);
        tododiv.appendChild(details);
        tododiv.appendChild(dueDate);
        tododiv.appendChild(discard);
        content.appendChild(tododiv);

        discard.addEventListener("click", () => {
            let semicolon = 0;
            let flag = 0;
            let str = localStorage.getItem("todos");
            let temp = str;
            let st, end;
            for (let j = 0; j < str.length; j++) {
                if (str[j] === ';') {
                    semicolon++;
                }
                if (semicolon === i - 1) {
                    st = j;
                }
                if (semicolon === i) {
                    end = j + 1;
                }
            }
            let temp1 = temp;
            localStorage.todos = temp1.slice(0, st + 1) + temp.slice(end);
            localStorage.projects=localStorage.getItem("projects").replace(`;${todoobj.project}`,"");
            displayHomeContent();
            displayProjectSidebar();
        });

        details.addEventListener("click", () => {
            const detaildialog = document.createElement("dialog");
            detaildialog.style.height = "300px";
            detaildialog.style.width = "600px";
            detaildialog.style.margin = "auto";
            detaildialog.style.backgroundColor="var(--mainpage-header)";
            detaildialog.style.fontSize="30px";
            const dialogHeader = document.createElement("div");
            dialogHeader.style.color="var(--tododiv)";
            dialogHeader.style.margin="10px";
            const dialogTitle = document.createElement("h2");
            dialogTitle.innerText = `Title : ${todoobj.title}`;
            dialogTitle.style.margin = "10px";
            const closebutton = document.createElement("button");
            closebutton.innerText = "X";
            closebutton.style.padding="5px";
            closebutton.style.margin = "15px";
            closebutton.style.height="30px";
            dialogHeader.appendChild(dialogTitle);
            dialogHeader.appendChild(closebutton);
            dialogHeader.style.display = "flex";
            dialogHeader.style.justifyContent = "space-between";
            const dialogDetails=document.createElement("div");
            dialogDetails.innerText=`Details: ${todoobj.details}`;
            const due=document.createElement("div");
            due.innerText=`Due Date: ${todoobj.dueDate}`;
            const priorityy=document.createElement("div");
            priorityy.innerText=`Priority : ${todoobj.priority}`;
            const status=document.createElement("div");
            if(todoobj.done===1){
                status.innerText="Status : Done";
            }
            else{
                status.innerText="Status : Not Done";
            }
            dialogDetails.style.color="var(--tododiv)";
            dialogDetails.style.margin="10px";
            due.style.color="var(--tododiv)";
            due.style.margin="10px";
            priorityy.style.color="var(--tododiv)";
            priorityy.style.margin="10px";
            status.style.color="var(--tododiv)";
            status.style.margin="10px";
            detaildialog.appendChild(dialogHeader);
            detaildialog.appendChild(dialogDetails);
            detaildialog.appendChild(due);
            detaildialog.appendChild(priorityy);
            detaildialog.appendChild(status);
            detaildialog
            content.appendChild(detaildialog);
            detaildialog.showModal();
            closebutton.addEventListener("click", () => {
                detaildialog.close();
            })

        })

        tododiv.style.backgroundColor="var(--tododiv)";
        tododiv.style.border="none";
        tododiv.style.borderRadius="10px";
        details.style.backgroundColor="var(--tododiv)";
        details.style.color="black";
        discard.style.backgroundColor="var(--tododiv)";
        discard.style.color="black";
        tododiv.addEventListener("mouseover",()=>{
            tododiv.style.margin="25px";
        })
        tododiv.addEventListener("mouseout",()=>{
            tododiv.style.margin="20px";
        })
    }
}

export { displayHomeContent };