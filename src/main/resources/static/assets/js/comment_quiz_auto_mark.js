//==============PROCESS SHOW/HIDE AND SEND COMMENT ==============
$(document).ready(function () {
    //show hui bai khi con ngay 
    if(parseInt($('.mcd_f22').text()) > 0){
        $('.comment_box').show();
        $('#powerr').show();
    }else{
        $('.comment_box').hide();
        $('#powerr').hide();
    }
    
    //show bai gui cua ban
    if ($('#mypost').html()!='') {
        $('.my_send_comment').show();
        $('.comment_box').hide();
    }else{
        $('.my_send_comment').hide();
    }
});

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        min = d.getMinutes(), 
        sec = d.getSeconds(); 

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/') + " " + [hour, min, sec].join(':');
}

//gui bai
function send_my_post(page) {
    $('#comment_loading').html('');
    
    var post_dapan = $("#post_dapan").length ? $('#post_dapan').val() : '';
    if (encodeURIComponent) {
        var dapan_mem = encodeURIComponent(post_dapan);
    } else {
        var dapan_mem = escape(post_dapan);
    }

    var post_id = $('#post_id').val();
    var params = {url: page, str: dapan_mem, post_id: post_id};

    $.post(base_urlroot + 'act/send_post_auto_mark', params, function (res) {
        if (res.substring(0, 3) == 'OK_') {
            //xóa form gửi bài
            $('#send_com').remove();
            //hien thi form bai gui cua ban
            $('#mypost').html(post_dapan);
            $('.my_send_comment ._date_r').html("Gửi lúc: "+formatDate());
            $('.my_send_comment').show();
        } else {
            $('.my_send_comment').hide();
            $('#send_com').show();
        }

        $('#comment_loading').html(res.substring(3));
        if (typeof ($('#del_comm')) != "undefined" && $('#del_comm') !== null) {
            var del11 = $('#del_comm').html();
            $('#box_del').html('<a href="javascript:del_comment1(' + del11 + ')" title="Delete"><div class="pne_st1_r_file_bt">Xóa bài</div></a><div id="member_comment_' + del11 + '"></div>');
        }
        if (typeof ($('#my_scores')) != "undefined" && $('#my_scores') !== null) {
            $('#my_scores').hide();
            $('.ctrl_powers').show();
            $('#no_pass_cm').hide();
        }
    });
}