/*
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree and available online at
 *
 * http://www.dspace.org/license/
 */
(function($) {
    var records_template = DSpace.getTemplate('records');

    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    var callLookupFunction = function () {
        wait($(this));
        var searchInput = "";

        $("input[id^='aspect_submission_StepTransformer_field_'][type='text'], input[id^='aspect_submission_StepTransformer_field_'][type='hidden']").each(function () {
            if ($(this).val()) {

                if (searchInput != "") {
                    searchInput += "&";
                }
                var n = $(this).attr('id').lastIndexOf('_');
                searchInput += $(this).attr('id').substring(n + 1) + "=" + $(this).val();
            }
        });

        startLookup(searchInput, 0)
    };

    if($('[name="prefilledValue"]').length>0 && $('[name="preImportedValues"]').length==0){
        callLookupFunction.call(this);
    }
    $('#aspect_submission_StepTransformer_field_submit_lookup').click(function(event){
        event.preventDefault();
        callLookupFunction.call(this);
    });

    function startLookup(searchInput, start) {
        $.ajax({url: window.import.contextPath+"/json/submissionLookup?" + searchInput +"&start="+start,
            type: "POST",
            dataType: "json",
            async: true,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            error: function(xhr, status, error){
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                stopWait();
            },
            success: function(info) {
                info.shownStart = start + 1;
                info.shownCount = start + info.records.length;

                fillModal(info);
                setPagination(start,info,searchInput);
                stopWait();
                $(".records-import-btn").click(function(event) {
                    event.preventDefault();
                    var eid = $(this).attr("id").substring('records-import-'.length);
                    $("#aspect_submission_StepTransformer_field_import_id").val(eid);
                    $("#aspect_submission_StepTransformer_div_submit-lookup").submit();
                });
            }
        });
    }

    function fillModal(info){
        var lookupModal = $('#lookup-search-results');
        var htmlData;
        if(info.records.length>0) {
            htmlData = html = records_template(info);
        }
        else {
            htmlData = html = "<p>No records found</p>";
        }
        lookupModal.find('.modal-body').html(htmlData);
        lookupModal.modal('show');
    }

    function setPagination(start, info, searchInput){
        if(start + info.records.length<info.total){
            $("#publication-pagination-next").attr("disabled", false);
        }
        else {
            $("#publication-pagination-next").attr("disabled", true);
        }

        if(start>0){
            $("#publication-pagination-previous").attr("disabled", false);
        }
        else {
            $("#publication-pagination-previous").attr("disabled", true);
        }

        $("#publication-pagination-previous").unbind("click");
        $("#publication-pagination-previous").click(function(event) {
            wait($(this));
            $( this ).unbind( event );
            event.preventDefault();
            startLookup(searchInput, start - 20);
        });

        $("#publication-pagination-next").unbind("click");
        $("#publication-pagination-next").click(function(event) {
            wait($(this));
            event.preventDefault();
            startLookup(searchInput, start + 20);
        });
    }

    function centerModal() {
        var $dialog  = $(this).find(".modal-dialog");
        var dialogVCenter = $dialog.height() / 2;
        var dialogHCenter = $dialog.width() / 2;
        var windowVCenter = $(window).height() / 2;
        var windowHCenter = $(window).width() / 2;
        $dialog.css("position", "sticky");
        $dialog.css("max-width", $(window).width());
        $dialog.css("top", windowVCenter - dialogVCenter);
        $dialog.css("left", windowHCenter - dialogHCenter);

        $(".modal-body").css("height", "auto");

    }

    $(document).on('shown.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });

    // $('#lookup-search-results').on('hidden', function () {
    //     stopWait();
    // });


    function wait($button) {
        $button.attr("disabled", true);
        $(document.body).css({'cursor' : 'wait'});
    }

    function stopWait() {
        $button = $('#aspect_submission_StepTransformer_field_submit_lookup');
        $(document.body).css({'cursor' : 'default'});
        $button.attr("disabled", false);

    }
})(jQuery);