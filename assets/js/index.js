$(document).ready(function () {

  // 외부 HTML 로드 함수
  function loadAll() {
    const promises = [];

    // jQuery load는 Promise 반환 안 하므로, 직접 Deferred 만들어야 함
    promises.push(new Promise(resolve => {
      $("header").load("mpa/header.html", resolve);
    }));
    promises.push(new Promise(resolve => {
      $("#title").load("mpa/title.html", resolve);
    }));
    promises.push(new Promise(resolve => {
      $("#top5").load("mpa/top5.html", resolve);
    }));
    promises.push(new Promise(resolve => {
      $("#event").load("mpa/event.html", resolve);
    }));
    promises.push(new Promise(resolve => {
      $("#exhibitions").load("mpa/exhibitions.html", resolve);
    }));
    promises.push(new Promise(resolve => {
      $("footer").load("mpa/footer.html", resolve);
    }));

    // 로그인 팝업도 로드 및 스크립트 삽입
    promises.push(new Promise(resolve => {
      $('#login').hide();
      $("#login").load("mpa/login.html", function () {
        const script = document.createElement("script");
        script.src = "assets/js/login.js";
        document.body.appendChild(script);
        resolve();
      });
    }));

    // 모든 로드 완료 후 반환되는 Promise
    return Promise.all(promises);
  }

  // 텍스트 lang 감싸기 함수
  function wrapEnglishText() {
    const tags = 'p, span, div, li, h1, h2, h3, h4, h5, h6, td, th, a, strong, em, b, i';

    $(tags).each(function () {
      $(this).contents().filter(function () {
        return this.nodeType === 3;
      }).each(function () {
        const text = this.nodeValue;
        const replaced = text.replace(/([a-zA-Z]+)/g, function(match) {
          if (match.trim().length > 0) {
            return '<span lang="en">' + match + "</span>";
          }
          return match;
        });

        if (replaced !== text) {
          $(this).replaceWith(replaced);
        }
      });
    });
  }

  // 실행 순서: 외부 HTML 로드 완료 후 감싸기 실행
  loadAll().then(() => {
    wrapEnglishText();
  });

});
