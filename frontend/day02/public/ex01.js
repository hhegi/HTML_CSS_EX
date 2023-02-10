$.fn.myPlugin = function (data) {
    console.log("Data : " + data);
    $(this).text(data).css({"color":"crimson","background-color":"pink"});
    return this;
};