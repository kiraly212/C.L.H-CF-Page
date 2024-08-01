// API key
const ff14api_key = 'aa316a09169244ca930c6b0ed68d4bb2356b36a88e0a495d8cdf27310b476da9';

// FCID
 var fc_id = '9230127436295918052';

$(function () {
  const job_icons = {
    "Gladiator": ['剣術士', 36, './icons/01_TANK/Class/Gladiator.png'],
    "Pugilist": ['格闘士', 44, './icons/03_DPS/Class/Pugilist.png'],
    "Marauder": ['斧術士', 37, './icons/01_TANK/Class/Marauder.png'],
    "Lancer": ['槍術士', 45, './icons/03_DPS/Class/Lancer.png'],
    "Archer": ['弓術士', 50, './icons/03_DPS/Class/Archer.png'],
    "Conjurer": ['幻術士', 40, './icons/02_HEALER/Class/Conjurer.png'],
    "Thaumaturge": ['呪術士', 53, './icons/03_DPS/Class/Thaumaturge.png'],
    "Carpenter": ['木工師', 58, './icons/04_CRAFTER/Carpenter.png'],
    "Blacksmith": ['鍛冶師', 59, './icons/04_CRAFTER/Blacksmith.png'],
    "Armorer": ['甲冑師', 60, './icons/04_CRAFTER/Armorer.png'],
    "Goldsmith": ['彫金師', 61, './icons/04_CRAFTER/Goldsmith.png'],
    "Leatherworker": ['革細工師', 62, './icons/04_CRAFTER/Leatherworker.png'],
    "Weaver": ['裁縫師', 63, './icons/04_CRAFTER/Weaver.png'],
    "Alchemist": ['錬金術師', 64, './icons/04_CRAFTER/Alchemist.png'],
    "Culinarian": ['調理師', 65, './icons/04_CRAFTER/Culinarian.png'],
    "Miner": ['採掘師', 66, './icons/05_GATHERER/Miner.png'],
    "Botanist": ['園芸師', 67, './icons/05_GATHERER/Botanist.png'],
    "Fisher": ['漁師', 68, './icons/05_GATHERER/Fisher.png'],
    "Paladin": ['ナイト', 36, './icons/01_TANK/Job/Paladin.png'],
    "Monk": ['モンク', 44, './icons/03_DPS/Job/Monk.png'],
    "Warrior": ['戦士', 37, './icons/01_TANK/Job/Warrior.png'],
    "Dragoon": ['竜騎士', 45, './icons/03_DPS/Job/Dragoon.png'],
    "Bard": ['吟遊詩人', 50, './icons/03_DPS/Job/Bard.png'],
    "White Mage": ['白魔道士', 40, './icons/02_HEALER/Job/WhiteMage.png'],
    "Black Mage": ['黒魔道士', 53, './icons/03_DPS/Job/BlackMage.png'],
    "Arcanist": ['巴術士', 54, './icons/03_DPS/Class/Arcanist.png'],
    "Summoner": ['召喚士', 54, './icons/03_DPS/Job/Summoner.png'],
    "Scholar": ['学者', 41, './icons/02_HEALER/Job/Scholar.png'],
    "Rogue": ['双剣士', 46, './icons/03_DPS/Class/Rogue.png'],
    "Ninja": ['忍者', 46, './icons/03_DPS/Job/Ninja.png'],
    "Machinist": ['機工士', 51, './icons/03_DPS/Job/Machinist.png'],
    "Dark Knight": ['暗黒騎士', 38, './icons/01_TANK/Job/DarkKnight.png'],
    "Astrologian": ['占星術師', 42, './icons/02_HEALER/Job/Astrologian.png'],
    "Samurai": ['侍', 47, './icons/03_DPS/Job/Samurai.png'],
    "Red Mage": ['赤魔道士', 55, './icons/03_DPS/Job/RedMage.png'],
    "Blue Mage": ['青魔道士', 57, './icons/06_LIMITED/BlueMage.png'],
    "Gunbreaker": ['ガンブレイカー', 39, './icons/01_TANK/Job/Gunbreaker.png'],
    "Dancer": ['踊り子', 52, './icons/03_DPS/Job/Dancer.png'],
    "Reaper": ['リーパー', 48, './icons/03_DPS/Job/Reaper.png'],
    "Sage": ['賢者', 43, './icons/02_HEALER/Job/Sage.png'],
    "Pictomancer": ['ピクトマンサー', 56, './icons/02_HEALER/Job/Sage.png'],
    "Viper": ['ヴァイパー', 49, './icons/02_HEALER/Job/Sage.png'],
  };
  const sns_ids = {
    GiselleKiraly: ['kiraly_ff14', '193989544@N04',,],
    SyaroFleur: ['syaro_game9',,,],
    VanBarbariccia: ['VanB07765224',,,],
    SophiaFamira: ['sophiaF000',,,],
    NuxIuglans: ['Nux_Ixion',,,],
    PeathMay: ['PeathMay',,,],
  };

  $('#crest').append('<div class="loading fc"></div>');

  // FF14APIよりFCメンバ付きjson文字列を取得しdataに格納
  $.getJSON('https://nodestone-amqfbw67ha-an.a.run.app/FreeCompany/' + fc_id + '?data=FCM')
    .done(function (data) {
      if (data) {
        let fc_url = 'https://jp.finalfantasyxiv.com/lodestone/freecompany/' + fc_id + '/';
        const img_before = '<a href="' + fc_url + '" target="fc"><img src="';
        const img_after = '" class="crest"></a>';
        const fc_dc = data.FreeCompany.DC.replace("]","");
        $('#server').text(data.FreeCompany.World + '(' + fc_dc + 'DC)');
        $('#fc_name').text(data.FreeCompany.Name);
        $('#fc_slogan').text(data.FreeCompany.Slogan);
        $('#fc_name').append(' <span class="fc_tag">[' + data.FreeCompany.Tag + ']</span>');
        $('#fc_member_count').text(data.FreeCompany.ActiveMemberCount + ' Members');
        $('#crest_1').append(img_before + data.FreeCompany.CrestLayers.Bottom + img_after);
        $('#crest_2').append(img_before + data.FreeCompany.CrestLayers.MIDdle + img_after);
        $('#crest_3').append(img_before + data.FreeCompany.CrestLayers.Top + img_after);

        // FCリーダを特定してLeader Rotation欄に装飾クラスを追加
        let leaderName = data.FreeCompanyMembers.List[0].Name;
        leaderName = leaderName.replace(/\s+/g, "");
        $('#' + leaderName).css({"color":"#b19833","font-weight":"700"});

        // FF14APIより取得したFCメンバリストからメンバごとのHTMLタグを作成
        $.each(data.FreeCompanyMembers.List, function (i, val) {
          $('#free_company_members').append('<figure class="member" id="' + val.ID + '">' + '<div class="avatar"><a href="https://jp.finalfantasyxiv.com/lodestone/character/' + val.ID + '/" target="lodestone"><img src="' + val.Avatar + '"></a></div><div class="data"><div class="rank"><img src="' + val.RankIcon + '" class="rank_icon">' + val.RankName + '</div><div class="name">' + val.Name + '<div class="loading"></div></div></div></div></fiture>');
          let Name = val.Name.replace(/\s+/g, "");
          // SNS登録がある場合はSNSボタンを表示
          if (Name in sns_ids) {
            // x(twitter)リンク
            let twitter_id = sns_ids[Name][0];
            if (twitter_id != undefined) {
              $('#'+ val.ID +'').append('<div class="sns-link"><a href="https://twitter.com/'+ twitter_id +'" target="_blank" rel="noopener noreferrer" title="x-twitter"><i class="fa-brands fa-x-twitter sns-active"></i></a></div>');
            } else {
              $('#'+ val.ID +'').append('<div class="sns-link"><i class="fa-brands fa-x-twitter"></i></div>');
            };
            // flickrリンク
            let flickr_id = sns_ids[Name][1];
            if (flickr_id != undefined) {
              $('#'+ val.ID +'').append('<div class="sns-link"><a href="https://www.flickr.com/photos/'+ flickr_id +'" target="_blank" rel="noopener noreferrer" title="flickr"><i class="fab fa-flickr sns-active"></i></a></div>');
            } else {
              $('#'+ val.ID +'').append('<div class="sns-link"><i class="fab fa-flickr"></i></div>');
            };
            // youtubeリンク
            let youtube_id = sns_ids[Name][2];
            if (youtube_id != undefined) {
              $('#'+ val.ID +'').append('<div class="sns-link"><a href="https://www.youtube.com/channel/'+ youtube_id +'" target="_blank" rel="noopener noreferrer" title="youtube"><i class="fab fa-youtube sns-active"></i></a></div>');
            } else {
              $('#'+ val.ID +'').append('<div class="sns-link"><i class="fab fa-youtube"></i></div>');
            };
            // twitchリンク
            let twitch_id = sns_ids[Name][3];
            if (twitch_id != undefined) {
              $('#'+ val.ID +'').append('<div class="sns-link"><a href="https://www.twitch.tv/'+ twitch_id +'" target="_blank" rel="noopener noreferrer" title="twitch"><i class="fab fa-twitch sns-active"></i></a></div>');
            } else {
              $('#'+ val.ID +'').append('<div class="sns-link"><i class="fab fa-twitch"></i></div>');
            };
            // FF14内お店リンク
            let store_id = sns_ids[Name][4];
            if (store_id != undefined) {
              $('#'+ val.ID +'').append('<div class="sns-link"><a href="https://www.twitch.tv/'+ twitch_id +'" target="_blank" rel="noopener noreferrer" title="ff14housing"><i class="fas fa-store sns-active"></i></a></div>');
            } else {
              $('#'+ val.ID +'').append('<div class="sns-link"><i class="fas fa-store"></i></div>');
            };
          };
          // 詳細ボタンの表示
          $('#'+ val.ID +'').append('<details class="member-detail"><summary>詳細</summary><div class="cj"></div></details>');
          $('.member').each(function () {
            $(this).delay(100 * i).queue(function () {
              $(this).css('opacity', '1').dequeue();
            });
          });
        });

        // FF14APIよりクリックしたメンバのjson文字列を取得しm_objに格納
        $('.member-detail').on('click', function() {
        const member_id = $(this).parent().attr("id")
          const c_api = 'https://nodestone-amqfbw67ha-an.a.run.app/Character/' + member_id + '?data=CJ';
          $.getJSON(c_api)
            .done(function (m_obj) {
              if (m_obj) {
                let cj_array_base = m_obj.ClassJobs;
                // 除外するキーを指定
                let excludeKeys = ['Bozja', 'Eureka'];
                // キーを除外
                let cj_array = {};
                for (let key in cj_array_base) {
                  if (!excludeKeys.includes(key)) {
                    cj_array[key] = cj_array_base[key];
                  }
                }
                let cjb_array = m_obj.ClassJobs.Bozja;
                let cje_array = m_obj.ClassJobs.Eureka;
                let message = m_obj.Character.Bio;
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
                for (let cj in cj_array) {
                  let job_key = cj;
                  // let job_id2 = cj_array[j].key;
                  // if (job_id == null) {
                  //   job_id = job_id2;
                  // }
                  let job_level = cj_array[cj].Level;
                  let job_name = cj_array[cj].Unlockstate;
                  let job_icon_num = job_icons[job_name][1];
                  let job_icon_url = m_obj.Character.ClassjobIcons.List[job_icon_num].Icon
                  let exp_level;
                  let exp_level_max;
                  if (cj_array[cj].CurrentEXP == "--") {
                    exp_level = cj_array[cj].CurrentEXP
                  } else {
                    exp_level = Number(String(cj_array[cj].CurrentEXP).replace(/,/g, ''));
                  }
                  if (cj_array[cj].MaxEXP == "--") {
                    exp_level_max = cj_array[cj].MaxEXP
                  } else {
                    exp_level_max = Number(String(cj_array[cj].MaxEXP).replace(/,/g, ''));
                  }
                  let next;
                  if (job_level !== 0) {
                    if (exp_level_max !== "--") {
                      next = Math.round(exp_level / exp_level_max * 100);
                    } else {
                      next = 0;
                    }
                  } else {
                    next = 0;
                  }
                  // ジョブ情報追加
                  if (job_level !== 0) {
                    $('#' + member_id).find('.cj').append('<div class="job_name"><img src="' + job_icon_url + '" class="job_icon"><progress class="bar" value="' + next + '" max="100"></progress><div class="job_level">' + job_level + '</div></div>');
                  } else {
                    $('#' + member_id).find('.cj').append('<div class="job_name"><img src="' + job_icon_url + '" class="job_icon"><progress class="bar" value="' + next + '" max="100"></progress><div class="job_level">－</div></div>');
                  }
                }
                // ボズヤ　レジスタンスランク表示
                if (cjb_array !== null) {
                  let bozjan_level = cjb_array.Level;
                  if (bozjan_level !== null) {
                    $('#' + member_id).find('.cj').append('<div class="job_name"><img src="./icons/07_OTHERS/ResistanceRank.png" class="job_icon"><div class="job_level">' + bozjan_level + '</div></div>');
                  } else {
                    $('#' + member_id).find('.cj').append('<div class="job_name"><img src="./icons/07_OTHERS/ResistanceRank.png" class="job_icon"><div class="job_level">－</div></div>');
                  }
                }
                // エウレカ　エレメンタルレベル表示
                if (cje_array !== null) {
                  let elemental_level = cje_array.Level;
                  let elemental_explevel = cje_array.CurrentEXP;
                  let elemental_explevel_max = cje_array.MaxEXP;
                  let next;
                  if (elemental_level !== 0) {
                    if (elemental_explevel_max !== 0) {
                      next = Math.round(elemental_explevel / elemental_explevel_max * 100);
                    } else {
                      next = 0;
                    }
                  } else {
                    next = 0;
                  }
                  if (elemental_level !== 0) {
                    $('#' + member_id).find('.cj').append('<div class="job_name"><img src="./icons/07_OTHERS/ElementalLevel.png" class="job_icon"><progress class="bar" value="' + next + '" max="100"></progress><div class="job_level">' + elemental_level + '</div></div>');
                  } else {
                    $('#' + member_id).find('.cj').append('<div class="job_name"><img src="./icons/07_OTHERS/ElementalLevel.png" class="job_icon"><progress class="bar" value="' + next + '" max="100"></progress><div class="job_level">－</div></div>');
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
      $('#free_company_members').append('<img src="./images/maintenance.png">')
      $('body').append('<div id="message">Error: APIの応答がありません。データを読み込めませんでした。</div>');
    })
    .always(function () {
    });
});