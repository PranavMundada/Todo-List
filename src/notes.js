import "./mainpage.css";

function displayNotesContent(){
    const content = document.getElementById("content");
    content.innerText = "";
    let notelist = [];
    if (localStorage.getItem("note") != null)
        notelist = localStorage.getItem("note").split(";");
    notelist.sort((a, b) => a.length - b.length);
    console.log(notelist);
    const div1=document.createElement("div");
    div1.classList.add("col1");
    const div2=document.createElement("div");
    div2.classList.add("col2");
    const div3=document.createElement("div");
    div3.classList.add("col3");
    const divs=[div1,div2,div3];
    for(let i=0;i<notelist.length;i++){
        if(i==0)continue;
        const noteobj=JSON.parse(notelist[i]);
        console.log(noteobj);
        const note=document.createElement("div");
        note.style.border="2px solid black";
        note.style.width="400px";
        note.style.margin="20px";
        note.style.padding="20px";
        const noteTitle=document.createElement("h2");
        noteTitle.innerText=noteobj.title;
        noteTitle.style.margin="10px"
        noteTitle.style.fontSize="30px";
        const noteDetail=document.createElement("p");
        noteDetail.innerText=noteobj.details;
        noteDetail.style.margin="10px";
        noteDetail.style.marginTop="30px";
        noteDetail.style.width="380px";
        noteDetail.style.fontSize="20px";
        noteDetail.style.wordWrap="break-word";
        const deletebtn=document.createElement("button");
        deletebtn.innerText="del";
        note.appendChild(deletebtn);
        note.appendChild(noteTitle);
        note.appendChild(noteDetail);
        divs[(i-1)%3].appendChild(note);
        deletebtn.addEventListener("click",()=>{
            let semicolon = 0;
            let str = localStorage.getItem("note");
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
            localStorage.note = temp1.slice(0, st + 1) + temp.slice(end);
            displayNotesContent();
        })
    }
    const notediv=document.createElement("div");
    notediv.classList.add("notediv");
    notediv.appendChild(div1);
    notediv.appendChild(div2);
    notediv.appendChild(div3);
    content.appendChild(notediv);
}

export {displayNotesContent}