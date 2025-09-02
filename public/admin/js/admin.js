//Button Status
const buttonStatus = document.querySelectorAll("[button-status]")

if(buttonStatus.length > 0){

    let url = new URL(window.location.href)
    //console.log(url);
    
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")
            
            if(status) {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status")
            }

            console.log(url.href);

            window.location.href = url.href
            
        })
    })
}

//Button Under 20$
const buttonUnder20 = document.querySelector("[button_under_20]")

if(buttonUnder20){
    buttonUnder20.addEventListener("click", () => {
        let url = new URL(window.location.href)

        const price = buttonUnder20.getAttribute("button_under_20")

        if(price){
            url.searchParams.set("price", price)
        } else {
            url.searchParams.delete("price")
        }
        
        window.location.href = url.href

    })
}
//End Button Under 20$


//End Button Status

//Form Search
const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href)

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()

        //console.log(e.target.keyword.value);

        const keyword = e.target.keyword.value
        if(keyword) {
            url.searchParams.set("keyword", keyword)
        } else {
            url.searchParams.delete("keyword")
        }
        
        window.location.href = url.href
    })
}

//End Form Search







