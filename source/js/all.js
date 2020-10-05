//初始
function init() {
    let dataBMI = JSON.parse(localStorage.getItem('dataBMI')) || [];
    if (dataBMI !== []) {
        localStorage.setItem('dataBMI', JSON.stringify(dataBMI));
        updateBMI();
    }
}
init();

//事件監聽
document.querySelector('.weight').addEventListener('blur', contentCheck);
document.querySelector('.height').addEventListener('blur', contentCheck);
document.querySelector('.btn-result').addEventListener('click', addObject);
document.querySelector('.btn-result').addEventListener('click', showResult);
document.querySelector('.list').addEventListener('click', deleteItem);
document.querySelector('.btn-clear').addEventListener('click', clearAll);
document.body.addEventListener('keydown', refresh);

//確認欄位是否空白
function contentCheck(e) {
    let str = e.target.value;
    if (str === '') {
        alert('此欄位不可空白唷！');
    }
}
//資料處理建立+將資料加入localStorage+//網頁內容更新(下方標籤和右邊結果)
function addObject(e) {
    e.preventDefault();
    let dataBMI = JSON.parse(localStorage.getItem('dataBMI')) || [];
    const addWeight = document.querySelector('.weight').value;
    const addHeight = document.querySelector('.height').value;
    //如果任一欄位沒有填入的話就不執行以下函式
    if (addWeight === '') {
        alert('您沒有填寫您的體重');
        return false;
    };
    if (addHeight === '') {
        alert('您沒有填寫您的身高');
        return false;
    };
    const addBmi = (addWeight / ((addHeight / 100) * (addHeight / 100))).toFixed(2);
    showResult();
    //取得今天日期
    const fullDate = new Date();
    const yyyy = fullDate.getFullYear();
    const MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1));
    const dd = fullDate.getDate() < 10 ? ("0" + fullDate.getDate()) : fullDate.getDate();
    const today = `${yyyy}-${MM}-${dd}`;
    let object = {
        level: '',
        bmi: addBmi,
        weight: addWeight,
        height: addHeight,
        date: today,
    };
    dataBMI.push(object);
    //BMI分級
    for (let i = 0; i < dataBMI.length; i++) {
        if (dataBMI[i].bmi >= 18.5 && dataBMI[i].bmi <= 25) {
            dataBMI[i].level = '理想'
        } else if (dataBMI[i].bmi >= 16 && dataBMI[i].bmi <= 18.5) {
            dataBMI[i].level = '過輕'
        } else if (dataBMI[i].bmi >= 25 && dataBMI[i].bmi <= 30) {
            dataBMI[i].level = '過重'
        } else if (dataBMI[i].bmi >= 30 && dataBMI[i].bmi <= 35) {
            dataBMI[i].level = '輕度肥胖'
        } else if (dataBMI[i].bmi >= 35 && dataBMI[i].bmi <= 40) {
            dataBMI[i].level = '中度肥胖'
        } else if (dataBMI[i].bmi > 40) {
            dataBMI[i].level = '重度肥胖'
        } else {
            dataBMI[i].level = '嚴重體重不足'
        }
    }
    localStorage.setItem('dataBMI', JSON.stringify(dataBMI));
    updateBMI();
    showResult();
}
//網頁內容更新(FORM下方標籤結果)
function updateBMI() {
    let elList = document.querySelector('.list');
    let dataBMI = JSON.parse(localStorage.getItem('dataBMI')) || [];
    let cList = '';
    //插入HTML標籤
    for (let i = 0; i < dataBMI.length; i++) {
        cList += `<li>
            <a href="#" class="text-warning font-weight-bold" data-num="${i}">X</a>
            <span class="text-20 col-2">${dataBMI[i].level}</span>
            <div class="d-flex flex-column flex-md-row align-items-center col-2">
            <span class="text-12">BMI</span>
            <span class="text-20">${dataBMI[i].bmi}</span>
            </div>
            <div class="d-flex flex-column flex-md-row align-items-center col-2">
            <span class="text-12">weight</span>
            <span class="text-20">${dataBMI[i].weight}</span>
            </div >
            <div class="d-flex flex-column flex-md-row align-items-center col-2">
            <span class="text-12">height</span>
            <span class="text-20">${dataBMI[i].height}</span>
            </div>
            <span class="text-12 col-2 d-none d-md-inline-block">${dataBMI[i].date}</span>
            </li>`;
    }
    elList.innerHTML = cList;
    //分類border顏色
    const color = {
        '理想': {
            class: 'success',
        },
        '過輕': {
            class: 'info',
        },
        '過重': {
            class: 'caveat',
        },
        '輕度肥胖': {
            class: 'warning',
        },
        '中度肥胖': {
            class: 'warning',
        },
        '重度肥胖': {
            class: 'danger',
        },
        '嚴重體重不足': {
            class: 'primary',
        },
    };
    for (let i = 0; i < dataBMI.length; i++) {
        let addListClass = document.querySelectorAll('.list li');
        let bmiLevel = dataBMI[i].level;
        addListClass[i].setAttribute('class', `row bg-white py-3 px-2 mb-2 justify-content-between align-items-center border-7 border-${color[bmiLevel].class}`);
    }    
}
//網頁內容更新(FORM右邊結果)
function showResult() {
    let elResultBlock = document.querySelector('.resultBlock');
    let cResult = '';
    //當下輸入BMI分級
    const addWeight = document.querySelector('.weight').value;
    const addHeight = document.querySelector('.height').value;
    //如果任一欄位沒有填入的話就不執行以下函式
    if (addWeight === '') {
        return false;
    };
    if (addHeight === '') {
        return false;
    };
    const addBmi = (addWeight / ((addHeight / 100) * (addHeight / 100))).toFixed(2);
    let addBmiLevel = '';
    if (addBmi >= 18.5 && addBmi <= 25) {
        addBmiLevel = '理想'
    } else if (addBmi >= 16 && addBmi <= 18.5) {
        addBmiLevel = '過輕'
    } else if (addBmi >= 25 && addBmi <= 30) {
        addBmiLevel = '過重'
    } else if (addBmi >= 30 && addBmi <= 35) {
        addBmiLevel = '輕度<br>肥胖'
    } else if (addBmi >= 35 && addBmi <= 40) {
        addBmiLevel = '中度<br>肥胖'
    } else if (addBmi > 40) {
        addBmiLevel = '重度<br>肥胖'
    } else {
        addBmiLevel = '嚴重<br>體重<br>不足'
    }
    //插入HTML標籤
    cResult +=
        `<div class="show-result">
        <div class="bmi-result">
        <div class="text-32">${addBmi}</div>
        <div class="text-12">BMI</div>
        <button class="btn-restart">
        <img src="images//icons_loop.png" width="14px" height="19px" alt="restart_icon">
        </button>
        </div>
        <span class="text-32 ml-2">${addBmiLevel}</span>
        </div>`;
    elResultBlock.innerHTML = cResult;
    //分類顏色(FORM右邊結果)
    const color = {
        '理想': {
            class: 'success',
        },
        '過輕': {
            class: 'info',
        },
        '過重': {
            class: 'caveat',
        },
        '輕度<br>肥胖': {
            class: 'warning',
        },
        '中度<br>肥胖': {
            class: 'warning',
        },
        '重度<br>肥胖': {
            class: 'danger',
        },
        '嚴重<br>體重<br>不足': {
            class: 'primary',
        },
    };
    let form = document.querySelector('.formClass');
    let addShowResultClass = document.querySelector('.resultBlock .show-result');
    let addBmiResultClass = document.querySelector('.resultBlock .bmi-result');
    let addBtnRestartClass = document.querySelector('.resultBlock .btn-restart');
    addShowResultClass.setAttribute('class', `show-result d-flex align-items-center justify-content-md-end text-${color[addBmiLevel].class}`);
    addBmiResultClass.setAttribute('class', `bmi-result d-flex flex-column justify-content-center  text-center rounded-circle border-${color[addBmiLevel].class}`);
    addBtnRestartClass.setAttribute('class', `btn-restart rounded-circle d-flex justify-content-center align-items-center bg-${color[addBmiLevel].class}`);
    //設定重新計算功能
    addBtnRestartClass.onclick = function (e) {
        e.preventDefault();
        window.location.reload();
        form.reset();
    }
}
//清除單個項目
function deleteItem(e) {
    e.preventDefault();
    let dataBMI = JSON.parse(localStorage.getItem('dataBMI')) || [];
    const num = e.target.dataset.num;
    const nodeN = e.target.nodeName;
    if (nodeN !== 'A') { return }
    dataBMI.splice(num, 1);
    localStorage.setItem('dataBMI', JSON.stringify(dataBMI));
    updateBMI();
}
//按F5重新計算功能(避免使用者按到重新整理閃爍問題)
function refresh(e) {
    switch (e.keyCode) {
        case 116:
            e.preventDefault();
            window.location.reload();
            document.querySelector('.formClass').reset();
    }
}
//清除歷史資料
function clearAll(e) {
    e.preventDefault();
    localStorage.removeItem('dataBMI');
    dataBMI = [];
    updateBMI();
}