// API key
const ff14api_key = 'aa316a09169244ca930c6b0ed68d4bb2356b36a88e0a495d8cdf27310b476da9';

// FCID
 var fc_id = '9230127436295918052';

$(function () {
  const job_ids = {
    1: ['剣術士', 'gradiator', './icons/01_TANK/Class/Gladiator.png'],
    2: ['格闘士', 'pugilist', './icons/03_DPS/Class/Pugilist.png'],
    3: ['斧術士', 'marauder', './icons/01_TANK/Class/Marauder.png'],
    4: ['槍術士', 'lancer', './icons/03_DPS/Class/Lancer.png'],
    5: ['弓術士', 'archer', './icons/03_DPS/Class/Archer.png'],
    6: ['幻術士', 'conjurer', './icons/02_HEALER/Class/Conjurer.png'],
    7: ['呪術士', 'thaumaturge', './icons/03_DPS/Class/Thaumaturge.png'],
    8: ['木工師', 'carpenter', './icons/04_CRAFTER/Carpenter.png'],
    9: ['鍛冶師', 'blacksmith', './icons/04_CRAFTER/Blacksmith.png'],
    10: ['甲冑師', 'armorer', './icons/04_CRAFTER/Armorer.png'],
    11: ['彫金師', 'goldsmith', './icons/04_CRAFTER/Goldsmith.png'],
    12: ['革細工師', 'leatherworker', './icons/04_CRAFTER/Leatherworker.png'],
    13: ['裁縫師', 'weaver', './icons/04_CRAFTER/Weaver.png'],
    14: ['錬金術師', 'alchemist', './icons/04_CRAFTER/Alchemist.png'],
    15: ['調理師', 'culinarian', './icons/04_CRAFTER/Culinarian.png'],
    16: ['採掘師', 'miner', './icons/05_GATHERER/Miner.png'],
    17: ['園芸師', 'botanist', './icons/05_GATHERER/Botanist.png'],
    18: ['漁師', 'fisher', './icons/05_GATHERER/Fisher.png'],
    19: ['ナイト', 'paladin', './icons/01_TANK/Job/Paladin.png'],
    20: ['モンク', 'monk', './icons/03_DPS/Job/Monk.png'],
    21: ['戦士', 'warrior', './icons/01_TANK/Job/Warrior.png'],
    22: ['竜騎士', 'dragoon', './icons/03_DPS/Job/Dragoon.png'],
    23: ['吟遊詩人', 'bard', './icons/03_DPS/Job/Bard.png'],
    24: ['白魔道士', 'white mage', './icons/02_HEALER/Job/WhiteMage.png'],
    25: ['黒魔道士', 'black mage', './icons/03_DPS/Job/BlackMage.png'],
    26: ['巴術士', 'arcanist', './icons/03_DPS/Class/Arcanist.png'],
    27: ['召喚士', 'summoner', './icons/03_DPS/Job/Summoner.png'],
    28: ['学者', 'scholar', './icons/02_HEALER/Job/Scholar.png'],
    29: ['双剣士', 'rogue', './icons/03_DPS/Class/Rogue.png'],
    30: ['忍者', 'ninja', './icons/03_DPS/Job/Ninja.png'],
    31: ['機工士', 'machinist', './icons/03_DPS/Job/Machinist.png'],
    32: ['暗黒騎士', 'dark knight', './icons/01_TANK/Job/DarkKnight.png'],
    33: ['占星術師', 'astrologian', './icons/02_HEALER/Job/Astrologian.png'],
    34: ['侍', 'samurai', './icons/03_DPS/Job/Samurai.png'],
    35: ['赤魔道士', 'red mage', './icons/03_DPS/Job/RedMage.png'],
    36: ['青魔道士', 'blue mage', './icons/06_LIMITED/BlueMage.png'],
    37: ['ガンブレイカー', 'gunbreaker', './icons/01_TANK/Job/Gunbreaker.png'],
    38: ['踊り子', 'dancer', './icons/03_DPS/Job/Dancer.png'],
    39: ['リーパー', 'reaper', './icons/03_DPS/Job/Reaper.png'],
    40: ['賢者', 'sage', './icons/02_HEALER/Job/Sage.png'],
  };
  $('#crest').append('<div class="loading fc"></div>');



  // FF14APIよりFCメンバ付きjson文字列を取得しdataに格納
  $.getJSON('https://xivapi.com/freecompany/' + fc_id + '?data=FCM' + '&private_key=' + ff14api_key)
    .done(function (data) {
      if (data) {
        console.dir(data);
        let fc_url = 'https://jp.finalfantasyxiv.com/lodestone/freecompany/' + fc_id + '/';
        const img_before = '<a href="' + fc_url + '" target="fc"><img src="';
        const img_after = '" class="crest"></a>';
        $('#server').text(data.FreeCompany.Server + '(' + data.FreeCompany.DC + ')');
        $('#fc_name').text(data.FreeCompany.Name);
        $('#fc_slogan').text(data.FreeCompany.Slogan);
        $('#fc_name').append(' <span class="fc_tag">[' + data.FreeCompany.Tag + ']</span>');
        $('#fc_member_count').text(data.FreeCompany.ActiveMemberCount + '人');
        $('#crest_1').append(img_before + data.FreeCompany.Crest[0] + img_after);
        $('#crest_2').append(img_before + data.FreeCompany.Crest[1] + img_after);
        $('#crest_3').append(img_before + data.FreeCompany.Crest[2] + img_after);

        // FCリーダを特定して装飾クラスを追加
        let leaderName = data.FreeCompanyMembers[0].Name;
        leaderName = leaderName.replace(/\s+/g, "");
        console.log(leaderName);
        $('#' + leaderName).css({"color":"#06a2d6","font-weight":"700"});

        // FF14APIより取得したFCメンバリストからメンバごとのHTMLタグを作成
        $.each(data.FreeCompanyMembers, function (i, val) {
          $('#free_company_members').append('<figure class="member" id="' + val.ID + '">' + '<div class="avatar"><a href="https://jp.finalfantasyxiv.com/lodestone/character/' + val.ID + '/" target="lodestone"><img src="' + val.Avatar + '"></a></div><div class="data"><div class="rank"><img src="' + val.RankIcon + '" class="rank_icon">' + val.Rank + '</div><div class="name">' + val.Name + '<div class="loading"></div></div></div><details class="member-detail"><summary>詳細</summary><div class="cj"></div></details></div></fiture>');
          $('.member').each(function () {
            $(this).delay(200 * i).queue(function () {
              $(this).css('opacity', '1').dequeue();
            });
          });
        });

        // FF14APIよりクリックしたメンバのjson文字列を取得しm_objに格納
        $('.member-detail').on('click', function() {
        const member_id = $(this).parent().attr("id")
          const c_api = 'https://xivapi.com/character/' + member_id + '?private_key=' + ff14api_key;
          console.log(c_api);
          $.getJSON(c_api)
            .done(function (m_obj) {
              if (m_obj) {
                console.log(member_id + 'のデータ');
                console.dir(m_obj);
                let cj_array = m_obj.Character.ClassJobs;
                let cjb_array = m_obj.Character.ClassJobsBozjan;
                let cje_array = m_obj.Character.ClassJobsElemental;
                let message = m_obj.Character.Bio;
                console.log('message=' + message);
                // ソートの優先順位、Levelが最優先、次にExp値
                const order = [
                  { key: 'Level', reverse: true },
                  { key: 'ExpLevel', reverse: true }
                ];
                // ソート関数（reverse: falseで昇順）
                function sort_by(list) {
                  return (a, b) => {
                    for (let i = 0; i < list.length; i++) {
                      const order_by = list[i].reverse ? 1 : -1;
                      if (a[list[i].key] < b[list[i].key]) return order_by;
                      if (a[list[i].key] > b[list[i].key]) return order_by * -1;
                    }
                    return 0;
                  };
                }
                // ソート実行
                // cj_array.sort(sort_by(order));
                // 要素を空にする
                $('#' + member_id).find('.cj').empty();
                // ジョブ情報整形
                for (let j = 0; j < cj_array.length; j++) {
                  let job_id = cj_array[j].UnlockedState.ID;
                  let job_id2 = cj_array[j].JobID;
                  if (job_id == null) {
                    job_id = job_id2;
                  }
                  let job_level = cj_array[j].Level;
                  let job_name = job_ids[job_id][0];
                  let job_icon_url = job_ids[job_id][2];
                  let exp_level = cj_array[j].ExpLevel;
                  let exp_level_max = cj_array[j].ExpLevelMax;
                  let next;
                  if (job_level !== 0) {
                    if (exp_level_max !== 0) {
                      next = Math.round(exp_level / exp_level_max * 100);
                    } else {
                      next = 0;
                    }
                  } else {
                    next = 0;
                  }
                  console.log('job_id=' + job_id + ' job_name=' + job_name + '[' + job_level + ']' + ' job_en=' + job_ids[job_id][1] + ' EXP=' + next);
                  // ジョブ情報追加
                  if (job_level !== 0) {
                    $('#' + member_id).find('.cj').append('<div class="job_name"><img src="' + job_icon_url + '" class="job_icon"><progress class="bar" value="' + next + '" max="100"></progress><div class="job_level">' + job_level + '</div></div>');
                  } else {
                    $('#' + member_id).find('.cj').append('<div class="job_name"><img src="' + job_icon_url + '" class="job_icon"><progress class="bar" value="' + next + '" max="100"></progress><div class="job_level">－</div></div>');
                  }
                }
                // ポートレイトを表示
                $('#' + member_id).find('.cj').append('<div class = "member-portrait"></div>')
                $('#' + member_id).find('.member-portrait').append('<a href="' + m_obj.Character.Portrait + '" target="_blank" rel="noopener noreferrer"><img src="' + m_obj.Character.Portrait + '"></img></a>')
                // メッセージ追加
                if (message == '-' || message == '') {
                } else {
                  $('#' + member_id).find('.cj').append('<div class="message">' + message + '</div>');
                }

                $('#' + member_id).find('.cj').find('.loading').hide(1000);
              } else {
                console.log('error');
              }
              $(document).on('click', '.accordion', function () {
                $(this).addClass('expanded');
                $(this).css('height', $(this).find('table').height());
              });
              $(document).on('click', '.accordion.expanded', function () {
                $(this).removeClass('expanded');
                $(this).css('height', '8em');
              });
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
              console.log('エラー：' + textStatus);
              console.log('テキスト：' + jqXHR.responseText);
            })
            .always(function () {
              console.log('M完了');
            });
        });
        // 中身が空の場合は、エラーメッセージ
      } else {
        alert('該当するFree Companyが存在しません。');
      }
      $('#crest').find('.loading.fc').hide(1000);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log('エラー：' + textStatus);
      console.log('テキスト：' + jqXHR.responseText);
      $('#crest').find('.loading.fc').hide();
      $('#fc').hide();
      $('body').append('<div id="message">Error: APIの応答がありません。データを読み込めませんでした。</div>');
    })
    .always(function () {
      console.log('FCM完了');
    });
});