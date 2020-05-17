const urls = {
  login: { path: '/login', create: '/login', pageName: 'ログイン' },

  home: { path: '/', create: '/', pageName: 'TOP' },
} as const;

export default urls;
