// リクエストパラメータを作る
const parameters = $.param({
  keyword: 'C.L.H.',
  copyright: 'all', // 著作権表示型
  limit: '100', // 検索上限数
  offset: '0', // 検索オフセット
});
const url = `https://api.photozou.jp/rest/search_public.json/?${parameters}`;
console.log(url);

// リクエストパラメータの画像を検索して表示
fetch(url,{
  mode: 'cors'
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // データが取得できなかった場合
    if (data.stat !== 'ok') {
      throw new Error('データの取得に失敗しました。');
    }

    // 空の<div>を作る
    const $div = $('<div>');

    // ヒット件数
    $div.append(`<div>${data.info.photo_num} photos</div>`);
    for (let i = 0; i < data.info.photo_num; i++) {
      const photo = data.info.photo[i];
      // $divに <a href="..." ...><img src="..." ...></a> を追加する
      $div.append(photo.large_tag);
    }
    // $divをclass:main-contentsに追加する
    $div.appendTo('.main-contents');
  }).catch((error) => {
    console.error(`エラーが発生しました： ${error.message}`);
  });