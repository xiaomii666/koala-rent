var tools = {
  /*点击缓冲回到页面顶部
   * @param
   * */
  toTOP:function () {
    $(window).scroll(function() {
        if($(window).scrollTop() >= 100){
            $('.actGotop').css('display', 'inline');
        }else{
            $('.actGotop').css('display', 'none');
        }
    });
    $('.actGotop').click(function(){
        $('html,body').animate({scrollTop: '0px'}, 600);
    });
  },
}