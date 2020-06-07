function add_to_Server(person_data) {
    console.log("add_to_Server")
    console.log(person_data)
    const requestURL ="http://localhost:3000/posts"
    const xhr2 = new XMLHttpRequest()
    xhr2.open("POST", requestURL);
    xhr2.responseType = "json"
    xhr2.setRequestHeader("Content-type","application/json")
    xhr2.send (JSON.stringify(person_data))
}

function change_info_on_Server(id, new_person_data)
{
    const requestURL ="http://localhost:3000/posts"
    const xhr2 = new XMLHttpRequest()
    xhr2.open("PUT", requestURL);
    xhr2.responseType = "json"
    xhr2.setRequestHeader("Content-type","application/json")
    xhr2.send (JSON.stringify(new_person_data))
}

function upload_data() {
    const requestURL ="http://localhost:3000/posts"
    let keys = make_local_storage_keylist()
    let not_unique_keys = []
    const xhr = new XMLHttpRequest()
    xhr.open('GET',requestURL)
    xhr.responseType = "json"
    xhr.onload =() => {
        data = xhr.response
        for (key of keys)   //проход по локальному хранилищу и серверу в поисках уникальных данных
        {
            for (let i=0; i<data.length;i++)
            {
                if (data[i].id.toString() === key)
                {
                    not_unique_keys.push(key)
                }
            }
        }
        for (key of keys)
        {
            if (not_unique_keys.indexOf( key ) === -1)
            {
                let person_data = {"first_name": JSON.parse(localStorage.getItem(key)).first_name.toString(),
                                    "last_name": JSON.parse(localStorage.getItem(key)).last_name.toString(),
                                    "id": key
                }
                add_to_Server(person_data)
            }
        }

    }
    xhr.send()
}


function get_data_from_server()
{
    upload_data()
    let data
    const requestURL ="http://localhost:3000/posts"
    const xhr = new XMLHttpRequest()
    xhr.open('GET',requestURL)
    xhr.responseType = "json"
    xhr.onload =() => {
        data = xhr.response
        console.log( data.length)
        let html = ''
        for (let i=0; i<data.length;i++)
        {
                html += `<div class="div">` + data[i].first_name + " " + data[i].last_name
                html+= `<div class="div2" ><button type="submit" onclick="change_info(` + i.toString() + `)"`
                html+=  `class="button1"></button><button type="submit" onclick="del_info(` + i.toString() + `)"`
                html+= `class="button2"></button> </div></div><br>`
        }
        list = document.getElementById('div_server_data')
        list.innerHTML = html
    }
    xhr.send()

}

function add_to_local_Storage(person_data) {
    console.log(person_data)
    let new_key = localStorage.length.toString()
    let all = make_local_storage_keylist()
    while (true)
    {
        if (all.indexOf( new_key ) === -1 )
        {
            console.log(new_key);
            localStorage.setItem(new_key, JSON.stringify(person_data))
            add_to_Server(data)
            show_all()
            break
        }
        else
        {
            new_key = parseInt(new_key, 10)
            new_key++
            new_key = new_key.toString()
        }
    }

}


function nameclick(){
    const name = prompt('Введите имя сотрудника?', " ");
    const name2 = prompt('Введите фамилию сотрудника?', " ");
    //const name = document.getElementById("name1")
    //const name2 = document.getElementById("name2")
    console.log(name + name2)
    data = {"first_name":name,
        "last_name":name2}
    add_to_local_Storage(data)



}

console.log(localStorage);
function change_info(id) {
    const name = prompt('Введите имя сотрудника?', " ");
    const name2 = prompt('Введите фамилию сотрудника?', " ");
    if (name.value === '' || name2.value==='')
    {
        alert('Данные не введены')
        return 0
    }
    alert('Данные будут отредактированны')
    localStorage.removeItem(id.toString())
    data = {"first_name":name,
        "last_name":name2}
    add_to_local_Storage(data)
    let new_data = {"first_name":name,
        "last_name":name2,
        "id":id.toString()}
    change_info_on_Server(id, new_data)
}

function del_info(id) {
    alert('Данные будут удалены')
    localStorage.removeItem(id.toString())
    show_all()
}


function show_all() {

    get_data_from_server()
}

function make_local_storage_keylist() {
    keylist = []
    for (let i=0; i<localStorage.length; i++)
    {
        keylist.push(localStorage.key(i))
    }
    return keylist
}

show_all()