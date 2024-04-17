const btn = document.getElementById('abc1')
const tableBody = document.querySelector('#dataTable tbody');

const sendHttpRequest = (method, url) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
    
        xhr.responseType = 'json'
    
        xhr.onload = () => {
           resolve(xhr.response)
       }
    
        xhr.send()
    })
    return promise
    
}

const getdata = () => {
     sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(responsedata => {
            tableBody.innerHTML = '';

            responsedata.forEach(data => {
                const row = tableBody.insertRow();
                row.insertCell().textContent = data.userId;
                row.insertCell().textContent = data.id;
                row.insertCell().textContent = data.title;
                row.insertCell().textContent = data.body;
            });
     })
}

btn.addEventListener('click', getdata)


function sort(selector, col){
    var table = document.querySelector(selector)
    var tbody = table.querySelector('thead')
    var rows = Array.from(document.querySelectorAll('tr'))
    var not = rows.filter(row => !row.querySelector('th'))
    var sorted 

    if(col === 'td:nth-child(1)'){
        sorted = not.sort((a, b) => {
            return a.textContent.localeCompare(b.textContent)
        })
    } else if(col === 'td:nth-child(2)'){
        sorted = not.sort((a, b) => {
            var avalue = parseInt(a.querySelector(col).textContent)
            var bvalue = parseInt(b.querySelector(col).textContent)
            return bvalue - avalue
        })
    }

    sorted.forEach(row => {
        tbody.appendChild(row)
    })
}