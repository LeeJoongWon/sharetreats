import data from '../../Data/productList.json' assert { type: 'json' };

const searchBox = document.querySelector('#search-input');
const keyword = ['CHECK', 'HELP', 'CLAIM'];
console.log(data);
//검색창 입력 이벤트
searchBox.onkeyup = () => {
    // 띄워쓰기 제거
    let searchValue = searchBox.value.replace(/ /g, '');

    if (searchValue.length === 0) return;

    //엔터키 입력
    if (window.event.keyCode === 13) {
        let keywordLength = 0;
        switch (keywordMatch(searchValue)) {
            case 'CHECK':
                // keywordLength === 'CHECK' 문자열길이
                keywordLength = keyword[0].length;

                // 명령어 키워드 5 + 상품코드 9 = 14
                if (searchValue !== 14) {
                    searchBox.value = 'CHECK ';
                    searchBox.placeholder = '상품코드가 일치하지 않습니다';
                    return;
                }

                let code = searchValue.slice(keywordLength, keywordLength + 9);
                console.log(code);
                console.log(wordMatch(keyword[0].length, keyword[0].length + 9, searchValue, keyword));
                break;

            case 'HELP':
                document.location.href = '/Page/Help/help.html';
                break;

            case 'CLAIM':
                console.log('claim');
                break;

            default:
                searchBox.value = '';
                searchBox.placeholder = '명령어를 올바르게 입력해주세요. 도움말 help';
                break;
        }
    }

    removeElements();

    // 추천검색어
    for (let i of keyword) {
        if (i.toLowerCase().startsWith(searchValue) && searchValue !== '') {
            let listItem = document.createElement('li');
            listItem.classList.add('list-items');
            listItem.style.cursor = 'pointer';
            listItem.addEventListener('click', () => autocomplete(i));
            let word = '<b>' + i.slice(0, searchValue.length) + '</b>';
            word += i.slice(searchValue.length);
            listItem.innerHTML = word;
            document.querySelector('.list').appendChild(listItem);
        }
    }
};

const keywordMatch = (word) => {
    // 키워드 최소길이 3
    for (let i = 3; i <= word.length; i++) {
        if (i > 9) return null; // 키워드 최대길이
        let _keyword = word.slice(0, i).toUpperCase();
        let index = keyword.indexOf(_keyword);
        // 일치하는 키워드가 있으면 해당 키워드 리턴
        if (index !== -1) return keyword[index];
    }
};

const wordMatch = (word, arr) => {};

// 키워드 자동완성 ['CHECK', 'HELP', 'CLAIM']
const autocomplete = (value) => {
    searchBox.value = value + ' ';
    removeElements();
    searchBox.focus();
};

// 추천 키워드 삭제
const removeElements = () => {
    let items = document.querySelectorAll('.list-items');
    for (let i of items) {
        i.remove();
    }
};

const CHECK = (word) => {};
