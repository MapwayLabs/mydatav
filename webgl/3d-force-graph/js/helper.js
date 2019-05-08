// export default Helper;

// 68688
var Helper = {
    ClearTextSelection: function(e) {
        // (e || s.KeyboardState.pressed("ctrl") || s.KeyboardState.pressed("alt")) && (window.getSelection ? window.getSelection().removeAllRanges() : document.selection && document.selection.empty())
    },
	UpdateMoveCursor: function(e, t, n, r, i) {
        // this.ClearTextSelection(),
        // $(document.body).attr("data-old-cursor") || $(document.body).attr("data-old-cursor", $(document.body).css("cursor"));
        // var o = $(document.body).css("cursor");
        // e ? $(document.body).css("cursor", "move") : r || i && "zoom-out" == o ? $(document.body).css("cursor", "zoom-out") : n || i ? $(document.body).css("cursor", "zoom-in") : t ? $(document.body).css("cursor", "url(/static/images/cursors/cursors-rotation.png) , auto") : s.KeyboardState.pressed("shift") ? $(document.body).css("cursor", "url(/static/images/cursors/cursors-add.png) , auto") : s.KeyboardState.pressed("alt") ? $(document.body).css("cursor", "url(/static/images/cursors/cursors-remove.png) , auto") : $(document.body).css("cursor", $(document.body).attr("data-old-cursor"))
    }
}