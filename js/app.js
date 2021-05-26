const main = (()=>{
    const cardDisplay = document.querySelector("#card-layout");
    const addFlashCard = document.querySelector("#add-flashcard");
    const formDiv = document.querySelector("#form-div");
    const questionText = document.querySelector("#question");
    const answerText = document.querySelector("#answer");
    const save = document.querySelector("#save");

    console.log(save)
   
    const backEndHost = "http://localhost:4000";


    fetch(`${backEndHost}/flashcard`)
        .then(response=>response.json())
            .then(json=>{
                json.data.forEach(flashcard=>{
                    cardDisplay.innerHTML+= 
                    `
                    <div data-flashid="${flashcard._id}" id="flashcard"  >
                        <div class="grid col-1 justify-items-end"><i class="far fa-window-close"></i></div>
                        <div>
                                <h3>${flashcard.question}</h3>
                                <span data-answerID="${flashcard._id}">Show Answers</span>
                        </div>
                        <div data-divname="${flashcard._id}" class="answerDiv hide">
                           <p>${flashcard.answer}</p>
                        </div>
                    </div`
                })
            })

            addFlashCard.addEventListener("click",()=>{
                formDiv.classList.toggle("hide");
            })

            cardDisplay.addEventListener("click",(event)=>{
                console.log(event.target.tagName)
                //TO toggle answer div
               if(event.target.tagName==="SPAN" && event.target.dataset.answerid === event.target.parentNode.parentNode.dataset.flashid)
               {
                   console.log(event.target.parentNode.parentNode.lastElementChild.classList.toggle("hide"));
               }

               //TO Delete a flashcard
               if(event.target.tagName === "I" && event.target.className === "far fa-window-close")
               {
                   const flashID = event.target.parentNode.parentNode.dataset.flashid;
                   fetch(`${backEndHost}/flashcard/${flashID}`,{
                       method:"DELETE",
                       headers:{
                        'content-type':'application/json'
                    }
                   })
               }
            })

            save.addEventListener("click",()=>{
                fetch(`${backEndHost}/flashcard`,{
                    method:"POST",
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify({
                        question:questionText.value,
                        answer:answerText.value
                    })
                    
                })
                questionText.value = "";
                answerText.value=""
            })


});

main();