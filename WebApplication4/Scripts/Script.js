var tags = [];

function show_modal(id) {
    $("#red_form").modal('show');
    $("#button_red").attr("onclick", "addCard(" + id + ")");
}

function delCard(id) {
    $("#" + id).remove();
    $.ajax({
        url: '../Home/Del',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({
            id: parseInt(id)
        }),
        success: null
    });
}

function addGoal() {
    var checkArray = [];
    $('#boxs :checked').each(function () {
        checkArray.push(parseInt($(this).val()));
    });
    $.ajax({
        url: '../Goal/AddGoal',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({
            name: $("#nameGoal").val(),
            acts: checkArray,
            id: Math.floor(Math.random() * (1000 - 10)) + 10,
            col: $("#colorPicker").val()
        }),
        success: null
    });
}

function addCard(id) {
    var tempDate = {
        title: "test",
        des: "test",
        tag: [],
        imp: 0,
        sfera: 0,
        id: 0,
        date: new Date(),
        text_sf: null
    };
    tempDate.date = new Date($("#date").val());
    tempDate.title = $("#name").val();
    tempDate.des = $("#message").val();
    tempDate.imp = $("#important").val();
    tempDate.sfera = $("#select").val();
    tempDate.text_sf = $("#select").clone();
    for (var i = 0; i < tagCount; i++) {
        var a = "#tag-" + i;
        a += 1;
        tempDate.tag.push(($("#add_form " + a).text()))
    }
    tempDate.tag = Array.from(tempDate.tag);
    tempDate.id = Math.floor(Math.random() * (1000 - 10)) + 10;
    generateAct(tempDate, id);
    $.ajax({
        url: '../Home/AddAct',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({
            name: tempDate.title,
            des: tempDate.des,
            sfera: tempDate.sfera,
            imp: tempDate.imp,
            id: tempDate.id,
            tags: tempDate.tag,
            date: tempDate.date
        }),
        success: null
    });
    return false;
}

var cardCount = 1;
var tagCount = 0;
var defaults = {
    small_card: "card border-success mb-3 small-card col-md-12 offset-2 mr-0",
    card_id: "card-",
    card_name: "card_name",
    card_des: "card_des",
    card_header: "card-header bg-danger border-success",
    card_title: "card-title",
    card_body: "card-body text-success",
    card_des: "card-text card_des",
    card_footer: "card-footer bg-transparent border-success pl-0 pr-0",
    btn_group: "btn-toolbar",
    tag: "ml-3 btn btn-danger col-md-2 tag"
};

function changeClass(id1, id2, id3) {
    if ($("#" + id1).hasClass('col-md-7')) {
        $("#" + id1).removeClass('col-md-7');
        $("#" + id1).addClass('col-md-3');
        $("#" + id2).removeClass('col-md-5');
        $("#" + id2).addClass('col-md-12');
        $("#" + id3).removeClass('col-md-7');
        $("#" + id3).addClass('col-md-0');
    }
    else {
        $("#" + id1).addClass('col-md-7');
        $("#" + id1).removeClass('col-md-3');
        $("#" + id2).addClass('col-md-5');
        $("#" + id2).removeClass('col-md-12');
        $("#" + id3).addClass('col-md-7');
        $("#" + id3).removeClass('col-md-0');
    }
}
var cardInfo = {
    card_info_class: "card border-success mb-3 small-card col-md-0 ml-0 collapse border-left-0",
    card_info_id: "card_info-",
    card_info_header_class: "card-header bg-transparent border-success p-0",
    style_imp: "width:100%",
    type_imp: "range",
    min_imp: "0",
    max_imp: "100",
    id_imp: "important",
    card_body_class: "card-body text-success border-success p-0",
    card_body_style: "height:100px",
    col_body_class: "col-md-12 collapse show",
    col_body_id: "full_info",
    col_body_aria: "false"
};

function resetTagCount() {
    tagCount = 0;
}

function generateAct(params, id) {
    if (id == null) {
        cardCount++;
        var wrapper, body, header, footer, btn_group;

        r = wrapper = $("<div />", {
            "class": "card-group col-md-3",
            "id": params.id
        }).appendTo($("#content"));

        wrapper = $("<div />", {
            "class": defaults.small_card,
            "id": defaults.card_id + params.id
        }).appendTo($(r));

        header = $("<div />", {
            "class": defaults.card_header
        }).appendTo(wrapper);

        $("<button />", {
            "class": "btn-link btn color-white text-center",
            "data-toggle": "collapse",
            "aria-expanded": "false",
            "id": "name-" + params.id,
            "data-target": "#" + cardInfo.card_info_id + params.id,
            "text": params.title,
            "onclick": "changeClass('" + params.id + "','" + defaults.card_id + params.id + "','" + cardInfo.card_info_id + params.id + "')"
        }).appendTo(header);

        body = $("<div />", {
            "class": defaults.card_body
        }).appendTo(wrapper);

        $("<p />", {
            "class": defaults.card_des,
            "text": params.des
        }).appendTo(body);

        footer = $("<div />", {
            "class": defaults.card_footer,
        }).appendTo(wrapper);

        btn_group = $("<div />", {
            class: defaults.btn_group
        }).appendTo(footer);

        $.each(params.tag, function (index, value) {
            $("<button />", {
                "class": defaults.tag,
                "text": value
            }).appendTo(btn_group);
        });

        wrapper = $("<div />", {
            "class": cardInfo.card_info_class,
            "id": cardInfo.card_info_id + params.id
        }).appendTo($(r));

        header = $("<div />", {
            "class": cardInfo.card_info_header_class
        }).appendTo(wrapper);

        $("<label />", {
            "for": "important",
            "text": "Важность"
        }).appendTo(header);

        $("<input />", {
            "style": "width:100%",
            "type": "range",
            "min": "0",
            "max": "100",
            "id": "important" + params.id,
            "value": params.imp,
            "disabled": true
        }).appendTo(header);

        body = $("<div />", {
            "class": cardInfo.card_body_class,
            "style": cardInfo.card_body_style
        }).appendTo(wrapper);

        col = $("<div />", {
            "class": cardInfo.col_body_class,
            "id": cardInfo.col_body_id + params.id,
            "aria-expanded": cardInfo.col_body_aria
        }).appendTo(body);

        row = $("<div />", {
            "class": "row",
        }).appendTo(col);

        select_col = $("<div />", {
            "class": "col form-group",
        }).appendTo(row);

        $("<label />", {
            "for": "select_sfer",
            "text": "Сфера",
        }).appendTo(select_col);

        select_sf = params.text_sf.clone();
        select_sf.attr('id', 'select' + params.id);
        select_sf.appendTo(select_col);
        $("#select" + cardCount).prop('disabled', true);
        var t = $("#select" + params.id + " option");
        for (let i = 0; i < t.length; i++) {
            if ($(t[i]).val() == params.sfera) {
                $(t[i]).attr('selected', true).siblings();
            }
        }

        select_col = $("<div />", {
            "class": "col form-group",
        }).appendTo(row);

        $("<label />", {
            "for": "date",
            "text": "Срок:",
            "value": params.date
        }).appendTo(select_col);

        $("<input />", {
            "type": "date",
            "class": "form-control",
            "id": "date" + params.id,
            "name": "date",
            "placeholder": "Срок",
            "disabled": true
        }).appendTo(select_col);

        footer = $("<div />", {
            "class": defaults.card_footer,
            "role": "group"
        }).appendTo(wrapper);

        $("<button />", {
            "class": "btn btn-danger float-right",
            "text": "Выполнено"
        }).appendTo(footer);

        $("<button />", {
            "class": "btn btn-danger float-left",
            "text": "Редактировать",
            "id": "redBtn" + params.id,
            "onclick": "red(" + params.id + ")"
        }).appendTo(footer);
    }
}

function removeTag(params) {
    tagCount = tagCount - 1;
    params.remove();
    if (tagCount == 2) {
        $("#addTagBtn").toggle();
        $("#tag").toggle();
    }
}

function addSp() {
    newId = Math.floor(Math.random() * (1000 - 10)) + 10;
    wrapper = $("<div />", {
        "class": "p-0 card text-center col-10",
        "id": newId,
        "style": "font-size:17px"
    }).prependTo($("#content"));

    head = $("<div />", {
        "class": "card-header justify-content-center bg-info"
    }).appendTo(wrapper);

    h5 = $("<h5 />", {
        "class": "mb-0 justify-content-center"
    }).appendTo(head);


    but = $("<button />", {
        "class": "btn btn-link justify-content-center",
        "style": "font-size:2rem",
        "data-toggle": "collapse",
        "data-target":"#collapse-"+newId,
        "aria-expanded": "true",
        "aria-controls":"collapse-" + newId
    }).appendTo(h5);

    $("<b />", {
        "class": "align-self-center",
        "style": "color:white",
        "id": "name-" + newId,
        "text": $("#name").val()
    }).appendTo(but);
    
    d1 = $("<div />", {
        "id": "collapse-" + newId,
        "class": "collapse show",
        "aria-labelledby": "heading-" + newId
    }).appendTo(wrapper);

    d2 = $("<div />", {
        "class": "card-body container-fluid"
    }).appendTo(d1)

    d3 = $("<div />", {
        "class": "row pb-2 border-bottom"
    }).appendTo(d2);

    d4 = $("<div />", {
        "class": "col-6 border-right"
    }).appendTo(d3);

    textarea = $("<textarea />", {
        "id": "des-" + newId,
        "class": "w-100 h-100 border-0",
        "placeholder":"Описание"
    }).appendTo(d4);

    d5 = $("<div />", {
        "class": "col-6"
    }).appendTo(d3);

    d6 = $("<div />", {
        "class": "row"
    }).appendTo(d5);

    d7 = $("<div />", {
        "class": "col-12"
    }).appendTo(d6);

    $("<label />", {
        "text": "Цвет"
    }).appendTo(d7);

    $("<input />", {
        "id": "color-" + newId,
        "type": "color",
        "class": "form-control"
    }).appendTo(d7);

    d8 = $("<div />", {
        "class": "row pt-2"
    }).appendTo(d5);

    d9 = $("<div />", {
        "class": "col-12 text-left"
    }).appendTo(d8);

    $("<label />", {
        "text": "Количество выполненых действий "
    }).appendTo(d8);

    $("<b />", {
        "text": " 0"
    }).appendTo(d8);

    d9 = $("<div />", {
        "class": "row pt-2"
    }).appendTo(d5);

    d10 = $("<div />", {
        "class": "col-12 text-left"
    }).appendTo(d9);

    $("<label />", {
        "text": "Количество активных действий "
    }).appendTo(d10);

    $("<b />", {
        "text": " 0"
    }).appendTo(d10);

    d11 = $("<div />", {
        "class": "row pt-2"
    }).appendTo(d5);

    d12 = $("<div />", {
        "class": "col-12 text-left"
    }).appendTo(d11);

    $("<label />", {
        "text": "Количество срочных действий "
    }).appendTo(d12);

    $("<b />", {
        "text": " 0"
    }).appendTo(d12);

    d13 = $("<div />", {
        "class": "row pt-2"
    }).appendTo(d2);

    d14 = $("<div />", {
        "class": "col-2"
    }).appendTo(d13);

    $("<button />", {
        "id": "redbtn-" + newId,
        "class": "btn btn-primary",
        "text": "Сохранить",
        "onclick": "postSp(" + newId + ")"
    }).appendTo(d14);

    d15 = $("<div />", {
        "class": "col-2 offset-8"
    }).appendTo(d13);

    $("<button />", {
        "class": "btn btn-danger",
        "id": "b2-" + newId,
        "text": "Отмена",
        "onclick": "reset(" + newId +")"
    }).appendTo(d15);
}

function reset(id) {
    $("#" + id).remove();
}

function postSp(id) {
    $("#redbtn-" + id).text("Редактировать");
    $("#redbtn-" + id).attr('onclick', "redSP(" + id + ")");
    $("#b2-" + id).text("Удалить");
    $("#b2-" + id).attr('onclick', "red(" + id + ")");
    $.ajax({
        url: '../Home/SaveSP',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({
            name: $("#name-" + id).text(),
            des: $("#des-" + id).val(),
            col: $("#color-" + id).val().toString(),
            id: parseInt(id)
        }),
        success: null
    });
}

function delSp(id) {
    $("#" + id).remove();
}

function addTag() {
    if (!$("#tag").val())
        return false;
    var temp = $("#tag").val();
    $("<button />", {
        "class": defaults.tag,
        "text": temp,
        "id": "tag-" + tagCount + 1,
        "onclick": "removeTag(this)"
    }).insertBefore("#tag");
    tagCount = tagCount + 1;
    if (tagCount == 3) {
        $("#addTagBtn").toggle();
        $("#tag").toggle();
    }
    tags.push(temp);
};

function save(id) {
    $("#date-" + id).prop('disabled', true);
    $("#select-" + id).prop('disabled', true);
    $("#important-" + id).prop('disabled', true);
    $("#redBtn-" + id).text("Редактировать");
    $("#redBtn-" + id).attr('onclick', "red(" + id + ")");
    $.ajax({
        url: '../Home/Save',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({
            name: $("#name-" + id).text(),
            des: $("#des-" + id).text(),
            sfera: parseInt($("#select-" + id).val()),
            imp: parseInt($("#important-" + id).val()),
            id: parseInt(id),
            date: $("#date-" + id).val()
        }),
        success: null
    });
}
function red(id) {
    $("#date-" + id).prop('disabled', false);
    $("#select-" + id).prop('disabled', false);
    $("#important-" + id).prop('disabled', false);
    $("#redBtn-" + id).text("Сохранить");
    $("#redBtn-" + id).attr('onclick', "save(" + id + ")");
}

function saveSP(id) {
    $("#des-" + id).prop('disabled', true);
    $("#color-" + id).prop('disabled', true);
    $("#redbtn-" + id).text("Редактировать");
    $("#redbtn-" + id).attr('onclick', "redSP(" + id + ")");

}

function redSP(id) {
    $("#des-" + id).prop('disabled', false);
    $("#color-" + id).prop('disabled', false);
    $("#redbtn-" + id).text("Сохранить");
    $("#redbtn-" + id).attr('onclick', "saveSP(" + id + ")");
}


function checkParams() {
    var name = $('#nameGoal').val();

    if (name.length != 0) {
        $('#creatGoalBtn').removeAttr('disabled');
    } 
}
$(document).ready(function () {
    $('#add_form').on("hide.bs.modal", function () {
        resetTagCount();
        $("#name").val("");
        $("#message").val("");
        $("input,textarea,select")
            .val('')
            .end()
        $("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
        $("#tag-01").remove();
        $("#tag-11").remove();
        $("#tag-21").remove();
        tagCount = 0;
    });
    $('#ex1').slider({
        formatter: function (value) {
            return 'Current value: ' + value;
        }
    });
    $("#ex2").slider({});
});