import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import './index.css';
import App from './App';

// Fonte de corpo da marca
const FONT_BODY = "'Outfit', ui-sans-serif, system-ui, sans-serif";

/**
 * Tema Ant Design alinhado ao Design System da Climoo:
 * roxo #210856 como primária, cantos arredondados, botões em "pílula",
 * fundo azul-acinzentado e sombras suaves.
 */
const climooTheme = {
  token: {
    colorPrimary: '#210856',
    colorInfo: '#210856',
    colorLink: '#341472',
    colorLinkHover: '#9354e0',
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    fontFamily: FONT_BODY,
    colorBgLayout: '#e4ebf0',
    colorTextBase: '#1f2937',
    controlHeight: 38,
    boxShadowSecondary: '0 5px 28px rgba(0, 0, 0, 0.08)',
  },
  components: {
    Layout: {
      bodyBg: '#e4ebf0',
      headerBg: '#ffffff',
      siderBg: '#ffffff',
      headerHeight: 64,
      headerPadding: '0 24px',
    },
    Button: {
      borderRadius: 99,
      borderRadiusLG: 99,
      borderRadiusSM: 99,
      controlHeight: 40,
      controlHeightLG: 46,
      fontWeight: 500,
      primaryShadow: 'none',
      defaultShadow: 'none',
    },
    Menu: {
      itemBorderRadius: 12,
      itemHeight: 44,
      itemMarginInline: 10,
      itemSelectedBg: '#efeafb',
      itemSelectedColor: '#210856',
      itemHoverBg: '#f4f1fb',
      itemHoverColor: '#210856',
      iconSize: 17,
    },
    Card: {
      borderRadiusLG: 16,
      boxShadowTertiary: '0 4px 24px rgba(0, 0, 0, 0.06)',
    },
    Input: { borderRadius: 10, controlHeight: 38 },
    InputNumber: { borderRadius: 10, controlHeight: 38 },
    Select: { borderRadius: 10, controlHeight: 38, borderRadiusLG: 12 },
    Table: { borderRadiusLG: 14, headerBg: '#f3f4f6', headerColor: '#374151' },
    Modal: { borderRadiusLG: 18 },
    Tabs: { inkBarColor: '#9354e0', itemSelectedColor: '#210856', itemHoverColor: '#341472' },
    Tag: { borderRadiusSM: 99 },
    Segmented: { borderRadius: 99, itemSelectedBg: '#210856', itemSelectedColor: '#ffffff' },
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR} theme={climooTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
