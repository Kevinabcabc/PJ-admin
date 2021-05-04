import indexTpl from '../views/index.art';
import signInTpl from '../views/signIn.art';
import usersTpl from '../views/users.art';
import usersListTpl from '../views/users-list.art';
import usersListPageTpl from '../views/users-pages.art';
import router from '../routes/index'

const pagesize = 10;
let currentPage = 1;

const htmlIndex = indexTpl({});
const signInHtml = signInTpl({});
let dataList = [];


const _handleSubmit = (router) => {
  return (e) => {
    console.log('sign in', e);
    router.go('/index');
  }
}



const _list = (pageNum) => {
  let start = (pageNum-1)*pagesize;
  $('#users-list').html(usersListTpl({
    data: dataList.slice((pageNum-1)*pagesize, start+pagesize),
  }));

  // bind delete action
}

const _pagination = (data) => {
  let total = data.length;
  const pageCount = Math.ceil(total/pagesize);
  const pageArr = new Array(pageCount);

  const htmlPage = usersListPageTpl({
    pageArr,
  });

  $('#users-page').html(htmlPage);
  if (currentPage > pageCount) {
    currentPage = pageCount;
  }

  $(`#users-page-list li:nth-child(${(currentPage < pageCount) ? (currentPage+1) : (pageCount + 1)})`).addClass('active');
  $('#users-page-list li:not(:first-child,:last-child)').on('click', function(event){
    $(this).addClass('active').siblings().removeClass('active');
    const i = $(this).index();
    currentPage = i;
    _list(i);
  });
}

const _loadData = () => {
  $.ajax({
    url: '/api/users',
    dataType: "json",
    async: false,
    success(result) {
      dataList = result;
      let start = (currentPage-1)*pagesize;
      $('#users-list').html(usersListTpl({
        data: result.slice((currentPage-1)*pagesize, start+pagesize),
      }));
      _pagination(result);
      _list(currentPage);
    },
    error(err) {
      console.log(err);
    },
  });
}

const _handleUserSave = (e) => {
  const $btnClose = $('#users-close');

  const formData = $('#users-form').serialize();
  $.ajax({
    url: '/api/users',
    type: 'post',
    data: formData,
    success: (res) => {
      // console.log('signup', res);
      _loadData();
    }
  })
  console.log(formData);

  $btnClose.click();
}


const signIn = (router) => {
  return (req, res, next) => {
    res.render(signInHtml);
    $('#singIn').on('submit', _handleSubmit(router));
  }
}

const index = (router) => {
  return (req, res, next) => {

    res.render(htmlIndex);
    $(window, '.wrapper').resize();

    let users = usersTpl();
    $('#content').html(users);

    $('#users-list').on('click', '.remove', function(event) {
      $.ajax({
        url: '/api/users',
        type: 'delete',
        data: {
          id: $(this).data('id'),
        },
        success(res) {
          // console.log(res);
          _loadData();
        }
      })
    });

    $('#users-signout').on('click', (e) => {
      e.preventDefault()
      router.go('/signin');
    });
    // render list
    _loadData();
    $('#users-save').on('click', _handleUserSave);
  }
}

export {
  signIn,
  index,
};