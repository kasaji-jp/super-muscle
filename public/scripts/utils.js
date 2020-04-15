
;(() => {

  app.utils = {
    imageToBase64: (url) => {
      return new Promise((resolve) => {
        var img = new Image();
        img.onload = () => {
          var canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          var base64 = canvas.toDataURL('image/jpg');
          resolve(base64);
        };
        img.crossOrigin = 'anonymous';
        img.src = url;
      });
    },
    fileToBase64: (file) => {
      return new Promise(function(resolve) {
        var reader = new FileReader();
        reader.onload = function(e) {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    uploadTrainingImageToStorage: (item, type) => {
      return new Promise(async (resolve, reject) => {
        let imageRef = firebase.storage().ref(type).child(item.item.id).child('images').child(moment().format('X'));
        imageRef.put(item.item.data.image.file).then(async (ss) => {
          var url = await ss.ref.getDownloadURL();
          resolve({
            url: url,
            snapshot: ss,
          });
        }).catch((err) => {
          reject(err);
        });
      });
    }, 
    uploadFile: () => {
    },

    // 登録/ログインを表示
    openAuthModal() {
      return new Promise((resolve) => {
        var modal = spat.modal.open('modal-auth');

        modal.on('authed', async (e) => {
          spat.modal.alert('ログインしました');
  
          var user = await app.store.users.get();

          // 未登録のユーザーだったらユーザーデータを上書きする
          if (user.data.isAnonymous) {
            await user.doc.ref.set(e.user);
          }
          
          modal.close();
        });

        modal.on('close', () => {
          resolve();
        });
      });
    },

    getDummyImages() {
      return [
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fanders-ipsen-9XhgZmrvCEU-unsplash.jpg?alt=media&token=f4cd35cb-8fd0-452e-9c1c-6e6b7a09cb36',
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fchris-liverani-W-4lE3MDItA-unsplash.jpg?alt=media&token=0b96b1a7-94e8-4aff-87b3-8f3180d93d6a',
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fdan-roizer-GygPFmXGD1o-unsplash.jpg?alt=media&token=fcb531ea-8175-4b9d-8755-36dbdaa935f3',
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fglauber-sampaio-FkNzeOnsA0g-unsplash.jpg?alt=media&token=981ac154-476b-4511-8cb7-cce6c2451933',
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fjack-anstey-HtUBBdNDxpQ-unsplash.jpg?alt=media&token=c6972221-4fed-4b8f-9334-ea74cecfcaf2',
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fjessica-furtney-zhqD0tw1peA-unsplash.jpg?alt=media&token=63cafc7d-1ee4-488c-8966-533c712a4b8b',
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fjon-flobrant-rB7-LCa_diU-unsplash.jpg?alt=media&token=c25f2fca-d7a4-4b5f-9269-6f49e95b6981',
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fmario-alvarez-M1YdS0g8SRA-unsplash.jpg?alt=media&token=ae5695ec-607d-4283-a870-d94131174977',
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fmartin-sanchez-ycG0A6DlvOk-unsplash.jpg?alt=media&token=3681c675-0cd5-48c6-bddd-3a82be5d7cde',
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fmatt-power-TpHmEoVSmfQ-unsplash.jpg?alt=media&token=17bba058-f6c0-467d-916c-ba1dd140bbf6',
        'https://firebasestorage.googleapis.com/v0/b/chat-rabee-jp.appspot.com/o/dummies%2Friver%2Fmatthew-feeney-75IV0_EFh0c-unsplash.jpg?alt=media&token=43c95cd3-8490-43dc-8cdb-a2297a911704',
      ];
    },

    getBodyParts: () => {
      return {
        chest: {label: '胸筋', image: '/static/images/sample.png'}, 
        legs: {label: '脚', image: '/static/images/sample.png'}, 
        arms: {label: '腕', image: '/static/images/sample.png'}, 
        abdominal: {label: '腹筋', image: '/static/images/sample.png'}, 
        shoulders: {label: '肩', image: '/static/images/sample.png'}, 
        back: {label: '背筋', image: '/static/images/sample.png'}
      };
    },
    
    keyboardShrink: (isShrink) => {
      if (window.cordova && Keyboard) {
        Keyboard.shrinkView(isShrink);
      }
    },

    getTrainingByParts: async() => {
      //- リストに渡す用 部位ごとのトレーニングリストを作成
      var trainingsAll = await app.store.trainings.getAll();
      var parts = app.utils.getBodyParts();
      var keys = Object.keys(parts);
      Object.values(parts).forEach( (part, i) => {
        part.contents = trainingsAll.filter(training => training.data.parts === keys[i]);
      });
      return parts;
    },

    getLists: async() => {
      //- リストデータ作成
      var trainingsAll = await app.store.trainings.getAll();
      var lists = await app.store.lists.getDefault();
      lists.forEach(list => {
        list.data.trainings.forEach((listItem, i) => {
          var current = trainingsAll.find(training => training.id === listItem.id );
          list.data.trainings[i] = current;
        });
      });
      return lists;
    },

    getListSingle: async(id) => {
      //- リストデータ取得+trainingdata紐付け
      var list = await app.store.lists.getById(id);
      var promises = list.data.trainings.map(training => {
        return app.store.trainings.get(training.id);
      });
      list.data.trainings = await Promise.all(promises);
      return list;
    },
    putLog: async(items) => {
      //- 紐づけlog情報の準備
      var promises = items.map(item => {
        return app.store.logs.getByTrainingId(item.id);
      });
      var logs = await Promise.all(promises);
      logs.forEach( (log, i) => {
        //- 最新のログだけ抜き出し
        items[i].data.log = log[log.length - 1];
      });
      return items;
    },
  };
  

})();