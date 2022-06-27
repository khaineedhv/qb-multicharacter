var selectedChar = null;
var WelcomePercentage = "30vh"
qbMultiCharacters = {}
var Loaded = false;
$(document).ready(function () {
    window.addEventListener('message', function (event) {
        var data = event.data;

        if (data.action == "ui") {
            if (data.toggle) {
                $('.container').show();
                $(".welcomescreen").fadeIn(150);
                qbMultiCharacters.resetAll();

                var originalText = "Truy xuất dữ liệu người chơi";
                var loadingProgress = 0;
                var loadingDots = 0;
                $("#loading-text").html(originalText);
                var DotsInterval = setInterval(function () {
                    $("#loading-text").append(".");
                    loadingDots++;
                    loadingProgress++;
                    if (loadingProgress == 3) {
                        originalText = "Xác thực dữ liệu người chơi"
                        $("#loading-text").html(originalText);
                    }
                    if (loadingProgress == 4) {
                        originalText = "Lấy các ký tự"
                        $("#loading-text").html(originalText);
                    }
                    if (loadingProgress == 6) {
                        originalText = "Xác thực nhân vật"
                        $("#loading-text").html(originalText);
                    }
                    if (loadingDots == 4) {
                        $("#loading-text").html(originalText);
                        loadingDots = 0;
                    }
                }, 500);

                setTimeout(function () {
                    $.post('https://qb-multicharacter/setupCharacters');
                    setTimeout(function () {
                        clearInterval(DotsInterval);
                        loadingProgress = 0;
                        originalText = "Retrieving data";
                        $(".welcomescreen").fadeOut(150);
                        qbMultiCharacters.fadeInDown('.character-info', '20%', 400);
                        qbMultiCharacters.fadeInDown('.characters-list', '20%', 400);
                        $.post('https://qb-multicharacter/removeBlur');
                    }, 2000);
                }, 2000);
            } else {
                $('.container').fadeOut(250);
                qbMultiCharacters.resetAll();
            }
        }

        if (data.action == "setupCharacters") {
            setupCharacters(event.data.characters)
        }

        if (data.action == "setupCharInfo") {
            setupCharInfo(event.data.chardata)
        }
    });

    $('.datepicker').datepicker();
});

$('.continue-btn').click(function (e) {
    e.preventDefault();
});

$('.disconnect-btn').click(function (e) {
    e.preventDefault();

    $.post('https://qb-multicharacter/closeUI');
    $.post('https://qb-multicharacter/disconnectButton');
});

function setupCharacters(characters) {
    $.each(characters, function (index, char) {
        $('#char-' + char.cid).html("");
        $('#char-' + char.cid).data("citizenid", char.citizenid);
        setTimeout(function () {
            $('#char-' + char.cid).html('<span id="slot-name">' + char.charinfo.lastname + '</span>');
            $('#char-' + char.cid).data('cData', char)
            $('#char-' + char.cid).css({ "text-align": "left" })
            $('#char-' + char.cid).data('cid', char.cid)
        }, 100)
    })
}

$(document).on('click', '#close-log', function (e) {
    e.preventDefault();
    selectedLog = null;
    $('.welcomescreen').css("filter", "none");
    $('.server-log').css("filter", "none");
    $('.server-log-info').fadeOut(250);
    logOpen = false;
});

$(document).on('click', '.character', function (e) {
    var cDataPed = $(this).data('cData');
    e.preventDefault();
    if (selectedChar === null) {
        selectedChar = $(this);
        if ((selectedChar).data('cid') == "") {
            $(selectedChar).addClass("char-selected");
            setupCharInfo('empty')
            $("#play-text").html("Tạo");
            $("#play").css({ "display": "block" });
            $("#list-info").addClass("character-info-valid");
            $("#list-info").css({"display":"none"});
            // $("#delete").css({"display":"none"});
            $.post('https://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
        } else {
            $(selectedChar).addClass("char-selected");
            setupCharInfo($(this).data('cData'))
            $("#play-text").html("XÁC NHẬN");
            $("#delete-text").html("Xóa");
            $("#play").css({ "display": "block" });
            $("#list-info").addClass("character-info-valid");
            // $("#delete").css({"display":"block"});
            $.post('https://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
            function myFunction(x, y) {
                var id = null;
                var elem = document.getElementById("list-info");
                var pos = -100;
                clearInterval(id);
                id = setInterval(frame, 2);
                if (y.matches) {
                    function frame() {
                        if (pos == -20) {
                            pos == -20;
                            clearInterval(id);
                        } else {
                            ppos();
                        }

                    }
                } else if (x.matches) {
                    function frame() {
                        if (pos == -80) {
                            pos == -80;
                            clearInterval(id);
                        } else {
                            ppos();
                        }

                    }
                } else {
                    function frame() {
                        if (pos == 0) {
                            pos == 0;
                            clearInterval(id);
                        } else {
                            ppos();
                        }

                    }
                }
                function ppos() {
                    pos++;
                    elem.style.top = pos + 'px';
                }
            }
            var x = window.matchMedia("(max-width: 800px)")
            var y = window.matchMedia("(max-width: 1024px)")
            myFunction(x, y)
            x.addListener(myFunction)
            y.addListener(myFunction)
        }
    } else if ($(selectedChar).attr('id') !== $(this).attr('id')) {
        $(selectedChar).removeClass("char-selected");
        selectedChar = $(this);
        if ((selectedChar).data('cid') == "") {
            $(selectedChar).addClass("char-selected");
            setupCharInfo('empty')
            $("#play-text").html("Tạo");
            $("#play").css({ "display": "block" });
            $("#list-info").addClass("character-info-valid");
            // $("#delete").css({"display":"none"});
            $.post('https://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
        } else {
            $(selectedChar).addClass("char-selected");
            setupCharInfo($(this).data('cData'))
            $("#play-text").html("XÁC NHẬN");
            $("#delete-text").html("Xóa");
            $("#play").css({ "display": "block" });
            $("#list-info").addClass("character-info-valid");
            // $("#delete").css({"display":"block"});
            $.post('https://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
            function myFunction(x, y) {
                var id = null;
                var elem = document.getElementById("list-info");
                var pos = -100;
                clearInterval(id);
                id = setInterval(frame, 2);
                if (y.matches) {
                    function frame() {
                        if (pos == -20) {
                            pos == -20;
                            clearInterval(id);
                        } else {
                            ppos();
                        }

                    }
                } else if (x.matches) {
                    function frame() {
                        if (pos == -80) {
                            pos == -80;
                            clearInterval(id);
                        } else {
                            ppos();
                        }

                    }
                } else {
                    function frame() {
                        if (pos == 0) {
                            pos == 0;
                            clearInterval(id);
                        } else {
                            ppos();
                        }

                    }
                }
                function ppos() {
                    pos++;
                    elem.style.top = pos + 'px';
                }
            }
            var x = window.matchMedia("(max-width: 800px)")
            var y = window.matchMedia("(max-width: 1024px)")
            myFunction(x, y)
            x.addListener(myFunction)
            y.addListener(myFunction)
        }
    }
});
function setupCharInfo(cData) {
    if (cData == 'empty') {
        $('#list-info').html('<span id="no-char">Nhân vật chưa được tạo.<br><br>Hãy tạo và tham gia nào!</span>');
    } else {
        var gender = "Nam"
        if (cData.charinfo.gender == 1) { gender = "Nữ" }
        $('#list-info').html(
            '<div class="character-info-box mgr"><span id="info-label">Tên: </span><span class="char-info-js">' + cData.charinfo.lastname + '</span></div>' +
            '<div class="character-info-box"><span id="info-label">Ngày sinh: </span><span class="char-info-js">' + cData.charinfo.birthdate + '</span></div>' +
            '<div class="character-info-box"><span id="info-label">Giới tính: </span><span class="char-info-js">' + gender + '</span></div>' +
            '<div class="character-info-box"><span id="info-label">Quốc tịch: </span><span class="char-info-js">' + cData.charinfo.nationality + '</span></div>' +
            '<div class="character-info-box"><span id="info-label">Nghề: </span><span class="char-info-js">' + cData.job.label + '</span></div>' +
            '<div class="character-info-box"><span id="info-label">Tiền mặt: </span><span class="char-info-js">&#36; ' + cData.money.cash + '</span></div>' +
            '<div class="character-info-box"><span id="info-label">Ngân hàng: </span><span class="char-info-js">&#36; ' + cData.money.bank + '</span></div>');
    }
}
var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '': '&#x60;',
    '=': '&#x3D;'
};
function escapeHtml(string) {
    return String(string).replace(/[&<>"'=/]/g, function (s) {
        return entityMap[s];
    });
}
function hasWhiteSpace(s) {
    return /\s/g.test(s);
}
$(document).on('click', '#create', function (e) {
    e.preventDefault();
    let firstname = escapeHtml($('#first_name').val())
    let lastname = escapeHtml($('#last_name').val())
    let nationality = escapeHtml($('#nationality').val())
    let birthdate = escapeHtml($('#birthdate').val())
    let gender = escapeHtml($('select[name=gender]').val())
    let cid = escapeHtml($(selectedChar).attr('id').replace('char-', ''))
    const regTest = new RegExp(profList.join('|'), 'i');
    //An Ugly check of null objects

    if (!firstname || !lastname || !nationality || !birthdate || hasWhiteSpace(firstname) || hasWhiteSpace(lastname) || hasWhiteSpace(nationality)) {
        console.log("FIELDS REQUIRED")
        return false;
    }

    if (regTest.test(firstname) || regTest.test(lastname)) {
        console.log("ERROR: You used a derogatory/vulgar term. Please try again!")
        return false;
    }

    $.post('https://qb-multicharacter/createNewCharacter', JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        nationality: nationality,
        birthdate: birthdate,
        gender: gender,
        cid: cid,
    }));
    $(".container").fadeOut(150);
    $('.characters-list').css("filter", "none");
    $('.character-info').css("filter", "none");
    qbMultiCharacters.fadeOutDown('.character-register', '130%', 400);
    refreshCharacters()

});

$(document).on('click', '#accept-delete', function (e) {
    $.post('https://qb-multicharacter/removeCharacter', JSON.stringify({
        citizenid: $(selectedChar).data("citizenid"),
    }));
    $('.character-delete').fadeOut(150);
    $('.characters-block').css("filter", "none");
    refreshCharacters();
});

$(document).on('click', '#cancel-delete', function (e) {
    e.preventDefault();
    $('.characters-block').css("filter", "none");
    $('.character-delete').fadeOut(150);
});

function refreshCharacters() {
    // $('.characters-list').html('<div class="character" id="char-1" data-cid=""><span id="slot-name">Trống<span id="cid"></span></span></div><div class="character" id="char-2" data-cid=""><span id="slot-name">Trống<span id="cid"></span></span></div><div class="character" id="char-3" data-cid=""><span id="slot-name">Trống<span id="cid"></span></span></div><div class="character" id="char-4" data-cid=""><span id="slot-name">Trống<span id="cid"></span></span></div><div class="character" id="char-5" data-cid=""><span id="slot-name">Trống<span id="cid"></span></span></div><div class="character-btn" id="play"><p id="play-text">Select a character</p></div><div class="character-btn" id="delete"><p id="delete-text">Select a character</p></div>')
    setTimeout(function () {
        $(selectedChar).removeClass("char-selected");
        selectedChar = null;
        $.post('https://qb-multicharacter/setupCharacters');
        $("#delete").css({ "display": "none" });
        $("#play").css({ "display": "none" });
        qbMultiCharacters.resetAll();
    }, 100)
}

$("#close-reg").click(function (e) {
    e.preventDefault();
    $('.characters-list').css("filter", "none")
    $('.character-info').css("filter", "none")
    qbMultiCharacters.fadeOutDown('.character-register', '130%', 400);
})

$("#close-del").click(function (e) {
    e.preventDefault();
    $('.characters-block').css("filter", "none");
    $('.character-delete').fadeOut(150);
})

$(document).on('click', '#play', function (e) {
    e.preventDefault();
    var charData = $(selectedChar).data('cid');

    if (selectedChar !== null) {
        if (charData !== "") {
            $.post('https://qb-multicharacter/selectCharacter', JSON.stringify({
                cData: $(selectedChar).data('cData')
            }));
            setTimeout(function () {
                qbMultiCharacters.fadeOutDown('.characters-list', "-40%", 400);
                qbMultiCharacters.fadeOutDown('.character-info', "-40%", 400);
                qbMultiCharacters.resetAll();
            }, 1500);
        } else {
            $("#play").css({ "display": "none" });
            qbMultiCharacters.fadeInDown('.character-register', '35%', 400);
        }
    }
});

$(document).on('click', '#delete', function (e) {
    e.preventDefault();
    var charData = $(selectedChar).data('cid');

    if (selectedChar !== null) {
        if (charData !== "") {
            $('.characters-block').css("filter", "blur(2px)")
            $('.character-delete').fadeIn(250);
        }
    }
});

qbMultiCharacters.fadeOutUp = function (element, time) {
    $(element).css({ "display": "block" }).animate({ top: "-80.5%", }, time, function () {
        $(element).css({ "display": "none" });
    });
}

qbMultiCharacters.fadeOutDown = function (element, percent, time) {
    if (percent !== undefined) {
        $(element).css({ "display": "block" }).animate({ top: percent, }, time, function () {
            $(element).css({ "display": "none" });
        });
    } else {
        $(element).css({ "display": "block" }).animate({ top: "103.5%", }, time, function () {
            $(element).css({ "display": "none" });
        });
    }
}

qbMultiCharacters.fadeInDown = function (element, percent, time) {
    $(element).css({ "display": "block" }).animate({ top: percent, }, time);
}

qbMultiCharacters.resetAll = function () {
    $('.characters-list').hide();
    $('.characters-list').css("top", "-40");
    $('.character-info').hide();
    $('.character-info').css("top", "-40");
    $('.welcomescreen').css("top", WelcomePercentage);
    $('.server-log').show();
    $('.server-log').css("top", "25%");
}