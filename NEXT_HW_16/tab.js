function displayText(tab) {
    let displayTextElement = document.getElementById('display-text');
    let buttons = document.querySelectorAll('.buttons button');
    let body = document.body;

    // Clear active class from all buttons
    buttons.forEach((button) => button.classList.remove('active'));

    switch (tab) {
        case 'tab1':
            displayTextElement.textContent = 'DOPA : 논산훈련소 선정 2023 의외의 인물';
            document.getElementById('tab1').classList.add('active');
            body.style.backgroundColor = 'coral';
            break;
        case 'tab2':
            displayTextElement.textContent = 'RALO : 2400! 2400! 2400!';
            document.getElementById('tab2').classList.add('active');
            body.style.backgroundColor = 'peachpuff';
            break;
        case 'tab3':
            displayTextElement.textContent = 'PAKA : 손인욱';
            document.getElementById('tab3').classList.add('active');
            body.style.backgroundColor = 'pink';
            break;
        case 'tab4':
            displayTextElement.textContent = 'MONSRAT : 이잉~ 기모링';
            document.getElementById('tab4').classList.add('active');
            body.style.backgroundColor = 'palevioletred';
            break;
        default:
            displayTextElement.textContent = '';
            body.style.backgroundColor = '#f4f4f4';
            break;
    }
}
