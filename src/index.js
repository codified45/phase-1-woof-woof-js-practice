
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
                dogInfo.replaceChildren(img, h2, btn);
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
        console.log(e.target.textContent);
        let isFilterOn;
        if (e.target.textContent === 'Filter good dogs: OFF'){
            e.target.textContent = 'Filter good dogs: ON';
            isFilterOn = true;
        } else {e.target.textContent = 'Filter good dogs: OFF';
            isFilterOn = false;
        };

        let arrayOfGoodDogIds = [];
        let arrayOfBadDogIds = [];

        fetch(pupDataUrl)
        .then(res => res.json())
            .then(arr => {
                console.log(arr);
                for (const obj of arr){
                    if (obj.isGoodDog){arrayOfGoodDogIds.push(obj.id)
                    } else {arrayOfBadDogIds.push(obj.id)};
                };
                
                if (isFilterOn){
                    arrayOfBadDogIds.forEach(dogId => {
                        console.log(document.getElementById(dogId));
                        let span = document.getElementById(dogId);
                        span.classList.add("hidden");
                    });
                } else {
                    let allHiddenSpans = document.querySelectorAll('#dog-bar span.hidden');
                    allHiddenSpans.forEach(element => {
                        console.log(element);
                        element.classList.remove("hidden")
                    });
                };

                



                arrayOfGoodDogIds.forEach(dogId => {
                    console.log(document.getElementById(dogId));
                    let span = document.getElementById(dogId);
                    span.classList.remove("hidden");
                });
                

                
            });

            

        // console.log(document.querySelectorAll('#dog-bar span'));
        // let dogsInBar = document.querySelectorAll('#dog-bar span');
        // console.log(dogsInBar);


    };

};

document.addEventListener('DOMContentLoaded', init);