export default class HeaderStickyMinMax {
  constructor(options) {
    this.header = document.querySelector(options.header)
    this.minHeight = options.minHeight;
    this.maxHeight = options.maxHeight;
    this.point = Number(options.breakpoint);
    this.stickySidebar = options.stickySidebar;

    // *** extra elements for styling ***
    this.logo = document.querySelector(options.logoElement);
    this.nav = document.querySelector(options.navElement);
  }
  listener() {
    if (this.header) {
      this.scrollChange();
      window.addEventListener('scroll', e => this.scrollChange(e))
    }
  }
  scrollChange(e) {
    const scrollPosition = Math.floor(window.scrollY);
    const sidebarSticky = document.querySelector(this.stickySidebar)

    if (scrollPosition <= this.point) {
      this.header.style.height = this.maxHeight + "px";
      if (sidebarSticky) { sidebarSticky.style.top = this.maxHeight + "px" }

      // *** здесь описываем обнуление уменьшенных стилей для логотипа и др. ***
      // *** по типу style.removeProperty('height') ***
      this.logo.style.removeProperty('font-size');
      this.nav.style.removeProperty('font-size');

    } else {
      this.header.style.height = this.minHeight + "px";
      if (sidebarSticky) { sidebarSticky.style.top = this.minHeight + "px" }


      // *** здесь описываем уменьшенные стили логотипа, десктопного меню и др. ***
      this.logo.style.fontSize = 0.75 + "em";
      this.nav.style.fontSize = 0.75 + "em";
    }
  }

}
