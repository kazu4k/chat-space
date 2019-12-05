$(function () {

  function buildHTML(message) {

    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";

      var html = `<div class="main__space__box" data-message-id="${message.id}">
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
                      ${message.content}
                      </div>
                      ${image}
                    </p>
                  </div>`
  return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.main__space').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.main__space').animate({ scrollTop: $('.main__space')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.form__submit').prop('disabled', false);
    })
  })

  $(function() {
    var reloadMessages = function() {
    var href = 'api/messages'
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.main__space__box:last').data("message-id");
        $.ajax({
          url: href,
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML += buildHTML(message);
            $('.main__space').append(insertHTML);
        })
        $('.main__space').animate({scrollTop: $('.main__space')[0].scrollHeight}, 'fast');
      })
        .fail(function() {
          alert('自動更新に失敗しました');
      });
    };
  };
  setInterval(reloadMessages, 7000);
  });
});
