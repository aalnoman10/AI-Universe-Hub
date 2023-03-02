const loadingAi = async () => {
    const URL = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(URL);
    const data = await res.json();
    displayDataItems(data.data.tools.slice(0, 6))
}

const displayDataItems = (items) => {
    const itemsContainer = document.getElementById("item-container");

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card h-100 p-3">
                <img src="${item.image}" class="card-img-top h-100" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    <ol class="list-container">
                    </ol>
                </div>
                <div class="d-flex align-items-center px-3">
                    <div>
                        <h2>${item.name}</h2>
                        <p><i class="fa-solid fa-calendar-days"></i></i> ${item.published_in}</p>
                    </div>
                    <button class="btn btn-secondary rounded-5 ms-auto"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        `
        itemsContainer.appendChild(div)

        // const listContainers = document.getElementsByClassName("list-container");
    });
}

loadingAi();