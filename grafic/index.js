var array = [5,8,2,1,15,2,3,5,9,11,10,4,3,14,1,7,10,3,2,13];
var board = document.querySelector('.board');
var resetBtn = document.getElementById('resetBtn');
var setBtn = document.getElementById('setBtn');

resetBtn.addEventListener('click', function(){
    reset();
});
setBtn.addEventListener('click', function(){
    setWindow();
});

buildGraphic(array);

function buildGraphic (arr) {
    let length = arr.length;
    let max = getMaxValue(arr);
    let width = 1000 / length - 10;             
    let highStep = Math.floor(500 / max);       

    let mapped = arr.map(function(val, i){         
        let a = {};
        a.value = val;
        a.hight = highStep * val;
        a.status = val > 10 ? "high" : val > 5 ? "medium" : "low";
        a.index = i;
        return a;
    });
    setTimeout(function() {
        printAxis(max, document.querySelector('.y-axis'))
    }, 300);
    printBars(mapped, board);
    
    function printBars(arr, parent){
        let cash = null;
        for(let i=0; i < arr.length; i++){
            cash = createBar(arr[i]);
            parent.appendChild(cash);
            cash = null;
        }
    }
    function createBar(params){
        let bar = document.createElement('div');
        let value = document.createElement('div');
        let index = document.createElement('div');
        index.className = "x-axis";
        index.innerHTML = String(params.index + 1);
        value.innerHTML = String(params.value);
        value.className = "value";
        bar.appendChild(value);
        bar.classList.add(params.status);
        bar.classList.add("bar");
        setTimeout(function(){bar.style.height = params.hight + 'px'}, 300);
        setTimeout(function(){bar.appendChild(index);}, 300);
        // bar.appendChild(index);
        bar.style.width = width + 'px';
        return bar;
    }
    function getMaxValue(array){
        let max = 0;
        for (let i = 0; i < array.length; i++){
            array[i] > max ? max = array[i] : max=max;
        }
        return max;
    }
    function printAxis(maxValue, parent){
        function createAxis (value){
            let step = document.createElement('div');
            step.style.height = highStep + 'px';
            step.className = "y-item";
            step.innerHTML = "<span>" + (value + 1) + "</span>";
            return step
        }
        let cash = null;
        for (let i = 0; i < maxValue; i++){
            cash = createAxis(i);
            parent.appendChild(cash);
            cash = null;
        }
    }
}

function reset(){
    clearField(board);
    buildGraphic(array);
}
function clearField(field) {
    let children = field.children;
    console.log(children[0].children.length);
    while (children.length != 1){
        field.removeChild(children[1]);
    }
    while (children[0].children.length != 0){
        children[0].removeChild(children[0].children[0]);
    }
    // for (let i = 1; i < children.length; i++){
    //     console.log(children[i]);
    //     field.removeChild(children[i]);
    // }
}

function setWindow() {
    let bg = document.createElement('div');
    bg.className = "modal-bg";
    
    showModal();
    modalWindow();

    function showModal() {
        document.body.insertBefore(bg, document.body.firstElementChild);
    }
    function modalWindow(){
        let window = document.createElement('div');
        let heading = document.createElement('h3');
        heading.innerHTML = 'Test';
        let closeButton = document.createElement('button');
        closeButton.innerHTML = 'Close';
        closeButton.onclick = function (){
            document.body.removeChild(bg)
        }
        window.appendChild(heading);
        window.appendChild(closeButton);
        bg.appendChild(window);
    }
}