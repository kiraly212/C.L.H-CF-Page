/**
 * タブコントロール
 */
const showTab = (selector) => {
    console.log(selector);
    $('.tabs-menu > li').removeClass('active');
    $('.tabs-content > section').hide();
    $(`.tabs-menu a[href="${selector}"]`)
        .parent()
        .addClass('active');
    $(selector).show();
};

$('.tabs-menu a').on('click', (e) => {
    e.preventDefault();
    const selector = $(e.target).attr('href');
    showTab(selector);
});

showTab('#tabs-1');