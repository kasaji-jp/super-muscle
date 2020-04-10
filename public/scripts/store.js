
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
      getAll: async() => {
        var trainings = await flarebase.store.db.collection('trainings').orderBy('created_at', 'desc').getWithRelation();
        // var trainings = await flarebase.store.db.collection('trainings').where('is_official', '==', true).orderBy('created_at', 'desc').getWithRelation();
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
          ref.add({
            description: item.data.description,
            name: item.data.name,
            parts: item.data.parts,
            is_private: item.data.is_private,
            is_official: item.data.is_official,
            created_at: moment().format('x'),
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
    },
    lists: {
      // todo-友達のリストが変更になった時どうするか 
      getDefault: async() => {
        var lists = await flarebase.store.db.collection('lists').where('is_official', '==', true).orderBy('created_at', 'desc').getWithRelation();
        // var trainings = await flarebase.store.db.collection('trainings').where('is_official', '==', true).orderBy('created_at', 'desc').getWithRelation();
        return lists;
      },
      post: async(item) => {
        var ref = flarebase.store.db.collection('lists');
        try{
          ref.add({
            name: item.data.name,
            description: item.data.description,
            trainings : item.data.trainings,
            is_private: item.data.is_private,
            is_official: item.data.is_official,
            created_at: moment().format('x'),
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
    },
  }

})();