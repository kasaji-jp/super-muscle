document.addEventListener('DOMContentLoaded', async () => {
  await flarebase.initializeApp(config.firebase);

  if (!flarebase.auth.isSignIn()) {
    var res = await flarebase.auth.signInAnonymously();
    // firestore のほうにもユーザーをセット
    var user = await app.store.users.get();
    user.doc.ref.set(res.user);
  }

  await spalate.start();
});


// deviceready
document.addEventListener('deviceready', async () => {
  // 検索時にキーボードを上からかぶせる
  Keyboard.shrinkView(true);
  setTimeout(function() {
    Keyboard.shrinkView(false);
    Keyboard.hideFormAccessoryBar(false);
  }, 1000);


  // 開始
  startApp();


  window.addEventListener('keyboardWillShow', function () {
    spat.nav.currentPage._tag.trigger('keyboardWillShow');
  });

  window.addEventListener('keyboardDidHide', function () {
    spat.nav.currentPage._tag.trigger('keyboardDidHide');
  });

  window.addEventListener('keyboardDidShow', function () {
    spat.nav.currentPage._tag.trigger('keyboardDidShow');
  });
}, false);
