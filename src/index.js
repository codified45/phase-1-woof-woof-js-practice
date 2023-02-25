
const init = () => {
    let pupDataUrl = 'http://localhost:3000/pups';
    let dogBar = document.querySelector('#dog-bar');
    
    fetch(pupDataUrl)
    .then(res => res.json())
        .then(obj => {
            console.log(obj);
        });
};

document.addEventListener('DOMContentLoaded', init);