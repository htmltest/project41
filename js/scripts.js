$(window).resize(function() {

})

$(window).scroll(function() {



})

$(document).ready(function() {

	// Формы

	$("input:text, input:password, textarea").each(function() {
    if ($(this).val()) {
      $(this).prev(".placeholder").hide();
    }
  });

	$("body").on("focus","input, textarea",function() {
		var item = $(this);

		if (item.parent().find(".placeholder").length) {
			var placeholder = item.parent().find(".placeholder");

			if (item.hasClass("phone") || item.hasClass("form-date")) {
				placeholder.hide();
			}

		}

	});

	$("body").on("keydown","input, textarea",function() {
		var item = $(this);

		if (item.parent().find(".placeholder").length) {
			var placeholder = item.parent().find(".placeholder");

			if (!item.hasClass("phone") && !item.hasClass("form-date")) {
				placeholder.hide();
			}

		}

	});

	$("body").on("blur","input, textarea",function() {
		var item = $(this);

		if (item.parent().find(".placeholder").length) {
			var placeholder = item.parent().find(".placeholder");

			if (!item.val() || (item.hasClass("masked") && ! /\d/.test(item.val()))) {
				placeholder.show();
			}

		}

	});

	$("body").on("click",".placeholder",function(e) {
		if ($(this).parent().find("input").length) {
			$(this).parent().find("input").trigger("focus");
		}
		if ($(this).parent().find("textarea").length) {
			$(this).parent().find("textarea").trigger("focus");
		}
	})

	$("input.phone").mask("+7 (999) 999-99-99");

	$("input:checkbox").iCheck();
	$("input:radio").iCheck();
	$("input[type=file]").nicefileinput();

	$("input[type=text],input[type=password],select,textarea").on("blur",function() {
		if ($(this).val() !== "" && !$(this).hasClass("error")) {
			$(this).addClass("valid");
		} else {
			$(this).removeClass("valid");
		}
	})

	validateForms();

});

function validateForms() {

  $("form").each(function() {
    $(this).validate({
      focusInvalid: false,
      sendForm : false,
      errorPlacement: function(error, element) {
				element.removeClass("valid");
        // if (element[0].tagName == "SELECT") {
          // element.parents(".form-item").find(".param-selector").addClass("param-sel-error")
        // }
				if (element.attr("type") == "checkbox") {
          element.parents(".icheckbox").addClass("icheckbox-error")
					element.parents(".form-checkboxes").append(error)
        } else if (element.attr("type") == "radio") {
          element.parents(".iradio").addClass("iradio-error")
					element.parents(".form-radios").append(error)
				} else {
					error.insertAfter(element);
				}

      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass);

        $(element).next(".error").remove();
        // if ($(element)[0].tagName == "SELECT") {
          // $(element).parents(".form-item").find(".param-selector").removeClass("selector-error")
        // }
				if ($(element).attr("type") == "checkbox") {
          $(element).parents(".icheckbox").removeClass("icheckbox-error")
					$(element).parents(".form-checkboxes").find("label.error").remove();
        }

				if ($(element).attr("type") == "radio") {
          $(element).parents(".iradio").removeClass("iradio-error")
					$(element).parents(".form-radios").find("label.error").remove();
        }
      },
      invalidHandler: function(form, validatorcalc) {
				var errors = validatorcalc.numberOfInvalids();
				if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
						validatorcalc.errorList[0].element.focus();
				}
      }
    });

    if ($(this).find(".form-date").length) {
      $(this).find(".form-date").rules('add', {
        messages: {
          required:  "Выберите дату"
        }
      });
    }

		if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
			$(this).find("input.password-repeat").rules('add', {
        equalTo: ".password"
      });
		}

  });

}

jQuery.extend(jQuery.validator.messages, {
    required: "Пожалуйста, заполните это поле!",
    remote: "Please fix this field.",
    email: "Введите правильный e-mail",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});


function getUrlVar(key){
	var result = new RegExp('[\\?&]' + key + "=([^&]*)", "i").exec(window.location.search);
	return result && result[1] || "";
}

$(document).ready(function() {

    $('.ship-tabs a').click(function(e) {
        var curLink = $(this);
        var curLi = curLink.parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.ship-tabs li').index(curLi);
            $('.ship-tabs li.active').removeClass('active');
            curLi.addClass('active');
            $('.ship-item.active').removeClass('active');
            $('.ship-item').eq(curIndex).addClass('active');
        };

        e.preventDefault();
    });

    if ($('.ship-tabs a').length) {
        id = getUrlVar('pid');
        id = id ? id : '';
        if (id) {
            $('.ship-tabs li a[href="#' + id+ '"]').click();
        } else {
        }
    }

    $('.ship-gallery').each(function() {
        var curSlider = $(this);
        curSlider.data('disableAnimation', false);
        curSlider.data('curIndex', 0);
    });

    $('.ship-gallery-preview a').click(function(e) {
        var curSlider = $(this).parents().filter('.ship-gallery');
        if (!curSlider.data('disableAnimation')) {

            var curIndex = curSlider.data('curIndex');
            var newIndex = curSlider.find('.ship-gallery-preview li').index($(this).parent());

            curSlider.find('.ship-gallery-preview li').removeClass('active');
            curSlider.find('.ship-gallery-preview li').eq(newIndex).addClass('active');

            curSlider.data('disableAnimation', true);
            curSlider.find('.ship-gallery-content li').eq(curIndex).css({'z-index': 2});
            curSlider.find('.ship-gallery-content li').eq(newIndex).css({'z-index': 1}).show();
            curSlider.find('.ship-gallery-content li').eq(curIndex).fadeOut(function() {
                curSlider.data('disableAnimation', false);
                curSlider.data('curIndex', newIndex);
            });
        }

        e.preventDefault();
    });
});