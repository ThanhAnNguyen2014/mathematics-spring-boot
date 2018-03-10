//========================== nodejs giaitoan =====================================
var node_host = 'https://node2.luyenthi123.com';
var audio_url = '/static/audio/';
var giaitoan_socket = io.connect(node_host, {query: "controller=create_giaitoan&member_data=" + JSON.stringify(member_data)});
$.fn.jpiah({sr: audio_url + 'notify_receive', id: 'notify_receive'});
$.fn.jpiah({sr: audio_url + 'message_receive', id: 'message_receive'});

//================= NHAN THONG BAO TU SERVER NODEJS ============================
giaitoan_socket.on('connect', function () {
});
giaitoan_socket.on('message', function (data) {
});

var loading = false; //prevents multiple loads
$(document).ready(function () {
    if ($(".math-lt123").length > 0) {
        // =========== PARSE MATHQUILL =============
        $(".math-lt123").each(function (i, e) {
            QA.mathquill(e);
        });

    }
    $(".math-lt123").removeClass('math-lt123');

    $(window).scroll(function () { //detect page scroll
        if ($(window).scrollTop() >= 350) { //if user scrolled to bottom of the page
            $('.gt-top-header').show();
        } else {
            $('.gt-top-header').hide();
        }
    });

    $('.btn_top_filter').click(function () {
        if ($('.top_box_filter').is(':hidden')) {
            $('.top_box_filter').slideDown(200);
        } else {
            $('.top_box_filter').slideUp(200);
        }
    });

    $('.nav li > .sub-menu').parent().click(function () {
        var submenu = $(this).children('.sub-menu');
        if ($(submenu).is(':hidden')) {
            $(submenu).slideDown(200);
        } else {
            $(submenu).slideUp(200);
        }
    });

//    var options = {
//        target: '', // target element(s) to be updated with server response 
//        resetForm: false, // reset the form after successful submit 
//        beforeSubmit: validate_ques, // pre-submit callback 
//        success: showResponse  // post-submit callback 
//    };

    $(document).on('submit', '#MyQuesForm', function (e) {
        e.preventDefault();
        var ques_content = $('#ques_text').val();
        var class_id = $('#class_name_create').val();
        var mon_id = $('#mon_name_create').val();
        var tag_id = $('#tag_id_create').val();

        //xu ly xóa ảnh thứ 3 trở đi nếu nhiều ảnh quá trong content
        var wrapper = document.createElement('div');
        $(wrapper).html(ques_content);
        
        $(wrapper).find("[style]").removeAttr("style");

        //tìm tất cả thẻ img trong content
        $(wrapper).find('img').each(function (i, e) {
            if (i > 2) {
                $(e).remove();
                ques_content = $(wrapper).html();
            }
        });

        //get only text - strip tag
        var ques_text = $(ques_content).text();

        //xu ly badwords
        var filter_chat = new Filter({words: $badWord});
        var ques_content_text = $.trim(ques_content.replace(/<(.|\n)*?>/g, ' '));

        if (filter_chat.detect(ques_content_text) == true) {
            $('#ques_text').val(filter_chat.clean(ques_content_text));
            alert('Nội dung bài đăng của bạn có từ nhạy cảm nên bài đăng của bạn không được chấp nhận! Hãy sửa lại nội dung!');
            return false;
        }

        if (!$('#ques_text').val()) {
            alert('Bạn chưa nhập nội dung câu hỏi!');
            return false;
        } else if (!$('#class_name_create').val()) {
            alert('Bạn chưa chọn lớp!');
            return false;
        } else {
            giaitoan_socket.emit('create_ques', {class_id: class_id, mon_id: mon_id, tag_id: tag_id, ques_text: ques_text, ques_content: ques_content, not_same: 0}, function (data) {
                //insert thành công
                if (data.status) {
                    window.location.href = base_urlroot + 'goc-thong-thai';
                } else {
                    if (data.data_same_ques != '') {
                        var res_same_ques = data.data_same_ques;
                        var retstr = '';

                        $.get("/templates/giaitoan/same_ques_giaitoan.tpl", function (temp) {
                            var tpl = new jSmart(temp);
                            var retstr = tpl.fetch({data_same_ques: res_same_ques}); //parse json data

                            $('.box_popup_tb_same_ques .content_popup').html(retstr);
                            //parse cong thuc toan
                            if ($(".math-lt123").length > 0) {
                                // =========== PARSE MATHQUILL =============
                                $(".math-lt123").each(function (i, e) {
                                    QA.mathquill(e);
                                });
                            }
                            $('.box_same_ques').show();
                            $('.same_ques_tb_opacity').show();

                            $("#header").css({"opacity": "0.7"});
                            $("#main-menu").css({"opacity": "0.7"});
                            $("#footer").css({"opacity": "0.7"});
                            $(".hoidapnhanh").css({"opacity": "0.7"});
                            toPos('.box_popup_tb_same_ques .close_popup');
                        });
                    } else {
                        //$('#res_output').append('<div class="alert-respon">' + res.mess + '</div>');

                        $(".box_same_ques").hide();
                        $(".same_ques_tb_opacity").hide();
                        $("#header").css({"opacity": "1"});
                        $("#main-menu").css({"opacity": "1"});
                        $("#footer").css({"opacity": "1"});
                        $(".hoidapnhanh").css({"opacity": "1"});

                        alert(data.mess);
                    }
                }
            });
        }

        // always return false to prevent standard browser submit and page navigation 
        return false;
    });

    $(".box_popup_tb_same_ques .close_popup").click(function () {
        $(".box_same_ques").hide();
        $(".same_ques_tb_opacity").hide();
        $("#header").css({"opacity": "1"});
        $("#main-menu").css({"opacity": "1"});
        $("#footer").css({"opacity": "1"});
        $(".hoidapnhanh").css({"opacity": "1"});
    });

    //FILTER create
    $("#class_name_create").change(function () {
        var class_id = $(this).val();

        //alert(class_id);
        $('#mon_name_create').html('');
        $.post(base_urlroot + 'goc-thong-thai/get_mon', {class_id: class_id}, function (res) {
            if (IsJsonString(res)) {
                var data = jQuery.parseJSON(res);
                var retstr = '';
                for (i = 0; i < data.length; i++) {
                    retstr += '<option class="" value="' + data[i].cat_id + '">' + data[i].title + '</option>';
                }
                $('#mon_name_create').html(retstr);
                var mon_id = $('#mon_name_create').val();
                //tag_id
                $.post(base_urlroot + 'goc-thong-thai/get_tag_ques', {mon_id: mon_id}, function (res1) {
                    if (IsJsonString(res1)) {
                        var datatag = jQuery.parseJSON(res1);
                        var retstr_tag = '<option class="" value="">Hãy chọn chủ đề</option>';
                        for (j = 0; j < datatag.length; j++) {
                            retstr_tag += '<option class="" value="' + datatag[j].id + '">' + datatag[j].tagname + '</option>';
                        }
                        $('#tag_id_create').html(retstr_tag);
                    }
                });
            }
        });

    });

    $("#mon_name_create").change(function () {
        var mon_id = $('#mon_name_create').val();
        $.post(base_urlroot + 'goc-thong-thai/get_tag_ques', {mon_id: mon_id}, function (res1) {
            if (IsJsonString(res1)) {
                var datatag = jQuery.parseJSON(res1);
                var retstr_tag = '<option class="" value="">Hãy chọn chủ đề</option>';
                for (j = 0; j < datatag.length; j++) {
                    retstr_tag += '<option class="" value="' + datatag[j].id + '">' + datatag[j].tagname + '</option>';
                }
                $('#tag_id_create').html(retstr_tag);
            }
        });
    });

    $("#tag_id_create").change(function () {
    });
});

//================FOR CREATE QUESTION =================
// --------- function validate before send submit form ------
//function validate_ques(formData, jqForm, options) {
//    var form = jqForm[0];
//    if (!form.class_name.value) {
//        alert('Bạn chưa chọn lớp!');
//        return false;
//    } else {
//        return true;
//    }
//}
// -------------- function response after send submit form ------------
//function showResponse(responseText, statusText, xhr, $form) {
//    console.log(responseText);
//    $('.box_popup_tb_same_ques .content_popup').html('');
//    var res = json_to_arr(responseText);
//    if (res.stt == 'true') {
//        window.location.href = base_urlroot + 'goc-thong-thai';
//    } else {
//        if (res.data_same_ques != '') {
//            var res_same_ques = res.data_same_ques;
//            var retstr = '';
//
//            $.get("/templates/giaitoan/same_ques_giaitoan.tpl", function (temp) {
//                var tpl = new jSmart(temp);
//                var retstr = tpl.fetch({data_same_ques: res_same_ques}); //parse json data
//
//                $('.box_popup_tb_same_ques .content_popup').html(retstr);
//                //parse cong thuc toan
//                if ($(".math-lt123").length > 0) {
//                    // =========== PARSE MATHQUILL =============
//                    $(".math-lt123").each(function (i, e) {
//                        QA.mathquill(e);
//                    });
//                }
//                $('.box_same_ques').show();
//                $('.same_ques_tb_opacity').show();
//
//                $("#header").css({"opacity": "0.7"});
//                $("#main-menu").css({"opacity": "0.7"});
//                $("#footer").css({"opacity": "0.7"});
//                $(".hoidapnhanh").css({"opacity": "0.7"});
//                toPos('.box_popup_tb_same_ques .close_popup');
//            });
//        } else {
//            //$('#res_output').append('<div class="alert-respon">' + res.mess + '</div>');
//
//            $(".box_same_ques").hide();
//            $(".same_ques_tb_opacity").hide();
//            $("#header").css({"opacity": "1"});
//            $("#main-menu").css({"opacity": "1"});
//            $("#footer").css({"opacity": "1"});
//            $(".hoidapnhanh").css({"opacity": "1"});
//
//            alert(res.mess);
//        }
//    }
//}

function create_ques_not_same() {
    var ques_content = $('#ques_text').val();
    var class_id = $('#class_name_create').val();
    var mon_id = $('#mon_name_create').val();
    var tag_id = $('#tag_id_create').val();

    //xu ly xóa ảnh thứ 3 trở đi nếu nhiều ảnh quá trong content
    var wrapper = document.createElement('div');
    $(wrapper).html(ques_content);
    
    $(wrapper).find("[style]").removeAttr("style");

    //tìm tất cả thẻ img trong content
    $(wrapper).find('img').each(function (i, e) {
        if (i > 2) {
            $(e).remove();
            ques_content = $(wrapper).html();
        }
    });

    //xu ly badwords
    var filter_chat = new Filter({words: $badWord});
    var ques_content_text = $.trim(ques_content.replace(/<(.|\n)*?>/g, ' '));

    if (filter_chat.detect(ques_content_text) == true) {
        $('#ques_text').val(filter_chat.clean(ques_content_text));
        alert('Nội dung bài đăng của bạn có từ nhạy cảm nên bài đăng của bạn không được chấp nhận! Hãy sửa lại nội dung!');
        return false;
    }

    //get only text - strip tag
    var ques_text = $(ques_content).text();

    giaitoan_socket.emit('create_ques', {class_id: class_id, mon_id: mon_id, tag_id: tag_id, ques_text: ques_text, ques_content: ques_content, not_same: "1"}, function (data) {
        if (data.status) {
            window.location.href = base_urlroot + 'goc-thong-thai';
        } else {
            //$('#res_output').append('<div class="alert-respon">' + data.mess + '</div>');

            $(".box_same_ques").hide();
            $(".same_ques_tb_opacity").hide();
            $("#header").css({"opacity": "1"});
            $("#main-menu").css({"opacity": "1"});
            $("#footer").css({"opacity": "1"});
            $(".hoidapnhanh").css({"opacity": "1"});

            alert(data.mess);
        }
    });
}

function filter_in_create() {
    var key_search = $('#txt_search_gtt').val() == '' ? '' : '&key_search=' + $('#txt_search_gtt').val();

    window.location.href = base_urlroot + 'goc-thong-thai/tag?' + key_search;
}