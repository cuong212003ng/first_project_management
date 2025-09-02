module.exports = (query) => {
    let filterStatus = [
        {
            name: "Tất cả",
            value: "",
            class: ""
        },
        {
            name: "Hoạt động",
            value: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            value: "inactive",
            class: ""
        }
    ]


    if(query.status) {
        const index = filterStatus.findIndex(item => item.value == query.status)
        filterStatus[index].class = "active"
    } else {
        const index = filterStatus.findIndex(item => item.value == "")
        filterStatus[index].class = "active"
    }

    return filterStatus
}