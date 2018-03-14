var fail = 0;
var base_urlroot= window.location.origin;
function detectPhoneNumber(num) {
    if (num && !num.match(/\D/g) && num.length >= 10 && num.length <= 11 && num.match("^(090|093|0120|0121|0122|0126|0128|096|097|098|0162|0163|0164|0165|0166|0167|0168|0169|091|094|0123|0124|0125|0127|0129|092|0188|095|0993|0994|0995|0996|0199).*")) {
        return true;
    } else {
        return false;
    }
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == '') {
        return true;
    } else {
        return re.test(email);
    }
}
$(document).ready(function () {
    //quen mat khau
    $('.vbv2_captcha').blur(function () {
        var cvl = $('.vbv2_captcha').val();
        if ((cvl == '') || (cvl.length < 6) || (cvl.length > 6)) {
            $('.code-fg-error').css('display', 'block');
            $(".code-fg-error").addClass("false");
            $(".code-fg-error").text('Mã xác nhận không hợp lệ!');
            $('.vbv2_captcha').addClass('error');
            reloadCapcha("#reloadCapchafgp");
            return false;
        } else {
            var captdata = {'fieldcaptcha': 'field', 'codecapt': cvl};
            $.post(base_urlroot + 'com/validateform.php', captdata, function (res) {
                res = jQuery.parseJSON(res);
                if (res.errorcode)
                {
                    $(".code-fg-error").css('display', 'block');
                    $(".code-fg-error").addClass("false");
                    $(".code-fg-error").text(res.errorcode);
                    $(".vbv2_captcha").addClass("error");
                    reloadCapcha("#reloadCapchafgp");
                    return false;
                }
                else if (res.cuccesscode)
                {
                    $(".code-fg-error").css('display', 'block');
                    $(".code-fg-error").addClass("true");
                    //$(".code-fg-error").text(res.cuccesscode);
                    return true;
                }
                return false;
            }).fail(function () {
                alert('Loader Fail!');
                reloadCapcha("#reloadCapchafgp");
            });
        }
    });
    $('.vbv2_captcha').focus(function () {
        $('.vbv2_captcha').removeClass('error');
        $(".code-fg-error").removeClass("false");
        $('.code-fg-error').hide();
    });

    $('.res_input').blur(function () {
        var elm = $('.res_input');
        var emailval = elm.val();
        if (!validateEmail(emailval)) {
            elm.addClass('error');
            $('.email-fg-error').text('Địa chỉ email không hợp lệ!');
            $('.email-fg-error').show();
        } else {
            $.post(base_urlroot + 'dang-ky/checkemail', {email: emailval}, function (data) {
                if (IsJsonString(data)) {
                    data = jQuery.parseJSON(data);
                    if (data.stt == 'true') {
                        $('.email-fg-error').text('Địa chỉ email ' + emailval + " chưa được đăng ký trong hệ thống!");
                        elm.addClass('error');
                        $('.email-fg-error').show();
                    } else {
                        elm.removeClass('error');
                        $('.email-fg-error').hide();
                    }
                } else {
                    //alert('Lỗi hệ thống!');
                    //location.reload();
                }
            });
            $('.res_input').text('');
            elm.removeClass('error');
        }
    });

    $('.res_input').focus(function () {
        $('.res_input').removeClass('error');
        $(".email-fg-error").removeClass("error");
        $('.email-fg-error').hide();
    });
    // end quen mat khau

    $("#rsreloadCapcha").click(function () {
        reloadCapcha("#reloadCapcha");
    });
    $('.cmnd').blur(function () {
        var uvl = $(this).val();
        if (uvl.length > 0) {
            $('.detail_cmnd').fadeIn(300);
        } else {
            $('.detail_cmnd').fadeOut(300);
        }
    });

    $('.us-capt').blur(function () {
        var uvl = $('.us-capt').val();
        if ((uvl == '') || (uvl.length <= 3)) {
            $('.us-error').text('Tên đăng nhập không hợp lệ!');
            $('.us-error').css('display', 'block');
            $('.us-capt').addClass('error');
        }
    });
    $('.us-capt').focus(function () {
        $('.us-error').hide();
        $('.us-capt').removeClass('error');
    });
    $('.pas-capt').blur(function () {
        var pvl = $('.pas-capt').val();
        if ((pvl == '') || (pvl.length <= 4)) {
            $('.pas-error').text('Mật khẩu không hợp lệ!')
            $('.pas-error').css('display', 'block');
            $('.pas-capt').addClass('error');
        }
    });
    $('.pas-capt').focus(function () {
        $('.pas-error').hide();
        $('.pas-capt').removeClass('error');

    });
    $('.txtcapt').blur(function () {
        var cvl = $('.txtcapt').val();
        if ((cvl == '') || (cvl.length < 6) || (cvl.length > 6)) {
            $('#er_code').css('display', 'block');
            $("#er_code").addClass("false");
            $("#er_code").text('Mã bảo vệ không hợp lệ!');
            $('.txtcapt').addClass('error');
            return false;
        }
        /*
         else{
         var captdata = {'fieldcaptcha':'field', 'codecapt':cvl}
         $.post(base_urlroot+'com/validateform.php',captdata,function(res){
         res = jQuery.parseJSON(res);
         if(res.errorcode)
         {
         $("#er_code").css('display','block');
         $("#er_code").addClass("false");
         $("#er_code").text(res.errorcode);
         $(".txtcapt").addClass("error");
         return false;
         }
         else if(res.cuccesscode)
         {
         $("#er_code").css('display','block');
         $("#er_code").addClass("true");
         $("#er_code").text(res.cuccesscode);
         return true;
         }
         return false;
         }).fail(function(){ alert('Loader Fail!');});
         }
         */
    });
    $('.txtcapt').focus(function () {
        $('.txtcapt').removeClass('error');
        $("#er_code").removeClass("false");
        $('#er_code').hide();
    });

// script for form register ----------------------------------------------------
    $('.reg-mem-info input[name="username"]').focus(function () {
        //etc
        $('.reg-mem-info input[name="username"]').removeClass('false');
        $('.reg-mem-info .error-username').text('');
    });
    $('.reg-mem-info input[name="username"]').blur(function () {
        var elm = $('.reg-mem-info input[name="username"]');
        var usnval = elm.val();
        if (usnval == '' || usnval.length < 6 || usnval.length > 16) {
            elm.addClass('false');
            $('.reg-mem-info .error-username').text('Tên đăng nhập không hợp lệ!').css('color', '#ed1c24');
        } else {
            $.post(base_urlroot + 'dang-ky/checkuser', {usn: usnval}, function (data) {
                if (IsJsonString(data)) {
                    data = jQuery.parseJSON(data);
                    if (data.stt == 'true') {
                        $('.reg-mem-info .error-username').text(data.mess).css('color', '#83C978');
                        elm.removeClass('false');
                    } else {
                        $('.reg-mem-info .error-username').text(data.mess).css('color', '#ed1c24');
                        elm.addClass('false');
                    }
                } else {
                    alert('Lỗi hệ thống!');
                    location.reload();
                }
            });
            $('.reg-mem-info .error-username').text('');
            elm.removeClass('false');
        }
    });
    $('.reg-mem-info input[name="password"]').blur(function () {
        //var ck_pass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/;
        var elm = $('.reg-mem-info input[name="password"]');
        var elm_username = $('.reg-mem-info input[name="username"]').val();
        var passval = elm.val();
        if (passval == '' || passval.length < 6) {
            elm.addClass('false');
            $('.reg-mem-info .error-pass').text('Mật khẩu của bạn chưa đúng định dạng.').css('color', '#ed1c24');
        }

        if (passval == '123456' || passval == '1234567' || passval == '12345678' || passval == '123456789' || passval == elm_username) {
            elm.addClass('false');
            $('.reg-mem-info .error-pass').text('Mật khẩu của bạn quá đơn giản. Bạn nên đổi mật khẩu khác để bảo mật hơn!');
        }
    });

    $('.reg-mem-info input[name="email"]').blur(function () {
        var elm = $('.reg-mem-info input[name="email"]');
        var emailval = elm.val();
        if (!validateEmail(emailval)) {
            elm.addClass('false');
            $('.reg-mem-info .error-email').text('Địa chỉ email không hợp lệ!').css('color', '#ed1c24');
        } else {
            $.post(base_urlroot + 'dang-ky/checkemail', {email: emailval}, function (data) {
                if (IsJsonString(data)) {
                    data = jQuery.parseJSON(data);
                    if (data.stt == 'true') {
                        $('.reg-mem-info .error-email').text(data.mess).css('color', '#83C978');
                        elm.removeClass('false');
                    } else {
                        $('.reg-mem-info .error-email').text(data.mess).css('color', '#ed1c24');
                        elm.addClass('false');
                    }
                } else {
                    alert('Lỗi hệ thống!');
                    location.reload();
                }
            });
            //$('.reg-mem-info .error-username').text('');
            elm.removeClass('false');
        }
    });

    $('.reg-mem-info input[name="password"]').focus(function () {
        $('.reg-mem-info input[name="password"]').removeClass('false');
        $('.reg-mem-info .error-pass').text('');
    });


    $('.reg-mem-info input[name="re-password"]').blur(function () {
        var elm = $('.reg-mem-info input[name="re-password"]');
        var elmpass = $('.reg-mem-info input[name="password"]');
        var repssval = elm.val();
        var passval = elmpass.val();
        if (repssval == '' || repssval.length < 6 || repssval != passval) {
            elm.addClass('false');
            $('.reg-mem-info .error-repass').text('Bạn nhập lại mật khẩu chưa chính xác!').css('color', '#ed1c24');
        }
    });
    $('.reg-mem-info input[name="re-password"]').focus(function () {
        $('.reg-mem-info input[name="re-password"]').removeClass('false');
        $('.reg-mem-info .error-repass').text('');
    });

    $('.reg-mem-info input[name="full-name"]').blur(function () {
        var elm = $('.reg-mem-info input[name="full-name"]');
        var fnameval = elm.val();
        if (fnameval == '' || fnameval.length < 3) {
            elm.addClass('false');
            $('.reg-mem-info .error-fullname').text('Họ tên không hợp lệ!').css('color', '#ed1c24');
        }
    });
    $('.reg-mem-info input[name="full-name"]').focus(function () {
        $('.reg-mem-info input[name="full-name"]').removeClass('false');
        $('.reg-mem-info .error-fullname').text('');
    });

    $('.reg-mem-info input[name="phone-num"]').blur(function () {
        var elm = $('.reg-mem-info input[name="phone-num"]');
        var phoneval = elm.val();
        if (!detectPhoneNumber(phoneval)) {
            elm.addClass('false');
            $('.reg-mem-info .error-phone').text('Số điện thoại phụ huynh không hợp lệ!').css('color', '#ed1c24');
        }
    });
    $('.reg-mem-info input[name="phone-num"]').focus(function () {
        $('.reg-mem-info input[name="phone-num"]').removeClass('false');
        $('.reg-mem-info .error-phone').text('');
    });
    // ko bắt buộc nhập địa chỉ
//    $('.reg-mem-info input[name="address"]').blur(function () {
//        var elm = $('.reg-mem-info input[name="address"]');
//        var addressval = elm.val();
//        if (addressval == '' || addressval.length < 3) {
//            elm.addClass('false');
//            $('.reg-mem-info .error-address').text('Địa chỉ không hợp lệ!').css('color', '#ed1c24');
//        }
//    });
//    $('.reg-mem-info input[name="address"]').focus(function () {
//        $('.reg-mem-info input[name="address"]').removeClass('false');
//        $('.reg-mem-info .error-address').text('');
//    });

    $('.reg-mem-info input[name="email"]').focus(function () {
        $('.reg-mem-info input[name="email"]').removeClass('false');
        $('.reg-mem-info .error-email').text('');
    });

//    $('.reg-mem-info input[name="answer-sec"]').blur(function () {
//        var elm = $('.reg-mem-info input[name="answer-sec"]');
//        var anssval = elm.val();
//        if (anssval == '' || anssval.length < 3) {
//            elm.addClass('false');
//            $('.reg-mem-info .error-answerse').text('Câu trả lời quá ngắn!').css('color', '#ed1c24');
//        }
//    });

//    $('.reg-mem-info input[name="answer-sec"]').focus(function () {
//        $('.reg-mem-info input[name="answer-sec"]').removeClass('false');
//        $('.reg-mem-info .error-answerse').text('');
//    });

    $('.reg-mem-info input[name="code-capt"]').blur(function () {
        var elm = $('.reg-mem-info input[name="code-capt"]');
        var captval = elm.val();
        if (captval == '' || captval.length < 6 || captval.length > 6) {
            elm.addClass('false');
            $('.reg-mem-info .error-codecapt').text('Mã không hợp lệ!').css('color', '#ed1c24');
        }
    });
    $('.reg-mem-info input[name="code-capt"]').focus(function () {
        $('.reg-mem-info input[name="code-capt"]').removeClass('false');
        $('.reg-mem-info .error-codecapt').text('');
    });

    $('.reg-mem-info select[name="tinh-tp"]').focus(function () {
        //etc
        $('.reg-mem-info select[name="tinh-tp"]').removeClass('false');
        $('.reg-mem-info .error-city').text('');
    });

    $('.reg-mem-info select[name="tinh-tp"]').blur(function () {
        var elm = $('.reg-mem-info select[name="tinh-tp"]');
        var cityVal = elm.val();
        if (cityVal == 0) {
            elm.addClass('false');
            $('.reg-mem-info .error-city').text('Bạn chưa chọn Tỉnh/Thành phố!').css('color', '#ed1c24');
        }
    });

    $('.reg-mem-info select[name="tinh-tp"]').change(function () {
        var elm = $('.reg-mem-info select[name="tinh-tp"]');
        var cityVal = elm.val();
        $.post(base_urlroot + 'act/school/loadDistrict', {city: cityVal}, function (data) {
            if (IsJsonString(data)) {
                data = jQuery.parseJSON(data);
                if (data.stt == 'false') {
                    $('.reg-mem-info select[name="quan-huyen"]').html('<option value="0">Chưa có dữ liệu</option>');
                    $('.reg-mem-info select[name="school"]').html('<option value="0">Chưa có dữ liệu</option>');
                } else {
                    var str = "";
                    for (i = 0; i < data.length; i++) {
                        str += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                    }

                    $('.reg-mem-info select[name="quan-huyen"]').html(str);
                    elm.removeClass('false');

                    var valQ = $('.reg-mem-info select[name="quan-huyen"]').val();

                    $.post(base_urlroot + 'act/school/loadSchool', {dis: valQ}, function (data) {
                        if (IsJsonString(data)) {
                            data = jQuery.parseJSON(data);
                            if (data.stt == 'false') {
                                $('.reg-mem-info select[name="school"]').html('<option value="0">Chưa có dữ liệu</option>');
                            } else {
                                var str = "";
                                for (i = 0; i < data.length; i++) {
                                    str += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                                }
                                $('.reg-mem-info select[name="school"]').html(str);
                            }
                        } else {
                            alert('Lỗi hệ thống!');
                            location.reload();
                        }
                    });
                }
            } else {
                alert('Lỗi hệ thống!');
                location.reload();
            }
        });
    });

    $('.reg-mem-info select[name="quan-huyen"]').change(function () {
        var elm = $('.reg-mem-info select[name="quan-huyen"]');
        var districtVal = elm.val();
        $.post(base_urlroot + 'act/school/loadSchool', {dis: districtVal}, function (data) {
            if (IsJsonString(data)) {
                data = jQuery.parseJSON(data);
                if (data.stt == 'false') {
                    $('.reg-mem-info select[name="school"]').html('<option value="0">Chưa có dữ liệu</option>');
                } else {
                    var str = "";
                    for (i = 0; i < data.length; i++) {
                        str += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                    }
                    $('.reg-mem-info select[name="school"]').html(str);
                    elm.removeClass('false');
                }
            } else {
                alert('Lỗi hệ thống!');
                //location.reload();
            }
        });
    });

//    $('.reg-mem-info select[name="quan-huyen"]').focus(function(){
//        //etc
//        $('.reg-mem-info select[name="quan-huyen"]').removeClass('false');
//        $('.reg-mem-info .error-district').text('');
//    });
//    
//    $('.reg-mem-info select[name="quan-huyen"]').blur(function(){
//        var elm = $('.reg-mem-info select[name="quan-huyen"]');
//        var districtVal = elm.val();
//        if(districtVal == 0){
//            elm.addClass('false');
//            $('.reg-mem-info .error-district').text('Bạn chưa chọn Quận/Huyện!').css('color','#ed1c24');
//        }
//    });

//    $('.reg-mem-info select[name="school"]').focus(function () {
//        //etc
//        $('.reg-mem-info select[name="school"]').removeClass('false');
//        $('.reg-mem-info .error-school').text('');
//    });
//
//    $('.reg-mem-info select[name="school"]').blur(function () {
//        var elm = $('.reg-mem-info select[name="school"]');
//        var schoolVal = elm.val();
//        if (schoolVal == 0) {
//            elm.addClass('false');
//            $('.reg-mem-info .error-school').text('Bạn chưa chọn Trường!').css('color', '#ed1c24');
//        }
//    });

    $('.reg-mem-info select[name="class"]').focus(function () {
        //etc
        $('.reg-mem-info select[name="class"]').removeClass('false');
        $('.reg-mem-info .error-class').text('');
    });

    $('.reg-mem-info select[name="class"]').blur(function () {
        var elm = $('.reg-mem-info select[name="class"]');
        var classVal = elm.val();
        if (classVal == 0) {
            elm.addClass('false');
            $('.reg-mem-info .error-class').text('Bạn chưa chọn Khối lớp!').css('color', '#ed1c24');
        }
    });
});
// action register
//act continue - check 1
$('.act-continue').on('click', function (e) {
    var ne = 0;
    $('.error-cbx-reg').fadeOut(200);
    $('#register-page-1 input').each(function () {
        if ($(this).val() == '') {
            if ($(this).attr('vd') != '0') {
                $(this).addClass('false');
                ne++;
            }
        }
    });

    $('#register-page-1 select.slc').each(function () {
        if ($(this).val() == 0) {
            $(this).addClass('false');
            ne++;
        }
    });

    if (ne == 0) {
        if ($('#register-page-1 input.false').length != 0) {
            alert('Thông tin chưa hợp lệ! Vui lòng kiểm tra lại.');
            return false;
        } else {
            $('.show').removeClass('show');
            var b1_usn = $('.reg-mem-info input[name="username"]').val();
            var b1_pass = $('.reg-mem-info input[name="password"]').val();
            var b1_email = $('.reg-mem-info input[name="email"]').val();
            
            $('.reg-mem-info .b1_username').html(b1_usn);
            $('.reg-mem-info .b1_email').html(b1_email);
            $('.reg-mem-info .b1_pass').html(b1_pass);
            $(this).parents('#register-page-1').next().addClass('show');
            return false;
        }
    } else {
        return false;
    }
});

//dong thong bao ghi mat khau
function close_thongbao() {
    $('.box_popup_hint').hide();
    $(".reg_opactity").hide();
    $("#header").css({"opacity": "1"});
    $("#main-menu").css({"opacity": "1"});
    $("#footer").css({"opacity": "1"});
    $(".hoidapnhanh").css({"opacity": "1"});
    
    var time = 5;
    setInterval(function () {
        time = time - 1;
        $('#timer').text(time + 's');
    }, 1000);
    setTimeout(function () {
        var c_url = $('input#c_url').val();
        var str_chk = c_url.split('/');
        if (str_chk[str_chk.length - 1] == 'dang-ky-mua-the.html' || str_chk[str_chk.length - 1] == 'dang-ky-mua-the2.html' || str_chk[str_chk.length - 1] == 'gioi-thieu.html') {
            window.location.assign(base_urlroot + 'nap-the2.html');
        } else {
            window.location.assign(c_url);
        }

    }, 5000);
}
//function act_register(e){
$('.act-register').on('click', function () {
    if ($('.cbx-reg-note').attr('tck') == 'true') {
        var ne = 0;
        $('.error-cbx-reg').fadeOut(200);
        $('.reg-mem-info input').each(function () {
            if ($(this).val() == '') {
                if ($(this).attr('vd') != '0') {
                    $(this).addClass('false');
                    ne++;
                }
            }
        });

        $('.reg-mem-info select.slc').each(function () {
            if ($(this).val() == 0) {
                $(this).addClass('false');
                ne++;
            }
        });

        if (ne == 0) {
            if ($('.reg-mem-info input[class="false"]').length != 0)
                alert('Thông tin chưa hợp lệ! Vui lòng kiểm tra lại.');
            else {
                var usn = $('.reg-mem-info input[name="username"]').val();
                var pass = $('.reg-mem-info input[name="password"]').val();
                var repass = $('.reg-mem-info input[name="re-password"]').val();
                var fname = $('.reg-mem-info input[name="full-name"]').val();
//                var answ = $('.reg-mem-info input[name="answer-sec"]').val();
                var capt = $('.reg-mem-info input[name="code-capt"]').val();
                var phone = $('.reg-mem-info input[name="phone-num"]').val();
                var email = $('.reg-mem-info input[name="email"]').val();
                //var email = '';
//                var chbm = $('.reg-mem-info select[name="cauhoi-bm"]').val();
                var address = $('.reg-mem-info input[name="address"]').val();
                var tinhtp = $('.reg-mem-info select[name="tinh-tp"]').val();
                var quanhuyen = $('.reg-mem-info select[name="quan-huyen"]').val();
                var school = $('.reg-mem-info select[name="school"]').val();
                var aclass = $('.reg-mem-info select[name="class"]').val();
                var gioitinh = $('.reg-mem-info select[name="gioitinh"]').val();
                var dieukhoan = $('.cbx-reg-note').attr('tck');

                $.post(base_urlroot + 'dang-ky/reg', JSON.stringify( {c_url: $('input#c_url').val(), gioitinh: gioitinh, address: address, quanhuyen: quanhuyen, school: school, dieukhoan: dieukhoan, username: usn, password: pass, repass: repass, fname: fname, capt: capt, aclass: aclass, tinhtp: tinhtp, phone: phone, email: email, inf: get_info_browser2()}), function (data) {
                    if (IsJsonString(data)) {
                        console.log(data)
                        data = jQuery.parseJSON(data);
                        if (data.stt == 'true') {
                            $('.box-reg').html(data.mess);
                            $("html, body").animate({scrollTop: $(".box-reg").offset().top - 200}, 500);

                            $(".reg_opactity").show().css({"opacity": "0.5"});
                            $("#header").css({"opacity": "0.5"});
                            $("#main-menu").css({"opacity": "0.5"});
                            $("#footer").css({"opacity": "0.5"});
                            $(".hoidapnhanh").css({"opacity": "0.5"});

//                            var time = 5;
//                            setInterval(function () {
//                                time = time - 1;
//                                $('#timer').text(time + 's');
//                            }, 1000);
//                            setTimeout(function () {
//                                var c_url = $('input#c_url').val();
//                                var str_chk = c_url.split('/');
//                                if (str_chk[str_chk.length - 1] == 'dang-ky-mua-the.html' || str_chk[str_chk.length - 1] == 'dang-ky-mua-the2.html' || str_chk[str_chk.length - 1] == 'gioi-thieu.html') {
//                                    window.location.assign(base_urlroot + 'nap-the2.html');
//                                } else {
//                                    window.location.assign(c_url);
//                                }
//
//                            }, 5000);
                        } else {
                            $('.error-cbx-reg[rel="act"]').text(data.mess).fadeIn(200);
                            reloadCapcha("#reloadCapcha");
                            $('.reg-mem-info input[name="code-capt"]').val('');
                            return false;
                        }
                    } else {
                        alert('Lỗi hệ thống!');
                        location.reload();
                    }
                });

                return false;
            }
        }
    } else {
        $('.error-cbx-reg').fadeIn(200);
        return false;
    }
});
function clogincapt() {
    $(this).blur();
    var ck_user = /^[A-Za-z0-9_\.]{3,20}$/;
    var ck_pass = /(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9])^\S+$/;
    var uvl = $('.us-capt').val();
    var pvl = $('.pas-capt').val();
    var cvl = $('.txtcapt').val();
    cvl = '123456';
    if ((uvl == '') || (uvl.length < 3) || (pvl == '') || (pvl.length <= 4) || (cvl == '') || (cvl.length < 6) || (cvl.length > 6)) {
        return false;
    } else if (!ck_user.test(uvl)) {
        $('.us-error').css('display', 'block');
        $('.us-capt').addClass('error');
        console.log('error user js');
    }
    else {
        var rem_ = '';
        if ($('.cbx-remember').attr('rmb') == 'true')
            rem_ = 1;
        else
            rem_ = 0;

        // info user 

        var logincapt = {'fieldlogin': 'captlogin', 'username': uvl, 'password': pvl, 'captcode': cvl, 'remem': rem_, 'c_url': $('input#c_url').val(), 'inf': get_info_browser2()}
        $.post(base_urlroot + 'login/captcha', logincapt, function (result) {
            console.log(result);
            if (result == 1) {
                window.location.assign($('input#c_url').val());
            } else if (result == 99) {
                $("#er_code").css('display', 'block');
                $("#er_code").addClass("false");
                $("#er_code").text('Mã bảo vệ không hợp lệ!');
                $(".txtcapt").addClass("error");
                reloadCapcha("#reloadCapcha");
                $('.txtcapt').val('');
            } else if (result == 98) {
                $('.pas-error').text('Tên đăng nhập này đang được sử dụng hoặc chưa thoát. Bạn hãy thử lại sau 30 phút nữa hoặc gọi số 02436.628.077 / 02473.080.123 để được trợ giúp ngay!');
                $('.pas-error').css('display', 'block');
                $('.pas-capt').addClass('error');
                $('.us-capt').addClass('error');
                reloadCapcha("#reloadCapcha");
                $('.txtcapt').val('');
            } else {
                $('.pas-error').text('Tên đăng nhập hoặc mật khẩu không hợp lệ!')
                if ($('.div_link_hint').length == 0) {
                    $('.pas-error').after('<div class="div_link_hint" onclick="toggle_hint(this)">Tôi đã nhập đúng mật khẩu tại sao không được?</div>\n\
                                           <a href="'+base_urlroot+'quen-mat-khau"><div class="div_link_hint_item">Nếu bạn quên mật khẩu, click vào đây</div></a>\n\ \n\
                                           <a href="'+base_urlroot+'quen-tai-khoan"><div class="div_link_hint_item">Nếu bạn quên tên đăng nhập, click vào đây</div></a>');
                    $('.form-content-login').css('height','500px');
                }
                $('.pas-error').css('display', 'block');
                $('.pas-capt').addClass('error');
                $('.us-capt').addClass('error');
                reloadCapcha("#reloadCapcha");
                $('.txtcapt').val('');
            }
        })
        return false;
    }
}

function toggle_hint(e) {
    $('.box_hint_login').toggle();
    if ($('.box_hint_login').is(':visible')) {
        $('.login_opactity').show();
        $("#header").css({"opacity": "0.5"});
        $("#main-menu").css({"opacity": "0.5"});
        $("#footer").css({"opacity": "0.5"});
        $(".hoidapnhanh").css({"opacity": "0.5"});
        toPos('.box_hint_login');
    }else{
        $('.login_opactity').hide();
        $("#header").css({"opacity": "1"});
        $("#main-menu").css({"opacity": "1"});
        $("#footer").css({"opacity": "1"});
        $(".hoidapnhanh").css({"opacity": "1"});
    }
}

function clogincheck() {
    var ck_user = /^[A-Za-z0-9_\.]{3,20}$/;
    var ck_pass = /(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9])^\S+$/;
    var uclogin = $('#txtUser').val();
    var pclogin = $('#txtPass').val();
    if ((uclogin == '') || (pclogin == '')) {
        if (uclogin == '') {
            $('.input_username').addClass('error');
            $('.alert_error_login').show();
        }
        if (pclogin == '') {
            $('.input_pass').addClass('error');
            $('.alert_error_login').show();
        }
        return false;
    } else if (!ck_user.test(uclogin)) {
        $('.input_username').addClass('error');
        $('.alert_error_login').show();
        console.log('error user js');
    }
//        else if(!ck_pass.test(pclogin) || pclogin.length <6){
//            $('.input_pass').addClass('error');
//                $('.alert_error_login').show();
//                console.log('error pass js');
//        }

    else {
        var rem_ = '';
        if ($('.cbx-remember').attr('rmb') == 'true')
            rem_ = 1;
        else
            rem_ = 0;
        $.post(base_urlroot + 'login/check', {cus: uclogin, cps: pclogin, remem: rem_}, function (respon) {
            console.log(respon);
            if (respon == 1) {
                location.reload();
            } else {
                $('.input_username').addClass('error');
                $('.input_pass').addClass('error');
                $('.alert_error_login').show();
                fail++;
                console.log('fail: ' + fail);
                if (fail >= 5) {
                    window.location = "login";
                }
            }
        }).fail(function () {
            alert('Loader Fail!');
        });
    }
    return false;
}