//selects the HTML element with the ID "container" and assigns it to a constant variable mainContainer
const mainContainer = document.querySelector("#container")

//defines a variable with the URL of an API endpoint that returns a list of beans
const url = "https://localhost:5001/api/beanvariety/";

//makes a fetch call to the URL set in url and then returns the reponse in a JSON object
function getAllBeanVarieties() {
    return fetch(url)
        .then(resp => resp.json());
}

//selects the HTML element with the ID "run-button" and adds a click event listener to it
const button = document.querySelector("#run-button");
//when that button is clicked, it calls getAllBeanVarieties which is set up to make a fetch to the API endpoint URL set in url
button.addEventListener("click", () => {
    getAllBeanVarieties()
        //takes the JSON response object and iterates through each item in the object using for...of loop
        //then it adds the bean name to the html string
        .then(beans => {
            let html = "";
            for (const bean of beans) {
                html += `${bean.name} <br>`;
            }
            //then it sets the element with the #bean-varieties ID to equal that string
            document.querySelector("#bean-varieties").innerHTML = html
        })
});

//selects the HTML element with the ID "beautiful-bean-button" and adds a click event listener to it
const beautifulBeanButton = document.querySelector("#beautiful-bean-button")
beautifulBeanButton.addEventListener("click", event => {
    event.preventDefault();

    //sets each property's value to be what the user enters in the form line with the corresponding ID
    const bean = {
        name: document.querySelector("#bean-name").value,
        region: document.querySelector("#bean-region").value,
        notes: document.querySelector("#bean-note").value
    }

    //fetch call to save the new bean to the database when the button is clicked
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bean),
    })
        .then(response => response.json())
        .then(newBean => {
            console.log(newBean);
        })
})




