import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  // next.js 이미지 로더와의 충돌방지
  webpackFinal: async (config: any) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/assets/',
            publicPath: 'static/assets/',
          },
        },
        {
          loader: 'url-loader',
          options: {
            limit: 8192, // 파일 크기가 8kb 이하인 경우 base64로 인코딩
            name: '[name].[ext]',
          },
        },
      ],
    });

    return config;
  },
};
export default config;
