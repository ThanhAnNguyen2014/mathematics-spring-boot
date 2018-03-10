function faq_website_ques_fn() {
    $('#bf-s-faq-btn').addClass('active');
    if (document.getElementById('bf-s-faq-panel')) {
        $('#bf-s-faq-tpl').addClass('show');
    } else {
        $.get("/templates/ques-faq.tpl", function (temp) {
            var tpl = new jSmart(temp);
            var res = tpl.fetch({faq_website_ques: faq_website_ques}); //parse json data
            $('#bf-s-faq-tpl').append(res).addClass('show');
        });
    }
}

function faq_website_close_fn() {
    $('#bf-s-faq-tpl').removeClass('show');
    $('#bf-s-faq-btn').removeClass('active');
}
function faq_website_show_ques(id) {
//    if (id == '12') {
//        show_tb_permission();
//
//        faq_website_close_fn();
//    } else {
        $('.bf-s-faq-block').removeClass('show');
        $('#bf-s-faq-answer, #bf-s-faq-ac-ques-' + id).addClass('show');
//    }
}

function show_tb_permission() {
    $(".tb_permission_vip").show();
    $(".header_tb_opacity").show();
    faq_website_close_fn();

    toPos('#show-act-ctrl-header-per-vip');
    $("#header").css({"opacity": "0.7"});
    $("#bottom-fixed").css({"opacity": "0.7"});
}

function close_permission() {
    $(".box_popup_tb_header").hide();
    $(".header_tb_opacity").hide();
    $("#header").css({"opacity": "1"});
    $("#main-menu").css({"opacity": "1"});
    $("#footer").css({"opacity": "1"});
    $(".hoidapnhanh").css({"opacity": "1"});
    $("#secsion-class2").css({"opacity": "1"});
    $("#home-content").css({"opacity": "1"});
    $(".__hm1left").css({"opacity": "1"});
    $(".__tabmember").css({"opacity": "1"});
    $("#bottom-fixed").css({"opacity": "1"});
}
function faq_website_hide_ques($id) {
    $('.bf-s-faq-block, .bf-s-faq-ac-row').removeClass('show');
    $('#bf-s-faq-ques').addClass('show');
}
