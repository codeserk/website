interface MenuItem {
  id: string;
  title: string;
  children: MenuItem[];
}

export interface State {
  isMobileOverlayOn: boolean;
  menuItems: MenuItem[];

  background: string;
  logo: string;
}

/**
 * Global state
 *
 * @returns State
 */
export const state = (): State => ({
  isMobileOverlayOn: false,
  menuItems: [],

  background: '',
  logo: ''
})

export const getters = {
  isMobileOverlayOn: state => state.isMobileOverlayOn,
  menuItems: state => state.menuItems,

  background: state => state.background,
  logo: state => state.logo
}

export const mutations = {
  TOGGLE_MOBILE_OVERLAY: (state) => {
    state.isMobileOverlayOn = !state.isMobileOverlayOn
  },

  SET_MOBILE_OVERLAY: (state, isOn) => {
    state.isMobileOverlayOn = isOn
  },

  SET_MENU_ITEMS: (state, items) => {
    state.menuItems = items
  },

  SET_BACKGROUND: (state, background) => {
    state.background = background
  },

  SET_LOGO: (state, logo) => {
    state.logo = logo
  }
}

export const actions = {
  toggleMobileOverlay ({ commit }) {
    commit('TOGGLE_MOBILE_OVERLAY')
  },

  showMobileOverlay ({ commit }) {
    commit('SET_MOBILE_OVERLAY', true)
  },

  hideMobileOverlay ({ commit }) {
    commit('SET_MOBILE_OVERLAY', false)
  },

  setMenuItems ({ commit }, pages) {
    const menuItems = pages
      .filter(page => !!page.inMenu && page.parentId === '0')
      .sort((pageA, pageB) => pageA.order - pageB.order)
      .map(page => ({
        ...page,
        children: pages
          .filter(subPage => subPage.parentId === page.id)
          .map(subPage => ({
            ...subPage,
            link: page.link + subPage.link
          }))
      }))
    commit('SET_MENU_ITEMS', menuItems)
  },

  setBackground({ commit }, background) {
    commit('SET_BACKGROUND', background)
  },

  setLogo({ commit }, logo) {
    commit('SET_LOGO', logo)
  }
}
