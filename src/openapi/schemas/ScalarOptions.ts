export class ScalarAuthenticationOptions {
  // Define properties here
}

export class ScalarOptions {
  public readonly title: string;
  public readonly theme: string;
  public readonly darkMode?: boolean;
  public readonly hideDownloadButton?: boolean;
  public readonly showSideBar?: boolean;
  public readonly withDefaultFonts?: boolean;
  public readonly layout?: string;
  public readonly customCss?: string;
  public readonly searchHotkey?: string;
  public readonly metadata?: Record<string, any>;
  public readonly authentication?: ScalarAuthenticationOptions;

  constructor(
    title: string,
    theme: string,
    darkMode?: boolean,
    hideDownloadButton?: boolean,
    showSideBar?: boolean,
    withDefaultFonts?: boolean,
    layout?: string,
    customCss?: string,
    searchHotkey?: string,
    metadata?: Record<string, any>,
    authentication?: ScalarAuthenticationOptions
  ) {
    this.title = title;
    this.theme = theme;
    this.darkMode = darkMode;
    this.hideDownloadButton = hideDownloadButton;
    this.showSideBar = showSideBar;
    this.withDefaultFonts = withDefaultFonts;
    this.layout = layout;
    this.customCss = customCss;
    this.searchHotkey = searchHotkey;
    this.metadata = metadata;
    this.authentication = authentication;
  }

  toJSON(): string {
    return JSON.stringify({
      title: this.title,
      theme: this.theme,
      darkMode: this.darkMode,
      hideDownloadButton: this.hideDownloadButton,
      showSideBar: this.showSideBar,
      withDefaultFonts: this.withDefaultFonts,
      layout: this.layout,
      customCss: this.customCss,
      searchHotkey: this.searchHotkey,
      metadata: this.metadata,
      authentication: this.authentication,
    });
  }
}
