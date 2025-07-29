/* Logic pagination
    1. Display data (define start and end index with itemPerPage and currentPage and slice data)
    2. Display pagination (calculate total pages, create button and add event listener)
    3. Handle previous and next buttons
*/

const data = [
    {
        id: 1,
        img: './assets/img/mern.png',
        main_content: 'Mern Full Stack Development Classroom',
        description: 'This is the content of Card 1',
    },
    {
        id: 2,
        img: './assets/img/dev.png',
        main_content: 'Dev Ops Live',
        description: 'This is the content of Card 2',
    },
    {
        id: 3,
        img: './assets/img/gate.png',
        main_content: 'Gate Date Science And Artificial Intelligence',
        description: 'This is the content of Card 3',
    },
    {
        id: 4,
        img: './assets/img/course.png',
        main_content: 'Gate Crash Course 2024',
        description: 'This is the content of Card 4',
    },
    {
        id: 2,
        img: './assets/img/dev.png',
        main_content: 'Dev Ops Live',
        description: 'This is the content of Card 2',
    },
    {
        id: 3,
        img: './assets/img/gate.png',
        main_content: 'Gate Date Science And Artificial Intelligence',
        description: 'This is the content of Card 3',
    },
    {
        id: 4,
        img: './assets/img/course.png',
        main_content: 'Gate Crash Course 2024',
        description: 'This is the content of Card 4',
    },
    {
        id: 1,
        img: './assets/img/mern.png',
        main_content: 'Mern Full Stack Development Classroom',
        description: 'This is the content of Card 1',
    },
    {
        id: 2,
        img: './assets/img/dev.png',
        main_content: 'Dev Ops Live',
        description: 'This is the content of Card 2',
    },
    {
        id: 2,
        img: './assets/img/dev.png',
        main_content: 'Dev Ops Live',
        description: 'This is the content of Card 2',
    },
    {
        id: 4,
        img: './assets/img/course.png',
        main_content: 'Gate Crash Course 2024',
        description: 'This is the content of Card 4',
    },
    {
        id: 3,
        img: './assets/img/gate.png',
        main_content: 'Gate Date Science And Artificial Intelligence',
        description: 'This is the content of Card 3',
    },
    {
        id: 4,
        img: './assets/img/course.png',
        main_content: 'Gate Crash Course 2024',
        description: 'This is the content of Card 4',
    },
    {
        id: 1,
        img: './assets/img/mern.png',
        main_content: 'Mern Full Stack Development Classroom',
        description: 'This is the content of Card 1',
    },
    {
        id: 2,
        img: './assets/img/dev.png',
        main_content: 'Dev Ops Live',
        description: 'This is the content of Card 2',
    },
    {
        id: 2,
        img: './assets/img/dev.png',
        main_content: 'Dev Ops Live',
        description: 'This is the content of Card 2',
    },
]

function init() {
    displayData()
    displayPagination()
    setupPagination()
}

const itemPerPage = 4
let currentPage = 1
const lastPage = Math.ceil(data.length / itemPerPage)

function displayData() {
    const start = (currentPage - 1) * itemPerPage
    const end = start + itemPerPage
    //Paginate the data
    const paginatedData = data.slice(start, end)

    const container = document.querySelector('.container')
    container.innerHTML = ''

    // Create and append the items
    const template = paginatedData.map(item => 
        `<div class="list-items">
            <img class="img-item" src="${item.img}" />
            <div class="content"> 
                <p class="main-content">${item.main_content}</p>
                <p class="description">${item.description}</p>
            </div>
        </div>`
    ).join('')

    container.innerHTML = template
}

function displayPagination() {
    const totalPages = lastPage
    const pageNumbers = document.querySelector('.page-numbers')
    pageNumbers.innerHTML = ''

    const contentItem = document.querySelector('.content-item')
    contentItem.innerHTML = ''
    const pItem = document.createElement('p')
    pItem.innerHTML = `Page ${currentPage} of ${totalPages}`
    contentItem.appendChild(pItem)

    // Create number buttons
    for(let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button')
        button.textContent = i
        button.className = i === currentPage ? 'page-btn active' : 'page-btn'
        button.addEventListener('click', () => {
            currentPage = i
            displayData()
            displayPagination()
        })

        pageNumbers.appendChild(button)
    }
}

function setupPagination() {
    const preBtn = document.querySelector('.pre-btn')
    const nextBtn = document.querySelector('.next-btn')

    preBtn.addEventListener('click', () => {
        if(currentPage > 1) {
            currentPage--
            displayData()
            displayPagination()
        }
    })

    nextBtn.addEventListener('click', () => {
        if(currentPage < lastPage) {
            currentPage++
            displayData()
            displayPagination()
        }
    })
}

init()