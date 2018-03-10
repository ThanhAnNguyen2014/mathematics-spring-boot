//========================== nodejs giaitoan =====================================
var node_host = 'https://node2.luyenthi123.com';
//var node_host = 'https://dung.luyenthi123.com:3004';
var audio_url = '/static/audio/';
var giaitoan_socket = io.connect(node_host, {query: "controller=giaitoan&member_data=" + JSON.stringify(member_data)});
$.fn.jpiah({sr: audio_url + 'notify_receive', id: 'notify_receive'});
$.fn.jpiah({sr: audio_url + 'message_receive', id: 'message_receive'});

//================= NHAN THONG BAO TU SERVER NODEJS ============================
giaitoan_socket.on('connect', function () {
});
giaitoan_socket.on('message', function (data) {

});
function post_fb(_self) {
    var _description = "Hãy cùng tham gia trả lời câu hỏi thú vị sau từ LuyệnThi123 nhé";
    var id_ques = $(_self).parents('._item_ques').attr('ques_id');
    var _link = base_urlroot + "/goc-thong-thai/question?ques=" + id_ques;
    fb_share({name: member_data.username, description: _description, link: _link});
}
//THONG BAO CHUNG SAU KHI CO CAU HOI MOI DC TAO
giaitoan_socket.on('create_ques', function (data) {
    console.log(data);
    if (data.status) {
        var retstr = '';
        var lis_ques_gt = [];
        lis_ques_gt.push(data);
        $.get("/templates/giaitoan/list_ques_giaitoan.tpl?vs=1", function (temp) {
            var tpl = new jSmart(temp);
            retstr = tpl.fetch({lis_ques_gt: lis_ques_gt}); //parse json data

            $('.gt-content[type=""').prepend(retstr);
            $('.gt-content[type="chua-tra-loi"').prepend(retstr);

            $('.nav li > .sub-menu').parent().unbind("click").bind("click", function () {
                var submenu = $(this).children('.sub-menu');
                if ($(submenu).is(':hidden')) {
                    $(submenu).slideDown(200);
                } else {
                    $(submenu).slideUp(200);
                }
            });

            $('.nav li > .sub-menu > li .sub-menu').parent().unbind("hover").bind("hover", function () {
                var submenu = $(this).children('.sub-menu');
                if ($(submenu).is(':hidden')) {
                    $(submenu).slideDown(200);
                } else {
                    $(submenu).slideUp(200);
                }
            });

            if ($(".math-lt123").length > 0) {
                // =========== PARSE MATHQUILL =============
                $(".math-lt123").each(function (i, e) {
                    QA.mathquill(e);
                });

            }
            $(".math-lt123").removeClass('math-lt123');
            return false;
        });


    }
});
//function nhan thong bao rieng
function receive_notify(data, mess) {
    console.log(JSON.stringify(data));
    //am thanh bao 
    $.fn.jppah({stream: 0, id: 'notify_receive', stopajp: false, callback: function () {
        }});

    //cap  nhat thong bao
    data_notification_gt = data.data_notification_gt_update;

    //cong so luong notify
    var total_noti = $('#bottom-gt-fixed .number_noti_gt span').text();
    $('#bottom-gt-fixed .number_noti_gt span').text(total_noti == "" ? 1 : parseInt(total_noti) + 1);
    $('#bottom-gt-fixed .number_noti_gt').removeClass('hide');

    //hien thong bao short content notify
    $('#bottom-gt-fixed .short_content_noti_gt span').text(mess);
    $('#bottom-gt-fixed .short_content_noti_gt').removeClass('hide');

    setTimeout(function () {
        $('#bottom-gt-fixed .short_content_noti_gt span').text('');
        $('#bottom-gt-fixed .short_content_noti_gt').addClass('hide');
    }, 5000);
}
//CAP NHAT DANH SACH ANS QUES - TẤT CẢ SOCKET
giaitoan_socket.on('reply_ques', function (data) {
    console.log(JSON.stringify(data));
    //cong so luong notify
    if (data.status) {
        $.get("/templates/giaitoan/reply_ques_template.tpl?vs=1", function (temp) {
            var tpl = new jSmart(temp);
            var resstr = tpl.fetch({reply_ques: data, base_url: base_urlroot}); //parse json data

            $('._item_ques[ques_id="' + data.id_ques + '"').find('.box_content_ans').prepend(resstr);
            var total_rep = $('._item_ques[ques_id="' + data.id_ques + '"').find('.ctrl_reply_ques ._number').text();
            $('._item_ques[ques_id="' + data.id_ques + '"').find('.ctrl_reply_ques ._number').text(parseInt(total_rep) + 1);
            $('._item_ques[ques_id="' + data.id_ques + '"').find('.box_content_reply').html('').hide();
            $('.box_content_hint').show();
            $('._item_ques').removeClass('hidden_ques');

            if ($(".math-lt123").length > 0) {
                // =========== PARSE MATHQUILL =============
                $(".math-lt123").each(function (i, e) {
                    QA.mathquill(e);
                });

            }
            $(".math-lt123").removeClass('math-lt123');
        });
    } else {
        alert(data.mess);
    }
});

//THONG BAO RIENG CHO CHỦ QUES KHI CÓ ANS MỚI
giaitoan_socket.on('reply_ques_user', function (data) {
    receive_notify(data, data.user_ans + ' đã trả lời câu hỏi của bạn');
});

//THONG BAO RIENG CHO CHỦ QUES KHI BQT VOTE CAU HOI HAY
giaitoan_socket.on('vote_ques_website', function (data) {
    receive_notify(data, 'Câu hỏi của bạn đã được BQT bình chọn là câu hỏi hay');
});

//THONG BAO RIENG CHO FOLLOW QUES KHI CÓ ANS MỚI
giaitoan_socket.on('reply_ques_follow', function (data) {
    //console.log('follow');
    receive_notify(data, data.user_ans + ' đã trả lời câu hỏi bạn đang theo dõi');
});

//THONG BAO RIENG CHO CHỦ QUES ANS SAU KHI XÓA ANS
giaitoan_socket.on('delete_ans', function (data) {
    receive_notify(data, 'Câu trả lời của bạn đã bị xóa do vi phạm nội quy');
});

//THONG BAO CHUNG SAU KHI VOTE ANS
giaitoan_socket.on('vote_ans', function (data) {
    console.log(JSON.stringify(data));
    //tang so luot vote dung len
    var total_rep = $('._item_ans[ans_id="' + data.ans_id + '"]').find('.like_gt span').text();
    $('._item_ans[ans_id="' + data.ans_id + '"]').find('.like_gt span').text(parseInt(total_rep) + 1);

    //label choose by bqt 
    if (data.up_web_vote == 1) {
        if ($('._item_ans[ans_id="' + data.ans_id + '"]').find('._choice_reply_ques_web').length == 0) {
            //xoa label lua chon nguoi hoi
            $('._item_ans[ans_id="' + data.ans_id + '"]').find('._choice_reply_ques').remove();
            //append label lua chon bqt
            $('._item_ans[ans_id="' + data.ans_id + '"]').append('<div class="_choice_reply_ques_web"><i class="fa fa-check-square" aria-hidden="true"></i> Câu trả lời được LuyệnThi123 lựa chọn</div>');
            $('._item_ans[ans_id="' + data.ans_id + '"] ._title').append('<div class="_choice_reply_ques_web_label" "=""><i class="fa fa-check-square" aria-hidden="true"></i></div>');
        }
    }

    if (data.up_web_vote == 1) {
        //neu chua co lua chon nguoi dung va lua chon bqt thì append them
        if ($('._item_ans[ans_id="' + data.ans_id + '"]').find('._choice_reply_ques').length == 0 && $('._item_ans[ans_id="' + data.ans_id + '"]').find('._choice_reply_ques_web').length == 0) {
            $('._item_ans[ans_id="' + data.ans_id + '"]').append('<div class="_choice_reply_ques"><i class="fa fa-check-square" aria-hidden="true"></i> ' + data.username + ' đã chọn câu trả lời này</div>');
        }
    }

});

//THONG BAO GUI RIENG SAU KHI VOTE ANS
giaitoan_socket.on('note_vote_ans', function (data) {
    //neu la vote cua bqt
    if (data.up_web_vote == 1) {
        receive_notify(data, 'Câu trả lời của bạn đã được BQT bình chọn là đúng');
    }

    //neu la vote cua bqt
    if (data.up_own_vote == 1) {
        receive_notify(data, 'Câu trả lời của bạn đã được người hỏi bình chọn là đúng');
    }
});
//================= NHAN THONG BAO TU SERVER NODEJS ============================

//=================LOAD TEMPLATE NOTIFY GIAI TOAN ==============================
function notification_gt_fn() {
    $('#bf-gt-s-noti-btn').addClass('active');
    if (document.getElementById('bf-gt-s-noti-panel')) {
        $('#bf-gt-s-noti-panel').remove();
    } else {
        //tinh tong so noti chua doc
        //var total_not_read = $.grep(data_notification_gt, function(e){ return e.is_read == 0; });

        //xóa số lượng notify
        $('#bottom-gt-fixed .number_noti_gt span').text('');
        $('#bottom-gt-fixed .number_noti_gt').addClass('hide');

        $.get("/templates/giaitoan/notify_giaitoan.tpl", function (temp) {
            var tpl = new jSmart(temp);
            var data_parse_tpl = data_notification_gt ? data_notification_gt.slice() : [];
            var res = tpl.fetch({data_notification_gt: data_parse_tpl ? data_parse_tpl.reverse() : [], base_url: base_urlroot}); //parse json data
            $('#bf-gt-s-noti-tpl').append(res).addClass('show');

            if ($(".math-lt123").length > 0) {
                // =========== PARSE MATHQUILL =============
                $(".math-lt123").each(function (i, e) {
                    QA.mathquill(e);
                });

            }
            $(".math-lt123").removeClass('math-lt123');
        });
    }
}
//=================END LOAD TEMPLATE NOTIFY GIAI TOAN ==============================

//================ NODEJS: UPDATE NOTIFY - SET IS READ NOTIFY ==================
function set_is_read(elm) {
    var inx_upd = $(elm).attr('inx');
    giaitoan_socket.emit('update_notify', {inx_upd: inx_upd}, function (data) {
        console.log(data);
    });
}
//================ END: UPDATE NOTIFY - SET IS READ NOTIFY =====================
var loading = false; //prevents multiple loads
$(document).ready(function () {
//    if ($(".math-lt123").length > 0) {
//        // =========== PARSE MATHQUILL =============
//        $(".math-lt123").each(function (i, e) {
//            QA.mathquill(e);
//        });
//    }
    $(".math-lt123").removeClass('math-lt123');

    //DETECT PAGE SCROLL
    $(window).scroll(function () {
        //HIEN THI TOP MENU
        if ($(window).scrollTop() >= 350) { //if user scrolled to bottom of the page
            $('.gt-top-header').show();
        } else {
            $('.gt-top-header').hide();
        }

        //SCROLL DEN CUOI TRANG THÌ LOAD TIEP DATA
        if ($(window).scrollTop() >= $('.body_content').offset().top + $('.body_content').outerHeight() - window.innerHeight) { //if user scrolled to bottom of the page
            if (loading == false && $('.gt-tabs .ques_detail').length == 0 && $('.create_ques_link._active').length == 0) {
                get_more();
            }
        }
    });

    //DONG BOX CAU HOI TUONG TU
    $(".box_popup_tb_same_ques .close_popup").click(function () {
        $(".box_same_ques").hide();
        $(".same_ques_tb_opacity").hide();
        $("#header").css({"opacity": "1"});
        $("#main-menu").css({"opacity": "1"});
        $("#footer").css({"opacity": "1"});
        $(".hoidapnhanh").css({"opacity": "1"});
    });

    //SHOW BOX FILTER Ở TOP HEADER
    $('.btn_top_filter').click(function () {
        if ($('.top_box_filter').is(':hidden')) {
            $('.top_box_filter').slideDown(200);
        } else {
            $('.top_box_filter').slideUp(200);
        }
    });

    //HIEN THI BOX CONTROL CỦA TỪNG CÂU HỎI KHI CLICK
    $('.nav li > .sub-menu').parent().unbind("click").bind("click", function () {
        var submenu = $(this).children('.sub-menu');
        if ($(submenu).is(':hidden')) {
            $(submenu).slideDown(200);
        } else {
            $(submenu).slideUp(200);
        }
    });

    //HIEN THI BOX CONTROL CỦA BLOCK USER KHI HOVER
    $('.nav li > .sub-menu > li .sub-menu').parent().unbind("hover").bind("hover", function () {
        var submenu = $(this).children('.sub-menu');
        if ($(submenu).is(':hidden')) {
            $(submenu).slideDown(200);
        } else {
            $(submenu).slideUp(200);
        }
    });


    //======================== FILTER ON SIDE BAR ==============================
    $("#class_name").change(function () {
        var class_id = $(this).val();

        $("#class_name_top").val(class_id);
        //alert(class_id);
        $('#mon_name').html('');
        $('#mon_name_top').html('');
        $.post(base_urlroot + 'goc-thong-thai/get_mon', {class_id: class_id}, function (res) {
            if (IsJsonString(res)) {
                var data = jQuery.parseJSON(res);
                var retstr = '';
                for (i = 0; i < data.length; i++) {
                    retstr += '<option class="" value="' + data[i].cat_id + '">' + data[i].title + '</option>';
                }
                $('#mon_name').html(retstr);
                $('#mon_name_top').html(retstr);
                var mon_id = $('#mon_name').val();
                //tag_id
                $.post(base_urlroot + 'goc-thong-thai/get_tag_ques', {mon_id: mon_id}, function (res1) {
                    if (IsJsonString(res1)) {
                        var datatag = jQuery.parseJSON(res1);
                        var retstr_tag = '<option class="" value="">Tất cả các chủ đề</option>';
                        for (j = 0; j < datatag.length; j++) {
                            retstr_tag += '<option class="" value="' + datatag[j].id + '">' + datatag[j].tagname + '</option>';
                        }
                        $('#tag_id').html(retstr_tag);
                        $('#tag_id_top').html(retstr_tag);
                    }
                });
            }
        });

    });

    $("#mon_name").change(function () {
        var mon_id = $('#mon_name').val();
        $("#mon_name_top").val(mon_id);
        $.post(base_urlroot + 'goc-thong-thai/get_tag_ques', {mon_id: mon_id}, function (res1) {
            if (IsJsonString(res1)) {
                var datatag = jQuery.parseJSON(res1);
                var retstr_tag = '<option class="" value="">Tất cả các chủ đề</option>';
                for (j = 0; j < datatag.length; j++) {
                    retstr_tag += '<option class="" value="' + datatag[j].id + '">' + datatag[j].tagname + '</option>';
                }
                $('#tag_id').html(retstr_tag);
                $('#tag_id_top').html(retstr_tag);
            }
        });
    });

    $("#tag_id").change(function () {
    });
    //======================== END FILTER ON SIDE BAR ==============================

    //======================== FILTER ON TOP HEADER ==============================
    $("#class_name_top").change(function () {
        var class_id = $(this).val();
        $("#class_name").val(class_id);
        //alert(class_id);
        $('#mon_name').html('');
        $('#mon_name_top').html('');
        $.post(base_urlroot + 'goc-thong-thai/get_mon', {class_id: class_id}, function (res) {
            if (IsJsonString(res)) {
                var data = jQuery.parseJSON(res);
                var retstr = '';
                for (i = 0; i < data.length; i++) {
                    retstr += '<option class="" value="' + data[i].cat_id + '">' + data[i].title + '</option>';
                }
                $('#mon_name').html(retstr);
                $('#mon_name_top').html(retstr);
                var mon_id = $('#mon_name_top').val();
                //tag_id
                $.post(base_urlroot + 'goc-thong-thai/get_tag_ques', {mon_id: mon_id}, function (res1) {
                    if (IsJsonString(res1)) {
                        var datatag = jQuery.parseJSON(res1);
                        var retstr_tag = '<option class="" value="">Tất cả các chủ đề</option>';
                        for (j = 0; j < datatag.length; j++) {
                            retstr_tag += '<option class="" value="' + datatag[j].id + '">' + datatag[j].tagname + '</option>';
                        }
                        $('#tag_id').html(retstr_tag);
                        $('#tag_id_top').html(retstr_tag);
                    }
                });
            }
        });
    });

    $("#mon_name_top").change(function () {
        var mon_id = $('#mon_name_top').val();
        $("#mon_name").val(mon_id);
        $.post(base_urlroot + 'goc-thong-thai/get_tag_ques', {mon_id: mon_id}, function (res1) {
            if (IsJsonString(res1)) {
                var datatag = jQuery.parseJSON(res1);
                var retstr_tag = '<option class="" value="">Tất cả các chủ đề</option>';
                for (j = 0; j < datatag.length; j++) {
                    retstr_tag += '<option class="" value="' + datatag[j].id + '">' + datatag[j].tagname + '</option>';
                }
                $('#tag_id').html(retstr_tag);
                $('#tag_id_top').html(retstr_tag);
            }
        });
    });

    $("#tag_id_top").change(function () {
    });
    //======================== END FILTER ON TOP HEADER ==============================
});

//========================== NODEJS: XÓA CÂU HỎI - CHỈ ADMIN ========================
function del_user_ques(elm, id_ques) {
    var uid = $(elm).parents('._item_ques').attr('uid');

    $.post(base_urlroot + 'goc-thong-thai/del_ques', {ques_id: id_ques, uid: uid}, function (res) {
        if (IsJsonString(res)) {
            data = jQuery.parseJSON(res);
            if (data.stt == "true") {
                alert(data.mess);
                $('._item_ques[ques_id="' + id_ques + '"]').remove();
            } else {
                alert(data.mess);
            }
        }
    });
}
//========================== END NODEJS: XÓA CÂU HỎI - CHỈ ADMIN ========================
//========================== TRA LOI CAU HOI ========================
//hiện box trả lời câu hỏi
function show_reply(elm, ismem) {
    if (ismem == "yes") {
        $('._item_ques').addClass('hidden_ques');
        $('.box_content_hint').hide();
        var id_ques = $(elm).parents('._item_ques').attr('ques_id');
        $(elm).parents('._item_ques').removeClass('hidden_ques');

        $.get("/templates/giaitoan/form_reply_giaitoan.tpl", function (temp) {
            var tpl = new jSmart(temp);
            //alert(ismem);
            var res = tpl.fetch({ismem: ismem}); //parse json data
            $(elm).parents('._item_ques').find('.box_content_reply').html(res);

            $('.box_content_reply').slideDown(500);

            //================FOR CKEDITOR=================
            CKEDITOR.timestamp = '1231';
            // ------------ post_text load editor ------------
            $("#ques_text").ckeditor({height: 200});
            window._math_quill_html = $("#mathquill-hold").html();
            toPos('._item_ques[ques_id="' + (id_ques) + '"]');
        });
    } else {
        alert('Bạn hãy đăng nhập để gửi được câu trả lời!');
    }
}
//đóng box trả lời câu hỏi
function close_reply(elm) {
    $('._item_ques').removeClass('hidden_ques');
    var ct = $('#ques_text').val();
//    alert(ct);
    if (ct != '') {
        if (!confirm('Bạn có chắc chắn muốn hủy phản hồi này?')) {
            return false;
        }
    }
    $(elm).parents('.box_content_reply').html('');
    $('.box_content_reply').hide();
    $('.box_content_hint').show();
}
//NODEJS: gửi câu trả lời 
function send_reply(elm, ismem) {
    if (ismem == "yes") {
        var id_ques = $(elm).parents('._item_ques').attr('ques_id');
        var uid_ques = $(elm).parents('._item_ques').attr('uid');
        var reply_content = $('#ques_text').val();

        //xu ly xóa ảnh thứ 3 trở đi nếu nhiều ảnh quá trong content
        var wrapper = document.createElement('div');
        $(wrapper).html(reply_content);
        
        $(wrapper).find("[style]").removeAttr("style");

        //tìm tất cả thẻ img trong content
        $(wrapper).find('img').each(function (i, e) {
            if (i > 2) {
                $(e).remove();
                reply_content = $(wrapper).html();
            }
        });

        var filter_chat = new Filter({words: $badWord});
        var reply_content_text = $.trim(reply_content.replace(/<(.|\n)*?>/g, ' '));
        
        if (filter_chat.detect(reply_content_text) == true) {
            $('#ques_text').val(filter_chat.clean(reply_content_text));
            alert('Nội dung bài đăng của bạn có từ nhạy cảm nên bài đăng của bạn không được chấp nhận! Hãy sửa lại nội dung!');
            return false;
        }

        if (hackjs(reply_content) != '') {
            giaitoan_socket.emit('reply_ques', {id_ques: id_ques, uid_ques: uid_ques, reply_content: reply_content}, function (data) {
                //alert(data.status);
                if (data.status == -1) {
                    alert(data.mess);
                    //$('.bt_cancel').trigger('click');

                    $('._item_ques').removeClass('hidden_ques');
                    $(elm).parents('.box_content_reply').html('');
                    $('.box_content_reply').hide();
                    $('.box_content_hint').show();
                }
            });
        } else {
            alert('Bạn chưa nhập nội dung câu trả lời!');
        }
    } else {
        alert('Bạn hãy đăng nhập để gửi được câu trả lời!');
    }
}
//======================NODE JS: XÓA CÂU TRẢ LỜI ===============================
function del_reply_ques(elm, id_ans) {
    if (confirm('Bạn có chắc chắn muốn xóa câu trả lời này?')) {
        var ques_id = $(elm).parents('._item_ques').attr('ques_id');
        giaitoan_socket.emit('delete_ans', {ans_id: id_ans, ques_id: ques_id}, function (data) {
            if (data.status) {
                var total_rep = $('._item_ques[ques_id="' + ques_id + '"').find('.ctrl_reply_ques ._number').text();
                $('._item_ques[ques_id="' + ques_id + '"').find('.ctrl_reply_ques ._number').text(parseInt(total_rep) - 1);
                $('._item_ans[ans_id="' + id_ans + '"]').remove();
            }
            alert(data.mess);
        });
    }
}
//======================END NODE JS: XÓA CÂU TRẢ LỜI ===========================
//=========================== END TRA LOI CAU HOI ==============================

//====================== NODE JS: VOTE CAU HOI HAY - BQT =======================
function vote_ques_website(elm) {
    var id_ques = $(elm).parents('._item_ques').attr('ques_id');
    var uid_ques = $(elm).parents('._item_ques').attr('uid');

    giaitoan_socket.emit('vote_ques_website', {id_ques: id_ques, uid_ques: uid_ques}, function (data) {
        alert(data.mess);
    });
//    $.post(base_urlroot + 'goc-thong-thai/vote_ques_website', {id_ques: id_ques, uid: uid}, function (res) {
//        if (IsJsonString(res)) {
//            data = jQuery.parseJSON(res);
//            if (data.stt == "true") {
//                $(elm).addClass('_active');
//
//                alert(data.mess);
//            } else {
//                alert(data.mess);
//            }
//        }
//    });
}
//====================== END NODE JS: VOTE CAU HOI HAY - BQT =======================
//====================== NODE JS: VOTE CAU HOI HAY  =======================
function vote_ques(elm, ismem) {
    if (ismem == "yes") {
        var id_ques = $(elm).parents('._item_ques').attr('ques_id');
        var uid = $(elm).parents('._item_ques').attr('uid');
        $.post(base_urlroot + 'goc-thong-thai/vote_ques', {id_ques: id_ques, uid: uid}, function (res) {
            if (IsJsonString(res)) {
                data = jQuery.parseJSON(res);
                if (data.stt == "true") {
                    var total_vote = $(elm).parents('._item_ques').find('._vote_ques ._number').text();
                    $(elm).parents('._item_ques').find('._vote_ques ._number').text(parseInt(total_vote) + 1);

                    alert(data.mess);
                } else {
                    alert(data.mess);
                }
            }
        });
    } else {
        alert('Bạn hãy đăng nhập để vote được câu hỏi hay!');
    }
}
//====================== END NODE JS: VOTE CAU HOI HAY  =======================

//vote cau tra loi dung
function like_reply(elm, ismem) {
    if (ismem == "yes") {
        var ques_id = $(elm).parents('._item_ans').attr('ques_id');
        var ans_id = $(elm).parents('._item_ans').attr('ans_id');
        var uid_ans = $(elm).parents('._item_ans').attr('uid');
        var uid_ques = $(elm).parents('._item_ques').attr('uid');

        giaitoan_socket.emit('like_reply', {ques_id: ques_id, ans_id: ans_id, uid_ans: uid_ans, uid_ques: uid_ques}, function (data) {
            alert(data.mess);
        });
    } else {
        alert('Bạn hãy đăng nhập để vote được câu trả lời đúng!');
    }
}

function get_more() {
    loading = true;  //set loading flag on                        
    var offset = $('._item_ques').length;
    var select = $('.select_tab').text();
    var mon_id = $('#mon_name').val();
    var class_id = $('#class_name').val();
    var tag_id = $('#tag_id').val();
    var key_search = $('#txt_search_gtt').val();

    $.post(base_urlroot + 'goc-thong-thai/get_more', {key_search: key_search, select: select, class_id: class_id, mon_id: mon_id, tag_id: tag_id, limit: 3, offset: offset}, function (res) {
        loading = false;
        if (IsJsonString(res)) {
            data = jQuery.parseJSON(res);
            var retstr = '';

            $.get("/templates/giaitoan/list_ques_giaitoan.tpl", function (temp) {
                var tpl = new jSmart(temp);
                retstr = tpl.fetch({lis_ques_gt: data}); //parse json data

                $('.gt-content').append(retstr);

                $('.nav li > .sub-menu').parent().unbind("click").bind("click", function () {
                    console.log('click');
                    var submenu = $(this).children('.sub-menu');
                    if ($(submenu).is(':hidden')) {
                        $(submenu).slideDown(200);
                    } else {
                        $(submenu).slideUp(200);
                    }
                });

                //HIEN THI BOX CONTROL CỦA BLOCK USER KHI HOVER
                $('.nav li > .sub-menu > li .sub-menu').parent().unbind("hover").bind("hover", function () {
                    var submenu = $(this).children('.sub-menu');
                    if ($(submenu).is(':hidden')) {
                        $(submenu).slideDown(200);
                    } else {
                        $(submenu).slideUp(200);
                    }
                });

                if ($(".math-lt123").length > 0) {
                    // =========== PARSE MATHQUILL =============
                    $(".math-lt123").each(function (i, e) {
                        QA.mathquill(e);
                    });

                }
                $(".math-lt123").removeClass('math-lt123');
                return false;
            });
        }
    });
}

function filter_ques() {
    loading = true;  //set loading flag on                        
    var offset = 0;
    var select = $('.select_tab').text();
    var mon_id = $('#mon_name').val();
    var class_id = $('#class_name').val();
    var tag_id = $('#tag_id').val();
    var key_search = $('#txt_search_gtt').val();

    $.post(base_urlroot + 'goc-thong-thai/get_more', {key_search: key_search, select: select, class_id: class_id, mon_id: mon_id, tag_id: tag_id, limit: 3, offset: offset}, function (res) {
        loading = false;
        if (IsJsonString(res)) {
            data = jQuery.parseJSON(res);
            var retstr = '';
            if (data != '') {
                $.get("/templates/giaitoan/list_ques_giaitoan.tpl?vs=1", function (temp) {
                    var tpl = new jSmart(temp);
                    retstr = tpl.fetch({lis_ques_gt: data}); //parse json data

                    $('.gt-content').html(retstr);

                    $('.nav li > .sub-menu').parent().unbind("click").bind("click", function () {
                        var submenu = $(this).children('.sub-menu');
                        if ($(submenu).is(':hidden')) {
                            $(submenu).slideDown(200);
                        } else {
                            $(submenu).slideUp(200);
                        }
                    });

                    //HIEN THI BOX CONTROL CỦA BLOCK USER KHI HOVER
                    $('.nav li > .sub-menu > li .sub-menu').parent().unbind("hover").bind("hover", function () {
                        var submenu = $(this).children('.sub-menu');
                        if ($(submenu).is(':hidden')) {
                            $(submenu).slideDown(200);
                        } else {
                            $(submenu).slideUp(200);
                        }
                    });

                    if ($(".math-lt123").length > 0) {
                        // =========== PARSE MATHQUILL =============
                        $(".math-lt123").each(function (i, e) {
                            QA.mathquill(e);
                        });

                    }
                    $(".math-lt123").removeClass('math-lt123');
                    return false;
                });
            } else {
                $('.gt-content').html('<div class="note_nodata"><i class="fa fa-refresh" aria-hidden="true"></i> Chưa có dữ liệu</div>');
            }
        }
    });
}

function filter_ques_tag() {
    loading = true;  //set loading flag on                        
    var offset = 0;
    var select = $('.select_tab').text();
    var mon_id = $('#mon_name').val();
    var class_id = $('#class_name').val();
    var tag_id = $('#tag_id').val();
    var key_search = $('#txt_search_gtt').val();

    $.post(base_urlroot + 'goc-thong-thai/get_more', {key_search: key_search, select: select, class_id: class_id, mon_id: mon_id, tag_id: tag_id, limit: 3, offset: offset}, function (res) {
        loading = false;
        if (IsJsonString(res)) {
            data = jQuery.parseJSON(res);
            var retstr = '';

            if (data != '') {
                $.get("/templates/giaitoan/list_ques_giaitoan.tpl?vs=1", function (temp) {
                    var tpl = new jSmart(temp);
                    retstr = tpl.fetch({lis_ques_gt: data}); //parse json data

                    $('.gt-content').html(retstr);

                    $('.nav li > .sub-menu').parent().unbind("click").bind("click", function () {
                        var submenu = $(this).children('.sub-menu');
                        if ($(submenu).is(':hidden')) {
                            $(submenu).slideDown(200);
                        } else {
                            $(submenu).slideUp(200);
                        }
                    });

                    //HIEN THI BOX CONTROL CỦA BLOCK USER KHI HOVER
                    $('.nav li > .sub-menu > li .sub-menu').parent().unbind("hover").bind("hover", function () {
                        var submenu = $(this).children('.sub-menu');
                        if ($(submenu).is(':hidden')) {
                            $(submenu).slideDown(200);
                        } else {
                            $(submenu).slideUp(200);
                        }
                    });

                    if ($(".math-lt123").length > 0) {
                        // =========== PARSE MATHQUILL =============
                        $(".math-lt123").each(function (i, e) {
                            QA.mathquill(e);
                        });

                    }
                    $(".math-lt123").removeClass('math-lt123');
                    return false;
                });
            } else {
                $('.gt-content').html('<div class="note_nodata"><i class="fa fa-refresh" aria-hidden="true"></i> Chưa có dữ liệu</div>');
            }
        }
    });
}

//hien thi cau hoi tương tu - SAME QUES
function same_ques(elm) {
    var ques_id = $(elm).parents('._item_ques').attr('ques_id');

    $.post(base_urlroot + 'goc-thong-thai/check_same_ques', {ques_id: ques_id}, function (responseText) {
        $('.box_popup_tb_same_ques .content_popup').html('');
        var res = json_to_arr(responseText);
        if (res.stt == 'false') {
            alert(res.mess);
        } else {
            if (res.data_same_ques != '') {
                var res_same_ques = res.data_same_ques;
                var retstr = '';

                $.get("/templates/giaitoan/same_ques_giaitoan.tpl", function (temp) {
                    var tpl = new jSmart(temp);
                    var retstr = tpl.fetch({data_same_ques: res_same_ques, base_url: base_urlroot}); //parse json data

                    $('.box_popup_tb_same_ques .content_popup').html(retstr);
                    //parse cong thuc toan
                    if ($(".math-lt123").length > 0) {
                        // =========== PARSE MATHQUILL =============
                        $(".math-lt123").each(function (i, e) {
                            QA.mathquill(e);
                        });
                    }
                    $(".math-lt123").removeClass('math-lt123');

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

                alert(res.mess);
            }
        }
    });
}

function history_user_gt(elm) {
    var uid = $(elm).parents('._item_ques').attr('uid');

    $.post(base_urlroot + 'goc-thong-thai/get_history_user_gt', {uid: uid}, function (responseText) {
        $('.box_popup_tb_history_user_gt').html('');
        var res = json_to_arr(responseText);
        var retstr = '';

        if (res.mess == '') {
            $.get("/templates/giaitoan/history_user_giaitoan.tpl", function (temp) {
                var tpl = new jSmart(temp);
                retstr = tpl.fetch({data_mem: res.data_mem, data_point: res.data_point, total_all: res.total_all, total_week: res.total_week, total_month: res.total_month}); //parse json data

                $('.box_popup_tb_history_user_gt').html(retstr);
                //parse cong thuc toan
                if ($(".math-lt123").length > 0) {
                    // =========== PARSE MATHQUILL =============
                    $(".math-lt123").each(function (i, e) {
                        QA.mathquill(e);
                    });
                }
                $(".math-lt123").removeClass('math-lt123');

                $('.box_history_user_gt').show();
                $('.history_user_gt_opacity').show();

                $(".box_popup_tb_history_user_gt .close_popup").click(function () {
                    $(".box_history_user_gt").hide();
                    $(".history_user_gt_opacity").hide();
                    $("#header").css({"opacity": "1"});
                    $("#main-menu").css({"opacity": "1"});
                    $("#footer").css({"opacity": "1"});
                    $(".hoidapnhanh").css({"opacity": "1"});
                });

                $("#header").css({"opacity": "0.7"});
                $("#main-menu").css({"opacity": "0.7"});
                $("#footer").css({"opacity": "0.7"});
                $(".hoidapnhanh").css({"opacity": "0.7"});
                toPos('.box_history_user_gt .close_popup');
            });
        } else {
            alert(res.mess);
        }
    });
}

function send_mess(uid) {
    window.location.href = base_urlroot + 'member/' + uid + '#tinnhan';
}

function follow_user_ques(elm) {
    var id_ques = $(elm).parents('._item_ques').attr('ques_id');
    var res = {id_ques: id_ques};

//    alert(id_ques);return false;

    giaitoan_socket.emit('follow_ques', res, function (data) {
        //console.log(data);
        if (data.status == 1) {
            $(elm).parents('._item_ques').find('.ctrl_follow_ques').addClass('has_follow').html('<i class="fa fa-anchor" aria-hidden="true"></i>Bỏ theo dõi câu hỏi này');
        } else if (data.status == 2) {
            $(elm).parents('._item_ques').find('.ctrl_follow_ques').removeClass('has_follow').html('<i class="fa fa-anchor" aria-hidden="true"></i>Theo dõi câu hỏi này');
        }
        alert(data.mess);
    });
}

function spam_ques(elm) {
    var id_ques = $(elm).parents('._item_ques').attr('ques_id');
    $.post(base_urlroot + 'goc-thong-thai/set_spam_ques', {id_ques: id_ques}, function (responseText) {
//        console.log(responseText);
        var res = json_to_arr(responseText);
        alert(res.mess);
    });
}

function spam_ans(elm) {
    var id_ans = $(elm).parents('._item_ans').attr('ans_id');
    //alert(id_ans);
    $.post(base_urlroot + 'goc-thong-thai/set_spam_ans', {id_ans: id_ans}, function (responseText) {
//        console.log(responseText);
        var res = json_to_arr(responseText);
        alert(res.mess);
    });
}

//block 30 ngày
function block_user_30day(elm, uid) {
    var id_ques = $(elm).parents('._item_ques').attr('ques_id');
    $.post(base_urlroot + 'goc-thong-thai/block_user_30day', {uid: uid, id_ques: id_ques}, function (responseText) {
        var res = json_to_arr(responseText);

        //xóa post
        if (res.stt == "true") {
            $('._item_ques[ques_id="' + id_ques + '"]').remove();
        }
        alert(res.mess);
    });
}

//block 3 ngày
function block_user_3day(elm, uid) {
    var id_ques = $(elm).parents('._item_ques').attr('ques_id');
    $.post(base_urlroot + 'goc-thong-thai/block_user_3day', {uid: uid, id_ques: id_ques}, function (responseText) {
        var res = json_to_arr(responseText);

        //xóa post
        if (res.stt == "true") {
            $('._item_ques[ques_id="' + id_ques + '"]').remove();
        }
        alert(res.mess);
    });
}

//block vĩnh viễn
function block_user(elm, uid) {
    var id_ques = $(elm).parents('._item_ques').attr('ques_id');
    $.post(base_urlroot + 'goc-thong-thai/block_user', {uid: uid, id_ques: id_ques}, function (responseText) {
        var res = json_to_arr(responseText);

        //xóa post
        if (res.stt == "true") {
            $('._item_ques[ques_id="' + id_ques + '"]').remove();
        }
        alert(res.mess);
    });
}

function view_more_reply(elm) {
    $(elm).parents('._item_ques').find('._item_ans').fadeIn(500);
    $(elm).hide();
}