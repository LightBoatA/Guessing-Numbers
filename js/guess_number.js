let password = '0000';
let times = 7; // 总次数
const MIN = 0;
const MAX = 9;
window.onload = function () {
    generatePassword();
    console.log('答案是：', password);
}
function submit() {
    const ipt = document.querySelector('.ipt');
    const tips = document.querySelector('.tips');
    if (ipt && tips) {
        const validData = validation(ipt.value);
        if (validData.res) {
            // 校验通过
            times--;
            const num = ipt.value;
            const res = calcRes(num);
            const isRight = res === '4A0B';
            // 渲染结果行
            generateResLine(num, res, isRight);
            // 渲染剩余次数
            changeRemaining();
            // 调整输入组件
            updateInput(isRight);
            if (isRight) {
                alert('难道你真是天才？！！')
            }
        }
        tips.innerHTML = validData.err;
    }
}
function validation(input) {
    const set = new Set(input);
    if (set.size === 4) {
        return {
            res: true,
            err: ''
        }
    }
    return {
        res: false,
        err: '请输入4位数字，且不能重复！',
    }
}
function updateInput(isRight) {
    const ipt = document.querySelector('.ipt');
    const btn = document.querySelector('.btn');
    const showAnswer = document.querySelector('.show-answer');
    if (ipt && btn && showAnswer) {
        ipt.value = '';
        if (times <= 0 || isRight) {
            ipt.disabled = true;
            btn.disabled = true;
            showAnswer.disabled = false;
        }
    }

}

function changeRemaining() {
    const remaining = document.querySelector('.remaining');
    if (remaining) {
        remaining.innerHTML = '剩余次数：' + times;
    }
}
function showPassword() {
    alert('答案为：' + password);
}
function calcRes(num) {
    const str = '' + num;
    let a = 0;
    let b = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (str[i] === password[j]) {
                i === j ? a++ : b++;
            }
        }
    }
    return '' + a + 'A' + b + 'B';
}
function generatePassword() {
    const set = new Set();
    let p = '';
    for (let i = 0; i < 4; i++) {
        let val = getRandom(MIN, MAX);
        while (set.has(val)) {
            val = getRandom(MIN, MAX);
        }
        set.add(val);
        p += val;
    }
    password = p;
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateResLine(num, res, isRight) {
    const ul = document.querySelector('.list');
    const liTemplate = document.querySelector('#template');
    if (ul && liTemplate) {
        const li = liTemplate.cloneNode(true);
        li.childNodes[1].innerHTML = 7 - times;
        li.childNodes[3].innerHTML = new Date().toLocaleTimeString();
        li.childNodes[5].innerHTML = num;
        li.childNodes[7].innerHTML = res;
        // 设置标签颜色类名
        const resClassName = isRight ? 'bg-green' : 'bg-red';
        li.childNodes[7].classList.add(resClassName);
        // 显示
        li.classList.remove("hidden");
        ul.appendChild(li);
    }
}

