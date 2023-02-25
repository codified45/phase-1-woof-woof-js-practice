
const init = () => {
    let pupDataUrl = 'http://localhost:3000/pups';
    let dogBar = document.querySelector('#dog-bar');
    let dogInfo = document.querySelector('#dog-info');
    let goodDogFilter = document.querySelector('#good-dog-filter');
    goodDogFilter.addEventListener('click', dogFilter);

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
            };
        });
    
    function displayPupInfo(e){
        let singlePupUrl = pupDataUrl + `/${e.target.id}`
        console.log(singlePupUrl);
        fetch(singlePupUrl)
        .then(res => res.json())
            .then(obj => {
                let img = document.createElement('img');
                img.src = obj.image;
                let h2 = document.createElement('h2');
                h2.textContent = obj.name;
                let btn = document.createElement('button');
                btn.id = obj.id;
                if (obj.isGoodDog){btn.textContent = 'Good Dog!';
                } else {btn.textContent = 'Bad Dog!'};
                btn.addEventListener('click', goodBadToggle);
                dogInfo.append(img, h2, btn);
            });
    };

    function goodBadToggle(e){
        if (e.target.textContent === 'Good Dog!'){
            e.target.textContent = 'Bad Dog!';
            dbPatch(false);
        } else {e.target.textContent = 'Good Dog!';
            dbPatch(true);
        };

        function dbPatch(bool){
            const dogBool = {
                isGoodDog: bool,
            };

            const configPatch = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(dogBool),
            };

            let singlePupUrl = pupDataUrl + `/${e.target.id}`;

            fetch(singlePupUrl, configPatch)
            .then(res => res.json())
                .then(obj => {
                    console.log(obj);
                });
        };
    };

    function dogFilter(e){
        
    };

};

document.addEventListener('DOMContentLoaded', init);