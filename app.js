/* В данной программе используется локальной хранилище и json сервер для хранения данных
Cервер запускулся через командную строку среды разработки WebStorm командой json-server -w data.json
где data.json файл где хранятся данные

 * */
class Person {
    constructor(options) {
        this.first_name = options.first_name
        this.last_name = options.last_name
        this.id = options.id
    }

    addToServer() {
        const data = {
            "first_name": this.first_name.toString(),
            "last_name": this.last_name.toString(),
            "id": getUniqueID()
        }
        console.log(data.id);
        console.log("add_to_Server")
        const requestURL = "http://localhost:3000/posts"
        const xhr = new XMLHttpRequest()
        xhr.open("POST", requestURL);
        xhr.responseType = "json"
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send(JSON.stringify(data))
    }

    addToLocalStorage() {
        let data = JSON.parse(localStorage.getItem("Persons"))
        data.push[this]
        localStorage.setItem("Persons", JSON.stringify(data))
        console.log(data);
        this.addToServer()
    }

    delFromServer() {

        console.log(this.id);
        console.log("del_from_Server")
        const requestURL = "http://localhost:3000/posts" + "/" + this.id.toString()
        console.log(requestURL)
        const xhr = new XMLHttpRequest()
        xhr.open("DELETE", requestURL, true)
        xhr.onload = function () {
            var users = JSON.parse(xhr.responseText)
            if (xhr.readyState === 4 && xhr.status === "200") {
                console.table(users)
            } else {
                console.error(users)
            }
            xhr.send(null)
        }
    }

    changeOnServer() {
        const data = {
            "first_name": this.first_name.toString(),
            "last_name": this.last_name.toString(),
            "id": this.id
        }
            console.log(this.id);
            const requestURL = "http://localhost:3000/posts"+"/"+this.id.toString()
            console.log(requestURL);
            const xhr = new XMLHttpRequest()

            xhr.open("PUT", requestURL, true)
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8')
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText)
                if (xhr.readyState === 4 && xhr.status === "200") {
                    console.table(users)
                } else {
                    console.error(users)
                }
                xhr.send(JSON.stringify(data))
            }


    }
}
function getUniqueID() {
    let id = localStorage.length
    let data = JSON.parse(localStorage.getItem("Persons"))
    for (elem of data)
    {
        if (elem.id.toString() === id.toString())
        {
            id++
        }
    }
    return id
}

function changeInfo(id)
{
    const name = prompt('Введите имя сотрудника?', " ");
    const name2 = prompt('Введите фамилию сотрудника?', " ");
    alert('Данные будут изменены')
    const data_for_change = {
    "first_name":name,
        "last_name": "White",
        "id": id
    }
    const person_data = new Person(data_for_change)
    person_data.changeOnServer()
    showAll()
}

function uploadData() {
    const requestURL ="http://localhost:3000/posts"
    const xhr = new XMLHttpRequest()
    xhr.open('GET',requestURL)
    xhr.responseType = "json"
    xhr.onload =() => {
        const data = xhr.response
        localStorage.setItem("Persons", JSON.stringify(data))
    }
    xhr.send()
}

function getDataFromServer()
{
    uploadData()
    let data
    const requestURL ="http://localhost:3000/posts"
    const xhr = new XMLHttpRequest()
    xhr.open('GET',requestURL)
    xhr.responseType = "json"
    xhr.onload =() => {
        data = xhr.response
        let html = ''
        for (let i=0; i<data.length;i++)
        {
                html += `<div class="div">` + data[i].first_name + " " + data[i].last_name
                html+= `<div class="div2" ><button type="submit" onclick="changeInfo(` + i.toString() + `)"`
                html+=  `class="button1"></button><button type="submit" onclick="delInfo(` + i.toString() + `)"`
                html+= `class="button2"></button> </div></div><br>`
        }
        list = document.getElementById('div_server_data')
        list.innerHTML = html
    }
    xhr.send()

}

function name_click(){
    const name = prompt('Введите имя сотрудника?', " ");
    const name2 = prompt('Введите фамилию сотрудника?', " ");
    const data = new Person({"first_name":name,
        "last_name":name2,
        "id":getUniqueID()
                        })
    data.addToLocalStorage()
    showAll()
}

function delInfo(id) { // нужно удалить с сервера, а локальное хранилище обновится данными с сервера
    alert('Данные будут удалены')
    const data = JSON.parse(localStorage.getItem("Persons"))
    const data_for_delete = data[parseInt(id)]
    const person_data = new Person(data_for_delete)
    person_data.delFromServer()
    showAll()
}

function showAll() {
    uploadData()
    getDataFromServer()
}

showAll()