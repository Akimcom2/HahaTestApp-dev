
// Получение всех пользователей
async function GetUsers() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const users = await response.json();
        let rows = document.querySelector("tbody");
        users.forEach(user => {
            // добавляем полученные элементы в таблицу
            rows.append(row(user));
        });
    }
}
// Получение одного пользователя
async function GetUser(id) {
    const response = await fetch("/api/users/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        const form = document.forms["userForm"];
        form.elements["id"].value = user.id;
        form.elements["name"].value = user.name;
        form.elements["age"].value = user.age;
        form.elements["role"].value = user.role;
        form.elements["points"].value = user.points;
    }
}
// Добавление пользователя
async function CreateUser(userName, userAge,userRole,userPoints) {
    if(!userName == null|!userName == undefined|!userName==""&!userAge == null|!userAge == undefined|!userAge=="" ){
        let response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                name: userName.toString(),
                age: userAge.toString(),
                role: userRole.toString(),
                points: userPoints.toString()
            })
        });

        let user = await response.json();
        user.name = userName.toString();
        user.age = userAge.toString();
        user.role = userRole.toString();
        user.points = userPoints.toString();

        reset();

        let tbody = document.querySelector("tbody");
        tbody.insertAdjacentHTML("beforeend", row(user));

    }

}
// Изменение пользователя
async function EditUser(userId, userName, userAge,userRole,userPoints) {
    const response = await fetch("api/users", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: userId,
            name: userName,
            age: userAge,
            role: userRole,
            points: userPoints
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + user.id + "']").replaceWith(row(user));
    }
}
// Удаление пользователя
async function DeleteUser(id) {
    const response = await fetch("/api/users/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector("tr[data-rowid='" + user.id + "']").remove();
    }
}

// сброс формы
function reset() {
    const form = document.forms["userForm"];
    form.reset();
    form.elements["id"].value = 0;
}
// создание строки для таблицы
function row(user) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);

    const idTd = document.createElement("td");
    idTd.append(user.id);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(user.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(user.age);
    tr.append(ageTd);

    const roleTd = document.createElement("td");
    roleTd.append(user.role);
    tr.append(roleTd);

    const pointsTd = document.createElement("td");
    pointsTd.append(user.points);
    tr.append(pointsTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", user.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        GetUser(user.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", user.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        DeleteUser(user.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
// сброс значений формы
document.getElementById("reset").click(function (e) {

    e.preventDefault();
    reset();
})

// отправка формы
document.forms["userForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["userForm"];
    const id = form.elements["id"].value;
    const name = form.elements["name"].value;
    const age = form.elements["age"].value;
    const role = form.elements["role"].value;
    const points = form.elements["points"].value;
    if (id == 0){
        CreateUser(name, age,role,points)}
    else
        EditUser(id, name, age,role,points);
});

// загрузка пользователей
GetUsers();