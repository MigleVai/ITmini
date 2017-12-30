var url = "https://postit.lt/data/?term=";

var adresses = [{ street: "Kalvarijų", number: 98, city: "Vilnius" }, { street: "Didlaukio", number: 47, city: "Vilnius" }, { street: "Saltoniškių", number: 12, city: "Vilnius" }];
var result = [];

function UpdateData(index) {
    return $.get(SetUrl(index), function (data, textStatus, jqXHR) { });
}

function SetUrl(index) {
    var add = url + adresses[index].street + "+" + adresses[index].number + ",+" + adresses[index].city;
    return add;
}

$("#buttonSort").click(function () {
    for (var i = 0; i < adresses.length; i++) {
        UpdateData(i).done(function (info) {
            PutArray(info);
        });
    }
});

function PutArray(info) {
    console.log(info);
    result.push({
        postalCode: info.data[0].post_code,
        street: info.data[0].street,
        number: info.data[0].number,
        city: info.data[0].city
    });
    if (result.length == 3) {
        result.sort(function (a, b) {
            return parseInt(a.postalCode) - parseInt(b.postalCode);
        });
        PrintResult();
    }
}

function PrintResult() {
    for (var i = 0; i < result.length; i++) {
        $("p").html($("p").html() + result[i].postalCode + " " + result[i].street + " " + result[i].number + " " + result[i].city + "<br>");
    }
}