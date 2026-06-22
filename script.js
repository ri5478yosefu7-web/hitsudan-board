const inputText = document.getElementById("inputText");
const displayText = document.getElementById("displayText");

displayText.textContent="耳が聞こえないので筆談でおねがいします。"

inputText.addEventListener("input", () => {
    displayText.textContent = inputText.value;
});

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click",() => {
    inputText.value ="",
    displayText.textContent ="";
});

const fullscreenButton = document.getElementById("fullscreenButton");
fullscreenButton.addEventListener("click",()=>{
    document.documentElement.requestFullscreen();
});

const speakButton = document.getElementById("speakButton");
speakButton.addEventListener("click",()=>{

    alert("読み上げボタンが押されました。");

    const text = 
    displayText.textContent;
    if(text.trim() === ""){
        return;
    }
    const speech = 
    new SpeechSynthesisUtterance(text);
    speech.lang = "ja-JP";
    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
});


const phraseButtons = document.querySelectorAll(".phraseButton");
phraseButtons.forEach(button => {
    button.addEventListener("click",()=>{
        displayText.textContent = button.textContent;
        displayText.classList.remove("blink");
    })
    
});

const fontMinusButton = document.getElementById("fontMinusButton");
const fontPlusButton = document.getElementById("fontPlusButton");
let fontSize = 48;

fontPlusButton.addEventListener("click",()=>{
    fontSize += 4;
    displayText.style.fontSize =
    fontSize + "px";
});

fontMinusButton.addEventListener("click",()=>{
    if(fontSize<=20){
        return;
    }
    fontSize -= 4;

    displayText.style.fontSize =
    fontSize + "px"
});

const searchInput = document.getElementById("searchInput");

const helpButton= document.getElementById("helpbutton");
helpButton.addEventListener("click",()=>{
    displayText.textContent ="🚨HELP🚨\n助けてください";
    displayText.classList.add("blink");
})


const grretingTitle = document.getElementById("grretingTitle");
const grretingArea = document.getElementById("grretingArea");

grretingTitle.addEventListener("click",()=>{
    if (grretingArea.style.display === "none"){
        grretingArea.style.display = "block";
        grretingTitle.textContent = "🔽☺️　挨拶";
    }else{
        grretingArea.style.display = "none";
        grretingTitle.textContent = "▶️☺️　挨拶";
    }
})

const convarsationTitle = document.getElementById("convarsationTitle");
const convarsationArea = document.getElementById("convarsationArea");

convarsationTitle.addEventListener("click",()=>{
    if (convarsationArea.style.display === "none"){
        convarsationArea.style.display = "block";
        convarsationTitle.textContent = "🔽💬　会話";
    }else{
        convarsationArea.style.display = "none";
        convarsationTitle.textContent = "▶️💬　会話";
    }
})

const repeatTitle = document.getElementById("repeatTitle");
const repeatArea = document.getElementById("repeatArea");

repeatTitle.addEventListener("click",()=>{
    if (repeatArea.style.display === "none"){
        repeatArea.style.display = "block";
        repeatTitle.textContent = "🔽👂️　聞き返し";
    }else{
        repeatArea.style.display = "none";
        repeatTitle.textContent = "▶️👂️　聞き返し";
    }
})

const emergencyTitle = document.getElementById("emergencyTitle");
const emergencyArea = document.getElementById("emergencyArea");

emergencyTitle.addEventListener("click",()=>{
    if (emergencyArea.style.display === "none"){
        emergencyArea.style.display = "block";
        emergencyTitle.textContent ="🔽🚑️　緊急";
    }else{
        emergencyArea.style.display = "none";
        emergencyTitle.textContent = "▶️🚑️　緊急";
    }
})

const addFavoriteButton = document.getElementById("addFavoriteButton");
const favoriteArea = document.getElementById("favoriteArea");
const clearFavoritesButton = document.getElementById("clearFavoritesButton");
const favoriteTitle = document.getElementById("favoriteTitle");

favoriteArea.style.display = "none";

favoriteTitle.addEventListener("click",()=>{
    if (favoriteArea.style.display === "none"){
        favoriteArea.style.display = "block";
    }else{
        favoriteArea.style.display = "none";
    }
})


addFavoriteButton.addEventListener("click",()=>{
    const text= inputText.value.trim();
    if(text === ""){
        return;
    }

    createFavoriteButton(text);
    saveFavorites();
    updateFavoriteCount()
    inputText.value = "";

})

function saveFavorites(){
    const favorites = [];
    const buttons = favoriteArea.querySelectorAll(".phraseButton");
    buttons.forEach(button => {
        favorites.push(button.textContent);
    });

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}
function createFavoriteButton(text){
 const button = document.createElement("button");
 const wrapper = document.createElement("div");
    button.textContent = text;
    button.className = "phraseButton";
 const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    button.addEventListener("click",()=>{
        displayText.textContent = button.textContent;
        displayText.classList.remove("blink");
    });
    button.addEventListener("contextmenu",
        (event) =>{
            event.preventDefault();
            button.remove();
            saveFavorites();

        }
    );

 const editButton = document.createElement("button");
    editButton.textContent = "✏️"

    editButton.addEventListener("click",()=>{
        const newtext = prompt(
            "定型文を作成してください",
            button.textContent
        );
        if(
            newtext === null ||
            newtext.trim() === ""
        ){
            return;
        }
        button.textContent = 
        newtext.trim();

        saveFavorites();
    });

 const upButton = document.createElement("button");
    upButton.textContent = "⬆️" ;
 const downButton = document.createElement("button");
    downButton.textContent = "⬇️";

    upButton.addEventListener("click",()=>{
        const previous = 
        wrapper.previousElementSibling;
        if(!previous){
            return;
        }

        favoriteArea.insertBefore(
            wrapper,
            previous
        );
        saveFavorites();
    });

    downButton.addEventListener("click",()=>{
        const next = 
        wrapper.nextElementSibling;
        if(!next){
            return;
        }
        favoriteArea.insertBefore(
            next,
            wrapper
        );
        saveFavorites();
    });

    deleteButton.addEventListener("click",()=>{
        wrapper.remove();
        saveFavorites();
        updateFavoriteCount()
    })

    wrapper.appendChild(button);
    wrapper.appendChild(upButton);
    wrapper.appendChild(downButton);
    wrapper.appendChild(editButton);
    wrapper.appendChild(deleteButton);
    
    favoriteArea.appendChild(wrapper);
}

function loadFavorites(){
    const favorites = 
    JSON.parse(
        localStorage.getItem("favorites")
    )||[];

    favorites.forEach(text =>{
        createFavoriteButton(text);
    });
}

clearFavoritesButton.addEventListener("click",()=>{
    const result = confirm(
        "お気に入りをすべて削除しますか？"
    );

    if(!result){
        return;
    }
    localStorage.removeItem("favorites");
    favoriteArea.innerHTML = "";
    updateFavoriteCount()
})

searchInput.addEventListener("input",()=>{
    const keyword = 
    searchInput.value.toLowerCase();
    const buttons =
    favoriteArea.querySelectorAll(".phraseButton");
    buttons.forEach(button =>{
        if(
            button.textContent
            .toLowerCase()
            .includes(keyword)
        ){
            button.parentElement.style.display =
            "block";
        }else{
            button.parentElement.style.display =
            "none";
        }

    });
});

function updateFavoriteCount(){
    const count =
    favoriteArea.querySelectorAll(
        ".phraseButton"
    ).length;

    const mark=
    favoriteArea.style.display === "none"
    ?"▶️"
    :"🔽";

    favoriteTitle.textContent=
    `${mark}⭐　お気に入り(${count}件)`;
}

loadFavorites();
updateFavoriteCount();

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click",()=>{
        document.body.classList.toggle(
            "darkMode"
        );
        if( document.body.classList.contains(
            "darkMode")
        ){
            localStorage.setItem(
                "theme",
                "dark"
            );
            themeButton.textContent = 

            "🌕ライト";
        }else{
            localStorage.setItem(
                "theme",
                "light"
            );
            themeButton.textContent=
            "🌙ダーク";
        }
});

    if( 
        localStorage.getItem("theme")
        === "dark"
    ){
        document.body.classList.add(
            "darkMode"
        );

        themeButton.textContent =
        "🌕ライト"
    }