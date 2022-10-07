import { getRequests, getPlumbers, deleteRequest, saveCompletion } from "./dataAccess.js"

const convertRequestToListElement = (requestArray) => {
    const plumbers = getPlumbers()
    let html = requestArray
        .map((requestObj) => {
            return `<li>${requestObj.description} 
            <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
                plumber => {
                    return `<option value="${requestObj.id}--${plumber.id}">${plumber.name}</option>`
                }
            ).join("")
                }
</select>          
            <button class="request__delete"
            id="request--${requestObj.id}">
        Delete
    </button>
    </li>
    `

        })
        .join(" ")
    return html
}

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
        ${convertRequestToListElement(requests)}
        </ul>

    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                date_created: Date.now
            }
        
            //TODO Create a function to invoke.. Invoke A function.. not "the" function 
            saveCompletion(completion)
            // sendRequest(completion) NOT this

        }
    }
)