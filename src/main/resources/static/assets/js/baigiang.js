$(document).ready(function () {
    //ON hover star in box_user_rating
    $('.box_user_rating .rating label').mouseenter(function(){
        $('.box_user_rating .hint_rating').text($(this).attr('title'));
    }).mouseleave(function() {
        $('.box_user_rating .hint_rating').html('&nbsp;');
    });
   
    //ON SELECT CLASS => CHANGE DATA MON
    $(".filter_class").change(function () {
        var class_id = $(this).val();

        $('.filter_mon').html('');
        $.post(base_urlroot + 'goc-thong-thai/get_mon', {class_id: class_id}, function (res) {
            if (IsJsonString(res)) {
                var data = jQuery.parseJSON(res);
                var retstr = '';
                for (i = 0; i < data.length; i++) {
                    retstr += '<option class="" value="' + data[i].cat_id + '">' + data[i].title + '</option>';
                }
                $('.filter_mon').html(retstr);
            }
        });

    });

    //SEARCH VIDEO
    $("#txt_search_bg").keyup(function () {
        var key_search = $(this).val();
        var id_subject_video = $(this).parents('.box_baigiang_content').attr('id_subject_video');

        if (key_search && key_search.length > 3) {
            $.post(base_urlroot + 'act/action_baigiang/search_baigiang', {'key_search': key_search, 'id_subject_video': id_subject_video}, function (res) {
                $.get("/templates/baigiang/list_video.tpl?vs=1", function (temp) {
                    var tpl = new jSmart(temp);
                    var data = JSON.parse(res);

                    retstr = tpl.fetch({list_video: data, base_url: base_urlroot}); //parse json data

                    $('.box_list_baigiang').html(retstr);
                    return false;
                });
            });
        } else if (key_search == '') {
            $.post(base_urlroot + 'act/action_baigiang/search_baigiang', {'key_search': key_search, 'id_subject_video': id_subject_video}, function (res) {
                $.get("/templates/baigiang/list_video.tpl?vs=1", function (temp) {
                    var tpl = new jSmart(temp);
                    var data = JSON.parse(res);

                    retstr = tpl.fetch({list_video: data, base_url: base_urlroot}); //parse json data

                    $('.box_list_baigiang').html(retstr);
                    return false;
                });
            });
        }
    });

    //CLICK ICON FAVORITE VIDEO  - TRANG INDEX
    $(".item_baigiang .box_favorite .fa").click(function () {
        //video đang được yêu thích
        if ($(this).hasClass('fa-heart')) {
            var action = 'remove';
        } else {
            //video chưa được yêu thích
            var action = 'add';
        }

        var elm = $(this);

        var id_video = $(this).parents('.item_baigiang').attr('id_video');
        $.post(base_urlroot + 'act/action_baigiang/set_favorite_video', {'action': action, 'id_video': id_video}, function (res) {
            var data = JSON.parse(res);
            if (data.mess == 'success') {
                if (data.action == 'add') {
                    elm.attr('class', 'fa fa-heart').attr('style', 'color: #ec5c51;');
                    elm.next().text('Bỏ Yêu thích');

                    alert('Yêu thích bài giảng thành công!');
                } else {
                    elm.attr('class', 'fa fa-heart-o').attr('style', '');
                    elm.next().text('Yêu thích');

                    //remove bai hoc yeu thich o sidebar nếu có
                    $("." + id_video + "_item_favorite").remove();

                    alert('Bỏ yêu thích bài giảng thành công!');
                }
            } else if (data.mess == 'non-vip') {
                alert('Bạn phải là thành viên mới được yêu thích bài giảng này!');
            } else {
                alert('Có lỗi xảy ra trong quá trình xử lý! Hãy thử lại');
            }
            return false;
        });
    });

    //CLICK FAVORITE VIDEO  - TRANG DETAIL
    $(".box_video_baigiang .box_favorite").click(function () {
        if ($(this).attr('style') == "") {
            //video chưa được yêu thích
            var action = 'add';
        } else {
            //video đang được yêu thích
            var action = 'remove';
        }

        var elm = $(this);

        var id_video = $(this).parents('.box_video_baigiang').attr('id_video');
        $.post(base_urlroot + 'act/action_baigiang/set_favorite_video', {'action': action, 'id_video': id_video}, function (res) {
            var data = JSON.parse(res);
            if (data.mess == 'success') {
                if (data.action == 'add') {
                    elm.attr('style', 'color: #ec5c51;');
                    elm.html('<i class="fa fa-heart" aria-hidden="true"></i><i class="fa fa-plus" style="font-size: 8px;" aria-hidden="true"></i> Loại bỏ bài học yêu thích');

                    alert('Yêu thích bài giảng thành công!');
                } else {
                    elm.attr('style', '');
                    elm.html('<i class="fa fa-heart" aria-hidden="true"></i><i class="fa fa-plus" style="font-size: 8px;" aria-hidden="true"></i> Thêm vào bài học yêu thích');

                    //remove bai hoc yeu thich o sidebar nếu có
                    $("." + id_video + "_item_favorite").remove();

                    alert('Bỏ yêu thích bài giảng thành công!');
                }
            } else if (data.mess == 'non-vip') {
                alert('Bạn phải là thành viên mới được yêu thích bài giảng này!');
            } else {
                alert('Có lỗi xảy ra trong quá trình xử lý! Hãy thử lại');
            }
            return false;
        });
    });

    //CLICK FAVORITE VIDEO  - SIDEBAR
    $(".box_sidebar_baigiang ._favorite").click(function () {
        var elm = $(this);

        var id_video = $(this).parents('.item_favorite').attr('id_video');
        $.post(base_urlroot + 'act/action_baigiang/set_favorite_video', {'action': 'remove', 'id_video': id_video}, function (res) {
            var data = JSON.parse(res);
            if (data.mess == 'success') {
                elm.attr('class', 'fa fa-heart-o').attr('style', '');
                elm.next().text('Yêu thích');

                //remove bai hoc yeu thich o sidebar
                $("." + id_video + "_item_favorite").remove();

                //change icon favorite in detail
                $(".box_video_baigiang .box_favorite").attr('style', '');
                $(".box_video_baigiang .box_favorite").html('<i class="fa fa-heart" aria-hidden="true"></i><i class="fa fa-plus" style="font-size: 8px;" aria-hidden="true"></i> Thêm vào bài học yêu thích');

                //change icon favorite in index
                $('.box_list_baigiang .' + id_video + '_item_baigiang .box_favorite .fa').attr('class', 'fa fa-heart-o').attr('style', '');
                $('.box_list_baigiang .' + id_video + '_item_baigiang .box_favorite .fa').next().text('Yêu thích');

                alert('Bỏ yêu thích bài giảng thành công!');
            } else if (data.mess == 'non-vip') {
                alert('Bạn phải là thành viên mới được yêu thích bài giảng này!');
            } else {
                alert('Có lỗi xảy ra trong quá trình xử lý! Hãy thử lại');
            }
            return false;
        });
    });

    //CLICK ICON FAVORITE VIDEO  - TRANG FAVORITE
    $(".item_baigiang_fav .box_favorite .fa").click(function () {
        var id_video = $(this).parents('.item_baigiang_fav').attr('id_video');
        $.post(base_urlroot + 'act/action_baigiang/set_favorite_video', {'action': 'remove', 'id_video': id_video}, function (res) {
            var data = JSON.parse(res);
            if (data.mess == 'success') {
                //remove bai hoc yeu thich
                $("." + id_video + "_item_baigiang_fav").remove();

                //alert("." + id_video + "_item_baigiang_fav");
                alert('Bỏ yêu thích bài giảng thành công!');
            } else if (data.mess == 'non-vip') {
                alert('Bạn phải là thành viên mới được yêu thích bài giảng này!');
            } else {
                alert('Có lỗi xảy ra trong quá trình xử lý! Hãy thử lại');
            }
            return false;
        });
    });

    //CLICK XÓA COMMENT  - TRANG DETAIL
    $(".del_comment").click(function () {
        if (confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
            var id_vote = $(this).parents('.item_comment').attr('id_vote');
            $.post(base_urlroot + 'act/action_baigiang/del_comment_video', {'id_vote': id_vote}, function (res) {
                var data = JSON.parse(res);
                if (data.mess == 'success') {
                    //remove 
                    $("." + data.uid + "_" + data.id_video + "_item_comment").remove();

                    alert('Xóa bình luận thành công!');
                } else if (data.mess == 'non-admin') {
                    alert('Bạn phải là Admin mới được xóa bình luận này!');
                } else {
                    alert('Có lỗi xảy ra trong quá trình xử lý! Hãy thử lại');
                }
                return false;
            });
        }

    });
    
    //CLICK XÓA REPLY COMMENT  - TRANG DETAIL
    $(".del_comment_reply").click(function () {
        if (confirm('Bạn có chắc chắn muốn xóa trả lời này?')) {
            var id_vote_reply = $(this).parents('.item_reply').attr('id_reply');
            $.post(base_urlroot + 'act/action_baigiang/del_reply_video', {'id_vote_reply': id_vote_reply}, function (res) {
                var data = JSON.parse(res);
                if (data.mess == 'success') {
                    //tổng số lượt trả lời comment thay đổi
                    var total_reply = $(".item_comment[id_vote='"+data.id_vote+"']").find('.total_comment b').text();
                    $(".item_comment[id_vote='"+data.id_vote+"']").find('.total_comment b').text(parseInt(total_reply)-1);
                    
                    //remove tra loi
                    $(".item_reply[id_reply='"+id_vote_reply+"'").remove();

                    alert('Xóa trả lời thành công!');
                } else if (data.mess == 'non-admin') {
                    alert('Bạn phải là Admin mới được xóa trả lời này!');
                } else {
                    alert('Có lỗi xảy ra trong quá trình xử lý! Hãy thử lại');
                }
                return false;
            });
        }

    });

    //SHOW MORE INTRO BAI GIANG
    $(".btn_show_full_content").click(function () {
        $(".box_intro_baigiang ._content").css("height", "auto");
        $("._hide_content").hide();
    });

    $(".btn_hide_content").click(function () {
        $(".box_intro_baigiang ._content").css("height", "150px");
        $("._hide_content").show();
    });

    //click play video
    $(".img_play_video").click(function () {
        $(this).hide();
        this.previousElementSibling.style.display = 'block';
        this.previousElementSibling.play();
    });
    
    //xem thêm reply
    $(".total_comment").click(function () {
        $(this).parents('.item_comment').find('.dialog_comment_reply').slideToggle();
    });

    //xem them comment
    $(".more_rating_baigiang").click(function () {
        $(".box_show_rating_comment").slideToggle();
        
//        if ($(".box_show_rating_comment").is(":visible")) {
        if ($(this).parent().find('.more_rating_baigiang').html() == 'Xem chi tiết <i class="fa fa-caret-down" aria-hidden="true"></i>') {
            $(this).parent().find('.more_rating_baigiang').html('Ẩn chi tiết <i class="fa fa-caret-up" aria-hidden="true"></i>');
        } else {
            $(this).parent().find('.more_rating_baigiang').html('Xem chi tiết <i class="fa fa-caret-down" aria-hidden="true"></i>');
        }
    });
    
    $(".head_rating_baigiang").click(function () {
        $(".box_show_rating_comment").slideToggle();
        
//        if ($(".box_show_rating_comment").is(":visible")) {
        if ($(this).parent().find('.more_rating_baigiang').html() == 'Xem chi tiết <i class="fa fa-caret-down" aria-hidden="true"></i>') {
            $(this).parent().find('.more_rating_baigiang').html('Ẩn chi tiết <i class="fa fa-caret-up" aria-hidden="true"></i>');
        } else {
            $(this).parent().find('.more_rating_baigiang').html('Xem chi tiết <i class="fa fa-caret-down" aria-hidden="true"></i>');
        }
    });

    //GỬI ĐÁNH GIÁ VÀ BINH LUẬN
    $(".btn_comment_bg").click(function () {
        var id_video = $('.box_video_baigiang').attr('id_video');
        var point_star = $('input[name=' + id_video + '_rating]:checked').val();
        var comment = $('#txt_comment_bg').val();

        if (!$.isNumeric(point_star)) {
            alert('Bạn chưa đánh giá (Bình chọn sao) cho bài giảng!');
            return false;
        } else if (comment == '') {
            alert('Bạn chưa nhập bình luận!');
            return false;
        }else if(comment.length < 3){
            alert('Bình luận của bạn quá ngắn!');
            return false;
        }
        
        //empty
        $('#txt_comment_bg').val('');

        $.post(base_urlroot + 'act/action_baigiang/set_vote_video', {'point_star': point_star, 'comment': comment, 'id_video': id_video}, function (res) {
            var data = JSON.parse(res);
            if (data.mess == '1') {
                //remove lượt vote cũ nếu có
                $("." + data.uid + "_" + id_video + "_item_comment").remove();

                //add new comment
                $.get("/templates/baigiang/comment_video.tpl?vs=1", function (temp) {
                    var tpl = new jSmart(temp);
                    var resstr = tpl.fetch({list_comment_video: data.list_comment_video, base_url: base_urlroot}); //parse json data

                    $('.content_list_comment_bg').prepend(resstr);
                });

            } else if (data.mess == 'non-vip') {
                alert('Bạn phải là thành viên mới được đánh giá bài giảng này!');
            } else {
                alert('Có lỗi xảy ra trong quá trình xử lý! Hãy thử lại');
            }
            return false;
        });

    });
    
    //GỬI TRẢ LỜI CHO BINH LUẬN
    $(".btn_comment_reply").click(function () {
        var id_vote = $(this).parents('.dialog_comment_reply').attr('id_vote');
        var reply = $(this).prev('.txt_comment_reply').val();

        if (reply == '') {
            alert('Bạn chưa nhập câu trả lời bình luận!');
            return false;
        }else if(reply.length < 3){
            alert('Câu trả lời của bạn quá ngắn!');
            return false;
        }
        
        //set empty
        $(this).prev('.txt_comment_reply').val('');

        $.post(base_urlroot + 'act/action_baigiang/reply_comment_video', {'id_vote': id_vote, 'reply': reply}, function (res) {
            var data = JSON.parse(res);
            if (data.mess == 'success') {
                //tổng số lượt trả lời comment thay đổi
                var total_reply = $(".item_comment[id_vote='"+id_vote+"']").find('.total_comment b').text();
                $(".item_comment[id_vote='"+id_vote+"']").find('.total_comment b').text(parseInt(total_reply)+1);

                //add new reply
                $.get("/templates/baigiang/reply_comment.tpl?vs=1", function (temp) {
                    var tpl = new jSmart(temp);
                    var resstr = tpl.fetch({list_reply: data.list_reply, base_url: base_urlroot}); //parse json data

                    $('.dialog_comment_reply[id_vote="'+id_vote+'"] .item_user_reply').prepend(resstr);
                });

            } else if (data.mess == 'non-vip') {
                alert('Bạn phải là thành viên mới được trả lời bình luận này!');
            } else {
                alert('Có lỗi xảy ra trong quá trình xử lý! Hãy thử lại');
            }
            return false;
        });

    });
});

//GO TO TIME DURATION
function goToTimeDuration(id_video, time) {
    $(".img_play_video").hide();
    var vid = document.getElementById(id_video);
    vid.currentTime = time;
    vid.play();
}

//next - prev các bài học yeu thich
function do_control(act, p, limit) {
    $.post(base_urlroot + 'act/action_baigiang/get_more_video_favorite', {'action': act, 'limit': limit, 'p': p, 'time': Math.random()}, function (res) {
        $.get("/templates/baigiang/list_video_favorite.tpl?vs=1", function (temp) {
            var tpl = new jSmart(temp);
            var data = JSON.parse(res);

            var retstr = tpl.fetch({list_video: data.list_video, control: data.control, base_url: base_urlroot}); //parse json data

            $('.box_baigiang_fav_content').html(retstr);
            return false;
        });
    });
}

//loc bai hoc yeu thich theo mon
function search_favotite() {
    var mon_id = $('.filter_mon').val();
    $.post(base_urlroot + 'act/action_baigiang/get_favorite_by_mon', {'mon_id': mon_id}, function (res) {
        $.get("/templates/baigiang/list_video_favorite.tpl?vs=1", function (temp) {
            var tpl = new jSmart(temp);
            var data = JSON.parse(res);

            var retstr = tpl.fetch({list_video: data.list_video, control: data.control, base_url: base_urlroot}); //parse json data

            $('.box_baigiang_fav_content').html(retstr);
            return false;
        });
    });
}