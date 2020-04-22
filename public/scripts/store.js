
;(() => {

  app.store = {
    users: {
      get collection() {
        return flarebase.store.db.collection('users');
      },
      getReference(uid=firebase.auth().getUid()) {
        return this.collection.doc(uid);
      },

      // セット(上書き)
      async set(data) {
        await this.collection.doc(data.uid).set(data);
      },
      async get(uid=firebase.auth().getUid()) {
        return this.getReference(uid).getWithRelation();
      },
      async getByScreenName(screen_name) {
        var ref = this.collection.where('screen_name', '==', screen_name);
        var items = await ref.getWithRelation();
        return items[0];
      },
      async index() {
        var items = await this.collection.getWithRelation();
        return items;
      }
    },
    groups: {
      async get(id) {
        return await flarebase.store.db.collection('groups').doc(id).getWithRelation();
      },
      async index({user_id, limit, startAfter}) {
        var ref = flarebase.store.db.collection('groups');
        
        if (user_id) {
          var user_ref = flarebase.store.db.collection('users').doc(user_id);
          ref = ref.where('users', 'array-contains', user_ref);
        }
        ref = ref.orderBy('updated_at', 'desc');

        if (limit) {
          ref = ref.limit(limit);
        }
        if (startAfter) {
          ref = ref.startAfter(startAfter);
        }

        var res = await ref.getWithRelation();

        return res;
      },
    },
    trainings: {
      // todo友達のトレーニングを追加する
      get: async(id) => {
        var training = await flarebase.store.db.collection('trainings').doc(id).getWithRelation();
        return training;
      },
      getOfficial: async() => {
        var trainings = await flarebase.store.db.collection('trainings').where('is_official', '==', true).orderBy('created_at', 'desc').getWithRelation();
        return trainings;
      },
      getMine: async() => {
        var trainings = await flarebase.store.db.collection('trainings').where('is_official', '==', false).where('user_id', '==', firebase.auth().getUid()).orderBy('created_at', 'desc').getWithRelation();
        return trainings;
      },
      getDefault: async() => {
        // var trainings = await flarebase.store.db.collection('trainings').where('is_official', '==', true).orderBy('created_at', 'desc').where('is_official', '==', true).getWithRelation();
        // var trainings = await flarebase.store.db.collection('trainings').where('is_official', '==', true).orderBy('created_at', 'desc').getWithRelation();
        // return trainings;
      },
      post: async(item) => {
        var ref = flarebase.store.db.collection('trainings');
        try{
          return await ref.add({
            description: item.data.description,
            name: item.data.name,
            parts: item.data.parts,
            is_private: item.data.is_private || false,
            is_official: item.data.is_official || true,
            user_id: firebase.auth().getUid(), 
            created_at: moment().format('x'),
            updated_at: moment().format('x'),
            image: '',
          })
          .then( async(docRef) => {
            item.id = docRef.id;
            if (!item.data.image.url) {
              var url = await app.utils.uploadTrainingImageToStorage(item, 'trainings');
              await ref.doc(item.id).update(
                {image: {url: url.url} }
              );
            }
            spat.modal.alert('追加しました');
            return item.id;
          });
        }
        catch(error) {
          window.alert('更新に失敗しました');
          return;
        }
      },
      update: async(item) => {
        var ref = flarebase.store.db.collection('trainings').doc(item.id);
        try{
          ref.update({
            description: item.data.description,
            name: item.data.name,
            parts: item.data.parts,
            is_private: item.data.is_private,
            is_official: item.data.is_official,
            updated_at: moment().format('x'),
            image: {
              url: item.data.image.url,
            },
          })
          .then(() => {
            spat.modal.alert('更新しました');
          });
        }
        catch(error) {
          window.alert('更新に失敗しました');
          return;
        }        
      },
      delete: async(item) => {
        await flarebase.store.db.collection('trainings').doc(item.id).delete().then(spat.modal.alert('削除しました'));
      }, 
    },
    lists: {
      getById: async(id) => {
        return await flarebase.store.db.collection('lists').doc(id).getWithRelation();
      },
      getDefault: async() => {
        var lists = await flarebase.store.db.collection('lists').where('is_official', '==', true).orderBy('created_at', 'desc').getWithRelation();
        return lists;
      },
      getMine: async() => {
        var lists = await flarebase.store.db.collection('lists').where('is_official', '==', false).where('user_id', '==', firebase.auth().getUid()).orderBy('created_at', 'desc').getWithRelation();
        return lists;
      },
      post: async(item) => {
        var ref = flarebase.store.db.collection('lists');
        try {
          return await ref.add({
            name: item.data.name,
            description: item.data.description,
            trainings : item.data.trainings,
            is_private: item.data.is_private || false,
            is_official: item.data.is_official || true,
            user_id: firebase.auth().getUid(),
            created_at: moment().format('x'),
            updated_at: moment().format('x'),
          })
          .then( (docRef) => {
            spat.modal.alert('更新しました');
            return docRef.id;
          });
        }
        catch(error) {
          window.alert('更新に失敗しました');
          return;
        }
      },
      update: async(item) => {
        var ref = flarebase.store.db.collection('lists').doc(item.id);
        try{
          ref.update({
            name: item.data.name,
            description: item.data.description,
            trainings : item.data.trainings,
            is_private: item.data.is_private,
            is_official: item.data.is_official,
            updated_at: moment().format('x'),
          })
          .then(() => {
            spat.modal.alert('更新しました');
          });
        }
        catch(error) {
          window.alert('更新に失敗しました');
          return;
        }        
      },
      delete: async(item) => {
        await flarebase.store.db.collection('lists').doc(item.id).delete().then(spat.modal.alert('削除しました'));
      }, 
    },
    logs: {
      post: async(item) => {
        var ref = flarebase.store.db.collection('logs');
        item.data.user_id = firebase.auth().getUid();
        try{
          await ref.add(item.data).then(spat.modal.alert('登録しました'));
        }
        catch(error) {
          window.alert('更新に失敗しました');
          return;
        }
      },
      getMine: async(item) => {
        var uid = firebase.auth().getUid();
        // kari
        var lists = await flarebase.store.db.collection('logs').where('user_id', '==', uid).orderBy('done_at', 'desc').getWithRelation({cache: false});
        return lists;
      },
      getByTrainingId: async(id) => {
        var lists = await flarebase.store.db.collection('logs').where('training_id', '==', id).orderBy('done_at', 'asc').getWithRelation();
        return lists;
      },
      update: async(item) => {
        var ref = flarebase.store.db.collection('logs').doc(item.id);
        try{
          if (item.data.type === 'normal') {
            await ref.update({
              weight: item.data.weight,
              rep: item.data.rep,
              set: item.data.set,
              updated_at: moment().format('x'),
            })
            .then(() => {
              spat.modal.alert('更新しました');
            });
          } else {
            ref.update({
              trainings: item.data.trainings,
              updated_at: moment().format('x'),
            })
            .then(() => {
              spat.modal.alert('更新しました');
            });
          }
        }
        catch(error) {
          window.alert('更新に失敗しました');
          return;
        }        
      },
      delete: async(item) => {
        await flarebase.store.db.collection('logs').doc(item.id).delete().then(spat.modal.alert('削除しました'));
      }, 
    },
  }

})();