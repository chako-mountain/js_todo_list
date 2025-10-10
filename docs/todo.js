let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', createTodoLists);

let index = 0;
let checkedTaskCount = 0;
let taskCount = 0;

function createTodoLists() {
    const contentInput = document.getElementById("contents");
    if (contentInput.value.trim() === "") {
        return;
    }
    index +=1;
    taskCount += 1;
    const taskItem = document.createElement("div");
    taskItem.setAttribute("id",index);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";  // これでチェックボックスになります
    checkbox.setAttribute("class", "checkbox");
    

    checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
            checkedTaskCount += 1;
        } else {
            checkedTaskCount -= 1;
        }
        document.getElementById("checked_tasks").innerHTML = checkedTaskCount;
        document.getElementById("not_checked_tasks").innerHTML = index - checkedTaskCount;
    });


    taskItem.appendChild(checkbox);
    const textSpan = document.createElement("span");
    textSpan.innerText = contentInput.value;
    taskItem.appendChild(textSpan); 
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "削除"
    deleteButton.setAttribute("id","delete");

    
    deleteButton.addEventListener("click", (event) => {
        const result = window.confirm("本当に削除しますか？");
        if (!result) return; 
        const parent = event.target.parentElement;
        const checkbox = parent.getElementsByClassName("checkbox")[0];
        if (checkbox && checkbox.checked) {
            checkedTaskCount -= 1;
        }
        parent.remove();
        taskCount -= 1;
        document.getElementById("taskCount").innerText = taskCount;
        document.getElementById("checked_tasks").innerText = checkedTaskCount;
        document.getElementById("not_checked_tasks").innerText = taskCount - checkedTaskCount;
    
    });


    taskItem.appendChild(deleteButton); 
    const editButton = document.createElement("button")
    editButton.innerText = "編集"
    editButton.setAttribute("id","edit");
    editState = "no_edit"


    editButton.addEventListener("click", (event) => {
        if(editState == "no_edit"){
            let id = event.target.parentElement.id;
            const parent = event.target.parentElement; 
            const existingForm = parent.querySelector("form");
            if (!existingForm) {
                let textContents = document.getElementById(id).querySelector("span").innerHTML;
                document.getElementById(id).querySelector("span").innerHTML = ""
                const form = document.createElement("form");
                form.style.display = "inline"; 
                form.setAttribute("class", id);             
                const input = document.createElement("input");
                input.setAttribute("type", "text");
                input.value = textContents;
                form.appendChild(input);
                document.getElementById(id).querySelector("span").replaceWith(form);
                editButton.innerText = "更新"
                editState = "on_edit";
            }
        } else {
            id = event.target.parentElement.id;
            textContents = document.getElementById(id).querySelector("form").querySelector("input").value;
            newContent = document.createElement("span");
            newContent.innerHTML = textContents;
            document.getElementById(id).querySelector("form").replaceWith(newContent);
            editState = "no_edit";
            editButton.innerText = "編集"
        }
    });


    taskItem.appendChild(editButton);
    const hr = document.createElement("hr");
    taskItem.appendChild(hr);
    document.body.appendChild(taskItem);
    taskSum = document.getElementById("taskCount");
    taskSum.innerHTML = taskCount;
}
