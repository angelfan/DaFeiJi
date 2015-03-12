options["fnDrawCallback"] = function(){
    try {
        orgFunc();
    }catch(e){
        if($.isFunction(excFunc)){
            excFunc(e,esf_fw.table.exception.fnDrawCallback);
        }
    }
    $(table_id +" tr").removeClass("last");
    $(table_id +" tr:last-child").addClass("last");
    $(table_id +" tr td").removeClass("last");
    $(table_id +" tr td:last-child").addClass("last");
    var $tabs = $(table_id).prev(".esf_tab_container");
    if($tabs.length > 0){
        var tabs_height = $tabs.height() - $tabs.children("ul").height() - 4;
        $(table_id).parents(".esf_tab_container > div").css("height", tabs_height);
    }
    if(!this.parent().hasClass("grid_wrapper")){
        this.wrap("<div class='grid_wrapper'></div>");
    }

    // Restore check status
    var $table = $(table_id);
    var checkGuiIDList = esf_fw.table.get_gui_id_list(input_table_id);
    $table.find("input"+esf_fw.table.get_selector_for_disable_check($table)+"[data-gui-id]")
        .filter(function(index) {
            return $.inArray($(this).attr("data-gui-id"), checkGuiIDList) >= 0
        }).attr("checked", "checked");

    if (!options["auto_publish"]) {
        if (esf_fw.table.count_check($table.attr("id")) > 0 ||
            ( $table.data("preCheckNum") > 0 &&
            $table.find("thead span.radio_header").length === 0) ) {
            // Trigger dummy check
            esf_fw.table.trigger_dummy_check($(table_id));
        }
    }

    // Set field column number
    esf_fw.table.set_field_column_numbers($table);

    // Removing temporary checked record id data.
    esf_fw.table.set_temp_check_gui_id_list($table, null);

    // update number of checked record
    esf_fw.table.update_checked_record_number(input_table_id);

    // restore "all_checkbox".
    // uncheck if all (normal) checkbox are not checked.
    $(table_id + '_wrapper .all_checkbox').each(function() {
        /* index method counts from 0,
         on the other hand, :nth-child counts from 1 */
        var nth = $(this).parents('th').index() + 1;
        var selector = " tr td:nth-child("  + nth + ") :checkbox:enabled";
        var $chkbox_enabled = $(table_id + "_wrapper" + selector ) ;

        var enabled_cnt = $chkbox_enabled.length;
        var checked_cnt = $chkbox_enabled.filter(':checked').length;

        if ((enabled_cnt == 0 )|| (enabled_cnt != checked_cnt) ){
            $(this).removeAttr('checked');
        } else {
            $(this).attr('checked', 'checked');
        }
    });

    if (options["action_update"]){
        // update action pane when table draw complete.
        esf_fw.action.update_actions_for_new_gui_grid(
            esf_fw.table.count_check(input_table_id));
    }

    if (options["auto_publish"]){
        // public topic when table draw complete.
        $(table_id).fjPublish( topic, [{ is_refreshed: true }]);
    }
};