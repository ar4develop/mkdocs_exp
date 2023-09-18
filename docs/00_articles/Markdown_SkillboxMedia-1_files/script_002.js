$( document ).ready(function() {
    if(window.Section_id)
    {
        (window["rrApiOnReady"] = window["rrApiOnReady"] || []).push(function() {
            try { rrApi.categoryView(window.Section_id); } catch(e) {}
                })
    }
});