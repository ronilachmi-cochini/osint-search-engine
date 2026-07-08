document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("searchInput");
    const type = document.getElementById("searchType");
    const button = document.getElementById("searchButton");
    const results = document.getElementById("resultsContainer");

    button.addEventListener("click", search);

    input.addEventListener("keypress", function(e){
        if(e.key==="Enter"){
            search();
        }
    });

    function detectType(value){

        value=value.trim();

        if(type.value!=="auto")
            return type.value;

        for(const key in SEARCH_TYPES){

            if(SEARCH_TYPES[key].regex.test(value))
                return key;

        }

        return "name";
    }

    function search(){

        const query=input.value.trim();

        if(query===""){
            alert("יש להכניס ערך לחיפוש");
            return;
        }

        const detected=detectType(query);

        results.innerHTML="";

        CATEGORIES.forEach(category=>{

            const card=document.createElement("div");
            card.className="result-card";

            let html=`<h3>${category.title}</h3>`;
            html+=`<p><b>סוג חיפוש:</b> ${detected}</p><br>`;

            category.sources.forEach(source=>{

                const url=source.url.replace("{query}",encodeURIComponent(query));

                html+=`
                <p>
                🔗
                <a href="${url}" target="_blank">
                ${source.name}
                </a>
                </p>
                `;

            });

            card.innerHTML=html;

            results.appendChild(card);

        });

    }

});
