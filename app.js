const table = document.getElementById('table')
const player = document.getElementById('player')
const winer = document.getElementById('winer')
const button = document.getElementById('button')
let num = 0
let turn = 0 //今プレイしているプレイヤー
let total = 0 //総ターン数
const pattern = [ //勝ちパターン
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const SetUp = () => {
    const fragment = document.createDocumentFragment()
    for (let i = 0; i <= 2; i++) {
        const tr = document.createElement('tr')
        tr.align = "center"
        for (let j = 0; j <= 2; j++) {
            const td = document.createElement('td')
            td.setAttribute('id', num)
            td.addEventListener('click', handleClick)
            tr.appendChild(td)
            num += 1
        }
        fragment.appendChild(tr)
    }
    table.appendChild(fragment)
}
window.onload = SetUp

const handleClick = (e) => {
    if (e.target.textContent) {
        alert("すでに埋まっています")
        return
    }
    if (turn === 1) {
        e.target.textContent = "×"
        Check()
        player.textContent = "1Pの番です(○)"
        turn = 0
    } else {
        e.target.textContent = "○"
        Check()
        player.textContent = "2Pの番です(×)"
        turn = 1
    }
    total += 1
}

const Check = () => {
    for (let i = 0; i < pattern.length; i++) {
        const index1 = document.getElementById(pattern[i][0])
        const index2 = document.getElementById(pattern[i][1])
        const index3 = document.getElementById(pattern[i][2])

        if (!index1.textContent || !index2.textContent || !index3.textContent) {
            continue
        }

        if (index1.textContent === index2.textContent && index1.textContent === index3.textContent && index2.textContent === index3.textContent) {
            winer.textContent = `勝者は${turn ? 2 : 1}Pです`
            table.style.pointerEvents = "none"
            index1.classList.add("background")
            index2.classList.add("background")
            index3.classList.add("background")
            button.classList.remove('button')
            return
        }
    }
    if (total === 8) {
        winer.textContent = `引き分けです`
        table.style.pointerEvents = "none"
        button.classList.remove('button')
    }
}

const Reset = () => {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).textContent = ""
        document.getElementById(i).classList.remove('background')
    }
    turn = 0
    total = 0
    winer.textContent = ""
    player.textContent = "1Pの番です(○)"
    table.style.pointerEvents = "auto"
    button.classList.add('button')
}

button.addEventListener('click', Reset)