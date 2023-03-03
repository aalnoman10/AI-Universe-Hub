//  Loading ai item
const loadingAi = async (countShow) => {
    spinnerLoader(true);
    const URL = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(URL);
    const data = await res.json();
    displayDataItems(data.data.tools.slice(0, countShow));
}

//  display ai item
const displayDataItems = (items) => {
    let countOl = 0;
    const itemsContainer = document.getElementById("item-container");
    itemsContainer.innerHTML = '';

    items.forEach(item => {
        countOl++;
        const div = document.createElement("div");
        div.classList.add("col");

        div.innerHTML = `
            <div class="card h-100 p-3">
                <img src="${item.image}" class="card-img-top h-100" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    <ol id="features-container${countOl}">
                    </ol>
                </div>
                <div class="d-flex align-items-center px-3">
                    <div>
                        <h2>${item.name}</h2>
                        <p><i class="fa-solid fa-calendar-days"></i></i> ${item.published_in}</p>
                    </div>
                    <button onclick="aiDetailsLoading('${item.id}')" type="button" class="btn btn-secondary rounded-5 ms-auto" data-bs-toggle="modal" data-bs-target="#ai-details"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        `
        itemsContainer.appendChild(div)

        // features list item 
        const olId = `features-container${countOl}`;
        item.features.forEach(feature => {
            const li = document.createElement("li");
            li.innerText = feature;

            document.getElementById(olId).appendChild(li)
        })
    });

    spinnerLoader(false);
}

//  Loading single details item
const aiDetailsLoading = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(URL);
    const data = await res.json();
    aiDetailsDisplay(data.data)
}

//  display single details item with modal
const aiDetailsDisplay = (details) => {
    // console.log(details);
    const modal = document.getElementById("modal");
    modal.innerHTML = `
    <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 p-5 g-2">
        <div class="col">
            <div class="card h-100 p-3">
                <h4>${details.description}</h4>
                <div class="row row-cols-3 py-3">
                    <div class="col">
                        <button class="btn btn-danger h-100 w-100 py-3">${details.pricing[0].price} / ${details.pricing[0].plan} </button>
                    </div>
                    <div class="col">
                        <button class="btn btn-danger h-100 w-100 py-3">${details.pricing[1].price} / ${details.pricing[1].plan}</button>
                    </div>
                    <div class="col">
                        <button class="btn btn-danger h-100 w-100 py-3">${details.pricing[2].price} / ${details.pricing[2].plan}</button>
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col">
                        <h5>Features</h5>
                        <ul id="modal-features"></ul>
                    </div>
                    <div class="col">
                        <h5>Integrations</h5>
                        <ul id="modal-integration"></ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card h-100 p-3">
                <img src="${details.image_link[0]}" class="card-img-top h-100" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-title">${details.input_output_examples[0]?.input}</h5>
                    <p>${details.input_output_examples[0].output}</p>
                </div>
            </div>
        </div>
    </div>
        `

    // modal features list item 
    const modalFeatures = document.getElementById("modal-features");
    for (const feature in details.features) {
        if (Object.hasOwnProperty.call(details.features, feature)) {
            const element = details.features[feature];
            const li = document.createElement("li");
            li.innerText = element.feature_name;

            modalFeatures.appendChild(li)
        }
    }

    // modal integrations list item 
    const modalIntegration = document.getElementById("modal-integration");
    console.log(modalIntegration);

    details.integrations.forEach(integration => {
        const li = document.createElement("li");
        li.innerText = integration;
        
        modalIntegration.appendChild(li);
    })
}

// spinner Loading 
const spinnerLoader = (condition) => {
    const spinner = document.getElementById("spinner");
    if (condition) {
        spinner.classList.remove("d-none")
    } else {
        spinner.classList.add("d-none")
    }
}

loadingAi(6);

// see more btn 
document.getElementById("see-more").addEventListener("click", function () {
    document.getElementById("see-more").classList.add("d-none");
    loadingAi();
})