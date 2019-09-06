export const initialState = () => ({
  menuItems: [{
    icon: 'bubble_chart',
    title: 'Рекламные кампании',
    link: '/translations',
    fRule: getters => !getters['auth/inAgency'],
  },
  {
    icon: 'assessment',
    title: 'Отчеты',
    link: '/reports',
    fRule: getters => !getters['auth/inAgency'],
  },
  {
    icon: 'movie',
    title: 'Загруженные видео',
    link: '/videos',
    fRule: getters => !getters['auth/inAgency'],
  },
  {
    icon: 'file_copy',
    title: 'Документы',
    link: '/files',
    fRule: getters => !getters['auth/inAgency'],
  },
  {
    icon: 'business',
    title: 'Клиенты',
    active: true,
    fRule: getters => getters['auth/inAgency'],
    children: [
      { icon: 'list', title: 'Список клиентов', link: '/clients' },
      { icon: 'swap_horiz', title: 'Управление бюджетом', link: '/clients/budget' },
      { icon: 'restore', title: 'История операций', link: '/clients/billing' },
    ],
  },
  {
    icon: 'people',
    title: 'Пользователи',
    link: '/users',
    fRule: getters => getters['auth/isAdmin'],
  },
  {
    icon: 'gavel',
    title: 'Правила аукциона',
    link: '/auction_rules',
    fRule: () => true,
  },
  ],
});

export const mutations = {
  refreshMenuItems: (state, getters) => {
    state.menuItems = initialState().menuItems.map((i) => {
      i.rule = i.fRule(getters);
      return i;
    });
  },
};

export const actions = {
  refreshMenu: ({ commit }, store) => {
    commit('refreshMenuItems', store.getters || store);
  },
};

export const getters = {
  getMenuItems: state => state.menuItems,
};
