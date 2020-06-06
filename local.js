
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
}

function del_info(id) {
    alert('Данные будут удалены')
    localStorage.removeItem(id.toString())
    show_all()
}


function show_all() {
    console.log('show')
    let keys = make_local_storage_keylist()
    let html = ''
    for (key of keys)
    {
        let x = localStorage.getItem(key)
        if (typeof x === "string")
        {

            x = JSON.parse(x)
            console.log(x.first_name)
            html += `<div class="div">` + x.first_name + " " + x.last_name
            html+= `<div class="div2" ><button type="submit" onclick="change_info(` + key + `)"`
            html+=  `class="button1"></button><button type="submit" onclick="del_info(` + key + `)"`
            html+= `class="button2"></button> </div></div><br>`
        }

    }
    console.log(html)
    list = document.getElementById('div1')
    list.innerHTML = html
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