
const init = () => {
    let pupDataUrl = 'http://localhost:3000/pups';
    let dogBar = document.querySelector('#dog-bar');
    let dogInfo = document.querySelector('#dog-info');

    fetch(pupDataUrl)
    .then(res => res.json())
        .then(arr => {
            console.log(arr);
            for (const obj of arr){
                let span = document.createElement('span');
                span.textContent = obj.name;
                span.id = obj.id;
                span.addEventListener('click', displayPupInfo);
                dogBar.appendChild(span);
            }
        });
    
    function displayPupInfo(e){
        console.log(e.target.id);
    };
};

document.addEventListener('DOMContentLoaded', init);