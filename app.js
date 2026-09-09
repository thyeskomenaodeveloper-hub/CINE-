/**
 * CINE STREAMER - Leitor de Listas M3U & IPTV
 */

const STORAGE_KEYS = {
  PLAYLISTS: 'cine_playlists',
  ACTIVE_PLAYLIST_ID: 'cine_active_pl_id',
  FAVORITES: 'cine_favorites',
  HISTORY: 'cine_history',
  SETTINGS: 'cine_settings',
  PROGRESS: 'cine_progress'
};

const DEFAULT_SETTINGS = {
  corsProxy: 'https://api.allorigins.win/raw?url=',
  pageSize: 60,
  autoplay: true
};

    // Demo legal public streams
    const DEMO_PLAYLIST_CONTENT = `#EXTM3U
#EXTINF:-1 tvg-id="iptv-org-animation" tvg-name="Animation" tvg-logo="" group-title="Extras",Animation
https://iptv-org.github.io/iptv/categories/animation.m3u
#EXTINF:-1 tvg-id="iptv-org-auto" tvg-name="Auto" tvg-logo="" group-title="Extras",Auto
https://iptv-org.github.io/iptv/categories/auto.m3u
#EXTINF:-1 tvg-id="iptv-org-business" tvg-name="Business" tvg-logo="" group-title="Extras",Negócios
https://iptv-org.github.io/iptv/categories/business.m3u
#EXTINF:-1 tvg-id="iptv-org-classic" tvg-name="Classic" tvg-logo="" group-title="Extras",Clássico
https://iptv-org.github.io/iptv/categories/classic.m3u
#EXTINF:-1 tvg-id="iptv-org-comedy" tvg-name="Comedy" tvg-logo="" group-title="Extras",Comédia
https://iptv-org.github.io/iptv/categories/comedy.m3u
#EXTINF:-1 tvg-id="iptv-org-cooking" tvg-name="Cooking" tvg-logo="" group-title="Extras",Culinária
https://iptv-org.github.io/iptv/categories/cooking.m3u
#EXTINF:-1 tvg-id="iptv-org-culture" tvg-name="Culture" tvg-logo="" group-title="Extras",Cultura
https://iptv-org.github.io/iptv/categories/culture.m3u
#EXTINF:-1 tvg-id="iptv-org-documentary" tvg-name="Documentary" tvg-logo="" group-title="Extras",Documentário
https://iptv-org.github.io/iptv/categories/documentary.m3u
#EXTINF:-1 tvg-id="iptv-org-education" tvg-name="Education" tvg-logo="" group-title="Extras",Educação
https://iptv-org.github.io/iptv/categories/education.m3u
#EXTINF:-1 tvg-id="iptv-org-entertainment" tvg-name="Entertainment" tvg-logo="" group-title="Extras",Entretenimento
https://iptv-org.github.io/iptv/categories/entertainment.m3u
#EXTINF:-1 tvg-id="iptv-org-family" tvg-name="Family" tvg-logo="" group-title="Extras",Família
https://iptv-org.github.io/iptv/categories/family.m3u
#EXTINF:-1 tvg-id="iptv-org-general" tvg-name="General" tvg-logo="" group-title="Extras",Geral
https://iptv-org.github.io/iptv/categories/general.m3u
#EXTINF:-1 tvg-id="iptv-org-interactive" tvg-name="Interactive" tvg-logo="" group-title="Extras",Interativo
https://iptv-org.github.io/iptv/categories/interactive.m3u
#EXTINF:-1 tvg-id="iptv-org-kids" tvg-name="Kids" tvg-logo="" group-title="Extras",Crianças
https://iptv-org.github.io/iptv/categories/kids.m3u
#EXTINF:-1 tvg-id="iptv-org-legislative" tvg-name="Legislative" tvg-logo="" group-title="Extras",Legislativo
https://iptv-org.github.io/iptv/categories/legislative.m3u
#EXTINF:-1 tvg-id="iptv-org-lifestyle" tvg-name="Lifestyle" tvg-logo="" group-title="Extras",Estilo de vida
https://iptv-org.github.io/iptv/categories/lifestyle.m3u
#EXTINF:-1 tvg-id="iptv-org-movies" tvg-name="Movies" tvg-logo="" group-title="Extras",Filmes
https://iptv-org.github.io/iptv/categories/movies.m3u
#EXTINF:-1 tvg-id="iptv-org-music" tvg-name="Music" tvg-logo="" group-title="Extras",Música
https://iptv-org.github.io/iptv/categories/music.m3u
#EXTINF:-1 tvg-id="iptv-org-news" tvg-name="News" tvg-logo="" group-title="Extras",Notícias
https://iptv-org.github.io/iptv/categories/news.m3u
#EXTINF:-1 tvg-id="iptv-org-outdoor" tvg-name="Outdoor" tvg-logo="" group-title="Extras",Atividades ao ar livre
https://iptv-org.github.io/iptv/categories/outdoor.m3u
#EXTINF:-1 tvg-id="iptv-org-public" tvg-name="Public" tvg-logo="" group-title="Extras",Público
https://iptv-org.github.io/iptv/categories/public.m3u
#EXTINF:-1 tvg-id="iptv-org-relax" tvg-name="Relax" tvg-logo="" group-title="Extras",Relaxe
https://iptv-org.github.io/iptv/categories/relax.m3u
#EXTINF:-1 tvg-id="iptv-org-religious" tvg-name="Religious" tvg-logo="" group-title="Extras",Religioso
https://iptv-org.github.io/iptv/categories/religious.m3u
#EXTINF:-1 tvg-id="iptv-org-science" tvg-name="Science" tvg-logo="" group-title="Extras",Ciência
https://iptv-org.github.io/iptv/categories/science.m3u
#EXTINF:-1 tvg-id="iptv-org-series" tvg-name="Series" tvg-logo="" group-title="Extras",Séries
https://iptv-org.github.io/iptv/categories/series.m3u
#EXTINF:-1 tvg-id="iptv-org-shop" tvg-name="Shop" tvg-logo="" group-title="Extras",Loja
https://iptv-org.github.io/iptv/categories/shop.m3u
#EXTINF:-1 tvg-id="iptv-org-sports" tvg-name="Sports" tvg-logo="" group-title="Esportes",Esportes (IPTV-Org)
https://iptv-org.github.io/iptv/categories/sports.m3u
#EXTINF:-1 tvg-id="iptv-org-travel" tvg-name="Travel" tvg-logo="" group-title="Extras",Viagens
https://iptv-org.github.io/iptv/categories/travel.m3u
#EXTINF:-1 tvg-id="iptv-org-weather" tvg-name="Weather" tvg-logo="" group-title="Extras",Clima
https://iptv-org.github.io/iptv/categories/weather.m3u
#EXTINF:-1 tvg-id="iptv-org-undefined" tvg-name="Undefined" tvg-logo="" group-title="Extras",Indefinido
https://iptv-org.github.io/iptv/categories/undefined.m3u
#EXTINF:-1 tvg-id="iptv-org-por" tvg-name="Portuguese" tvg-logo="" group-title="Extras",Português (IPTV-Org)
https://iptv-org.github.io/iptv/languages/por.m3u
#EXTINF:-1 tvg-id="gist-extra" tvg-name="Conteúdo Adicional Gist" tvg-logo="" group-title="Extras",Conteúdo Adicional
https://gist.githubusercontent.com/jfmarcos/2d9b72f11d50587694a42fb46acc8055/raw/
#EXTINF:-1 tvg-id="gist-extra-2" tvg-name="Conteúdo Adicional Gist 2" tvg-logo="" group-title="Extras",Conteúdo Adicional 2
https://gist.githubusercontent.com/cdsmatheus/5344135de637b735029f4cf1bee66563/raw/`;

class CineStreamerApp {
  constructor() {
    this.playlists = this.loadStorage(STORAGE_KEYS.PLAYLISTS, []);
    this.activePlaylistId = localStorage.getItem(STORAGE_KEYS.ACTIVE_PLAYLIST_ID) || null;
    this.favorites = this.loadStorage(STORAGE_KEYS.FAVORITES, []);
    this.history = this.loadStorage(STORAGE_KEYS.HISTORY, []);
    this.settings = Object.assign({}, DEFAULT_SETTINGS, this.loadStorage(STORAGE_KEYS.SETTINGS, {}));

    this.currentItems = [];
    this.activeTab = 'all';
    this.selectedCategory = '__ALL__';
    this.searchQuery = '';
    this.sortBy = 'default';
    this.currentPage = 1;
    this.viewMode = 'grid';

    this.currentStreamIndex = -1;
    this.hlsInstance = null;
    this.mpegtsInstance = null;
    this.aspectModeIndex = 0;
    this.aspectModes = ['fit-contain', 'fit-cover', 'fit-fill'];

    this.initElements();
    this.bindEvents();
    this.initApp();
  }

  loadStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      this.showToast('Erro ao salvar no armazenamento local', 'error');
    }
  }

  initElements() {
    this.elements = {
      sidebar: document.getElementById('sidebar'),
      menuToggle: document.getElementById('menu-toggle'),
      navItems: document.querySelectorAll('.nav-item'),
      categoryList: document.getElementById('category-list'),
      categoriesCount: document.getElementById('categories-count'),
      searchInput: document.getElementById('search-input'),
      clearSearchBtn: document.getElementById('clear-search'),
      activePlaylistName: document.getElementById('active-playlist-name'),
      emptyState: document.getElementById('empty-state'),
      streamView: document.getElementById('stream-view'),
      itemsContainer: document.getElementById('items-container'),
      paginationWrapper: document.getElementById('pagination-wrapper'),
      sortSelect: document.getElementById('sort-select'),
      viewToggleBtns: document.querySelectorAll('.view-toggle-btn'),
      viewTitle: document.getElementById('view-title'),
      viewSubtitle: document.getElementById('view-subtitle'),

      // Counters
      countAll: document.getElementById('count-all'),
      countMovies: document.getElementById('count-movies'),
      countSeries: document.getElementById('count-series'),
      countChannels: document.getElementById('count-channels'),
      countFavorites: document.getElementById('count-favorites'),
      countHistory: document.getElementById('count-history'),

      // Player
      playerOverlay: document.getElementById('player-overlay'),
      videoElement: document.getElementById('video-element'),
      playerTitle: document.getElementById('player-title'),
      playerGroup: document.getElementById('player-group'),
      playerQualitySelect: document.getElementById('player-quality-select'),
      playerAspectBtn: document.getElementById('player-aspect-btn'),
      playerFullscreenBtn: document.getElementById('player-fullscreen-btn'),
      playerFavBtn: document.getElementById('player-fav-btn'),
      playerPipBtn: document.getElementById('player-pip-btn'),
      playerExternalBtn: document.getElementById('player-external-btn'),
      playerCloseBtn: document.getElementById('player-close-btn'),
      playerLoader: document.getElementById('player-loader'),
      playerError: document.getElementById('player-error'),
      playerRetryBtn: document.getElementById('player-retry-btn'),
      playerVlcLink: document.getElementById('player-vlc-link'),
      prevChannelBtn: document.getElementById('prev-channel-btn'),
      nextChannelBtn: document.getElementById('next-channel-btn'),
      streamUrlPreview: document.getElementById('stream-url-preview'),

      // Modals
      playlistsModal: document.getElementById('playlists-modal'),
      settingsModal: document.getElementById('settings-modal'),
      openPlaylistsBtn: document.getElementById('open-playlists-modal'),
      openSettingsBtn: document.getElementById('open-settings-modal'),
      quickAddBtn: document.getElementById('quick-add-btn'),
      emptyAddBtn: document.getElementById('empty-add-btn'),
      emptyDemoBtn: document.getElementById('empty-demo-btn'),
      emptyBrLiveBtn: document.getElementById('empty-br-live-btn'),
      emptyBrVodBtn: document.getElementById('empty-br-vod-btn'),
      btnLoadPresetLive: document.getElementById('btn-load-preset-live'),
      btnLoadPresetVod: document.getElementById('btn-load-preset-vod'),
      btnLoadPresetGlobal: document.getElementById('btn-load-preset-global'),
      modalCloseBtns: document.querySelectorAll('.modal-close, .modal-backdrop'),

      // Forms
      formUrlPlaylist: document.getElementById('form-url-playlist'),
      urlNameInput: document.getElementById('url-name'),
      urlLinkInput: document.getElementById('url-link'),
      urlCorsCheckbox: document.getElementById('url-cors-proxy'),
      btnLoadUrl: document.getElementById('btn-load-url'),

      playlistFileInput: document.getElementById('playlist-file-input'),
      filePlaylistName: document.getElementById('file-playlist-name'),
      btnLoadFile: document.getElementById('btn-load-file'),
      fileDropZone: document.getElementById('file-drop-zone'),

      formXtream: document.getElementById('form-xtream'),
      xcServer: document.getElementById('xc-server'),
      xcUser: document.getElementById('xc-user'),
      xcPass: document.getElementById('xc-pass'),

      savedPlaylistsContainer: document.getElementById('saved-playlists-container'),

      // Settings Inputs
      settingCorsProxy: document.getElementById('setting-cors-proxy'),
      settingPageSize: document.getElementById('setting-page-size'),
       settingAutoplay: document.getElementById('setting-autoplay'),
       btnClearData: document.getElementById('btn-clear-data'),
       toastContainer: document.getElementById('toast-container')
     };
   }

  bindEvents() {
    // Menu mobile
    if (this.elements.menuToggle) {
      this.elements.menuToggle.addEventListener('click', () => {
        this.elements.sidebar.classList.toggle('open');
      });
    }

    // Tabs
    this.elements.navItems.forEach(btn => {
      btn.addEventListener('click', () => {
        this.elements.navItems.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTab = btn.dataset.tab;
        this.selectedCategory = '__ALL__';
        this.currentPage = 1;
        this.renderCategoryList();
        this.renderItems();
        if (window.innerWidth <= 900) {
          this.elements.sidebar.classList.remove('open');
        }
      });
    });

    // Search
    this.elements.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.elements.clearSearchBtn.classList.toggle('hidden', !this.searchQuery);
      this.currentPage = 1;
      this.renderItems();
    });

    this.elements.clearSearchBtn.addEventListener('click', () => {
      this.elements.searchInput.value = '';
      this.searchQuery = '';
      this.elements.clearSearchBtn.classList.add('hidden');
      this.currentPage = 1;
      this.renderItems();
    });

    // Sort
    this.elements.sortSelect.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.currentPage = 1;
      this.renderItems();
    });

    // View Mode
    this.elements.viewToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.elements.viewToggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.viewMode = btn.dataset.mode;
        this.elements.itemsContainer.className = `items-grid ${this.viewMode === 'list' ? 'list-view' : ''}`;
      });
    });

    // Modals
    const openModal = (modal) => modal.classList.remove('hidden');
    const closeModal = (modal) => modal.classList.add('hidden');

    this.elements.openPlaylistsBtn.addEventListener('click', () => {
      this.renderSavedPlaylists();
      openModal(this.elements.playlistsModal);
    });
    this.elements.quickAddBtn.addEventListener('click', () => {
      this.renderSavedPlaylists();
      openModal(this.elements.playlistsModal);
    });
    this.elements.emptyAddBtn.addEventListener('click', () => {
      this.renderSavedPlaylists();
      openModal(this.elements.playlistsModal);
    });
    this.elements.openSettingsBtn.addEventListener('click', () => {
      this.loadSettingsToUI();
      openModal(this.elements.settingsModal);
    });

    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = btn.getAttribute('data-close');
        const modal = document.getElementById(modalId);
        if (modal) closeModal(modal);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', () => {
        backdrop.closest('.modal').classList.add('hidden');
      });
    });

    // Modal Tabs (URL, File, Xtream)
    document.querySelectorAll('.modal-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.target);
        if (target) target.classList.add('active');
      });
    });

    // Preset buttons in empty state & modal
    const loadPresetFile = async (filePath, title) => {
      try {
        this.showToast(`Carregando ${title}...`, 'info');
        const res = await fetch(filePath);
        if (res.ok) {
          const text = await res.text();
          this.importPlaylistString(text, title);
          closeModal(this.elements.playlistsModal);
        } else {
          this.showToast(`Erro ao carregar ${title}`, 'error');
        }
      } catch (e) {
        console.error(e);
        this.showToast(`Falha ao obter lista: ${e.message}`, 'error');
      }
    };

    if (this.elements.emptyBrLiveBtn) {
      this.elements.emptyBrLiveBtn.addEventListener('click', () => loadPresetFile('brazil.m3u', 'Canais Ao Vivo Brasil'));
    }
    if (this.elements.btnLoadPresetLive) {
      this.elements.btnLoadPresetLive.addEventListener('click', () => loadPresetFile('brazil.m3u', 'Canais Ao Vivo Brasil'));
    }

    if (this.elements.emptyBrVodBtn) {
      this.elements.emptyBrVodBtn.addEventListener('click', () => loadPresetFile('playlist_brasil.m3u', 'Filmes, Séries & Animes BR'));
    }
    if (this.elements.btnLoadPresetVod) {
      this.elements.btnLoadPresetVod.addEventListener('click', () => loadPresetFile('playlist_brasil.m3u', 'Filmes, Séries & Animes BR'));
    }

    if (this.elements.emptyDemoBtn) {
      this.elements.emptyDemoBtn.addEventListener('click', () => {
        this.importPlaylistString(DEMO_PLAYLIST_CONTENT, 'IPTV-Org Global');
      });
    }
    if (this.elements.btnLoadPresetGlobal) {
      this.elements.btnLoadPresetGlobal.addEventListener('click', () => {
        this.importPlaylistString(DEMO_PLAYLIST_CONTENT, 'IPTV-Org Global');
        closeModal(this.elements.playlistsModal);
      });
    }

    // URL Form
    this.elements.formUrlPlaylist.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = this.elements.urlNameInput.value.trim();
      let url = this.elements.urlLinkInput.value.trim();
      const useProxy = this.elements.urlCorsCheckbox.checked;

      if (!url) return;
      this.elements.btnLoadUrl.disabled = true;
      this.elements.btnLoadUrl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Baixando...';

      try {
        let fetchUrl = url;
        if (useProxy) {
          fetchUrl = `${this.settings.corsProxy}${encodeURIComponent(url)}`;
        }
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const text = await response.text();
        this.importPlaylistString(text, name || url, url);
        closeModal(this.elements.playlistsModal);
        this.elements.formUrlPlaylist.reset();
      } catch (err) {
        console.error(err);
        this.showToast('Erro ao baixar lista. Tente marcar a opção de Proxy CORS.', 'error');
      } finally {
        this.elements.btnLoadUrl.disabled = false;
        this.elements.btnLoadUrl.innerHTML = '<i class="fa-solid fa-download"></i> Baixar e Salvar Lista';
      }
    });

    // File Drop & Select
    this.elements.playlistFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.elements.btnLoadFile.disabled = false;
        this.elements.fileDropZone.querySelector('h3').textContent = `Selecionado: ${file.name}`;
      }
    });

    this.elements.btnLoadFile.addEventListener('click', () => {
      const file = this.elements.playlistFileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const name = this.elements.filePlaylistName.value.trim() || file.name.replace(/\.[^/.]+$/, '');
        this.importPlaylistString(text, name);
        closeModal(this.elements.playlistsModal);
        this.elements.playlistFileInput.value = '';
        this.elements.filePlaylistName.value = '';
        this.elements.btnLoadFile.disabled = true;
        this.elements.fileDropZone.querySelector('h3').textContent = 'Arraste e solte o arquivo .m3u, .m3u8 ou .json aqui';
      };
      reader.readAsText(file);
    });

    // Xtream Codes API Form
    this.elements.formXtream.addEventListener('submit', async (e) => {
      e.preventDefault();
      const server = this.elements.xcServer.value.replace(/\/$/, '').trim();
      const user = this.elements.xcUser.value.trim();
      const pass = this.elements.xcPass.value.trim();
      const btn = document.getElementById('btn-load-xtream');

      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Conectando...';

      try {
        const authUrl = `${server}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;
        const authRes = await fetch(authUrl);
        const authData = await authRes.json();

        if (authData.user_info && authData.user_info.auth === 1) {
          // Import channels (live)
          const liveUrl = `${server}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}&action=get_live_streams`;
          const liveRes = await fetch(liveUrl);
          const liveData = await liveRes.json();
          this.importPlaylistString(JSON.stringify(liveData), `Xtream: ${user}@${new URL(server).hostname}`);
          
          closeModal(this.elements.playlistsModal);
          this.elements.formXtream.reset();
        } else {
          throw new Error('Credenciais inválidas ou erro no servidor');
        }
      } catch (err) {
        console.error(err);
        this.showToast('Falha na conexão Xtream Codes: ' + err.message, 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-plug"></i> Conectar Xtream API';
      }
    });

    // Player Controls
    this.elements.playerCloseBtn.addEventListener('click', () => this.closePlayer());
    this.elements.playerRetryBtn.addEventListener('click', () => {
      if (this.currentStreamIndex >= 0) {
        this.playItem(this.getFilteredItems()[this.currentStreamIndex]);
      }
    });

    this.elements.prevChannelBtn.addEventListener('click', () => this.navigateChannel(-1));
    this.elements.nextChannelBtn.addEventListener('click', () => this.navigateChannel(1));

    this.elements.playerFavBtn.addEventListener('click', () => {
      const item = this.getFilteredItems()[this.currentStreamIndex];
      if (item) {
        this.toggleFavorite(item);
        this.updatePlayerFavState(item);
      }
    });

    if (this.elements.playerAspectBtn) {
      this.elements.playerAspectBtn.addEventListener('click', () => {
        this.aspectModeIndex = (this.aspectModeIndex + 1) % this.aspectModes.length;
        const currentMode = this.aspectModes[this.aspectModeIndex];
        this.elements.videoElement.className = currentMode;
        this.showToast(`Proporção de vídeo: ${currentMode.replace('fit-', '').toUpperCase()}`, 'info');
      });
    }

    if (this.elements.playerFullscreenBtn) {
      this.elements.playerFullscreenBtn.addEventListener('click', () => {
        const videoWrap = this.elements.videoElement.closest('.video-wrapper') || this.elements.videoElement;
        if (!document.fullscreenElement) {
          if (videoWrap.requestFullscreen) videoWrap.requestFullscreen();
          else if (videoWrap.webkitRequestFullscreen) videoWrap.webkitRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });
    }

    if (this.elements.playerQualitySelect) {
      this.elements.playerQualitySelect.addEventListener('change', (e) => {
        if (this.hlsInstance) {
          const val = e.target.value;
          this.hlsInstance.currentLevel = val === 'auto' ? -1 : parseInt(val, 10);
        }
      });
    }

    this.elements.playerPipBtn.addEventListener('click', async () => {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
          await this.elements.videoElement.requestPictureInPicture();
        }
      } catch (err) {
        this.showToast('Picture-in-Picture não suportado neste navegador.', 'error');
      }
    });

    this.elements.playerExternalBtn.addEventListener('click', () => {
      const item = this.getFilteredItems()[this.currentStreamIndex];
      if (item) {
        window.open(item.url, '_blank');
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      const isPlayerOpen = !this.elements.playerOverlay.classList.contains('hidden');

      if (e.key === 'Escape') {
        if (isPlayerOpen) {
          this.closePlayer();
        }
        document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
        return;
      }

      // Player specific shortcuts if overlay is active
      if (isPlayerOpen) {
        const video = this.elements.videoElement;
        const target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return;

        if (e.code === 'Space') {
          e.preventDefault();
          if (video.paused) video.play();
          else video.pause();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          video.volume = Math.min(1, video.volume + 0.1);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          video.volume = Math.max(0, video.volume - 0.1);
        } else if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          if (this.elements.playerFullscreenBtn) this.elements.playerFullscreenBtn.click();
        } else if (e.key === 'm' || e.key === 'M') {
          e.preventDefault();
          video.muted = !video.muted;
          this.showToast(video.muted ? 'Áudio Mudo' : 'Áudio Ativado', 'info');
        }
      }
    });

    // Backup & Restore
    const btnExport = document.getElementById('btn-export-data');
    if (btnExport) {
      btnExport.onclick = () => {
        const backupData = {
          playlists: this.playlists,
          activePlaylistId: this.activePlaylistId,
          favorites: this.favorites,
          history: this.history,
          settings: this.settings,
          progress: this.loadStorage(STORAGE_KEYS.PROGRESS, {})
        };
        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `cine_backup_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        this.showToast('Backup exportado com sucesso!', 'success');
      };
    }

    const btnImport = document.getElementById('btn-import-data');
    const importFile = document.getElementById('import-data-file');
    if (btnImport && importFile) {
      btnImport.onclick = () => importFile.click();
      importFile.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const data = JSON.parse(evt.target.result);
            if (data.playlists) localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(data.playlists));
            if (data.activePlaylistId) localStorage.setItem(STORAGE_KEYS.ACTIVE_PLAYLIST_ID, data.activePlaylistId);
            if (data.favorites) localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(data.favorites));
            if (data.history) localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(data.history));
            if (data.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
            if (data.progress) localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data.progress));
            
            this.showToast('Dados restaurados com sucesso! Recarregando...', 'success');
            setTimeout(() => location.reload(), 1200);
          } catch (err) {
            this.showToast('Erro ao ler arquivo de backup.', 'error');
          }
        };
        reader.readAsText(file);
      };
    }
    this.elements.settingPageSize.addEventListener('change', (e) => {
      this.settings.pageSize = parseInt(e.target.value, 10) || 60;
      this.saveStorage(STORAGE_KEYS.SETTINGS, this.settings);
      this.currentPage = 1;
      this.renderItems();
    });
    this.elements.settingAutoplay.addEventListener('change', (e) => {
      this.settings.autoplay = e.target.checked;
      this.saveStorage(STORAGE_KEYS.SETTINGS, this.settings);
    });
    this.elements.btnClearData.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja apagar todas as listas e configurações?')) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  async initApp() {
    // Lista de arquivos locais que devem ser carregados obrigatoriamente
    const arquivosLocais = [
      { path: 'brazil.m3u', name: 'Canais Ao Vivo Brasil' },
      { path: 'playlist_brasil.m3u', name: 'Filmes, Séries & Animes BR' }
    ];

    if (!this.playlists.length) {
      this.showToast('Carregando listas locais do sistema...', 'info');
      
      for (const arquivo of arquivosLocais) {
        try {
          const res = await fetch(arquivo.path);
          if (res.ok) {
            const text = await res.text();
            this.importPlaylistString(text, arquivo.name);
          }
        } catch (e) {
          console.error(`Erro ao carregar ${arquivo.path}:`, e);
        }
      }
      
      // Fallback global caso algum arquivo falhe
      if (!this.playlists.length) {
         this.importPlaylistString(DEMO_PLAYLIST_CONTENT, 'IPTV-Org Global');
      }
      return;
    }
    this.loadActivePlaylist();
    this.updateCounters();
  }

  loadActivePlaylist() {
    if (!this.playlists.length) {
      this.elements.emptyState.classList.remove('hidden');
      this.elements.streamView.classList.add('hidden');
      this.elements.activePlaylistName.textContent = 'Nenhuma lista carregada';
      return;
    }

    let pl = this.playlists.find(p => p.id === this.activePlaylistId);
    if (!pl) {
      pl = this.playlists[0];
      this.activePlaylistId = pl.id;
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PLAYLIST_ID, pl.id);
    }

    this.elements.activePlaylistName.textContent = pl.name;
    this.currentItems = pl.items || [];
    this.elements.emptyState.classList.add('hidden');
    this.elements.streamView.classList.remove('hidden');

    this.renderCategoryList();
    this.renderItems();
    this.updateCounters();
  }

  parsePlaylist(content, name = 'Imported Playlist', sourceUrl = '') {
    // Try to detect format
    if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
      try {
        const data = JSON.parse(content);
        return this.parseJSONPlaylist(data, name, sourceUrl);
      } catch (e) {
        console.error('Failed to parse JSON, falling back to M3U', e);
      }
    }
    return this.parseM3U(content);
  }

  parseJSONPlaylist(data, name, sourceUrl) {
    const items = [];
    // Assume basic JSON structure: array of objects { name, url, group, logo, type }
    // Or Xtream codes API structure if detected
    const list = Array.isArray(data) ? data : (data.vod_streams || data.live_streams || []);
    
    list.forEach(item => {
      items.push({
        id: 'item_' + Math.random().toString(36).substr(2, 9),
        name: item.name || item.title || 'Sem nome',
        url: item.stream_url || item.url || '',
        logo: item.stream_icon || item.logo || '',
        group: item.category_name || item.group || 'Geral',
        type: item.type || (item.stream_type === 'movie' ? 'movie' : 'channel')
      });
    });
    return items;
  }

  parseM3U(content) {
    const lines = content.split(/\r?\n/);
    const items = [];
    let currentItem = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      if (line.startsWith('#EXTINF:')) {
        currentItem = {
          id: 'item_' + Math.random().toString(36).substr(2, 9),
          name: 'Sem nome',
          logo: '',
          group: 'Geral',
          url: '',
          type: 'channel' // channel, movie, series
        };

        // Extract metadata
        const tvgNameMatch = line.match(/tvg-name="([^"]+)"/i);
        const tvgLogoMatch = line.match(/tvg-logo="([^"]+)"/i);
        const groupTitleMatch = line.match(/group-title="([^"]+)"/i);
        const tvgIdMatch = line.match(/tvg-id="([^"]+)"/i);

        if (tvgLogoMatch) currentItem.logo = tvgLogoMatch[1];
        if (groupTitleMatch) currentItem.group = groupTitleMatch[1];
        if (tvgIdMatch) currentItem.tvgId = tvgIdMatch[1];

        // Title after comma
        const commaIdx = line.lastIndexOf(',');
        if (commaIdx !== -1) {
          const rawTitle = line.substring(commaIdx + 1).trim();
          if (rawTitle) currentItem.name = rawTitle;
        } else if (tvgNameMatch) {
          currentItem.name = tvgNameMatch[1];
        }

        // Categorize type automatically
        const groupLow = (currentItem.group || '').toLowerCase();
        const nameLow = (currentItem.name || '').toLowerCase();

        if (groupLow.includes('filme') || groupLow.includes('movie') || groupLow.includes('vod') || groupLow.includes('cinema')) {
          currentItem.type = 'movie';
        } else if (groupLow.includes('serie') || groupLow.includes('season') || groupLow.includes('temporada') || groupLow.includes('ep')) {
          currentItem.type = 'series';
        } else {
          currentItem.type = 'channel';
        }
      } else if (!line.startsWith('#') && currentItem) {
        currentItem.url = line;
        items.push(currentItem);
        currentItem = null;
      }
    }

    return items;
  }

  importPlaylistString(content, name = 'Minha Lista', sourceUrl = '') {
    const items = this.parsePlaylist(content, name, sourceUrl);
    if (!items.length) {
      this.showToast('Nenhum canal ou vídeo encontrado na lista.', 'error');
      return;
    }

    const newPlaylist = {
      id: 'pl_' + Date.now(),
      name: name,
      items: items,
      sourceUrl: sourceUrl,
      updatedAt: new Date().toLocaleDateString('pt-BR')
    };

    this.playlists.push(newPlaylist);
    this.activePlaylistId = newPlaylist.id;
    this.saveStorage(STORAGE_KEYS.PLAYLISTS, this.playlists);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PLAYLIST_ID, this.activePlaylistId);

    this.showToast(`Lista "${name}" importada com sucesso!`, 'success');
    this.loadActivePlaylist();
  }

  getFilteredItems() {
    let list = this.currentItems;

    // Handle Favorites Tab
    if (this.activeTab === 'favorites') {
      const favUrls = new Set(this.favorites.map(f => f.url));
      list = list.filter(it => favUrls.has(it.url));
    } else if (this.activeTab === 'history') {
      const historyUrls = new Map(this.history.map(h => [h.url, h]));
      list = list.filter(it => historyUrls.has(it.url)).sort((a, b) => {
        return (historyUrls.get(b.url)?.timestamp || 0) - (historyUrls.get(a.url)?.timestamp || 0);
      });
    } else if (this.activeTab === 'movies') {
      list = list.filter(it => it.type === 'movie');
    } else if (this.activeTab === 'series') {
      list = list.filter(it => it.type === 'series');
    } else if (this.activeTab === 'channels') {
      list = list.filter(it => it.type === 'channel');
    }

    // Filter by Category
    if (this.selectedCategory !== '__ALL__') {
      list = list.filter(it => it.group === this.selectedCategory);
    }

    // Filter by Search Query
    if (this.searchQuery) {
      list = list.filter(it =>
        it.name.toLowerCase().includes(this.searchQuery) ||
        (it.group && it.group.toLowerCase().includes(this.searchQuery))
      );
    }

    // Sort
    if (this.sortBy === 'name-asc') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'name-desc') {
      list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.sortBy === 'group') {
      list = [...list].sort((a, b) => (a.group || '').localeCompare(b.group || ''));
    }

    return list;
  }

  renderCategoryList() {
    let sourceList = this.currentItems;
    if (this.activeTab === 'movies') sourceList = sourceList.filter(it => it.type === 'movie');
    else if (this.activeTab === 'series') sourceList = sourceList.filter(it => it.type === 'series');
    else if (this.activeTab === 'channels') sourceList = sourceList.filter(it => it.type === 'channel');

    const categories = {};
    sourceList.forEach(it => {
      const cat = it.group || 'Geral';
      categories[cat] = (categories[cat] || 0) + 1;
    });

    const sortedCats = Object.keys(categories).sort((a, b) => a.localeCompare(b));
    this.elements.categoriesCount.textContent = sortedCats.length;

    let html = `
      <button class="cat-pill ${this.selectedCategory === '__ALL__' ? 'active' : ''}" data-cat="__ALL__">
        Todas as categorias (${sourceList.length})
      </button>
    `;

    sortedCats.forEach(cat => {
      const isActive = this.selectedCategory === cat ? 'active' : '';
      html += `
        <button class="cat-pill ${isActive}" data-cat="${this.escapeHtml(cat)}" title="${this.escapeHtml(cat)}">
          ${this.escapeHtml(cat)} (${categories[cat]})
        </button>
      `;
    });

    this.elements.categoryList.innerHTML = html;

    this.elements.categoryList.querySelectorAll('.cat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.elements.categoryList.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedCategory = btn.getAttribute('data-cat');
        this.currentPage = 1;
        this.renderItems();
      });
    });
  }

  renderItems() {
    const filtered = this.getFilteredItems();
    const pageSize = this.settings.pageSize || 60;
    const totalPages = Math.ceil(filtered.length / pageSize) || 1;

    if (this.currentPage > totalPages) this.currentPage = 1;

    const start = (this.currentPage - 1) * pageSize;
    const paginatedItems = filtered.slice(start, start + pageSize);

    // Update Titles
    const titles = {
      all: 'Todos os Conteúdos',
      movies: 'Filmes & VOD',
      series: 'Séries de TV',
      channels: 'Canais Ao Vivo',
      favorites: 'Meus Favoritos',
      history: 'Histórico Recente'
    };
    this.elements.viewTitle.textContent = titles[this.activeTab] || 'Transmissões';
    this.elements.viewSubtitle.textContent = `Exibindo ${filtered.length} itens encontrados`;

    if (!paginatedItems.length) {
      this.elements.itemsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.4;"></i>
          <p>Nenhum resultado encontrado para o filtro atual.</p>
        </div>
      `;
      this.elements.paginationWrapper.innerHTML = '';
      return;
    }

    const favSet = new Set(this.favorites.map(f => f.url));
    const progressData = this.loadStorage(STORAGE_KEYS.PROGRESS, {});

    let html = '';
    paginatedItems.forEach((item, idx) => {
      const globalIndex = start + idx;
      const isFav = favSet.has(item.url);
      const isVod = item.type === 'movie' || item.type === 'series';
      const progress = progressData[item.url] || { percent: 0 };
      
      const progressBar = (isVod && progress.percent > 2)
        ? `<div class="progress-bar-container"><div class="progress-bar-fill" style="width: ${progress.percent}%"></div></div>`
        : '';

      const logoHtml = item.logo
        ? `<img src="${this.escapeHtml(item.logo)}" alt="${this.escapeHtml(item.name)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
           <div class="poster-placeholder" style="display:none;"><i class="fa-solid ${isVod ? 'fa-film' : 'fa-tv'}"></i></div>`
        : `<div class="poster-placeholder"><i class="fa-solid ${isVod ? 'fa-film' : 'fa-tv'}"></i></div>`;

      html += `
        <div class="stream-card ${isVod ? 'is-vod' : ''}" data-index="${globalIndex}">
          <div class="stream-card-poster">
            ${logoHtml}
            ${progressBar}
            <div class="card-play-overlay">
              <i class="fa-solid fa-circle-play"></i>
            </div>
            <button class="card-fav-btn ${isFav ? 'is-favorite' : ''}" title="Favoritar" data-fav-url="${this.escapeHtml(item.url)}">
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
          <div class="stream-card-body">
            <h4 class="stream-title" title="${this.escapeHtml(item.name)}">${this.escapeHtml(item.name)}</h4>
            <div class="stream-meta">
              <span class="stream-category" title="${this.escapeHtml(item.group || 'Geral')}">${this.escapeHtml(item.group || 'Geral')}</span>
              <span><i class="fa-solid ${isVod ? 'fa-video' : 'fa-broadcast-tower'}"></i></span>
            </div>
          </div>
        </div>
      `;
    });

    this.elements.itemsContainer.innerHTML = html;

    // Attach card click events
    this.elements.itemsContainer.querySelectorAll('.stream-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-fav-btn')) return;
        const index = parseInt(card.getAttribute('data-index'), 10);
        this.openPlayer(index);
      });
    });

    // Favorite click events
    this.elements.itemsContainer.querySelectorAll('.card-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = btn.getAttribute('data-fav-url');
        const item = this.currentItems.find(i => i.url === url);
        if (item) {
          this.toggleFavorite(item);
          btn.classList.toggle('is-favorite');
        }
      });
    });

    this.renderPagination(totalPages);
  }

  renderPagination(totalPages) {
    if (totalPages <= 1) {
      this.elements.paginationWrapper.innerHTML = '';
      return;
    }

    let html = '';
    if (this.currentPage > 1) {
      html += `<button class="page-btn" data-page="${this.currentPage - 1}"><i class="fa-solid fa-chevron-left"></i></button>`;
    }

    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let p = startPage; p <= endPage; p++) {
      html += `<button class="page-btn ${p === this.currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }

    if (this.currentPage < totalPages) {
      html += `<button class="page-btn" data-page="${this.currentPage + 1}"><i class="fa-solid fa-chevron-right"></i></button>`;
    }

    this.elements.paginationWrapper.innerHTML = html;

    this.elements.paginationWrapper.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentPage = parseInt(btn.getAttribute('data-page'), 10);
        this.renderItems();
        this.elements.streamView.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  openPlayer(index) {
    const list = this.getFilteredItems();
    if (!list[index]) return;

    this.currentStreamIndex = index;
    const item = list[index];

    this.elements.playerOverlay.classList.remove('hidden');
    this.playItem(item);
  }

  playItem(item) {
    this.elements.playerTitle.textContent = item.name;
    this.elements.playerGroup.textContent = item.group || 'Geral';
    this.elements.streamUrlPreview.textContent = item.url;
    this.elements.playerVlcLink.href = 'vlc://' + item.url;

    this.updatePlayerFavState(item);
    this.addToHistory(item);

    this.elements.playerLoader.classList.remove('hidden');
    this.elements.playerError.classList.add('hidden');

    const video = this.elements.videoElement;

    // Destrói instância anterior
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }

    // Speed select listener
    const speedSelect = document.getElementById('player-speed-select');
    if (speedSelect) {
      speedSelect.onchange = (e) => {
        this.elements.videoElement.playbackRate = parseFloat(e.target.value);
      };
    }

    // Save progress on timeupdate
    this.elements.videoElement.ontimeupdate = () => {
      const v = this.elements.videoElement;
      if (v.duration && !isNaN(v.duration)) {
        const percent = (v.currentTime / v.duration) * 100;
        if (percent > 1 && percent < 98) {
          const progressData = this.loadStorage(STORAGE_KEYS.PROGRESS, {});
          progressData[item.url] = {
            currentTime: v.currentTime,
            duration: v.duration,
            percent: Math.round(percent)
          };
          this.saveStorage(STORAGE_KEYS.PROGRESS, progressData);
        }
      }
    };

    // Tentar carregamento nativo prioritário (fluxo direto)
    video.src = item.url;
    video.load();
    
    video.oncanplay = () => {
        this.elements.playerLoader.classList.add('hidden');
        video.play().catch(e => {
            console.log("Reprodução nativa precisa de fallback, acionando engines...");
            this.acelerarFluxo(item);
        });
    };

    video.onerror = () => {
        this.acelerarFluxo(item);
    };
  }

  acelerarFluxo(item) {
    // Se for link complexo, força o uso do proxy configurado nas configurações para evitar bloqueio CORS
    if (item.url.includes('stitcher-ipv4.pluto.tv') || item.url.includes('samsung')) {
        const proxyUrl = `${this.settings.corsProxy}${encodeURIComponent(item.url)}`;
        this.setupShakaPlayer(this.elements.videoElement, proxyUrl);
    } else if (item.url.includes('.m3u8')) {
        this.setupHls(this.elements.videoElement, item);
    } else if (item.url.includes('.ts')) {
        this.setupMpegTs(this.elements.videoElement, item);
    } else {
        this.setupShakaPlayer(this.elements.videoElement, item.url);
    }
  }

  setupHls(video, item) {
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    this.hlsInstance = new Hls();
    this.hlsInstance.loadSource(item.url);
    this.hlsInstance.attachMedia(video);
    this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => video.play());
  }

  setupMpegTs(video, item) {
    if (this.mpegtsInstance) {
      this.mpegtsInstance.destroy();
      this.mpegtsInstance = null;
    }
    this.mpegtsInstance = mpegts.createPlayer({
      type: 'mpegts',
      url: item.url
    });
    this.mpegtsInstance.attachMediaElement(video);
    this.mpegtsInstance.load();
    this.mpegtsInstance.play().then(() => this.elements.playerLoader.classList.add('hidden')).catch(() => this.showPlayerError(item.url));
  }

  showPlayerError(url) {
    this.elements.playerLoader.classList.add('hidden');
    this.elements.playerError.classList.remove('hidden');
    
    // Configurar ações de erro
    const retryBtn = this.elements.playerRetryBtn;
    if (retryBtn) {
      retryBtn.onclick = () => {
        this.elements.playerLoader.classList.remove('hidden');
        this.elements.playerError.classList.add('hidden');
        
        // Tentativa final: Tentar forçar o Shaka Player mesmo com erro de CORS
        try {
            this.setupShakaPlayer(this.elements.videoElement, url);
        } catch (e) {
            // Se falhar, tenta via Proxy obrigatoriamente
            const proxyUrl = `${this.settings.corsProxy}${encodeURIComponent(url)}`;
            this.elements.videoElement.src = proxyUrl;
            this.elements.videoElement.load();
            this.elements.videoElement.play().then(() => {
                this.elements.playerLoader.classList.add('hidden');
            }).catch(() => {
                this.elements.playerLoader.classList.add('hidden');
                this.elements.playerError.classList.remove('hidden');
                this.showToast('Erro persistente no servidor do canal.', 'error');
            });
        }
      };
    }
    
    const vlcLink = document.getElementById('player-vlc-link');
    if (vlcLink) {
      vlcLink.href = 'vlc://' + url;
    }
  }

  setupShakaPlayer(video, url) {
    if (this.shakaPlayer) {
      this.shakaPlayer.destroy();
    }
    const player = new shaka.Player(video);
    this.shakaPlayer = player;

    // Configuração avançada para fluxos complexos como Pluto/Samsung
    player.configure({
        streaming: {
            retryParameters: { maxAttempts: 5 }
        },
        manifest: {
            retryParameters: { maxAttempts: 5 }
        }
    });

    player.addEventListener('error', (event) => {
      console.error('Shaka Player Error:', event);
      this.showPlayerError(url);
    });

    player.load(url).then(() => {
      this.elements.playerLoader.classList.add('hidden');
    }).catch(() => this.showPlayerError(url));
  }

  closePlayer() {
    this.elements.playerOverlay.classList.add('hidden');
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    if (this.mpegtsInstance) {
      this.mpegtsInstance.destroy();
      this.mpegtsInstance = null;
    }
    if (this.shakaPlayer) {
      this.shakaPlayer.destroy();
      this.shakaPlayer = null;
    }
    this.elements.videoElement.pause();
    this.elements.videoElement.removeAttribute('src');
    this.elements.videoElement.load();
    this.currentStreamIndex = -1;
  }

  navigateChannel(offset) {
    const list = this.getFilteredItems();
    const newIdx = this.currentStreamIndex + offset;
    if (newIdx >= 0 && newIdx < list.length) {
      this.currentStreamIndex = newIdx;
      this.playItem(list[newIdx]);
    } else {
      this.showToast('Fim da lista de reprodução.', 'info');
    }
  }

  toggleFavorite(item) {
    const idx = this.favorites.findIndex(f => f.url === item.url);
    if (idx > -1) {
      this.favorites.splice(idx, 1);
      this.showToast(`Removido dos favoritos: ${item.name}`, 'info');
    } else {
      this.favorites.push(item);
      this.showToast(`Adicionado aos favoritos: ${item.name}`, 'success');
    }
    this.saveStorage(STORAGE_KEYS.FAVORITES, this.favorites);
    this.updateCounters();
    if (this.activeTab === 'favorites') this.renderItems();
  }

  updatePlayerFavState(item) {
    const isFav = this.favorites.some(f => f.url === item.url);
    this.elements.playerFavBtn.innerHTML = isFav
      ? '<i class="fa-solid fa-heart" style="color:var(--accent);"></i>'
      : '<i class="fa-regular fa-heart"></i>';
  }

  addToHistory(item) {
    this.history = this.history.filter(h => h.url !== item.url);
    this.history.unshift({
      ...item,
      timestamp: Date.now()
    });
    if (this.history.length > 100) this.history.pop();
    this.saveStorage(STORAGE_KEYS.HISTORY, this.history);
    this.updateCounters();
  }

  updateCounters() {
    let movies = 0, series = 0, channels = 0;
    this.currentItems.forEach(i => {
      if (i.type === 'movie') movies++;
      else if (i.type === 'series') series++;
      else channels++;
    });

    this.elements.countAll.textContent = this.currentItems.length;
    this.elements.countMovies.textContent = movies;
    this.elements.countSeries.textContent = series;
    this.elements.countChannels.textContent = channels;
    this.elements.countFavorites.textContent = this.favorites.length;
    this.elements.countHistory.textContent = this.history.length;
  }

  renderSavedPlaylists() {
    const container = this.elements.savedPlaylistsContainer;
    if (!this.playlists.length) {
      container.innerHTML = '<p class="text-muted">Nenhuma lista salva no momento.</p>';
      return;
    }

    let html = '';
    this.playlists.forEach(pl => {
      const isActive = pl.id === this.activePlaylistId;
      html += `
        <div class="playlist-entry ${isActive ? 'active-item' : ''}">
          <div class="pl-info">
            <span class="pl-name">${this.escapeHtml(pl.name)} ${isActive ? '<span style="color:var(--accent);">(Ativa)</span>' : ''}</span>
            <span class="pl-meta">${pl.items.length} canais/vídeos • ${pl.updatedAt || 'Recente'}</span>
          </div>
          <div class="pl-actions">
            ${!isActive ? `<button class="btn btn-secondary btn-sm" onclick="app.switchPlaylist('${pl.id}')"><i class="fa-solid fa-check"></i> Ativar</button>` : ''}
            <button class="btn btn-danger btn-sm" onclick="app.deletePlaylist('${pl.id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  switchPlaylist(id) {
    this.activePlaylistId = id;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PLAYLIST_ID, id);
    this.loadActivePlaylist();
    this.renderSavedPlaylists();
    this.showToast('Lista ativada com sucesso!', 'success');
  }

  deletePlaylist(id) {
    if (!confirm('Deseja excluir esta lista?')) return;
    this.playlists = this.playlists.filter(p => p.id !== id);
    this.saveStorage(STORAGE_KEYS.PLAYLISTS, this.playlists);
    if (this.activePlaylistId === id) {
      this.activePlaylistId = this.playlists.length ? this.playlists[0].id : null;
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PLAYLIST_ID, this.activePlaylistId || '');
    }
    this.loadActivePlaylist();
    this.renderSavedPlaylists();
    this.showToast('Lista excluída.', 'info');
  }

  loadSettingsToUI() {
    this.elements.settingCorsProxy.value = this.settings.corsProxy || '';
    this.elements.settingPageSize.value = this.settings.pageSize || '60';
    this.elements.settingAutoplay.checked = !!this.settings.autoplay;
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? 'circle-check' : (type === 'error' ? 'triangle-exclamation' : 'info');
    toast.innerHTML = `<i class="fa-solid fa-${icon}"></i> <span>${this.escapeHtml(message)}</span>`;

    this.elements.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Global instance
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new CineStreamerApp();
});
