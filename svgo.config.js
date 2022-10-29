module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'prefixIds',
      params: {
        overrides: {
          // or disable plugins
          removeViewBox: false,
        },
      },
    },
  ],
};
