var arr;
var tmp;

function startTime() {
    // console.log(arr);

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    $(".clock").html(h > 12 ? h - 12 + ":" + m + ":" + s + " PM " : h + ":" + m + ":" + s + " AM ");

    if (tmp != m) {
        tmp = m;

        if (h > 12) var time = "PM " + checkTime(h - 12) + ":" + m + ":" + s;
        else var time = "AM " + checkTime(h) + ":" + m + ":" + s;

        // console.log(time + " <--");

        arr.forEach((element) => {
            if (element.time == undefined) {
                var eTime = element.startTime;
                var eMeridiem = element.startMeridiem;
            } else {
                eTime = element.time;
                eMeridiem = element.meridiem;
            }

            // console.log(eMeridiem + " " + eTime + ":00");
            if (time == eMeridiem + " " + eTime + ":00") {
                console.log("alarm");
                if (element.isOn == false) {
                    var options = {
                        title: element.title,
                        options: {
                            body: element.description,
                            icon: "../images/logo.png",
                            lang: "ko-KR",
                        },
                    };
                    $("#easyNotify").easyNotify(options);
                }
            }
            // console.log(eMeridiem + " " + eTime + ":00");
            // if (time == eMeridiem + " " + eTime + ":00" && element.isOn == false) {
            //     console.log("alarm");
            //     if (notice == false) {
            //         var options = {
            //             title: element.title,
            //             options: {
            //                 body: element.description,
            //                 icon: "../images/logo.png",
            //                 lang: "ko-KR",
            //             },
            //         };
            //         $("#easyNotify").easyNotify(options);
            //         notice = true;
            //     }
            // } else {
            //     notice = false;
            // }
        });
    }
    setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

$(document).ready(() => {
    $.ajax({
        url: "/api/schedule/alarm",
        type: "get",
    })
        .done((result) => {
            arr = result;
            $.ajax({
                url: "/api/alarm/alarm",
                type: "get",
            })
                .done((result2) => {
                    arr = arr.concat(result2);
                    startTime();
                })
                .fail((request, status, error) => {
                    alert(request.responseText);
                });
        })
        .fail((request, status, error) => {
            alert(request.responseText);
        });
});
