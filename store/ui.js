export const state = () => {
  return {
    isMenuVisible: false,
    isOverlayVisible: true // preloader OR router transition
  }
}

export const mutations = {
  SET_MENU_VISIBILITY (state, status) {
    state.isMenuVisible = status
  },
  SET_OVERLAY_VISIBILITY (state, status) {
    state.isOverlayVisible = status
  }
}
