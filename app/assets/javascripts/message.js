$(function(){
  function buildHTML(message) {
    console.log(message)
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="main__space__box" data-id="${message.id}">
                  <div class="main__space__thread">
                    <p class="main__space__name">
                      ${message.user_name}
                    </p>
                    <p class="main__space__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="main__space__text">
                    <div>
                    ${content}
                    </div>
                    ${img}
                  </p>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault(this);
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__space').append(html);
      $('.form__submit').click(function(data){
        $('.message_content')[0].reset();
      });
      $(".main__space").scrollTop( $(".main__space")[0].scrollHeight );
    })
    .fail(function(data){
      alert('メッセージ送信に失敗しました。');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })
});
